import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface SolarFormationAnimationProps {
  className?: string;
}

// Data point information for educational display
interface DataPoint {
  x: string;
  y: string;
  label: string;
  value: string;
  unit: string;
  info: string;
}

const SolarFormationAnimation: React.FC<SolarFormationAnimationProps> = ({ className = '' }) => {
  // Educational data points for solar formation
  const dataPoints: DataPoint[] = [
    {
      x: "left-1/4",
      y: "bottom-10",
      label: "Surface Temperature",
      value: "5,778",
      unit: "K",
      info: "The Sun's surface is nearly 6,000 Kelvin"
    },
    {
      x: "right-1/4",
      y: "bottom-8",
      label: "Solar Mass",
      value: "1.989 × 10^30",
      unit: "kg",
      info: "The Sun contains 99.8% of the mass in our solar system"
    },
    {
      x: "left-1/3",
      y: "top-1/4",
      label: "Corona",
      value: "1-3",
      unit: "million K",
      info: "The Sun's outer atmosphere is much hotter than its surface"
    }
  ];

  return (
    <div className={`relative w-full h-96 bg-gradient-to-b from-orange-900 via-red-900 to-black overflow-hidden ${className}`}>
      {/* Sun's core */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-60 rounded-full bg-gradient-to-t from-yellow-500 via-orange-500 to-red-600"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Corona effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-72 rounded-full bg-yellow-500/30 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full bg-orange-500/20 blur-xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      {/* Sun's surface */}
      <motion.div
        className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-yellow-600 to-orange-500"
        animate={{
          background: [
            'linear-gradient(to top, #d97706, #ea580c)',
            'linear-gradient(to top, #f59e0b, #f97316)',
            'linear-gradient(to top, #d97706, #ea580c)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Stars in background */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            top: `${Math.random() * 50}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random() * 0.5 + 0.1
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ 
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      
      {/* Data point overlay for educational content */}
      {dataPoints.map((point, index) => (
        <motion.div
          key={index}
          className={`absolute ${point.x} ${point.y} z-20`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.3, duration: 0.5 }}
        >
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg border border-yellow-500/50 text-white text-xs shadow-glow">
              <div className="font-bold text-yellow-400 mb-1 flex items-center gap-1">
                <Info size={10} />
                {point.label}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-mono text-sm">{point.value}</span>
                <span className="text-yellow-300 text-xs">{point.unit}</span>
              </div>
              <div className="text-gray-300 text-xs mt-1 max-w-40">
                {point.info}
              </div>
            </div>
            <motion.div
              className="h-10 w-0.5 bg-yellow-500/70"
              initial={{ height: 0 }}
              animate={{ height: 10 }}
              transition={{ delay: 0.7 + index * 0.3, duration: 0.3 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-yellow-500 shadow-glow"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Sunspots */}
      <motion.div
        className="absolute bottom-8 left-1/4 w-16 h-16 bg-gray-800 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-12 right-1/3 w-12 h-12 bg-gray-700 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Magnetic field lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 100 200 Q 150 150 200 200 Q 250 250 300 200"
          stroke="#fbbf24"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M 400 250 Q 450 200 500 250 Q 550 300 600 250"
          stroke="#f59e0b"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
      </svg>

      {/* Solar flare eruption */}
      <motion.div
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2
        }}
      >
        <div className="relative">
          {/* Main flare */}
          <motion.div
            className="w-8 h-32 bg-gradient-to-t from-yellow-400 via-orange-500 to-red-600 rounded-t-full"
            animate={{
              scaleY: [1, 2, 1],
              scaleX: [1, 1.5, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Energy particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + i * 6}%`,
                bottom: '20%'
              }}
              animate={{
                y: [-20, -100, -200],
                x: [0, Math.sin(i) * 30, Math.sin(i) * 60],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                repeatDelay: 1
              }}
            />
          ))}

          {/* Plasma loops */}
          <motion.div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-12 border-2 border-orange-400 rounded-t-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Coronal mass ejection */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 rounded-full bg-gradient-to-tr from-orange-400 to-red-600"
        animate={{
          scale: [1, 3, 1],
          opacity: [0.8, 0.3, 0.8],
          x: [0, 200, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 3
        }}
      />

      {/* Solar wind particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`wind-${i}`}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`
          }}
          animate={{
            x: [0, 400],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Sun formation timeline indicator */}
      <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-sm p-2 rounded-lg border border-yellow-500/30 text-white text-xs">
        <div className="font-bold text-yellow-400 mb-1">Solar Formation Timeline</div>
        <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 w-full" />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>4.6 Billion Years Ago</span>
          <span>Now</span>
        </div>
      </div>

      {/* Educational info box */}
      <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm p-2 rounded-lg border border-yellow-500/30 text-white text-xs max-w-xs">
        <div className="font-bold text-yellow-400 mb-1">Did You Know?</div>
        <p>
          The Sun is a G-type main-sequence star that makes up 99.86% of the mass in the solar system. It takes 8 minutes and 20 seconds for light from the Sun to reach Earth.
        </p>
      </div>
      
      {/* Temperature Scale */}
      <div className="absolute right-20 h-40 w-6 top-32 flex flex-col items-center">
        <div className="text-xs text-white bg-black/40 p-1 rounded mb-2 font-semibold">Temperature</div>
        <div className="h-full w-2 bg-gradient-to-b from-yellow-300 via-orange-500 to-red-700 rounded relative">
          <div className="absolute -left-14 top-0 text-xs text-yellow-300">Core: 15M°K</div>
          <div className="absolute -left-14 top-1/3 text-xs text-orange-400">Mid: 7M°K</div>
          <div className="absolute -left-14 top-2/3 text-xs text-orange-500">Surface: 5,778°K</div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-white/20">
        <div className="font-bold mb-1">Solar Features</div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Solar flare</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-800"></div>
            <span>Sunspot</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Surface (Photosphere)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Coronal Mass Ejection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarFormationAnimation;