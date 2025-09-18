import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

const Sun = ({ onClick }: { onClick: () => void }) => {
  const meshRef = useRef<Mesh>(null);
  const [isFlaring, setIsFlaring] = useState(false);

  const handleClick = () => {
    setIsFlaring(true);
    onClick();
    setTimeout(() => setIsFlaring(false), 2000);
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere 
        ref={meshRef}
        args={[2, 64, 64]} 
        onClick={handleClick}
        scale={isFlaring ? 1.2 : 1}
      >
        <meshStandardMaterial
          color="#FFA500"
          emissive="#FF6B00"
          emissiveIntensity={isFlaring ? 1.5 : 0.5}
          roughness={0.1}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
};

const Earth = () => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={[8, 0, 0]}>
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial
            color="#4A90E2"
            emissive="#001122"
            emissiveIntensity={0.1}
          />
        </Sphere>
        {/* Aurora ring */}
        <Sphere args={[1.1, 32, 32]}>
          <meshBasicMaterial
            color="#00FF88"
            transparent
            opacity={0.3}
            wireframe
          />
        </Sphere>
      </group>
    </Float>
  );
};

interface InteractiveSpaceProps {
  onSolarFlare: () => void;
  className?: string;
}

const InteractiveSpace = ({ onSolarFlare, className = '' }: InteractiveSpaceProps) => {
  return (
    <div className={`w-full h-96 relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FFA500" />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Sun onClick={onSolarFlare} />
        <Earth />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-sm text-muted-foreground bg-glass backdrop-blur-sm rounded-lg p-2 border border-glass">
        Click the Sun to create a solar flare! 🌟
      </div>
    </div>
  );
};

export default InteractiveSpace;