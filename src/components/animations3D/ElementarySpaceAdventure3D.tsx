import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box } from '@react-three/drei';
import { TextureLoader } from 'three';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Simple planet component for elementary students
const SimplePlanet = ({ position, color, size, name, emoji }: {
  position: [number, number, number];
  color: string;
  size: number;
  name: string;
  emoji: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? size * 1.2 : size}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, -2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {emoji} {name}
      </Text>
    </group>
  );
};

// Animated Sun for elementary students
const AnimatedSun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [pulse, setPulse] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      setPulse(Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} scale={pulse}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.3} />
      </mesh>
      <Text
        position={[0, -3, 0]}
        fontSize={0.8}
        color="yellow"
        anchorX="center"
        anchorY="middle"
      >
        ☀️ The Sun
      </Text>
    </group>
  );
};

// Simple rocket ship
const RocketShip = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Box args={[0.2, 0.8, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FF6B6B" />
      </Box>
      <Box args={[0.1, 0.3, 0.1]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="#4ECDC4" />
      </Box>
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        🚀
      </Text>
    </group>
  );
};

// Stars background
const Stars = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [points] = useState(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} color="white" />
    </points>
  );
};

const ElementarySpaceAdventure3D: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const planets = [
    { name: 'Mercury', color: '#8C7853', position: [8, 0, 0] as [number, number, number], emoji: '☿️' },
    { name: 'Venus', color: '#FFC649', position: [12, 0, 0] as [number, number, number], emoji: '♀️' },
    { name: 'Earth', color: '#6B93D6', position: [16, 0, 0] as [number, number, number], emoji: '🌍' },
    { name: 'Mars', color: '#C1440E', position: [20, 0, 0] as [number, number, number], emoji: '♂️' },
    { name: 'Jupiter', color: '#D8CA9D', position: [28, 0, 0] as [number, number, number], emoji: '♃' },
    { name: 'Saturn', color: '#FAD5A5', position: [36, 0, 0] as [number, number, number], emoji: '♄' },
  ];

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 30], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#FFD700" />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <Stars />
        <AnimatedSun />
        <RocketShip position={[0, 2, 5]} />
        
        {planets.map((planet, index) => (
          <SimplePlanet
            key={planet.name}
            position={planet.position}
            color={planet.color}
            size={0.8}
            name={planet.name}
            emoji={planet.emoji}
          />
        ))}
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
        />
      </Canvas>
      
      {/* Interactive Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-4 text-white">
        <h3 className="text-lg font-bold mb-2">🌟 Fun Space Facts! 🌟</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>☀️ The Sun:</strong> Our star that gives us light and heat!
          </div>
          <div>
            <strong>🌍 Earth:</strong> Our home planet with water and life!
          </div>
          <div>
            <strong>🚀 Rockets:</strong> Help us explore space!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementarySpaceAdventure3D;
