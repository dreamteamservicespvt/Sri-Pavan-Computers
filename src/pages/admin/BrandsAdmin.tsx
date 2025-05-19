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
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  AlertTriangle,
  Star,
  Upload,
  X,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db } from '@/lib/firebase';

interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  featured: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const BrandsAdmin: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showBrandDialog, setShowBrandDialog] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    featured: false
  });
  
  const { toast } = useToast();
  const storage = getStorage();

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const brandsSnapshot = await getDocs(collection(db, "brands"));
        const brandsData = brandsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Brand[];
        
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setError("Failed to load brands. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBrands();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkbox change
  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      featured: e.target.checked
    });
  };

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setLogoFile(e.target.files[0]);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      website: '',
      featured: false
    });
    setLogoFile(null);
    setSelectedBrand(null);
    setIsEditMode(false);
  };

  // Open create dialog
  const openCreateDialog = () => {
    resetForm();
    setShowBrandDialog(true);
  };

  // Open edit dialog
  const openEditDialog = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsEditMode(true);
    
    setFormData({
      name: brand.name,
      description: brand.description || '',
      website: brand.website || '',
      featured: brand.featured || false
    });
    
    setShowBrandDialog(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate form
      if (!formData.name.trim()) {
        toast({
          title: "Missing Information",
          description: "Brand name is required",
          variant: "destructive",
        });
        return;
      }
      
      let logoUrl = isEditMode && selectedBrand ? selectedBrand.logo : undefined;
      
      // Upload logo if provided
      if (logoFile) {
        const storageRef = ref(storage, `brands/${Date.now()}_${logoFile.name}`);
        await uploadBytes(storageRef, logoFile);
        logoUrl = await getDownloadURL(storageRef);
        
        // Delete old logo if exists and being replaced
        if (isEditMode && selectedBrand?.logo) {
          try {
            const oldLogoRef = ref(storage, selectedBrand.logo);
            await deleteObject(oldLogoRef);
          } catch (error) {
            console.error("Error deleting old logo:", error);
            // Continue even if deletion fails
          }
        }
      }
      
      if (isEditMode && selectedBrand) {
        // Update existing brand
        const brandRef = doc(db, "brands", selectedBrand.id);
        await updateDoc(brandRef, {
          name: formData.name,
          description: formData.description,
          website: formData.website,
          logo: logoUrl,
          featured: formData.featured,
          updatedAt: Timestamp.now()
        });
        
        // Update local state
        setBrands(brands.map(brand => 
          brand.id === selectedBrand.id ? {
            ...brand,
            name: formData.name,
            description: formData.description,
            website: formData.website,
            logo: logoUrl,
            featured: formData.featured,
            updatedAt: Timestamp.now()
          } : brand
        ));
        
        toast({
          title: "Brand Updated",
          description: "The brand has been updated successfully",
        });
      } else {
        // Add new brand
        const newBrand = {
          name: formData.name,
          description: formData.description,
          website: formData.website,
          logo: logoUrl,
          featured: formData.featured,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };
        
        const docRef = await addDoc(collection(db, "brands"), newBrand);
        
        // Update local state
        setBrands([...brands, { id: docRef.id, ...newBrand } as Brand]);
        
        toast({
          title: "Brand Created",
          description: "The new brand has been added successfully",
        });
      }
      
      // Reset and close dialog
      resetForm();
      setShowBrandDialog(false);
      
    } catch (error) {
      console.error("Error saving brand:", error);
      toast({
        title: "Error",
        description: "Failed to save the brand. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete brand
  const handleDeleteBrand = async (brandId: string, logo?: string) => {
    if (!window.confirm("Are you sure you want to delete this brand? This action cannot be undone.")) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Delete from Firestore
      await deleteDoc(doc(db, "brands", brandId));
      
      // Delete logo from storage if exists
      if (logo) {
        try {
          const logoRef = ref(storage, logo);
          await deleteObject(logoRef);
        } catch (error) {
          console.error("Error deleting logo:", error);
          // Continue even if deletion fails
        }
      }
      
      // Update local state
      setBrands(brands.filter(brand => brand.id !== brandId));
      
      toast({
        title: "Brand Deleted",
        description: "The brand has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast({
        title: "Error",
        description: "Failed to delete the brand. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter brands by search
  const filteredBrands = brands.filter(brand => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      brand.name.toLowerCase().includes(searchLower) ||
      (brand.description && brand.description.toLowerCase().includes(searchLower))
    );
  });

  // Sort brands: featured first, then alphabetical
  const sortedBrands = [...filteredBrands].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading brands...</p>
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
        <h1 className="text-2xl font-bold tracking-tight">Brands Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search brands..." 
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
            Add Brand
          </Button>
        </div>
      </div>
      
      {/* Brands grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {sortedBrands.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No brands found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? "Try adjusting your search" 
                : "Start by adding brands to your store"}
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
                Add Your First Brand
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBrands.map((brand) => (
              <Card key={brand.id} className="overflow-hidden">
                <div className="relative">
                  {brand.featured && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      Featured
                    </div>
                  )}
                  <div className="h-40 bg-gray-100 flex items-center justify-center p-4">
                    {brand.logo ? (
                      <img 
                        src={brand.logo} 
                        alt={brand.name} 
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon className="h-10 w-10 mb-2" />
                        <span className="text-sm">No logo</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle>{brand.name}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  {brand.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {brand.description}
                    </p>
                  )}
                  
                  {brand.website && (
                    <a 
                      href={brand.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline mb-4 block truncate"
                    >
                      {brand.website}
                    </a>
                  )}
                  
                  <div className="flex justify-end gap-2 mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openEditDialog(brand)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteBrand(brand.id, brand.logo)}
                      disabled={isSubmitting}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Brand Dialog - Create/Edit */}
      <Dialog open={showBrandDialog} onOpenChange={setShowBrandDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Brand" : "Add New Brand"}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? "Update the brand information below" 
                : "Fill in the details to add a new brand"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Brand Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter brand name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter brand description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input 
                  id="website" 
                  name="website" 
                  type="url" 
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Brand Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('logo')?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {logoFile ? 'Change Logo' : 'Upload Logo'}
                    </Button>
                  </div>
                  
                  <div className="h-16 w-16 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                    {logoFile ? (
                      <img 
                        src={URL.createObjectURL(logoFile)} 
                        alt="Logo Preview" 
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : isEditMode && selectedBrand?.logo ? (
                      <img 
                        src={selectedBrand.logo} 
                        alt="Current Logo" 
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>
                {logoFile && (
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-500 truncate flex-1">
                      {logoFile.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500 h-6 w-6 p-0"
                      onClick={() => setLogoFile(null)}
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
                <Label htmlFor="featured">Featured Brand</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setShowBrandDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Update Brand' : 'Add Brand'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrandsAdmin;
