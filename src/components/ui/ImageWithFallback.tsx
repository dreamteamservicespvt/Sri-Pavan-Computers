import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  showPlaceholder?: boolean;
  placeholderClassName?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Image',
  fallbackSrc = '/images/placeholder.jpg',
  showPlaceholder = true,
  className = '',
  placeholderClassName = '',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  // If error and fallback source is the same as original source, show placeholder
  const shouldShowPlaceholder = error && (fallbackSrc === src || !fallbackSrc);

  // Determine the source to use
  const imageSrc = error && fallbackSrc !== src ? fallbackSrc : src;

  return (
    <>
      {shouldShowPlaceholder && showPlaceholder ? (
        <div 
          className={`flex items-center justify-center bg-gray-100 rounded-md ${className} ${placeholderClassName}`}
          role="img"
          aria-label={alt}
        >
          <ImageIcon className="h-10 w-10 text-gray-400" />
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={alt}
          className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
          onError={handleError}
          onLoad={handleLoad}
          {...props}
        />
      )}
      {loading && !shouldShowPlaceholder && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${className}`}>
          <div className="h-8 w-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default ImageWithFallback;
