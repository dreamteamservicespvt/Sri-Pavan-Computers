import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

import { Search, PlusCircle, Pencil, Trash, MoreVertical, Filter, ImageIcon, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

import GalleryUploadForm, { GalleryUploadFormValues } from '@/components/admin/GalleryUploadForm';
import { GalleryItem, GalleryCategory, getGalleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/services/galleryService';

const GalleryAdmin = () => {
  const { user } = useAuth();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<GalleryCategory | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState('grid');

  // Fetch gallery items on component mount
  useEffect(() => {
    loadGalleryItems();
  }, []);

  // Filter items when search query or category changes
  useEffect(() => {
    let filtered = galleryItems;
    
    // Apply category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        (item.description && item.description.toLowerCase().includes(lowerCaseQuery))
      );
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, categoryFilter, galleryItems]);

  // Load gallery items from Firebase
  const loadGalleryItems = async () => {
    setIsLoading(true);
    try {
      const items = await getGalleryItems();
      setGalleryItems(items);
      setFilteredItems(items);
    } catch (error) {
      console.error('Error loading gallery items:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission (add/edit)
  const handleSubmit = async (data: GalleryUploadFormValues) => {
    setIsSubmitting(true);
    try {
      if (currentItem) {
        // Update existing item
        await updateGalleryItem(currentItem.id, {
          title: data.title,
          description: data.description,
          category: data.category as GalleryCategory,
          imageUrl: data.imageUrl
        });

        toast({
          title: "Success",
          description: `Gallery image "${data.title}" has been updated.`,
        });
      } else {
        // Add new item
        await addGalleryItem({
          title: data.title,
          description: data.description,
          category: data.category as GalleryCategory,
          imageUrl: data.imageUrl,
          uploadedBy: user?.email || 'unknown'
        });

        toast({
          title: "Success",
          description: `Image "${data.title}" has been added to the gallery.`,
        });
      }

      // Reload gallery items and reset form
      loadGalleryItems();
      setOpenDialog(false);
      setCurrentItem(null);
    } catch (error) {
      console.error('Error submitting gallery item:', error);
      toast({
        title: "Error",
        description: "Failed to save gallery item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEdit = (item: GalleryItem) => {
    setCurrentItem(item);
    setOpenDialog(true);
  };

  // Handle delete button click
  const handleDeleteClick = (item: GalleryItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await deleteGalleryItem(itemToDelete.id);
      toast({
        title: "Success",
        description: `"${itemToDelete.title}" has been removed from the gallery.`,
      });
      
      // Reload gallery items
      loadGalleryItems();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: "Error",
        description: "Failed to delete gallery item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  // Category badge color mapping
  const getCategoryColor = (category: GalleryCategory) => {
    switch (category) {
      case 'Store': return 'bg-blue-500';
      case 'Products': return 'bg-green-500';
      case 'Services': return 'bg-purple-500';
      case 'Events': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  // Format date from Firestore Timestamp
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    
    try {
      const date = timestamp.toDate();
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gallery Management</h1>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentItem ? `Edit "${currentItem.title}"` : 'Add New Gallery Image'}
              </DialogTitle>
            </DialogHeader>
            
            <GalleryUploadForm 
              defaultValues={currentItem ? {
                title: currentItem.title,
                description: currentItem.description || '',
                category: currentItem.category,
                imageUrl: currentItem.imageUrl,
              } : undefined}
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search gallery..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {categoryFilter === 'All' ? 'All Categories' : categoryFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setCategoryFilter('All')}>
              All Categories
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Store')}>
              Store
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Products')}>
              Products
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Services')}>
              Services
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategoryFilter('Events')}>
              Events
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="ml-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="grid" className="mt-0">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative h-48 bg-gray-100">
                        {item.imageUrl ? (
                          <img 
                            src={item.imageUrl}
                            alt={item.title} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-gray-300" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button 
                            variant="secondary" 
                            size="icon"
                            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => handleDeleteClick(item)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      {item.description && (
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No gallery images found</h3>
                  <p className="text-gray-500">
                    {searchQuery || categoryFilter !== 'All' 
                      ? "Try changing your search or filter criteria" 
                      : "Add your first gallery image to get started"}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="table" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Gallery Images</CardTitle>
                  <CardDescription>
                    {filteredItems.length} {filteredItems.length === 1 ? 'image' : 'images'} in the gallery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredItems.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Date Added</TableHead>
                          <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                                {item.imageUrl ? (
                                  <img 
                                    src={item.imageUrl}
                                    alt={item.title} 
                                    className="w-full h-full object-cover" 
                                  />
                                ) : (
                                  <ImageIcon className="h-6 w-6 text-gray-300" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell>
                              <Badge className={getCategoryColor(item.category)}>
                                {item.category}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-500">
                              {formatDate(item.createdAt)}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(item)}>
                                    <Pencil className="h-4 w-4 mr-2" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteClick(item)}
                                    className="text-red-600"
                                  >
                                    <Trash className="h-4 w-4 mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">
                        {searchQuery || categoryFilter !== 'All' 
                          ? "No images match your search criteria" 
                          : "No images have been added to the gallery yet"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Delete confirmation dialog */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently remove "{itemToDelete?.title}" from the gallery. 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={confirmDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default GalleryAdmin;
