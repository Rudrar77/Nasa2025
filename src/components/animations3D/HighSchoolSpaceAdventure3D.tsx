import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Line, Html } from '@react-three/drei';
import { TextureLoader } from 'three';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Advanced planet with detailed physics simulation
const AdvancedPlanet = ({ 
  position, 
  color, 
  size, 
  name, 
  emoji, 
  data, 
  onSelect,
  selected 
}: {
  position: [number, number, number];
  color: string;
  size: number;
  name: string;
  emoji: string;
  data: PlanetData;
  onSelect: (planet: string) => void;
  selected: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      
      // Orbital motion
      setOrbitAngle(prev => prev + data.orbitalSpeed);
      const radius = Math.sqrt(position[0] * position[0] + position[2] * position[2]);
      meshRef.current.position.x = Math.cos(orbitAngle) * radius;
      meshRef.current.position.z = Math.sin(orbitAngle) * radius;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(selected ? '' : name)}
        scale={hovered ? size * 1.2 : size}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color={color} 
          emissive={selected ? color : '#000000'}
          emissiveIntensity={selected ? 0.3 : 0}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Detailed orbit path */}
      <Line
        points={Array.from({ length: 64 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2;
          const radius = Math.sqrt(position[0] * position[0] + position[2] * position[2]);
          return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
        })}
        color="white"
        opacity={0.2}
        transparent
        lineWidth={2}
      />
      
      {/* Magnetic field visualization */}
      {selected && (
        <group>
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = size * 3;
            return (
              <Line
                key={i}
                points={[
                  [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
                  [Math.cos(angle) * radius * 1.5, 0, Math.sin(angle) * radius * 1.5]
                ]}
                color="#00BFFF"
                opacity={0.6}
                transparent
              />
            );
          })}
        </group>
      )}
      
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

// Advanced Sun with detailed solar activity
const AdvancedSun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [pulse, setPulse] = useState(0);
  const [solarFlares, setSolarFlares] = useState<Array<{
    id: number;
    angle: number;
    intensity: number;
    duration: number;
    startTime: number;
  }>>([]);
  const [coronalMassEjections, setCoronalMassEjections] = useState<Array<{
    id: number;
    angle: number;
    speed: number;
    startTime: number;
  }>>([]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      setPulse(Math.sin(state.clock.elapsedTime * 1.5) * 0.1 + 1);
      
      // Generate solar flares
      if (Math.random() < 0.01) {
        setSolarFlares(prev => [...prev.slice(-10), {
          id: Date.now(),
          angle: Math.random() * Math.PI * 2,
          intensity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 3 + 2,
          startTime: state.clock.elapsedTime
        }]);
      }
      
      // Generate CMEs
      if (Math.random() < 0.005) {
        setCoronalMassEjections(prev => [...prev.slice(-5), {
          id: Date.now(),
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.1 + 0.05,
          startTime: state.clock.elapsedTime
        }]);
      }
      
      // Update flares
      setSolarFlares(prev => prev.filter(flare => 
        state.clock.elapsedTime - flare.startTime < flare.duration
      ));
      
      // Update CMEs
      setCoronalMassEjections(prev => prev.filter(cme => 
        state.clock.elapsedTime - cme.startTime < 10
      ));
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} scale={pulse}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFA500" 
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      {/* Solar flares */}
      {solarFlares.map((flare) => (
        <mesh
          key={flare.id}
          position={[
            Math.cos(flare.angle) * 2.5,
            Math.sin(flare.angle) * 2.5,
            0
          ]}
          rotation={[0, 0, flare.angle]}
          scale={flare.intensity}
        >
          <coneGeometry args={[0.2, flare.intensity * 2, 16]} />
          <meshStandardMaterial 
            color="#FF4500" 
            emissive="#FF0000" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Coronal Mass Ejections */}
      {coronalMassEjections.map((cme) => (
        <mesh
          key={cme.id}
          position={[
            Math.cos(cme.angle) * (2.5 + cme.speed * 10),
            Math.sin(cme.angle) * (2.5 + cme.speed * 10),
            0
          ]}
          rotation={[0, 0, cme.angle]}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color="#FF6B6B" 
            emissive="#FF0000" 
            emissiveIntensity={0.6}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      
      <Text
        position={[0, -3, 0]}
        fontSize={0.6}
        color="yellow"
        anchorX="center"
        anchorY="middle"
      >
        ☀️ The Sun - Nuclear Fusion Reactor
      </Text>
    </group>
  );
};

// Solar wind with realistic particle physics
const AdvancedSolarWind = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const positions = new Float32Array(1000 * 3);
    const velocities = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      // Start particles near the sun
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 3 + 2.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Realistic solar wind velocities
      const speed = Math.random() * 0.2 + 0.1;
      velocities[i * 3] = Math.cos(angle) * speed;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = Math.sin(angle) * speed;
      
      // Color based on particle type
      const particleType = Math.random();
      if (particleType < 0.7) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.5; colors[i * 3 + 2] = 1; // Blue for protons
      } else if (particleType < 0.9) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.5; colors[i * 3 + 2] = 0; // Orange for alpha particles
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 0; // Yellow for electrons
      }
    }
    return { positions, velocities, colors };
  });

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < 1000; i++) {
        positions[i * 3] += particles.velocities[i * 3];
        positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
        positions[i * 3 + 2] += particles.velocities[i * 3 + 2];
        
        // Reset particles that are too far
        const distance = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2);
        if (distance > 60) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 3 + 2.5;
          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
          positions[i * 3 + 2] = Math.sin(angle) * radius;
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
          count={1000}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={1000}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.3} vertexColors />
    </points>
  );
};

// Advanced spacecraft with realistic design
const AdvancedSpacecraft = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main body */}
      <Box args={[0.4, 0.8, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Nose cone */}
      <Box args={[0.3, 0.4, 0.3]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="#FF6B6B" metalness={0.6} roughness={0.3} />
      </Box>
      {/* Solar panels */}
      <Box args={[1.2, 0.05, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#000080" metalness={0.9} roughness={0.1} />
      </Box>
      {/* Antenna */}
      <Box args={[0.02, 0.5, 0.02]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </Box>
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        🛰️ SOHO
      </Text>
    </group>
  );
};

interface PlanetData {
  orbitalSpeed: number;
  mass: number;
  temperature: number;
  atmosphere: string;
  magneticField: boolean;
  moons: number;
  facts: string[];
}

const HighSchoolSpaceAdventure3D: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string>('');
  const [showPhysics, setShowPhysics] = useState(false);

  const planets = [
    { 
      name: 'Mercury', 
      color: '#8C7853', 
      position: [8, 0, 0] as [number, number, number], 
      emoji: '☿️',
      data: {
        orbitalSpeed: 0.02,
        mass: 0.055,
        temperature: 167,
        atmosphere: 'None',
        magneticField: true,
        moons: 0,
        facts: ['Closest to Sun', 'Extreme temperature variations', 'Weak magnetic field']
      }
    },
    { 
      name: 'Venus', 
      color: '#FFC649', 
      position: [12, 0, 0] as [number, number, number], 
      emoji: '♀️',
      data: {
        orbitalSpeed: 0.015,
        mass: 0.815,
        temperature: 464,
        atmosphere: 'CO2 (96.5%)',
        magneticField: false,
        moons: 0,
        facts: ['Hottest planet', 'Runaway greenhouse effect', 'Retrograde rotation']
      }
    },
    { 
      name: 'Earth', 
      color: '#6B93D6', 
      position: [16, 0, 0] as [number, number, number], 
      emoji: '🌍',
      data: {
        orbitalSpeed: 0.01,
        mass: 1.0,
        temperature: 15,
        atmosphere: 'N2 (78%), O2 (21%)',
        magneticField: true,
        moons: 1,
        facts: ['Only known life', 'Strong magnetic field', 'Liquid water']
      }
    },
    { 
      name: 'Mars', 
      color: '#C1440E', 
      position: [20, 0, 0] as [number, number, number], 
      emoji: '♂️',
      data: {
        orbitalSpeed: 0.008,
        mass: 0.107,
        temperature: -65,
        atmosphere: 'CO2 (95%)',
        magneticField: false,
        moons: 2,
        facts: ['Red planet', 'Evidence of past water', 'Thin atmosphere']
      }
    },
    { 
      name: 'Jupiter', 
      color: '#D8CA9D', 
      position: [28, 0, 0] as [number, number, number], 
      emoji: '♃',
      data: {
        orbitalSpeed: 0.005,
        mass: 317.8,
        temperature: -110,
        atmosphere: 'H2 (89%), He (10%)',
        magneticField: true,
        moons: 79,
        facts: ['Largest planet', 'Gas giant', 'Strong magnetic field']
      }
    },
    { 
      name: 'Saturn', 
      color: '#FAD5A5', 
      position: [36, 0, 0] as [number, number, number], 
      emoji: '♄',
      data: {
        orbitalSpeed: 0.003,
        mass: 95.2,
        temperature: -140,
        atmosphere: 'H2 (96%), He (3%)',
        magneticField: true,
        moons: 82,
        facts: ['Ring system', 'Less dense than water', 'Hexagonal storm']
      }
    },
  ];

  const selectedPlanetData = planets.find(p => p.name === selectedPlanet);

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 5, 30], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={1.2} color="#FFD700" />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        
        <AdvancedSolarWind />
        <AdvancedSun />
        <AdvancedSpacecraft position={[0, 2, 5]} />
        
        {planets.map((planet) => (
          <AdvancedPlanet
            key={planet.name}
            position={planet.position}
            color={planet.color}
            size={0.8}
            name={planet.name}
            emoji={planet.emoji}
            data={planet.data}
            onSelect={setSelectedPlanet}
            selected={selectedPlanet === planet.name}
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
      
      {/* Advanced Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/90 rounded-lg p-4 text-white">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">🔬 Advanced Space Physics 🔬</h3>
          <button
            onClick={() => setShowPhysics(!showPhysics)}
            className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700"
          >
            {showPhysics ? 'Hide Physics' : 'Show Physics'}
          </button>
        </div>
        
        {selectedPlanetData ? (
          <div>
            <h4 className="text-md font-semibold mb-2">
              {selectedPlanetData.emoji} {selectedPlanetData.name} - Physical Properties
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <strong>Mass:</strong> {selectedPlanetData.data.mass} Earth masses
              </div>
              <div>
                <strong>Temperature:</strong> {selectedPlanetData.data.temperature}°C
              </div>
              <div>
                <strong>Atmosphere:</strong> {selectedPlanetData.data.atmosphere}
              </div>
              <div>
                <strong>Magnetic Field:</strong> {selectedPlanetData.data.magneticField ? 'Yes' : 'No'}
              </div>
            </div>
            {showPhysics && (
              <div className="mt-3 p-3 bg-blue-900/30 rounded">
                <h5 className="font-semibold mb-2">Physics Concepts:</h5>
                <ul className="text-xs space-y-1">
                  <li>• Orbital mechanics and gravitational forces</li>
                  <li>• Solar wind interaction with planetary magnetic fields</li>
                  <li>• Atmospheric composition and greenhouse effects</li>
                  <li>• Electromagnetic radiation and particle physics</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>☀️ Solar Wind:</strong> High-energy charged particles
            </div>
            <div>
              <strong>🌍 Magnetosphere:</strong> Earth's protective magnetic shield
            </div>
            <div>
              <strong>🛰️ Space Weather:</strong> Solar activity effects on technology
            </div>
          </div>
        )}
        <p className="text-xs mt-2 text-blue-300">
          Click planets to explore their physical properties and physics!
        </p>
      </div>
    </div>
  );
};

export default HighSchoolSpaceAdventure3D;
