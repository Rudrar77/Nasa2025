import { useState } from 'react';
import Scene from '../components/3d/Scene';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ISSVirtualTour = () => {
  const [currentModule, setCurrentModule] = useState('cupola');
  const [isPlaying, setIsPlaying] = useState(false);

  const modules = [
    { id: 'cupola', name: 'Cupola Observatory', description: 'Seven-windowed observatory module' },
    { id: 'unity', name: 'Unity Node', description: 'Central connecting hub' },
    { id: 'destiny', name: 'Destiny Laboratory', description: 'US research laboratory' },
    { id: 'columbus', name: 'Columbus Laboratory', description: 'European research facility' },
    { id: 'kibo', name: 'Kibo Laboratory', description: 'Japanese experiment module' }
  ];

  const ISSModel = () => {
    return (
      <group>
        {/* ISS Solar Panels */}
        <mesh position={[-8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.1, 12, 6]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.1, 12, 6]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        
        {/* Main ISS Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 8]} />
          <meshStandardMaterial color="#c0c0c0" />
        </mesh>
        
        {/* Cupola Module */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[0.8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
        
        {/* Docking Ports */}
        <mesh position={[0, 0, 4.5]}>
          <cylinderGeometry args={[0.8, 0.8, 1]} />
          <meshStandardMaterial color="#808080" />
        </mesh>
      </group>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">ISS Virtual Tour</h1>
          <p className="text-xl text-gray-300">
            Explore the International Space Station in stunning 3D detail
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* 3D Scene */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <Scene cameraPosition={[15, 10, 15]} showStars={true}>
                    <ISSModel />
                  </Scene>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>ISS Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {modules.map((module) => (
                    <Button
                      key={module.id}
                      variant={currentModule === module.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setCurrentModule(module.id)}
                    >
                      {module.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Current Module</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary">
                    {modules.find(m => m.id === currentModule)?.name}
                  </Badge>
                  <p className="text-sm text-gray-300">
                    {modules.find(m => m.id === currentModule)?.description}
                  </p>
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-full"
                  >
                    {isPlaying ? 'Pause Tour' : 'Start Tour'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>ISS Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Altitude:</strong> ~408 km</p>
                  <p><strong>Speed:</strong> 27,600 km/h</p>
                  <p><strong>Orbit Period:</strong> 93 minutes</p>
                  <p><strong>Crew Size:</strong> 3-6 astronauts</p>
                  <p><strong>Solar Panel Area:</strong> 2,500 m²</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISSVirtualTour;