import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Play, 
  Star, 
  Rocket, 
  Globe, 
  Telescope, 
  Atom,
  GraduationCap,
  Video,
  CheckCircle,
  Lock
} from "lucide-react";

interface VideoLesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed?: boolean;
  locked?: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  lessons: VideoLesson[];
  progress: number;
}

const Education = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('astronomy');
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());

  const courses: Course[] = [
    {
      id: 'astronomy',
      title: 'Astronomy Fundamentals',
      description: 'Learn the basics of stars, planets, and galaxies',
      icon: Telescope,
      color: 'purple',
      progress: 35,
      lessons: [
        {
          id: 'ast-1',
          title: 'Introduction to the Universe',
          description: 'Understanding the scale and structure of the cosmos',
          videoUrl: 'https://www.youtube.com/embed/HEheh1BH34Q',
          thumbnailUrl: 'https://img.youtube.com/vi/HEheh1BH34Q/maxresdefault.jpg',
          difficulty: 'Beginner'
        },
        {
          id: 'ast-2',
          title: 'Our Solar System',
          description: 'Exploring planets, moons, and other celestial bodies',
          videoUrl: 'https://www.youtube.com/embed/libKVRa01L8',
          thumbnailUrl: 'https://img.youtube.com/vi/libKVRa01L8/maxresdefault.jpg',
          difficulty: 'Beginner'
        },
        {
          id: 'ast-3',
          title: 'Stars and Stellar Evolution',
          description: 'How stars are born, live, and die',
          videoUrl: 'https://www.youtube.com/embed/PM9CQDlQI0A',
          thumbnailUrl: 'https://img.youtube.com/vi/PM9CQDlQI0A/maxresdefault.jpg',
          difficulty: 'Intermediate'
        },
        {
          id: 'ast-4',
          title: 'Galaxies and Dark Matter',
          description: 'Understanding galactic structures and mysterious dark matter',
          videoUrl: 'https://www.youtube.com/embed/QAa2O_8wBUQ',
          thumbnailUrl: 'https://img.youtube.com/vi/QAa2O_8wBUQ/maxresdefault.jpg',
          difficulty: 'Advanced'
        },
        {
          id: 'ast-5',
          title: 'Exoplanets and the Search for Life',
          description: 'Discovering worlds beyond our solar system',
          videoUrl: 'https://www.youtube.com/embed/yDmGnGUEHUU',
          thumbnailUrl: 'https://img.youtube.com/vi/yDmGnGUEHUU/maxresdefault.jpg',
          difficulty: 'Intermediate'
        },
        {
          id: 'ast-6',
          title: 'Black Holes and Spacetime',
          description: 'Exploring the most mysterious objects in the universe',
          videoUrl: 'https://www.youtube.com/embed/e-P5IFTqB98',
          thumbnailUrl: 'https://img.youtube.com/vi/e-P5IFTqB98/maxresdefault.jpg',
          difficulty: 'Advanced',
          locked: true
        }
      ]
    },
    {
      id: 'rocket-science',
      title: 'Rocket Science & Propulsion',
      description: 'Master the physics of space travel',
      icon: Rocket,
      color: 'blue',
      progress: 20,
      lessons: [
        {
          id: 'rs-1',
          title: 'Rocket Principles',
          description: 'Newton\'s laws and basic rocket physics',
          videoUrl: 'https://www.youtube.com/embed/DKtVpvzUF1Y',
          thumbnailUrl: 'https://img.youtube.com/vi/DKtVpvzUF1Y/maxresdefault.jpg',
          difficulty: 'Beginner'
        },
        {
          id: 'rs-2',
          title: 'Chemical Propulsion',
          description: 'How chemical rockets work and fuel types',
          videoUrl: 'https://www.youtube.com/embed/h075YGecrcA',
          thumbnailUrl: 'https://img.youtube.com/vi/h075YGecrcA/maxresdefault.jpg',
          difficulty: 'Intermediate'
        },
        {
          id: 'rs-3',
          title: 'Orbital Mechanics',
          description: 'Understanding orbits, gravity, and trajectories',
          videoUrl: 'https://www.youtube.com/embed/Am7eHyJkjyg',
          thumbnailUrl: 'https://img.youtube.com/vi/Am7eHyJkjyg/maxresdefault.jpg',
          difficulty: 'Intermediate'
        },
        {
          id: 'rs-4',
          title: 'SpaceX and Modern Rockets',
          description: 'Revolutionary reusable rocket technology',
          videoUrl: 'https://www.youtube.com/embed/A0FZIwabctw',
          thumbnailUrl: 'https://img.youtube.com/vi/A0FZIwabctw/maxresdefault.jpg',
          difficulty: 'Advanced'
        },
        {
          id: 'rs-5',
          title: 'Future Propulsion Technologies',
          description: 'Ion drives, nuclear propulsion, and beyond',
          videoUrl: 'https://www.youtube.com/embed/EzZGPCyrpSU',
          thumbnailUrl: 'https://img.youtube.com/vi/EzZGPCyrpSU/maxresdefault.jpg',
          difficulty: 'Advanced',
          locked: true
        }
      ]
    },
    {
      id: 'planetary-science',
      title: 'Planetary Science',
      description: 'Explore worlds in our solar system and beyond',
      icon: Globe,
      color: 'green',
      progress: 60,
      lessons: [
        {
          id: 'ps-1',
          title: 'Formation of Planets',
          description: 'How planets form from stellar nebulae',
          videoUrl: 'https://www.youtube.com/embed/ytHdkHb2nT4',
          thumbnailUrl: 'https://img.youtube.com/vi/ytHdkHb2nT4/maxresdefault.jpg',
          difficulty: 'Beginner'
        },
        {
          id: 'ps-3',
          title: 'The Moons of Jupiter',
          description: 'Europa, Io, Ganymede, and Callisto',
          videoUrl: 'https://www.youtube.com/embed/h075YGecrcA',
          thumbnailUrl: 'https://img.youtube.com/vi/h075YGecrcA/maxresdefault.jpg',
          difficulty: 'Intermediate'
        },
        {
          id: 'ps-4',
          title: 'Titan and Saturn\'s Rings',
          description: 'Exploring Saturn\'s mysterious moon and ring system',
          videoUrl: 'https://www.youtube.com/embed/jYt_Ki0E0_s',
          thumbnailUrl: 'https://img.youtube.com/vi/jYt_Ki0E0_s/maxresdefault.jpg',
          difficulty: 'Advanced'
        }
      ]
    },
    {
      id: 'space-physics',
      title: 'Space Physics',
      description: 'Understanding the fundamental physics of space',
      icon: Atom,
      color: 'red',
      progress: 10,
      lessons: [
        {
          id: 'sp-1',
          title: 'Einstein\'s Relativity',
          description: 'Special and general relativity explained',
          videoUrl: 'https://www.youtube.com/embed/Bg_tJvCA8zw',
          thumbnailUrl: 'https://img.youtube.com/vi/Bg_tJvCA8zw/maxresdefault.jpg',
          difficulty: 'Advanced'
        },
        {
          id: 'sp-2',
          title: 'Quantum Mechanics in Space',
          description: 'How quantum physics applies to cosmology',
          videoUrl: 'https://www.youtube.com/embed/7u_UQG1La1o',
          thumbnailUrl: 'https://img.youtube.com/vi/7u_UQG1La1o/maxresdefault.jpg',
          difficulty: 'Advanced'
        },
        {
          id: 'sp-3',
          title: 'Particle Physics and Cosmic Rays',
          description: 'High-energy particles from space',
          videoUrl: 'https://www.youtube.com/embed/AwhBz3K7k_8',
          thumbnailUrl: 'https://img.youtube.com/vi/AwhBz3K7k_8/maxresdefault.jpg',
          difficulty: 'Advanced',
          locked: true
        }
      ]
    }
  ];

  const selectedCourseData = courses.find(course => course.id === selectedCourse) || courses[0];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const markVideoAsWatched = (videoId: string) => {
    setWatchedVideos(prev => new Set([...prev, videoId]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center">
            <GraduationCap className="h-12 w-12 mr-4 text-blue-400" />
            Space Education Center
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Master the wonders of space science through comprehensive video courses 
            designed by NASA experts and leading astronomers
          </p>
        </div>

        <Tabs value={selectedCourse} onValueChange={setSelectedCourse} className="w-full">
          {/* Course Selection */}
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {courses.map((course) => (
              <TabsTrigger 
                key={course.id} 
                value={course.id}
                className="flex flex-col items-center p-4 h-auto"
              >
                <course.icon className={`h-6 w-6 mb-2 text-${course.color}-400`} />
                <span className="text-sm font-medium">{course.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Course Content */}
          {courses.map((course) => (
            <TabsContent key={course.id} value={course.id} className="space-y-6">
              {/* Course Overview */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-${course.color}-500/20`}>
                        <course.icon className={`h-8 w-8 text-${course.color}-400`} />
                      </div>
                      <div>
                        <CardTitle className="text-white text-2xl">{course.title}</CardTitle>
                        <CardDescription className="text-gray-300 text-lg">
                          {course.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{course.lessons.length} lessons</p>
                      <p className="text-gray-400 text-sm">Video Course</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Course Progress</span>
                        <span className="text-white">{course.progress}% Complete</span>
                      </div>
                      <Progress value={course.progress} className="w-full" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">Lessons:</span>
                        <span className="text-white font-semibold">{course.lessons.length}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-gray-300">Difficulty:</span>
                        <span className="text-white font-semibold">Mixed Levels</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Video className="h-4 w-4 text-purple-400" />
                        <span className="text-gray-300">Format:</span>
                        <span className="text-white font-semibold">HD Videos</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Lessons */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Video className="h-6 w-6 mr-3 text-purple-400" />
                  Video Lessons
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {course.lessons.map((lesson, index) => (
                    <Card 
                      key={lesson.id} 
                      className={`bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 ${
                        lesson.locked ? 'opacity-60' : 'hover:scale-105'
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-gray-400 text-sm">Lesson {index + 1}</span>
                              <Badge className={getDifficultyColor(lesson.difficulty)}>
                                {lesson.difficulty}
                              </Badge>
                              {watchedVideos.has(lesson.id) && (
                                <CheckCircle className="h-4 w-4 text-green-400" />
                              )}
                              {lesson.locked && (
                                <Lock className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                            <CardTitle className="text-white text-lg mb-2">
                              {lesson.title}
                            </CardTitle>
                            <CardDescription className="text-gray-300">
                              {lesson.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-2">
                        {/* Video Thumbnail */}
                        <div className="relative mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={lesson.thumbnailUrl} 
                            alt={lesson.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            {lesson.locked ? (
                              <Lock className="h-12 w-12 text-gray-400" />
                            ) : (
                              <Play className="h-12 w-12 text-white" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          {lesson.locked ? (
                            <Button variant="outline" disabled className="opacity-50 w-full">
                              <Lock className="h-4 w-4 mr-2" />
                              Locked
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => markVideoAsWatched(lesson.id)}
                              className={`w-full ${
                                watchedVideos.has(lesson.id) 
                                  ? 'bg-green-600 hover:bg-green-700' 
                                  : 'bg-blue-600 hover:bg-blue-700'
                              }`}
                            >
                              {watchedVideos.has(lesson.id) ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Completed
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Watch Now
                                </>
                              )}
                            </Button>
                          )}
                        </div>

                        {/* Video Player (shown when watching) */}
                        {watchedVideos.has(lesson.id) && (
                          <div className="mt-4">
                            <iframe
                              width="100%"
                              height="250"
                              src={lesson.videoUrl}
                              title={lesson.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg"
                            ></iframe>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Course Statistics */}
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-400">
                        {course.lessons.filter(l => !l.locked).length}
                      </p>
                      <p className="text-gray-300 text-sm">Available Lessons</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-400">
                        {Array.from(watchedVideos).filter(id => 
                          course.lessons.some(lesson => lesson.id === id)
                        ).length}
                      </p>
                      <p className="text-gray-300 text-sm">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-yellow-400">
                        {course.lessons.length}
                      </p>
                      <p className="text-gray-300 text-sm">Total Lessons</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-400">
                        {course.progress}%
                      </p>
                      <p className="text-gray-300 text-sm">Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Access Links */}
        <div className="mt-12">
          <Separator className="bg-white/20 mb-8" />
          <h3 className="text-2xl font-bold text-white text-center mb-6">Explore More</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="h-20 flex-col border-white/20 text-white hover:bg-white/10">
              <Link to="/quiz">
                <GraduationCap className="h-6 w-6 mb-2" />
                Take Quiz
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col border-white/20 text-white hover:bg-white/10">
              <Link to="/solar-system">
                <Globe className="h-6 w-6 mb-2" />
                3D Solar System
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col border-white/20 text-white hover:bg-white/10">
              <Link to="/real-time-data">
                <Telescope className="h-6 w-6 mb-2" />
                Live Space Data
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;