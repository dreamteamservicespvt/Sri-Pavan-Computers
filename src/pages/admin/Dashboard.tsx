import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Users, 
  Activity, 
  Package, 
  MessageSquare,
  DollarSign,
  TrendingUp,
  BarChart
} from 'lucide-react';
import { collection, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalMessages: 0,
    recentOrders: [],
    recentMessages: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // For this example, we'll just use mock data
        // In a real implementation, you would fetch this data from Firestore
        
        setStats({
          totalOrders: 156,
          totalUsers: 48,
          totalProducts: 124,
          totalMessages: 32,
          recentOrders: [
            {
              id: "ord-001",
              customer: "Rajesh Kumar",
              date: "2023-06-15",
              amount: 24999,
              status: "completed"
            },
            {
              id: "ord-002",
              customer: "Priya Sharma",
              date: "2023-06-14",
              amount: 12499,
              status: "processing"
            },
            {
              id: "ord-003",
              customer: "Venkat Rao",
              date: "2023-06-12",
              amount: 78500,
              status: "completed"
            }
          ],
          recentMessages: [
            {
              id: "msg-001",
              name: "Sunita Reddy",
              email: "sunita@example.com",
              subject: "Product Inquiry",
              date: "2023-06-15"
            },
            {
              id: "msg-002",
              name: "Ramesh Patel",
              email: "ramesh@example.com",
              subject: "Order Status",
              date: "2023-06-14"
            }
          ]
        });
        
        // For future integration with Firebase:
        /*
        // Get total orders
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const totalOrders = ordersSnapshot.size;
        
        // Get total users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const totalUsers = usersSnapshot.size;
        
        // Get total products
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const totalProducts = productsSnapshot.size;
        
        // Get total messages
        const messagesSnapshot = await getDocs(collection(db, 'messages'));
        const totalMessages = messagesSnapshot.size;
        
        // Get recent orders
        const recentOrdersQuery = query(
          collection(db, 'orders'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const recentOrdersSnapshot = await getDocs(recentOrdersQuery);
        const recentOrders = recentOrdersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Get recent messages
        const recentMessagesQuery = query(
          collection(db, 'messages'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const recentMessagesSnapshot = await getDocs(recentMessagesQuery);
        const recentMessages = recentMessagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setStats({
          totalOrders,
          totalUsers,
          totalProducts,
          totalMessages,
          recentOrders,
          recentMessages
        });
        */
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.displayName || 'Admin'}! Here's an overview of your store.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹6,24,350</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              +4 new products this week
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for Orders and Messages */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="messages">Recent Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                An overview of recent customer orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left text-sm font-medium py-2 px-3">Order ID</th>
                      <th className="text-left text-sm font-medium py-2 px-3">Customer</th>
                      <th className="text-left text-sm font-medium py-2 px-3">Date</th>
                      <th className="text-left text-sm font-medium py-2 px-3">Amount</th>
                      <th className="text-left text-sm font-medium py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order: any) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-2 px-3 text-sm">{order.id}</td>
                        <td className="py-2 px-3 text-sm">{order.customer}</td>
                        <td className="py-2 px-3 text-sm">{order.date}</td>
                        <td className="py-2 px-3 text-sm">₹{order.amount.toLocaleString()}</td>
                        <td className="py-2 px-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}
                          `}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>
                Latest inquiries from your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left text-sm font-medium py-2 px-3">Name</th>
                      <th className="text-left text-sm font-medium py-2 px-3">Email</th>
                      <th className="text-left text-sm font-medium py-2 px-3">Subject</th>
                      <th className="text-left text-sm font-medium py-2 px-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentMessages.map((message: any) => (
                      <tr key={message.id} className="border-b">
                        <td className="py-2 px-3 text-sm">{message.name}</td>
                        <td className="py-2 px-3 text-sm">{message.email}</td>
                        <td className="py-2 px-3 text-sm">{message.subject}</td>
                        <td className="py-2 px-3 text-sm">{message.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Sales Chart (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>
            Monthly revenue for the current year
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center">
            <BarChart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-muted-foreground">Chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
