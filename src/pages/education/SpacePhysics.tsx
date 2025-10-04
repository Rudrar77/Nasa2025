import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import Scene from '../../components/3d/Scene';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SpacePhysics = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([0]);

  const modules = [
    {
      id: 0,
      title: 'Gravity and Orbital Mechanics',
      description: 'Understanding gravitational forces and orbital dynamics',
      duration: '30 min',
      difficulty: 'Intermediate'
    },
    {
      id: 1,
      title: 'Electromagnetic Forces in Space',
      description: 'How electromagnetic fields affect spacecraft',
      duration: '25 min',
      difficulty: 'Advanced'
    },
    {
      id: 2,
      title: 'Radiation and Plasma Physics',
      description: 'Space radiation and plasma interactions',
      duration: '35 min',
      difficulty: 'Advanced'
    },
    {
      id: 3,
      title: 'Thermodynamics in Space',
      description: 'Heat transfer and temperature in vacuum',
      duration: '20 min',
      difficulty: 'Intermediate'
    }
  ];

  const GravitySimulation = () => {
    const earthRef = useRef<THREE.Mesh>(null);
    const satelliteRef = useRef<THREE.Mesh>(null);
    const forceLineRef = useRef<THREE.BufferGeometry>(null);

    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      
      if (earthRef.current) {
        earthRef.current.rotation.y = time * 0.1;
      }
      
      if (satelliteRef.current) {
        const radius = 4;
        satelliteRef.current.position.x = Math.cos(time * 0.5) * radius;
        satelliteRef.current.position.z = Math.sin(time * 0.5) * radius;
        satelliteRef.current.position.y = Math.sin(time * 0.3) * 0.5;
      }
    });

    return (
      <group>
        {/* Earth */}
        <mesh ref={earthRef}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#4a90e2" />
        </mesh>
        
        {/* Satellite */}
        <mesh ref={satelliteRef} position={[4, 0, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.5]} />
          <meshStandardMaterial color="#c0c0c0" />
        </mesh>
        
        {/* Orbital Path */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.02, 8, 64]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
        
        {/* Gravity Well Visualization */}
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[3, 1, 32]} />
          <meshStandardMaterial 
            color="#ff6b6b" 
            transparent 
            opacity={0.2} 
            wireframe={true}
          />
        </mesh>
      </group>
    );
  };

  const progress = (completedModules.length / modules.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/education" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Education Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">⚛️ Space Physics Explained</h1>
          <p className="text-xl text-gray-300 mb-6">
            Master the fundamental physics principles that govern space exploration
          </p>
          
          <div className="flex items-center space-x-4 mb-6">
            <Badge variant="destructive">Advanced Level</Badge>
            <span className="text-gray-400">{modules.length} Modules</span>
            <span className="text-gray-400">Total: 110 minutes</span>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Course Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="lesson">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="lesson">Physics Concepts</TabsTrigger>
                <TabsTrigger value="simulation">Interactive Demo</TabsTrigger>
                <TabsTrigger value="equations">Equations & Math</TabsTrigger>
              </TabsList>

              <TabsContent value="lesson">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-2xl">{modules[currentModule].title}</CardTitle>
                    <p className="text-gray-400">{modules[currentModule].description}</p>
                  </CardHeader>
                  <CardContent>
                    {currentModule === 0 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Gravity and Orbital Mechanics</h3>
                        <div className="space-y-4">
                          <p className="text-gray-300">
                            Gravity is the fundamental force that governs orbital motion. 
                            Newton's law of universal gravitation describes the attractive force 
                            between any two masses.
                          </p>
                          
                          <div className="bg-blue-900 p-4 rounded">
                            <h4 className="font-semibold text-blue-300 mb-2">Key Concepts:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Gravitational force decreases with distance squared</li>
                              <li>Orbital velocity depends on mass and distance</li>
                              <li>Elliptical orbits follow Kepler's laws</li>
                              <li>Escape velocity needed to leave gravitational influence</li>
                            </ul>
                          </div>
                          
                          <div className="bg-green-900 p-4 rounded">
                            <h4 className="font-semibold text-green-300 mb-2">Applications:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              <li>Satellite deployment and station-keeping</li>
                              <li>Interplanetary trajectory planning</li>
                              <li>Gravity assist maneuvers</li>
                              <li>Tidal forces on spacecraft</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="simulation">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Gravity and Orbital Motion Demo</CardTitle>
                    <p className="text-gray-400">
                      Interactive visualization of gravitational forces and orbital mechanics
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[500px] rounded-lg overflow-hidden">
                      <Scene cameraPosition={[8, 6, 8]} showStars={true} environment="night">
                        <GravitySimulation />
                      </Scene>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                      <p>The red wireframe represents the gravity well. Notice how the satellite follows an elliptical orbit.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equations">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Mathematical Foundations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-gray-700 p-4 rounded">
                        <h4 className="font-semibold mb-2">Newton's Law of Universal Gravitation</h4>
                        <div className="bg-black p-3 rounded font-mono text-center">
                          F = G × (m₁ × m₂) / r²
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Where F is force, G is gravitational constant, m₁ and m₂ are masses, r is distance
                        </p>
                      </div>
                      
                      <div className="bg-gray-700 p-4 rounded">
                        <h4 className="font-semibold mb-2">Orbital Velocity</h4>
                        <div className="bg-black p-3 rounded font-mono text-center">
                          v = √(GM/r)
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Circular orbital velocity depends on central mass M and orbital radius r
                        </p>
                      </div>
                      
                      <div className="bg-gray-700 p-4 rounded">
                        <h4 className="font-semibold mb-2">Escape Velocity</h4>
                        <div className="bg-black p-3 rounded font-mono text-center">
                          v_escape = √(2GM/r)
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          Minimum velocity needed to escape gravitational influence
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Module Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {modules.map((module) => (
                    <div 
                      key={module.id}
                      className={`p-3 rounded cursor-pointer transition-colors ${
                        currentModule === module.id 
                          ? 'bg-blue-900 border border-blue-500' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      onClick={() => setCurrentModule(module.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{module.title}</span>
                        {completedModules.includes(module.id) && (
                          <span className="text-green-400">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{module.duration}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacePhysics;