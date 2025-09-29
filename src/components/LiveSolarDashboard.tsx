import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useNASAData } from '../hooks/useNASAData';
import {
  Zap,
  Sun,
  Wind,
  Activity,
  AlertTriangle,
  TrendingUp,
  Clock,
  Thermometer
} from 'lucide-react';

const LiveSolarDashboard: React.FC = () => {
  const { data, loading, error } = useNASAData();

  if (loading) {
    return (
      <Card className="p-6 bg-glass backdrop-blur-md border-glass">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Loading NASA data...</span>
        </div>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="p-6 bg-glass backdrop-blur-md border-glass">
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          <AlertTriangle className="w-6 h-6 mr-2" />
          Unable to load live data
        </div>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'storm': return 'bg-red-500';
      case 'active': return 'bg-yellow-500';
      case 'quiet': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getFlareClassColor = (flareClass: string) => {
    if (flareClass.startsWith('X')) return 'text-red-400';
    if (flareClass.startsWith('M')) return 'text-orange-400';
    if (flareClass.startsWith('C')) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold bg-gradient-solar bg-clip-text text-transparent mb-2">
          🌟 Live Solar Activity Dashboard
        </h2>
        <p className="text-muted-foreground text-sm">
          Real-time data from NASA space weather monitoring
        </p>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Solar Flares */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-glass backdrop-blur-md border-glass hover:shadow-solar transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-6 h-6 text-primary" />
              <Badge variant="secondary" className="text-xs">
                {data.solarFlares.count} flares
              </Badge>
            </div>
            <h3 className="font-semibold text-sm mb-2">Solar Flares</h3>
            {data.solarFlares.lastFlare ? (
              <div className="space-y-1">
                <div className={`font-bold text-lg ${getFlareClassColor(data.solarFlares.lastFlare.class)}`}>
                  Class {data.solarFlares.lastFlare.class}
                </div>
                <div className="text-xs text-muted-foreground">
                  Region {data.solarFlares.lastFlare.region}
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(data.solarFlares.lastFlare.time).toLocaleTimeString()}
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No recent flares</div>
            )}
          </Card>
        </motion.div>

        {/* Coronal Mass Ejections */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 bg-glass backdrop-blur-md border-glass hover:shadow-solar transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Sun className="w-6 h-6 text-secondary" />
              <Badge variant="secondary" className="text-xs">
                {data.coronalMassEjections.count} CMEs
              </Badge>
            </div>
            <h3 className="font-semibold text-sm mb-2">Coronal Mass Ejections</h3>
            {data.coronalMassEjections.lastCME ? (
              <div className="space-y-1">
                <div className="font-bold text-lg text-accent">
                  {data.coronalMassEjections.lastCME.speed} km/s
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(data.coronalMassEjections.lastCME.time).toLocaleDateString()}
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No recent CMEs</div>
            )}
          </Card>
        </motion.div>

        {/* Geomagnetic Activity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 bg-glass backdrop-blur-md border-glass hover:shadow-solar transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-6 h-6 text-accent" />
              <div className={`w-3 h-3 rounded-full ${getStatusColor(data.geomagneticStorms.status)}`}></div>
            </div>
            <h3 className="font-semibold text-sm mb-2">Geomagnetic Activity</h3>
            <div className="space-y-1">
              <div className="font-bold text-lg">
                Kp {data.geomagneticStorms.kpIndex}
              </div>
              <Badge
                variant={data.geomagneticStorms.status === 'storm' ? 'destructive' : 'secondary'}
                className="text-xs capitalize"
              >
                {data.geomagneticStorms.status}
              </Badge>
            </div>
          </Card>
        </motion.div>

        {/* Solar Wind */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 bg-glass backdrop-blur-md border-glass hover:shadow-solar transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <Wind className="w-6 h-6 text-primary" />
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-sm mb-2">Solar Wind</h3>
            <div className="space-y-1">
              <div className="font-bold text-lg">
                {data.solarWind.speed} km/s
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Thermometer className="w-3 h-3 mr-1" />
                {Math.round(data.solarWind.temperature / 1000)}K
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Sunspots Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-4 bg-glass backdrop-blur-md border-glass">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sun className="w-8 h-8 text-yellow-400" />
              <div>
                <h3 className="font-semibold">Sunspots</h3>
                <p className="text-sm text-muted-foreground">
                  Current count: <span className="font-bold text-primary">{data.sunspots.count}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">
                Last updated
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(data.sunspots.lastUpdated).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Educational Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-muted-foreground"
      >
        <p>
          📡 Data updates every 5 minutes • Powered by NASA space weather monitoring
        </p>
      </motion.div>
    </div>
  );
};

export default LiveSolarDashboard;