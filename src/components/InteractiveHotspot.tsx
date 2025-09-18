import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Zap, Globe, Satellite } from 'lucide-react';
import { Button } from './ui/button';

interface HotspotData {
  id: string;
  title: string;
  description: string;
  icon: 'info' | 'zap' | 'globe' | 'satellite';
  position: { x: number; y: number }; // Percentage positions
  color: 'solar' | 'aurora' | 'cosmic' | 'plasma';
}

interface InteractiveHotspotProps {
  hotspots: HotspotData[];
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

const iconMap = {
  info: Info,
  zap: Zap,
  globe: Globe,
  satellite: Satellite,
};

const colorMap = {
  solar: 'text-primary shadow-solar',
  aurora: 'text-secondary shadow-aurora',
  cosmic: 'text-accent shadow-cosmic',
  plasma: 'text-purple-400 shadow-plasma',
};

const InteractiveHotspot = ({ 
  hotspots, 
  imageSrc, 
  imageAlt, 
  className = '' 
}: InteractiveHotspotProps) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Base Image */}
      <img 
        src={imageSrc} 
        alt={imageAlt}
        className="w-full h-auto"
      />
      
      {/* Hotspots */}
      {hotspots.map((hotspot) => {
        const IconComponent = iconMap[hotspot.icon];
        const isActive = activeHotspot === hotspot.id;
        const isHovered = hoveredHotspot === hotspot.id;
        
        return (
          <div key={hotspot.id}>
            {/* Hotspot Button */}
            <motion.button
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-glass backdrop-blur-sm border-2 border-glass flex items-center justify-center cursor-pointer transition-all duration-300 ${colorMap[hotspot.color]}`}
              style={{
                left: `${hotspot.position.x}%`,
                top: `${hotspot.position.y}%`,
              }}
              onClick={() => setActiveHotspot(isActive ? null : hotspot.id)}
              onMouseEnter={() => setHoveredHotspot(hotspot.id)}
              onMouseLeave={() => setHoveredHotspot(null)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                boxShadow: isActive ? '0 0 20px currentColor' : '0 0 10px currentColor'
              }}
            >
              <IconComponent className="w-4 h-4" />
              
              {/* Pulse Animation */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-current"
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>

            {/* Hotspot Info Panel */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute z-10 p-4 bg-glass backdrop-blur-md rounded-xl border border-glass shadow-cosmic min-w-64 max-w-80"
                  style={{
                    left: hotspot.position.x > 70 ? 'auto' : `${hotspot.position.x + 5}%`,
                    right: hotspot.position.x > 70 ? `${100 - hotspot.position.x + 5}%` : 'auto',
                    top: hotspot.position.y > 70 ? 'auto' : `${hotspot.position.y + 5}%`,
                    bottom: hotspot.position.y > 70 ? `${100 - hotspot.position.y + 5}%` : 'auto',
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${colorMap[hotspot.color]}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">{hotspot.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    {hotspot.description}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveHotspot(null)}
                    className="w-full"
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveHotspot;