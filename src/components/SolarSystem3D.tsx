import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { MotionConfig } from 'framer-motion';

interface PlanetProps {
  position: [number, number, number];
  scale: number;
  speed?: number;
  name: string;
  orbitRadius?: number;
  highlightOnHover?: boolean;
}

interface PlanetMaterial {
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  metalness?: number;
  roughness?: number;
}

const planetMaterials: Record<string, PlanetMaterial> = {
  Sun: { 
    color: '#ffa500', 
    emissive: '#ff4400', 
    emissiveIntensity: 1,
    metalness: 0,
    roughness: 1
  },
  Mercury: { 
    color: '#A0522D',
    metalness: 0.6,
    roughness: 0.4
  },
  Venus: { 
    color: '#DEB887',
    metalness: 0.3,
    roughness: 0.7
  },
  Earth: { 
    color: '#4169E1',
    metalness: 0.1,
    roughness: 0.5
  },
  Mars: { 
    color: '#CD5C5C',
    metalness: 0.2,
    roughness: 0.8
  },
  Jupiter: { 
    color: '#DAA520',
    metalness: 0.3,
    roughness: 0.6
  },
  Saturn: { 
    color: '#F0E68C',
    metalness: 0.4,
    roughness: 0.5
  },
  Uranus: { 
    color: '#87CEEB',
    metalness: 0.2,
    roughness: 0.6
  },
  Neptune: { 
    color: '#4169E1',
    metalness: 0.3,
    roughness: 0.5
  }
};

const Planet = ({ position, scale, speed = 1, name, orbitRadius = 0, highlightOnHover = true }: PlanetProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const material = planetMaterials[name];
  const frameRef = useRef<number>();

  const { camera } = useThree();

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the planet
      meshRef.current.rotation.y += 0.002 * speed;

      // Orbit around the sun if orbitRadius is provided
      if (orbitRadius > 0) {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.x = Math.sin(time * 0.2 * speed) * orbitRadius;
        meshRef.current.position.z = Math.cos(time * 0.2 * speed) * orbitRadius;
      }
    }
  });

  const handleClick = () => {
    if (meshRef.current) {
      const distance = scale * 4;
      const position = meshRef.current.position;
      camera.position.set(position.x + distance, distance, position.z + distance);
      camera.lookAt(position);
    }
  };

  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered && highlightOnHover ? scale * 1.1 : scale}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={material.color}
          emissive={material.emissive}
          emissiveIntensity={material.emissiveIntensity}
          metalness={material.metalness}
          roughness={material.roughness}
        />
      </mesh>
      <Text
        position={[position[0], position[1] + scale * 1.5, position[2]]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </>
  );
};

interface SolarFlareProp {
  position: [number, number, number];
  scale: number;
}

const SolarFlare = ({ position, scale }: SolarFlareProp) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
      meshRef.current.scale.x = scale * (1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2);
      meshRef.current.scale.y = scale * (1 + Math.cos(state.clock.getElapsedTime() * 2) * 0.2);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.2, 16, 100]} />
      <meshStandardMaterial color="#ff4400" emissive="#ff0000" emissiveIntensity={2} />
    </mesh>
  );
};

const SolarSystem3D = () => {
  return (
    <div className="w-full h-[600px] relative">
      <MotionConfig transition={{ duration: 0.5 }}>
        <Canvas camera={{ position: [0, 15, 35], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffa500" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Sun */}
          <Planet
            position={[0, 0, 0]}
            scale={3}
            speed={0.5}
            name="Sun"
            highlightOnHover={false}
          />

          {/* Solar Flares */}
          <SolarFlare position={[3, 0, 0]} scale={2} />
          <SolarFlare position={[-2, 2, 0]} scale={1.5} />
          <SolarFlare position={[0, -3, 1]} scale={2.5} />

          {/* Planets */}
          <Planet
            position={[8, 0, 0]}
            scale={0.4}
            speed={4.1}
            name="Mercury"
            orbitRadius={8}
          />
          <Planet
            position={[11, 0, 0]}
            scale={0.9}
            speed={3.8}
            name="Venus"
            orbitRadius={11}
          />
          <Planet
            position={[14, 0, 0]}
            scale={1}
            speed={3.6}
            name="Earth"
            orbitRadius={14}
          />
          <Planet
            position={[17, 0, 0]}
            scale={0.5}
            speed={3.4}
            name="Mars"
            orbitRadius={17}
          />
          <Planet
            position={[22, 0, 0]}
            scale={2}
            speed={3}
            name="Jupiter"
            orbitRadius={22}
          />
          <Planet
            position={[26, 0, 0]}
            scale={1.7}
            speed={2.8}
            name="Saturn"
            orbitRadius={26}
          />
          <Planet
            position={[30, 0, 0]}
            scale={1.4}
            speed={2.6}
            name="Uranus"
            orbitRadius={30}
          />
          <Planet
            position={[34, 0, 0]}
            scale={1.3}
            speed={2.4}
            name="Neptune"
            orbitRadius={34}
          />

          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
          />
        </Canvas>
      </MotionConfig>
    </div>
  );
};

export default SolarSystem3D;
