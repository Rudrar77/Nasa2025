import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from '../ErrorBoundary';
import FallbackVisualization from '../FallbackVisualization';

interface SolarFlareJourney3DProps {
  className?: string;
}

// Simple Solar System with Flare Journey
const SolarSystem = () => {
  // References for animation
  const sunRef = useRef<THREE.Mesh>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Load textures
  const sunTexture = useTexture('/textures/sun.jpg');
  const earthTexture = useTexture('/textures/earth.jpg');
  const mercuryTexture = useTexture('/textures/mercury.jpg');
  const venusTexture = useTexture('/textures/venus.jpg');
  
  // Rotate planets
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.05;
    }
    
    if (earthRef.current) {
      // Rotate Earth around the sun
      earthRef.current.position.x = Math.sin(time * 0.2) * 8;
      earthRef.current.position.z = Math.cos(time * 0.2) * 8;
      
      // Rotate Earth on its axis
      earthRef.current.rotation.y = time * 0.5;
    }
  });
  
  // Solar flare particles (simplified)
  const SolarFlareParticle = ({ 
    startDelay = 0,
    startAngle = 0,
    speed = 0.1,
  }: { 
    startDelay?: number, 
    startAngle?: number,
    speed?: number,
  }) => {
    const particleRef = useRef<THREE.Mesh>(null);
    const startPos: [number, number, number] = [
      Math.sin(startAngle) * 2.5, 
      Math.random() * 0.5, 
      Math.cos(startAngle) * 2.5
    ];
    
    // Target is Earth's approx position
    const targetPos: [number, number, number] = [8, 0, 0];
    
    useFrame((state) => {
      if (particleRef.current) {
        const time = state.clock.getElapsedTime() - startDelay;
        
        if (time > 0) {
          // Interpolate position toward Earth, following a curved path
          const progress = Math.min(time * speed, 1);
          const yOffset = Math.sin(progress * Math.PI) * 1; // Arc height
          
          particleRef.current.position.x = startPos[0] + (targetPos[0] - startPos[0]) * progress;
          particleRef.current.position.y = startPos[1] + yOffset;
          particleRef.current.position.z = startPos[2] + (targetPos[2] - startPos[2]) * progress;
          
          // If reached Earth, reset
          if (progress >= 1) {
            particleRef.current.position.set(startPos[0], startPos[1], startPos[2]);
          }
        }
      }
    });
    
    return (
      <mesh ref={particleRef} position={startPos}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#ffaa00" />
      </mesh>
    );
  };
  
  return (
    <group>
      {/* Sun */}
      <mesh ref={sunRef} position={[-10, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          map={sunTexture}
          emissive="#ff5500"
          emissiveIntensity={1}
        />
        <pointLight color="#ff7700" intensity={1} distance={20} />
      </mesh>
      
      {/* Planets */}
      <mesh ref={earthRef} position={[8, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      
      {/* Solar flare particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <SolarFlareParticle 
          key={`flare-${i}`} 
          startDelay={i * 0.3} 
          startAngle={Math.PI * 2 * Math.random()} 
          speed={0.05 + Math.random() * 0.05}
        />
      ))}
    </group>
  );
};

// Main component
const SolarFlareJourney3D: React.FC<SolarFlareJourney3DProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-96 ${className}`}>
      <ErrorBoundary fallback={
        <div className="w-full h-96">
          <FallbackVisualization 
            title="Solar Flare Journey" 
            description="Visualization of a solar flare's journey from the Sun to Earth"
            color="sun"
          />
        </div>
      }>
      <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
        <color attach="background" args={['#000510']} />
        <ambientLight intensity={0.2} />
        
        {/* Stars background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Solar system with flare journey */}
        <SolarSystem />
      </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default SolarFlareJourney3D;
