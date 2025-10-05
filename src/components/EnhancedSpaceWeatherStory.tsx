import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import AnimatedBackground from './ui/animated-background';
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
import TTSControls from './TTSControls';

// Import images
import solarFlareHero from '@/assets/solar-flare-hero.jpg';
import flareCharacter from '@/assets/flare-character.jpg';
import earthAurora from '@/assets/earth-aurora.jpg';
import spaceWeatherImpacts from '@/assets/space-weather-impacts.jpg';

// Import planet textures
// Note: Planet textures removed to use more appropriate solar-themed images

// Import animations
import SolarFormationAnimation from './animations/SolarFormationAnimation';
import SolarFlareJourneyAnimation from './animations/SolarFlareJourneyAnimation';
import EarthImpactAnimation from './animations/EarthImpactAnimation';
import MagnetosphereAnimation from './animations/MagnetosphereAnimation';

// Import 3D animations
import EarthImpact3D from './animations3D/EarthImpact3D';
import Magnetosphere3D from './animations3D/Magnetosphere3D';
import SolarFormation3D from './animations3D/SolarFormation3D';
import SolarFlareJourney3D from './animations3D/SolarFlareJourney3D';

interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  animation?: React.ComponentType<{ className?: string }>;
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
  
  // Process chapters to ensure visual consistency
  const processChapter = (chapter: StoryChapter): StoryChapter => {
    // If a chapter has both animation and image properties,
    // prioritize the animation and remove the image property
    if (chapter.animation && chapter.image) {
      console.log(`Chapter "${chapter.title}" has both animation and image defined. Prioritizing animation.`);
      const { image, imageAlt, ...rest } = chapter;
      return rest;
    }
    return chapter;
  };

  // Process all chapters at initialization
  const processAllChapters = (chapters: StoryChapter[]): StoryChapter[] => {
    return chapters.map(chapter => processChapter(chapter));
  };

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

  const chaptersRaw: StoryChapter[] = [
    // Chapter 1-2: Introduction (existing)
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
          <TTSControls 
            text="Hi there! I'm Flare! I was born from the incredible energy of our Sun, 93 million miles away from Earth. Solar flares like me are bursts of energy that shoot out from the Sun's surface. We're made of super hot particles and magnetic energy that can travel at speeds of over 1 million mph! Fun Fact: Light from solar flares reaches Earth in just 8 minutes, but the particle energy can take hours or even days to arrive!"
            label="Listen to Flare's Introduction"
            className="mt-4"
          />
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
    // Chapter 2: Space Weather Basics (existing)
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
            <TTSControls 
              text="Space Weather Phenomena includes Solar Flares, which are sudden bursts of electromagnetic energy, Coronal Mass Ejections or CMEs, which are huge bubbles of plasma launched from the Sun, and Solar Wind, a continuous stream of particles from the Sun."
              label="Listen to Space Weather Explanation"
              className="mt-4"
            />
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
    // NEW CHAPTERS 3-10: Solar Formation and Flare Birth
    {
      id: 'sun-formation',
      title: 'The Birth of Our Sun',
      subtitle: '4.6 Billion Years of Fusion',
      animation: SolarFormation3D,
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="up" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🌟 The Sun's Incredible Journey
            </h3>
            <p className="text-lg leading-relaxed">
              Our Sun was born <AnimatedCounter from={0} to={4600000000} suffix=" years ago" className="text-accent font-bold" /> 
              from a giant cloud of gas and dust called a nebula.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Nuclear Fusion</h4>
                <p className="text-sm">The Sun converts hydrogen into helium, releasing enormous energy that powers everything on Earth.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Solar Core</h4>
                <p className="text-sm">Temperatures reach <AnimatedCounter from={0} to={15000000} suffix="°C" className="text-accent font-bold" /> - hotter than lightning!</p>
              </motion.div>
            </div>
            <TTSControls 
              text="Our Sun was born 4.6 billion years ago from a giant cloud of gas and dust called a nebula. The Sun converts hydrogen into helium through nuclear fusion, releasing enormous energy that powers everything on Earth. At its core, temperatures reach 15 million degrees Celsius - hotter than lightning!"
              label="Learn about the Sun's formation"
              className="mt-4"
            />
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <ParticleField 
            density={50} 
            color="hsl(25, 100%, 60%)" 
            speed={1.2}
            className="rounded-lg h-40" 
          />
        </div>
      )
    },
    {
      id: 'sunspots-magnetic',
      title: 'Sunspots & Magnetic Fields',
      subtitle: 'The Sun\'s Powerful Magnetism',
      image: earthAurora,
      imageAlt: 'Sunspots and magnetic field visualization',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              🧲 The Sun's Magnetic Personality
            </h3>
            <p className="text-lg leading-relaxed">
              Sunspots are cooler areas on the Sun's surface where strong magnetic fields emerge. 
              These magnetic fields can become twisted and stressed, storing enormous energy.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 15 }}
              >
                <p className="font-semibold text-primary">Magnetic Loops</p>
                <p className="text-sm text-muted-foreground">Energy builds up in twisted magnetic field lines, like a coiled spring ready to snap.</p>
              </motion.div>
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 15 }}
              >
                <p className="font-semibold text-secondary">Solar Cycles</p>
                <p className="text-sm text-muted-foreground">The Sun goes through 11-year cycles of high and low activity, affecting space weather.</p>
              </motion.div>
            </div>
            <TTSControls 
              text="Sunspots are cooler areas on the Sun's surface where strong magnetic fields emerge. These magnetic fields can become twisted and stressed, storing enormous energy. Energy builds up in twisted magnetic field lines, like a coiled spring ready to snap. The Sun goes through 11-year cycles of high and low activity, affecting space weather."
              label="Learn about sunspots and magnetism"
              className="mt-4"
            />
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            <motion.div 
              className="h-20 bg-gradient-solar rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold">Magnetic Field</span>
            </motion.div>
            <motion.div 
              className="h-20 bg-gradient-aurora rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold">Energy Buildup</span>
            </motion.div>
            <motion.div 
              className="h-20 bg-gradient-cosmic rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold">Solar Cycle</span>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'flare-birth',
      title: 'The Birth of a Solar Flare',
      subtitle: 'Energy Release in Action',
      image: spaceWeatherImpacts,
      imageAlt: 'Solar flare energy release',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="left" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              ⚡ The Moment of Release
            </h3>
            <p className="text-lg leading-relaxed">
              When magnetic field lines become too stressed, they snap and reconnect, releasing 
              <AnimatedCounter from={0} to={1000000000000000000} suffix=" joules" className="text-accent font-bold" /> of energy!
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">X-rays & UV Radiation</h4>
                <p className="text-sm">High-energy radiation travels at the speed of light, reaching Earth in 8 minutes.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Charged Particles</h4>
                <p className="text-sm">Electrons and protons are accelerated to near-light speeds, following hours later.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <motion.button
            className="w-full h-32 bg-gradient-solar rounded-lg flex items-center justify-center text-white font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFlareTriggered(!flareTriggered)}
          >
            {flareTriggered ? '🌟 Flare Released!' : '⚡ Trigger Solar Flare!'}
          </motion.button>
          {flareTriggered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-primary/20 rounded-lg border border-primary/30"
            >
              <p className="text-sm text-primary font-medium">
                💥 Energy released! The solar flare is now racing toward Earth at incredible speeds!
              </p>
            </motion.div>
          )}
        </div>
      )
    },
    {
      id: 'flare-types',
      title: 'Types of Solar Flares',
      subtitle: 'From Minor to Major Events',
      image: solarFlareHero,
      imageAlt: 'Different types of solar flares',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              📊 Solar Flare Classification
            </h3>
            <div className="grid gap-4">
              <motion.div 
                className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-green-400 mb-2">Class A, B, C (Minor)</h4>
                <p className="text-sm">Small flares that usually don't affect Earth. Background activity.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-yellow-400 mb-2">Class M (Medium)</h4>
                <p className="text-sm">Moderate flares that can cause brief radio blackouts and minor effects.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-red-400 mb-2">Class X (Major)</h4>
                <p className="text-sm">Major flares that can cause widespread effects on Earth systems.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Class C Flare
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Class M Flare
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Class X Flare
            </motion.button>
          </div>
        </div>
      )
    },
    {
      id: 'coronal-mass-ejection',
      title: 'Coronal Mass Ejections',
      subtitle: 'The Solar Storm Companions',
      image: solarFlareHero,
      imageAlt: 'Coronal mass ejection from the Sun',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="right" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🌊 CMEs: The Big Brothers
            </h3>
            <p className="text-lg leading-relaxed">
              Often accompanying solar flares, Coronal Mass Ejections are huge bubbles of magnetized plasma 
              that can contain up to <AnimatedCounter from={0} to={10000000000000000} suffix=" tons" className="text-accent font-bold" /> of material!
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <p className="font-semibold text-primary">Plasma Cloud</p>
                <p className="text-sm text-muted-foreground">Superheated gas containing electrons, protons, and magnetic fields.</p>
              </motion.div>
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <p className="font-semibold text-secondary">Travel Time</p>
                <p className="text-sm text-muted-foreground">CMEs can take 1-5 days to reach Earth, depending on their speed.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <ParticleField 
            density={80} 
            color="hsl(200, 100%, 60%)" 
            speed={2}
            className="rounded-lg h-40" 
          />
        </div>
      )
    },
    {
      id: 'solar-wind-basics',
      title: 'The Solar Wind',
      subtitle: 'The Sun\'s Constant Breath',
      image: solarFlareHero,
      imageAlt: 'Solar wind streaming from the Sun',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              💨 The Sun's Constant Stream
            </h3>
            <p className="text-lg leading-relaxed">
              The solar wind is a continuous flow of charged particles streaming from the Sun at speeds of 
              <AnimatedCounter from={0} to={250} suffix=" miles per second" className="text-accent font-bold" />.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Fast Solar Wind</h4>
                <p className="text-sm">From coronal holes, travels at 500-800 km/s, creates auroras.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Slow Solar Wind</h4>
                <p className="text-sm">From equatorial regions, travels at 300-500 km/s, more variable.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-32 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute top-1/2 w-4 h-4 bg-primary rounded-full"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-1/2 w-2 h-2 bg-secondary rounded-full"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}
            />
          </div>
        </div>
      )
    },
    {
      id: 'flare-energy',
      title: 'Measuring Solar Flare Energy',
      subtitle: 'The Power of a Billion Atomic Bombs',
      image: solarFlareHero,
      imageAlt: 'Solar flare energy visualization',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="up" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              ⚡ Energy That Powers Civilizations
            </h3>
            <p className="text-lg leading-relaxed">
              A large solar flare releases energy equivalent to 
              <AnimatedCounter from={0} to={100000000000} suffix=" atomic bombs" className="text-accent font-bold" />!
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">X-Class Flares</h4>
                <p className="text-sm">Can release energy equivalent to billions of hydrogen bombs in seconds.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Earth's Energy Use</h4>
                <p className="text-sm">One large flare contains enough energy to power Earth for millions of years.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <motion.div
            className="h-20 bg-gradient-solar rounded-lg flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold text-lg">🌟 Release Energy!</span>
          </motion.div>
        </div>
      )
    },
    {
      id: 'flare-detection',
      title: 'Detecting Solar Flares',
      subtitle: 'Space Weather Monitoring',
      image: solarFlareHero,
      imageAlt: 'Solar monitoring satellites',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              🛰️ Watching the Sun
            </h3>
            <p className="text-lg leading-relaxed">
              Scientists use specialized satellites and ground-based observatories to monitor the Sun 24/7 
              and predict when solar flares might occur.
            </p>
            <div className="grid gap-4">
              <motion.div 
                className="flex items-center gap-3 p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <Satellite className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">SOHO Satellite</p>
                  <p className="text-sm text-muted-foreground">Monitors solar activity from space</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <Globe className="w-6 h-6 text-secondary" />
                <div>
                  <p className="font-semibold">Ground Observatories</p>
                  <p className="text-sm text-muted-foreground">Radio telescopes and solar observatories</p>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="h-24 bg-gradient-cosmic rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Satellite className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-semibold">SOHO</span>
            </motion.div>
            <motion.div 
              className="h-24 bg-gradient-solar rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-semibold">Ground Telescopes</span>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'flare-prediction',
      title: 'Predicting Solar Flares',
      subtitle: 'Space Weather Forecasting',
      image: earthAurora,
      imageAlt: 'Scientists predicting solar activity',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="left" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🔮 Forecasting Solar Storms
            </h3>
            <p className="text-lg leading-relaxed">
              Scientists can predict solar flares by monitoring sunspots, magnetic field strength, 
              and solar activity patterns, giving us advance warning of potential space weather events.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 15 }}
              >
                <p className="font-semibold text-primary">Magnetic Field Monitoring</p>
                <p className="text-sm text-muted-foreground">Tracking changes in solar magnetic fields to predict flare activity.</p>
              </motion.div>
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 15 }}
              >
                <p className="font-semibold text-secondary">Solar Cycle Prediction</p>
                <p className="text-sm text-muted-foreground">Using 11-year solar cycles to anticipate periods of high activity.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <motion.button
            className="w-full h-20 bg-gradient-solar rounded-lg flex items-center justify-center text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔮 Predict Next Flare
          </motion.button>
        </div>
      )
    },

    // CHAPTERS 11-22: Space Journey
    {
      id: 'light-speed',
      title: 'Light Speed to Earth',
      subtitle: '8 Minutes of Travel',
      animation: SolarFlareJourney3D,
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              💫 Light's Incredible Journey
            </h3>
            <p className="text-lg leading-relaxed">
              The light and X-rays from a solar flare travel at the speed of light, covering 
              <AnimatedCounter from={0} to={93000000} suffix=" miles" className="text-accent font-bold" /> in just 8 minutes!
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">Speed of Light</h4>
                <p className="text-sm">186,282 miles per second - the fastest anything can travel in the universe.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Immediate Effects</h4>
                <p className="text-sm">Radio blackouts and satellite disruptions can occur within minutes of a flare.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-32 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute top-1/2 w-6 h-6 bg-primary rounded-full"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm font-semibold">
              8 Minutes
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'particle-journey',
      title: 'The Particle Journey',
      subtitle: 'Hours to Days of Travel',
      animation: EarthImpact3D,
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="right" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🚀 The Slower Particle Storm
            </h3>
            <p className="text-lg leading-relaxed">
              While light travels instantly, the charged particles from solar flares take much longer, 
              traveling at speeds up to <AnimatedCounter from={0} to={2000} suffix=" miles per second" className="text-accent font-bold" />.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <p className="font-semibold text-primary">Travel Time</p>
                <p className="text-sm text-muted-foreground">Particles can take 1-3 days to reach Earth, depending on their speed.</p>
              </motion.div>
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <p className="font-semibold text-secondary">Space Environment</p>
                <p className="text-sm text-muted-foreground">Particles interact with the solar wind and magnetic fields during their journey.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <ParticleField 
            density={60} 
            color="hsl(45, 100%, 65%)" 
            speed={1.5}
            className="rounded-lg h-40" 
          />
        </div>
      )
    },
    {
      id: 'solar-wind-interaction',
      title: 'Interacting with Solar Wind',
      subtitle: 'The Space Highway',
      image: flareCharacter,
      imageAlt: 'Solar wind interaction visualization',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              🌊 Riding the Solar Wind
            </h3>
            <p className="text-lg leading-relaxed">
              Solar flare particles don't travel through empty space - they interact with the solar wind, 
              which can either speed them up or slow them down on their journey to Earth.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Fast Solar Wind</h4>
                <p className="text-sm">Can accelerate particles, making them reach Earth faster.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Slow Solar Wind</h4>
                <p className="text-sm">Can create obstacles that slow down particle movement.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-32 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute top-1/4 w-3 h-3 bg-primary rounded-full"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/2 w-2 h-2 bg-secondary rounded-full"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.div
              className="absolute top-3/4 w-4 h-4 bg-accent rounded-full"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>
        </div>
      )
    },
    {
      id: 'heliosphere-boundary',
      title: 'Crossing the Heliosphere',
      subtitle: 'The Sun\'s Protective Bubble',
      image: solarFlareHero,
      imageAlt: 'Heliosphere boundary crossing',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="up" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🛡️ The Heliosphere Shield
            </h3>
            <p className="text-lg leading-relaxed">
              The heliosphere is a bubble of solar wind that extends far beyond Pluto, 
              protecting our solar system from interstellar particles and radiation.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">Termination Shock</h4>
                <p className="text-sm">Where solar wind slows from supersonic to subsonic speeds.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Heliopause</h4>
                <p className="text-sm">The boundary where solar wind meets interstellar wind.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-40 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold">
              Heliosphere
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'approaching-earth',
      title: 'Approaching Earth',
      subtitle: 'The Final Leg of the Journey',
      image: earthAurora,
      imageAlt: 'Solar flare particles approaching Earth',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              🌍 Getting Close to Home
            </h3>
            <p className="text-lg leading-relaxed">
              As solar flare particles approach Earth, they begin to interact with our planet's 
              magnetic field, which extends about <AnimatedCounter from={0} to={40000} suffix=" miles" className="text-accent font-bold" /> into space.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 15 }}
              >
                <p className="font-semibold text-primary">Magnetosphere</p>
                <p className="text-sm text-muted-foreground">Earth's magnetic field creates a protective bubble around our planet.</p>
              </motion.div>
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 15 }}
              >
                <p className="font-semibold text-secondary">Van Allen Belts</p>
                <p className="text-sm text-muted-foreground">Radiation belts that trap charged particles around Earth.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-32 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute right-4 top-1/2 w-8 h-8 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 w-16 h-16 border-2 border-secondary rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold">
              Earth
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'bow-shock',
      title: 'The Bow Shock',
      subtitle: 'Earth\'s First Line of Defense',
      image: solarFlareHero,
      imageAlt: 'Bow shock around Earth',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="left" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🛡️ The Bow Shock Wave
            </h3>
            <p className="text-lg leading-relaxed">
              Like a boat creating waves in water, Earth's magnetic field creates a shock wave in the solar wind, 
              slowing down and compressing incoming particles before they reach our planet.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">Compression Zone</h4>
                <p className="text-sm">Solar wind particles are slowed and heated as they approach Earth.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Magnetosheath</h4>
                <p className="text-sm">The turbulent region between the bow shock and magnetopause.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-40 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute left-1/2 top-1/2 w-20 h-20 border-2 border-secondary rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 w-32 h-32 border border-primary rounded-full opacity-50"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold">
              Bow Shock
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'magnetopause',
      title: 'The Magnetopause',
      subtitle: 'Where Solar Wind Meets Earth\'s Field',
      animation: Magnetosphere3D,
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              🔄 The Magnetopause Boundary
            </h3>
            <p className="text-lg leading-relaxed">
              The magnetopause is the boundary where Earth's magnetic field pushes back against the solar wind, 
              creating a dynamic interface that changes shape based on solar activity.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Dayside</h4>
                <p className="text-sm">Compressed by solar wind, located about 6-10 Earth radii from the surface.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Nightside</h4>
                <p className="text-sm">Stretched out into a long tail extending millions of miles behind Earth.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-32 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute left-1/2 top-1/2 w-24 h-24 border-2 border-secondary rounded-full"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 w-16 h-16 border border-primary rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold">
              Magnetopause
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'magnetic-reconnection',
      title: 'Magnetic Reconnection',
      subtitle: 'Energy Transfer at the Boundary',
      animation: Magnetosphere3D,
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="right" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              ⚡ Magnetic Reconnection Events
            </h3>
            <p className="text-lg leading-relaxed">
              At the magnetopause, magnetic field lines from Earth and the solar wind can reconnect, 
              allowing some solar wind particles to enter Earth's magnetic field and create geomagnetic storms.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <p className="font-semibold text-primary">Energy Transfer</p>
                <p className="text-sm text-muted-foreground">Solar wind energy is transferred to Earth's magnetosphere.</p>
              </motion.div>
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <p className="font-semibold text-secondary">Particle Injection</p>
                <p className="text-sm text-muted-foreground">Charged particles are injected into the magnetosphere.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-32 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute left-1/4 top-1/2 w-8 h-1 bg-primary"
              animate={{ rotate: [0, 45, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-1/4 top-1/2 w-8 h-1 bg-secondary"
              animate={{ rotate: [0, -45, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 w-2 h-2 bg-accent rounded-full"
              animate={{ scale: [1, 2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      )
    },
    {
      id: 'aurora-formation',
      title: 'Aurora Formation',
      subtitle: 'Nature\'s Light Show',
      image: earthAurora,
      imageAlt: 'Aurora borealis formation',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              🌈 Creating the Northern Lights
            </h3>
            <p className="text-lg leading-relaxed">
              When charged particles from solar flares enter Earth's atmosphere, they collide with air molecules, 
              causing them to emit beautiful colored lights known as auroras.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Green Lights</h4>
                <p className="text-sm">Oxygen atoms excited by 300-mile-high collisions.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Red Lights</h4>
                <p className="text-sm">Oxygen atoms at higher altitudes (200-300 miles).</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-32 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-green-400 to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-8 w-full h-4 bg-gradient-to-t from-red-400 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-12 w-full h-2 bg-gradient-to-t from-blue-400 to-transparent"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      )
    },
    {
      id: 'geomagnetic-storm',
      title: 'Geomagnetic Storms',
      subtitle: 'Earth\'s Magnetic Tempests',
      image: solarFlareHero,
      imageAlt: 'Geomagnetic storm visualization',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="up" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🌪️ Magnetic Storms Unleashed
            </h3>
            <p className="text-lg leading-relaxed">
              When large amounts of solar wind energy enter Earth's magnetosphere, they can cause geomagnetic storms 
              that affect electrical systems, communications, and navigation worldwide.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">Kp Index</h4>
                <p className="text-sm">Measures geomagnetic storm intensity from 0 (quiet) to 9 (extreme).</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Storm Effects</h4>
                <p className="text-sm">Can last from hours to days, with effects varying by storm strength.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Minor (Kp 4)
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Moderate (Kp 6)
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Severe (Kp 8)
            </motion.button>
          </div>
        </div>
      )
    },
    {
      id: 'radiation-belts',
      title: 'Van Allen Radiation Belts',
      subtitle: 'Earth\'s Natural Particle Traps',
      image: earthAurora,
      imageAlt: 'Van Allen radiation belts',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              ☢️ Earth's Radiation Belts
            </h3>
            <p className="text-lg leading-relaxed">
              The Van Allen belts are two doughnut-shaped regions of high-energy charged particles 
              trapped by Earth's magnetic field, extending from about 400 to 36,000 miles above Earth.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Inner Belt</h4>
                <p className="text-sm">High-energy protons from cosmic rays, peaks at ~2,000 miles altitude.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Outer Belt</h4>
                <p className="text-sm">Electrons from solar wind, more variable, peaks at ~12,000-25,000 miles.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-40 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute left-1/2 top-1/2 w-32 h-32 border-2 border-primary rounded-full opacity-30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 w-48 h-48 border border-secondary rounded-full opacity-20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold">
              Van Allen Belts
            </div>
          </div>
        </div>
      )
    },

    // CHAPTERS 23-32: Earth Impacts and Effects
    {
      id: 'satellite-impacts',
      title: 'Satellite Disruptions',
      subtitle: 'Space Technology at Risk',
      animation: EarthImpact3D,
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="left" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🛰️ Satellites Under Attack
            </h3>
            <p className="text-lg leading-relaxed">
              Solar flare radiation can damage satellite electronics, cause orientation problems, 
              and disrupt communications. GPS satellites are particularly vulnerable to space weather.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 15 }}
              >
                <p className="font-semibold text-primary">GPS Degradation</p>
                <p className="text-sm text-muted-foreground">Positioning accuracy can be reduced by 30-100 meters during storms.</p>
              </motion.div>
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 15 }}
              >
                <p className="font-semibold text-secondary">Communication Blackouts</p>
                <p className="text-sm text-muted-foreground">TV, radio, and internet satellites can experience signal loss.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="h-24 bg-gradient-cosmic rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Satellite className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-semibold">GPS Satellites</span>
            </motion.div>
            <motion.div 
              className="h-24 bg-gradient-solar rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-semibold">Comm Satellites</span>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'power-grid-effects',
      title: 'Power Grid Vulnerabilities',
      subtitle: 'Electrical Infrastructure at Risk',
      animation: EarthImpact3D,
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              ⚡ Power Grid Disruptions
            </h3>
            <p className="text-lg leading-relaxed">
              Geomagnetic storms can induce currents in power lines, causing transformers to overheat, 
              circuit breakers to trip, and potentially leading to widespread blackouts.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Geomagnetically Induced Currents</h4>
                <p className="text-sm">Extra currents in power lines can damage transformers worth millions.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Hydro-Québec Blackout (1989)</h4>
                <p className="text-sm">6 million people without power for 9 hours due to solar storm.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-32 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full"
              animate={{ scale: [1, 2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 right-1/4 w-6 h-6 bg-secondary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-accent rounded-full"
              animate={{ scale: [1, 2.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold">
              Power Grid Hotspots
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'radio-communication',
      title: 'Radio Communication Effects',
      subtitle: 'HF Radio Blackouts',
      animation: EarthImpact3D,
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="right" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              📻 Radio Blackouts
            </h3>
            <p className="text-lg leading-relaxed">
              Solar flares can cause sudden ionospheric disturbances (SIDs) that absorb HF radio waves, 
              making long-distance radio communication impossible for hours or days.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">HF Radio Frequencies</h4>
                <p className="text-sm">3-30 MHz frequencies most affected by solar flare ionization.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Amateur Radio Impact</h4>
                <p className="text-sm">Ham radio operators often first to notice and report solar flares.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <motion.button
            className="w-full h-20 bg-gradient-solar rounded-lg flex items-center justify-center text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📻 Test Radio Signal
          </motion.button>
        </div>
      )
    },
    {
      id: 'aviation-impacts',
      title: 'Aviation and Spaceflight',
      subtitle: 'Radiation Risks for Flyers',
      image: spaceWeatherImpacts,
      imageAlt: 'Aircraft affected by solar radiation',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              ✈️ Radiation at High Altitudes
            </h3>
            <p className="text-lg leading-relaxed">
              During solar flares, increased radiation at flight altitudes can expose passengers and crew 
              to radiation levels normally experienced only in space, requiring flight rerouting or cancellation.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Polar Routes</h4>
                <p className="text-sm">Flights over polar regions receive highest radiation doses.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Astronaut Safety</h4>
                <p className="text-sm">Space station crews take shelter during major solar events.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="h-24 bg-gradient-cosmic rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plane className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-semibold">Commercial Flights</span>
            </motion.div>
            <motion.div 
              className="h-24 bg-gradient-solar rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-semibold">Space Missions</span>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'pipeline-corrosion',
      title: 'Pipeline and Infrastructure',
      subtitle: 'Underground Effects',
      image: spaceWeatherImpacts,
      imageAlt: 'Pipelines affected by geomagnetic currents',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="up" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🛢️ Pipeline Corrosion
            </h3>
            <p className="text-lg leading-relaxed">
              Geomagnetic storms can induce currents in long metal structures like pipelines, 
              accelerating corrosion and potentially causing leaks or structural damage.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <p className="font-semibold text-primary">Stray Currents</p>
                <p className="text-sm text-muted-foreground">Induced currents can accelerate metal corrosion by 10-100x normal rates.</p>
              </motion.div>
              <motion.div 
                className="p-3 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ x: 10 }}
              >
                <p className="font-semibold text-secondary">Monitoring Systems</p>
                <p className="text-sm text-muted-foreground">Pipeline operators monitor geomagnetic activity to protect infrastructure.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="relative h-32 bg-gradient-cosmic rounded-lg overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold">
              Pipeline Current Flow
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'navigation-systems',
      title: 'Navigation System Disruptions',
      subtitle: 'GPS and Compass Effects',
      image: spaceWeatherImpacts,
      imageAlt: 'Navigation systems affected by solar flares',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              🧭 Navigation Challenges
            </h3>
            <p className="text-lg leading-relaxed">
              Solar storms can affect both satellite-based GPS systems and magnetic compasses, 
              making navigation difficult for ships, aircraft, and vehicles that rely on these technologies.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">GPS Signal Degradation</h4>
                <p className="text-sm">Ionospheric disturbances can delay GPS signals by microseconds.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Magnetic Compass Variation</h4>
                <p className="text-sm">Rapid changes in Earth's magnetic field affect compass accuracy.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-6 py-3 bg-primary/20 border border-primary/30 rounded-lg text-primary font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GPS Navigation
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-secondary/20 border border-secondary/30 rounded-lg text-secondary font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Magnetic Compass
            </motion.button>
          </div>
        </div>
      )
    },
    {
      id: 'biological-effects',
      title: 'Biological and Health Effects',
      subtitle: 'Radiation Exposure Concerns',
      image: spaceWeatherImpacts,
      imageAlt: 'People affected by solar radiation',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="left" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🧬 Radiation and Health
            </h3>
            <p className="text-lg leading-relaxed">
              While Earth's atmosphere provides good protection, increased radiation during solar events 
              can affect aircrew, astronauts, and people at high altitudes. Long-term exposure may increase cancer risk.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">Acute Radiation Syndrome</h4>
                <p className="text-sm">High doses can cause immediate symptoms like nausea and fatigue.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Increased Cancer Risk</h4>
                <p className="text-sm">Long-term exposure to cosmic radiation may increase cancer risk.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            <motion.div 
              className="h-20 bg-gradient-cosmic rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-6 h-6 text-white mb-2" />
              <span className="text-white font-semibold text-xs">Aircrew</span>
            </motion.div>
            <motion.div 
              className="h-20 bg-gradient-solar rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-6 h-6 text-white mb-2" />
              <span className="text-white font-semibold text-xs">Astronauts</span>
            </motion.div>
            <motion.div 
              className="h-20 bg-gradient-aurora rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plane className="w-6 h-6 text-white mb-2" />
              <span className="text-white font-semibold text-xs">Passengers</span>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'economic-impacts',
      title: 'Economic Consequences',
      subtitle: 'The Cost of Space Weather',
      image: spaceWeatherImpacts,
      imageAlt: 'Economic impacts of solar flares',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              💰 The Price of Solar Storms
            </h3>
            <p className="text-lg leading-relaxed">
              Major solar storms can cost billions of dollars in damages, lost productivity, 
              and recovery efforts. The 1989 Quebec blackout alone cost $2 billion (in today's dollars).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Direct Costs</h4>
                <p className="text-sm">Power grid repairs, satellite replacements, and infrastructure damage.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Indirect Costs</h4>
                <p className="text-sm">Lost productivity, disrupted transportation, and emergency response.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <motion.div
            className="h-20 bg-gradient-solar rounded-lg flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold text-lg">$2 Billion+ in Damages</span>
          </motion.div>
        </div>
      )
    },
    {
      id: 'historical-events',
      title: 'Historical Solar Storms',
      subtitle: 'Lessons from the Past',
      image: solarFlareHero,
      imageAlt: 'Historical solar storm events',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="right" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              📚 Famous Solar Storms
            </h3>
            <div className="space-y-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-primary mb-2">Carrington Event (1859)</h4>
                <p className="text-sm">The most powerful solar storm on record, caused auroras visible at the equator and disrupted telegraph systems worldwide.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Halloween Storms (2003)</h4>
                <p className="text-sm">Series of powerful solar flares and CMEs that caused satellite failures and power grid issues.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-semibold text-accent mb-2">Solar Storm of 1989</h4>
                <p className="text-sm">Caused the Quebec blackout affecting 6 million people and damaging power transformers.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg text-primary font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              1859 Event
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-lg text-secondary font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              2003 Storms
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-accent/20 border border-accent/30 rounded-lg text-accent font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              1989 Blackout
            </motion.button>
          </div>
        </div>
      )
    },
    {
      id: 'modern-preparedness',
      title: 'Modern Space Weather Preparedness',
      subtitle: 'Protecting Our Technology',
      image: spaceWeatherImpacts,
      imageAlt: 'Modern space weather monitoring systems',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              🛡️ Building Resilience
            </h3>
            <p className="text-lg leading-relaxed">
              Modern society is taking space weather seriously. Governments, utilities, and satellite operators 
              now monitor solar activity and have contingency plans for solar storms.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">NOAA Space Weather Prediction Center</h4>
                <p className="text-sm">Provides 24/7 monitoring and forecasting of space weather conditions.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Grid Hardening</h4>
                <p className="text-sm">Power companies install protective devices to prevent transformer damage.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="h-24 bg-gradient-cosmic rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-semibold">NOAA SWPC</span>
            </motion.div>
            <motion.div 
              className="h-24 bg-gradient-solar rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-8 h-8 text-white mb-2" />
              <span className="text-white font-semibold">Grid Protection</span>
            </motion.div>
          </div>
        </div>
      )
    },

    // CHAPTERS 43-45: Protection and Future
    {
      id: 'future-threats',
      title: 'Future Solar Threats',
      subtitle: 'What Might Be Coming',
      image: solarFlareHero,
      imageAlt: 'Future solar storm predictions',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="up" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🔮 The Next Big One
            </h3>
            <p className="text-lg leading-relaxed">
              Scientists study past solar events and solar cycles to predict future threats. 
              A Carrington-level event today could cause $2 trillion in damages to our modern infrastructure.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">Solar Cycle 25</h4>
                <p className="text-sm">We're currently in a period of increasing solar activity that peaks around 2025.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Superflare Risk</h4>
                <p className="text-sm">Some scientists worry about extremely rare but devastating superflare events.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <motion.button
            className="w-full h-20 bg-gradient-solar rounded-lg flex items-center justify-center text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌟 Predict Future Storms
          </motion.button>
        </div>
      )
    },
    {
      id: 'protection-strategies',
      title: 'Protection Strategies',
      subtitle: 'Defending Against Solar Storms',
      image: spaceWeatherImpacts,
      imageAlt: 'Protection strategies against solar flares',
      backgroundColor: 'bg-gradient-cosmic',
      content: (
        <ScrollSection animationType="fade" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary">
              🛡️ Solar Storm Defense
            </h3>
            <p className="text-lg leading-relaxed">
              Multiple layers of protection help society prepare for and respond to solar storms, 
              from early warning systems to infrastructure hardening.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-primary mb-2">Early Warning Systems</h4>
                <p className="text-sm">Space weather satellites provide 30-60 minutes warning of incoming CMEs.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Infrastructure Hardening</h4>
                <p className="text-sm">Power grids and satellites designed to withstand geomagnetic storms.</p>
              </motion.div>
            </div>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            <motion.div 
              className="h-20 bg-gradient-cosmic rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Satellite className="w-6 h-6 text-white mb-2" />
              <span className="text-white font-semibold text-xs">Early Warning</span>
            </motion.div>
            <motion.div 
              className="h-20 bg-gradient-solar rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-6 h-6 text-white mb-2" />
              <span className="text-white font-semibold text-xs">Grid Protection</span>
            </motion.div>
            <motion.div 
              className="h-20 bg-gradient-aurora rounded-lg flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-6 h-6 text-white mb-2" />
              <span className="text-white font-semibold text-xs">Satellite Shielding</span>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'conclusion',
      title: 'The Sun-Earth Connection',
      subtitle: 'Our Cosmic Neighborhood',
      image: earthAurora,
      imageAlt: 'Earth and Sun connected by solar activity',
      backgroundColor: 'bg-gradient-solar',
      content: (
        <ScrollSection animationType="slide" direction="right" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">
              🌟 Living with Our Star
            </h3>
            <p className="text-lg leading-relaxed">
              Solar flares and space weather are natural phenomena that have shaped life on Earth for billions of years. 
              While they can be disruptive, they also create beautiful auroras and remind us of our connection to the cosmos.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-primary mb-2">Scientific Understanding</h4>
                <p className="text-sm">Continued research helps us predict and prepare for solar events.</p>
              </motion.div>
              <motion.div 
                className="p-4 bg-glass backdrop-blur-sm rounded-lg border border-glass"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="font-semibold text-secondary mb-2">Technological Adaptation</h4>
                <p className="text-sm">Modern society is building resilience against space weather effects.</p>
              </motion.div>
            </div>
            <p className="text-lg leading-relaxed text-center mt-6">
              <span className="text-accent font-bold">Thank you for joining Flare on this incredible journey!</span> 
              The next time you see the Northern Lights or hear about a GPS issue, you'll know that space weather 
              is connecting us all to the wonders of our Sun. 🌞
            </p>
          </div>
        </ScrollSection>
      ),
      interactiveElements: (
        <div className="mt-6">
          <motion.button
            className="w-full h-20 bg-gradient-solar rounded-lg flex items-center justify-center text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌟 Start the Adventure Again!
          </motion.button>
        </div>
      )
    }
  ];

  // Process all chapters to ensure visual consistency
  const chapters = processAllChapters(chaptersRaw);
  
  // Log processed chapters info
  console.log(`Processed ${chapters.length} chapters. ${
    chaptersRaw.filter(ch => ch.animation && ch.image).length
  } chapters had both animation and image properties.`);
  
  const totalChapters = chapters.length;
  // Current chapter data is already processed
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
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Dynamic Background */}
      <div className={`absolute inset-0 transition-all duration-1000 opacity-20`}>
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
              {/* Image/Animation */}
              <motion.div 
                className="order-1 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                key={`visual-${currentChapter}`}
                transition={{ duration: 0.8 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-aurora">
                  {/* Prioritize animations over static images */}
                  {currentChapterData.animation ? (
                    <currentChapterData.animation />
                  ) : currentChapterData.image ? (
                    <img 
                      src={currentChapterData.image} 
                      alt={currentChapterData.imageAlt || 'Chapter illustration'}
                      className="w-full h-auto animate-float"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-cosmic rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">🌌</div>
                        <p className="text-lg font-semibold">Space Weather Story</p>
                        <p className="text-sm opacity-75">Chapter {currentChapter + 1}</p>
                      </div>
                    </div>
                  )}
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