export const cloudinaryConfig = {
  cloudName: 'dvmrhs2ek',
  uploadPreset: 'Sri Pavan Computers',
  apiUrl: 'https://api.cloudinary.com/v1_1/dvmrhs2ek/image/upload',
  debug: false, // Set to true only during development/debugging
};

// Helper function to upload images to Cloudinary
export const uploadToCloudinary = async (file: File) => {
  // Create form data for upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  
  try {
    const response = await fetch(cloudinaryConfig.apiUrl, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Only log errors
      console.error("Cloudinary API error:", {
        status: response.status,
        statusText: response.statusText,
        details: data.error?.message || 'Unknown error'
      });
      
      throw new Error(`Upload failed: ${response.status} ${response.statusText}${
        data.error?.message ? ` - ${data.error.message}` : ''
      }`);
    }
    
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
        success: true,
      };
    } else {
      throw new Error('Upload failed: No URL returned');
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return {
      url: '',
      publicId: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
