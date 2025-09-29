import { useState, useEffect } from 'react';

export interface SolarActivityData {
  solarFlares: {
    count: number;
    lastFlare: {
      class: string;
      time: string;
      region: string;
    } | null;
  };
  coronalMassEjections: {
    count: number;
    lastCME: {
      speed: number;
      time: string;
    } | null;
  };
  geomagneticStorms: {
    kpIndex: number;
    status: 'quiet' | 'active' | 'storm';
  };
  solarWind: {
    speed: number;
    density: number;
    temperature: number;
  };
  sunspots: {
    count: number;
    lastUpdated: string;
  };
}

export const useNASAData = () => {
  const [data, setData] = useState<SolarActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNASAData = async () => {
      try {
        setLoading(true);

        // Simulate NASA API calls (in real implementation, use actual NASA APIs)
        // For demo purposes, we'll generate realistic data
        const mockData: SolarActivityData = {
          solarFlares: {
            count: Math.floor(Math.random() * 15) + 5,
            lastFlare: Math.random() > 0.3 ? {
              class: ['A', 'B', 'C', 'M', 'X'][Math.floor(Math.random() * 5)] + Math.floor(Math.random() * 9),
              time: new Date(Date.now() - Math.random() * 86400000).toISOString(),
              region: `AR${Math.floor(Math.random() * 3000) + 1000}`
            } : null
          },
          coronalMassEjections: {
            count: Math.floor(Math.random() * 8) + 2,
            lastCME: Math.random() > 0.2 ? {
              speed: Math.floor(Math.random() * 2000) + 500,
              time: new Date(Date.now() - Math.random() * 172800000).toISOString()
            } : null
          },
          geomagneticStorms: {
            kpIndex: Math.floor(Math.random() * 9),
            status: ['quiet', 'active', 'storm'][Math.floor(Math.random() * 3)] as 'quiet' | 'active' | 'storm'
          },
          solarWind: {
            speed: Math.floor(Math.random() * 800) + 300,
            density: Math.floor(Math.random() * 20) + 5,
            temperature: Math.floor(Math.random() * 500000) + 50000
          },
          sunspots: {
            count: Math.floor(Math.random() * 150) + 20,
            lastUpdated: new Date().toISOString()
          }
        };

        setData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch NASA data');
        console.error('NASA Data Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNASAData();

    // Update every 5 minutes
    const interval = setInterval(fetchNASAData, 300000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};

// Real NASA API implementation (for production use)
export const fetchRealNASAData = async (): Promise<SolarActivityData> => {
  try {
    // Example NASA API endpoints (these would need proper API keys and CORS handling)
    const responses = await Promise.allSettled([
      fetch('https://api.nasa.gov/DONKI/FLR?startDate=2024-01-01&endDate=2025-12-31&api_key=DEMO_KEY'),
      fetch('https://api.nasa.gov/DONKI/CME?startDate=2024-01-01&endDate=2025-12-31&api_key=DEMO_KEY'),
      fetch('https://services.swpc.noaa.gov/products/noaa-scales.json'),
      fetch('https://services.swpc.noaa.gov/products/solar-wind/plasma-7-day.json')
    ]);

    // Process responses and return structured data
    // This would be implemented with actual NASA API parsing

    throw new Error('Real NASA API integration requires API keys and proper setup');
  } catch (error) {
    console.error('Real NASA API Error:', error);
    throw error;
  }
};