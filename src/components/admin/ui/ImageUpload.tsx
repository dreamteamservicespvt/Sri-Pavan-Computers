import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { UploadCloud, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { uploadFile } from '@/lib/firebase-admin';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  folderPath?: string;
  className?: string;
  maxSize?: number; // in bytes
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  currentImage = '',
  folderPath = 'uploads',
  className = '',
  maxSize = 5 * 1024 * 1024 // 5MB default
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);

  const handleUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadError(null);
    
    try {
      // Create a local preview
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
      
      // Upload to Firebase
      const downloadUrl = await uploadFile(file, folderPath);
      onImageUploaded(downloadUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image. Please try again.');
      setPreviewUrl(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  }, [currentImage, folderPath, onImageUploaded]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize,
    multiple: false
  });

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUploaded('');
  };

  return (
    <div className={`w-full ${className}`}>
      {previewUrl ? (
        <div className="relative border border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center">
          <div className="relative w-full">
            <img
              src={previewUrl}
              alt="Preview"
              className="rounded-lg w-full h-auto max-h-64 object-contain"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 text-sm text-green-600 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" />
            Image uploaded successfully
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed ${
            isDragActive ? 'border-primary' : 'border-gray-300'
          } rounded-lg p-6 cursor-pointer hover:border-primary transition-colors ${
            uploadError ? 'border-red-500' : ''
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            {isUploading ? (
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full inline-block mb-2"></div>
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <>
                <UploadCloud className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-lg font-semibold text-gray-700">
                  {isDragActive ? 'Drop the image here...' : 'Drag & drop an image, or click to select'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: JPEG, PNG, GIF, WebP
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Max size: {(maxSize / (1024 * 1024)).toFixed(0)}MB
                </p>
                {fileRejections.length > 0 && (
                  <p className="text-sm text-red-500 mt-2">
                    {fileRejections[0].errors[0].message}
                  </p>
                )}
                {uploadError && <p className="text-sm text-red-500 mt-2">{uploadError}</p>}
                <Button type="button" variant="outline" className="mt-4">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Select Image
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
