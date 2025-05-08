
export const cloudinaryConfig = {
  cloudName: 'dvmrhs2ek',
  uploadPreset: 'Sri Pavan Computers',
  apiUrl: 'https://api.cloudinary.com/v1_1/dvmrhs2ek/image/upload',
};

// Helper function to upload images to Cloudinary
export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  
  try {
    const response = await fetch(cloudinaryConfig.apiUrl, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
        success: true,
      };
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return {
      url: '',
      publicId: '',
      success: false,
    };
  }
};
