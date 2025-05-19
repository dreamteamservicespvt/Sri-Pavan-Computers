import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  "rounded-xl shadow-sm p-5 overflow-hidden relative flex flex-col",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200",
        primary: "bg-gradient-to-br from-primary to-primary-600 text-white",
        secondary: "bg-gradient-to-br from-secondary to-secondary-600 text-white",
        success: "bg-gradient-to-br from-green-500 to-green-600 text-white",
        danger: "bg-gradient-to-br from-red-500 to-red-600 text-white",
        warning: "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white",
        info: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
      },
      size: {
        default: "h-auto",
        sm: "h-24",
        lg: "h-40",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface AdminStatusCardProps extends VariantProps<typeof cardVariants> {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  index?: number;
}

const AdminStatusCard: React.FC<AdminStatusCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  variant,
  size,
  className,
  index = 0,
}) => {
  const isPositiveTrend = trend && trend.value > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cardVariants({ variant, size, className })}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${variant ? 'text-white/80' : 'text-gray-500'}`}>
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`
                  text-xs font-medium flex items-center gap-0.5
                  ${isPositiveTrend ? 
                    (variant ? 'text-white' : 'text-green-600') : 
                    (variant ? 'text-white' : 'text-red-600')
                  }
                `}
              >
                {isPositiveTrend ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className={`text-xs ml-1 ${variant ? 'text-white/70' : 'text-gray-500'}`}>
                {trend.label}
              </span>
            </div>
          )}
        </div>
        
        <div className={`p-2 rounded-full ${variant ? 'bg-white/20' : 'bg-primary/10'}`}>
          <Icon className={`h-5 w-5 ${variant ? 'text-white' : 'text-primary'}`} />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className={`absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-10 ${
          variant ? 'bg-white' : 'bg-primary'
        }`}
      ></div>
    </motion.div>
  );
};

export default AdminStatusCard;
