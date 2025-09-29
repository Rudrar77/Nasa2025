import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OfflineContextType {
  isOnline: boolean;
  lastSyncTime: Date | null;
  cachedData: Record<string, any>;
  syncData: () => Promise<void>;
  saveToCache: (key: string, data: any) => void;
  getFromCache: (key: string) => any;
}

const OfflineContext = createContext<OfflineContextType | null>(null);

interface OfflineProviderProps {
  children: React.ReactNode;
  cacheKey?: string;
  syncInterval?: number; // in minutes
}

export const OfflineProvider: React.FC<OfflineProviderProps> = ({
  children,
  cacheKey = 'nasa2025_cache',
  syncInterval = 5
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [cachedData, setCachedData] = useState<Record<string, any>>({});

  // Load cached data on mount
  useEffect(() => {
    const loadCache = async () => {
      try {
        const cache = localStorage.getItem(cacheKey);
        if (cache) {
          const parsedCache = JSON.parse(cache);
          setCachedData(parsedCache.data || {});
          setLastSyncTime(parsedCache.lastSync ? new Date(parsedCache.lastSync) : null);
        }
      } catch (error) {
        console.error('Failed to load cache:', error);
      }
    };

    loadCache();
  }, [cacheKey]);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-sync when online
  useEffect(() => {
    if (!isOnline) return;

    const syncTimer = setInterval(() => {
      syncData();
    }, syncInterval * 60 * 1000);

    return () => clearInterval(syncTimer);
  }, [isOnline, syncInterval]);

  const saveToCache = (key: string, data: any) => {
    setCachedData(prev => {
      const newData = { ...prev, [key]: { data, timestamp: new Date() } };
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          data: newData,
          lastSync: new Date()
        }));
      } catch (error) {
        console.error('Failed to save to cache:', error);
      }
      return newData;
    });
  };

  const getFromCache = (key: string) => {
    const cached = cachedData[key];
    if (!cached) return null;

    // Check if data is still fresh (24 hours)
    const age = Date.now() - new Date(cached.timestamp).getTime();
    if (age > 24 * 60 * 60 * 1000) {
      return null; // Data too old
    }

    return cached.data;
  };

  const syncData = async () => {
    if (!isOnline) return;

    try {
      // Sync NASA data
      const nasaResponse = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      if (nasaResponse.ok) {
        const nasaData = await nasaResponse.json();
        saveToCache('nasa_apod', nasaData);
      }

      // Sync solar data (mock endpoint)
      const solarResponse = await fetch('/api/solar-activity');
      if (solarResponse.ok) {
        const solarData = await solarResponse.json();
        saveToCache('solar_activity', solarData);
      }

      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  const contextValue: OfflineContextType = {
    isOnline,
    lastSyncTime,
    cachedData,
    syncData,
    saveToCache,
    getFromCache
  };

  return (
    <OfflineContext.Provider value={contextValue}>
      {children}
      <OfflineIndicator />
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

// Offline indicator component
const OfflineIndicator: React.FC = () => {
  const { isOnline, lastSyncTime } = useOffline();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-2 text-center text-sm font-medium"
        >
          <div className="flex items-center justify-center space-x-2">
            <span>⚠️ You're offline</span>
            {lastSyncTime && (
              <span className="text-xs">
                Last sync: {lastSyncTime.toLocaleTimeString()}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Offline-enabled data fetcher
export const useOfflineFetch = (url: string, options?: RequestInit) => {
  const { isOnline, getFromCache, saveToCache } = useOffline();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Try cache first
      const cachedData = getFromCache(url);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
      }

      // Fetch from network if online
      if (isOnline) {
        try {
          const response = await fetch(url, options);
          if (response.ok) {
            const freshData = await response.json();
            setData(freshData);
            saveToCache(url, freshData);
          } else {
            if (!cachedData) {
              setError(`Failed to fetch: ${response.status}`);
            }
          }
        } catch (err) {
          if (!cachedData) {
            setError('Network error');
          }
        }
      } else if (!cachedData) {
        setError('Offline and no cached data available');
      }

      setLoading(false);
    };

    fetchData();
  }, [url, isOnline, options]);

  return { data, loading, error };
};

// Offline storage utilities
export const offlineStorage = {
  // Save data to IndexedDB for larger storage
  saveToIndexedDB: async (storeName: string, key: string, data: any) => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('NASA2025_Offline', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const putRequest = store.put(data, key);

        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(putRequest.error);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };
    });
  },

  // Get data from IndexedDB
  getFromIndexedDB: async (storeName: string, key: string) => {
    return new Promise<any>((resolve, reject) => {
      const request = indexedDB.open('NASA2025_Offline', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const getRequest = store.get(key);

        getRequest.onsuccess = () => resolve(getRequest.result);
        getRequest.onerror = () => reject(getRequest.error);
      };
    });
  },

  // Clear old cached data
  clearOldCache: async (maxAge: number = 24 * 60 * 60 * 1000) => {
    const cache = localStorage.getItem('nasa2025_cache');
    if (!cache) return;

    try {
      const parsedCache = JSON.parse(cache);
      const now = Date.now();
      const newData: Record<string, any> = {};

      Object.entries(parsedCache.data || {}).forEach(([key, value]: [string, any]) => {
        if (value.timestamp && (now - new Date(value.timestamp).getTime()) < maxAge) {
          newData[key] = value;
        }
      });

      localStorage.setItem('nasa2025_cache', JSON.stringify({
        data: newData,
        lastSync: parsedCache.lastSync
      }));
    } catch (error) {
      console.error('Failed to clear old cache:', error);
    }
  }
};

// Service worker registration for better offline support
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Offline-enabled image component
interface OfflineImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export const OfflineImage: React.FC<OfflineImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className = ''
}) => {
  const { isOnline } = useOffline();
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isOnline && fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      setImageSrc(src);
    }
  }, [isOnline, src, fallbackSrc]);

  const handleError = () => {
    if (!hasError && fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default {
  OfflineProvider,
  useOffline,
  useOfflineFetch,
  offlineStorage,
  registerServiceWorker,
  OfflineImage
};