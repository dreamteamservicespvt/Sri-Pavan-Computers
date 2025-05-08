
import React, { useState, useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import SectionHeading from '@/components/SectionHeading';
import { X } from 'lucide-react';

// Gallery images data with fixed image links
const galleryImages = [
  {
    id: 1,
    category: "store",
    src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=2070",
    alt: "Sri Pavan Computers store front",
    title: "Our Store Front"
  },
  {
    id: 2,
    category: "products",
    src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2064",
    alt: "Laptop display in store",
    title: "Laptop Display"
  },
  {
    id: 3,
    category: "products",
    src: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070",
    alt: "Custom built desktop PC",
    title: "Custom Gaming PC"
  },
  {
    id: 4,
    category: "store",
    src: "https://images.unsplash.com/photo-1553835973-dec43bfddbeb?q=80&w=2070",
    alt: "Inside our store",
    title: "Store Interior"
  },
  {
    id: 5,
    category: "service",
    // Fixed technician repairing computer image
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069",
    alt: "Technician repairing computer",
    title: "Computer Repair Service"
  },
  {
    id: 6,
    category: "products",
    src: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=2069",
    alt: "Gaming accessories",
    title: "Gaming Accessories"
  },
  {
    id: 7,
    category: "service",
    // Fixed network installation image
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2068",
    alt: "Network installation",
    title: "Network Setup Service"
  },
  {
    id: 8,
    category: "products",
    src: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033",
    alt: "Mobile devices display",
    title: "Tablets & Smartphones"
  },
  {
    id: 9,
    category: "events",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070",
    alt: "Tech workshop event",
    title: "Technology Workshop"
  },
  {
    id: 10,
    category: "events",
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070",
    alt: "Customer appreciation day",
    title: "Customer Appreciation Day"
  },
  {
    id: 11,
    category: "store",
    src: "https://images.unsplash.com/photo-1597423498219-04418210827d?q=80&w=1974",
    alt: "Product display shelves",
    title: "Product Display"
  },
  {
    id: 12,
    category: "service",
    // Fixed data recovery service image
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2068",
    alt: "Data recovery service",
    title: "Data Recovery Service"
  }
];

// Gallery categories
const categories = ["all", "store", "products", "service", "events"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<null | typeof galleryImages[0]>(null);
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
  return (
    <div className="bg-gray-50 min-h-screen " id="gallery-section">
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Gallery</h1>
            <p className="text-xl opacity-90">Explore our store, products, and services through images</p>
          </div>
        </div>
      </section>

      {/* Gallery categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Photo Gallery" 
            subtitle="Browse images of our store, products, and events"
            center={true}
          />
          
          <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map(image => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer h-64 animate-fade-in"
                onClick={() => setLightboxImage(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  <p className="text-white/80 text-sm capitalize">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured slideshow */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Featured Images" 
            subtitle="Highlights from our store and services"
            center={true}
          />
          
          <div className="mt-12 max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.slice(0, 6).map(image => (
                  <CarouselItem key={image.id}>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-lg">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-[400px] object-cover object-center"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <h3 className="font-bold text-lg">{image.title}</h3>
                        <p className="text-gray-500 capitalize">{image.category}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 bg-black/50 rounded-full"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          
          <img 
            src={lightboxImage.src} 
            alt={lightboxImage.alt}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={e => e.stopPropagation()}
          />
          
          <div 
            className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold">{lightboxImage.title}</h3>
            <p className="text-sm text-white/80">{lightboxImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
