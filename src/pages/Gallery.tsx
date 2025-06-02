import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSEO } from '@/contexts/SEOContext';
import { getGalleryItems, GalleryCategory, GalleryItem } from '@/services/galleryService';
import SectionHeading from '@/components/SectionHeading';
import { Loader2, Search, X, ZoomIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Gallery = () => {
  const { updateSEO } = useSEO();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update SEO settings
    updateSEO({
      title: 'Gallery | Sri Pavan Computers - See Our Store, Products & Services',
      description: 'Explore Sri Pavan Computers through our gallery showcasing our store, product range, services, and special events in Kakinada.',
      keywords: 'computer shop photos, IT store gallery, Kakinada computer store, tech service images, Sri Pavan gallery',
      canonicalUrl: 'https://sripavancomputers.in/gallery',
      ogImage: 'https://sripavancomputers.in/images/gallery-og.jpg'
    });

    // Load gallery items
    const loadGalleryItems = async () => {
      setIsLoading(true);
      try {
        const items = await getGalleryItems();
        setGalleryItems(items);
        setFilteredItems(items);
      } catch (error) {
        console.error('Error loading gallery:', error);
        setError('Failed to load gallery. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGalleryItems();
  }, [updateSEO]);

  // Filter gallery items when category or search changes
  useEffect(() => {
    let filtered = galleryItems;
    
    // Apply category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(item => item.category === activeCategory);
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
  }, [activeCategory, searchQuery, galleryItems]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Handler for category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category as GalleryCategory | 'All');
  };

  // Clear search handler
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Image overlay handler
  const openImageOverlay = (item: GalleryItem) => {
    setSelectedImage(item);
  };

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery Unavailable</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[70vh] py-16">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Our Gallery" 
          subtitle="Explore our store, products, and services through images" 
          center={true}
        />

        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search gallery images..."
              className="pl-10 h-12 pr-10 border-gray-200 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-8">
          <Tabs 
            defaultValue="All" 
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full"
          >
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Store">Store</TabsTrigger>
                <TabsTrigger value="Products">Products</TabsTrigger>
                <TabsTrigger value="Services">Services</TabsTrigger>
                <TabsTrigger value="Events">Events</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeCategory} className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                    <p className="text-gray-500">Loading gallery images...</p>
                  </div>
                </div>
              ) : filteredItems.length > 0 ? (
                <AnimatePresence>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    key={activeCategory + searchQuery} // Re-animate when filters change
                  >
                    {filteredItems.map((item) => (
                      <motion.div 
                        key={item.id} 
                        variants={itemVariants}
                        className="gallery-item group cursor-pointer"
                        onClick={() => openImageOverlay(item)}
                      >
                        <div className="relative h-0 pb-[75%] overflow-hidden rounded-lg bg-gray-100 shadow-md">
                          <img 
                            src={item.imageUrl}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <ZoomIn className="text-white h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-lg font-semibold line-clamp-1">{item.title}</h3>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center mx-auto max-w-xl">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery 
                      ? "No images match your search criteria. Try different keywords."
                      : `No images available in the "${activeCategory}" category yet.`}
                  </p>
                  
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Image detail dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 bg-black flex items-center justify-center">
              <img 
                src={selectedImage?.imageUrl} 
                alt={selectedImage?.title || 'Gallery image'} 
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
            <div className="p-6 md:w-1/3">
              <h2 className="text-xl font-bold mb-2">{selectedImage?.title}</h2>
              
              {selectedImage?.category && (
                <div className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
                  {selectedImage.category}
                </div>
              )}
              
              {selectedImage?.description && (
                <p className="text-gray-600 text-sm">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
