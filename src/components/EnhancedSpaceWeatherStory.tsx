import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Play, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Rocket,
  Zap,
  Globe,
  Satellite,
  Users,
  Camera,
  Plane
} from 'lucide-react';

// Component imports
import ParticleField from './ParticleField';
import InteractiveSpace from './InteractiveSpace';
import InteractiveHotspot from './InteractiveHotspot';
import SatelliteDefense from './MiniGame';
import { ScrollSection, ParallaxElement, AnimatedCounter } from './ScrollTriggeredStory';

// Import images
import solarFlareHero from '@/assets/solar-flare-hero.jpg';
import flareCharacter from '@/assets/flare-character.jpg';
import earthAurora from '@/assets/earth-aurora.jpg';
import spaceWeatherImpacts from '@/assets/space-weather-impacts.jpg';

interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  content: React.ReactNode;
  interactiveElements?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

const EnhancedSpaceWeatherStory = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showStory, setShowStory] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [flareTriggered, setFlareTriggered] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const impactHotspots = [
    {
      id: 'gps',
      title: 'GPS Disruption',
      description: 'Farmers, pilots, and delivery drivers rely on GPS signals that can be affected by space weather.',
      icon: 'satellite' as const,
      position: { x: 25, y: 30 },
      color: 'solar' as const,
    },
    {
      id: 'radio',
      title: 'Radio Communications',
      description: 'Amateur radio operators and emergency services may experience communication blackouts.',
      icon: 'zap' as const,
      position: { x: 60, y: 45 },
      color: 'aurora' as const,
    },
    {
      id: 'power',
      title: 'Power Grids',
      description: 'Electrical power systems can experience surges and outages during severe space weather.',
      icon: 'globe' as const,
      position: { x: 40, y: 70 },
      color: 'cosmic' as const,
    },
    {
      id: 'satellites',
      title: 'Satellite Systems',
      description: 'Space-based technology including internet and TV satellites can be damaged or disrupted.',
      icon: 'satellite' as const,
      position: { x: 75, y: 25 },
      color: 'plasma' as const,
    },
  ];

  const chapters: StoryChapter[] = [
    {
      id: 'intro',
      title: 'Meet Flare!',
      subtitle: 'Your Cosmic Guide',
      image: flareCharacter,
      imageAlt: 'Flare, a friendly solar flare character',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="right" className="space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-primary">
              Hi there! I'm <span className="animate-pulse-glow">Flare</span>! ⭐
            </h3>
            <p className="text-lg leading-relaxed">
              I was born from the incredible energy of our Sun, <AnimatedCounter from={0} to={93} suffix=" million miles" className="text-primary font-bold" /> away from Earth.
            </p>
            <p className="text-base leading-relaxed">
              Solar flares like me are bursts of energy that shoot out from the Sun's surface. 
              We're made of super hot particles and magnetic energy that can travel at speeds of over{' '}
              <AnimatedCounter from={0} to={1000000} suffix=" mph" className="text-accent font-bold" />!
            </p>
            <motion.div
              className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm text-muted-foreground">
                🚀 <strong>Fun Fact:</strong> Light from solar flares reaches Earth in just 8 minutes, 
                but the particle energy can take hours or even days to arrive!
              </p>
            </motion.div>
          </motion.div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <ParticleField 
            density={30} 
            color="hsl(45, 100%, 65%)" 
            speed={0.5}
            className="rounded-lg h-32" 
          />
        </div>
      )
    },
    {
      id: 'space-weather',
      title: 'What is Space Weather?',
      subtitle: 'The Invisible Forces Around Us',
      image: solarFlareHero,
      imageAlt: 'Solar flares erupting from the Sun surface',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              Space Weather Phenomena 🌌
            </h3>
            <div className="grid gap-4">
              <motion.div 
                className="flex items-center gap-3 p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <Zap className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">Solar Flares</p>
                  <p className="text-sm text-muted-foreground">Sudden bursts of electromagnetic energy</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <Globe className="w-6 h-6 text-secondary" />
                <div>
                  <p className="font-semibold">Coronal Mass Ejections (CMEs)</p>
                  <p className="text-sm text-muted-foreground">Huge bubbles of plasma launched from the Sun</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <Rocket className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-semibold">Solar Wind</p>
                  <p className="text-sm text-muted-foreground">Continuous stream of particles from the Sun</p>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <InteractiveSpace 
            onSolarFlare={() => setFlareTriggered(true)}
            className="border border-border rounded-lg"
          />
          {flareTriggered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-primary/20 rounded-lg border border-primary/30"
            >
              <p className="text-sm text-primary font-medium">
                🌟 Great! You just triggered a solar flare! This is how space weather begins its journey to Earth.
              </p>
            </motion.div>
          )}
        </div>
      )
    },
    {
      id: 'journey',
      title: 'My Journey Through Space',
      subtitle: 'Racing Toward Earth',
      image: flareCharacter,
      imageAlt: 'Flare traveling through space',
      backgroundColor: 'bg-gradient-space',
      content: (
        <ScrollSection animationType="scale" className="space-y-6">
          <ParallaxElement speed={0.3}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">
                Whoosh! Here I Go! 🚀
              </h3>
              <motion.div
                className="space-y-3"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { staggerChildren: 0.3 }
                  }
                }}
                initial="hidden"
                whileInView="visible"
              >
                <motion.p variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
                  I'm racing through space at incredible speeds - over{' '}
                  <span className="text-accent font-bold animate-pulse-glow">1 million miles per hour</span>!
                </motion.p>
                <motion.p variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
                  My light reaches Earth in just 8 minutes, but my particle energy takes much longer.
                </motion.p>
                <motion.p variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
                  As I zoom through the cosmic darkness, I'm carrying lots of charged particles and energy!
                </motion.p>
              </motion.div>
            </div>
          </ParallaxElement>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6 relative">
          <div className="h-40 bg-gradient-space rounded-lg relative overflow-hidden border border-border">
            <ParticleField 
              density={60} 
              color="hsl(264, 83%, 70%)" 
              speed={2}
              className="h-full" 
            />
            <motion.div
              className="absolute top-1/2 left-0 w-4 h-4 bg-primary rounded-full shadow-solar"
              animate={{
                x: [0, 300, 600],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              Watch me travel through space! ✨
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'earth-encounter',
      title: 'Meeting Earth\'s Magnetic Shield',
      subtitle: 'Aurora Magic',
      image: earthAurora,
      imageAlt: 'Earth with beautiful aurora lights',
      backgroundColor: 'bg-gradient-aurora-animated',
      content: (
        <ScrollSection animationType="rotate" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              The Aurora Light Show! 🌈
            </h3>
            <p className="text-lg leading-relaxed">
              Look at those amazing <span className="text-secondary font-bold animate-aurora-wave">colorful lights</span> dancing around Earth!
            </p>
            <p className="text-base leading-relaxed">
              These are auroras (northern and southern lights) - nature's own cosmic light show! 
              They happen when particles like me interact with Earth's magnetic field.
            </p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              initial="hidden"
              whileInView="visible"
            >
              <motion.div
                variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🛡️</div>
                  <h4 className="font-semibold text-secondary">Magnetosphere</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Earth's invisible protective shield that deflects most space weather
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">💫</div>
                  <h4 className="font-semibold text-accent">Aurora Colors</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Green, blue, purple, and red lights created by different gases in the atmosphere
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </ScrollSection>
      )
    },
    {
      id: 'impacts',
      title: 'How I Affect People on Earth',
      subtitle: 'Real-World Connections',
      image: spaceWeatherImpacts,
      imageAlt: 'Space weather impacts on Earth technologies',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="slide" direction="left" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-accent">
              People I Affect 👥
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: Users, label: 'Astronauts', color: 'text-primary' },
                { icon: Plane, label: 'Pilots', color: 'text-secondary' },
                { icon: Camera, label: 'Photographers', color: 'text-accent' },
                { icon: Satellite, label: 'Farmers (GPS)', color: 'text-primary' },
                { icon: Zap, label: 'Power Workers', color: 'text-secondary' },
                { icon: Globe, label: 'Radio Operators', color: 'text-accent' },
              ].map((person, index) => (
                <motion.div
                  key={person.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass text-center cursor-pointer"
                >
                  <person.icon className={`w-8 h-8 mx-auto mb-2 ${person.color}`} />
                  <p className="text-xs font-medium">{person.label}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each profession experiences space weather differently - from GPS disruptions affecting farmers 
              to beautiful auroras inspiring photographers!
            </p>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <InteractiveHotspot
            hotspots={impactHotspots}
            imageSrc={spaceWeatherImpacts}
            imageAlt="Space weather impacts visualization"
            className="border border-border"
          />
        </div>
      )
    },
    {
      id: 'heroes',
      title: 'Space Weather Scientists',
      subtitle: 'The Real Heroes',
      image: solarFlareHero,
      imageAlt: 'Space weather monitoring systems',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              The Space Weather Heroes! 🦸‍♀️🦸‍♂️
            </h3>
            <p className="text-lg leading-relaxed">
              Amazing scientists study solar flares like me to help protect people and technology on Earth!
            </p>
            <div className="space-y-3">
              <motion.div
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-secondary mb-2">🛰️ Space Weather Forecasters</h4>
                <p className="text-sm text-muted-foreground">
                  They use satellites and ground-based instruments to monitor the Sun and predict when space weather is coming.
                </p>
              </motion.div>
              <motion.div
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-accent mb-2">🔬 NASA Scientists</h4>
                <p className="text-sm text-muted-foreground">
                  Research teams study how space weather affects different technologies and communities.
                </p>
              </motion.div>
              <motion.div
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-primary mb-2">⚡ Emergency Responders</h4>
                <p className="text-sm text-muted-foreground">
                  They help communities prepare for and respond to space weather impacts.
                </p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <SatelliteDefense 
            onComplete={(score) => setGameScore(score)}
            className="border border-border"
          />
        </div>
      )
    },
    {
      id: 'conclusion',
      title: 'Living with Space Weather',
      subtitle: 'Our Cosmic Connection',
      image: earthAurora,
      imageAlt: 'Earth and beautiful aurora display',
      backgroundColor: 'bg-gradient-aurora',
      content: (
        <ScrollSection animationType="scale" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              The End of My Journey ✨
            </h3>
            <motion.div
              className="space-y-4"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.3 }
                }
              }}
              initial="hidden"
              whileInView="visible"
            >
              <motion.p 
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="text-lg leading-relaxed"
              >
                Well, my journey to Earth is complete! I've shown you how space weather connects our Sun to our beautiful planet.
              </motion.p>
              <motion.p 
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="text-base leading-relaxed"
              >
                Space weather has existed for billions of years, but now it affects more of our daily lives 
                because we use so much amazing technology.
              </motion.p>
              <motion.div
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
              >
                <p className="text-sm text-muted-foreground">
                  <strong className="text-accent">Remember:</strong> Every person - from farmers to photographers, 
                  pilots to scientists - can be affected by space weather in different ways.
                </p>
              </motion.div>
              <motion.p 
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="text-lg font-medium text-primary"
              >
                Thanks for joining me on this cosmic adventure! Next time you see beautiful northern lights 
                or hear about GPS problems during a solar storm, you'll know it might be a solar flare 
                like me saying hello from 93 million miles away! 🌟
              </motion.p>
            </motion.div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="p-6 bg-gradient-solar rounded-xl border border-primary/30">
            <h4 className="text-xl font-bold text-primary-foreground mb-4">
              Congratulations, Space Weather Explorer! 🚀
            </h4>
            {gameScore > 0 && (
              <Badge variant="secondary" className="mb-2">
                Game Score: {gameScore} points!
              </Badge>
            )}
            <p className="text-primary-foreground/90">
              You've completed Flare's Space Weather Adventure and learned how cosmic phenomena 
              affect people all around the world!
            </p>
          </div>
        </motion.div>
      )
    }
  ];

  const totalChapters = chapters.length;
  const currentChapterData = chapters[currentChapter];

  const handleNext = () => {
    if (currentChapter < totalChapters - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  if (!showStory) {
    return (
      <div className="min-h-screen bg-gradient-space flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <ParticleField 
          density={100} 
          color="hsl(264, 83%, 70%)" 
          speed={0.3}
          className="absolute inset-0" 
        />
        
        <motion.div 
          className="max-w-6xl w-full text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Card className="bg-glass backdrop-blur-md border-glass shadow-cosmic p-12">
            {/* Hero Image */}
            <motion.div 
              className="mb-8 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <img 
                src={solarFlareHero} 
                alt="Solar flare erupting from the Sun"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-aurora"
              />
              <div className="absolute inset-0 bg-gradient-aurora opacity-20 rounded-2xl animate-pulse-aurora"></div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-7xl font-bold mb-4">
                <span className="bg-gradient-solar bg-clip-text text-transparent animate-solar-flare">
                  Flare's Space Weather
                </span>
                <br />
                <span className="bg-gradient-aurora bg-clip-text text-transparent animate-aurora-wave">
                  Adventure
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                Join Flare, a friendly solar flare, on an breathtaking interactive journey from the Sun to Earth! 
                Discover how space weather affects everyone from astronauts to farmers through stunning visuals, 
                mini-games, and immersive storytelling.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <div className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass">
                <div className="text-2xl font-bold text-primary">{totalChapters}</div>
                <div className="text-sm text-muted-foreground">Chapters</div>
              </div>
              <div className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass">
                <div className="text-2xl font-bold text-secondary">15</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass">
                <div className="text-2xl font-bold text-accent">Interactive</div>
                <div className="text-sm text-muted-foreground">Elements</div>
              </div>
              <div className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass">
                <div className="text-2xl font-bold text-primary">3D</div>
                <div className="text-sm text-muted-foreground">Experiences</div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => setShowStory(true)}
                className="gap-3 bg-gradient-solar hover:shadow-solar text-lg px-8 py-4 transform hover:scale-105 transition-transform"
              >
                <Play className="h-5 w-5" />
                Begin the Adventure
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="gap-2"
              >
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {audioEnabled ? 'Audio On' : 'Audio Off'}
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className={`absolute inset-0 ${currentChapterData.backgroundColor || 'bg-gradient-space'} transition-all duration-1000`}>
        <ParticleField 
          density={40} 
          color={currentChapter % 2 === 0 ? "hsl(45, 100%, 65%)" : "hsl(264, 83%, 70%)"} 
          speed={1}
          className="opacity-30" 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <Card className="bg-glass backdrop-blur-md border-glass shadow-cosmic p-8">
            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentChapter}
            >
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-solar bg-clip-text text-transparent mb-2">
                {currentChapterData.title}
              </h1>
              <p className="text-lg text-secondary mb-2">{currentChapterData.subtitle}</p>
              <div className="text-muted-foreground text-sm">
                Chapter {currentChapter + 1} of {totalChapters}
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">
              {/* Image */}
              <motion.div 
                className="order-1 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                key={`image-${currentChapter}`}
                transition={{ duration: 0.8 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-aurora">
                  <img 
                    src={currentChapterData.image} 
                    alt={currentChapterData.imageAlt}
                    className="w-full h-auto animate-float"
                  />
                  <div className="absolute inset-0 bg-gradient-aurora opacity-10 pointer-events-none"></div>
                </div>
                {currentChapterData.interactiveElements}
              </motion.div>

              {/* Text Content */}
              <motion.div 
                className="order-2 lg:order-2 space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                key={`content-${currentChapter}`}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="prose prose-invert max-w-none">
                  {currentChapterData.content}
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-glass">
              <Button
                onClick={handlePrev}
                disabled={currentChapter === 0}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {/* Progress */}
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {Array.from({ length: totalChapters }).map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index + 1 === currentChapter + 1 ? 'bg-primary shadow-solar' : 'bg-muted'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setCurrentChapter(index)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                >
                  {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>

              <Button
                onClick={handleNext}
                disabled={currentChapter === totalChapters - 1}
                size="lg"
                className="gap-2 bg-gradient-solar hover:shadow-solar"
              >
                {currentChapter === totalChapters - 1 ? 'Complete' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSpaceWeatherStory;