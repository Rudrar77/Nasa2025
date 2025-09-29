import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Zap, Star, Heart } from 'lucide-react';
import { useGamification } from './GamificationSystem';

interface GameObject {
  id: string;
  x: number;
  y: number;
  speed: number;
  type: 'flare' | 'shield';
}

interface GameState {
  score: number;
  lives: number;
  gameObjects: GameObject[];
  isPlaying: boolean;
  level: number;
  gameOver: boolean;
  isPaused: boolean;
  lastHitTime: number;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const SHIELD_SIZE = 60;
const FLARE_SIZE = 40;
const BASE_SPAWN_INTERVAL = 1000;
const MIN_SPAWN_INTERVAL = 500;

// Game configuration
const INITIAL_STATE: GameState = {
  score: 0,
  lives: 3,
  gameObjects: [],
  isPlaying: false,
  level: 1,
  gameOver: false,
  isPaused: false,
  lastHitTime: 0
};

const SolarFlareGame = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('solarFlareHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const gameLoopRef = useRef<number>();
  const lastSpawnRef = useRef(Date.now());
  const shieldRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 100 });
  const { updateProgress } = useGamification();

  const spawnFlare = useCallback(() => {
    const now = Date.now();
    const spawnInterval = Math.max(
      MIN_SPAWN_INTERVAL,
      BASE_SPAWN_INTERVAL - (gameState.level - 1) * 100
    );
    
    if (now - lastSpawnRef.current > spawnInterval) {
      const newFlare: GameObject = {
        id: Math.random().toString(),
        x: Math.random() * (GAME_WIDTH - FLARE_SIZE),
        y: -FLARE_SIZE,
        speed: 2 + Math.random() * 3 * gameState.level,
        type: 'flare',
      };

      setGameState(prev => ({
        ...prev,
        gameObjects: [...prev.gameObjects, newFlare],
      }));

      lastSpawnRef.current = now;
    }
  }, [gameState.level]);

  const PAUSE_DURATION = 1500; // 1.5 seconds pause when hit

  const updateGameObjects = useCallback(() => {
    setGameState(prev => {
      if (!prev.isPlaying || prev.gameOver) return prev;
      
      // Check if we should unpause
      if (prev.isPaused && Date.now() - prev.lastHitTime > PAUSE_DURATION) {
        return { ...prev, isPaused: false };
      }
      
      // Don't update objects if game is paused
      if (prev.isPaused) return prev;

      let scoreIncrease = 0;
      let livesDecrease = 0;
      let shouldPause = false;
      let shouldEndGame = false;
      
      const updatedObjects = prev.gameObjects
        .map(obj => {
          if (obj.type === 'flare') {
            const newY = obj.y + obj.speed;
            
            // Check collision with shield (this is GOOD - blocks the flare)
            if (shieldRef.current) {
              const shieldRect = shieldRef.current.getBoundingClientRect();
              const gameContainer = shieldRef.current.closest('.relative');
              if (gameContainer) {
                const gameRect = gameContainer.getBoundingClientRect();
                const relativeShieldPos = {
                  left: shieldRect.left - gameRect.left,
                  right: shieldRect.right - gameRect.left,
                  top: shieldRect.top - gameRect.top,
                  bottom: shieldRect.bottom - gameRect.top,
                };

                const flareRect = {
                  left: obj.x,
                  right: obj.x + FLARE_SIZE,
                  top: newY,
                  bottom: newY + FLARE_SIZE,
                };

                if (
                  flareRect.left < relativeShieldPos.right &&
                  flareRect.right > relativeShieldPos.left &&
                  flareRect.top < relativeShieldPos.bottom &&
                  flareRect.bottom > relativeShieldPos.top
                ) {
                  // Shield hit - this is GOOD! Increase score and remove flare
                  scoreIncrease += 1;
                  return null; // Remove the flare
                }
              }
            }

            // Check if flare reached Earth (bottom) - this is BAD
            if (newY > GAME_HEIGHT) {
              livesDecrease += 1;
              if (prev.lives - livesDecrease <= 0) {
                shouldEndGame = true;
              } else {
                shouldPause = true;
              }
              return null; // Remove the flare
            }

            return { ...obj, y: newY };
          }
          return obj;
        })
        .filter(Boolean) as GameObject[];

      // Update score and level
      const newScore = prev.score + scoreIncrease;
      const newLevel = Math.floor(newScore / 10) + 1;
      const newLives = prev.lives - livesDecrease;

      // Track progress for achievements
      if (scoreIncrease > 0) {
        updateProgress('interaction');
      }

      // Handle game over
      if (shouldEndGame || newLives <= 0) {
        const finalScore = newScore;
        const newHighScore = Math.max(highScore, finalScore);
        if (newHighScore > highScore) {
          setHighScore(newHighScore);
          localStorage.setItem('solarFlareHighScore', newHighScore.toString());
          
          // Unlock achievement if score is high enough
          if (newHighScore >= 20) {
            updateProgress('flare_learned', 1);
          }
        }
        return {
          ...prev,
          gameObjects: updatedObjects,
          score: finalScore,
          level: newLevel,
          lives: 0,
          isPlaying: false,
          gameOver: true,
          isPaused: false,
        };
      }

      // Return updated state (no direct mutations)
      return {
        ...prev,
        gameObjects: updatedObjects,
        score: newScore,
        level: newLevel,
        lives: newLives,
        isPaused: shouldPause,
        lastHitTime: shouldPause ? Date.now() : prev.lastHitTime,
      };
    });
  }, [highScore]);

  const gameLoop = () => {
    spawnFlare();
    updateGameObjects();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const startGame = useCallback(() => {
    // Reset game state
    setGameState({
      ...INITIAL_STATE,
      isPlaying: true,
      gameOver: false,
    });
    
    // Reset references
    lastSpawnRef.current = Date.now();
    
    // Clear any existing game loop
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    
    // Track game start for achievements
    updateProgress('interaction');
    
    // Start new game loop
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - SHIELD_SIZE / 2, GAME_WIDTH - SHIELD_SIZE));
    const y = Math.max(0, Math.min(e.clientY - rect.top - SHIELD_SIZE / 2, GAME_HEIGHT - SHIELD_SIZE));
    setMousePosition({ x, y });
  };

  // Handle touch events for mobile play
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent scrolling while playing
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const x = Math.max(0, Math.min(touch.clientX - rect.left - SHIELD_SIZE / 2, GAME_WIDTH - SHIELD_SIZE));
      const y = Math.max(0, Math.min(touch.clientY - rect.top - SHIELD_SIZE / 2, GAME_HEIGHT - SHIELD_SIZE));
      setMousePosition({ x, y });
    }
  };

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  // Handle responsive game sizing
  const [gameSize, setGameSize] = useState({ width: GAME_WIDTH, height: GAME_HEIGHT });
  
  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.solar-game-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        if (rect.width < GAME_WIDTH) {
          const aspectRatio = GAME_HEIGHT / GAME_WIDTH;
          setGameSize({
            width: rect.width,
            height: rect.width * aspectRatio
          });
        } else {
          setGameSize({ width: GAME_WIDTH, height: GAME_HEIGHT });
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Score: {gameState.score}
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Lives: {gameState.lives}
          </Badge>
          <Badge variant="default" className="text-lg px-4 py-2">
            Level: {gameState.level}
          </Badge>
        </div>
        {highScore > 0 && (
          <Badge variant="secondary" className="text-lg px-4 py-2">
            High Score: {highScore}
          </Badge>
        )}
      </div>

      <div
        className="relative bg-gradient-to-b from-background/50 to-background/80 backdrop-blur-sm rounded-xl border border-border overflow-hidden solar-game-container"
        style={{ width: '100%', maxWidth: GAME_WIDTH, height: gameSize.height, margin: '0 auto' }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchMove}
      >
        {gameState.isPaused && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 backdrop-blur-sm z-50">
            <div className="text-2xl font-bold text-white animate-pulse">
              Solar Flare Hit!
            </div>
          </div>
        )}
        {!gameState.isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="p-8 text-center space-y-6 bg-black/40 border-none">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Solar Flare Defense</h2>
                <p className="text-gray-200">
                  Protect Earth from incoming solar flares! Move the shield with your mouse to block them. 
                  Let flares hit Earth and you lose lives!
                </p>
              </div>
              <Button 
                onClick={startGame} 
                className="w-full text-lg py-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition-all duration-200 transform hover:scale-105"
                size="lg"
              >
                {gameState.score > 0 ? 'Play Again' : 'Start Game'}
              </Button>
            </Card>
          </div>
        )}

        {/* Shield - only show when game is playing */}
        {gameState.isPlaying && (
          <motion.div
            ref={shieldRef}
            className="absolute bg-blue-500/50 rounded-full border-2 border-blue-400"
            style={{
              width: SHIELD_SIZE,
              height: SHIELD_SIZE,
              x: mousePosition.x,
              y: mousePosition.y,
              filter: 'drop-shadow(0 0 10px #60a5fa)',
            }}
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{ type: 'spring', damping: 20 }}
          />
        )}

        {/* Solar Flares */}
        <AnimatePresence>
          {gameState.gameObjects.map((obj) => (
            <motion.div
              key={obj.id}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: obj.x,
                y: obj.y,
              }}
              exit={{ opacity: 0, scale: 0 }}
            >
              {obj.type === 'flare' && (
                <div
                  className="relative"
                  style={{ width: FLARE_SIZE, height: FLARE_SIZE }}
                >
                  <Zap
                    className="w-full h-full text-orange-500"
                    style={{
                      filter: 'drop-shadow(0 0 5px #f97316)',
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">How to Play</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Move your mouse to control the magnetic shield</li>
          <li>• Block incoming solar flares to protect Earth</li>
          <li>• Each blocked flare increases your score</li>
          <li>• If flares reach Earth (miss the shield), you lose lives</li>
          <li>• Losing all 3 lives ends the game</li>
          <li>• The game gets harder as your score increases</li>
        </ul>
      </Card>
    </div>
  );
};

export default SolarFlareGame;
