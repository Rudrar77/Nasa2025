import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Home, RotateCcw } from 'lucide-react';
import TTSControls from '@/components/TTSControls';
import SolarFormation3D from '@/components/animations3D/SolarFormation3D';
import SolarFlareJourney3D from '@/components/animations3D/SolarFlareJourney3D';
import Magnetosphere3D from '@/components/animations3D/Magnetosphere3D';
import EarthImpact3D from '@/components/animations3D/EarthImpact3D';
import ElementarySpaceAdventure3D from '@/components/animations3D/ElementarySpaceAdventure3D';
import MiddleSchoolSpaceAdventure3D from '@/components/animations3D/MiddleSchoolSpaceAdventure3D';
import HighSchoolSpaceAdventure3D from '@/components/animations3D/HighSchoolSpaceAdventure3D';
import SpaceStormSimulation3D from '@/components/animations3D/SpaceStormSimulation3D';
import useTTS from '@/hooks/useTTS';

interface Slide {
  id: number;
  title: string;
  content: string;
  ttsText: string;
  animation?: React.ComponentType<any>;
  image?: string;
  interactive?: boolean;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

const Adventure: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const { speak, stop, speaking } = useTTS();
  const slideRef = useRef<HTMLDivElement>(null);

  // Web image path for static images (public folder)
  const WEB_IMAGE_PATH = '/images/space';
  
  // 75 educational slides covering space weather concepts
  const slides: Slide[] = [
    // Introduction (Slides 1-3)
    {
      id: 1,
      title: "🌟 Welcome to Your Space Weather Adventure! 🌟",
      content: "Get ready to explore the amazing world of space weather! We'll learn about the Sun, solar flares, and how they affect Earth. This adventure is designed just for you!",
      ttsText: "Welcome to your space weather adventure! Get ready to explore the amazing world of space weather. We'll learn about the Sun, solar flares, and how they affect Earth. This adventure is designed just for you!",
      animation: ElementarySpaceAdventure3D
    },
    {
      id: 2,
      title: "🌦️ What is Space Weather?",
      content: "Space weather is like Earth's weather, but in space! It includes things like solar flares, solar wind, and magnetic storms that can affect our planet and technology.",
      ttsText: "Space weather is like Earth's weather, but in space! It includes things like solar flares, solar wind, and magnetic storms that can affect our planet and technology.",
      animation: SpaceStormSimulation3D
    },
    {
      id: 3,
      title: "🔎 Why Study Space Weather?",
      content: "Space weather affects our technology, astronauts in space, and even power grids on Earth. By understanding it, we can protect ourselves and our equipment!",
      ttsText: "Space weather affects our technology, astronauts in space, and even power grids on Earth. By understanding it, we can protect ourselves and our equipment!",
      animation: EarthImpact3D
    },

    // The Sun Basics (Slides 4-14)
    {
      id: 4,
      title: "☀️ Meet Our Sun - The Star of Our Solar System",
      content: "Our Sun is a giant ball of hot gas that gives us light and heat. It's so big that 1.3 million Earths could fit inside it!",
      ttsText: "Our Sun is a giant ball of hot gas that gives us light and heat. It's so big that 1.3 million Earths could fit inside it!",
      animation: SolarFormation3D
    },
    {
      id: 5,
      title: "🔥 The Sun's Incredible Heat",
      content: "The Sun's surface is about 5,500°C (9,932°F) - that's hot enough to melt almost anything! The center is even hotter at 15 million°C!",
      ttsText: "The Sun's surface is about 5,500 degrees Celsius - that's hot enough to melt almost anything! The center is even hotter at 15 million degrees Celsius!",
      animation: SolarFormation3D
    },
    {
      id: 6,
      title: "⚡ How the Sun Makes Energy",
      content: "The Sun makes energy by fusing hydrogen atoms together to make helium. This process is called nuclear fusion and it creates enormous amounts of energy!",
      ttsText: "The Sun makes energy by fusing hydrogen atoms together to make helium. This process is called nuclear fusion and it creates enormous amounts of energy!",
      animation: SolarFormation3D
    },
    {
      id: 7,
      title: "🌞 The Sun's Layers",
      content: "The Sun has different layers: the core (center), radiative zone, convective zone, photosphere (what we see), chromosphere, and corona (outer atmosphere).",
      ttsText: "The Sun has different layers: the core at the center, radiative zone, convective zone, photosphere which is what we see, chromosphere, and corona which is the outer atmosphere.",
      animation: SolarFormation3D
    },
    {
      id: 8,
      title: "🌍 The Sun and Earth's Distance",
      content: "Earth is about 93 million miles (150 million kilometers) away from the Sun. Light from the Sun takes about 8 minutes to reach Earth!",
      ttsText: "Earth is about 93 million miles away from the Sun. Light from the Sun takes about 8 minutes to reach Earth!"
    },
    {
      id: 9,
      title: "⭐ Sunspots - Dark Spots on the Sun",
      content: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
      ttsText: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
      animation: SolarFormation3D
    },
    {
      id: 10,
      title: "🌊 Solar Wind - The Sun's Breath",
      content: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
      ttsText: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
      animation: SpaceStormSimulation3D
    },
    {
      id: 11,
      title: "🔄 The Sun's Magnetic Field",
      content: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
      ttsText: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
      animation: Magnetosphere3D
    },
    {
      id: 12,
      title: "📊 The Sun's 11-Year Cycle",
      content: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares.",
      ttsText: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares."
    },
    {
      id: 13,
      title: "🏆 The Sun's Amazing Statistics",
      content: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
      ttsText: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
      animation: SolarFormation3D
    },
    {
      id: 14,
      title: "⏰ The Sun's Lifetime",
      content: "Our Sun is about 4.6 billion years old and will live for another 5 billion years before it runs out of hydrogen fuel in its core.",
      ttsText: "Our Sun is about 4.6 billion years old and will live for another 5 billion years before it runs out of hydrogen fuel in its core.",
      animation: SolarFormation3D
    },

    // Solar Flares (Slides 15-22)
    {
      id: 15,
      title: "💥 What is a Solar Flare?",
      content: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
      ttsText: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
      animation: SolarFlareJourney3D
    },
    {
      id: 16,
      title: "⚡ Solar Flare Energy",
      content: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
      ttsText: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
      animation: SolarFlareJourney3D
    },
    {
      id: 17,
      title: "🌈 Different Types of Solar Flares",
      content: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
      ttsText: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
      animation: SolarFlareJourney3D
    },
    {
      id: 18,
      title: "⏱️ How Long Do Solar Flares Last?",
      content: "Solar flares can last from just a few minutes to several hours. The biggest flares can last for many hours and release energy for days!",
      ttsText: "Solar flares can last from just a few minutes to several hours. The biggest flares can last for many hours and release energy for days!",
      animation: SolarFlareJourney3D
    },
    {
      id: 19,
      title: "🔍 How Scientists Detect Solar Flares",
      content: "Scientists use special telescopes and satellites to watch the Sun 24/7. They can detect solar flares in different types of light that our eyes can't see.",
      ttsText: "Scientists use special telescopes and satellites to watch the Sun 24/7. They can detect solar flares in different types of light that our eyes can't see."
    },
    {
      id: 20,
      title: "📡 Solar Flares and Radio Waves",
      content: "Solar flares can affect radio communications on Earth. They can cause radio blackouts or make radio signals stronger in some areas.",
      ttsText: "Solar flares can affect radio communications on Earth. They can cause radio blackouts or make radio signals stronger in some areas.",
      animation: EarthImpact3D
    },
    {
      id: 21,
      title: "🎯 The Biggest Solar Flare Ever Recorded",
      content: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
      ttsText: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
      animation: SolarFlareJourney3D
    },
    {
      id: 22,
      title: "🛡️ Protecting Against Solar Flares",
      content: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
      ttsText: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
      animation: MiddleSchoolSpaceAdventure3D
    }