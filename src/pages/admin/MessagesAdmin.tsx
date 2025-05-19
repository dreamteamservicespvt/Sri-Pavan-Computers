import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Mail, 
  Check, 
  Clock, 
  Send,
  Trash2,
  AlertCircle,
  Star,
  StarOff,
  Filter
} from 'lucide-react';
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc, where, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
  read: boolean;
  replied: boolean;
  starred: boolean;
}

const MessagesAdmin = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'starred'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load messages
  useEffect(() => {
    fetchMessages();
  }, []);
  
  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, you would fetch data from Firebase
      // For now, let's use mock data
      const mockMessages = [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          subject: "Product Inquiry",
          message: "I'm interested in your HP Pavilion laptop. Could you tell me more about its specifications?",
          createdAt: Timestamp.fromDate(new Date()), // Convert Date to Timestamp
          read: false,
          replied: false,
          starred: false
        },
        // Add more mock messages as needed
      ];
      
      setMessages(mockMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter messages based on selected filter and search term
  const filteredMessages = messages.filter(message => {
    // Apply tab filter
    if (filter === 'unread' && message.read) return false;
    if (filter === 'read' && !message.read) return false;
    if (filter === 'starred' && !message.starred) return false;
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        message.name.toLowerCase().includes(searchLower) ||
        message.email.toLowerCase().includes(searchLower) ||
        message.subject.toLowerCase().includes(searchLower) ||
        message.message.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Open message dialog
  const handleOpenMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    
    // Mark as read if not already read
    if (!message.read) {
      handleMarkAsRead(message);
    }
  };
  
  // Mark message as read
  const handleMarkAsRead = async (message: Message) => {
    try {
      // In a real implementation, you would update the message in Firebase
      // await updateDoc(doc(db, "messages", message.id), { read: true });
      
      // Update local state
      setMessages(prev => 
        prev.map(m => m.id === message.id ? { ...m, read: true } : m)
      );
      
      if (selectedMessage?.id === message.id) {
        setSelectedMessage({ ...message, read: true });
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark message as read',
        variant: 'destructive'
      });
    }
  };
  
  // Toggle starred status
  const handleToggleStarred = async (message: Message) => {
    try {
      // In a real implementation, you would update the message in Firebase
      // await updateDoc(doc(db, "messages", message.id), { 
      //   starred: !message.starred 
      // });
      
      // Update local state
      setMessages(prev => 
        prev.map(m => m.id === message.id ? { ...m, starred: !m.starred } : m)
      );
      
      if (selectedMessage?.id === message.id) {
        setSelectedMessage({ ...message, starred: !message.starred });
      }
    } catch (error) {
      console.error('Error toggling starred status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update message',
        variant: 'destructive'
      });
    }
  };
  
  // Send reply
  const handleSendReply = async () => {
    if (!selectedMessage || !replyContent.trim()) return;
    
    try {
      // In a real implementation, you would:
      // 1. Send the email via an API
      // 2. Update the message in Firebase
      // await updateDoc(doc(db, "messages", selectedMessage.id), { 
      //   replied: true 
      // });
      
      // Update local state
      setMessages(prev => 
        prev.map(m => m.id === selectedMessage.id ? { ...m, replied: true } : m)
      );
      
      toast({
        title: 'Reply Sent',
        description: `Reply to ${selectedMessage.name} has been sent successfully.`
      });
      
      setReplyContent('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: 'Error',
        description: 'Failed to send reply',
        variant: 'destructive'
      });
    }
  };
  
  // Delete message
  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;
    
    try {
      // In a real implementation, you would delete the message from Firebase
      // await deleteDoc(doc(db, "messages", selectedMessage.id));
      
      // Update local state
      setMessages(prev => prev.filter(m => m.id !== selectedMessage.id));
      
      toast({
        title: 'Message Deleted',
        description: 'The message has been deleted successfully.'
      });
      
      setIsDeleteDialogOpen(false);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive'
      });
    }
  };
  
  // Format date
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) {
      return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diff === 1) {
      return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diff < 7) {
      return date.toLocaleDateString([], { weekday: 'long' }) + ', ' + 
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <div className="flex items-center space-x-2">
          <div className="relative max-w-xs">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <Tabs 
        defaultValue="all" 
        value={filter} 
        onValueChange={(value) => setFilter(value as any)}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="relative">
            All
            <span className="ml-1">({messages.length})</span>
          </TabsTrigger>
          <TabsTrigger value="unread" className="relative">
            Unread
            <span className="ml-1">({messages.filter(m => !m.read).length})</span>
            {messages.filter(m => !m.read).length > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="read" className="relative">
            Read
            <span className="ml-1">({messages.filter(m => m.read).length})</span>
          </TabsTrigger>
          <TabsTrigger value="starred" className="relative">
            Starred
            <span className="ml-1">({messages.filter(m => m.starred).length})</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-8">
          <Mail className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No messages found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try a different search term' : 'You have no messages in this category'}
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Status</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">Preview</TableHead>
                <TableHead className="w-[120px] text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow 
                  key={message.id} 
                  className={`cursor-pointer ${!message.read ? 'font-medium bg-blue-50/50' : ''}`}
                  onClick={() => handleOpenMessage(message)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStarred(message);
                        }}
                      >
                        {message.starred ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <Star className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      {message.replied ? (
                        <Badge variant="secondary" className="h-6 text-xs">Replied</Badge>
                      ) : !message.read ? (
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell className="font-medium">{message.subject}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs">
                    <span className="truncate block">
                      {message.message.length > 60 
                        ? message.message.substring(0, 60) + '...' 
                        : message.message}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatDate(message.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Message Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">{selectedMessage.subject}</DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStarred(selectedMessage);
                    }}
                  >
                    {selectedMessage.starred ? (
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <Star className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                </div>
                <DialogDescription>
                  From: <span className="font-medium">{selectedMessage.name}</span> &lt;{selectedMessage.email}&gt;
                </DialogDescription>
                <DialogDescription>
                  Received: {formatDate(selectedMessage.createdAt)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="border-t border-b py-4 my-4">
                <p className="whitespace-pre-line">{selectedMessage.message}</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Reply to this message</h4>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={5}
                />
              </div>
              
              <DialogFooter className="flex justify-between sm:justify-between">
                <div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyContent.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteMessage}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesAdmin;
