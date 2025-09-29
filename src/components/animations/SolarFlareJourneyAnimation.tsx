import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Timer, Zap, Gauge } from 'lucide-react';

interface SolarFlareJourneyAnimationProps {
  className?: string;
}

// Data point for the journey animation
interface JourneyDataPoint {
  x: string;
  y: string;
  label: string;
  value: string;
  unit: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SolarFlareJourneyAnimation: React.FC<SolarFlareJourneyAnimationProps> = ({ className = '' }) => {
  // Educational data points for the solar flare journey
  const journeyData: JourneyDataPoint[] = [
    {
      x: "left-10",
      y: "top-6",
      label: "Solar Flare Speed",
      value: "400-1,200",
      unit: "km/s",
      description: "Varies based on flare class and solar conditions",
      icon: <Gauge size={14} />,
      color: "yellow"
    },
    {
      x: "right-10",
      y: "top-6",
      label: "Journey Time to Earth",
      value: "8-96",
      unit: "hours",
      description: "Depends on flare speed and solar wind conditions",
      icon: <Clock size={14} />,
      color: "blue"
    },
    {
      x: "right-10",
      y: "bottom-20",
      label: "Energy Released",
      value: "10²²-10²⁵",
      unit: "joules",
      description: "Equivalent to millions of 100-megaton hydrogen bombs",
      icon: <Zap size={14} />,
      color: "orange"
    },
    {
      x: "left-10",
      y: "bottom-20",
      label: "Travel Distance",
      value: "~150",
      unit: "million km",
      description: "Average distance from Sun to Earth",
      icon: <Timer size={14} />,
      color: "purple"
    }
  ];

  return (
    <div className={`relative w-full h-96 bg-gradient-to-r from-black via-purple-900 to-black overflow-hidden ${className}`}>
      {/* Stars background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Sun (starting point) */}
      <motion.div
        className="absolute left-10 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-gradient-radial from-yellow-400 to-orange-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 20px rgba(251, 191, 36, 0.5)',
            '0 0 40px rgba(251, 191, 36, 0.8)',
            '0 0 20px rgba(251, 191, 36, 0.5)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Solar flare particles journey */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          style={{
            left: '15%',
            top: '50%'
          }}
          animate={{
            x: [0, 600],
            y: [0, Math.sin(i * 0.5) * 100],
            scale: [1, 0.5, 1],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Solar wind stream */}
      <motion.div
        className="absolute left-20 top-1/2 transform -translate-y-1/2 w-64 h-2 bg-gradient-to-r from-yellow-400/50 to-transparent"
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Magnetic field lines affecting the path */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 200 150 Q 300 100 400 150 Q 500 200 600 150"
          stroke="#60a5fa"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path
          d="M 200 250 Q 300 300 400 250 Q 500 200 600 250"
          stroke="#3b82f6"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </svg>

      {/* Earth's magnetic field (destination) */}
      <motion.div
        className="absolute right-20 top-1/2 transform -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Earth */}
        <div className="relative">
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-blue-400 to-green-500 rounded-full"
            animate={{
              boxShadow: [
                '0 0 20px rgba(59, 130, 246, 0.3)',
                '0 0 40px rgba(59, 130, 246, 0.6)',
                '0 0 20px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Magnetic field visualization */}
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-2 border border-cyan-300 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Aurora effect when particles reach Earth */}
      <motion.div
        className="absolute right-10 top-1/4 w-32 h-32"
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0.5, 1.5, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1
        }}
      >
        <div className="w-full h-full bg-gradient-radial from-green-400/50 to-transparent rounded-full" />
      </motion.div>

      {/* Educational Data Points */}
      {journeyData.map((point, index) => (
        <motion.div
          key={index}
          className={`absolute ${point.x} ${point.y} z-20`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.3, duration: 0.5 }}
        >
          <motion.div 
            className="group relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`bg-black/80 backdrop-blur-md p-2 rounded-lg border border-${point.color}-500/50 text-white text-xs shadow-glow max-w-48`}>
              <div className={`flex items-center gap-1 font-bold text-${point.color}-400 text-sm mb-1`}>
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
                <span className={`text-${point.color}-300 text-xs`}>{point.unit}</span>
              </div>
              <p className="text-gray-300 text-xs">{point.description}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Journey Progress Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 flex flex-col items-center">
        <div className="w-full h-2 bg-gray-800/60 rounded-full overflow-hidden mb-1 backdrop-blur-sm">
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        <div className="flex justify-between w-full px-2 text-xs text-gray-300">
          <span>Sun</span>
          <span>Mercury</span>
          <span>Venus</span>
          <span>Earth</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-16 right-3 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-white/20">
        <div className="font-bold mb-1">Journey Elements</div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Solar flare particles</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Earth impact</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span>Magnetic field</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarFlareJourneyAnimation;