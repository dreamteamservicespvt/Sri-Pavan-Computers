import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  AlertTriangle,
  Package,
  Upload,
  Tag,
  Save,
  Loader2
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
  limit, 
  startAfter, 
  where, 
  Timestamp 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '@/lib/firebase';

// Define types
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  brand: string;
  images: string[];
  stock: number;
  tags: string[];
  featured: boolean;
  specifications?: Record<string, string>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
  logo?: string;
}

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterBrand, setFilterBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showProductDialog, setShowProductDialog] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadingImages, setUploadingImages] = useState<boolean>(false);
  const [tempImages, setTempImages] = useState<File[]>([]);
  const [specificationKeys, setSpecificationKeys] = useState<string[]>([]);
  const [specificationValues, setSpecificationValues] = useState<string[]>([]);
  
  const { toast } = useToast();
  const storage = getStorage();

  // New product template
  const emptyProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
    name: '',
    description: '',
    price: 0,
    salePrice: 0,
    category: '',
    brand: '',
    images: [],
    stock: 0,
    tags: [],
    featured: false,
    specifications: {}
  };

  // Form state
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>(emptyProduct);
  const [tagInput, setTagInput] = useState<string>('');

  // Fetch products, categories, and brands
  useEffect(() => {
    const fetchProductData = async () => {
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
        
        // Fetch brands
        const brandsSnapshot = await getDocs(collection(db, "brands"));
        const brandsData = brandsSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          logo: doc.data().logo
        }));
        setBrands(brandsData);
        
        // Fetch products with filters and pagination
        let productsQuery = collection(db, "products");
        let queryConstraints = [];
        
        // Add filters
        if (filterCategory !== "all") {
          queryConstraints.push(where("category", "==", filterCategory));
        }
        
        if (filterBrand !== "all") {
          queryConstraints.push(where("brand", "==", filterBrand));
        }
        
        // Add order and limit
        queryConstraints.push(orderBy("createdAt", "desc"));
        queryConstraints.push(limit(pageSize));
        
        // Add pagination
        if (currentPage > 1 && lastVisible) {
          queryConstraints.push(startAfter(lastVisible));
        }
        
        const q = query(productsQuery, ...queryConstraints);
        const querySnapshot = await getDocs(q);
        
        // Calculate total pages
        const totalQuery = query(
          collection(db, "products"),
          ...(filterCategory !== "all" ? [where("category", "==", filterCategory)] : []),
          ...(filterBrand !== "all" ? [where("brand", "==", filterBrand)] : [])
        );
        const totalSnapshot = await getDocs(totalQuery);
        setTotalPages(Math.ceil(totalSnapshot.size / pageSize));
        
        if (querySnapshot.empty) {
          setProducts([]);
          setIsLoading(false);
          return;
        }
        
        // Set last visible for pagination
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        
        // Transform and set products
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductData();
  }, [currentPage, pageSize, filterCategory, filterBrand]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === 'price' || name === 'salePrice' || name === 'stock') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      featured: checked
    });
  };

  // Handle tag input
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  // Remove tag
  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  // Handle adding specification row
  const handleAddSpecification = () => {
    setSpecificationKeys([...specificationKeys, '']);
    setSpecificationValues([...specificationValues, '']);
  };

  // Handle specification key/value change
  const handleSpecificationChange = (index: number, type: 'key' | 'value', value: string) => {
    if (type === 'key') {
      const newKeys = [...specificationKeys];
      newKeys[index] = value;
      setSpecificationKeys(newKeys);
    } else {
      const newValues = [...specificationValues];
      newValues[index] = value;
      setSpecificationValues(newValues);
    }
  };

  // Remove specification row
  const handleRemoveSpecification = (index: number) => {
    setSpecificationKeys(specificationKeys.filter((_, i) => i !== index));
    setSpecificationValues(specificationValues.filter((_, i) => i !== index));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    setTempImages(prev => [...prev, ...files]);
  };

  // Remove temporary image
  const handleRemoveTempImage = (index: number) => {
    setTempImages(tempImages.filter((_, i) => i !== index));
  };

  // Remove existing image
  const handleRemoveExistingImage = (url: string) => {
    setFormData({
      ...formData,
      images: formData.images.filter(image => image !== url)
    });
  };

  // Upload images to Firebase Storage
  const uploadImagesToStorage = async (): Promise<string[]> => {
    if (tempImages.length === 0) return [];
    
    setUploadingImages(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (const file of tempImages) {
        // Create a reference to the storage location
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        
        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(downloadURL);
      }
      
      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        title: "Error",
        description: "Failed to upload one or more images",
        variant: "destructive",
      });
      return [];
    } finally {
      setUploadingImages(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form
      if (!formData.name || !formData.category || !formData.brand || formData.price <= 0) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      // Convert specifications from separate arrays to object
      const specifications: Record<string, string> = {};
      specificationKeys.forEach((key, index) => {
        if (key.trim() && specificationValues[index]) {
          specifications[key.trim()] = specificationValues[index];
        }
      });
      
      // Upload images first if there are any temporary images
      const uploadedImageUrls = await uploadImagesToStorage();
      
      // Combine existing and new image URLs
      const allImages = [...formData.images, ...uploadedImageUrls];
      
      // Prepare data for submission
      const productData = {
        ...formData,
        specifications,
        images: allImages,
        updatedAt: Timestamp.now()
      };
      
      if (isEditMode && selectedProduct) {
        // Update existing product
        await updateDoc(doc(db, "products", selectedProduct.id), productData);
        
        toast({
          title: "Product Updated",
          description: "The product has been updated successfully",
        });
      } else {
        // Add new product
        const newProductData = {
          ...productData,
          createdAt: Timestamp.now()
        };
        
        await addDoc(collection(db, "products"), newProductData);
        
        toast({
          title: "Product Added",
          description: "The new product has been added successfully",
        });
      }
      
      // Reset form and close dialog
      resetForm();
      setShowProductDialog(false);
      
      // Refresh products list
      window.location.reload();
      
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Error",
        description: "Failed to save the product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId: string, productImages: string[]) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Delete the product from Firestore
      await deleteDoc(doc(db, "products", productId));
      
      // Delete associated images from Storage
      for (const imageUrl of productImages) {
        try {
          // Extract the file path from the URL
          const imagePath = imageUrl.split('products%2F')[1].split('?')[0];
          const decodedPath = decodeURIComponent(imagePath);
          const imageRef = ref(storage, `products/${decodedPath}`);
          
          await deleteObject(imageRef);
        } catch (err) {
          console.error("Error deleting image:", err);
          // Continue with other images even if one fails
        }
      }
      
      // Update the products list
      setProducts(products.filter(product => product.id !== productId));
      
      toast({
        title: "Product Deleted",
        description: "The product has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete the product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(emptyProduct);
    setTagInput('');
    setTempImages([]);
    setSpecificationKeys([]);
    setSpecificationValues([]);
    setSelectedProduct(null);
    setIsEditMode(false);
  };

  // Open edit dialog
  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    
    // Extract specification keys and values
    const specKeys: string[] = [];
    const specValues: string[] = [];
    
    if (product.specifications) {
      Object.entries(product.specifications).forEach(([key, value]) => {
        specKeys.push(key);
        specValues.push(value);
      });
    }
    
    setSpecificationKeys(specKeys);
    setSpecificationValues(specValues);
    
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      salePrice: product.salePrice || 0,
      category: product.category,
      brand: product.brand,
      images: product.images || [],
      stock: product.stock,
      tags: product.tags || [],
      featured: product.featured || false,
      specifications: product.specifications || {}
    });
    
    setShowProductDialog(true);
  };

  // Open create dialog
  const openCreateDialog = () => {
    resetForm();
    setShowProductDialog(true);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Filter products by search
  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  });

  // Loading state
  if (isLoading && currentPage === 1) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !products.length) {
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
        <h1 className="text-2xl font-bold tracking-tight">Products Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search products..." 
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
              setFilterCategory(value);
              setCurrentPage(1);
            }}
            defaultValue={filterCategory}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            onValueChange={(value) => {
              setFilterBrand(value);
              setCurrentPage(1);
            }}
            defaultValue={filterBrand}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={openCreateDialog}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>
      
      {/* Products table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="p-0">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-1">
                  {searchQuery || filterCategory !== "all" || filterBrand !== "all" 
                    ? "Try adjusting your search filters" 
                    : "Start by adding products to your inventory"}
                </p>
                {searchQuery || filterCategory !== "all" || filterBrand !== "all" ? (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('');
                      setFilterCategory('all');
                      setFilterBrand('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                ) : (
                  <Button 
                    className="mt-4"
                    onClick={openCreateDialog}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                )}
              </div>
            ) : (
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Brand</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <img 
                                src={product.images[0]} 
                                alt={product.name} 
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <Package className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            {product.featured && (
                              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {categories.find(c => c.id === product.category)?.name || product.category}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {brands.find(b => b.id === product.brand)?.name || product.brand}
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          {product.salePrice && product.salePrice < product.price ? (
                            <>
                              <div className="font-medium">{formatCurrency(product.salePrice)}</div>
                              <div className="text-xs text-gray-500 line-through">
                                {formatCurrency(product.price)}
                              </div>
                            </>
                          ) : (
                            <div className="font-medium">{formatCurrency(product.price)}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {product.stock > 0 ? product.stock : "Out of stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id, product.images || [])}
                            disabled={isSubmitting}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= totalPages || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Product Dialog - Create/Edit Product */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update the product information below" 
                : "Fill in the details to add a new product to your inventory"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              
              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input 
                      id="price" 
                      name="price" 
                      type="number" 
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price (₹)</Label>
                    <Input 
                      id="salePrice" 
                      name="salePrice" 
                      type="number" 
                      value={formData.salePrice || ''}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="Leave empty if no sale"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input 
                      id="stock" 
                      name="stock" 
                      type="number" 
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      name="category"
                      value={formData.category}
                      onValueChange={(value) => setFormData({...formData, category: value})}
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
                    <Label htmlFor="brand">Brand *</Label>
                    <Select 
                      name="brand"
                      value={formData.brand}
                      onValueChange={(value) => setFormData({...formData, brand: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map(brand => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="py-1 px-2">
                        {tag}
                        <button 
                          type="button"
                          onClick={() => handleRemoveTag(tag)} 
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </TabsContent>
              
              {/* Images Tab */}
              <TabsContent value="images" className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Drag & drop files or click to browse</p>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                </div>
                
                {/* Existing Images */}
                {formData.images.length > 0 && (
                  <div>
                    <Label className="mb-2 block">Current Images</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {formData.images.map((imageUrl, index) => (
                        <div 
                          key={index} 
                          className="relative group aspect-square rounded-md overflow-hidden border"
                        >
                          <img 
                            src={imageUrl} 
                            alt={`Product ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(imageUrl)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Preview Temporary Images */}
                {tempImages.length > 0 && (
                  <div>
                    <Label className="mb-2 block">New Images to Upload</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {tempImages.map((file, index) => (
                        <div 
                          key={index} 
                          className="relative group aspect-square rounded-md overflow-hidden border"
                        >
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Upload ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveTempImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* Specifications Tab */}
              <TabsContent value="specifications" className="space-y-4">
                <p className="text-sm text-gray-500">
                  Add product specifications like processor, RAM, storage, etc.
                </p>
                
                {specificationKeys.map((key, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <Input
                        placeholder="Specification name"
                        value={key}
                        onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Specification value"
                        value={specificationValues[index]}
                        onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                      />
                    </div>
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveSpecification(index)}
                      className="text-red-500 mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button 
                  type="button"
                  variant="outline" 
                  className="mt-2" 
                  onClick={handleAddSpecification}
                >
                  Add Specification
                </Button>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowProductDialog(false)}
                disabled={isSubmitting || uploadingImages}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting || uploadingImages}
                className="ml-2"
              >
                {(isSubmitting || uploadingImages) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsAdmin;