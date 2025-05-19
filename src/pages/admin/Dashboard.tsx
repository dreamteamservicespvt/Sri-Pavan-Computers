import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ShoppingBag, 
  Users, 
  Package, 
  MessageSquare,
  DollarSign,
  Cpu,
  TrendingUp,
  Calendar,
  BarChart2,
  ArrowUp,
  ArrowDown,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Define types for dashboard data
interface Order {
  id: string;
  createdAt: Timestamp | Date;
  totalAmount: number;
  status: string;
  userId: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalCustomers: number;
  totalRevenue: number;
  newMessages: number;
  recentOrders: Order[];
  topProducts: Product[];
  salesTrend: number;
  ordersTrend: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    newMessages: 0,
    recentOrders: [],
    topProducts: [],
    salesTrend: 5.2, // Percentage increase
    ordersTrend: 3.1, // Percentage increase
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError(null);
        // Get order count
        const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const ordersSnapshot = await getDocs(ordersQuery);
        const orders = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        
        // Get pending orders
        const pendingOrdersQuery = query(
          collection(db, "orders"), 
          where("status", "==", "pending")
        );
        const pendingOrdersSnapshot = await getDocs(pendingOrdersQuery);
        
        // Get products
        const productsQuery = query(collection(db, "products"));
        const productsSnapshot = await getDocs(productsQuery);
        
        // Get messages
        const messagesQuery = query(
          collection(db, "messages"), 
          where("read", "==", false)
        );
        const messagesSnapshot = await getDocs(messagesQuery);
        
        // Get customers (unique user IDs from orders)
        const customerIds = [...new Set(orders.map(order => order.userId))];
        
        // Calculate revenue
        const totalRevenue = orders.reduce((sum, order) => {
          return sum + (order.totalAmount || 0);
        }, 0);
        
        // Recent orders (last 5)
        const recentOrders = orders.slice(0, 5);
        
        // Top products (most ordered)
        const productsMap = {};
        // Fix type issues in the product mapping
        orders.forEach(order => {
          if (order.items) {
            order.items.forEach(item => {
              const itemId = typeof item === 'object' && item !== null ? (item as any).id : null;
              if (itemId) {
                if (productsMap[itemId]) {
                  // Type assertion to access properties
                  const typedItem = item as OrderItem;
                  productsMap[itemId].quantity += typedItem.quantity || 1;
                } else {
                  // Type assertion for new item
                  const typedItem = item as OrderItem;
                  productsMap[itemId] = {
                    id: itemId,
                    name: typedItem.name || 'Unknown Product',
                    quantity: typedItem.quantity || 1,
                    price: typedItem.price || 0
                  };
                }
              }
            });
          }
        });
        
        // Type assertion when converting to array
        const topProducts = (Object.values(productsMap) as Product[])
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 5);
        
        setStats({
          totalOrders: ordersSnapshot.size,
          pendingOrders: pendingOrdersSnapshot.size,
          totalProducts: productsSnapshot.size,
          totalCustomers: customerIds.length,
          totalRevenue: totalRevenue,
          newMessages: messagesSnapshot.size,
          recentOrders,
          topProducts,
          salesTrend: 5.2, // This would come from real comparison data
          ordersTrend: 3.1, // This would come from real comparison data
        });
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (timestamp: Timestamp | Date | undefined): string => {
    if (!timestamp) return '';
    const date = timestamp instanceof Timestamp ? 
      timestamp.toDate() : 
      new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Enhanced loading state with skeleton UI
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="p-6">
                <div className="h-5 w-1/2 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded mt-2"></div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="p-6">
                <div className="h-6 w-1/3 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex justify-between">
                      <div className="h-5 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-5 w-1/4 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full p-8 flex flex-col items-center justify-center text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="default"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stats.salesTrend > 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                {stats.salesTrend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(stats.salesTrend)}% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                <span className={stats.ordersTrend > 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                  {stats.ordersTrend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(stats.ordersTrend)}% from last month
                </span>
              </p>
              <span className="text-xs text-amber-600 font-medium">{stats.pendingOrders} pending</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Inventory items in database
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newMessages}</div>
            <p className="text-xs text-muted-foreground">
              Unread customer inquiries
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Recently placed customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.recentOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No recent orders found</p>
              ) : (
                <div className="space-y-4">
                  {stats.recentOrders.map((order, index) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div className="flex flex-col">
                        <span className="font-medium">Order #{order.id.slice(0, 6)}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{formatCurrency(order.totalAmount || 0)}</span>
                        <div className={`text-xs ${order.status === 'completed' ? 'text-green-500' : order.status === 'pending' ? 'text-amber-500' : 'text-blue-500'}`}>
                          {order.status || 'processing'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/orders">View all orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling products by quantity</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.topProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No product data available</p>
              ) : (
                <div className="space-y-4">
                  {stats.topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div className="flex flex-col">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-xs text-muted-foreground">{product.price ? formatCurrency(product.price) : 'N/A'}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{product.quantity} sold</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/products">Manage products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
                <Link to="/admin/products">
                  <Package className="h-6 w-6" />
                  <span>Add Product</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
                <Link to="/admin/orders">
                  <ShoppingBag className="h-6 w-6" />
                  <span>Process Orders</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
                <Link to="/admin/messages">
                  <MessageSquare className="h-6 w-6" />
                  <span>View Messages</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
                <Link to="/admin/analytics">
                  <BarChart2 className="h-6 w-6" />
                  <span>View Analytics</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
