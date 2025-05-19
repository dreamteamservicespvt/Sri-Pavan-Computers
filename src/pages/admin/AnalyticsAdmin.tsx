import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  BarChart2, 
  TrendingUp, 
  ShoppingBag, 
  CreditCard,
  Calendar,
  AlertTriangle,
  DollarSign,
  Package,
  ShoppingCart,
  User,
  Loader2 
} from 'lucide-react';
import { collection, getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, subDays, startOfMonth, endOfMonth, differenceInDays, eachDayOfInterval, getMonth, getYear } from 'date-fns';

// Define types
interface Order {
  id: string;
  createdAt: Timestamp;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: {
    name: string;
    quantity: number;
    revenue: number;
  }[];
  revenueByDay: {
    date: string;
    revenue: number;
  }[];
  ordersByStatus: {
    status: string;
    count: number;
  }[];
  revenueByCategory: {
    category: string;
    revenue: number;
  }[];
  paymentMethods: {
    method: string;
    count: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsAdmin: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
    revenueByDay: [],
    ordersByStatus: [],
    revenueByCategory: [],
    paymentMethods: []
  });
  const [dateRange, setDateRange] = useState<string>('30days');
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  const fetchCategoryNames = async () => {
    try {
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const categoriesMap: Record<string, string> = {};
      
      categoriesSnapshot.docs.forEach(doc => {
        categoriesMap[doc.id] = doc.data().name;
      });
      
      setCategoryMap(categoriesMap);
      return categoriesMap;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return {};
    }
  };

  const getDateRangeFilter = () => {
    const now = new Date();
    
    switch (dateRange) {
      case '7days':
        return { start: subDays(now, 7), end: now };
      case '30days':
        return { start: subDays(now, 30), end: now };
      case '90days':
        return { start: subDays(now, 90), end: now };
      case 'thisMonth':
        return { start: startOfMonth(now), end: now };
      case 'lastMonth':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) };
      default:
        return { start: subDays(now, 30), end: now };
    }
  };

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch category names for mapping
        const categoriesMap = await fetchCategoryNames();
        
        // Get date range for filtering
        const { start, end } = getDateRangeFilter();
        
        // Convert to Firestore timestamps
        const startTimestamp = Timestamp.fromDate(start);
        const endTimestamp = Timestamp.fromDate(end);
        
        // Fetch orders within date range
        const ordersQuery = query(
          collection(db, "orders"),
          where("createdAt", ">=", startTimestamp),
          where("createdAt", "<=", endTimestamp),
          orderBy("createdAt", "asc")
        );
        
        const ordersSnapshot = await getDocs(ordersQuery);
        const orders = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        
        if (orders.length === 0) {
          setAnalyticsData({
            totalRevenue: 0,
            totalOrders: 0,
            averageOrderValue: 0,
            topProducts: [],
            revenueByDay: [],
            ordersByStatus: [],
            revenueByCategory: [],
            paymentMethods: []
          });
          setIsLoading(false);
          return;
        }
        
        // Fetch products for category analysis
        const productsSnapshot = await getDocs(collection(db, "products"));
        const products = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        
        // Create a map of product ID to category
        const productCategoryMap: Record<string, string> = {};
        products.forEach(product => {
          productCategoryMap[product.id] = product.category;
        });
        
        // Calculate total revenue
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
        // Calculate average order value
        const averageOrderValue = totalRevenue / orders.length;
        
        // Calculate revenue by day
        const dateInterval = eachDayOfInterval({ start, end });
        
        const revenueByDay = dateInterval.map(date => {
          const dateStr = format(date, 'MMM dd');
          const dayRevenue = orders
            .filter(order => {
              const orderDate = order.createdAt.toDate();
              return (
                orderDate.getDate() === date.getDate() &&
                orderDate.getMonth() === date.getMonth() &&
                orderDate.getFullYear() === date.getFullYear()
              );
            })
            .reduce((sum, order) => sum + (order.totalAmount || 0), 0);
          
          return {
            date: dateStr,
            revenue: dayRevenue
          };
        });
        
        // Calculate orders by status
        const statusCounts: Record<string, number> = {};
        orders.forEach(order => {
          const status = order.status || 'unknown';
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
        
        const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
          status,
          count
        }));
        
        // Calculate popular products
        const productSales: Record<string, { quantity: number; revenue: number; name: string }> = {};
        
        orders.forEach(order => {
          if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
              if (!productSales[item.id]) {
                productSales[item.id] = {
                  quantity: 0,
                  revenue: 0,
                  name: item.name
                };
              }
              
              productSales[item.id].quantity += item.quantity;
              productSales[item.id].revenue += item.price * item.quantity;
            });
          }
        });
        
        const topProducts = Object.values(productSales)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);
        
        // Calculate revenue by category
        const categorySales: Record<string, number> = {};
        
        orders.forEach(order => {
          if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
              const category = productCategoryMap[item.id] || 'unknown';
              
              if (!categorySales[category]) {
                categorySales[category] = 0;
              }
              
              categorySales[category] += item.price * item.quantity;
            });
          }
        });
        
        const revenueByCategory = Object.entries(categorySales).map(([categoryId, revenue]) => ({
          category: categoriesMap[categoryId] || categoryId,
          revenue
        })).sort((a, b) => b.revenue - a.revenue);
        
        // Calculate payment methods
        const paymentMethodCounts: Record<string, number> = {};
        
        orders.forEach(order => {
          const method = order.paymentMethod || 'unknown';
          
          if (!paymentMethodCounts[method]) {
            paymentMethodCounts[method] = 0;
          }
          
          paymentMethodCounts[method]++;
        });
        
        const paymentMethods = Object.entries(paymentMethodCounts).map(([method, count]) => ({
          method,
          count
        })).sort((a, b) => b.count - a.count);
        
        setAnalyticsData({
          totalRevenue,
          totalOrders: orders.length,
          averageOrderValue,
          topProducts,
          revenueByDay,
          ordersByStatus,
          revenueByCategory,
          paymentMethods
        });
        
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Failed to load analytics data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [dateRange]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
          <p className="mt-4 text-gray-500">Loading analytics data...</p>
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
      {/* Header with title and date range selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Sales Analytics</h1>
        
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <Select 
            value={dateRange}
            onValueChange={setDateRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{formatCurrency(analyticsData.totalRevenue)}</div>
              <DollarSign className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{analyticsData.totalOrders}</div>
              <ShoppingBag className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {formatCurrency(analyticsData.averageOrderValue)}
              </div>
              <ShoppingCart className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Top Product Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">
                  {analyticsData.topProducts.length > 0 ? formatCurrency(analyticsData.topProducts[0].revenue) : "₹0"}
                </div>
                <div className="text-xs text-gray-500 truncate max-w-[160px]">
                  {analyticsData.topProducts.length > 0 ? analyticsData.topProducts[0].name : "No data"}
                </div>
              </div>
              <Package className="h-5 w-5 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Over Time Line Chart */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Revenue Over Time</span>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardTitle>
          <CardDescription>Daily revenue for the selected period</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          {analyticsData.revenueByDay.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analyticsData.revenueByDay}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                />
                <Tooltip 
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  name="Revenue" 
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">No revenue data available for this period</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Products & Categories Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Top Selling Products</span>
              <BarChart2 className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>Products with highest revenue</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {analyticsData.topProducts.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.topProducts}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No product data available for this period</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Revenue by Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Revenue by Category</span>
              <PieChart className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>Distribution of sales across product categories</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {analyticsData.revenueByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.revenueByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                    nameKey="category"
                    label={({ category, percent }) => 
                      `${category}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {analyticsData.revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No category data available for this period</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Status & Payment Methods Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Orders by Status</span>
              <ShoppingBag className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>Distribution of orders by current status</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {analyticsData.ordersByStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.ordersByStatus}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Orders" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No order status data available for this period</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Payment Methods</span>
              <CreditCard className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>Distribution of orders by payment method</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {analyticsData.paymentMethods.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="method"
                    label={({ method, percent }) => 
                      `${method}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {analyticsData.paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No payment method data available for this period</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsAdmin;
