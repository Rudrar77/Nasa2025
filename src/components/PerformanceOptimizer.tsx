import React, { Suspense, lazy, ComponentType } from 'react';
import { motion } from 'framer-motion';

// Loading component
const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center w-full h-full min-h-[200px]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin animate-reverse"></div>
    </div>
    <span className="ml-4 text-lg text-orange-600">Loading...</span>
  </motion.div>
);

// Lazy loading wrapper with error boundary
class LazyWrapper extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-full min-h-[200px] text-red-500">
          <div className="text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <p>Failed to load component</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance optimized lazy loader
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) => {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <LazyWrapper>
      <Suspense fallback={fallback ? React.createElement(fallback) : <LoadingSpinner />}>
        <LazyComponent {...props} />
      </Suspense>
    </LazyWrapper>
  );
};

// Preload function for critical components
export const preloadComponent = (importFunc: () => Promise<any>) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  // This is a simplified preload - in a real app you'd use webpack's preload
  importFunc();
};

// Intersection Observer for lazy loading images and components
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  callback: () => void,
  options?: IntersectionObserverInit
) => {
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        });
      },
      options
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, callback, options]);
};

// Optimized image component with lazy loading
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !hasError && placeholder && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
        />
      )}
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">🖼️</div>
            <p>Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Memory management hook
export const useMemoryOptimization = () => {
  const cleanupRefs = React.useRef<(() => void)[]>([]);

  const addCleanup = React.useCallback((cleanup: () => void) => {
    cleanupRefs.current.push(cleanup);
  }, []);

  React.useEffect(() => {
    return () => {
      cleanupRefs.current.forEach(cleanup => cleanup());
      cleanupRefs.current = [];
    };
  }, []);

  return { addCleanup };
};

// Debounce hook for performance
export const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  return React.useCallback((...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

// Throttle hook for performance
export const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const lastCallRef = React.useRef<number>(0);

  return React.useCallback((...args: T) => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback(...args);
    }
  }, [callback, delay]);
};

// Virtual scrolling hook for large lists
export const useVirtualScroll = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    itemCount - 1
  );

  const offsetY = startIndex * itemHeight;

  return {
    startIndex,
    endIndex,
    offsetY,
    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    }
  };
};

// Bundle analyzer component (for development)
export const BundleAnalyzer = () => {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // In a real app, you'd integrate with webpack-bundle-analyzer
      console.log('Bundle analysis would be shown here in development mode');
    }
  }, []);

  return null;
};

export default {
  createLazyComponent,
  preloadComponent,
  useIntersectionObserver,
  OptimizedImage,
  useMemoryOptimization,
  useDebounce,
  useThrottle,
  useVirtualScroll,
  BundleAnalyzer
};