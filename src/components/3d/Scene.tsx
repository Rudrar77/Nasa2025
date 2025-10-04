import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  showStars?: boolean;
  environment?: string;
}

const Scene = ({ 
  children, 
  cameraPosition = [0, 0, 10], 
  enableControls = true, 
  showStars = true,
  environment = "night"
}: SceneProps) => {
  // Valid environment presets for @react-three/drei
  const validPresets = ["apartment", "city", "dawn", "forest", "lobby", "night", "park", "studio", "sunset", "warehouse"];
  const validEnvironment = validPresets.includes(environment) ? environment : "night";

  return (
    <Canvas camera={{ position: cameraPosition, fov: 60 }}>
      <Suspense fallback={null}>
        {showStars && <Stars radius={300} depth={60} count={20000} factor={7} />}
        <Environment preset={validEnvironment} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {enableControls && (
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            maxDistance={50}
            minDistance={1}
          />
        )}
        {children}
      </Suspense>
    </Canvas>
  );
};

export default Scene;