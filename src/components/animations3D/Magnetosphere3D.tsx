import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Trail, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from '../ErrorBoundary';
import FallbackVisualization from '../FallbackVisualization';

interface Magnetosphere3DProps {
  className?: string;
}

// Educational data point for overlay
interface DataPoint {
  label: string;
  value: string;
  unit: string;
  info: string;
  position: [number, number, number];
  color: string;
}

// Earth with Magnetosphere - Enhanced with better visuals
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const magnetosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const northPoleRef = useRef<THREE.Mesh>(null);
  const southPoleRef = useRef<THREE.Mesh>(null);
  
  // Load Earth texture
  const earthTexture = useTexture('/textures/earth.jpg');
  
  // Data points for the visualization
  const dataPoints: DataPoint[] = [
    {
      label: "Magnetic Field Strength",
      value: "25-65",
      unit: "μT",
      info: "Earth's magnetic field protects us from solar radiation",
      position: [3, 2, 0],
      color: "blue"
    },
    {
      label: "Magnetosphere Distance",
      value: "~65,000",
      unit: "km",
      info: "Dayside compression by solar wind",
      position: [-3, 2, 0],
      color: "cyan"
    },
    {
      label: "Van Allen Belts",
      value: "1,000-60,000",
      unit: "km",
      info: "Radiation belts trapping charged particles",
      position: [0, -3, 2],
      color: "orange"
    }
  ];
  
  // Enhanced Earth animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0025; // Clouds rotate slightly faster
    }
    
    if (atmosphereRef.current) {
      // Subtle pulsing effect for atmosphere
      atmosphereRef.current.scale.set(
        1.025 + Math.sin(time * 0.3) * 0.005,
        1.025 + Math.sin(time * 0.3) * 0.005,
        1.025 + Math.sin(time * 0.3) * 0.005
      );
    }
    
    if (magnetosphereRef.current) {
      // More dynamic pulsation of the magnetosphere
      magnetosphereRef.current.scale.set(
        1 + Math.sin(time * 0.5) * 0.05,
        1 + Math.sin(time * 0.5) * 0.05,
        1 + Math.sin(time * 0.5) * 0.05
      );
    }
    
    // Animate magnetic poles
    if (northPoleRef.current && southPoleRef.current) {
      northPoleRef.current.rotation.y = time * 0.2;
      southPoleRef.current.rotation.y = -time * 0.2;
    }
  });
  
  // Solar wind particles
  const SolarWindParticle = ({ delay = 0 }: { delay?: number }) => {
    const particleRef = useRef<THREE.Mesh>(null);
    const startPosition: [number, number, number] = [-10, Math.random() * 6 - 3, Math.random() * 6 - 3];
    
    useFrame((state) => {
      if (particleRef.current) {
        const time = state.clock.getElapsedTime() + delay;
        
        // Reset position if it's past Earth
        if (particleRef.current.position.x > 5) {
          particleRef.current.position.set(startPosition[0], startPosition[1], startPosition[2]);
        }
        
        // Move particle toward Earth
        particleRef.current.position.x += 0.05;
        
        // Calculate distance to Earth's center
        const distanceToEarth = Math.sqrt(
          particleRef.current.position.x * particleRef.current.position.x +
          particleRef.current.position.y * particleRef.current.position.y +
          particleRef.current.position.z * particleRef.current.position.z
        );
        
        // If close to magnetosphere boundary (3 units), deflect the particle
        if (distanceToEarth < 3) {
          // Deflection vector perpendicular to Earth's position
          const deflectionY = -particleRef.current.position.z * 0.05;
          const deflectionZ = particleRef.current.position.y * 0.05;
          
          particleRef.current.position.y += deflectionY;
          particleRef.current.position.z += deflectionZ;
        }
      }
    });
    
    return (
      <Trail
        width={0.2}
        color={new THREE.Color(0xffff00)}
        length={5}
        decay={1}
        attenuation={(width) => width}
      >
        <mesh ref={particleRef} position={startPosition}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      </Trail>
    );
  };
  
  // Create Van Allen Belt rings
  const VanAllenBelt = ({ radius, color, opacity }: { radius: number, color: string, opacity: number }) => {
    const beltRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
      if (beltRef.current) {
        const time = state.clock.getElapsedTime();
        beltRef.current.rotation.x = Math.PI / 2;
        beltRef.current.rotation.z = time * 0.05;
      }
    });
    
    return (
      <mesh ref={beltRef}>
        <torusGeometry args={[radius, 0.05, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    );
  };
  
  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      
      {/* Clouds layer */}
      <mesh ref={cloudsRef} position={[0, 0, 0]} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="white" transparent opacity={0.3} />
      </mesh>
      
      {/* Earth atmosphere glow */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#4dc6ff" transparent opacity={0.2} />
      </mesh>
      
      {/* Magnetosphere */}
      <mesh ref={magnetosphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#5580ff" transparent opacity={0.1} wireframe />
      </mesh>
      
      {/* Magnetic field lines */}
      {[0, Math.PI/4, Math.PI/2, 3*Math.PI/4, Math.PI, 5*Math.PI/4, 3*Math.PI/2, 7*Math.PI/4].map((angle, i) => (
        <group key={`field-line-${i}`} rotation={[0, angle, 0]}>
          <mesh position={[0, 0, 0]}>
            <tubeGeometry args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, -1, 0),
                new THREE.Vector3(1, -2, 0),
                new THREE.Vector3(2, -1, 0),
                new THREE.Vector3(3, 0, 0),
                new THREE.Vector3(2, 1, 0),
                new THREE.Vector3(1, 2, 0),
                new THREE.Vector3(0, 1, 0),
              ]),
              64,
              0.02,
              8,
              false
            ]} />
            <meshBasicMaterial color="#3366ff" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
      
      {/* Van Allen Belts */}
      <VanAllenBelt radius={1.5} color="#ffaa00" opacity={0.4} />
      <VanAllenBelt radius={2.2} color="#ff6600" opacity={0.3} />
      
      {/* Solar wind particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <SolarWindParticle key={`particle-${i}`} delay={i * 0.2} />
      ))}
      
      {/* Aurora at poles */}
      <mesh ref={northPoleRef} position={[0, 1, 0]} rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[0.9, 1, 32]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh ref={southPoleRef} position={[0, -1, 0]} rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[0.9, 1, 32]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Data points */}
      {dataPoints.map((point, index) => (
        <Html key={index} position={point.position} distanceFactor={10} occlude>
          <div className={`bg-black/80 backdrop-blur-md p-2 rounded-lg border border-${point.color}-500/50 text-white text-xs shadow-lg w-48`}>
            <div className={`font-bold text-${point.color}-400 mb-1 flex items-center gap-1`}>
              {point.label}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-mono text-sm">{point.value}</span>
              <span className={`text-${point.color}-300 text-xs`}>{point.unit}</span>
            </div>
            <div className="text-gray-300 text-xs mt-1">
              {point.info}
            </div>
          </div>
        </Html>
      ))}
    </group>
  );
};

// Main component
const Magnetosphere3D: React.FC<Magnetosphere3DProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-96 ${className}`}>
      <ErrorBoundary fallback={
        <FallbackVisualization 
          title="Earth's Magnetosphere" 
          description="Interactive visualization of Earth's magnetic shield"
          color="earth"
        />
      }>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <color attach="background" args={['#000510']} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={1.5} />
          
          {/* Stars background - reduced count for better performance */}
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          {/* Earth with magnetosphere */}
          <Earth />
          
          {/* Remove post-processing effects to fix black screen */}
        </Canvas>
      </ErrorBoundary>
      
      {/* Add external labels for better visibility */}
      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-blue-500/20 max-w-[200px]">
        <div className="font-bold text-blue-400 mb-1">Earth's Magnetosphere</div>
        <p className="text-xs">
          The magnetic field that surrounds Earth acts as a shield against solar wind and cosmic radiation.
        </p>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-white/20">
        <div className="font-bold mb-1">Magnetosphere Features</div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Magnetic field lines</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Solar wind particles</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>Van Allen belts</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Aurora</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Magnetosphere3D;
