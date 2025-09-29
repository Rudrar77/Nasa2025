import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh, Group, Vector3 } from 'three';

const Sun = ({ onClick }: { onClick: () => void }) => {
  const meshRef = useRef<Mesh>(null);
  const [isFlaring, setIsFlaring] = useState(false);

  const handleClick = () => {
    setIsFlaring(true);
    onClick();
    setTimeout(() => setIsFlaring(false), 2000);
  };

  return (
    <Float speed={0} rotationIntensity={0} floatIntensity={0}>
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

const Earth = ({ pulse }: { pulse: number }) => {
  return (
    <Float speed={0} rotationIntensity={0} floatIntensity={0}>
      <group position={[8, 0, 0]}>
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial
            color="#4A90E2"
            emissive="#001122"
            emissiveIntensity={0.1}
          />
        </Sphere>
        {/* Aurora ring */}
        <Sphere args={[1.1 + pulse * 0.1, 32, 32]}>
          <meshBasicMaterial
            color="#00FF88"
            transparent
            opacity={0.3 + Math.min(0.4, pulse * 0.5)}
            wireframe
          />
        </Sphere>
      </group>
    </Float>
  );
};

const CME = ({ onArrive, speedKms }: { onArrive: () => void; speedKms?: number | null }) => {
  const ref = useRef<Group>(null);
  const [t, setT] = useState(0); // 0..1 progress from Sun(0,0,0) to Earth(8,0,0)
  const target = new Vector3(8, 0, 0);
  const start = new Vector3(0, 0, 0);

  useFrame((_, delta) => {
    // Map solar wind speed (km/s) ~[200..1000] to scene speed [0.8..3.0]
    const s = speedKms ?? 400;
    const norm = Math.min(1, Math.max(0, (s - 200) / 800));
    const speed = 0.8 + norm * (3.0 - 0.8);
    setT((prev) => {
      const next = Math.min(1, prev + (speed * delta) / start.distanceTo(target));
      const pos = start.clone().lerp(target, next);
      if (ref.current) ref.current.position.set(pos.x, pos.y, pos.z);
      if (next >= 1) onArrive();
      return next;
    });
  });

  return (
    <group ref={ref}>
      {/* simple CME blob */}
      <Sphere args={[0.5, 16, 16]}>
        <meshStandardMaterial color="#FFB347" emissive="#FF7A00" emissiveIntensity={1} transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[0.8, 16, 16]}>
        <meshBasicMaterial color="#FFA500" transparent opacity={0.2} wireframe />
      </Sphere>
      {/* trail */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} position={[-(i + 1) * 0.5, 0, 0]}>
          <Sphere args={[0.3 - i * 0.03, 8, 8]}>
            <meshBasicMaterial color="#FFA500" transparent opacity={0.15 - i * 0.015} />
          </Sphere>
        </group>
      ))}
    </group>
  );
};

interface InteractiveSpaceProps {
  onSolarFlare: () => void;
  onImpact?: () => void;
  className?: string;
  liveSeverity?: number; // 0..1
  liveSpeedKmPerS?: number | null; // km/s
  autoFromLive?: boolean;
}

const InteractiveSpace = ({ onSolarFlare, onImpact, className = '', liveSeverity = 0, liveSpeedKmPerS = null, autoFromLive = true }: InteractiveSpaceProps) => {
  const [showCME, setShowCME] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [lastAutoTs, setLastAutoTs] = useState<number>(0);

  const handleFlare = () => {
    onSolarFlare();
    setShowCME(true);
  };

  const handleArrive = () => {
    setShowCME(false);
    setPulse(1);
    onImpact?.();
    // decay pulse
    const id = setInterval(() => setPulse((p) => {
      const next = Math.max(0, p - 0.08);
      if (next === 0) clearInterval(id);
      return next;
    }), 50);
  };

  // Auto-launch CME using live data when severity is elevated, throttled
  if (autoFromLive && !showCME) {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const cooldownMs = 10_000; // at most one every 10s
    const threshold = 0.45; // moderate activity
    if (liveSeverity >= threshold && now - lastAutoTs > cooldownMs) {
      setLastAutoTs(now);
      setShowCME(true);
    }
  }

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
        <Sun onClick={handleFlare} />
        {showCME && (
          <CME
            onArrive={handleArrive}
            speedKms={liveSpeedKmPerS ?? undefined}
          />
        )}
        {/* Magnetosphere lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <group key={i} position={[8, 0, 0]}>
            <Sphere args={[1.4 + i * 0.15, 32, 32]}>
              <meshBasicMaterial color="#60a5fa" transparent opacity={0.06} wireframe />
            </Sphere>
          </group>
        ))}
        <Earth pulse={Math.max(pulse, Math.min(1, liveSeverity * 1.2))} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-sm text-muted-foreground bg-glass backdrop-blur-sm rounded-lg p-2 border border-glass">
        Live-driven: aurora intensity follows NOAA data. Click Sun to force a CME. 🌟
      </div>
    </div>
  );
};

export default InteractiveSpace;