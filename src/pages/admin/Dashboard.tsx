
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingBag, Users, Package, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
            <h2 className="text-3xl font-bold">256</h2>
            <p className="text-xs text-green-500 flex items-center gap-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Revenue</p>
            <h2 className="text-3xl font-bold">₹45,678</h2>
            <p className="text-xs text-green-500 flex items-center gap-1">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Customers</p>
            <h2 className="text-3xl font-bold">1,258</h2>
            <p className="text-xs text-green-500 flex items-center gap-1">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Package className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Products</p>
            <h2 className="text-3xl font-bold">120</h2>
            <p className="text-xs text-green-500 flex items-center gap-1">
              +5 new this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Overview of the latest customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 border-b p-3 bg-muted/50">
              <div>Order</div>
              <div>Customer</div>
              <div>Status</div>
              <div className="text-right">Amount</div>
            </div>
            
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 p-3 border-b last:border-0">
                <div>#{(1000 + i).toString()}</div>
                <div>Customer {i + 1}</div>
                <div>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    i % 3 === 0 ? 'bg-green-100 text-green-800' : 
                    i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Processing'}
                  </span>
                </div>
                <div className="text-right">₹{(Math.random() * 10000).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
