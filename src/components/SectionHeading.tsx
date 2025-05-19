import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, center = false, className = "" }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
