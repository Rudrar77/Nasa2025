import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useNASAData } from '../hooks/useNASAData';
import { 
  Play, Pause, RotateCcw, ZoomIn, ZoomOut, AlertTriangle, Zap, Wind,
  Sun, Globe, Sparkles, Cloud, Waves, Flame
} from 'lucide-react';
import { SolarActivityData } from '../hooks/useNASAData';
import { formatDistanceToNow } from 'date-fns';

// Helper function to get the activity level
const getSolarActivityLevel = (data: SolarActivityData): 'low' | 'moderate' | 'high' => {
  // Check for X-class flares or fast CMEs
  if (
    (data.solarFlares.lastFlare && data.solarFlares.lastFlare.class.startsWith('X')) ||
    (data.coronalMassEjections.lastCME && data.coronalMassEjections.lastCME.speed > 1000) ||
    data.geomagneticStorms.kpIndex >= 5
  ) {
    return 'high';
  }
  
  // Check for M-class flares or medium-speed CMEs
  if (
    (data.solarFlares.lastFlare && data.solarFlares.lastFlare.class.startsWith('M')) ||
    (data.coronalMassEjections.lastCME && data.coronalMassEjections.lastCME.speed > 600) ||
    data.geomagneticStorms.kpIndex >= 4 ||
    data.solarWind.speed > 500
  ) {
    return 'moderate';
  }
  
  return 'low';
};

// Helper function to get the most recent significant solar event
const getMostRecentSolarEvent = (data: SolarActivityData): JSX.Element => {
  const flareTime = data.solarFlares.lastFlare ? new Date(data.solarFlares.lastFlare.time) : null;
  const cmeTime = data.coronalMassEjections.lastCME ? new Date(data.coronalMassEjections.lastCME.time) : null;
  
  // Determine most recent event
  let eventType: 'flare' | 'cme' | 'wind' | 'none' = 'none';
  let eventTime = new Date(0);
  
  if (flareTime && (!eventTime || flareTime > eventTime)) {
    eventType = 'flare';
    eventTime = flareTime;
  }
  
  if (cmeTime && (!eventTime || cmeTime > eventTime)) {
    eventType = 'cme';
    eventTime = cmeTime;
  }
  
  // If no recent events, check if solar wind is elevated
  if (eventType === 'none' && data.solarWind.speed > 450) {
    eventType = 'wind';
    eventTime = new Date(); // Assume current
  }
  
  // Generate event card based on type
  const getEventImage = () => {
    if (eventType === 'flare') {
      return 'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0335.jpg';
    }
    if (eventType === 'cme') {
      return 'https://soho.nascom.nasa.gov/data/LATEST/current_c2.gif';
    }
    if (eventType === 'wind') {
      return 'https://services.swpc.noaa.gov/images/ace-mag-swepam-6-hour.gif';
    }
    return null;
  };

  const eventImageUrl = getEventImage();

  switch (eventType) {
    case 'flare':
      return (
        <div className="p-3 border border-orange-400/30 rounded bg-orange-500/10">
          {eventImageUrl && (
            <div className="mb-2 rounded overflow-hidden border border-orange-400/30">
              <img src={eventImageUrl} alt="Recent solar flare" className="w-full h-28 object-cover" />
            </div>
          )}
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-orange-400 mr-2" />
            <h5 className="font-semibold text-orange-300">Solar Flare Detected</h5>
          </div>
          <p className="text-sm mb-1">
            A {data.solarFlares.lastFlare!.class}-class solar flare erupted from region {data.solarFlares.lastFlare!.region}.
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{formatDistanceToNow(eventTime, { addSuffix: true })}</span>
            <span className={`px-2 py-0.5 rounded ${
              data.solarFlares.lastFlare!.class.startsWith('X') ? 'bg-red-500/20 text-red-200' :
              data.solarFlares.lastFlare!.class.startsWith('M') ? 'bg-orange-500/20 text-orange-200' :
              'bg-yellow-500/20 text-yellow-200'
            }`}>
              {data.solarFlares.lastFlare!.class.startsWith('X') ? 'Strong' :
               data.solarFlares.lastFlare!.class.startsWith('M') ? 'Moderate' : 'Minor'}
            </span>
          </div>
        </div>
      );
      
    case 'cme':
      return (
        <div className="p-3 border border-red-400/30 rounded bg-red-500/10">
          {eventImageUrl && (
            <div className="mb-2 rounded overflow-hidden border border-red-400/30">
              <img src={eventImageUrl} alt="Recent CME" className="w-full h-28 object-cover" />
            </div>
          )}
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            <h5 className="font-semibold text-red-300">Coronal Mass Ejection</h5>
          </div>
          <p className="text-sm mb-1">
            A CME has been detected traveling at {data.coronalMassEjections.lastCME!.speed} km/s.
            {data.coronalMassEjections.lastCME!.speed > 1000 ? 
              ' This is a fast-moving ejection that may impact Earth.' : 
              ' Monitoring for potential Earth impact.'}
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{formatDistanceToNow(eventTime, { addSuffix: true })}</span>
            <span className={`px-2 py-0.5 rounded ${
              data.coronalMassEjections.lastCME!.speed > 1000 ? 'bg-red-500/20 text-red-200' :
              'bg-yellow-500/20 text-yellow-200'
            }`}>
              {data.coronalMassEjections.lastCME!.speed > 1000 ? 'Fast' : 'Moderate'}
            </span>
          </div>
        </div>
      );
      
    case 'wind':
      return (
        <div className="p-3 border border-blue-400/30 rounded bg-blue-500/10">
          {eventImageUrl && (
            <div className="mb-2 rounded overflow-hidden border border-blue-400/30">
              <img src={eventImageUrl} alt="Solar wind status" className="w-full h-28 object-cover" />
            </div>
          )}
          <div className="flex items-center mb-2">
            <Wind className="w-5 h-5 text-blue-400 mr-2" />
            <h5 className="font-semibold text-blue-300">Enhanced Solar Wind</h5>
          </div>
          <p className="text-sm mb-1">
            Solar wind speed has increased to {data.solarWind.speed} km/s with density of {data.solarWind.density} p/cm³.
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Current conditions</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">
              {data.solarWind.speed > 600 ? 'Fast' : 'Elevated'}
            </span>
          </div>
        </div>
      );
      
    default:
      return (
        <div className="p-3 border border-gray-400/30 rounded bg-gray-500/10">
          <p className="text-sm text-muted-foreground text-center">
            No significant solar activity detected recently.
            Solar conditions are relatively quiet.
          </p>
        </div>
      );
  }
};

interface Planet {
  name: string;
  distance: number;
  size: number;
  color: string;
  speed: number;
  icon: React.ReactNode;
  description?: string;
  texture?: string;
}

const EnhancedSolarSystem3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const { data: nasaData } = useNASAData();

  const planets: Planet[] = [
    { 
      name: 'Mercury', 
      distance: 80, 
      size: 4, 
      color: '#8C7853', 
      speed: 0.04,
      icon: <Flame className="h-4 w-4 text-amber-300" />,
      description: 'Closest planet to the Sun with extreme temperature variations'
    },
    { 
      name: 'Venus', 
      distance: 110, 
      size: 6, 
      color: '#FFC649', 
      speed: 0.03,
      icon: <Cloud className="h-4 w-4 text-yellow-200" />,
      description: 'Similar in size to Earth but with a toxic atmosphere'
    },
    { 
      name: 'Earth', 
      distance: 140, 
      size: 8, 
      color: '#6B93D6', 
      speed: 0.02,
      icon: <Globe className="h-4 w-4 text-blue-400" />,
      description: 'Our home planet, the only known world with abundant liquid water and life'
    },
    { 
      name: 'Mars', 
      distance: 170, 
      size: 6, 
      color: '#C1440E', 
      speed: 0.018,
      icon: <Flame className="h-4 w-4 text-red-500" />,
      description: 'The Red Planet with polar ice caps and evidence of ancient water'
    },
    { 
      name: 'Jupiter', 
      distance: 220, 
      size: 20, 
      color: '#D8CA9D', 
      speed: 0.013,
      icon: <Wind className="h-4 w-4 text-amber-100" />,
      description: 'Largest planet in our solar system with a prominent Great Red Spot'
    },
    { 
      name: 'Saturn', 
      distance: 270, 
      size: 18, 
      color: '#FAD5A5', 
      speed: 0.009,
      icon: <Sparkles className="h-4 w-4 text-yellow-100" />,
      description: 'Known for its beautiful ring system visible from Earth'
    },
    { 
      name: 'Uranus', 
      distance: 320, 
      size: 12, 
      color: '#4FD0E7', 
      speed: 0.006,
      icon: <Waves className="h-4 w-4 text-cyan-300" />,
      description: 'Ice giant that rotates on its side, unlike other planets'
    },
    { 
      name: 'Neptune', 
      distance: 370, 
      size: 12, 
      color: '#4B70DD', 
      speed: 0.005,
      icon: <Wind className="h-4 w-4 text-blue-600" />,
      description: 'Farthest planet with the strongest winds in the solar system'
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = () => {
      if (!isPlaying) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sun with solar activity visualization
      const sunRadius = 25 * zoom;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sunRadius);
      gradient.addColorStop(0, '#FFD700');
      gradient.addColorStop(0.7, '#FFA500');
      gradient.addColorStop(1, '#FF4500');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Add solar flare effects based on NASA data
      if (nasaData?.solarFlares.lastFlare) {
        const flareIntensity = nasaData.solarFlares.lastFlare.class.startsWith('X') ? 1 :
                              nasaData.solarFlares.lastFlare.class.startsWith('M') ? 0.7 :
                              nasaData.solarFlares.lastFlare.class.startsWith('C') ? 0.4 : 0.2;

        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + time * 0.01;
          const flareLength = (sunRadius + 15 * flareIntensity) * zoom;
          const flareWidth = 3 * flareIntensity * zoom;

          ctx.strokeStyle = `rgba(255, 100, 0, ${flareIntensity * 0.8})`;
          ctx.lineWidth = flareWidth;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle) * flareLength,
            centerY + Math.sin(angle) * flareLength
          );
          ctx.stroke();
        }
        
        // Add pulsating text label for active solar flare
        const flareClassColor = nasaData.solarFlares.lastFlare.class.startsWith('X') ? 'rgba(255, 50, 50, ' :
                               nasaData.solarFlares.lastFlare.class.startsWith('M') ? 'rgba(255, 150, 50, ' :
                               'rgba(255, 200, 50, ';
        const pulseFactor = 0.5 + Math.abs(Math.sin(time * 0.1)) * 0.5;
        
        ctx.font = `bold ${12 * zoom}px Arial`;
        ctx.fillStyle = `${flareClassColor}${pulseFactor})`;
        ctx.textAlign = 'center';
        ctx.fillText(`Solar Flare: ${nasaData.solarFlares.lastFlare.class}`, centerX, centerY - sunRadius - 15 * zoom);
      }

      // Draw sunspots
      if (nasaData?.sunspots.count > 0) {
        for (let i = 0; i < Math.min(nasaData.sunspots.count / 10, 12); i++) {
          const angle = (i / 12) * Math.PI * 2;
          const spotDistance = sunRadius * 0.7;
          const spotX = centerX + Math.cos(angle) * spotDistance;
          const spotY = centerY + Math.sin(angle) * spotDistance;

          ctx.fillStyle = 'rgba(100, 50, 0, 0.8)';
          ctx.beginPath();
          ctx.arc(spotX, spotY, 3 * zoom, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw CME (Coronal Mass Ejection) visualization
      if (nasaData?.coronalMassEjections.lastCME) {
        const cmeSpeed = nasaData.coronalMassEjections.lastCME.speed;
        const cmeProgress = (time % 600) / 600; // Animation cycle
        const cmeMaxDistance = 150 * zoom; // How far the CME travels
        const cmeDistance = cmeProgress * cmeMaxDistance;
        const cmeWidth = 60 * zoom;
        const cmeIntensity = cmeSpeed / 2000; // Normalize based on max expected speed
        
        // Draw expanding CME wavefront
        ctx.fillStyle = `rgba(255, 170, 100, ${(0.8 - cmeProgress * 0.6) * cmeIntensity})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius + cmeDistance, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw CME direction arc (aimed somewhere in Earth's direction)
        const cmeAngle = Math.PI * 0.5 + Math.sin(time * 0.01) * 0.3; // Direction of CME
        const cmeArcWidth = Math.PI / 3; // Width of the CME arc
        
        ctx.fillStyle = `rgba(255, 120, 50, ${(0.6 - cmeProgress * 0.5) * cmeIntensity})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius + cmeDistance, cmeAngle - cmeArcWidth/2, cmeAngle + cmeArcWidth/2);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fill();
        
        // Show CME info if it's active
        if (cmeIntensity > 0.3) {
          ctx.font = `bold ${11 * zoom}px Arial`;
          ctx.fillStyle = `rgba(255, 160, 50, ${0.7 + Math.sin(time * 0.2) * 0.3})`;
          ctx.textAlign = 'center';
          ctx.fillText(`CME: ${cmeSpeed} km/s`, centerX, centerY + sunRadius + 20 * zoom);
        }
      }

      // Draw planets
      planets.forEach((planet, index) => {
        const angle = time * planet.speed;
        const distance = planet.distance * zoom;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        // Draw orbit
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, distance, 0, Math.PI * 2);
        ctx.stroke();

        // Draw planet
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(x, y, planet.size * zoom, 0, Math.PI * 2);
        ctx.fill();

        // Highlight selected planet
        if (selectedPlanet === planet.name) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Display planet name
        ctx.font = `${10 * zoom}px Arial`;
        ctx.fillStyle = selectedPlanet === planet.name ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(planet.name, x, y + planet.size * zoom + 15 * zoom);

        // Add special effects for Earth (aurora and magnetic field interaction)
        if (planet.name === 'Earth') {
          // Show Earth's magnetosphere
          const magnetosphereSize = (planet.size + 3) * zoom;
          const compressionFactor = nasaData?.solarWind.speed ? Math.max(0.7, 1 - (nasaData.solarWind.speed - 300) / 1000) : 1;
          
          // Draw magnetosphere (compressed on the sun side, elongated on the night side)
          ctx.strokeStyle = 'rgba(50, 100, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          
          // Calculate sun-earth angle
          const sunEarthAngle = Math.atan2(y - centerY, x - centerX);
          
          // Draw magnetosphere as an ellipse
          for (let a = 0; a < Math.PI * 2; a += 0.1) {
            const distFromSunDirection = 1 - Math.abs(Math.cos(a - sunEarthAngle));
            const mRadius = magnetosphereSize * (1 + distFromSunDirection * 0.5);
            
            // Compress on sun side, elongate on night side
            const adjustedRadius = a > sunEarthAngle - Math.PI/2 && a < sunEarthAngle + Math.PI/2 
              ? mRadius * compressionFactor 
              : mRadius * 1.5;
            
            const mx = x + Math.cos(a) * adjustedRadius;
            const my = y + Math.sin(a) * adjustedRadius;
            
            if (a === 0) {
              ctx.moveTo(mx, my);
            } else {
              ctx.lineTo(mx, my);
            }
          }
          ctx.closePath();
          ctx.stroke();
          
          // Draw aurora if geomagnetic storm is active
          if (nasaData?.geomagneticStorms.status === 'storm' || nasaData?.geomagneticStorms.kpIndex >= 5) {
            const auroraIntensity = nasaData?.geomagneticStorms.kpIndex / 9 || 0.5;
            
            // North pole aurora
            ctx.strokeStyle = `rgba(0, 255, 200, ${0.4 * auroraIntensity})`;
            ctx.lineWidth = 2 * zoom;
            ctx.beginPath();
            ctx.arc(x, y, planet.size * 0.7 * zoom, 0, Math.PI * 2);
            ctx.stroke();
            
            // South pole aurora
            ctx.strokeStyle = `rgba(200, 100, 255, ${0.4 * auroraIntensity})`;
            ctx.beginPath();
            ctx.arc(x, y, planet.size * 0.6 * zoom, 0, Math.PI * 2);
            ctx.stroke();
            
            // Show geomagnetic storm indicator
            ctx.font = `${9 * zoom}px Arial`;
            ctx.fillStyle = `rgba(0, 255, 200, ${0.7 + Math.sin(time * 0.2) * 0.3})`;
            ctx.textAlign = 'center';
            ctx.fillText(`Kp: ${nasaData?.geomagneticStorms.kpIndex}`, x, y - planet.size * zoom - 10 * zoom);
          }
          
          // Show impact if CME is hitting Earth
          if (nasaData?.coronalMassEjections.lastCME) {
            const cmeProgress = (time % 600) / 600;
            const earthDistance = planet.distance * zoom;
            const cmeMaxDistance = 150 * zoom;
            
            // Check if CME is reaching Earth
            if (Math.abs(cmeMaxDistance * cmeProgress - earthDistance) < 10 * zoom) {
              // Show impact visualization
              ctx.strokeStyle = 'rgba(255, 200, 50, 0.8)';
              ctx.lineWidth = 3 * zoom;
              ctx.beginPath();
              ctx.arc(x, y, planet.size * 1.3 * zoom, 0, Math.PI * 2);
              ctx.stroke();
              
              // Shockwave effect
              ctx.strokeStyle = 'rgba(255, 200, 50, 0.4)';
              ctx.lineWidth = 2 * zoom;
              ctx.beginPath();
              ctx.arc(x, y, planet.size * (1.5 + Math.sin(time * 0.3) * 0.2) * zoom, 0, Math.PI * 2);
              ctx.stroke();
              
              // Impact text
              ctx.font = `bold ${10 * zoom}px Arial`;
              ctx.fillStyle = 'rgba(255, 200, 50, 0.9)';
              ctx.textAlign = 'center';
              ctx.fillText('CME IMPACT!', x, y - planet.size * zoom - 15 * zoom);
            }
          }
        }
      });

      // Draw solar wind particles
      if (nasaData?.solarWind.speed > 0) {
        for (let i = 0; i < 20; i++) {
          const angle = (i / 20) * Math.PI * 2 + time * 0.02;
          const distance = 50 + (time * 0.5 + i * 10) % 300;
          const x = centerX + Math.cos(angle) * distance * zoom;
          const y = centerY + Math.sin(angle) * distance * zoom;

          if (distance < 400) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(x, y, 1 * zoom, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      time += 0.02;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, zoom, selectedPlanet, nasaData]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const handleReset = () => {
    setZoom(1);
    setSelectedPlanet(null);
  };

  return (
    <Card className="p-6 bg-glass backdrop-blur-md border-glass">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold bg-gradient-solar bg-clip-text text-transparent">
            🌌 Enhanced 3D Solar System
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              disabled={zoom <= 0.3}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-auto border border-glass rounded-lg bg-black"
            onClick={(e) => {
              const canvas = canvasRef.current;
              if (!canvas) return;

              const rect = canvas.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = canvas.width / 2;
              const centerY = canvas.height / 2;

              // Check if click is near any planet
              planets.forEach(planet => {
                const angle = Date.now() * 0.001 * planet.speed;
                const distance = planet.distance * zoom;
                const planetX = centerX + Math.cos(angle) * distance;
                const planetY = centerY + Math.sin(angle) * distance;

                const dx = x - planetX;
                const dy = y - planetY;
                const distanceToPlanet = Math.sqrt(dx * dx + dy * dy);

                if (distanceToPlanet < planet.size * zoom + 10) {
                  setSelectedPlanet(planet.name);
                }
              });
            }}
          />

          {selectedPlanet && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 left-4 bg-black/80 text-white p-3 rounded-lg max-w-[250px]"
            >
              <div className="flex items-center gap-2 mb-1">
                {planets.find(p => p.name === selectedPlanet)?.icon}
                <h4 className="font-semibold">{selectedPlanet}</h4>
              </div>
              <p className="text-sm opacity-75 mb-1">
                {planets.find(p => p.name === selectedPlanet)?.description || 'Click to explore'}
              </p>
              {selectedPlanet === 'Earth' && nasaData?.geomagneticStorms.status === 'storm' && (
                <div className="mt-2 text-xs bg-blue-500/30 p-1.5 rounded">
                  🌟 Aurora activity detected!
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Real-time data overlay */}
        {nasaData && (
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg">
            <h4 className="font-semibold mb-3 text-center">Recent Solar Activity</h4>
            
            {/* Most Recent Solar Event */}
            <div className="mb-4">
              {getMostRecentSolarEvent(nasaData)}
            </div>
            
            {/* Current Space Weather Status */}
            <div className="flex items-center justify-between p-2 border-t border-gray-700/50 pt-3">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  getSolarActivityLevel(nasaData) === 'high' ? 'bg-red-500' :
                  getSolarActivityLevel(nasaData) === 'moderate' ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}></div>
                <span className="text-sm">Current Activity Level:</span>
              </div>
              <span className={`text-sm font-medium ${
                getSolarActivityLevel(nasaData) === 'high' ? 'text-red-400' :
                getSolarActivityLevel(nasaData) === 'moderate' ? 'text-yellow-400' : 
                'text-green-400'
              }`}>
                {getSolarActivityLevel(nasaData) === 'high' ? 'High' :
                 getSolarActivityLevel(nasaData) === 'moderate' ? 'Moderate' : 
                 'Low'}
              </span>
            </div>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground mt-3">
          <p>🖱️ Click on planets to explore • 🔭 Recent solar activity and its effects visualized in real-time</p>
          <p className="mt-1 text-xs">Watch how the latest solar events impact Earth and our solar system!</p>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedSolarSystem3D;