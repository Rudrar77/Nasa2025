import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import ErrorBoundary from '../ErrorBoundary';
import FallbackVisualization from '../FallbackVisualization';

interface EarthImpact3DProps {
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

// Earth Impact Visualization
const EarthWithImpact = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const magnetosphereRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const [impactIntensity, setImpactIntensity] = useState(0);
  
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
      label: "Solar Wind Speed",
      value: "400-800",
      unit: "km/s",
      info: "Solar wind particles travel at incredible speeds",
      position: [-3, 2, 0],
      color: "amber"
    },
    {
      label: "Aurora Energy",
      value: "10^13",
      unit: "watts",
      info: "Energy released during auroras can power entire cities",
      position: [0, -3, 2],
      color: "emerald"
    }
  ];
  
  // Animate the Earth and impact effects
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
        1.05 + Math.sin(time * 0.3) * 0.005,
        1.05 + Math.sin(time * 0.3) * 0.005,
        1.05 + Math.sin(time * 0.3) * 0.005
      );
    }
    
    if (magnetosphereRef.current) {
      // Pulsate the magnetosphere
      magnetosphereRef.current.scale.set(
        1 + Math.sin(time * 0.5) * 0.05,
        1 + Math.sin(time * 0.5) * 0.05,
        1 + Math.sin(time * 0.5) * 0.05
      );
    }
    
    // Simulate solar flare impact intensity over time
    const newIntensity = (Math.sin(time * 0.2) * 0.5 + 0.5) * 0.8;
    setImpactIntensity(newIntensity);
  });
  
  // Solar wind particles
  const SolarWindParticle = ({ 
    startDelay = 0,
    direction = new THREE.Vector3(-1, 0, 0)
  }: { 
    startDelay?: number, 
    direction?: THREE.Vector3
  }) => {
    const particleRef = useRef<THREE.Mesh>(null);
    const normalizedDir = direction.normalize();
    const startPos: [number, number, number] = [
      normalizedDir.x * -10 + (Math.random() * 2 - 1),
      normalizedDir.y * -10 + (Math.random() * 2 - 1),
      normalizedDir.z * -10 + (Math.random() * 2 - 1)
    ];
    
    useFrame((state) => {
      if (particleRef.current) {
        const time = state.clock.getElapsedTime() - startDelay;
        
        if (time > 0) {
          // Move particle toward Earth
          particleRef.current.position.x += normalizedDir.x * 0.1;
          particleRef.current.position.y += normalizedDir.y * 0.1;
          particleRef.current.position.z += normalizedDir.z * 0.1;
          
          // Calculate distance to Earth's center
          const distanceToEarth = new THREE.Vector3(
            particleRef.current.position.x,
            particleRef.current.position.y,
            particleRef.current.position.z
          ).length();
          
          // Reset if too far or if hit the magnetosphere
          if (distanceToEarth > 15 || (distanceToEarth < 3 && Math.random() > 0.3)) {
            particleRef.current.position.set(startPos[0], startPos[1], startPos[2]);
          }
          
          // Particles that hit the magnetosphere should change color
          if (distanceToEarth < 3.2 && distanceToEarth > 2.8) {
            if (particleRef.current.material instanceof THREE.MeshBasicMaterial) {
              particleRef.current.material.color.set('#ff3300');
            }
          } else {
            if (particleRef.current.material instanceof THREE.MeshBasicMaterial) {
              particleRef.current.material.color.set('#ffdd00');
            }
          }
        }
      }
    });
    
    return (
      <mesh ref={particleRef} position={startPos}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ffdd00" />
      </mesh>
    );
  };
  
  // Aurora effect at poles
  const Aurora = ({ position, rotation, intensity }: { position: [number, number, number], rotation: [number, number, number], intensity: number }) => {
    const auroraRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
      if (auroraRef.current) {
        const time = state.clock.getElapsedTime();
        // Rotate the aurora
        auroraRef.current.rotation.z = time * 0.1;
        // Adjust opacity based on intensity
        if (auroraRef.current.material instanceof THREE.MeshBasicMaterial) {
          auroraRef.current.material.opacity = 0.2 + intensity * 0.8;
          
          // Change color based on intensity for more dynamic effect
          const hue = 0.3 + intensity * 0.1; // Shift from green to blue-green
          auroraRef.current.material.color.setHSL(hue, 1, 0.5);
        }
      }
    });
    
    return (
      <mesh ref={auroraRef} position={position} rotation={rotation}>
        <ringGeometry args={[0.9, 1.1, 128]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
    );
  };
  
  // Impact visualization on technology
  const TechnologyImpact = ({ position, impactIntensity }: { position: [number, number, number], impactIntensity: number }) => {
    const techRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
      if (techRef.current) {
        const time = state.clock.getElapsedTime();
        // Flicker effect based on impact intensity
        techRef.current.visible = Math.random() > impactIntensity * 0.5;
        
        // Slight movement to simulate orbit
        techRef.current.position.x = position[0] + Math.sin(time * 0.5) * 0.2;
        techRef.current.position.z = position[2] + Math.cos(time * 0.5) * 0.2;
        
        // Rotation
        techRef.current.rotation.y = time * 0.3;
      }
    });
    
    return (
      <group ref={techRef} position={position}>
        <mesh>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#cccccc" />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#999999" />
        </mesh>
        {/* Add solar panel */}
        <mesh position={[0.25, 0, 0]} rotation={[0, 0, Math.PI/2]}>
          <boxGeometry args={[0.3, 0.01, 0.1]} />
          <meshStandardMaterial color="#2244aa" />
        </mesh>
        <pointLight color="#ffff00" intensity={1} distance={0.5} />
      </group>
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
      
      {/* Aurora effects at poles - intensity varies with solar activity */}
      <Aurora position={[0, 1, 0]} rotation={[Math.PI/2, 0, 0]} intensity={impactIntensity} />
      <Aurora position={[0, -1, 0]} rotation={[Math.PI/2, 0, 0]} intensity={impactIntensity} />
      
      {/* Solar wind particles from various directions */}
      {Array.from({ length: 50 }).map((_, i) => (
        <SolarWindParticle 
          key={`particle-${i}`} 
          startDelay={i * 0.1} 
          direction={new THREE.Vector3(
            -1 + (Math.random() * 0.4 - 0.2),
            Math.random() * 0.4 - 0.2,
            Math.random() * 0.4 - 0.2
          )}
        />
      ))}
      
      {/* Technology impacts - satellites, communications, etc. */}
      <TechnologyImpact position={[2, 2, 0]} impactIntensity={impactIntensity} />
      <TechnologyImpact position={[-1, 2, 1]} impactIntensity={impactIntensity} />
      <TechnologyImpact position={[0, -2, -1]} impactIntensity={impactIntensity} />
      
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
      
      {/* Impact intensity meter */}
      <Html position={[0, 4, 0]} distanceFactor={10}>
        <div className="bg-black/80 backdrop-blur-md p-2 rounded-lg border border-red-500/50 text-white text-xs shadow-lg">
          <div className="font-bold text-red-400 mb-1">Geomagnetic Storm Level</div>
          <div className="w-48 h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              style={{ width: `${impactIntensity * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>Calm</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
        </div>
      </Html>
    </group>
  );
};

// Main component
const EarthImpact3D: React.FC<EarthImpact3DProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-96 ${className}`}>
      <ErrorBoundary fallback={
        <div className="w-full h-96">
          <FallbackVisualization 
            title="Earth's Magnetosphere" 
            description="Interactive visualization showing how solar activity affects Earth"
            color="earth"
          />
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <color attach="background" args={['#000510']} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 3, 5]} intensity={1.5} />
        
          {/* Stars background */}
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
          {/* Earth with impact effects */}
          <EarthWithImpact />
        
          {/* Post-processing effects removed to fix errors */}
        </Canvas>
      </ErrorBoundary>
      
      {/* Legend */}
      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-white/20">
        <div className="font-bold mb-1">Impact Features</div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span>Solar wind particles</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Magnetosphere</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Aurora</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span>Satellites/Technology</span>
          </div>
        </div>
      </div>
      
      {/* Educational note */}
      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm p-2 rounded text-xs text-white border border-white/20 max-w-[200px]">
        <div className="font-bold mb-1">Did You Know?</div>
        <p className="text-xs">
          A severe solar storm in 1989 caused a major blackout in Quebec, Canada, affecting millions of people for 9 hours!
        </p>
      </div>
    </div>
  );
};

export default EarthImpact3D;