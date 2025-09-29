import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Waves, Zap } from 'lucide-react';

interface MagnetosphereAnimationProps {
  className?: string;
}

// Define data point interface for the magnetosphere animation
interface MagnetosphereDataPoint {
  id: string;
  x: string;
  y: string;
  label: string;
  value: string;
  unit: string;
  description: string;
  icon: React.ReactNode;
}

const MagnetosphereAnimation: React.FC<MagnetosphereAnimationProps> = ({ className = '' }) => {
  // Educational data points for the magnetosphere
  const dataPoints: MagnetosphereDataPoint[] = [
    {
      id: "field-strength",
      x: "right-6",
      y: "top-10",
      label: "Magnetic Field Strength",
      value: "30,000",
      unit: "nT",
      description: "At Earth's surface near equator",
      icon: <Activity size={14} />
    },
    {
      id: "distance",
      x: "left-6",
      y: "top-10",
      label: "Magnetosphere Distance",
      value: "~65,000",
      unit: "km",
      description: "Dayside compression by solar wind",
      icon: <Shield size={14} />
    },
    {
      id: "van-allen",
      x: "right-6",
      y: "bottom-20",
      label: "Van Allen Belts",
      value: "1,000-60,000",
      unit: "km",
      description: "Radiation belts trapping charged particles",
      icon: <Waves size={14} />
    },
    {
      id: "tail-length",
      x: "left-6",
      y: "bottom-20",
      label: "Magnetotail Length",
      value: "~3.8M",
      unit: "km",
      description: "Extends well beyond Moon's orbit",
      icon: <Zap size={14} />
    }
  ];

  return (
    <div className={`relative w-full h-96 bg-gradient-to-br from-indigo-900 via-purple-900 to-black overflow-hidden ${className}`}>
      {/* Earth at center */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.02, 1]
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity }
        }}
      >
        <div className="relative w-32 h-32">
          {/* Earth's surface */}
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-green-400 to-blue-600 rounded-full relative overflow-hidden">
            {/* Simple continents */}
            <div className="absolute top-1/4 left-1/4 w-4 h-6 bg-green-600 rounded-full transform rotate-45" />
            <div className="absolute top-1/3 right-1/4 w-3 h-4 bg-green-700 rounded-full" />
            <div className="absolute bottom-1/4 left-1/3 w-5 h-3 bg-green-500 rounded-full transform -rotate-12" />
          </div>
        </div>
      </motion.div>

      {/* Magnetosphere layers */}
      {/* Inner magnetosphere */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-40 h-40 border-2 border-cyan-400/60 rounded-full" />
      </motion.div>

      {/* Middle magnetosphere */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.2 }}
      >
        <div className="w-52 h-52 border-2 border-blue-400/50 rounded-full" />
      </motion.div>

      {/* Outer magnetosphere */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.4 }}
      >
        <div className="w-64 h-64 border-2 border-purple-400/40 rounded-full" />
      </motion.div>

      {/* Bow shock */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 0.6 }}
      >
        <div className="w-80 h-80 border-2 border-pink-400/30 rounded-full" />
      </motion.div>

      {/* Magnetic field lines */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Dayside field lines */}
        <motion.path
          d="M 320 240 Q 400 200 480 240"
          stroke="#60a5fa"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M 320 240 Q 400 280 480 240"
          stroke="#60a5fa"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />

        {/* Nightside field lines (stretched) */}
        <motion.path
          d="M 160 240 Q 80 200 0 240"
          stroke="#93c5fd"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
        <motion.path
          d="M 160 240 Q 80 280 0 240"
          stroke="#93c5fd"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
        />
      </svg>

      {/* Solar wind particles approaching */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`wind-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
          style={{
            left: '10%',
            top: `${30 + Math.random() * 40}%`
          }}
          animate={{
            x: [0, 300],
            y: [0, Math.sin(i * 0.4) * 30],
            scale: [1, 0.5, 1],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Particles deflected by magnetosphere */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`deflect-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"
          style={{
            left: '40%',
            top: `${20 + Math.random() * 60}%`
          }}
          animate={{
            x: [0, 100, 200],
            y: [0, -50, -100],
            scale: [1, 0.3, 1],
            opacity: [1, 0.5, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Aurora formation */}
      <motion.div
        className="absolute left-1/4 top-1/4 w-24 h-32"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-green-400/40 via-cyan-400/20 to-transparent rounded-full" />
      </motion.div>

      <motion.div
        className="absolute right-1/4 top-1/3 w-20 h-28"
        animate={{
          opacity: [0.2, 0.7, 0.2],
          scale: [0.9, 1.1, 0.9]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatDelay: 1.2
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-purple-400/30 via-blue-400/15 to-transparent rounded-full" />
      </motion.div>

      {/* Van Allen belts visualization */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-44 h-44 border border-yellow-400/50 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 5.5, repeat: Infinity, delay: 0.3 }}
      >
        <div className="w-56 h-56 border border-orange-400/40 rounded-full" />
      </motion.div>

      {/* Labels */}
      <motion.div
        className="absolute top-4 left-4 text-cyan-400 font-mono text-sm"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        MAGNETOSPHERE
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-4 text-blue-400 font-mono text-sm"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        SOLAR WIND DEFLECTION
      </motion.div>

      {/* Data Visualization Cards */}
      {dataPoints.map((point, index) => (
        <motion.div
          key={point.id}
          className={`absolute ${point.x} ${point.y} z-20`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + index * 0.4, duration: 0.6 }}
        >
          <motion.div 
            className="group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-black/80 backdrop-blur-md p-2 rounded-lg border border-indigo-500/50 text-white text-xs shadow-lg max-w-48">
              <div className="flex items-center gap-1 font-bold text-blue-400 text-sm mb-1">
                {point.icon}
                <span>{point.label}</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <motion.span 
                  className="text-white font-mono font-bold"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {point.value}
                </motion.span>
                <span className="text-blue-300 text-xs">{point.unit}</span>
              </div>
              <p className="text-gray-300 text-xs">{point.description}</p>
            </div>
            
            {/* Connector line */}
            <motion.div 
              className="absolute left-1/2 w-0.5 bg-indigo-500/50 -translate-x-1/2"
              initial={{ height: 0 }}
              animate={{ height: [0, 30] }}
              transition={{ delay: 0.6 + index * 0.3, duration: 0.5 }}
              style={{ 
                top: '100%',
              }}
            />
          </motion.div>
        </motion.div>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-indigo-500/20">
        <div className="font-bold mb-1">Magnetosphere Features</div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span>Inner magnetosphere</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span>Inner Van Allen belt</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <span>Outer Van Allen belt</span>
          </div>
        </div>
      </div>
      
      {/* Field strength scale */}
      <div className="absolute left-3 bottom-20 bg-black/60 p-1.5 rounded-lg border border-indigo-500/30 text-xs text-white">
        <div className="font-bold text-indigo-300 mb-1">Field Strength</div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gradient-to-r from-indigo-300 via-indigo-500 to-blue-600 rounded"></div>
          <div className="flex justify-between w-full">
            <span>Weak</span>
            <span>Strong</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagnetosphereAnimation;