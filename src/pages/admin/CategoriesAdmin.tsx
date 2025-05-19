import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  AlertTriangle,
  Folder,
  Loader2,
  Check,
  X,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  Timestamp, // Add this import
  where 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  sortOrder: number;
  featured: boolean;
  productCount?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const CategoriesAdmin: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCategoryDialog, setShowCategoryDialog] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reordering, setReordering] = useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    featured: false,
  });
  
  const { toast } = useToast();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch categories ordered by sortOrder
        const categoriesQuery = query(collection(db, "categories"), orderBy("sortOrder", "asc"));
        const categoriesSnapshot = await getDocs(categoriesQuery);
        
        // Transform and set categories
        let categoriesData = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Category[];
        
        // Fetch product counts for each category
        const productsSnapshot = await getDocs(collection(db, "products"));
        const products = productsSnapshot.docs.map(doc => doc.data());
        
        // Count products per category
        const productCounts: Record<string, number> = {};
        products.forEach(product => {
          const categoryId = product.category;
          if (categoryId) {
            productCounts[categoryId] = (productCounts[categoryId] || 0) + 1;
          }
        });
        
        // Add product counts to categories
        categoriesData = categoriesData.map(category => ({
          ...category,
          productCount: productCounts[category.id] || 0
        }));
        
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'name' && !isEditMode) {
      // Auto-generate slug from name
      const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setFormData({
        ...formData,
        name: value,
        slug
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle featured checkbox change
  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      featured: e.target.checked
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      slug: '',
      featured: false
    });
    setSelectedCategory(null);
    setIsEditMode(false);
  };

  // Open create dialog
  const openCreateDialog = () => {
    resetForm();
    setShowCategoryDialog(true);
  };

  // Open edit dialog
  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsEditMode(true);
    
    setFormData({
      name: category.name,
      description: category.description || '',
      slug: category.slug,
      featured: category.featured || false
    });
    
    setShowCategoryDialog(true);
  };

  // Move category up or down
  const moveCategory = async (categoryId: string, direction: 'up' | 'down') => {
    const currentIndex = categories.findIndex(c => c.id === categoryId);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === categories.length - 1)
    ) {
      return; // Can't move further
    }
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    try {
      setReordering(true);
      
      // Swap the categories
      const newCategories = [...categories];
      const temp = newCategories[currentIndex];
      newCategories[currentIndex] = newCategories[newIndex];
      newCategories[newIndex] = temp;
      
      // Update sort orders
      newCategories[currentIndex].sortOrder = currentIndex + 1;
      newCategories[newIndex].sortOrder = newIndex + 1;
      
      // Update in Firestore
      await updateDoc(doc(db, "categories", newCategories[currentIndex].id), {
        sortOrder: newCategories[currentIndex].sortOrder
      });
      
      await updateDoc(doc(db, "categories", newCategories[newIndex].id), {
        sortOrder: newCategories[newIndex].sortOrder
      });
      
      // Update state
      setCategories(newCategories);
      
      toast({
        title: "Category Reordered",
        description: "Category order has been updated successfully",
      });
    } catch (error) {
      console.error("Error reordering categories:", error);
      toast({
        title: "Error",
        description: "Failed to reorder categories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setReordering(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form
      if (!formData.name.trim() || !formData.slug.trim()) {
        toast({
          title: "Missing Information",
          description: "Name and slug are required",
          variant: "destructive",
        });
        return;
      }
      
      if (isEditMode && selectedCategory) {
        // Update existing category
        await updateDoc(doc(db, "categories", selectedCategory.id), {
          name: formData.name,
          description: formData.description,
          slug: formData.slug,
          featured: formData.featured,
          updatedAt: Timestamp.now()
        });
        
        // Update the category in state
        setCategories(prevCategories => 
          prevCategories.map(category => 
            category.id === selectedCategory.id ? 
              {
                ...category,
                name: formData.name,
                description: formData.description,
                slug: formData.slug,
                featured: formData.featured,
                updatedAt: Timestamp.now()
              } : 
              category
          )
        );
        
        toast({
          title: "Category Updated",
          description: "The category has been updated successfully",
        });
      } else {
        // Check for duplicate slug
        const slugExists = categories.some(c => c.slug === formData.slug);
        if (slugExists) {
          toast({
            title: "Duplicate Slug",
            description: "A category with this slug already exists. Please choose a different one.",
            variant: "destructive",
          });
          return;
        }
        
        // Get highest sort order
        const highestSortOrder = categories.length > 0 
          ? Math.max(...categories.map(c => c.sortOrder || 0)) 
          : 0;
        
        // Add new category
        const newCategory = {
          name: formData.name,
          description: formData.description,
          slug: formData.slug,
          featured: formData.featured,
          sortOrder: highestSortOrder + 1,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };
        
        const docRef = await addDoc(collection(db, "categories"), newCategory);
        
        // Add the new category to state
        setCategories([...categories, { id: docRef.id, ...newCategory, productCount: 0 } as Category]);
        
        toast({
          title: "Category Created",
          description: "The new category has been added successfully",
        });
      }
      
      // Reset and close dialog
      resetForm();
      setShowCategoryDialog(false);
      
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description: "Failed to save the category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId: string, productCount: number = 0) => {
    if (productCount > 0) {
      toast({
        title: "Cannot Delete",
        description: `This category contains ${productCount} products. Reassign them before deleting.`,
        variant: "destructive",
      });
      return;
    }
    
    if (!window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Delete the category
      await deleteDoc(doc(db, "categories", categoryId));
      
      // Update the categories list
      setCategories(categories.filter(category => category.id !== categoryId));
      
      toast({
        title: "Category Deleted",
        description: "The category has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete the category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter categories by search
  const filteredCategories = categories.filter(category => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      category.name.toLowerCase().includes(searchLower) ||
      (category.description && category.description.toLowerCase().includes(searchLower))
    );
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading categories...</p>
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
        <h1 className="text-2xl font-bold tracking-tight">Categories Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search categories..." 
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
          
          <Button 
            onClick={openCreateDialog}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>
      
      {/* Categories table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Folder className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? "Try adjusting your search" 
                : "Start by adding categories to your store"}
            </p>
            {searchQuery ? (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            ) : (
              <Button 
                onClick={openCreateDialog}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Category
              </Button>
            )}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Order</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Slug</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="text-center">Products</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => moveCategory(category.id, 'up')}
                            disabled={reordering || categories[0].id === category.id}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => moveCategory(category.id, 'down')}
                            disabled={reordering || categories[categories.length - 1].id === category.id}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Folder className="h-4 w-4 text-blue-500" />
                          {category.name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-500">
                        {category.slug}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-500 max-w-xs truncate">
                        {category.description || "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {category.productCount || 0}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {category.featured ? (
                          <Badge className="bg-amber-100 text-amber-800 group-hover:bg-amber-200">
                            Featured
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            Standard
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id, category.productCount)}
                            disabled={isSubmitting || (category.productCount && category.productCount > 0)}
                            className={`${(category.productCount && category.productCount > 0) 
                              ? 'text-gray-400 cursor-not-allowed' 
                              : 'text-red-500 hover:text-red-600 hover:bg-red-50'}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </motion.div>
      
      {/* Category Dialog - Create/Edit */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update the category information below" 
                : "Fill in the details to add a new category"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter category name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug * <span className="text-gray-500 text-xs">(for URLs)</span>
                </Label>
                <Input 
                  id="slug" 
                  name="slug" 
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="category-slug"
                  required
                  pattern="^[a-z0-9-]+$"
                  title="Only lowercase letters, numbers, and hyphens are allowed"
                />
                <p className="text-xs text-gray-500">
                  Only lowercase letters, numbers, and hyphens. No spaces.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter category description"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleFeaturedChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="featured">Featured Category</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowCategoryDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Update Category' : 'Add Category'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesAdmin;
