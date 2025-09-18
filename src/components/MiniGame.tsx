import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Shield, Zap, Target, RotateCcw } from 'lucide-react';

interface SatelliteDefenseProps {
  onComplete: (score: number) => void;
  className?: string;
}

interface Satellite {
  id: string;
  x: number;
  y: number;
  shielded: boolean;
  hit: boolean;
}

interface SolarParticle {
  id: string;
  x: number;
  y: number;
  speed: number;
  angle: number;
}

const SatelliteDefense = ({ onComplete, className = '' }: SatelliteDefenseProps) => {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [particles, setParticles] = useState<SolarParticle[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Initialize satellites
  useEffect(() => {
    const initSatellites: Satellite[] = [];
    for (let i = 0; i < 6; i++) {
      initSatellites.push({
        id: `sat-${i}`,
        x: 20 + (i * 12) % 60,
        y: 20 + Math.floor(i / 3) * 40,
        shielded: false,
        hit: false,
      });
    }
    setSatellites(initSatellites);
  }, []);

  // Game timer
  useEffect(() => {
    if (!gameStarted || gameEnded) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameEnded(true);
          onComplete(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameEnded, score, onComplete]);

  // Generate solar particles
  useEffect(() => {
    if (!gameStarted || gameEnded) return;

    const particleInterval = setInterval(() => {
      const newParticle: SolarParticle = {
        id: `particle-${Date.now()}`,
        x: Math.random() * 100,
        y: -5,
        speed: 0.5 + Math.random() * 1,
        angle: (Math.random() - 0.5) * 0.2,
      };
      setParticles(prev => [...prev, newParticle]);
    }, 1000);

    return () => clearInterval(particleInterval);
  }, [gameStarted, gameEnded]);

  // Move particles and check collisions
  useEffect(() => {
    if (!gameStarted || gameEnded) return;

    const moveInterval = setInterval(() => {
      setParticles(prev => {
        return prev
          .map(particle => ({
            ...particle,
            y: particle.y + particle.speed,
            x: particle.x + particle.angle,
          }))
          .filter(particle => particle.y < 105);
      });

      // Check collisions
      setParticles(prevParticles => {
        const remainingParticles = [...prevParticles];
        
        setSatellites(prevSatellites => {
          return prevSatellites.map(satellite => {
            if (satellite.hit) return satellite;

            const collision = remainingParticles.find(particle => {
              const dx = Math.abs(particle.x - satellite.x);
              const dy = Math.abs(particle.y - satellite.y);
              return dx < 5 && dy < 5;
            });

            if (collision) {
              // Remove the particle
              const particleIndex = remainingParticles.findIndex(p => p.id === collision.id);
              if (particleIndex > -1) {
                remainingParticles.splice(particleIndex, 1);
              }

              if (satellite.shielded) {
                // Protected satellite - gain points
                setScore(prev => prev + 10);
                return { ...satellite, shielded: false };
              } else {
                // Unprotected satellite - lose points
                setScore(prev => Math.max(0, prev - 5));
                return { ...satellite, hit: true };
              }
            }

            return satellite;
          });
        });

        return remainingParticles;
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameStarted, gameEnded]);

  const toggleSatelliteShield = useCallback((satelliteId: string) => {
    if (!gameStarted || gameEnded) return;

    setSatellites(prev => prev.map(sat => 
      sat.id === satelliteId && !sat.hit 
        ? { ...sat, shielded: !sat.shielded }
        : sat
    ));
  }, [gameStarted, gameEnded]);

  const resetGame = () => {
    setSatellites(prev => prev.map(sat => ({ ...sat, shielded: false, hit: false })));
    setParticles([]);
    setScore(0);
    setTimeLeft(30);
    setGameStarted(false);
    setGameEnded(false);
  };

  return (
    <div className={`relative bg-gradient-space rounded-xl p-6 border border-border ${className}`}>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-bold bg-gradient-solar bg-clip-text text-transparent">
          Satellite Defense
        </h3>
        <div className="flex gap-4 text-sm">
          <span className="text-primary">Score: {score}</span>
          <span className="text-secondary">Time: {timeLeft}s</span>
        </div>
      </div>

      {/* Game Instructions */}
      {!gameStarted && !gameEnded && (
        <div className="text-center mb-6">
          <p className="text-muted-foreground mb-4">
            Protect the satellites from solar particles! Click satellites to activate their shields.
            Shielded satellites give +10 points, unshielded ones lose -5 points when hit.
          </p>
          <Button onClick={() => setGameStarted(true)} className="bg-gradient-solar">
            <Target className="w-4 h-4 mr-2" />
            Start Game
          </Button>
        </div>
      )}

      {/* Game Area */}
      {(gameStarted || gameEnded) && (
        <div className="relative w-full h-80 bg-gradient-cosmic rounded-lg overflow-hidden border border-border">
          {/* Stars background */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Satellites */}
          {satellites.map((satellite) => (
            <motion.button
              key={satellite.id}
              className={`absolute w-8 h-8 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                satellite.hit 
                  ? 'bg-red-500 border-red-400 opacity-50' 
                  : satellite.shielded 
                    ? 'bg-blue-500 border-blue-300 shadow-aurora' 
                    : 'bg-gray-600 border-gray-400'
              }`}
              style={{
                left: `${satellite.x}%`,
                top: `${satellite.y}%`,
              }}
              onClick={() => toggleSatelliteShield(satellite.id)}
              whileHover={{ scale: satellite.hit ? 1 : 1.1 }}
              whileTap={{ scale: satellite.hit ? 1 : 0.9 }}
            >
              {satellite.shielded && (
                <Shield className="w-4 h-4 text-white" />
              )}
              {satellite.hit && (
                <Zap className="w-4 h-4 text-white" />
              )}
            </motion.button>
          ))}

          {/* Solar Particles */}
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-primary rounded-full shadow-solar"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Game End Screen */}
      {gameEnded && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4"
        >
          <h4 className="text-lg font-semibold mb-2">Game Complete!</h4>
          <p className="text-muted-foreground mb-4">Final Score: {score}</p>
          <div className="flex gap-2 justify-center">
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SatelliteDefense;