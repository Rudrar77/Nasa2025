import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Scene from '../components/3d/Scene';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import * as THREE from 'three';

const MarsRoverExploration = () => {
  const [roverPosition, setRoverPosition] = useState({ x: 0, z: 0 });
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [selectedInstrument, setSelectedInstrument] = useState('camera');
  const [discoveries, setDiscoveries] = useState<string[]>([]);

  const instruments = [
    { id: 'camera', name: 'Mastcam-Z', description: 'Advanced color imaging system' },
    { id: 'laser', name: 'SuperCam', description: 'Laser spectrometer' },
    { id: 'drill', name: 'Drill System', description: 'Rock and soil sampling' },
    { id: 'radar', name: 'RIMFAX', description: 'Subsurface radar' }
  ];

  const MarsRover = () => {
    const roverRef = useRef<THREE.Group>(null);

    useFrame((state) => {
      if (roverRef.current) {
        roverRef.current.position.x = roverPosition.x;
        roverRef.current.position.z = roverPosition.z;
      }
    });

    return (
      <group ref={roverRef}>
        {/* Rover Body */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 0.8, 3]} />
          <meshStandardMaterial color="#c0c0c0" />
        </mesh>
        
        {/* Wheels */}
        {[-1, 1].map((x, i) => 
          [-1, 0, 1].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x * 1.2, 0, z * 1.2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.2]} />
              <meshStandardMaterial color="#2a2a2a" />
            </mesh>
          ))
        )}
        
        {/* Mast */}
        <mesh position={[0, 1.5, -0.5]}>
          <cylinderGeometry args={[0.1, 0.1, 1]} />
          <meshStandardMaterial color="#808080" />
        </mesh>
        
        {/* Camera */}
        <mesh position={[0, 2, -0.5]}>
          <boxGeometry args={[0.3, 0.2, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
    );
  };

  const MarsSurface = () => {
    return (
      <group>
        {/* Ground */}
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#cd853f" />
        </mesh>
        
        {/* Rocks */}
        {Array.from({ length: 20 }, (_, i) => (
          <mesh 
            key={i} 
            position={[
              (Math.random() - 0.5) * 40,
              Math.random() * 0.5,
              (Math.random() - 0.5) * 40
            ]}
          >
            <sphereGeometry args={[Math.random() * 0.5 + 0.2]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        ))}
      </group>
    );
  };

  const moveRover = (direction: string) => {
    const speed = 2;
    const newBattery = Math.max(0, batteryLevel - 2);
    setBatteryLevel(newBattery);
    
    setRoverPosition(prev => {
      switch (direction) {
        case 'forward':
          return { ...prev, z: prev.z - speed };
        case 'backward':
          return { ...prev, z: prev.z + speed };
        case 'left':
          return { ...prev, x: prev.x - speed };
        case 'right':
          return { ...prev, x: prev.x + speed };
        default:
          return prev;
      }
    });
  };

  const useInstrument = () => {
    const instrument = instruments.find(i => i.id === selectedInstrument);
    if (instrument && batteryLevel > 5) {
      setBatteryLevel(prev => Math.max(0, prev - 5));
      
      // Simulate discoveries
      const possibleDiscoveries = [
        'Mineral composition analyzed',
        'Rock sample collected',
        'Underground water detected',
        'Organic compounds found',
        'Ancient lake bed discovered'
      ];
      
      const discovery = possibleDiscoveries[Math.floor(Math.random() * possibleDiscoveries.length)];
      if (!discoveries.includes(discovery)) {
        setDiscoveries(prev => [...prev, discovery]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-red-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Mars Rover Exploration</h1>
          <p className="text-xl text-gray-300">
            Control the Perseverance rover and explore the Martian surface
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* 3D Scene */}
          <div className="lg:col-span-3">
            <Card className="bg-red-900 border-red-700">
              <CardContent className="p-0">
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <Scene 
                    cameraPosition={[10, 8, 10]} 
                    showStars={false}
                    environment="sunset"
                  >
                    <MarsSurface />
                    <MarsRover />
                  </Scene>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            <Card className="bg-red-900 border-red-700">
              <CardHeader>
                <CardTitle>Rover Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div></div>
                  <Button 
                    onClick={() => moveRover('forward')}
                    disabled={batteryLevel < 2}
                  >
                    ↑
                  </Button>
                  <div></div>
                  <Button 
                    onClick={() => moveRover('left')}
                    disabled={batteryLevel < 2}
                  >
                    ←
                  </Button>
                  <div></div>
                  <Button 
                    onClick={() => moveRover('right')}
                    disabled={batteryLevel < 2}
                  >
                    →
                  </Button>
                  <div></div>
                  <Button 
                    onClick={() => moveRover('backward')}
                    disabled={batteryLevel < 2}
                  >
                    ↓
                  </Button>
                  <div></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Battery Level</span>
                    <span>{batteryLevel}%</span>
                  </div>
                  <Progress value={batteryLevel} className="w-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-900 border-red-700">
              <CardHeader>
                <CardTitle>Scientific Instruments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {instruments.map((instrument) => (
                    <Button
                      key={instrument.id}
                      variant={selectedInstrument === instrument.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedInstrument(instrument.id)}
                    >
                      {instrument.name}
                    </Button>
                  ))}
                </div>
                
                <Button 
                  onClick={useInstrument}
                  disabled={batteryLevel < 5}
                  className="w-full"
                >
                  Use Instrument
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-red-900 border-red-700">
              <CardHeader>
                <CardTitle>Discoveries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {discoveries.length === 0 ? (
                    <p className="text-sm text-gray-300">No discoveries yet</p>
                  ) : (
                    discoveries.map((discovery, index) => (
                      <div key={index} className="bg-red-800 p-2 rounded text-sm">
                        {discovery}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarsRoverExploration;