import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, OrbitControls, Html, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from '../ErrorBoundary';
import FallbackVisualization from '../FallbackVisualization';
import earthTex from '@/assets/textures/earth.jpg';

interface SpaceStormSimulation3DProps {
  className?: string;
  intensity?: number;
}

// Earth with atmosphere
const Earth = ({ 
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.002
}: { 
  position?: [number, number, number],
  scale?: number,
  rotationSpeed?: number
}) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const earthTexture = useTexture(earthTex);
  
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed;
    }
    
    if (atmosphereRef.current) {
      const time = state.clock.getElapsedTime();
      // Subtle pulsing effect for atmosphere
      atmosphereRef.current.scale.set(
        1 + Math.sin(time * 0.5) * 0.02,
        1 + Math.sin(time * 0.5) * 0.02,
        1 + Math.sin(time * 0.5) * 0.02
      );
    }
  });
  
  return (
    <group position={position} scale={scale}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      
      <mesh ref={atmosphereRef} scale={1.05}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#4dc6ff" transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

// Solar particle
const SolarParticle = ({ 
  startPosition = [10, 0, 0],
  endPosition = [-10, 0, 0],
  color = '#ffaa00',
  speed = 0.05,
  size = 0.05,
  delay = 0
}: {
  startPosition?: [number, number, number],
  endPosition?: [number, number, number],
  color?: string,
  speed?: number,
  size?: number,
  delay?: number
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const [started, setStarted] = useState(false);
  
  useFrame((state) => {
    if (particleRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Delay start
      if (!started && time > delay) {
        setStarted(true);
      }
      
      if (started) {
        // Move along path
        particleRef.current.position.x -= speed;
        
        // Reset if reached end
        if (particleRef.current.position.x < endPosition[0]) {
          particleRef.current.position.set(...startPosition);
          
          // Add randomization for next path
          particleRef.current.position.y = startPosition[1] + (Math.random() * 2 - 1) * 3;
          particleRef.current.position.z = startPosition[2] + (Math.random() * 2 - 1) * 3;
        }
      }
    }
  });
  
  return (
    <mesh ref={particleRef} position={startPosition} visible={started}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

// Storm cloud particle system
const StormCloud = ({ 
  position = [0, 0, 0],
  scale = 1,
  color = '#ff5500', 
  intensity = 1
}: {
  position?: [number, number, number],
  scale?: number,
  color?: string,
  intensity?: number
}) => {
  const cloudRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cloudRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the cloud
      cloudRef.current.rotation.z = time * 0.1;
      
      // Subtle movement
      cloudRef.current.position.x = position[0] + Math.sin(time * 0.2) * 0.2;
      cloudRef.current.position.y = position[1] + Math.cos(time * 0.3) * 0.1;
    }
  });
  
  // Generate random particles for the cloud
  const particles = [];
  const particleCount = Math.floor(20 * intensity);
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 0.5 + Math.random() * 0.5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = (Math.random() * 2 - 1) * 0.3;
    
    particles.push(
      <mesh 
        key={i} 
        position={[x, y, z]}
        scale={0.1 + Math.random() * 0.2}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.4 + Math.random() * 0.6} 
        />
      </mesh>
    );
  }
  
  return (
    <group ref={cloudRef} position={position} scale={scale}>
      {particles}
    </group>
  );
};

// Interactive satellite
const Satellite = ({ 
  position = [3, 2, 0], 
  stormIntensity = 0,
  onHit = () => {}
}: {
  position?: [number, number, number],
  stormIntensity?: number,
  onHit?: () => void
}) => {
  const satelliteRef = useRef<THREE.Group>(null);
  const [isHit, setIsHit] = useState(false);
  const [hoverLabel, setHoverLabel] = useState(false);
  
  useFrame((state) => {
    if (satelliteRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Orbit movement
      const orbitRadius = 4;
      const orbitSpeed = 0.1;
      satelliteRef.current.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
      satelliteRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius;
      
      // Always face center
      satelliteRef.current.lookAt(0, 0, 0);
      
      // Simulate disruptions based on storm intensity
      if (stormIntensity > 0.6 && Math.random() < stormIntensity * 0.02 && !isHit) {
        setIsHit(true);
        onHit();
        
        // Reset after a while
        setTimeout(() => {
          setIsHit(false);
        }, 3000);
      }
    }
  });
  
  return (
    <group
      ref={satelliteRef}
      position={position}
      onPointerOver={() => setHoverLabel(true)}
      onPointerOut={() => setHoverLabel(false)}
    >
      {/* Satellite body */}
      <mesh>
        <boxGeometry args={[0.5, 0.2, 0.2]} />
        <meshStandardMaterial color={isHit ? "#ff0000" : "#dddddd"} />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[0, 0, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[1, 0.3]} />
        <meshStandardMaterial color="#2299ff" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh position={[0, 0, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[1, 0.3]} />
        <meshStandardMaterial color="#2299ff" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.01, 0.01, 0.4]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
      
      {/* Status light */}
      <pointLight color={isHit ? "#ff0000" : "#00ff00"} intensity={0.5} distance={1} />
      
      {/* Label */}
      {(hoverLabel || isHit) && (
        <Html position={[0, 0.5, 0]} center distanceFactor={8}>
          <div className="bg-black/80 backdrop-blur-md p-2 rounded-lg border border-gray-500 text-white text-xs shadow-lg w-40">
            <div className="font-bold text-blue-400 mb-1">
              Communication Satellite
            </div>
            <div className="text-gray-300 text-xs">
              {isHit 
                ? "⚠️ Systems disrupted by solar storm!"
                : "Status: Operational"
              }
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Main component with storm effects
const SpaceStormScene = ({ stormIntensity = 0.5, onSatelliteHit = () => {} }) => {
  // References for animation
  const stormRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  // Satellite hit counter
  const [satelliteHits, setSatelliteHits] = useState(0);
  
  const handleSatelliteHit = () => {
    setSatelliteHits(prev => prev + 1);
    onSatelliteHit();
  };
  
  return (
    <group>
      {/* Earth */}
      <Earth position={[0, 0, 0]} scale={1.2} />
      
      {/* Satellites */}
      <Satellite stormIntensity={stormIntensity} onHit={handleSatelliteHit} />
      <Satellite 
        position={[-2, -3, 1]} 
        stormIntensity={stormIntensity}
        onHit={handleSatelliteHit}
      />
      
      {/* Storm visualization */}
      <group ref={stormRef}>
        {/* Storm intensity visualization */}
        {stormIntensity > 0.3 && (
          <>
            <StormCloud 
              position={[4, 0, 0]} 
              color="#ff7700" 
              scale={1 + stormIntensity} 
              intensity={stormIntensity}
            />
            <StormCloud 
              position={[5, 2, 1]} 
              color="#ffaa00" 
              scale={0.8 + stormIntensity * 0.8} 
              intensity={stormIntensity}
            />
            <StormCloud 
              position={[6, -1, -1]} 
              color="#ff5500" 
              scale={0.7 + stormIntensity * 1.2} 
              intensity={stormIntensity}
            />
          </>
        )}
      </group>
      
      {/* Particle stream */}
      <group ref={particlesRef}>
        {Array.from({ length: Math.floor(30 * stormIntensity) }).map((_, i) => (
          <SolarParticle 
            key={i}
            startPosition={[
              15, 
              (Math.random() * 2 - 1) * 6, 
              (Math.random() * 2 - 1) * 6
            ]}
            endPosition={[-15, 0, 0]}
            color={i % 3 === 0 ? '#ff5500' : '#ffaa00'}
            speed={0.1 + Math.random() * 0.1 * stormIntensity}
            size={0.05 + Math.random() * 0.05}
            delay={i * 0.2}
          />
        ))}
      </group>
      
      {/* Storm intensity meter */}
      <Html position={[0, 4, 0]} center distanceFactor={10}>
        <div className="bg-black/80 backdrop-blur-md p-2 rounded-lg border border-orange-500/50 text-white text-xs shadow-lg w-48">
          <div className="font-bold text-orange-400 mb-1">Solar Storm Intensity</div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              style={{ width: `${stormIntensity * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Calm</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
          
          <div className="mt-2 text-center text-xs">
            <span className="text-red-400 font-bold">{satelliteHits}</span>
            <span className="text-gray-400"> satellite disruptions</span>
          </div>
        </div>
      </Html>
      
      {/* Educational overlay */}
      <Html position={[-4, -3, 0]} distanceFactor={10}>
        <div className="bg-black/80 backdrop-blur-md p-2 rounded-lg border border-blue-500/50 text-white text-xs shadow-lg max-w-[200px]">
          <div className="font-bold text-blue-400 mb-1">Solar Storm Effects</div>
          <p className="text-gray-300 text-xs">
            Solar storms can disrupt satellite communications, GPS systems, and even power grids on Earth. The particles travel at over 1 million miles per hour!
          </p>
        </div>
      </Html>
    </group>
  );
};

// Main exported component
const SpaceStormSimulation3D: React.FC<SpaceStormSimulation3DProps> = ({ 
  className = '',
  intensity = 0.7
}) => {
  const [stormIntensity, setStormIntensity] = useState(intensity);
  const [satelliteHits, setSatelliteHits] = useState(0);
  
  // Simulate fluctuating storm intensity
  useEffect(() => {
    const intervalId = setInterval(() => {
      setStormIntensity(prev => {
        // Random fluctuation but stay within bounds
        const change = (Math.random() * 0.2 - 0.1);
        return Math.max(0.1, Math.min(1, prev + change));
      });
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleSatelliteHit = () => {
    setSatelliteHits(prev => prev + 1);
  };
  
  return (
    <div className={`relative w-full h-96 ${className}`}>
      <ErrorBoundary fallback={
        <div className="w-full h-96">
          <FallbackVisualization 
            title="Solar Storm Visualization" 
            description="Interactive solar storm simulation showing effects on Earth and satellites"
            color="space"
          />
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <color attach="background" args={['#000510']} />
          <ambientLight intensity={0.3} />
          <pointLight position={[15, 5, 5]} intensity={1.5} color="#ff9900" />
          <pointLight position={[-15, -5, -5]} intensity={0.5} color="#0066ff" />
          
          {/* Stars background */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Interactive scene */}
        <SpaceStormScene 
          stormIntensity={stormIntensity} 
          onSatelliteHit={handleSatelliteHit} 
        />
        
        {/* Camera controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.3}
        />
        
        {/* Post-processing effects removed to fix error */}
      </Canvas>
      </ErrorBoundary>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm p-2 rounded-lg border border-orange-500/30">
        <div className="text-white text-xs font-semibold mb-2">Storm Intensity Control</div>
        <input 
          type="range" 
          min="0.1" 
          max="1" 
          step="0.05" 
          value={stormIntensity}
          onChange={e => setStormIntensity(parseFloat(e.target.value))}
          className="w-40 accent-orange-500"
        />
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-white/20">
        <div className="font-bold mb-1">Storm Features</div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Solar particles</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>Earth's atmosphere</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span>Satellites</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceStormSimulation3D;