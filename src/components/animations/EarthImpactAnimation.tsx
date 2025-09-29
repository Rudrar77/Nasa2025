import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap } from 'lucide-react';

interface EarthImpactAnimationProps {
  className?: string;
}

// Data visualization type for the animation
interface DataVisualization {
  x: string;
  y: string;
  label: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const EarthImpactAnimation: React.FC<EarthImpactAnimationProps> = ({ className = '' }) => {
  // Educational data visualizations for Earth impact
  const dataVisualizations: DataVisualization[] = [
    {
      x: "left-5",
      y: "top-10",
      label: "Magnetic Field Strength",
      value: "25-65",
      unit: "μT",
      icon: <Shield size={14} />,
      description: "Earth's magnetic field protects us from solar radiation",
      color: "blue"
    },
    {
      x: "right-5",
      y: "top-20",
      label: "Solar Wind Speed",
      value: "400-800",
      unit: "km/s",
      icon: <TrendingUp size={14} />,
      description: "Solar wind particles travel at incredible speeds",
      color: "amber"
    },
    {
      x: "left-1/4",
      y: "bottom-10",
      label: "Aurora Energy",
      value: "10^13",
      unit: "watts",
      icon: <Zap size={14} />,
      description: "Energy released during auroras can power entire cities",
      color: "emerald"
    }
  ];

  return (
    <div className={`relative w-full h-96 bg-gradient-to-b from-blue-900 via-purple-900 to-black overflow-hidden ${className}`}>
      {/* Earth */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity }
        }}
      >
        <div className="relative w-48 h-48">
          {/* Earth's surface */}
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-600 rounded-full relative overflow-hidden">
            {/* Continents */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-8 h-12 bg-green-600 rounded-full transform rotate-45" />
              <div className="absolute top-1/3 right-1/4 w-6 h-8 bg-green-700 rounded-full" />
              <div className="absolute bottom-1/4 left-1/3 w-10 h-6 bg-green-500 rounded-full transform -rotate-12" />
            </div>

            {/* Aurora effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-green-400/30 via-cyan-400/20 to-transparent rounded-full"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          {/* Magnetic field lines */}
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400/50 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-4 border border-cyan-300/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Solar particles hitting Earth */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`impact-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
          style={{
            left: '10%',
            top: `${20 + Math.random() * 60}%`
          }}
          animate={{
            x: [0, 400],
            y: [0, Math.sin(i * 0.3) * 50],
            scale: [1, 0.5, 1],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Data Visualization Overlays */}
      {dataVisualizations.map((data, index) => (
        <motion.div
          key={index}
          className={`absolute ${data.x} ${data.y} z-30`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.3, duration: 0.6 }}
        >
          <motion.div 
            className="group relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`bg-black/80 backdrop-blur-md p-2 rounded-lg border border-${data.color}-500 text-white shadow-lg max-w-56`}>
              <div className={`flex items-center gap-1 font-bold text-${data.color}-400 text-sm mb-1`}>
                {data.icon}
                <span>{data.label}</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <motion.span 
                  className="text-white font-mono font-bold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {data.value}
                </motion.span>
                <span className={`text-${data.color}-300 text-xs`}>{data.unit}</span>
              </div>
              <p className="text-gray-300 text-xs">{data.description}</p>
            </div>
            
            {/* Connector line */}
            <motion.div 
              className={`absolute left-1/2 w-0.5 bg-${data.color}-500/50 -translate-x-1/2`}
              initial={{ height: 0 }}
              animate={{ height: [0, 30] }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
              style={{ 
                top: '100%',
              }}
            />
            
            {/* Pulsing indicator */}
            <motion.div
              className={`absolute left-1/2 -bottom-8 w-3 h-3 rounded-full bg-${data.color}-500 -translate-x-1/2`}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Impact effects on Earth */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-full h-full border-2 border-orange-400/50 rounded-full" />
      </motion.div>

      {/* Technology impacts */}
      {/* Satellite */}
      <motion.div
        className="absolute top-8 right-16"
        animate={{
          y: [0, -10, 0],
          opacity: [1, 0.5, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-4 bg-gray-600 rounded flex items-center justify-center">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
        <div className="text-xs text-red-400 mt-1">SATELLITE</div>
      </motion.div>

      {/* Power grid */}
      <motion.div
        className="absolute bottom-16 left-16"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <div className="w-12 h-6 bg-yellow-600 rounded flex items-center justify-center">
          <motion.div
            className="w-1 h-3 bg-orange-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </div>
        <div className="text-xs text-yellow-400 mt-1">POWER GRID</div>
      </motion.div>

      {/* GPS signal */}
      <motion.div
        className="absolute top-20 left-20"
        animate={{
          rotate: [0, 360],
          opacity: [1, 0.3, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-6 h-6 border-2 border-cyan-400 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
        </div>
        <div className="text-xs text-cyan-400 mt-1">GPS</div>
      </motion.div>

      {/* Radio waves */}
      <motion.div
        className="absolute bottom-8 right-8"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div className="flex items-center gap-1">
          <motion.div
            className="w-1 h-4 bg-purple-400"
            animate={{ scaleY: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.div
            className="w-1 h-6 bg-purple-500"
            animate={{ scaleY: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-1 h-4 bg-purple-400"
            animate={{ scaleY: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <div className="text-xs text-purple-400 mt-1">RADIO</div>
      </motion.div>

      {/* Aurora borealis effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-400/20 via-cyan-400/10 to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          background: [
            'linear-gradient(to bottom, rgba(34, 197, 94, 0.2), rgba(6, 182, 212, 0.1), transparent)',
            'linear-gradient(to bottom, rgba(34, 197, 94, 0.4), rgba(6, 182, 212, 0.2), transparent)',
            'linear-gradient(to bottom, rgba(34, 197, 94, 0.2), rgba(6, 182, 212, 0.1), transparent)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Warning indicators */}
      <motion.div
        className="absolute top-4 left-4 text-red-400 font-mono text-sm"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        ⚠️ GEOMAGNETIC STORM
      </motion.div>

      <motion.div
        className="absolute bottom-4 right-4 text-orange-400 font-mono text-sm text-right"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        IMPACT LEVEL: MODERATE
      </motion.div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-white/20">
        <div className="font-bold mb-1">Earth Impact Data</div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Solar particles</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span>Magnetic field</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Aurora activity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthImpactAnimation;