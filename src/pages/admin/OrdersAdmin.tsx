import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  RefreshCcw, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Ban,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  endBefore, 
  doc, 
  updateDoc, 
  where, 
  Timestamp, 
  getDoc 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from "@/components/ui/use-toast";

// Define types
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  notes?: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const OrdersAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [firstVisible, setFirstVisible] = useState<any>(null);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const [processingAction, setProcessingAction] = useState<boolean>(false);
  const [users, setUsers] = useState<Record<string, UserInfo>>({});
  
  const { toast } = useToast();

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let ordersQuery = collection(db, "orders");
        let queryConstraints = [];
        
        // Add status filter
        if (filterStatus !== "all") {
          queryConstraints.push(where("status", "==", filterStatus));
        }
        
        // Add order and limit
        queryConstraints.push(orderBy("createdAt", "desc"));
        queryConstraints.push(limit(pageSize));
        
        // Add pagination
        if (currentPage > 1 && lastVisible) {
          queryConstraints.push(startAfter(lastVisible));
        }
        
        const q = query(ordersQuery, ...queryConstraints);
        const querySnapshot = await getDocs(q);
        
        // Calculate total pages
        const totalQuery = filterStatus !== "all" 
          ? query(collection(db, "orders"), where("status", "==", filterStatus))
          : query(collection(db, "orders"));
        const totalSnapshot = await getDocs(totalQuery);
        setTotalPages(Math.ceil(totalSnapshot.size / pageSize));
        
        if (querySnapshot.empty) {
          setOrders([]);
          setIsLoading(false);
          return;
        }
        
        // Set pagination cursors
        setFirstVisible(querySnapshot.docs[0]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        
        // Get user IDs from orders
        const userIds = new Set<string>();
        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.userId) userIds.add(data.userId);
        });
        
        // Fetch user details
        const usersData: Record<string, UserInfo> = {};
        for (const userId of userIds) {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            usersData[userId] = { 
              id: userId,
              name: userDoc.data().displayName || "Unknown User",
              email: userDoc.data().email || "No email",
              phone: userDoc.data().phone || "No phone"
            };
          } else {
            usersData[userId] = {
              id: userId,
              name: "Unknown User",
              email: "No email",
              phone: "No phone"
            };
          }
        }
        setUsers(usersData);
        
        // Transform and set orders
        const fetchedOrders = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const userInfo = data.userId ? usersData[data.userId] : null;
          
          return {
            id: doc.id,
            ...data,
            userName: userInfo?.name || "Unknown User",
            userEmail: userInfo?.email || "No email",
            userPhone: userInfo?.phone || "No phone",
          } as Order;
        });
        
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [currentPage, pageSize, filterStatus]);

  // Filter by search
  const filteredOrders = orders.filter(order => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.userName.toLowerCase().includes(searchLower) ||
      order.userEmail.toLowerCase().includes(searchLower)
    );
  });

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle order status update
  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      setProcessingAction(true);
      const orderRef = doc(db, "orders", orderId);
      
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      
      // Update the order in state
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: Timestamp.now() } 
          : order
      ));
      
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus, updatedAt: Timestamp.now() } : null);
      }
      
      toast({
        title: "Status Updated",
        description: `Order #${orderId.slice(0, 6)} status changed to ${newStatus}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Update Failed",
        description: "Could not update the order status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingAction(false);
    }
  };

  // Format date
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp?.toDate();
    if (!date) return "N/A";
    
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status badge
  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { color: "bg-amber-500", icon: <Clock className="h-3 w-3 mr-1" /> },
      processing: { color: "bg-blue-500", icon: <Package className="h-3 w-3 mr-1" /> },
      shipped: { color: "bg-indigo-500", icon: <Truck className="h-3 w-3 mr-1" /> },
      delivered: { color: "bg-green-500", icon: <CheckCircle2 className="h-3 w-3 mr-1" /> },
      cancelled: { color: "bg-red-500", icon: <Ban className="h-3 w-3 mr-1" /> }
    };
    
    const config = statusConfig[status] || { color: "bg-gray-500", icon: null };
    
    return (
      <Badge className={`${config.color} text-white flex items-center`}>
        {config.icon}
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  // Order details dialog
  const OrderDetailsDialog = () => {
    if (!selectedOrder) return null;
    
    return (
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Order #{selectedOrder.id.slice(0, 6)}</span>
              {getStatusBadge(selectedOrder.status)}
            </DialogTitle>
            <DialogDescription>
              Placed on {formatDate(selectedOrder.createdAt)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Customer details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Customer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p>{selectedOrder.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedOrder.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedOrder.userPhone || "N/A"}</p>
                </div>
              </div>
            </div>
            
            {/* Shipping address */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>{selectedOrder.shippingAddress?.address || "N/A"}</p>
              <p>
                {selectedOrder.shippingAddress?.city || "N/A"}, 
                {selectedOrder.shippingAddress?.state || "N/A"} 
                {selectedOrder.shippingAddress?.postalCode || "N/A"}
              </p>
              <p>{selectedOrder.shippingAddress?.country || "India"}</p>
            </div>
            
            {/* Order items */}
            <div>
              <h3 className="font-semibold mb-2">Order Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.price * item.quantity)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">{formatCurrency(selectedOrder.totalAmount)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Payment details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Method</p>
                  <p>{selectedOrder.paymentMethod || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge 
                    className={
                      selectedOrder.paymentStatus === 'completed' ? 'bg-green-500' : 
                      selectedOrder.paymentStatus === 'pending' ? 'bg-amber-500' : 
                      'bg-red-500'
                    }
                  >
                    {selectedOrder.paymentStatus || "N/A"}
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Notes */}
            {selectedOrder.notes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Notes</h3>
                <p>{selectedOrder.notes}</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 w-full justify-start sm:justify-start">
              <Select 
                disabled={processingAction}
                onValueChange={(value) => handleUpdateStatus(selectedOrder.id, value as Order['status'])}
                defaultValue={selectedOrder.status}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              {processingAction && (
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
            
            <div className="flex gap-2 w-full justify-end">
              <Button variant="outline" onClick={() => setShowOrderDetails(false)}>
                Close
              </Button>
              <Button asChild>
                <a 
                  href={`/admin/orders/invoice/${selectedOrder.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Invoice
                </a>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Loading state
  if (isLoading && currentPage === 1) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !orders.length) {
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
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Orders Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search orders..." 
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <Select 
            onValueChange={(value) => {
              setFilterStatus(value);
              setCurrentPage(1);
            }}
            defaultValue={filterStatus}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Orders table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="p-0">
            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                <p className="text-gray-500 mt-1">
                  {searchQuery ? "Try adjusting your search filters" : "Start selling to see orders here"}
                </p>
              </div>
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.slice(0, 6)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.userName}</div>
                          <div className="text-xs text-gray-500">{order.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(order.createdAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(order.totalAmount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderDetails(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPage}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage}
              disabled={currentPage >= totalPages || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Order Details Dialog */}
      <OrderDetailsDialog />
    </div>
  );
};

export default OrdersAdmin;
