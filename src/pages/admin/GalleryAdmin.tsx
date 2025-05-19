import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  AlertTriangle,
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  X,
  Loader2,
  CheckCircle,
  SlidersHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '@/lib/firebase';

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Timestamp;
}

interface Category {
  id: string;
  name: string;
}

const GalleryAdmin: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [draggedItem, setDraggedItem] = useState<GalleryItem | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    featured: false
  });
  
  const { toast } = useToast();
  const storage = getStorage();

  // Fetch gallery items and categories
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }));
        setCategories(categoriesData);
        
        // Fetch gallery items
        const galleryQuery = query(collection(db, "gallery"), orderBy("sortOrder", "asc"));
        const gallerySnapshot = await getDocs(galleryQuery);
        const galleryData = gallerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryItem[];
        
        setGalleryItems(galleryData);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        setError("Failed to load gallery items. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGalleryData();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle category select
  const handleCategorySelect = (value: string) => {
    setFormData({
      ...formData,
      category: value
    });
  };

  // Handle featured checkbox change
  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      featured: e.target.checked
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setImageFile(e.target.files[0]);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      featured: false
    });
    setImageFile(null);
    setSelectedItem(null);
    setIsEditMode(false);
  };

  // Open create dialog
  const openAddDialog = () => {
    resetForm();
    setShowAddDialog(true);
  };

  // Open edit dialog
  const openEditDialog = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsEditMode(true);
    
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      featured: item.featured
    });
    
    setShowAddDialog(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form
      if (!formData.title.trim() || !formData.category) {
        toast({
          title: "Missing Information",
          description: "Title and category are required",
          variant: "destructive",
        });
        return;
      }
      
      if (!imageFile && !isEditMode) {
        toast({
          title: "Missing Image",
          description: "Please upload an image",
          variant: "destructive",
        });
        return;
      }
      
      let imageUrl = isEditMode && selectedItem ? selectedItem.image : '';
      
      // Upload image if provided
      if (imageFile) {
        const storageRef = ref(storage, `gallery/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
        
        // Delete old image if exists and being replaced
        if (isEditMode && selectedItem?.image) {
          try {
            const oldImageRef = ref(storage, selectedItem.image);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.error("Error deleting old image:", error);
            // Continue even if deletion fails
          }
        }
      }
      
      if (isEditMode && selectedItem) {
        // Update existing item
        const itemRef = doc(db, "gallery", selectedItem.id);
        await updateDoc(itemRef, {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          featured: formData.featured,
          image: imageUrl,
          // Keep existing sortOrder
        });
        
        // Update local state
        setGalleryItems(items => items.map(item => 
          item.id === selectedItem.id 
            ? {
                ...item,
                title: formData.title,
                description: formData.description,
                category: formData.category,
                featured: formData.featured,
                image: imageUrl
              } 
            : item
        ));
        
        toast({
          title: "Gallery Item Updated",
          description: "The gallery item has been updated successfully",
        });
      } else {
        // Get highest sort order
        const highestSortOrder = galleryItems.length > 0 
          ? Math.max(...galleryItems.map(item => item.sortOrder)) 
          : 0;
        
        // Add new item
        const newItem = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          featured: formData.featured,
          image: imageUrl,
          sortOrder: highestSortOrder + 1,
          createdAt: Timestamp.now()
        };
        
        const docRef = await addDoc(collection(db, "gallery"), newItem);
        
        // Update local state
        setGalleryItems([...galleryItems, { id: docRef.id, ...newItem } as GalleryItem]);
        
        toast({
          title: "Gallery Item Added",
          description: "The new gallery item has been added successfully",
        });
      }
      
      // Reset and close dialog
      resetForm();
      setShowAddDialog(false);
      
    } catch (error) {
      console.error("Error saving gallery item:", error);
      toast({
        title: "Error",
        description: "Failed to save the gallery item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete gallery item
  const handleDeleteItem = async (itemId: string, imagePath: string) => {
    if (!window.confirm("Are you sure you want to delete this gallery item? This action cannot be undone.")) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Delete from Firestore
      await deleteDoc(doc(db, "gallery", itemId));
      
      // Delete image from storage
      try {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
      } catch (error) {
        console.error("Error deleting image:", error);
        // Continue even if image deletion fails
      }
      
      // Update local state
      setGalleryItems(galleryItems.filter(item => item.id !== itemId));
      
      toast({
        title: "Gallery Item Deleted",
        description: "The gallery item has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      toast({
        title: "Error",
        description: "Failed to delete the gallery item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle drag start
  const handleDragStart = (item: GalleryItem) => {
    setDraggedItem(item);
    setIsDragging(true);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, targetItem: GalleryItem) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetItem.id) return;
    
    const draggedIndex = galleryItems.findIndex(item => item.id === draggedItem.id);
    const targetIndex = galleryItems.findIndex(item => item.id === targetItem.id);
    
    if (draggedIndex === targetIndex) return;
    
    // Create a new array with updated order
    const newItems = [...galleryItems];
    const [removedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removedItem);
    
    // Update sort orders
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      sortOrder: index + 1
    }));
    
    setGalleryItems(updatedItems);
  };

  // Handle drag end
  const handleDragEnd = async () => {
    setIsDragging(false);
    setDraggedItem(null);
    
    // Update sort orders in Firestore
    try {
      for (const item of galleryItems) {
        const itemRef = doc(db, "gallery", item.id);
        await updateDoc(itemRef, { sortOrder: item.sortOrder });
      }
      
      toast({
        title: "Order Updated",
        description: "Gallery order has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating sort order:", error);
      toast({
        title: "Error",
        description: "Failed to update the gallery order",
        variant: "destructive",
      });
    }
  };

  // Filter gallery items by category
  const filteredItems = galleryItems.filter(item => {
    if (filterCategory === "all") return true;
    if (filterCategory === "featured") return item.featured;
    return item.category === filterCategory;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading gallery items...</p>
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
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Gallery Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select 
            onValueChange={setFilterCategory}
            defaultValue="all"
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="featured">Featured Items</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={openAddDialog}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Gallery Item
          </Button>
        </div>
      </div>
      
      {isDragging && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex items-center">
          <SlidersHorizontal className="h-5 w-5 text-blue-500 mr-2" />
          <p className="text-blue-700 text-sm">Drag and drop to reorder gallery items</p>
        </div>
      )}
      
      {/* Gallery grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No gallery items found</h3>
            <p className="text-gray-500 mb-6">
              {filterCategory !== "all" 
                ? "Try selecting a different category" 
                : "Start by adding items to your gallery"}
            </p>
            {filterCategory !== "all" ? (
              <Button 
                variant="outline" 
                onClick={() => setFilterCategory('all')}
              >
                View All Items
              </Button>
            ) : (
              <Button 
                onClick={openAddDialog}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Gallery Item
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragOver={(e) => handleDragOver(e, item)}
                onDragEnd={handleDragEnd}
                className={`cursor-move ${draggedItem?.id === item.id ? 'opacity-50' : ''}`}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-square">
                    {item.featured && (
                      <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                        Featured
                      </div>
                    )}
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="text-xs text-gray-500 mb-3">
                      Category: {categories.find(c => c.id === item.category)?.name || 'Unknown'}
                    </div>
                    
                    <div className="mt-auto flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => openEditDialog(item)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteItem(item.id, item.image)}
                        disabled={isSubmitting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Gallery Item" : "Add Gallery Item"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update the gallery item below" 
                : "Upload a new image to your gallery"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category}
                  onValueChange={handleCategorySelect}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Image {!isEditMode && '*'}</Label>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {imageFile ? 'Change Image' : 'Upload Image'}
                    </Button>
                  </div>
                  
                  <div className="h-20 w-20 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                    {imageFile ? (
                      <img 
                        src={URL.createObjectURL(imageFile)} 
                        alt="Preview" 
                        className="h-full w-full object-cover"
                      />
                    ) : isEditMode && selectedItem?.image ? (
                      <img 
                        src={selectedItem.image} 
                        alt="Current Image" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>
                {imageFile && (
                  <div className="flex items-center mt-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-xs text-gray-500 truncate flex-1">
                      {imageFile.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500 h-6 w-6 p-0"
                      onClick={() => setImageFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleFeaturedChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="featured">Featured Item</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowAddDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Update Item' : 'Add Item'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryAdmin;
