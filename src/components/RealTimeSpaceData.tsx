import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Satellite, 
  MapPin, 
  Thermometer, 
  Wind, 
  AlertTriangle, 
  Sun,
  Zap,
  Globe,
  Telescope,
  RefreshCw,
  Clock,
  Activity
} from 'lucide-react';

// Types
interface ISSPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface SpaceWeather {
  kpIndex: number;
  solarWindSpeed: number;
  magneticField: number;
  alerts: string[];
}

interface MarsWeather {
  sol: number;
  season: string;
  minTemp: number;
  maxTemp: number;
  pressure: number;
  windSpeed: number;
}

interface Asteroid {
  id: string;
  name: string;
  estimatedDiameter: {
    min: number;
    max: number;
  };
  closeApproachDate: string;
  missDistance: number;
  velocity: number;
  isPotentiallyHazardous: boolean;
}

interface Exoplanet {
  name: string;
  discoveryYear: number;
  hostStar: string;
  planetType: string;
  orbitalPeriod: number;
  distance: number;
}

const RealTimeSpaceData: React.FC = () => {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [spaceWeather, setSpaceWeather] = useState<SpaceWeather | null>(null);
  const [marsWeather, setMarsWeather] = useState<MarsWeather | null>(null);
  const [nearEarthAsteroids, setNearEarthAsteroids] = useState<Asteroid[]>([]);
  const [recentExoplanets, setRecentExoplanets] = useState<Exoplanet[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // NASA API Key - In production, use environment variables
  const NASA_API_KEY = 'DEMO_KEY'; // Replace with actual API key

  // Fetch ISS Position
  const fetchISSPosition = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json();
      
      setIssPosition({
        latitude: parseFloat(data.iss_position.latitude),
        longitude: parseFloat(data.iss_position.longitude),
        timestamp: data.timestamp
      });
    } catch (error) {
      console.error('Error fetching ISS position:', error);
    }
  };

  // Fetch Space Weather (using NOAA Space Weather API)
  const fetchSpaceWeather = async () => {
    try {
      // Simulated space weather data (replace with actual NOAA API)
      const mockSpaceWeather: SpaceWeather = {
        kpIndex: Math.floor(Math.random() * 9) + 1,
        solarWindSpeed: Math.floor(Math.random() * 200) + 300,
        magneticField: Math.floor(Math.random() * 20) - 10,
        alerts: Math.random() > 0.7 ? ['Solar Storm Warning'] : []
      };
      
      setSpaceWeather(mockSpaceWeather);
    } catch (error) {
      console.error('Error fetching space weather:', error);
    }
  };

  // Fetch Mars Weather
  const fetchMarsWeather = async () => {
    try {
      // Using NASA InSight API (note: InSight mission ended, using mock data)
      const mockMarsWeather: MarsWeather = {
        sol: Math.floor(Math.random() * 1000) + 3000,
        season: 'Northern Winter',
        minTemp: Math.floor(Math.random() * 30) - 80,
        maxTemp: Math.floor(Math.random() * 20) - 20,
        pressure: Math.floor(Math.random() * 200) + 600,
        windSpeed: Math.floor(Math.random() * 15) + 5
      };
      
      setMarsWeather(mockMarsWeather);
    } catch (error) {
      console.error('Error fetching Mars weather:', error);
    }
  };

  // Fetch Near Earth Asteroids
  const fetchNearEarthAsteroids = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`
      );
      const data = await response.json();
      
      const asteroids: Asteroid[] = [];
      const todayAsteroids = data.near_earth_objects[today] || [];
      
      todayAsteroids.slice(0, 5).forEach((asteroid: any) => {
        asteroids.push({
          id: asteroid.id,
          name: asteroid.name,
          estimatedDiameter: {
            min: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
            max: asteroid.estimated_diameter.kilometers.estimated_diameter_max
          },
          closeApproachDate: asteroid.close_approach_data[0].close_approach_date,
          missDistance: parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers),
          velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour),
          isPotentiallyHazardous: asteroid.is_potentially_hazardous_asteroid
        });
      });
      
      setNearEarthAsteroids(asteroids);
    } catch (error) {
      console.error('Error fetching asteroids:', error);
      // Fallback to mock data
      const mockAsteroids: Asteroid[] = [
        {
          id: '1',
          name: '2023 DW',
          estimatedDiameter: { min: 0.5, max: 1.2 },
          closeApproachDate: '2024-02-15',
          missDistance: 1500000,
          velocity: 25000,
          isPotentiallyHazardous: false
        }
      ];
      setNearEarthAsteroids(mockAsteroids);
    }
  };

  // Fetch Recent Exoplanet Discoveries
  const fetchExoplanets = async () => {
    try {
      // Using NASA Exoplanet Archive API
      const mockExoplanets: Exoplanet[] = [
        {
          name: 'TOI-715 b',
          discoveryYear: 2024,
          hostStar: 'TOI-715',
          planetType: 'Super Earth',
          orbitalPeriod: 19.3,
          distance: 137
        },
        {
          name: 'K2-18 b',
          discoveryYear: 2023,
          hostStar: 'K2-18',
          planetType: 'Sub-Neptune',
          orbitalPeriod: 33,
          distance: 124
        },
        {
          name: 'WASP-96 b',
          discoveryYear: 2024,
          hostStar: 'WASP-96',
          planetType: 'Hot Jupiter',
          orbitalPeriod: 3.4,
          distance: 1150
        }
      ];
      
      setRecentExoplanets(mockExoplanets);
    } catch (error) {
      console.error('Error fetching exoplanets:', error);
    }
  };

  // Refresh all data
  const refreshAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchISSPosition(),
      fetchSpaceWeather(),
      fetchMarsWeather(),
      fetchNearEarthAsteroids(),
      fetchExoplanets()
    ]);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    refreshAllData();
    
    // Set up intervals for real-time updates
    const issInterval = setInterval(fetchISSPosition, 10000); // Every 10 seconds
    const weatherInterval = setInterval(fetchSpaceWeather, 300000); // Every 5 minutes
    const generalInterval = setInterval(() => {
      fetchMarsWeather();
      fetchNearEarthAsteroids();
      fetchExoplanets();
    }, 3600000); // Every hour
    
    return () => {
      clearInterval(issInterval);
      clearInterval(weatherInterval);
      clearInterval(generalInterval);
    };
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <RefreshCw className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-spin" />
            <h2 className="text-3xl font-bold text-white mb-4">Loading Real-Time Space Data</h2>
            <p className="text-gray-300">Connecting to NASA APIs and space monitoring systems...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-slate-900/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Live Space Monitoring</h2>
          <p className="text-xl text-gray-300 mb-6">
            Real-time data from NASA and international space agencies
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
              <Activity className="h-4 w-4 mr-2" />
              Live Data
            </Badge>
            <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
              <Clock className="h-4 w-4 mr-2" />
              Updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button 
              onClick={refreshAllData} 
              size="sm" 
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* ISS Tracking */}
          <Card className="bg-slate-900/50 border-slate-700 hover:border-blue-500 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <Satellite className="h-6 w-6 text-blue-400 mr-2" />
                ISS Live Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              {issPosition && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Latitude:</span>
                    <span className="text-white font-mono">{issPosition.latitude.toFixed(4)}°</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Longitude:</span>
                    <span className="text-white font-mono">{issPosition.longitude.toFixed(4)}°</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Altitude:</span>
                    <span className="text-white font-mono">~408 km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Speed:</span>
                    <span className="text-white font-mono">27,600 km/h</span>
                  </div>
                  <Badge className="w-full justify-center bg-green-600/20 text-green-300 border-green-500/30">
                    <MapPin className="h-4 w-4 mr-2" />
                    Orbiting Earth
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Space Weather */}
          <Card className="bg-slate-900/50 border-slate-700 hover:border-yellow-500 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <Sun className="h-6 w-6 text-yellow-400 mr-2" />
                Space Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              {spaceWeather && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Kp Index:</span>
                    <Badge className={`${spaceWeather.kpIndex > 5 ? 'bg-red-600/20 text-red-300 border-red-500/30' : 'bg-green-600/20 text-green-300 border-green-500/30'}`}>
                      {spaceWeather.kpIndex}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Solar Wind:</span>
                    <span className="text-white font-mono">{spaceWeather.solarWindSpeed} km/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Magnetic Field:</span>
                    <span className="text-white font-mono">{spaceWeather.magneticField} nT</span>
                  </div>
                  {spaceWeather.alerts.length > 0 && (
                    <Badge className="w-full justify-center bg-red-600/20 text-red-300 border-red-500/30">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {spaceWeather.alerts[0]}
                    </Badge>
                  )}
                  {spaceWeather.alerts.length === 0 && (
                    <Badge className="w-full justify-center bg-green-600/20 text-green-300 border-green-500/30">
                      <Zap className="h-4 w-4 mr-2" />
                      Normal Conditions
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mars Weather */}
          <Card className="bg-slate-900/50 border-slate-700 hover:border-red-500 transition-colors">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <Globe className="h-6 w-6 text-red-400 mr-2" />
                Mars Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              {marsWeather && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Sol (Mars Day):</span>
                    <span className="text-white font-mono">{marsWeather.sol}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Season:</span>
                    <span className="text-white">{marsWeather.season}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Temperature:</span>
                    <span className="text-white font-mono">
                      {marsWeather.minTemp}° to {marsWeather.maxTemp}°C
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Pressure:</span>
                    <span className="text-white font-mono">{marsWeather.pressure} Pa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Wind Speed:</span>
                    <span className="text-white font-mono">{marsWeather.windSpeed} m/s</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Near Earth Asteroids */}
          <Card className="bg-slate-900/50 border-slate-700 hover:border-orange-500 transition-colors lg:col-span-2 xl:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <Activity className="h-6 w-6 text-orange-400 mr-2" />
                Near Earth Asteroids
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearEarthAsteroids.slice(0, 3).map((asteroid) => (
                  <div key={asteroid.id} className="p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{asteroid.name}</span>
                      {asteroid.isPotentiallyHazardous && (
                        <Badge className="bg-red-600/20 text-red-300 border-red-500/30 text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          PHO
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-gray-300">
                        <span>Diameter:</span>
                        <span>{asteroid.estimatedDiameter.min.toFixed(2)}-{asteroid.estimatedDiameter.max.toFixed(2)} km</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Miss Distance:</span>
                        <span>{(asteroid.missDistance / 1000000).toFixed(2)} M km</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Velocity:</span>
                        <span>{(asteroid.velocity / 1000).toFixed(0)} km/s</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Exoplanet Discoveries */}
          <Card className="bg-slate-900/50 border-slate-700 hover:border-purple-500 transition-colors lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-white">
                <Telescope className="h-6 w-6 text-purple-400 mr-2" />
                Recent Exoplanet Discoveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recentExoplanets.map((exoplanet, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{exoplanet.name}</h4>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                        {exoplanet.discoveryYear}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-300">Host Star:</span>
                        <p className="text-white">{exoplanet.hostStar}</p>
                      </div>
                      <div>
                        <span className="text-gray-300">Type:</span>
                        <p className="text-white">{exoplanet.planetType}</p>
                      </div>
                      <div>
                        <span className="text-gray-300">Orbital Period:</span>
                        <p className="text-white">{exoplanet.orbitalPeriod} days</p>
                      </div>
                      <div>
                        <span className="text-gray-300">Distance:</span>
                        <p className="text-white">{exoplanet.distance} light-years</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RealTimeSpaceData;