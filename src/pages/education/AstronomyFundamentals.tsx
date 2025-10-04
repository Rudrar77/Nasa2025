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

const AstronomyFundamentals = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1]);

  const lessons = [
    {
      id: 0,
      title: 'Stellar Classification',
      description: 'Understanding different types of stars',
      duration: '15 min',
      difficulty: 'Beginner'
    },
    {
      id: 1,
      title: 'Galaxy Types and Structure',
      description: 'Spiral, elliptical, and irregular galaxies',
      duration: '20 min',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Cosmology Basics',
      description: 'The Big Bang and universe expansion',
      duration: '25 min',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Observation Techniques',
      description: 'How astronomers study the universe',
      duration: '18 min',
      difficulty: 'Beginner'
    },
    {
      id: 4,
      title: 'Celestial Mechanics',
      description: 'How objects move in space',
      duration: '22 min',
      difficulty: 'Intermediate'
    }
  ];

  const StarSystemSimulation = () => {
    const starRef = useRef<THREE.Mesh>(null);
    const planetsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      
      // Rotate star
      if (starRef.current) {
        starRef.current.rotation.y = time * 0.2;
      }
      
      // Orbit planets
      if (planetsRef.current) {
        planetsRef.current.children.forEach((planet, index) => {
          const radius = 3 + index * 2;
          const speed = 0.5 - index * 0.1;
          planet.position.x = Math.cos(time * speed) * radius;
          planet.position.z = Math.sin(time * speed) * radius;
        });
      }
    });

    return (
      <group>
        {/* Central Star */}
        <mesh ref={starRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffaa00" />
        </mesh>
        
        {/* Planets */}
        <group ref={planetsRef}>
          {/* Planet 1 - Mercury-like */}
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#8c7853" />
          </mesh>
          
          {/* Planet 2 - Venus-like */}
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#ffc649" />
          </mesh>
          
          {/* Planet 3 - Earth-like */}
          <mesh>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color="#4a90e2" />
          </mesh>
          
          {/* Planet 4 - Mars-like */}
          <mesh>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#cd5c5c" />
          </mesh>
        </group>
        
        {/* Orbital paths */}
        {[3, 5, 7, 9].map((radius, index) => (
          <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 8, 64]} />
            <meshStandardMaterial color="#666666" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    );
  };

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const currentLessonData = lessons[currentLesson];
  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/education" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Education Hub
          </Link>
          <h1 className="text-4xl font-bold mb-4">🔭 Astronomy Fundamentals</h1>
          <p className="text-xl text-gray-300 mb-6">
            Master the basics of observational astronomy and understand our universe
          </p>
          
          <div className="flex items-center space-x-4 mb-6">
            <Badge variant="secondary">Beginner Level</Badge>
            <span className="text-gray-400">{lessons.length} Lessons</span>
            <span className="text-gray-400">Total: 100 minutes</span>
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
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="lesson">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="lesson">Current Lesson</TabsTrigger>
                <TabsTrigger value="simulation">3D Simulation</TabsTrigger>
                <TabsTrigger value="quiz">Knowledge Check</TabsTrigger>
              </TabsList>

              <TabsContent value="lesson">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{currentLessonData.title}</CardTitle>
                        <p className="text-gray-400 mt-2">{currentLessonData.description}</p>
                      </div>
                      <Badge variant={currentLessonData.difficulty === 'Beginner' ? 'secondary' : 'default'}>
                        {currentLessonData.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {currentLesson === 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Stellar Classification</h3>
                          <div className="space-y-4">
                            <p className="text-gray-300">
                              Stars are classified based on their temperature, color, and spectral characteristics. 
                              The main sequence includes several types:
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-blue-900 p-4 rounded">
                                <h4 className="font-semibold text-blue-300">O-Type Stars</h4>
                                <p className="text-sm text-gray-300">Very hot, blue, massive stars</p>
                                <p className="text-xs text-gray-400">Temperature: 30,000+ K</p>
                              </div>
                              
                              <div className="bg-cyan-900 p-4 rounded">
                                <h4 className="font-semibold text-cyan-300">B-Type Stars</h4>
                                <p className="text-sm text-gray-300">Hot, blue-white stars</p>
                                <p className="text-xs text-gray-400">Temperature: 10,000-30,000 K</p>
                              </div>
                              
                              <div className="bg-yellow-900 p-4 rounded">
                                <h4 className="font-semibold text-yellow-300">G-Type Stars</h4>
                                <p className="text-sm text-gray-300">Sun-like yellow stars</p>
                                <p className="text-xs text-gray-400">Temperature: 5,200-6,000 K</p>
                              </div>
                              
                              <div className="bg-red-900 p-4 rounded">
                                <h4 className="font-semibold text-red-300">M-Type Stars</h4>
                                <p className="text-sm text-gray-300">Cool, red dwarf stars</p>
                                <p className="text-xs text-gray-400">Temperature: 2,400-3,700 K</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentLesson === 1 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Galaxy Types and Structure</h3>
                          <div className="space-y-4">
                            <p className="text-gray-300">
                              Galaxies are massive collections of stars, gas, dust, and dark matter. 
                              They come in three main types:
                            </p>
                            
                            <div className="space-y-4">
                              <div className="bg-purple-900 p-4 rounded">
                                <h4 className="font-semibold text-purple-300">Spiral Galaxies</h4>
                                <p className="text-sm text-gray-300">
                                  Flat disks with spiral arms, like our Milky Way. Contains both old and young stars.
                                </p>
                              </div>
                              
                              <div className="bg-orange-900 p-4 rounded">
                                <h4 className="font-semibold text-orange-300">Elliptical Galaxies</h4>
                                <p className="text-sm text-gray-300">
                                  Oval-shaped with mostly old stars. Largest galaxies in the universe.
                                </p>
                              </div>
                              
                              <div className="bg-green-900 p-4 rounded">
                                <h4 className="font-semibold text-green-300">Irregular Galaxies</h4>
                                <p className="text-sm text-gray-300">
                                  No defined shape, often result of galactic collisions or interactions.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                          disabled={currentLesson === 0}
                        >
                          Previous Lesson
                        </Button>
                        
                        <Button 
                          onClick={() => {
                            completeLesson(currentLesson);
                            if (currentLesson < lessons.length - 1) {
                              setCurrentLesson(currentLesson + 1);
                            }
                          }}
                        >
                          {completedLessons.includes(currentLesson) ? 'Lesson Complete' : 'Complete Lesson'}
                        </Button>
                        
                        <Button 
                          variant="outline"
                          onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
                          disabled={currentLesson === lessons.length - 1}
                        >
                          Next Lesson
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="simulation">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Interactive Star System</CardTitle>
                    <p className="text-gray-400">
                      Observe how planets orbit around a star in this 3D simulation
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[500px] rounded-lg overflow-hidden">
                      <Scene cameraPosition={[12, 8, 12]} showStars={true} environment="night">
                        <StarSystemSimulation />
                      </Scene>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                      <p>Use mouse to rotate view. This demonstrates basic orbital mechanics and stellar systems.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quiz">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Knowledge Check</CardTitle>
                    <p className="text-gray-400">Test your understanding of astronomy fundamentals</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-700 p-4 rounded">
                        <h4 className="font-semibold mb-3">Question 1: What type of star is our Sun?</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">A) O-Type (Blue Giant)</Button>
                          <Button variant="outline" className="w-full justify-start">B) G-Type (Yellow Dwarf)</Button>
                          <Button variant="outline" className="w-full justify-start">C) M-Type (Red Dwarf)</Button>
                          <Button variant="outline" className="w-full justify-start">D) B-Type (Blue-White)</Button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 p-4 rounded">
                        <h4 className="font-semibold mb-3">Question 2: What type of galaxy is the Milky Way?</h4>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">A) Elliptical</Button>
                          <Button variant="outline" className="w-full justify-start">B) Spiral</Button>
                          <Button variant="outline" className="w-full justify-start">C) Irregular</Button>
                          <Button variant="outline" className="w-full justify-start">D) Lenticular</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Course Outline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className={`p-3 rounded cursor-pointer transition-colors ${
                        currentLesson === lesson.id 
                          ? 'bg-blue-900 border border-blue-500' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      onClick={() => setCurrentLesson(lesson.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{lesson.title}</span>
                        {completedLessons.includes(lesson.id) && (
                          <span className="text-green-400">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{lesson.duration}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Key Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="bg-blue-900 p-2 rounded text-sm">
                    🌟 Stellar Classification
                  </div>
                  <div className="bg-purple-900 p-2 rounded text-sm">
                    🌌 Galaxy Types
                  </div>
                  <div className="bg-green-900 p-2 rounded text-sm">
                    🔭 Observation Methods
                  </div>
                  <div className="bg-orange-900 p-2 rounded text-sm">
                    ⚡ Celestial Mechanics
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

export default AstronomyFundamentals;