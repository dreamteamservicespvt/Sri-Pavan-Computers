import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Area,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  Download,
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowUpDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectTrigger, 
  SelectValue, 
  SelectItem 
} from '@/components/ui/select';

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('30days');
  const [productData, setProductData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  
  // Mock colors for charts
  const colors = [
    "#0ea5e9", "#6366f1", "#10b981", "#f59e0b", 
    "#ef4444", "#8b5cf6", "#ec4899", "#f97316"
  ];

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      try {
        // Get date range based on selected period
        const endDate = new Date();
        let startDate = new Date();
        
        switch(period) {
          case '7days':
            startDate.setDate(endDate.getDate() - 7);
            break;
          case '30days':
            startDate.setDate(endDate.getDate() - 30);
            break;
          case '90days':
            startDate.setDate(endDate.getDate() - 90);
            break;
          case 'year':
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
          default:
            startDate.setDate(endDate.getDate() - 30);
        }
        
        // Fetch orders within date range
        const orderQuery = query(
          collection(db, "orders"),
          where("createdAt", ">=", Timestamp.fromDate(startDate)),
          where("createdAt", "<=", Timestamp.fromDate(endDate)),
          orderBy("createdAt", "asc")
        );
        
        const orderSnapshot = await getDocs(orderQuery);
        const orders = orderSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Process orders for different charts
        processOrderData(orders, startDate, endDate);
        
        // Fetch products for product analytics
        const productQuery = query(collection(db, "products"));
        const productSnapshot = await getDocs(productQuery);
        const products = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Process product data for charts
        processProductData(products, orders);
        
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [period]);
  
  // Process order data for time-based analytics
  const processOrderData = (orders, startDate, endDate) => {
    // Time intervals based on selected period
    let dateFormat, interval;
    
    switch(period) {
      case '7days':
        dateFormat = { day: '2-digit', month: 'short' };
        interval = 'day';
        break;
      case '30days':
        dateFormat = { day: '2-digit', month: 'short' };
        interval = 'day';
        break;
      case '90days':
        dateFormat = { day: '2-digit', month: 'short' };
        interval = 'week';
        break;
      case 'year':
        dateFormat = { month: 'short' };
        interval = 'month';
        break;
      default:
        dateFormat = { day: '2-digit', month: 'short' };
        interval = 'day';
    }
    
    // Generate date intervals
    const dates = [];
    let current = new Date(startDate);
    
    while (current <= endDate) {
      dates.push(new Date(current));
      
      switch(interval) {
        case 'day':
          current.setDate(current.getDate() + 1);
          break;
        case 'week':
          current.setDate(current.getDate() + 7);
          break;
        case 'month':
          current.setMonth(current.getMonth() + 1);
          break;
      }
    }
    
    // Map order data to intervals
    const ordersByDate = {};
    const revenueByDate = {};
    
    dates.forEach(date => {
      const dateStr = date.toLocaleDateString('en-US', dateFormat);
      ordersByDate[dateStr] = 0;
      revenueByDate[dateStr] = 0;
    });
    
    orders.forEach(order => {
      if (order.createdAt) {
        const orderDate = order.createdAt instanceof Timestamp ? 
          order.createdAt.toDate() : 
          new Date(order.createdAt);
          
        const dateStr = orderDate.toLocaleDateString('en-US', dateFormat);
        
        if (ordersByDate[dateStr] !== undefined) {
          ordersByDate[dateStr] = Number(ordersByDate[dateStr]) + 1;
          revenueByDate[dateStr] = Number(revenueByDate[dateStr]) + Number(order.totalAmount || 0);
        }
      }
    });
    
    // Format data for charts
    const orderChartData = Object.entries(ordersByDate).map(([name, value]) => ({
      name,
      value
    }));
    
    const revenueChartData = Object.entries(revenueByDate).map(([name, value]) => ({
      name,
      value: Math.round(Number(value))
    }));
    
    setOrderData(orderChartData);
    setRevenueData(revenueChartData);
    
    // Process category data
    const categoryCounts = {};
    
    orders.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          if (item.category) {
            categoryCounts[item.category] = Number(categoryCounts[item.category] || 0) + 1;
          }
        });
      }
    });
    
    const categoryChartData = Object.entries(categoryCounts)
      .map(([name, value]) => ({
        name,
        value: Number(value)
      }))
      .sort((a, b) => Number(b.value) - Number(a.value))
      .slice(0, 8); // Limit to top 8 categories
      
    setCategoryData(categoryChartData);
  };
  
  // Process product data for product analytics
  const processProductData = (products, orders) => {
    // Count product occurrences in orders
    const productSales = {};
    
    orders.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          productSales[item.id] = (productSales[item.id] || 0) + (item.quantity || 1);
        });
      }
    });
    
    // Map product sales data with product names
    const productChartData = products
      .map(product => ({
        name: product.name || 'Unknown Product',
        value: productSales[product.id] || 0
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 products
    
    setProductData(productChartData);
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Revenue & Orders Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
            <CardDescription>
              Analyze revenue trends and order volume over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="revenue">
              <TabsList className="mb-4">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="revenue">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="orders">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={orderData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Product & Category Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best-selling products by units sold</CardDescription>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <BarChart2 className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {productData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No product data available</p>
                  </div>
                )}
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Order distribution by category</CardDescription>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <PieChartIcon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No category data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
