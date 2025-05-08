
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCart } from '@/hooks/use-cart';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Camera, User as UserIcon, ShoppingBag, LogOut } from 'lucide-react';

interface Order {
  id: string;
  userId: string;
  items: any[];
  status: string;
  total: number;
  createdAt: string;
}

const Profile: React.FC = () => {
  const { user, updateUserProfile, logOut } = useAuth();
  const { cart } = useCart();
  const [displayName, setDisplayName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      fetchOrders();
    }
  }, [user]);
  
  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      const ordersData: Order[] = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({
          id: doc.id,
          ...doc.data()
        } as Order);
      });
      
      // Sort orders by date (newest first)
      ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      setIsUpdating(true);
      await updateUserProfile({ displayName });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      const result = await uploadToCloudinary(file);
      
      if (result.success) {
        await updateUserProfile({ photoURL: result.url });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-medium mb-4">You need to log in to view this page</p>
          <Button asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || "User"} />
                  <AvatarFallback className="text-xl">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon />}
                  </AvatarFallback>
                </Avatar>
                
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute -bottom-2 -right-2 p-1.5 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/80 transition-colors"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </label>
                
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </div>
              
              <div className="text-center">
                <h2 className="font-medium">{user.displayName || "User"}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user.email || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              
              <Button 
                onClick={handleUpdateProfile} 
                className="w-full"
                disabled={isUpdating || !displayName}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={logOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Orders and Cart Tabs */}
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="cart">Current Cart</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                            <div>
                              <h4 className="font-medium">Order #{order.id.slice(0, 8)}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {order.items.map((item: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.quantity} × ₹{item.price.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              {order.items.reduce((total: number, item: any) => total + item.quantity, 0)} items
                            </span>
                            <span className="font-medium">
                              Total: ₹{order.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Your order history will appear here after you make a purchase.
                      </p>
                      <Button asChild>
                        <a href="/products">Shop Now</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cart" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Current Cart</CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length > 0 ? (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium line-clamp-1">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} × ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{item.totalPrice.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-2">
                          <span>Subtotal</span>
                          <span>₹{cart.reduce((total, item) => total + item.totalPrice, 0).toLocaleString()}</span>
                        </div>
                        <Button asChild className="w-full mt-2">
                          <a href="/cart">View Cart</a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                      <p className="text-muted-foreground mb-4">
                        Add some products to your cart to see them here.
                      </p>
                      <Button asChild>
                        <a href="/products">Browse Products</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
