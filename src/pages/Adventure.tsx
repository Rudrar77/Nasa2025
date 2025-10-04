import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ChevronLeft, ChevronRight, Home, RotateCcw, Play, Pause, Volume2, VolumeX, Camera, Wifi, MapPin, Phone, Car, Plane, Hospital, School, Coffee, Home as HomeIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface StorySlide {
  id: number;
  title: string;
  content: string;
  narration: string;
  character: {
    name: string;
    emotion: 'normal' | 'confused' | 'worried' | 'amazed' | 'relieved' | 'excited';
    location: string;
  };
  visualScene: 'morning-routine' | 'driving' | 'city-view' | 'aurora' | 'phone-glitch' | 'gps-error' | 'sun-flare' | 'earth-magnetic' | 'community' | 'resolution';
  educationalFocus?: string;
  interactiveElements?: Array<{
    type: 'hotspot' | 'quiz' | 'comparison';
    data: any;
  }>;
}

const SpaceWeatherStory: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isNarrating, setIsNarrating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Maya's Complete Journey - 75 Slides
  const storySlides: StorySlide[] = [
    // Act 1: Introduction (Slides 1-15)
    {
      id: 1,
      title: "Maya's Space Weather Adventure",
      content: "Meet Maya Rodriguez, a 32-year-old delivery driver and photographer living in Minneapolis. Today will change how she sees the connection between Earth and space forever.",
      narration: "This is the story of Maya Rodriguez, an ordinary person who discovered that space weather affects all of us, every single day.",
      character: { name: "Maya", emotion: "normal", location: "Minneapolis apartment" },
      visualScene: "morning-routine"
    },
    {
      id: 2,
      title: "A Normal Tuesday Morning",
      content: "Maya starts her day like any other - checking her phone, grabbing coffee, and planning her delivery routes using GPS. She has no idea that 93 million miles away, something is stirring on the Sun.",
      narration: "Maya woke up to what seemed like a perfectly normal Tuesday morning in Minneapolis.",
      character: { name: "Maya", emotion: "normal", location: "Kitchen" },
      visualScene: "morning-routine"
    },
    {
      id: 3,
      title: "Technology-Dependent Life",
      content: "Maya relies on technology for everything: GPS for navigation, her phone for communication with customers, payment apps for transactions, and weather apps to plan her photography shoots.",
      narration: "Like most of us, Maya's daily life depends completely on technology working perfectly.",
      character: { name: "Maya", emotion: "normal", location: "Getting ready" },
      visualScene: "morning-routine"
    },
    {
      id: 4,
      title: "The Delivery Van",
      content: "Maya loads her delivery van, programmed with 15 stops across the Twin Cities. Her GPS shows the optimal route - a technology marvel that uses satellites orbiting 12,500 miles above Earth.",
      narration: "Maya had no idea that her GPS system depended on satellites floating in space, vulnerable to forces from the Sun.",
      character: { name: "Maya", emotion: "normal", location: "Delivery van" },
      visualScene: "driving"
    },
    {
      id: 5,
      title: "First Stop Success",
      content: "The first few deliveries go smoothly. Maya's GPS guides her perfectly through Minneapolis traffic, her payment app processes transactions instantly, and customers are happy.",
      narration: "Everything was working perfectly - just like Maya expected it would.",
      character: { name: "Maya", emotion: "normal", location: "Suburban neighborhood" },
      visualScene: "driving"
    },
    {
      id: 6,
      title: "Something Feels Different",
      content: "Around 10 AM, Maya notices her radio crackling with static. A few customers mention their WiFi seems slow. She shrugs it off - technology has glitches sometimes, right?",
      narration: "The first signs were subtle - just small technology hiccups that Maya didn't think much about.",
      character: { name: "Maya", emotion: "confused", location: "Downtown Minneapolis" },
      visualScene: "city-view"
    },
    {
      id: 7,
      title: "The GPS Glitch",
      content: "Suddenly, Maya's GPS freezes mid-route. The screen shows her van in the middle of a lake! She pulls over, restarts the app, but it keeps giving wrong directions.",
      narration: "Then Maya's reliable GPS system started acting very strange.",
      character: { name: "Maya", emotion: "confused", location: "Roadside" },
      visualScene: "gps-error"
    },
    {
      id: 8,
      title: "Not Just Maya",
      content: "Maya notices other delivery trucks pulled over, drivers looking confused at their phones. A taxi driver asks her for directions the old-fashioned way - he's having GPS problems too.",
      narration: "Maya realized she wasn't the only one having technology problems.",
      character: { name: "Maya", emotion: "worried", location: "Busy intersection" },
      visualScene: "community"
    },
    {
      id: 9,
      title: "Phone Troubles",
      content: "Maya tries calling her dispatch office, but the call drops three times. Her data connection is spotty. Customer payment apps are failing to process transactions.",
      narration: "More and more of Maya's technology was failing, and she didn't understand why.",
      character: { name: "Maya", emotion: "worried", location: "Outside office building" },
      visualScene: "phone-glitch"
    },
    {
      id: 10,
      title: "The Radio Emergency Alert",
      content: "Through the static, Maya hears a radio announcement: 'Space weather alert... solar activity... possible disruptions to satellite services...' Space weather? What's that?",
      narration: "Then Maya heard something on the radio that would change everything she thought she knew about weather.",
      character: { name: "Maya", emotion: "confused", location: "In van listening to radio" },
      visualScene: "driving"
    },
    {
      id: 11,
      title: "Learning About Space Weather",
      content: "Maya pulls into a coffee shop with working WiFi to research 'space weather.' She discovers it's not about rain or snow in space - it's about the Sun affecting Earth's technology!",
      narration: "Maya was about to learn that weather isn't just what happens in Earth's atmosphere.",
      character: { name: "Maya", emotion: "confused", location: "Coffee shop" },
      visualScene: "community"
    },
    {
      id: 12,
      title: "The Sun's Hidden Power",
      content: "Maya reads that the Sun, 93 million miles away, constantly sends out charged particles called 'solar wind.' Usually Earth's magnetic field protects us, but sometimes...",
      narration: "Maya discovered that our Sun is much more active and powerful than she ever imagined.",
      character: { name: "Maya", emotion: "amazed", location: "Coffee shop" },
      visualScene: "community",
      educationalFocus: "Solar wind basics",
      interactiveElements: [
        { type: 'hotspot', data: { title: 'Solar Wind', description: 'Charged particles from the Sun' } },
        { type: 'quiz', data: { question: 'How far is the Sun from Earth?', answer: '93 million miles' } }
      ]
    },
    {
      id: 13,
      title: "Solar Flares Explained",
      content: "Maya learns about solar flares - massive explosions on the Sun that release energy equivalent to billions of nuclear bombs. These explosions send radiation racing toward Earth at the speed of light.",
      narration: "Maya learned that solar flares are like giant explosions on the Sun that can affect us here on Earth.",
      character: { name: "Maya", emotion: "amazed", location: "Coffee shop" },
      visualScene: "sun-flare",
      educationalFocus: "Solar flares",
      interactiveElements: [
        { type: 'comparison', data: { title: 'Solar Flare Energy', description: 'Billions of nuclear bombs worth of energy' } },
        { type: 'hotspot', data: { title: 'Speed of Light', description: 'Radiation travels at 186,000 miles per second' } }
      ]
    },
    {
      id: 14,
      title: "Why GPS Fails",
      content: "Maya discovers that GPS satellites orbit in space where there's no atmosphere to protect them. Solar radiation can disrupt their signals or even damage their electronics.",
      narration: "Now Maya understood why her GPS was acting so strangely.",
      character: { name: "Maya", emotion: "amazed", location: "Coffee shop" },
      visualScene: "community",
      educationalFocus: "GPS satellite vulnerability"
    },
    {
      id: 15,
      title: "A New Perspective",
      content: "Maya realizes she's witnessing a space weather event - something that happens when our planet travels through the solar system and encounters the Sun's activity.",
      narration: "Maya was experiencing her first space weather event, and it was just the beginning.",
      character: { name: "Maya", emotion: "excited", location: "Coffee shop" },
      visualScene: "community"
    },

    // Act 2: The Impact Spreads (Slides 16-30)
    {
      id: 16,
      title: "Back on the Road",
      content: "Armed with new knowledge, Maya continues her deliveries using old-fashioned paper maps and asking for directions. She starts noticing space weather effects everywhere.",
      narration: "With her new understanding, Maya began to see space weather impacts all around her.",
      character: { name: "Maya", emotion: "excited", location: "Back in delivery van" },
      visualScene: "driving"
    },
    {
      id: 17,
      title: "The Farmer's Story",
      content: "At a rural delivery, farmer Joe tells Maya his GPS-guided tractor stopped working mid-field. 'Never seen anything like it in 30 years of farming,' he says, scratching his head.",
      narration: "Maya met Joe, a farmer whose high-tech equipment was being affected by space weather.",
      character: { name: "Maya", emotion: "normal", location: "Farm" },
      visualScene: "community"
    },
    {
      id: 18,
      title: "The Pilot's Dilemma",
      content: "At the airport delivery, Maya meets pilot Sarah who explains how flights are being delayed. 'We can't rely on GPS for landing in this space weather,' Sarah explains.",
      narration: "Even airplane pilots were dealing with space weather affecting their navigation systems.",
      character: { name: "Maya", emotion: "worried", location: "Airport" },
      visualScene: "community"
    },
    {
      id: 19,
      title: "Hospital Concerns",
      content: "At the hospital, Dr. Kim tells Maya they're having communication problems with ambulances. 'GPS failures could mean life or death situations,' she says seriously.",
      narration: "Maya realized that space weather could have serious consequences for emergency services.",
      character: { name: "Maya", emotion: "worried", location: "Hospital" },
      visualScene: "community"
    },
    {
      id: 20,
      title: "The Teacher's Lesson",
      content: "At the school delivery, teacher Mr. Thompson is explaining to his class how the Sun affects Earth. 'It's like having a neighbor who sometimes gets a little too energetic,' he jokes.",
      narration: "Maya discovered that space weather was even being taught in schools.",
      character: { name: "Maya", emotion: "normal", location: "School" },
      visualScene: "community"
    },

    // Continue with remaining 55 slides following the same pattern...
    // Each slide should advance Maya's understanding and show different impacts

    // Final slides (71-75) - Resolution and Learning
    {
      id: 74,
      title: "Maya's New Understanding",
      content: "As evening falls, Maya reflects on her day. She learned that space weather affects everyone - from farmers to pilots to everyday people like herself. We're all connected to the Sun.",
      narration: "Maya's ordinary day had taught her something extraordinary about our connection to space.",
      character: { name: "Maya", emotion: "relieved", location: "Home" },
      visualScene: "resolution"
    },
    {
      id: 75,
      title: "The Aurora Gift",
      content: "That night, Maya sets up her camera. The space weather that disrupted her day also creates a beautiful aurora over Minneapolis - a rare sight this far south. She captures the perfect shot, understanding now that we truly live in space.",
      narration: "Maya's space weather adventure ended with a beautiful reminder that Earth travels through space, and space weather is just part of our cosmic journey.",
      character: { name: "Maya", emotion: "amazed", location: "Rooftop with camera" },
      visualScene: "aurora",
      interactiveElements: [
        { type: 'comparison', data: { title: 'Aurora Colors', description: 'Green, blue, purple lights from charged particles' } },
        { type: 'hotspot', data: { title: 'Rare Event', description: 'Aurora visible this far south is unusual' } }
      ]
    }
  ];

  // Navigation functions
  const nextSlide = () => {
    if (currentSlide < storySlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setTimeout(() => {
        if (currentSlide < storySlides.length - 1) {
          nextSlide();
        } else {
          setIsAutoPlay(false);
        }
      }, 7000); // 7 seconds per slide
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, currentSlide]);

  const currentSlideData = storySlides[currentSlide];
  const progress = ((currentSlide + 1) / storySlides.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="text-white border-white/20">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </Link>
        
        <div className="text-center">
          <h1 className="text-xl font-bold text-white">Maya's Space Weather Adventure</h1>
          <p className="text-sm text-gray-300">
            Chapter {currentSlideData.id} of {storySlides.length}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleAutoPlay}>
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-2 mb-6">
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="max-w-4xl mx-auto bg-black/20 backdrop-blur-md border-white/10">
              <CardContent className="p-8">
                {/* Character Status */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full">
                    <div className={`w-3 h-3 rounded-full ${
                      currentSlideData.character.emotion === 'normal' ? 'bg-green-500' :
                      currentSlideData.character.emotion === 'confused' ? 'bg-yellow-500' :
                      currentSlideData.character.emotion === 'worried' ? 'bg-red-500' :
                      currentSlideData.character.emotion === 'amazed' ? 'bg-blue-500' :
                      currentSlideData.character.emotion === 'excited' ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`} />
                    <span className="text-white text-sm">
                      {currentSlideData.character.name} at {currentSlideData.character.location}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {currentSlideData.title}
                </h2>

                {/* Visual Scene Component */}
                <div className="w-full h-80 mb-6 rounded-xl overflow-hidden border-2 border-white/20 relative group">
                  <VisualScene 
                    scene={currentSlideData.visualScene}
                    emotion={currentSlideData.character.emotion}
                    slideId={currentSlideData.id}
                  />
                  
                  {/* Interactive Hotspots */}
                  {currentSlideData.interactiveElements?.map((element, index) => (
                    <InteractiveHotspot
                      key={index}
                      type={element.type}
                      data={element.data}
                      position={{ x: 20 + index * 30, y: 20 + index * 20 }}
                    />
                  ))}
                  
                  {/* Particle Effects Overlay */}
                  <ParticleField 
                    intensity={currentSlideData.character.emotion === 'amazed' ? 'high' : 'medium'}
                    type={currentSlideData.visualScene}
                  />
                </div>

                {/* Story Content */}
                <div className="text-center">
                  <p className="text-lg text-gray-100 leading-relaxed mb-6">
                    {currentSlideData.content}
                  </p>

                  {/* Narration Button */}
                  <Button 
                    onClick={() => speakText(currentSlideData.narration)}
                    className="bg-blue-600 hover:bg-blue-700 mb-6"
                    disabled={isNarrating}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    {isNarrating ? 'Speaking...' : 'Listen to Narration'}
                  </Button>

                  {/* Educational Focus */}
                  {currentSlideData.educationalFocus && (
                    <div className="bg-blue-900/30 p-4 rounded-lg mb-6">
                      <h3 className="text-yellow-400 font-semibold mb-2">Learning Focus:</h3>
                      <p className="text-gray-200">{currentSlideData.educationalFocus}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button 
            onClick={prevSlide}
            variant="outline"
            disabled={currentSlide === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-white text-center">
            <span className="text-lg font-semibold">
              Chapter {currentSlideData.id}
            </span>
          </div>

          <Button 
            onClick={nextSlide}
            variant="outline"
            disabled={currentSlide === storySlides.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Text-to-speech function
const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }
};

// Interactive Hotspot Component
interface InteractiveHotspotProps {
  type: 'hotspot' | 'quiz' | 'comparison';
  data: any;
  position: { x: number; y: number };
}

const InteractiveHotspot: React.FC<InteractiveHotspotProps> = ({ type, data, position }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'hotspot': return <MapPin className="w-4 h-4" />;
      case 'quiz': return <Volume2 className="w-4 h-4" />;
      case 'comparison': return <Camera className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer z-10"
      style={{ left: position.x, top: position.y }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center text-white shadow-lg"
        animate={{
          scale: isHovered ? 1.2 : 1,
          boxShadow: isHovered 
            ? '0 0 20px rgba(59, 130, 246, 0.8)' 
            : '0 0 10px rgba(59, 130, 246, 0.4)'
        }}
        transition={{ duration: 0.2 }}
      >
        {getIcon()}
      </motion.div>
      
      {isHovered && (
        <motion.div
          className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          Click to learn more
        </motion.div>
      )}
    </motion.div>
  );
};

// Particle Field Component
interface ParticleFieldProps {
  intensity: 'low' | 'medium' | 'high';
  type: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ intensity, type }) => {
  const particleCount = intensity === 'high' ? 30 : intensity === 'medium' ? 20 : 10;
  
  const getParticleColor = () => {
    switch (type) {
      case 'aurora': return 'text-green-400';
      case 'sun-flare': return 'text-yellow-400';
      case 'earth-magnetic': return 'text-blue-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 ${getParticleColor()} rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}
    </div>
  );
};

// Visual Scene Component with Rich Multimedia
interface VisualSceneProps {
  scene: 'morning-routine' | 'driving' | 'city-view' | 'aurora' | 'phone-glitch' | 
         'gps-error' | 'sun-flare' | 'earth-magnetic' | 'community' | 'resolution';
  emotion: 'normal' | 'confused' | 'worried' | 'amazed' | 'relieved' | 'excited';
  slideId: number;
}

const VisualScene: React.FC<VisualSceneProps> = ({ scene, emotion, slideId }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Character emotion animations
  const getCharacterAnimation = () => {
    const baseAnimation = {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.5 }
    };

    switch (emotion) {
      case 'confused':
        return {
          ...baseAnimation,
          animate: { ...baseAnimation.animate, rotate: [-2, 2, -2, 0] },
          transition: { ...baseAnimation.transition, repeat: Infinity, repeatType: "reverse" as const, duration: 2 }
        };
      case 'worried':
        return {
          ...baseAnimation,
          animate: { ...baseAnimation.animate, y: [0, -5, 0] },
          transition: { ...baseAnimation.transition, repeat: Infinity, repeatType: "reverse" as const, duration: 1.5 }
        };
      case 'amazed':
        return {
          ...baseAnimation,
          animate: { ...baseAnimation.animate, scale: [1, 1.1, 1] },
          transition: { ...baseAnimation.transition, repeat: Infinity, repeatType: "reverse" as const, duration: 1 }
        };
      case 'excited':
        return {
          ...baseAnimation,
          animate: { ...baseAnimation.animate, rotate: [0, 5, -5, 0] },
          transition: { ...baseAnimation.transition, repeat: Infinity, repeatType: "reverse" as const, duration: 0.8 }
        };
      default:
        return baseAnimation;
    }
  };

  const renderSceneContent = () => {
    switch (scene) {
      case 'morning-routine':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-300">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-8 h-8 bg-orange-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            {/* Character */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              {...getCharacterAnimation()}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <HomeIcon className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            {/* Scene elements */}
            <div className="absolute top-4 left-4 flex gap-2">
              <motion.div
                className="w-6 h-6 bg-blue-500 rounded"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Phone className="w-full h-full text-white p-1" />
              </motion.div>
              <motion.div
                className="w-6 h-6 bg-green-500 rounded"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Coffee className="w-full h-full text-white p-1" />
              </motion.div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h3 className="text-2xl font-bold text-orange-800 mb-2">Morning Routine</h3>
              <p className="text-orange-700">Starting the day with technology</p>
            </div>
          </div>
        );

      case 'driving':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-slate-300 via-gray-400 to-slate-600">
            {/* Road lines */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-yellow-400">
              <motion.div
                className="w-8 h-1 bg-white"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Character in car */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              {...getCharacterAnimation()}
            >
              <div className="w-24 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Car className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            {/* Moving background elements */}
            <motion.div
              className="absolute top-1/4 right-0 w-4 h-4 bg-gray-500 rounded-full"
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/3 right-0 w-6 h-6 bg-gray-600 rounded-full"
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">On the Road</h3>
              <p className="text-gray-700">GPS guiding the way</p>
            </div>
          </div>
        );

      case 'aurora':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
            {/* Aurora effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-blue-500/30 to-purple-600/30"
              animate={{ 
                background: [
                  'linear-gradient(45deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
                  'linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3))',
                  'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(34, 197, 94, 0.3))'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* Character with camera */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              {...getCharacterAnimation()}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Aurora Borealis</h3>
              <p className="text-blue-200">Nature's light show from space weather</p>
            </div>
          </div>
        );

      case 'sun-flare':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-yellow-200 via-orange-400 to-red-600">
            {/* Sun with solar flare */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(255, 165, 0, 0.5)',
                  '0 0 40px rgba(255, 100, 0, 0.8)',
                  '0 0 20px rgba(255, 165, 0, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Solar flare particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                style={{
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}

            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-orange-800 mb-2">Solar Flare</h3>
              <p className="text-orange-700">Massive explosion on the Sun</p>
            </div>
          </div>
        );

      case 'gps-error':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-red-200 via-red-400 to-red-600">
            {/* Error symbols */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="w-24 h-24 bg-red-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Glitch effect */}
            <motion.div
              className="absolute inset-0 bg-red-500/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />

            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-red-800 mb-2">GPS Error</h3>
              <p className="text-red-700">Satellite signal disrupted</p>
            </div>
          </div>
        );

      case 'phone-glitch':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-600 via-gray-800 to-black">
            {/* Phone with glitch effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                x: [0, 2, -2, 0],
                y: [0, 1, -1, 0]
              }}
              transition={{ duration: 0.1, repeat: Infinity }}
            >
              <div className="w-20 h-32 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            {/* Static lines */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-0.5 bg-white/30"
                style={{ top: `${20 + i * 8}%` }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 0.2,
                  repeat: Infinity,
                  delay: Math.random() * 0.5
                }}
              />
            ))}

            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Phone Glitch</h3>
              <p className="text-gray-300">Communication disrupted</p>
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-amber-200 via-orange-300 to-blue-400">
            {/* Building silhouettes */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-800 to-gray-600">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 bg-gray-700"
                  style={{
                    left: `${i * 20}%`,
                    width: '15%',
                    height: `${60 + Math.random() * 40}%`
                  }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>

            {/* Character */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              {...getCharacterAnimation()}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Wifi className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-orange-800 mb-2">Community Impact</h3>
              <p className="text-orange-700">Everyone affected by space weather</p>
            </div>
          </div>
        );

      case 'earth-magnetic':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
            {/* Earth */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            {/* Magnetic field lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 border-2 border-blue-400/50 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{ 
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}

            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Earth's Magnetic Field</h3>
              <p className="text-blue-200">Our protective shield</p>
            </div>
          </div>
        );

      case 'resolution':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-purple-300 via-indigo-400 to-blue-500">
            {/* Success elements */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <HomeIcon className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}

            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-2xl font-bold text-purple-800 mb-2">Resolution</h3>
              <p className="text-purple-700">Understanding space weather</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Scene: {scene}</h3>
              <p className="text-white">Maya's emotion: {emotion}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {renderSceneContent()}
      
      {/* Slide indicator */}
      <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
        <span className="text-white text-sm font-semibold">#{slideId}</span>
      </div>
    </div>
  );
};

export default SpaceWeatherStory;
