import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PlusCircle, 
  Search, 
  X, 
  Edit, 
  Trash2, 
  Save,
  Loader2
} from 'lucide-react';
import { 
  getAllDocuments, 
  createDocument, 
  updateDocument, 
  deleteDocument,
  Service,
  COLLECTIONS 
} from '@/lib/firebase-admin';
import ImageUpload from '@/components/admin/ui/ImageUpload';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

// Service icons for the select dropdown
const serviceIcons = [
  'Hammer', 'HardDrive', 'WifiIcon', 'Database', 'ShieldCheck', 
  'Laptop', 'Monitor', 'Printer', 'Headphones', 'CloudCog', 'Smartphone'
];

const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await getAllDocuments<Service>(COLLECTIONS.SERVICES);
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
        toast({
          title: 'Error',
          description: 'Failed to load services',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Filter services based on search term
  const filteredServices = services.filter(service => 
    service.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle opening the create dialog
  const handleCreate = () => {
    setCurrentService({
      title: '',
      description: '',
      icon: 'Hammer',
      backgroundImage: '',
      featured: false
    });
    setIsDialogOpen(true);
  };

  // Handle opening the edit dialog
  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  // Handle opening the delete confirmation dialog
  const handleDeleteClick = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentService(prev => prev ? ({ ...prev, [name]: value }) : null);
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setCurrentService(prev => prev ? ({ ...prev, [name]: value }) : null);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCurrentService(prev => prev ? ({ ...prev, [name]: checked }) : null);
  };

  // Handle image upload
  const handleImageUploaded = (url: string) => {
    setCurrentService(prev => prev ? ({ ...prev, backgroundImage: url }) : null);
  };

  // Submit the form to create or update a service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService || !currentService.title || !currentService.description || !currentService.backgroundImage) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (currentService.id) {
        // Update existing service
        const { id, ...serviceData } = currentService;
        await updateDocument<Service>(COLLECTIONS.SERVICES, id, serviceData as Service);
        
        // Update local state
        setServices(prev => 
          prev.map(service => service.id === id ? { ...service, ...serviceData } : service)
        );
        
        toast({
          title: 'Success',
          description: 'Service updated successfully',
        });
      } else {
        // Create new service
        const newService = await createDocument<Service>(COLLECTIONS.SERVICES, currentService as Service);
        
        // Update local state
        setServices(prev => [...prev, newService]);
        
        toast({
          title: 'Success',
          description: 'Service created successfully',
        });
      }
      
      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Error',
        description: 'Failed to save service',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle service deletion
  const handleDelete = async () => {
    if (!currentService || !currentService.id) return;
    
    setIsSubmitting(true);
    try {
      await deleteDocument(COLLECTIONS.SERVICES, currentService.id);
      
      // Update local state
      setServices(prev => prev.filter(service => service.id !== currentService.id));
      
      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      });
      
      // Close the dialog
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Manage your service offerings and pricing displayed on the website.
      </p>

      {/* Search bar */}
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        {searchTerm && (
          <Button variant="ghost" size="sm" onClick={() => setSearchTerm('')}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Services table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No services found
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="h-16 w-24 overflow-hidden rounded-md relative">
                        <ImageWithFallback 
                          src={service.backgroundImage}
                          alt={service.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate">{service.description}</div>
                    </TableCell>
                    <TableCell>
                      {service.featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Regular
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteClick(service)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentService?.id ? 'Edit Service' : 'Create New Service'}</DialogTitle>
            <DialogDescription>
              {currentService?.id 
                ? 'Make changes to the existing service here.' 
                : 'Add a new service to your website.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  name="title"
                  value={currentService?.title || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentService?.description || ''}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                  Icon
                </label>
                <Select
                  value={currentService?.icon || 'Hammer'}
                  onValueChange={(value) => handleSelectChange('icon', value)}
                >
                  <SelectTrigger id="icon">
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceIcons.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image <span className="text-red-500">*</span>
                </label>
                <ImageUpload
                  onImageUploaded={handleImageUploaded}
                  currentImage={currentService?.backgroundImage}
                  folderPath="services"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={currentService?.featured || false}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured Service (displayed prominently on the home page)
                </label>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Service
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the service "{currentService?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesAdmin;
