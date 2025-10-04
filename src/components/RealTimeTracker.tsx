import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Satellite, 
  Globe, 
  Rocket, 
  Users, 
  MapPin, 
  Clock,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
}

interface LaunchData {
  id: string;
  name: string;
  date_utc: string;
  rocket: {
    name: string;
  };
  upcoming: boolean;
}

const RealTimeTracker: React.FC = () => {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [astronauts, setAstronauts] = useState<AstronautData | null>(null);
  const [nextLaunch, setNextLaunch] = useState<LaunchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchISSData = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data: ISSData = await response.json();
      setIssData(data);
    } catch (err) {
      console.error('Error fetching ISS data:', err);
    }
  };

  const fetchAstronauts = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/astros.json');
      const data: AstronautData = await response.json();
      setAstronauts(data);
    } catch (err) {
      console.error('Error fetching astronaut data:', err);
    }
  };

  const fetchNextLaunch = async () => {
    try {
      const response = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
      const launches = await response.json();
      if (launches.length > 0) {
        setNextLaunch(launches[0]);
      }
    } catch (err) {
      console.error('Error fetching launch data:', err);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchISSData(),
      fetchAstronauts(),
      fetchNextLaunch()
    ]);
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
    
    // Update ISS position every 10 seconds
    const issInterval = setInterval(fetchISSData, 10000);
    
    // Update other data every 5 minutes
    const dataInterval = setInterval(() => {
      fetchAstronauts();
      fetchNextLaunch();
      setLastUpdate(new Date());
    }, 300000);
    
    return () => {
      clearInterval(issInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const formatCoordinate = (coord: string) => {
    return parseFloat(coord).toFixed(2);
  };

  const getTimeUntilLaunch = (launchDate: string) => {
    const now = new Date().getTime();
    const launch = new Date(launchDate).getTime();
    const difference = launch - now;

    if (difference < 0) return "Launch passed";

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <section className="py-16 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Live Space Tracking
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Real-time updates from space missions and exploration
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={refreshData}
              disabled={loading}
              variant="outline"
              size="sm"
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Badge variant="secondary" className="bg-slate-800 text-slate-300">
              <Clock className="h-3 w-3 mr-1" />
              Updated: {lastUpdate.toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* ISS Live Position */}
          <Card className="bg-gradient-to-br from-blue-900/90 to-blue-800/90 border-blue-700 hover:border-blue-500 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Satellite className="h-5 w-5 text-blue-400" />
                ISS Live Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              {issData ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-xs text-blue-300">Latitude</p>
                      <p className="text-lg font-bold text-white">
                        {formatCoordinate(issData.iss_position.latitude)}°
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-blue-300">Longitude</p>
                      <p className="text-lg font-bold text-white">
                        {formatCoordinate(issData.iss_position.longitude)}°
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-200">
                    <MapPin className="h-4 w-4" />
                    <span>Altitude: ~408 km</span>
                  </div>
                  <Badge className="w-full justify-center bg-green-600 text-white">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    Live Tracking
                  </Badge>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Satellite className="h-8 w-8 mx-auto mb-2 text-blue-400 animate-pulse" />
                  <p className="text-blue-300">Loading position...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* People in Space */}
          <Card className="bg-gradient-to-br from-green-900/90 to-green-800/90 border-green-700 hover:border-green-500 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-green-400" />
                People in Space
              </CardTitle>
            </CardHeader>
            <CardContent>
              {astronauts ? (
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{astronauts.number}</p>
                    <p className="text-green-300 text-sm">Currently in orbit</p>
                  </div>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {astronauts.people.slice(0, 3).map((person, index) => (
                      <div key={index} className="text-xs text-green-200 truncate">
                        {person.name} ({person.craft})
                      </div>
                    ))}
                    {astronauts.people.length > 3 && (
                      <p className="text-xs text-green-300">
                        +{astronauts.people.length - 3} more
                      </p>
                    )}
                  </div>
                  <Badge className="w-full justify-center bg-blue-600 text-white">
                    <Globe className="h-3 w-3 mr-1" />
                    Active Missions
                  </Badge>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Users className="h-8 w-8 mx-auto mb-2 text-green-400 animate-pulse" />
                  <p className="text-green-300">Loading astronauts...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Launch */}
          <Card className="bg-gradient-to-br from-orange-900/90 to-orange-800/90 border-orange-700 hover:border-orange-500 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Rocket className="h-5 w-5 text-orange-400" />
                Next Launch
              </CardTitle>
            </CardHeader>
            <CardContent>
              {nextLaunch ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-white text-sm truncate">
                      {nextLaunch.name}
                    </h4>
                    <p className="text-orange-300 text-xs">
                      {nextLaunch.rocket.name}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {getTimeUntilLaunch(nextLaunch.date_utc)}
                    </p>
                    <p className="text-orange-300 text-xs">Time remaining</p>
                  </div>
                  <div className="text-xs text-orange-200">
                    {new Date(nextLaunch.date_utc).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Rocket className="h-8 w-8 mx-auto mb-2 text-orange-400 animate-pulse" />
                  <p className="text-orange-300">Loading launch data...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link to="/real-time-data">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Detailed Space Data
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RealTimeTracker;