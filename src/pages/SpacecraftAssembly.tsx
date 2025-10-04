import { useState } from 'react';
import Scene from '../components/3d/Scene';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const SpacecraftAssembly = () => {
  const [assembledParts, setAssembledParts] = useState<string[]>([]);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [assemblyProgress, setAssemblyProgress] = useState(0);

  const spacecraftParts = [
    { id: 'command-module', name: 'Command Module', required: true, color: '#c0c0c0' },
    { id: 'service-module', name: 'Service Module', required: true, color: '#808080' },
    { id: 'solar-panels', name: 'Solar Panels', required: true, color: '#1a1a2e' },
    { id: 'heat-shield', name: 'Heat Shield', required: true, color: '#8b4513' },
    { id: 'communications', name: 'Communications Array', required: true, color: '#ffd700' },
    { id: 'thrusters', name: 'Maneuvering Thrusters', required: true, color: '#ff6b6b' },
    { id: 'docking-port', name: 'Docking Port', required: false, color: '#4ecdc4' },
    { id: 'cargo-bay', name: 'Cargo Bay', required: false, color: '#45b7d1' }
  ];

  const SpacecraftModel = () => {
    return (
      <group>
        {/* Command Module */}
        {assembledParts.includes('command-module') && (
          <mesh position={[0, 2, 0]}>
            <coneGeometry args={[1, 2]} />
            <meshStandardMaterial color="#c0c0c0" />
          </mesh>
        )}
        
        {/* Service Module */}
        {assembledParts.includes('service-module') && (
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 3]} />
            <meshStandardMaterial color="#808080" />
          </mesh>
        )}
        
        {/* Solar Panels */}
        {assembledParts.includes('solar-panels') && (
          <>
            <mesh position={[-3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.1, 4, 2]} />
              <meshStandardMaterial color="#1a1a2e" />
            </mesh>
            <mesh position={[3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.1, 4, 2]} />
              <meshStandardMaterial color="#1a1a2e" />
            </mesh>
          </>
        )}
        
        {/* Heat Shield */}
        {assembledParts.includes('heat-shield') && (
          <mesh position={[0, -2, 0]}>
            <cylinderGeometry args={[2, 1.5, 0.3]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        )}
        
        {/* Communications Array */}
        {assembledParts.includes('communications') && (
          <mesh position={[0, 3.5, 0]}>
            <sphereGeometry args={[0.3]} />
            <meshStandardMaterial color="#ffd700" />
          </mesh>
        )}
        
        {/* Thrusters */}
        {assembledParts.includes('thrusters') && (
          <>
            {[0, 1, 2, 3].map((i) => (
              <mesh 
                key={i}
                position={[
                  Math.cos(i * Math.PI / 2) * 1.8,
                  -1.8,
                  Math.sin(i * Math.PI / 2) * 1.8
                ]}
              >
                <cylinderGeometry args={[0.1, 0.1, 0.5]} />
                <meshStandardMaterial color="#ff6b6b" />
              </mesh>
            ))}
          </>
        )}
        
        {/* Docking Port */}
        {assembledParts.includes('docking-port') && (
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.5]} />
            <meshStandardMaterial color="#4ecdc4" />
          </mesh>
        )}
        
        {/* Cargo Bay */}
        {assembledParts.includes('cargo-bay') && (
          <mesh position={[0, -0.5, 2]}>
            <boxGeometry args={[2, 2, 1]} />
            <meshStandardMaterial color="#45b7d1" />
          </mesh>
        )}
      </group>
    );
  };

  const addPart = (partId: string) => {
    if (!assembledParts.includes(partId)) {
      const newAssembledParts = [...assembledParts, partId];
      setAssembledParts(newAssembledParts);
      
      const requiredParts = spacecraftParts.filter(p => p.required);
      const assembledRequiredParts = newAssembledParts.filter(p => 
        requiredParts.some(rp => rp.id === p)
      );
      
      setAssemblyProgress((assembledRequiredParts.length / requiredParts.length) * 100);
    }
  };

  const removePart = (partId: string) => {
    const newAssembledParts = assembledParts.filter(p => p !== partId);
    setAssembledParts(newAssembledParts);
    
    const requiredParts = spacecraftParts.filter(p => p.required);
    const assembledRequiredParts = newAssembledParts.filter(p => 
      requiredParts.some(rp => rp.id === p)
    );
    
    setAssemblyProgress((assembledRequiredParts.length / requiredParts.length) * 100);
  };

  const resetAssembly = () => {
    setAssembledParts([]);
    setAssemblyProgress(0);
    setSelectedPart(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Spacecraft Assembly Simulator</h1>
          <p className="text-xl text-gray-300">
            Build your own spacecraft by assembling different components
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* 3D Scene */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <Scene cameraPosition={[8, 6, 8]} showStars={true}>
                    <SpacecraftModel />
                  </Scene>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Assembly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span>{Math.round(assemblyProgress)}%</span>
                  </div>
                  <Progress value={assemblyProgress} className="w-full" />
                  <p className="text-xs text-gray-400">
                    {assembledParts.length} of {spacecraftParts.length} parts assembled
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Available Parts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {spacecraftParts.map((part) => (
                    <div key={part.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: part.color }}
                        />
                        <span className="text-sm">{part.name}</span>
                        {part.required && <Badge variant="secondary">Required</Badge>}
                      </div>
                      <div className="flex space-x-1">
                        {!assembledParts.includes(part.id) ? (
                          <Button
                            size="sm"
                            onClick={() => addPart(part.id)}
                          >
                            Add
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removePart(part.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <Button 
                    onClick={resetAssembly}
                    variant="outline"
                    className="w-full"
                  >
                    Reset Assembly
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Mission Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {assemblyProgress === 100 ? (
                    <div className="bg-green-900 p-3 rounded">
                      <p className="text-green-300 font-semibold">
                        🚀 Spacecraft Ready for Launch!
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        All required components assembled successfully.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-yellow-900 p-3 rounded">
                      <p className="text-yellow-300 font-semibold">
                        🔧 Assembly in Progress
                      </p>
                      <p className="text-xs text-yellow-400 mt-1">
                        Add all required parts to complete the spacecraft.
                      </p>
                    </div>
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

export default SpacecraftAssembly;