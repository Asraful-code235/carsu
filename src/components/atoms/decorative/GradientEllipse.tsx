import { cn } from "@/lib/utils/cn";

interface GradientEllipseProps {
  color?: string;
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  offset?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16 md:w-24 md:h-24",
  md: "w-24 h-24 md:w-32 md:h-32",
  lg: "w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64",
  xl: "w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80",
};

const positionClasses = {
  top: "top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  bottom: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2",
  'top-left': "top-0 left-0 transform -translate-x-1/2 -translate-y-1/2",
  'top-right': "top-0 right-0 transform translate-x-1/2 -translate-y-1/2",
  'bottom-left': "bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2",
  'bottom-right': "bottom-0 right-0 transform translate-x-1/2 translate-y-1/2",
  center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
};

const blurClasses = {
  none: "",
  sm: "blur-sm",
  md: "blur-md",
  lg: "blur-lg",
  xl: "blur-xl",
  "2xl": "blur-2xl",
  "3xl": "blur-3xl",
};

export function GradientEllipse({
  color = "#93F4B8",
  position = "bottom",
  size = "lg",
  opacity = 0.6,
  blur = "xl",
  offset,
  className,
}: GradientEllipseProps) {
  const sizeClass = sizeClasses[size];
  const positionClass = positionClasses[position];
  const blurClass = blurClasses[blur];

  // Custom offset positioning
  const getCustomOffset = () => {
    if (!offset) return {};
    
    const style: React.CSSProperties = {};
    
    // Parse offset like "top-16", "bottom-8", "left-4", etc.
    if (offset.includes('top-')) {
      const value = offset.replace('top-', '');
      style.top = `-${parseInt(value) * 0.25}rem`; // Convert to rem (4px = 1 unit)
    } else if (offset.includes('bottom-')) {
      const value = offset.replace('bottom-', '');
      style.bottom = `-${parseInt(value) * 0.25}rem`;
    } else if (offset.includes('left-')) {
      const value = offset.replace('left-', '');
      style.left = `-${parseInt(value) * 0.25}rem`;
    } else if (offset.includes('right-')) {
      const value = offset.replace('right-', '');
      style.right = `-${parseInt(value) * 0.25}rem`;
    }
    
    return style;
  };

  return (
    <div
      className={cn(
        "absolute pointer-events-none",
        sizeClass,
        positionClass,
        className
      )}
      style={getCustomOffset()}
    >
      <div 
        className={cn("w-full h-full rounded-full", blurClass)}
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${color} 40%, transparent 70%)`,
          opacity: opacity,
        }}
      />
    </div>
  );
}
