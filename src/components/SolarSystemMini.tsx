import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Line } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Group } from 'three';
import { Card } from '@/components/ui/card';

type Body = {
  name: string;
  color: string;
  radius: number; // visual radius
  distance: number; // from sun, visual units
  speed: number; // orbital speed factor
};

const PLANETS: Body[] = [
  { name: 'Mercury', color: '#9e9e9e', radius: 0.16, distance: 1.2, speed: 4.15 },
  { name: 'Venus', color: '#e6c199', radius: 0.22, distance: 1.8, speed: 1.62 },
  { name: 'Earth', color: '#7fb3ff', radius: 0.24, distance: 2.4, speed: 1.0 },
  { name: 'Mars', color: '#ff9f80', radius: 0.2, distance: 3.0, speed: 0.53 },
  { name: 'Jupiter', color: '#d9b38c', radius: 0.45, distance: 4.0, speed: 0.084 },
  { name: 'Saturn', color: '#e8d3a1', radius: 0.4, distance: 4.8, speed: 0.034 },
  { name: 'Uranus', color: '#a5e6ff', radius: 0.32, distance: 5.5, speed: 0.012 },
  { name: 'Neptune', color: '#6ea8ff', radius: 0.31, distance: 6.2, speed: 0.006 },
];

const DESCRIPTIONS: Record<string, { blurb: string; image: string }> = {
  Sun: { blurb: "Hi! I am the Sun, a star that powers our solar system.", image: "/placeholder.svg" },
  Mercury: { blurb: "I am Mercury, the closest planet to the Sun.", image: "/placeholder.svg" },
  Venus: { blurb: "I am Venus, covered by thick clouds.", image: "/placeholder.svg" },
  Earth: { blurb: "I am Earth, your home with oceans and life.", image: "/placeholder.svg" },
  Mars: { blurb: "I am Mars, the red planet with giant volcanoes.", image: "/placeholder.svg" },
  Jupiter: { blurb: "I am Jupiter, the largest planet with a big red spot.", image: "/placeholder.svg" },
  Saturn: { blurb: "I am Saturn, famous for my rings.", image: "/placeholder.svg" },
  Uranus: { blurb: "I am Uranus, I roll around the Sun on my side.", image: "/placeholder.svg" },
  Neptune: { blurb: "I am Neptune, a windy world far away.", image: "/placeholder.svg" },
};

function OrbitRing({ r }: { r: number }) {
  // circle line in XZ plane
  const points = Array.from({ length: 64 }, (_, i) => {
    const t = (i / 64) * Math.PI * 2;
    return [Math.cos(t) * r, 0, Math.sin(t) * r] as [number, number, number];
  });
  points.push(points[0]);
  return <Line points={points} color="#ffffff30" lineWidth={1} />;
}

function PlanetOrbit({ body, onSelect }: { body: Body; onSelect: (name: string) => void }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    // scale speeds so one Earth year ~ 8 seconds visually
    const base = (Math.PI * 2) / 8; // radians per second for Earth
    const omega = base * body.speed;
    ref.current.rotation.y += omega * delta;
  });
  return (
    <group>
      <OrbitRing r={body.distance} />
      <group ref={ref}>
        <group position={[body.distance, 0, 0]} onPointerDown={() => onSelect(body.name)}>
          <Sphere args={[body.radius, 24, 24]}>
            <meshStandardMaterial color={body.color} />
          </Sphere>
          <Html position={[0, body.radius + 0.35, 0]} center>
            <div className="text-xs bg-background/80 border border-border rounded px-1 py-0.5">
              {body.name}
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

const SolarSystemMini = () => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-border relative">
      <Canvas camera={{ position: [0, 3, 9], fov: 55 }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[0, 0, 0]} intensity={2.2} color="#ffd27a" />
        <OrbitControls enablePan={false} />

        {/* Sun */}
        <group onPointerDown={() => setSelected('Sun')}>
          <Sphere args={[0.7, 32, 32]}>
            <meshStandardMaterial color="#ffb300" emissive="#ff9900" emissiveIntensity={0.8} />
          </Sphere>
          <Html position={[0, 1.2, 0]} center>
            <div className="text-xs bg-background/80 border border-border rounded px-1 py-0.5">Sun</div>
          </Html>
        </group>

        {/* Orbits */}
        {PLANETS.map((b) => (
          <PlanetOrbit key={b.name} body={b} onSelect={setSelected} />
        ))}
      </Canvas>

      {selected && (
        <div className="absolute right-3 top-3 w-64">
          <Card className="p-3 bg-background/90 border-glass">
            <div className="flex items-start gap-2">
              <div>
                <div className="font-semibold">{selected}</div>
                <div className="text-xs text-muted-foreground">{DESCRIPTIONS[selected]?.blurb}</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SolarSystemMini;


