import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Globe, Thermometer, Ruler, Clock, Scale, Droplet, Mountain, Wind,
  Flame, Cloud, Sparkles, Waves, Target, Info, BarChart3
} from 'lucide-react';

interface PlanetData {
  id: string;
  name: string;
  diameter: string;
  mass: string;
  gravity: string;
  distance: string;
  dayLength: string;
  yearLength: string;
  temperature: string;
  atmosphere: string;
  moons: number;
  icon: React.ReactNode;
  color: string;
  funFact: string;
  texture: string;
}

const PlanetComparison: React.FC = () => {
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>(['earth', 'mars']);

  const planets: PlanetData[] = [
    {
      id: 'mercury',
      name: 'Mercury',
      diameter: '4,880 km (0.38× Earth)',
      mass: '3.3011×10^23 kg (0.055× Earth)',
      gravity: '3.7 m/s² (0.38× Earth)',
      distance: '57.9 million km (0.39 AU)',
      dayLength: '58.6 Earth days',
      yearLength: '88 Earth days',
      temperature: '-173°C to 427°C',
      atmosphere: 'Minimal - Oxygen, Sodium, Hydrogen',
      moons: 0,
      icon: <Flame className="w-5 h-5" />,
      color: 'text-amber-300',
      funFact: "Mercury's surface resembles our Moon with craters and has no real atmosphere to protect it from impacts.",
      texture: '/textures/mercury.jpg'
    },
    {
      id: 'venus',
      name: 'Venus',
      diameter: '12,104 km (0.95× Earth)',
      mass: '4.8675×10^24 kg (0.815× Earth)',
      gravity: '8.87 m/s² (0.9× Earth)',
      distance: '108.2 million km (0.72 AU)',
      dayLength: '243 Earth days',
      yearLength: '225 Earth days',
      temperature: '462°C (average)',
      atmosphere: 'Carbon Dioxide, Nitrogen, Sulfur Dioxide',
      moons: 0,
      icon: <Cloud className="w-5 h-5" />,
      color: 'text-yellow-200',
      funFact: "Venus rotates backward compared to other planets, with the Sun rising in the west and setting in the east.",
      texture: '/textures/venus.jpg'
    },
    {
      id: 'earth',
      name: 'Earth',
      diameter: '12,742 km',
      mass: '5.97237×10^24 kg',
      gravity: '9.8 m/s²',
      distance: '149.6 million km (1 AU)',
      dayLength: '24 hours',
      yearLength: '365.25 days',
      temperature: '-88°C to 58°C',
      atmosphere: 'Nitrogen, Oxygen, Argon, Carbon Dioxide',
      moons: 1,
      icon: <Globe className="w-5 h-5" />,
      color: 'text-blue-400',
      funFact: "Earth is the only planet not named after a god - its name comes from Old English and Germanic words for \"ground\".",
      texture: '/textures/earth.jpg'
    },
    {
      id: 'mars',
      name: 'Mars',
      diameter: '6,779 km (0.53× Earth)',
      mass: '6.4171×10^23 kg (0.107× Earth)',
      gravity: '3.71 m/s² (0.38× Earth)',
      distance: '227.9 million km (1.52 AU)',
      dayLength: '24 hours 37 minutes',
      yearLength: '687 Earth days',
      temperature: '-153°C to 20°C',
      atmosphere: 'Carbon Dioxide, Nitrogen, Argon',
      moons: 2,
      icon: <Flame className="w-5 h-5" />,
      color: 'text-red-500',
      funFact: "Mars has the largest dust storms in the solar system, sometimes engulfing the entire planet for months.",
      texture: '/textures/mars.jpg'
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      diameter: '139,820 km (11× Earth)',
      mass: '1.8982×10^27 kg (317.8× Earth)',
      gravity: '24.79 m/s² (2.53× Earth)',
      distance: '778.5 million km (5.2 AU)',
      dayLength: '9 hours 56 minutes',
      yearLength: '11.86 Earth years',
      temperature: '-145°C (cloud top)',
      atmosphere: 'Hydrogen, Helium, Methane, Ammonia',
      moons: 79,
      icon: <Wind className="w-5 h-5" />,
      color: 'text-amber-100',
      funFact: "Jupiter's Great Red Spot is a storm that has been raging for at least 400 years and is larger than Earth.",
      texture: '/textures/jupiter.jpg'
    },
    {
      id: 'saturn',
      name: 'Saturn',
      diameter: '116,460 km (9.14× Earth)',
      mass: '5.6834×10^26 kg (95.16× Earth)',
      gravity: '10.44 m/s² (1.07× Earth)',
      distance: '1.4 billion km (9.5 AU)',
      dayLength: '10 hours 42 minutes',
      yearLength: '29.45 Earth years',
      temperature: '-178°C (average)',
      atmosphere: 'Hydrogen, Helium, Methane',
      moons: 82,
      icon: <Sparkles className="w-5 h-5" />,
      color: 'text-yellow-100',
      funFact: "Saturn is so light that it would float in water if there were an ocean big enough to hold it.",
      texture: '/textures/saturn.jpg'
    },
    {
      id: 'uranus',
      name: 'Uranus',
      diameter: '50,724 km (4× Earth)',
      mass: '8.6810×10^25 kg (14.54× Earth)',
      gravity: '8.69 m/s² (0.89× Earth)',
      distance: '2.9 billion km (19.8 AU)',
      dayLength: '17 hours 14 minutes',
      yearLength: '84 Earth years',
      temperature: '-224°C (average)',
      atmosphere: 'Hydrogen, Helium, Methane',
      moons: 27,
      icon: <Waves className="w-5 h-5" />,
      color: 'text-cyan-300',
      funFact: "Uranus rotates on its side with an axial tilt of about 98 degrees, likely due to a collision with an Earth-sized object.",
      texture: '/textures/uranus.jpg'
    },
    {
      id: 'neptune',
      name: 'Neptune',
      diameter: '49,244 km (3.9× Earth)',
      mass: '1.02413×10^26 kg (17.15× Earth)',
      gravity: '11.15 m/s² (1.14× Earth)',
      distance: '4.5 billion km (30.1 AU)',
      dayLength: '16 hours 6 minutes',
      yearLength: '164.8 Earth years',
      temperature: '-218°C (average)',
      atmosphere: 'Hydrogen, Helium, Methane',
      moons: 14,
      icon: <Wind className="w-5 h-5" />,
      color: 'text-blue-600',
      funFact: "Neptune has the strongest winds in the solar system, reaching speeds of 2,100 km/h (1,300 mph).",
      texture: '/textures/neptune.jpg'
    }
  ];

  const handlePlanetSelection = (planetId: string) => {
    if (selectedPlanets.includes(planetId)) {
      // Remove if already selected
      if (selectedPlanets.length > 1) { // Don't allow removing if only one planet is selected
        setSelectedPlanets(selectedPlanets.filter(id => id !== planetId));
      }
    } else {
      // Add if not already selected
      if (selectedPlanets.length < 3) { // Limit to 3 planets for comparison
        setSelectedPlanets([...selectedPlanets, planetId]);
      } else {
        // Replace the first planet if already at limit
        setSelectedPlanets([...selectedPlanets.slice(1), planetId]);
      }
    }
  };

  const compareMetric = (metric: keyof PlanetData, label: string, icon: React.ReactNode) => {
    return (
      <div className="mt-4 border-t border-gray-700/30 pt-4">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedPlanets.map(planetId => {
            const planet = planets.find(p => p.id === planetId);
            if (!planet) return null;
            
            return (
              <div key={`${planetId}-${metric}`} className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`${planet.color}`}>{planet.icon}</div>
                  <span className="font-medium text-sm">{planet.name}</span>
                </div>
                <p className="text-sm">{planet[metric]}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-glass/20 backdrop-blur-md border-glass p-6 my-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Planet Comparison Tool
        </h2>
        <p className="text-muted-foreground mt-2">
          Compare up to three planets side by side to explore their differences
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Select Planets to Compare (max 3)</h3>
        <div className="flex flex-wrap gap-2">
          {planets.map(planet => (
            <button
              key={planet.id}
              onClick={() => handlePlanetSelection(planet.id)}
              className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 transition-colors ${
                selectedPlanets.includes(planet.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted-foreground/10'
              }`}
            >
              <span className={planet.color}>{planet.icon}</span>
              {planet.name}
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="physical">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="physical">Physical Properties</TabsTrigger>
          <TabsTrigger value="orbital">Orbital Properties</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="physical" className="pt-4">
          {compareMetric('diameter', 'Diameter', <Ruler className="w-4 h-4" />)}
          {compareMetric('mass', 'Mass', <Scale className="w-4 h-4" />)}
          {compareMetric('gravity', 'Surface Gravity', <BarChart3 className="w-4 h-4" />)}
        </TabsContent>
        
        <TabsContent value="orbital" className="pt-4">
          {compareMetric('distance', 'Distance from Sun', <Target className="w-4 h-4" />)}
          {compareMetric('dayLength', 'Day Length', <Clock className="w-4 h-4" />)}
          {compareMetric('yearLength', 'Year Length', <Globe className="w-4 h-4" />)}
        </TabsContent>
        
        <TabsContent value="environment" className="pt-4">
          {compareMetric('temperature', 'Temperature Range', <Thermometer className="w-4 h-4" />)}
          {compareMetric('atmosphere', 'Atmosphere', <Cloud className="w-4 h-4" />)}
          {compareMetric('funFact', 'Interesting Fact', <Info className="w-4 h-4" />)}
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-black/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Did You Know?</h3>
        <p className="text-sm text-muted-foreground">
          The planets in our solar system vary enormously in size. You could fit about 1,300 Earths inside Jupiter, 
          the largest planet. Despite their differences, all planets follow Kepler's laws of planetary motion, with 
          planets closer to the Sun moving faster in their orbits than those farther away.
        </p>
      </div>
    </Card>
  );
};

export default PlanetComparison;