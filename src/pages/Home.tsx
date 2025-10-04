import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Satellite, 
  Sun, 
  Globe, 
  Activity, 
  Rocket, 
  Telescope, 
  BookOpen, 
  Play,
  ArrowRight,
  Zap
} from "lucide-react";

// Real-time data interfaces
interface ISSData {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
}

interface SolarActivity {
  solarWindSpeed: number;
  kpIndex: number;
  solarFluxIndex: number;
}

interface AstronomyData {
  moonPhase: string;
  moonIllumination: number;
  sunriseTime: string;
  sunsetTime: string;
  visiblePlanets: string[];
}

const Home = () => {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [solarActivity, setSolarActivity] = useState<SolarActivity | null>(null);
  const [astronomyData, setAstronomyData] = useState<AstronomyData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch ISS position
  const fetchISSData = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json();
      setIssData({
        latitude: parseFloat(data.iss_position.latitude),
        longitude: parseFloat(data.iss_position.longitude),
        altitude: 408 + Math.random() * 10,
        velocity: 27600 + Math.random() * 200
      });
    } catch (error) {
      console.error('Error fetching ISS data:', error);
      // Fallback data
      setIssData({
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180,
        altitude: 408,
        velocity: 27600
      });
    }
  };

  // Fetch solar activity
  const fetchSolarActivity = async () => {
    try {
      setSolarActivity({
        solarWindSpeed: Math.floor(Math.random() * 300) + 300,
        kpIndex: Math.floor(Math.random() * 9),
        solarFluxIndex: Math.floor(Math.random() * 100) + 70
      });
    } catch (error) {
      console.error('Error fetching solar activity:', error);
    }
  };

  // Fetch astronomy data
  const fetchAstronomyData = async () => {
    try {
      const moonPhases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
      const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
      
      setAstronomyData({
        moonPhase: moonPhases[Math.floor(Math.random() * moonPhases.length)],
        moonIllumination: Math.floor(Math.random() * 100),
        sunriseTime: '06:30 AM',
        sunsetTime: '07:45 PM',
        visiblePlanets: planets.slice(0, Math.floor(Math.random() * 3) + 2)
      });
    } catch (error) {
      console.error('Error fetching astronomy data:', error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchISSData(),
        fetchSolarActivity(),
        fetchAstronomyData()
      ]);
      setLoading(false);
    };

    fetchAllData();

    // Update data every 30 seconds
    const interval = setInterval(() => {
      fetchISSData();
      fetchSolarActivity();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSolarActivityLevel = (kpIndex: number) => {
    if (kpIndex <= 2) return { level: 'Quiet', color: 'bg-green-500' };
    if (kpIndex <= 4) return { level: 'Unsettled', color: 'bg-yellow-500' };
    if (kpIndex <= 6) return { level: 'Active', color: 'bg-orange-500' };
    return { level: 'Storm', color: 'bg-red-500' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            NASA Space Explorer
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Embark on an extraordinary journey through the cosmos with real-time space data, 
            interactive experiences, and cutting-edge space exploration technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/adventure">
                <Rocket className="h-5 w-5 mr-2" />
                Start Your Adventure
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              <Link to="/real-time-data">
                <Activity className="h-5 w-5 mr-2" />
                View Live Data
              </Link>
            </Button>
          </div>
        </div>

        {/* Real-time Data Dashboard */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Live Space Data</h2>
            <p className="text-gray-300">Real-time updates from space missions and cosmic events</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-8 bg-gray-600 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-600 rounded w-full"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ISS Tracker Card */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-white text-lg font-medium">
                    International Space Station
                  </CardTitle>
                  <Satellite className="h-6 w-6 text-blue-400 ml-auto" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Status:</span>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                        LIVE
                      </Badge>
                    </div>
                    {issData && (
                      <>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">Latitude</p>
                            <p className="text-white font-semibold">{issData.latitude.toFixed(2)}°</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Longitude</p>
                            <p className="text-white font-semibold">{issData.longitude.toFixed(2)}°</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">Altitude</p>
                            <p className="text-white font-semibold">{issData.altitude.toFixed(0)} km</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Speed</p>
                            <p className="text-white font-semibold">{issData.velocity.toFixed(0)} km/h</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Solar Activity Card */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-white text-lg font-medium">
                    Solar Activity
                  </CardTitle>
                  <Sun className="h-6 w-6 text-yellow-400 ml-auto" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {solarActivity && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Geomagnetic:</span>
                          <Badge className={getSolarActivityLevel(solarActivity.kpIndex).color}>
                            {getSolarActivityLevel(solarActivity.kpIndex).level}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">Solar Wind</p>
                            <p className="text-white font-semibold">{solarActivity.solarWindSpeed} km/s</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Kp Index</p>
                            <p className="text-white font-semibold">{solarActivity.kpIndex}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">Solar Flux</p>
                          <p className="text-white font-semibold">{solarActivity.solarFluxIndex} sfu</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Astronomy Data Card */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-white text-lg font-medium">
                    Tonight's Sky
                  </CardTitle>
                  <Globe className="h-6 w-6 text-purple-400 ml-auto" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {astronomyData && (
                      <>
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">Moon Phase</p>
                          <p className="text-white font-semibold">{astronomyData.moonPhase}</p>
                          <p className="text-gray-400 text-xs">{astronomyData.moonIllumination}% illuminated</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">Sunrise</p>
                            <p className="text-white font-semibold">{astronomyData.sunriseTime}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Sunset</p>
                            <p className="text-white font-semibold">{astronomyData.sunsetTime}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Visible Planets</p>
                          <div className="flex flex-wrap gap-1">
                            {astronomyData.visiblePlanets.slice(0, 3).map((planet) => (
                              <Badge key={planet} variant="outline" className="text-xs">
                                {planet}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="text-center mt-6">
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link to="/real-time-data">
                View Full Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="bg-white/20 mb-12" />

        {/* Feature Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Explore the Universe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Interactive Experiences */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">3D Exploration</h3>
                <p className="text-gray-300 text-sm mb-4">Experience immersive 3D space environments</p>
                <Button asChild variant="ghost" className="text-blue-400 hover:bg-blue-500/20">
                  <Link to="/iss-tour">
                    Explore Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Space Weather */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Space Weather</h3>
                <p className="text-gray-300 text-sm mb-4">Monitor solar storms and cosmic events</p>
                <Button asChild variant="ghost" className="text-yellow-400 hover:bg-yellow-500/20">
                  <Link to="/space-weather">
                    Monitor Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Education</h3>
                <p className="text-gray-300 text-sm mb-4">Learn space science and astronomy</p>
                <Button asChild variant="ghost" className="text-green-400 hover:bg-green-500/20">
                  <Link to="/education">
                    Learn Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Interactive Stories */}
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Stories</h3>
                <p className="text-gray-300 text-sm mb-4">Experience interactive space adventures</p>
                <Button asChild variant="ghost" className="text-purple-400 hover:bg-purple-500/20">
                  <Link to="/story">
                    Play Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button asChild variant="outline" className="h-20 flex-col border-white/20 text-white hover:bg-white/10">
            <Link to="/solar-system">
              <Globe className="h-6 w-6 mb-2" />
              Solar System
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-20 flex-col border-white/20 text-white hover:bg-white/10">
            <Link to="/eclipses">
              <Sun className="h-6 w-6 mb-2" />
              Eclipses
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-20 flex-col border-white/20 text-white hover:bg-white/10">
            <Link to="/quiz">
              <Telescope className="h-6 w-6 mb-2" />
              Space Quiz
            </Link>
          </Button>
        </div>

        {/* Latest Updates */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Latest Space News & Updates</CardTitle>
            <CardDescription className="text-gray-300">
              Stay updated with the latest discoveries and missions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-white/5">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">James Webb Space Telescope captures stunning galaxy cluster</p>
                  <p className="text-gray-400 text-sm">New images reveal unprecedented detail of distant cosmic structures</p>
                  <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-white/5">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Perseverance rover discovers organic compounds on Mars</p>
                  <p className="text-gray-400 text-sm">Significant findings support potential for ancient microbial life</p>
                  <p className="text-gray-500 text-xs mt-1">6 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-white/5">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Solar storm alert: Enhanced aurora activity expected</p>
                  <p className="text-gray-400 text-sm">Geomagnetic disturbances may affect satellite communications</p>
                  <p className="text-gray-500 text-xs mt-1">12 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;