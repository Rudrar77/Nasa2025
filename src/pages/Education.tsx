import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedBackground from "@/components/ui/animated-background";
import { 
  BookOpen, 
  Play, 
  Award, 
  Users, 
  Star,
  Rocket,
  Globe,
  Telescope,
  Atom,
  Zap,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  ExternalLink
} from "lucide-react";

const Education = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      title: "Introduction to Space Exploration",
      description: "Learn the fundamentals of space exploration, from early rockets to modern missions.",
      category: "basics",
      level: "Beginner",
      icon: <Rocket className="h-6 w-6" />,
      progress: 0,
      videos: [
        {
          id: 1,
          title: "What is Space Exploration?",
          url: "https://www.youtube.com/watch?v=VFSXtFmNC7s",
          completed: false,
          description: "Introduction to the concept of space exploration and its importance"
        },
        {
          id: 2,
          title: "History of Rockets",
          url: "https://www.youtube.com/watch?v=dlo3rBb7Ev0",
          completed: false,
          description: "From ancient Chinese rockets to modern SpaceX"
        },
        {
          id: 3,
          title: "The Space Race",
          url: "https://www.youtube.com/watch?v=xvaEvCNZymo",
          completed: false,
          description: "Competition between USA and USSR in space exploration"
        },
        {
          id: 4,
          title: "Modern Space Missions",
          url: "https://www.youtube.com/watch?v=oHHSSJDJ4oo",
          completed: false,
          description: "Current and future space exploration missions"
        },
        {
          id: 5,
          title: "International Space Station",
          url: "https://www.youtube.com/watch?v=SGP6Y0Pnhe4",
          completed: false,
          description: "Life and research aboard the ISS"
        },
        {
          id: 6,
          title: "Mars Exploration",
          url: "https://www.youtube.com/watch?v=P6MOnehCOUw",
          completed: false,
          description: "Rovers, missions, and future human exploration of Mars"
        },
        {
          id: 7,
          title: "Private Space Companies",
          url: "https://www.youtube.com/watch?v=zqE-ultsWt0",
          completed: false,
          description: "SpaceX, Blue Origin, and the commercial space revolution"
        },
        {
          id: 8,
          title: "Future of Space Exploration",
          url: "https://www.youtube.com/watch?v=t705r8ICkRw",
          completed: false,
          description: "What's next for humanity in space?"
        }
      ]
    },
    {
      id: 2,
      title: "Solar System Deep Dive",
      description: "Explore planets, moons, and other celestial bodies in our solar system.",
      category: "astronomy",
      level: "Intermediate",
      icon: <Globe className="h-6 w-6" />,
      progress: 0,
      videos: [
        {
          id: 1,
          title: "Our Solar System Overview",
          url: "https://www.youtube.com/watch?v=libKVRa01L8",
          completed: false,
          description: "Formation and structure of our solar system"
        },
        {
          id: 2,
          title: "The Sun - Our Star",
          url: "https://www.youtube.com/watch?v=6tmbeLTHC_0",
          completed: false,
          description: "Understanding solar physics and solar activity"
        },
        {
          id: 3,
          title: "Mercury and Venus",
          url: "https://www.youtube.com/watch?v=0rHUDWjR5gg",
          completed: false,
          description: "The innermost planets and their extreme conditions"
        },
        {
          id: 4,
          title: "Earth - Our Blue Planet",
          url: "https://www.youtube.com/watch?v=HCDVN7DCzYE",
          completed: false,
          description: "What makes Earth unique and habitable"
        },
        {
          id: 5,
          title: "Mars - The Red Planet",
          url: "https://www.youtube.com/watch?v=D8pnmwOXhoY",
          completed: false,
          description: "Geology, atmosphere, and potential for life on Mars"
        },
        {
          id: 6,
          title: "Jupiter - King of Planets",
          url: "https://www.youtube.com/watch?v=PtkqwslbLY8",
          completed: false,
          description: "The gas giant and its fascinating moons"
        },
        {
          id: 7,
          title: "Saturn and Its Rings",
          url: "https://www.youtube.com/watch?v=epZdZaEQhS0",
          completed: false,
          description: "The ringed planet and moon Titan"
        },
        {
          id: 8,
          title: "Uranus and Neptune",
          url: "https://www.youtube.com/watch?v=NStn7zZKXfE",
          completed: false,
          description: "The ice giants of the outer solar system"
        },
        {
          id: 9,
          title: "Asteroids and Comets",
          url: "https://www.youtube.com/watch?v=S_d-gs0WoUw",
          completed: false,
          description: "Small bodies and their role in solar system formation"
        },
        {
          id: 10,
          title: "Moons of the Solar System",
          url: "https://www.youtube.com/watch?v=BNdLR6mI1a0",
          completed: false,
          description: "Fascinating satellites and their unique characteristics"
        }
      ]
    },
    {
      id: 3,
      title: "Telescope Technology",
      description: "Understanding how telescopes work and their role in space discoveries.",
      category: "technology",
      level: "Beginner",
      icon: <Telescope className="h-6 w-6" />,
      progress: 0,
      videos: [
        {
          id: 1,
          title: "How Telescopes Work",
          url: "https://www.youtube.com/watch?v=VB3UvkUVaDY",
          completed: false,
          description: "Basic principles of optical telescopes"
        },
        {
          id: 2,
          title: "Types of Telescopes",
          url: "https://www.youtube.com/watch?v=rB7jUvpQlQg",
          completed: false,
          description: "Refractors, reflectors, and compound telescopes"
        },
        {
          id: 3,
          title: "Space Telescopes vs Ground-based",
          url: "https://www.youtube.com/watch?v=GfKUzPJwB4Q",
          completed: false,
          description: "Advantages and limitations of different telescope locations"
        },
        {
          id: 4,
          title: "Hubble Space Telescope",
          url: "https://www.youtube.com/watch?v=tf7IEVTDjng",
          completed: false,
          description: "The most famous space telescope and its discoveries"
        },
        {
          id: 5,
          title: "James Webb Space Telescope",
          url: "https://www.youtube.com/watch?v=4P8fKd0IVOs",
          completed: false,
          description: "The next generation infrared space observatory"
        },
        {
          id: 6,
          title: "Radio Telescopes and SETI",
          url: "https://www.youtube.com/watch?v=EF8GhC-T_Mo",
          completed: false,
          description: "Listening to the cosmos and searching for alien signals"
        }
      ]
    },
    {
      id: 4,
      title: "Physics of Space Travel",
      description: "The science behind rockets, orbits, and interplanetary travel.",
      category: "physics",
      level: "Advanced",
      icon: <Atom className="h-6 w-6" />,
      progress: 0,
      videos: [
        {
          id: 1,
          title: "Newton's Laws in Space",
          url: "https://www.youtube.com/watch?v=NjSISL_GKkY",
          completed: false,
          description: "How Newton's laws govern motion in space"
        },
        {
          id: 2,
          title: "Rocket Propulsion Basics",
          url: "https://www.youtube.com/watch?v=RMpzdHzJBzw",
          completed: false,
          description: "The physics behind rocket engines"
        },
        {
          id: 3,
          title: "Orbital Mechanics",
          url: "https://www.youtube.com/watch?v=Am2V5zKpV_8",
          completed: false,
          description: "Understanding orbits, velocity, and gravitational forces"
        },
        {
          id: 4,
          title: "Escape Velocity",
          url: "https://www.youtube.com/watch?v=ZOKHVk3mhrY",
          completed: false,
          description: "The speed needed to break free from gravity"
        },
        {
          id: 5,
          title: "Gravity Assists",
          url: "https://www.youtube.com/watch?v=16jr7WWGSxo",
          completed: false,
          description: "Using planetary gravity to accelerate spacecraft"
        },
        {
          id: 6,
          title: "Ion Propulsion",
          url: "https://www.youtube.com/watch?v=rSNaZ5wGTMw",
          completed: false,
          description: "Advanced propulsion for deep space missions"
        }
      ]
    }
  ];

  const achievements = [
    { name: "First Steps", description: "Complete your first video", icon: "🚀" },
    { name: "Stellar Student", description: "Complete 10 videos", icon: "⭐" },
    { name: "Space Expert", description: "Complete all courses", icon: "🎓" },
    { name: "Binge Watcher", description: "Watch 5 videos in one session", icon: "🏆" }
  ];

  const filteredCourses = activeCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-500/20 text-green-400";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400";
      case "Advanced": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const CourseVideos = ({ course }: { course: any }) => (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 mt-4">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <PlayCircle className="h-5 w-5 mr-2" />
          Course Videos - {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {course.videos.map((video: any, index: number) => (
            <div key={video.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{video.title}</h4>
                  <p className="text-gray-400 text-sm">{video.description}</p>
                  {video.completed && (
                    <div className="flex items-center space-x-1 mt-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm">Completed</span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => window.open(video.url, '_blank')}
                className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Watch</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Space Education Hub
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore the wonders of space through interactive video courses and engaging educational content
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="text-2xl font-bold text-white">30+</div>
              <div className="text-sm text-gray-300">Video Lessons</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-sm text-gray-300">Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-sm text-gray-300">Completion Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-300">Access</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/10 backdrop-blur-md">
            <TabsTrigger value="courses" className="data-[state=active]:bg-blue-500/20">Video Courses</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-500/20">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["all", "basics", "astronomy", "technology", "physics"].map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="space-y-4">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                          {course.icon}
                        </div>
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                      <CardDescription className="text-gray-300">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-gray-400">
                          <span className="flex items-center">
                            <PlayCircle className="h-4 w-4 mr-1" />
                            {course.videos.length} videos
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          {selectedCourse === course.id ? "Hide Videos" : "View All Videos"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Show course videos when selected */}
                  {selectedCourse === course.id && (
                    <CourseVideos course={course} />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h3 className="text-white font-semibold">{achievement.name}</h3>
                        <p className="text-gray-300 text-sm">{achievement.description}</p>
                        <Badge variant="outline" className="mt-2 text-gray-400 border-gray-500">
                          Locked
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Why Choose Video Learning?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlayCircle className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Visual Learning</h3>
                <p className="text-gray-300 text-sm">See complex space concepts explained through stunning visuals and animations</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-md border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlayCircle className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Learn at Your Pace</h3>
                <p className="text-gray-300 text-sm">Watch videos anytime, pause, rewind, and learn at your own speed</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Expert Content</h3>
                <p className="text-gray-300 text-sm">Curated videos from NASA, space agencies, and leading educators</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;