import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilityProviderProps {
  children: React.ReactNode;
  announcePageChanges?: boolean;
  enableKeyboardNavigation?: boolean;
  enableScreenReaderOptimizations?: boolean;
}

interface FocusTrapProps {
  children: React.ReactNode;
  isActive: boolean;
  onEscape?: () => void;
}

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

// Screen reader announcement component
const ScreenReaderAnnouncement: React.FC<{ message: string; priority?: 'polite' | 'assertive' }> = ({
  message,
  priority = 'polite'
}) => {
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const announcement = announcementRef.current;
    if (announcement) {
      // Force screen reader to announce
      announcement.setAttribute('aria-live', priority);
      announcement.textContent = message;

      // Clear after announcement
      setTimeout(() => {
        if (announcement) {
          announcement.textContent = '';
        }
      }, 1000);
    }
  }, [message, priority]);

  return (
    <div
      ref={announcementRef}
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    />
  );
};

// Focus trap component for modals and dialogs
export const FocusTrap: React.FC<FocusTrapProps> = ({ children, isActive, onEscape }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const updateFocusableElements = () => {
      const container = containerRef.current;
      if (!container) return;

      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ];

      const elements = container.querySelectorAll(focusableSelectors.join(', '));
      setFocusableElements(Array.from(elements) as HTMLElement[]);
    };

    updateFocusableElements();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, focusableElements, onEscape]);

  useEffect(() => {
    if (isActive && focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }, [isActive, focusableElements]);

  if (!isActive) return <>{children}</>;

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

// Skip link component for keyboard navigation
export const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-md focus:shadow-lg transition-all duration-200"
    >
      {children}
    </a>
  );
};

// Keyboard navigation hook
export const useKeyboardNavigation = () => {
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab key indicates keyboard navigation
      if (e.key === 'Tab') {
        setIsKeyboardMode(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardMode(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isKeyboardMode;
};

// Accessible button component
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  loading = false,
  loadingText = 'Loading...',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-describedby={loading ? 'loading-description' : undefined}
      className={`focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 ${
        props.className || ''
      }`}
    >
      {loading ? (
        <>
          <span aria-hidden="true" className="inline-block animate-spin mr-2">⟳</span>
          {loadingText}
          <span id="loading-description" className="sr-only">
            {loadingText}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Accessible modal component
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <FocusTrap isActive={isOpen} onEscape={onClose}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl max-h-[90vh] overflow-auto`}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                  {title}
                </h2>
                <AccessibleButton
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Close modal"
                >
                  ✕
                </AccessibleButton>
              </div>
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// High contrast mode hook
export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
};

// Reduced motion hook
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Main accessibility provider
export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
  announcePageChanges = true,
  enableKeyboardNavigation = true,
  enableScreenReaderOptimizations = true
}) => {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const announce = React.useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!announcePageChanges) return;

    setAnnouncements(prev => [...prev, message]);
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  }, [announcePageChanges]);

  useEffect(() => {
    if (enableKeyboardNavigation) {
      // Add keyboard navigation styles
      const style = document.createElement('style');
      style.textContent = `
        .focus-visible:focus {
          outline: 2px solid #f97316;
          outline-offset: 2px;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [enableKeyboardNavigation]);

  return (
    <>
      {announcements.map((message, index) => (
        <ScreenReaderAnnouncement key={index} message={message} />
      ))}
      {children}
    </>
  );
};

// Export utilities
export const accessibilityUtils = {
  announceToScreenReader: (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    document.body.appendChild(announcement);
    announcement.textContent = message;

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleTabKey);
  }
};

export default {
  AccessibilityProvider,
  FocusTrap,
  SkipLink,
  AccessibleButton,
  AccessibleModal,
  useKeyboardNavigation,
  useHighContrast,
  useReducedMotion,
  accessibilityUtils
};