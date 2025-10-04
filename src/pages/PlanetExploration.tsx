import { useState } from 'react';
import Scene from '../components/3d/Scene';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PlanetExploration = () => {
  const [selectedPlanet, setSelectedPlanet] = useState('mars');
  const [explorationMode, setExplorationMode] = useState('surface');

  const planets = [
    {
      id: 'mars',
      name: 'Mars',
      color: '#cd853f',
      radius: 2,
      facts: {
        diameter: '6,779 km',
        gravity: '3.71 m/s²',
        atmosphere: '95.3% CO₂',
        temperature: '-80°C to 20°C'
      }
    },
    {
      id: 'moon',
      name: 'Moon',
      color: '#c0c0c0',
      radius: 1.5,
      facts: {
        diameter: '3,474 km',
        gravity: '1.62 m/s²',
        atmosphere: 'Very thin',
        temperature: '-173°C to 127°C'
      }
    },
    {
      id: 'europa',
      name: 'Europa',
      color: '#4da6ff',
      radius: 1.8,
      facts: {
        diameter: '3,122 km',
        gravity: '1.31 m/s²',
        atmosphere: 'Thin oxygen',
        temperature: '-160°C to -220°C'
      }
    },
    {
      id: 'titan',
      name: 'Titan',
      color: '#ffb366',
      radius: 2.2,
      facts: {
        diameter: '5,150 km',
        gravity: '1.35 m/s²',
        atmosphere: '95% nitrogen',
        temperature: '-179°C'
      }
    }
  ];

  const PlanetModel = ({ planet }: { planet: any }) => {
    return (
      <group>
        {/* Planet Surface */}
        <mesh>
          <sphereGeometry args={[planet.radius, 32, 32]} />
          <meshStandardMaterial color={planet.color} />
        </mesh>
        
        {/* Surface Features */}
        {planet.id === 'mars' && (
          <>
            {/* Polar Ice Caps */}
            <mesh position={[0, planet.radius * 0.9, 0]}>
              <sphereGeometry args={[planet.radius * 0.3, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, -planet.radius * 0.9, 0]}>
              <sphereGeometry args={[planet.radius * 0.3, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            
            {/* Olympus Mons */}
            <mesh position={[planet.radius * 0.7, 0, 0]}>
              <coneGeometry args={[0.3, 0.8]} />
              <meshStandardMaterial color="#8b4513" />
            </mesh>
          </>
        )}
        
        {planet.id === 'europa' && (
          <>
            {/* Ice Surface Cracks */}
            {Array.from({ length: 8 }, (_, i) => (
              <mesh 
                key={i}
                position={[
                  Math.cos(i * Math.PI / 4) * planet.radius * 0.8,
                  Math.sin(i * Math.PI / 4) * planet.radius * 0.8,
                  0
                ]}
                rotation={[0, 0, i * Math.PI / 4]}
              >
                <cylinderGeometry args={[0.02, 0.02, planet.radius]} />
                <meshStandardMaterial color="#001133" />
              </mesh>
            ))}
          </>
        )}
        
        {planet.id === 'titan' && (
          <>
            {/* Methane Lakes */}
            <mesh position={[planet.radius * 0.6, planet.radius * 0.6, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 0.1]} />
              <meshStandardMaterial color="#003366" />
            </mesh>
            <mesh position={[-planet.radius * 0.5, -planet.radius * 0.7, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.1]} />
              <meshStandardMaterial color="#003366" />
            </mesh>
          </>
        )}
      </group>
    );
  };

  const currentPlanet = planets.find(p => p.id === selectedPlanet);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Planet Surface Exploration</h1>
          <p className="text-xl text-gray-300">
            Explore the surfaces of different celestial bodies in our solar system
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* 3D Scene */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <Scene 
                    cameraPosition={[6, 4, 6]} 
                    showStars={true}
                    environment="space"
                  >
                    {currentPlanet && <PlanetModel planet={currentPlanet} />}
                  </Scene>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Select Planet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {planets.map((planet) => (
                    <Button
                      key={planet.id}
                      variant={selectedPlanet === planet.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedPlanet(planet.id)}
                    >
                      <div 
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: planet.color }}
                      />
                      {planet.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Exploration Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={explorationMode} onValueChange={setExplorationMode}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="surface">Surface</TabsTrigger>
                    <TabsTrigger value="orbit">Orbit</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="surface" className="mt-4">
                    <div className="space-y-2">
                      <Badge variant="secondary">Surface Exploration</Badge>
                      <p className="text-sm text-gray-300">
                        Explore surface features, geology, and terrain up close.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="orbit" className="mt-4">
                    <div className="space-y-2">
                      <Badge variant="secondary">Orbital View</Badge>
                      <p className="text-sm text-gray-300">
                        View the entire planet from space and observe global features.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {currentPlanet && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>{currentPlanet.name} Facts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Diameter:</span>
                      <span className="text-sm">{currentPlanet.facts.diameter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Gravity:</span>
                      <span className="text-sm">{currentPlanet.facts.gravity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Atmosphere:</span>
                      <span className="text-sm">{currentPlanet.facts.atmosphere}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Temperature:</span>
                      <span className="text-sm">{currentPlanet.facts.temperature}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Mission Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="bg-blue-900 p-2 rounded text-sm">
                    📡 Collect surface samples
                  </div>
                  <div className="bg-green-900 p-2 rounded text-sm">
                    🔬 Analyze geological features
                  </div>
                  <div className="bg-purple-900 p-2 rounded text-sm">
                    📸 Document discoveries
                  </div>
                  <div className="bg-orange-900 p-2 rounded text-sm">
                    🌡️ Monitor environmental data
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetExploration;