import { uploadToCloudinary } from './cloudinary';

/**
 * Converts an image file to a data URL for local testing when cloud uploads fail
 */
export const imageToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Generic image upload result type
 */
export interface ImageUploadResult {
  url: string;
  publicId?: string;
  success: boolean;
  error?: string;
}

/**
 * Uploads an image with fallback options
 * @param file The file to upload
 * @param primaryUploader The primary upload function to try first
 * @returns Upload result with URL or error
 */
export const uploadImage = async (
  file: File,
  primaryUploader: (file: File) => Promise<ImageUploadResult> = uploadToCloudinary
): Promise<ImageUploadResult> => {
  try {
    // First try the primary uploader (Cloudinary)
    const result = await primaryUploader(file);
    
    if (result.success) {
      return result;
    }
    
    // If primary uploader failed, log detailed error
    console.warn("Primary upload failed, error:", result.error);
    
    // For now, we'll just return the error
    // In the future, you could implement additional fallback services here
    
    return {
      url: '',
      success: false,
      error: result.error || 'Upload failed with no specific error'
    };
    
  } catch (error) {
    console.error('Error in uploadImage utility:', error);
    return {
      url: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during upload'
    };
  }
};
