import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ImagePlus, X, Link as LinkIcon, Mail } from 'lucide-react';

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
import { uploadImage } from '@/lib/imageUtils';
import { uploadToCloudinary } from '@/lib/cloudinary';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  position: z.string().min(2, { message: "Position is required" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }).max(500, { message: "Bio must be less than 500 characters" }),
  image: z.string().url("Please upload an image"),
  linkedin: z.string().url("Must be a valid URL").or(z.string().length(0)).optional(),
  twitter: z.string().url("Must be a valid URL").or(z.string().length(0)).optional(),
  email: z.string().email("Must be a valid email").or(z.string().length(0)).optional(),
});

export type TeamFormValues = z.infer<typeof formSchema>;

interface TeamFormProps {
  defaultValues?: TeamFormValues;
  onSubmit: (data: TeamFormValues) => Promise<void>;
  isLoading: boolean;
}

const TeamForm: React.FC<TeamFormProps> = ({ defaultValues, onSubmit, isLoading }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValues?.image || null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: '',
      position: '',
      bio: '',
      image: '',
      linkedin: '',
      twitter: '',
      email: '',
    },
  });

  // Watch fields for form validation
  const imageUrl = form.watch('image');

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Basic validation
      if (!file.type.startsWith('image/')) {
        form.setError('image', { message: 'Please select an image file' });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        form.setError('image', { message: 'Image size should be less than 5MB' });
        return;
      }
      
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle image upload to Cloudinary with fallback
  const handleUpload = async () => {
    if (!imageFile) return;
    
    try {
      setUploadLoading(true);
      
      // Use the imageUtils helper that includes fallback
      const result = await uploadImage(imageFile, uploadToCloudinary);
      
      if (result.success) {
        form.setValue('image', result.url);
        setImagePreview(result.url);
        return result.url;
      } else {
        console.error('Upload failed with error:', result.error);
        form.setError('image', { 
          message: result.error ? `Failed to upload: ${result.error}` : 'Failed to upload image' 
        });
        return null;
      }
    } catch (error) {
      console.error('Error in handleUpload:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error during upload';
      form.setError('image', { message: errorMessage });
      return null;
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle form submission with image upload
  const handleFormSubmit = async (data: TeamFormValues) => {
    try {
      if (imageFile) {
        const uploadedUrl = await handleUpload();
        if (!uploadedUrl) return;
        data.image = uploadedUrl;
      } else if (!data.image) {
        // Ensure we have an image, either from file upload or from existing data
        form.setError('image', { message: 'Please upload an image' });
        return;
      }
      
      // Log submission for debugging
      console.log("Submitting team member form:", data);
      
      await onSubmit(data);
      
      if (!defaultValues) {
        // Reset form after successful submission for new entries
        form.reset({
          name: '',
          position: '',
          bio: '',
          image: '',
          linkedin: '',
          twitter: '',
          email: '',
        });
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position field */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="CEO & Founder" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio field */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A brief description about the team member..."
                      className="h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Max 500 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Links section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Social Links (Optional)</h3>
              
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input 
                          placeholder="LinkedIn profile URL" 
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input 
                          placeholder="Twitter profile URL" 
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <FormControl>
                        <Input 
                          placeholder="Contact email" 
                          type="email"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Image upload section */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center space-y-4">
                      {/* Image preview */}
                      <div className="relative w-full h-60 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center">
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={imagePreview} 
                              alt="Profile preview" 
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 rounded-full"
                              onClick={() => {
                                setImagePreview(null);
                                setImageFile(null);
                                form.setValue('image', '');
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
                      {imageFile && !imageUrl && (
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
              {defaultValues ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            defaultValues ? 'Update Team Member' : 'Add Team Member'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TeamForm;
