import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Satellite, 
  Globe, 
  Zap, 
  Rocket, 
  Sun, 
  AlertTriangle, 
  RefreshCw,
  MapPin,
  Clock,
  Thermometer,
  Wind,
  Eye
} from 'lucide-react';

// Types for API responses
interface ISSPosition {
  latitude: string;
  longitude: string;
  timestamp: number;
}

interface ISSData {
  iss_position: ISSPosition;
  message: string;
}

interface Astronaut {
  name: string;
  craft: string;
}

interface AstronautData {
  people: Astronaut[];
  number: number;
  message: string;
}

interface SpaceWeatherData {
  flare_activity: string;
  solar_wind_speed: number;
  kp_index: number;
  aurora_activity: string;
}

interface LaunchData {
  id: string;
  name: string;
  date_utc: string;
  rocket: {
    name: string;
  };
  success?: boolean;
  upcoming: boolean;
}

interface MarsWeather {
  sol: number;
  temperature: {
    av: number;
    mn: number;
    mx: number;
  };
  pressure: {
    av: number;
  };
  wind_speed: {
    av: number;
  };
  season: string;
}

const RealTimeSpaceData: React.FC = () => {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [astronauts, setAstronauts] = useState<AstronautData | null>(null);
  const [spaceWeather, setSpaceWeather] = useState<SpaceWeatherData | null>(null);
  const [launches, setLaunches] = useState<LaunchData[]>([]);
  const [marsWeather, setMarsWeather] = useState<MarsWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch ISS current location
  const fetchISSData = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data: ISSData = await response.json();
      setIssData(data);
    } catch (err) {
      console.error('Error fetching ISS data:', err);
    }
  };

  // Fetch people currently in space
  const fetchAstronauts = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/astros.json');
      const data: AstronautData = await response.json();
      setAstronauts(data);
    } catch (err) {
      console.error('Error fetching astronaut data:', err);
    }
  };

  // Fetch SpaceX launches
  const fetchLaunches = async () => {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/launches/latest');
      const latestLaunch = await response.json();
      
      const upcomingResponse = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
      const upcomingLaunches = await response.json();
      
      setLaunches([latestLaunch, ...upcomingLaunches.slice(0, 4)]);
    } catch (err) {
      console.error('Error fetching launch data:', err);
    }
  };

  // Simulate space weather data (replace with real API)
  const fetchSpaceWeather = async () => {
    // This would typically come from NOAA Space Weather API
    // For demo purposes, we'll simulate the data
    const simulatedData: SpaceWeatherData = {
      flare_activity: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Moderate' : 'Low',
      solar_wind_speed: Math.floor(Math.random() * 200) + 300,
      kp_index: Math.floor(Math.random() * 9),
      aurora_activity: Math.random() > 0.6 ? 'Active' : 'Quiet'
    };
    setSpaceWeather(simulatedData);
  };

  // Simulate Mars weather data
  const fetchMarsWeather = async () => {
    // This would typically come from NASA Mars Weather API
    const simulatedMarsData: MarsWeather = {
      sol: Math.floor(Math.random() * 1000) + 3000,
      temperature: {
        av: Math.floor(Math.random() * 40) - 60,
        mn: Math.floor(Math.random() * 30) - 80,
        mx: Math.floor(Math.random() * 20) - 20
      },
      pressure: {
        av: Math.floor(Math.random() * 200) + 600
      },
      wind_speed: {
        av: Math.floor(Math.random() * 20) + 5
      },
      season: 'Northern Spring'
    };
    setMarsWeather(simulatedMarsData);
  };

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchISSData(),
        fetchAstronauts(),
        fetchSpaceWeather(),
        fetchLaunches(),
        fetchMarsWeather()
      ]);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Failed to fetch some space data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load and setup interval
  useEffect(() => {
    fetchAllData();
    
    // Update ISS position every 10 seconds
    const issInterval = setInterval(fetchISSData, 10000);
    
    // Update other data every 5 minutes
    const dataInterval = setInterval(() => {
      fetchAstronauts();
      fetchSpaceWeather();
      fetchMarsWeather();
    }, 300000);
    
    return () => {
      clearInterval(issInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityColor = (activity: string) => {
    switch (activity.toLowerCase()) {
      case 'high':
      case 'active':
        return 'bg-red-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'low':
      case 'quiet':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Real-Time Space Data
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Live updates from space missions, weather, and exploration
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              onClick={fetchAllData}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
            <Badge variant="secondary" className="bg-slate-800 text-slate-300">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {lastUpdate.toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {error && (
          <Alert className="mb-6 border-red-500 bg-red-500/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-400">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="iss" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 mb-8">
            <TabsTrigger value="iss" className="text-white data-[state=active]:bg-blue-600">
              <Satellite className="h-4 w-4 mr-2" />
              ISS Tracker
            </TabsTrigger>
            <TabsTrigger value="weather" className="text-white data-[state=active]:bg-blue-600">
              <Sun className="h-4 w-4 mr-2" />
              Space Weather
            </TabsTrigger>
            <TabsTrigger value="launches" className="text-white data-[state=active]:bg-blue-600">
              <Rocket className="h-4 w-4 mr-2" />
              Launches
            </TabsTrigger>
            <TabsTrigger value="astronauts" className="text-white data-[state=active]:bg-blue-600">
              <Globe className="h-4 w-4 mr-2" />
              People in Space
            </TabsTrigger>
            <TabsTrigger value="mars" className="text-white data-[state=active]:bg-blue-600">
              <Thermometer className="h-4 w-4 mr-2" />
              Mars Weather
            </TabsTrigger>
          </TabsList>

          {/* ISS Tracker Tab */}
          <TabsContent value="iss">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/90 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Satellite className="h-5 w-5 text-blue-400" />
                    ISS Current Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {issData ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Latitude</p>
                          <p className="text-2xl font-bold text-green-400">
                            {parseFloat(issData.iss_position.latitude).toFixed(4)}°
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400">Longitude</p>
                          <p className="text-2xl font-bold text-green-400">
                            {parseFloat(issData.iss_position.longitude).toFixed(4)}°
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <MapPin className="h-4 w-4" />
                        <span>Orbiting at ~408 km altitude</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <Eye className="h-4 w-4" />
                        <span>Speed: ~27,600 km/h</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      <Satellite className="h-12 w-12 mx-auto mb-4 animate-pulse" />
                      Loading ISS position...
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-slate-900/90 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">ISS Live Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-800 rounded-lg p-4 h-64 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Globe className="h-16 w-16 mx-auto mb-4" />
                      <p>Interactive ISS Map</p>
                      <p className="text-sm">(Map integration would go here)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Space Weather Tab */}
          <TabsContent value="weather">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {spaceWeather && (
                <>
                  <Card className="bg-slate-900/90 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-white text-sm">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        Solar Flare Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <Badge className={`${getActivityColor(spaceWeather.flare_activity)} text-white`}>
                          {spaceWeather.flare_activity}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-2">Current Activity Level</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/90 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-white text-sm">
                        <Wind className="h-4 w-4 text-blue-400" />
                        Solar Wind Speed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">
                          {spaceWeather.solar_wind_speed}
                        </p>
                        <p className="text-xs text-gray-400">km/s</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/90 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-white text-sm">
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                        Kp Index
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-400">
                          {spaceWeather.kp_index}
                        </p>
                        <p className="text-xs text-gray-400">Geomagnetic Activity</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/90 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-white text-sm">
                        <Eye className="h-4 w-4 text-green-400" />
                        Aurora Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <Badge className={`${getActivityColor(spaceWeather.aurora_activity)} text-white`}>
                          {spaceWeather.aurora_activity}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-2">Northern Lights</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          {/* Launches Tab */}
          <TabsContent value="launches">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {launches.map((launch, index) => (
                <Card key={launch.id} className="bg-slate-900/90 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      <span className="flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-orange-400" />
                        {launch.name}
                      </span>
                      <Badge variant={launch.upcoming ? "secondary" : launch.success ? "default" : "destructive"}>
                        {launch.upcoming ? "Upcoming" : launch.success ? "Success" : "Failed"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <strong>Rocket:</strong> {launch.rocket.name}
                      </p>
                      <p className="text-gray-300">
                        <strong>Date:</strong> {formatDate(launch.date_utc)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Astronauts Tab */}
          <TabsContent value="astronauts">
            <Card className="bg-slate-900/90 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Globe className="h-5 w-5 text-blue-400" />
                  People Currently in Space
                  {astronauts && (
                    <Badge className="bg-blue-600 text-white ml-2">
                      {astronauts.number} People
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {astronauts ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {astronauts.people.map((person, index) => (
                      <div key={index} className="bg-slate-800 rounded-lg p-4">
                        <h3 className="font-semibold text-white">{person.name}</h3>
                        <p className="text-gray-400 text-sm">{person.craft}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    Loading astronaut data...
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mars Weather Tab */}
          <TabsContent value="mars">
            {marsWeather && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-900/90 border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-white text-sm">
                      <Thermometer className="h-4 w-4 text-red-400" />
                      Temperature
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-1">
                      <p className="text-lg font-bold text-red-400">{marsWeather.temperature.av}°C</p>
                      <p className="text-xs text-gray-400">Average</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Low: {marsWeather.temperature.mn}°C</span>
                        <span>High: {marsWeather.temperature.mx}°C</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/90 border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-white text-sm">
                      <Wind className="h-4 w-4 text-blue-400" />
                      Pressure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-400">{marsWeather.pressure.av}</p>
                      <p className="text-xs text-gray-400">Pa</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/90 border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-white text-sm">
                      <Wind className="h-4 w-4 text-green-400" />
                      Wind Speed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-400">{marsWeather.wind_speed.av}</p>
                      <p className="text-xs text-gray-400">m/s</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/90 border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-white text-sm">
                      <Sun className="h-4 w-4 text-yellow-400" />
                      Sol & Season
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-1">
                      <p className="text-lg font-bold text-yellow-400">Sol {marsWeather.sol}</p>
                      <p className="text-xs text-gray-400">{marsWeather.season}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RealTimeSpaceData;