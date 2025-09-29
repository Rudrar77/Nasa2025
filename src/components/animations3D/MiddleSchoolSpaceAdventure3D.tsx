import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Line } from '@react-three/drei';
import { TextureLoader } from 'three';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Planet with more detail for middle school students
const DetailedPlanet = ({ 
  position, 
  color, 
  size, 
  name, 
  emoji, 
  facts, 
  onSelect 
}: {
  position: [number, number, number];
  color: string;
  size: number;
  name: string;
  emoji: string;
  facts: string[];
  onSelect: (planet: string) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const handleClick = () => {
    setSelected(!selected);
    onSelect(selected ? '' : name);
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        scale={hovered ? size * 1.3 : size}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={selected ? color : '#000000'}
          emissiveIntensity={selected ? 0.2 : 0}
        />
      </mesh>
      
      {/* Orbit line */}
      <Line
        points={[
          [position[0] - 1, position[1], position[2]],
          [position[0] + 1, position[1], position[2]]
        ]}
        color="white"
        opacity={0.3}
        transparent
      />
      
      <Text
        position={[0, -2, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {emoji} {name}
      </Text>
    </group>
  );
};

// Enhanced Sun with solar flares
const SolarFlareSun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [pulse, setPulse] = useState(0);
  const [flares, setFlares] = useState<Array<{ id: number; angle: number; intensity: number }>>([]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      setPulse(Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1);
      
      // Generate random solar flares
      if (Math.random() < 0.02) {
        setFlares(prev => [...prev.slice(-5), {
          id: Date.now(),
          angle: Math.random() * Math.PI * 2,
          intensity: Math.random() * 0.5 + 0.5
        }]);
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} scale={pulse}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Solar flares */}
      {flares.map((flare) => (
        <mesh
          key={flare.id}
          position={[
            Math.cos(flare.angle) * 2.5,
            Math.sin(flare.angle) * 2.5,
            0
          ]}
          rotation={[0, 0, flare.angle]}
        >
          <coneGeometry args={[0.1, flare.intensity, 8]} />
          <meshStandardMaterial color="#FF4500" emissive="#FF0000" emissiveIntensity={0.5} />
        </mesh>
      ))}
      
      <Text
        position={[0, -3, 0]}
        fontSize={0.6}
        color="yellow"
        anchorX="center"
        anchorY="middle"
      >
        ☀️ The Sun - Our Star
      </Text>
    </group>
  );
};

// Solar wind particles
const SolarWind = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const positions = new Float32Array(500 * 3);
    const velocities = new Float32Array(500 * 3);
    
    for (let i = 0; i < 500; i++) {
      // Start particles near the sun
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      
      // Random velocities outward from sun
      velocities[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return { positions, velocities };
  });

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < 500; i++) {
        positions[i * 3] += particles.velocities[i * 3];
        positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
        positions[i * 3 + 2] += particles.velocities[i * 3 + 2];
        
        // Reset particles that are too far
        if (Math.abs(positions[i * 3]) > 50) {
          positions[i * 3] = (Math.random() - 0.5) * 4;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.2} color="#00BFFF" />
    </points>
  );
};

// Spacecraft
const Spacecraft = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main body */}
      <Box args={[0.3, 0.6, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#C0C0C0" />
      </Box>
      {/* Nose cone */}
      <Box args={[0.2, 0.3, 0.2]} position={[0, 0.45, 0]}>
        <meshStandardMaterial color="#FF6B6B" />
      </Box>
      {/* Solar panels */}
      <Box args={[0.8, 0.1, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#000080" />
      </Box>
      <Text
        position={[0, -1, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        🛰️
      </Text>
    </group>
  );
};

const MiddleSchoolSpaceAdventure3D: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string>('');
  const [showInfo, setShowInfo] = useState(false);

  const planets = [
    { 
      name: 'Mercury', 
      color: '#8C7853', 
      position: [8, 0, 0] as [number, number, number], 
      emoji: '☿️',
      facts: ['Closest to the Sun', 'No atmosphere', 'Extreme temperatures']
    },
    { 
      name: 'Venus', 
      color: '#FFC649', 
      position: [12, 0, 0] as [number, number, number], 
      emoji: '♀️',
      facts: ['Hottest planet', 'Thick atmosphere', 'Retrograde rotation']
    },
    { 
      name: 'Earth', 
      color: '#6B93D6', 
      position: [16, 0, 0] as [number, number, number], 
      emoji: '🌍',
      facts: ['Only planet with life', '71% water', 'Protective atmosphere']
    },
    { 
      name: 'Mars', 
      color: '#C1440E', 
      position: [20, 0, 0] as [number, number, number], 
      emoji: '♂️',
      facts: ['Red planet', 'Two moons', 'Possible past water']
    },
    { 
      name: 'Jupiter', 
      color: '#D8CA9D', 
      position: [28, 0, 0] as [number, number, number], 
      emoji: '♃',
      facts: ['Largest planet', 'Gas giant', 'Great Red Spot']
    },
    { 
      name: 'Saturn', 
      color: '#FAD5A5', 
      position: [36, 0, 0] as [number, number, number], 
      emoji: '♄',
      facts: ['Beautiful rings', 'Gas giant', 'Many moons']
    },
  ];

  const selectedPlanetData = planets.find(p => p.name === selectedPlanet);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 30], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#FFD700" />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <SolarWind />
        <SolarFlareSun />
        <Spacecraft position={[0, 2, 5]} />
        
        {planets.map((planet) => (
          <DetailedPlanet
            key={planet.name}
            position={planet.position}
            color={planet.color}
            size={0.8}
            name={planet.name}
            emoji={planet.emoji}
            facts={planet.facts}
            onSelect={setSelectedPlanet}
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
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 rounded-lg p-4 text-white">
        <h3 className="text-lg font-bold mb-2">🚀 Space Science Facts! 🚀</h3>
        {selectedPlanetData ? (
          <div>
            <h4 className="text-md font-semibold mb-2">
              {selectedPlanetData.emoji} {selectedPlanetData.name}
            </h4>
            <ul className="text-sm space-y-1">
              {selectedPlanetData.facts.map((fact, index) => (
                <li key={index}>• {fact}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>☀️ Solar Wind:</strong> Charged particles from the Sun
            </div>
            <div>
              <strong>🌍 Magnetosphere:</strong> Earth's protective magnetic field
            </div>
            <div>
              <strong>🛰️ Satellites:</strong> Help us study space weather
            </div>
          </div>
        )}
        <p className="text-xs mt-2 text-blue-300">
          Click on planets to learn more about them!
        </p>
      </div>
    </div>
  );
};

export default MiddleSchoolSpaceAdventure3D;
