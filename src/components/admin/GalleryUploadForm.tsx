import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ImagePlus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { uploadImage } from '@/lib/imageUtils';
import { toast } from '@/hooks/use-toast';
import { GalleryCategory } from '@/services/galleryService';

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z.string().optional(),
  category: z.enum(['Store', 'Products', 'Services', 'Events']),
  imageUrl: z.string().url("Please upload an image"),
});

export type GalleryUploadFormValues = z.infer<typeof formSchema>;

interface GalleryUploadFormProps {
  defaultValues?: GalleryUploadFormValues;
  onSubmit: (data: GalleryUploadFormValues) => Promise<void>;
  isLoading: boolean;
}

const GalleryUploadForm: React.FC<GalleryUploadFormProps> = ({ defaultValues, onSubmit, isLoading }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues?.imageUrl || null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const form = useForm<GalleryUploadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      category: 'Products',
      imageUrl: '',
    },
  });

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Basic validation
      if (!file.type.startsWith('image/')) {
        form.setError('imageUrl', { message: 'Please select an image file' });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        form.setError('imageUrl', { message: 'Image size should be less than 5MB' });
        return;
      }
      
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle image upload to Cloudinary
  const handleUpload = async () => {
    if (!imageFile) return;
    
    try {
      setUploadLoading(true);
      form.clearErrors('imageUrl'); // Clear any previous errors
      
      // Use the enhanced uploadImage utility
      const result = await uploadImage(imageFile);
      
      if (result.success && result.url) {
        form.setValue('imageUrl', result.url);
        setImagePreview(result.url);
        
        toast({
          title: "Upload successful",
          description: "Image has been uploaded successfully",
        });
        
        return result.url;
      } else {
        const errorMessage = result.error || 'Failed to upload image';
        form.setError('imageUrl', { message: errorMessage });
        
        toast({
          title: "Upload failed",
          description: errorMessage,
          variant: "destructive",
        });
        
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      form.setError('imageUrl', { message: errorMessage });
      toast({
        title: "Upload error",
        description: errorMessage,
        variant: "destructive",
      });
      
      return null;
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle form submission with image upload
  const handleFormSubmit = async (data: GalleryUploadFormValues) => {
    try {
      if (imageFile) {
        const uploadedUrl = await handleUpload();
        if (!uploadedUrl) return;
        data.imageUrl = uploadedUrl;
      }
      
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Title field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Image title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Store">Store</SelectItem>
                      <SelectItem value="Products">Products</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe this image..."
                      className="h-32 resize-none"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Add details about what this image shows
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image upload section */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gallery Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center space-y-4">
                      {/* Image preview */}
                      <div className="relative w-full h-60 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center">
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={imagePreview} 
                              alt="Gallery preview" 
                              className="w-full h-full object-contain rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 rounded-full"
                              onClick={() => {
                                setImagePreview(null);
                                setImageFile(null);
                                form.setValue('imageUrl', '');
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, WEBP up to 5MB
                            </p>
                          </div>
                        )}

                        <input 
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${imagePreview ? 'hidden' : ''}`}
                        />
                      </div>

                      {/* Hidden input for form validation */}
                      <input 
                        type="hidden" 
                        {...field}
                      />

                      {/* Manual upload button */}
                      {imageFile && !form.getValues('imageUrl') && (
                        <Button
                          type="button"
                          onClick={handleUpload}
                          disabled={uploadLoading}
                          className="w-full"
                        >
                          {uploadLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            'Upload Image'
                          )}
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit button */}
        <Button 
          type="submit" 
          disabled={isLoading || uploadLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {defaultValues ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            defaultValues ? 'Update Gallery Item' : 'Add to Gallery'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default GalleryUploadForm;
