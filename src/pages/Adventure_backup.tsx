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
    },

    // Coronal Mass Ejections (CMEs) (Slides 23-30)
    {
      id: 23,
      title: "🌊 What is a Coronal Mass Ejection (CME)?",
      content: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
      ttsText: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
      animation: SolarFlareJourney3D
    },
    {
      id: 24,
      title: "💨 CME Speed and Size",
      content: "CMEs can travel at speeds of 1-3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
      ttsText: "CMEs can travel at speeds of 1 to 3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
      animation: SpaceStormSimulation3D
    },
    {
      id: 25,
      title: "🔗 CMEs and Solar Flares - Related Events",
      content: "CMEs often happen together with solar flares, but they're different things. A solar flare is light and energy, while a CME is actual matter being thrown into space.",
      ttsText: "CMEs often happen together with solar flares, but they're different things. A solar flare is light and energy, while a CME is actual matter being thrown into space.",
      animation: SolarFlareJourney3D
    },
    {
      id: 26,
      title: "⏰ How Long Does a CME Take to Reach Earth?",
      content: "It usually takes a CME 1-3 days to travel from the Sun to Earth. Scientists can predict when they'll arrive and how strong they'll be!",
      ttsText: "It usually takes a CME 1 to 3 days to travel from the Sun to Earth. Scientists can predict when they'll arrive and how strong they'll be!",
      animation: SpaceStormSimulation3D
    },
    {
      id: 27,
      title: "🎯 CME Direction - Not All Hit Earth",
      content: "Most CMEs don't hit Earth directly. They can go in any direction, and only some are aimed toward our planet. Scientists watch carefully to see which ones might affect us.",
      ttsText: "Most CMEs don't hit Earth directly. They can go in any direction, and only some are aimed toward our planet. Scientists watch carefully to see which ones might affect us.",
      animation: SpaceStormSimulation3D
    },
    {
      id: 28,
      title: "📊 CME Classification",
      content: "CMEs are classified by their speed and direction. Fast CMEs (over 1,000 km/s) are more likely to cause strong space weather effects on Earth.",
      ttsText: "CMEs are classified by their speed and direction. Fast CMEs over 1,000 kilometers per second are more likely to cause strong space weather effects on Earth.",
      animation: SpaceStormSimulation3D
    },
    {
      id: 29,
      title: "🛰️ How We Study CMEs",
      content: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
      ttsText: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 30,
      title: "🌍 CMEs and Earth's Magnetic Field",
      content: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
      ttsText: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
      animation: Magnetosphere3D
    },

    // Intermediate Space Weather Effects (Slides 31-40)
    {
      id: 31,
      title: "🛡️ Earth's Magnetic Shield",
      content: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
      ttsText: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
      animation: Magnetosphere3D
    },
    {
      id: 32,
      title: "🌌 The Magnetosphere - Our Space Shield",
      content: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
      ttsText: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
      animation: Magnetosphere3D
    },
    {
      id: 33,
      title: "🌍 What Happens When Space Weather Hits Earth?",
      content: "When solar flares and CMEs reach Earth, they can cause beautiful auroras, affect satellites, and sometimes cause power outages. But they also create amazing light shows!",
      ttsText: "When solar flares and CMEs reach Earth, they can cause beautiful auroras, affect satellites, and sometimes cause power outages. But they also create amazing light shows!",
      animation: EarthImpact3D
    },
    {
      id: 34,
      title: "🌌 Aurora - Nature's Light Show",
      content: "Auroras (Northern and Southern Lights) happen when charged particles from space weather hit Earth's atmosphere. They create beautiful dancing lights in the sky!",
      ttsText: "Auroras, also called Northern and Southern Lights, happen when charged particles from space weather hit Earth's atmosphere. They create beautiful dancing lights in the sky!",
      image: "/src/assets/earth-aurora.jpg"
    },
    {
      id: 35,
      title: "📡 Space Weather and Technology",
      content: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
      ttsText: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
      animation: HighSchoolSpaceAdventure3D
    },
    {
      id: 36,
      title: "🛰️ Protecting Satellites",
      content: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in 'safe mode' during strong space weather.",
      ttsText: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in safe mode during strong space weather.",
      animation: HighSchoolSpaceAdventure3D
    },
    {
      id: 37,
      title: "⚡ Space Weather and Power Grids",
      content: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
      ttsText: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
      animation: EarthImpact3D
    },
    {
      id: 38,
      title: "🔮 Predicting Space Weather",
      content: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
      ttsText: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 39,
      title: "🧲 Geomagnetic Storms",
      content: "When a CME hits Earth, it can cause a geomagnetic storm - a major disturbance of Earth's magnetic field that can last for days and affect technology worldwide.",
      ttsText: "When a CME hits Earth, it can cause a geomagnetic storm - a major disturbance of Earth's magnetic field that can last for days and affect technology worldwide.",
      animation: Magnetosphere3D
    },
    {
      id: 40,
      title: "🌐 Earth's Van Allen Radiation Belts",
      content: "Earth has two donut-shaped regions of trapped radiation called the Van Allen Belts. These belts can change shape and intensity during space weather events!",
      ttsText: "Earth has two donut-shaped regions of trapped radiation called the Van Allen Belts. These belts can change shape and intensity during space weather events!",
      image: "/src/assets/earth-aurora.jpg"
    },

    // CME Details (Slides 41-50)
    {
      id: 41,
      title: "📊 CME Classification",
      content: "CMEs are classified by their speed and direction. Fast CMEs (over 1,000 km/s) are more likely to cause strong space weather effects on Earth.",
      ttsText: "CMEs are classified by their speed and direction. Fast CMEs over 1,000 kilometers per second are more likely to cause strong space weather effects on Earth.",
      animation: SpaceStormSimulation3D
    },
    {
      id: 42,
      title: "🛰️ How We Study CMEs",
      content: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
      ttsText: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 43,
      title: "🌍 CMEs and Earth's Magnetic Field",
      content: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
      ttsText: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
      animation: Magnetosphere3D
    },
    {
      id: 44,
      title: "🌀 The Structure of a CME",
      content: "CMEs have a complex structure, often with a leading edge, a central core, and a trailing region. They carry parts of the Sun's magnetic field with them!",
      ttsText: "CMEs have a complex structure, often with a leading edge, a central core, and a trailing region. They carry parts of the Sun's magnetic field with them!",
      animation: SolarFlareJourney3D
    },
    {
      id: 45,
      title: "💢 What Causes CMEs?",
      content: "CMEs are caused by big changes in the Sun's magnetic field. They often come from areas with many sunspots or from long filaments of solar material.",
      ttsText: "CMEs are caused by big changes in the Sun's magnetic field. They often come from areas with many sunspots or from long filaments of solar material.",
      image: "/src/assets/solar-flare-hero.jpg"
    },
    {
      id: 46,
      title: "🪐 CMEs and Other Planets",
      content: "CMEs can hit any planet in our solar system! They affect Mars, Venus, and even the giant planets like Jupiter. Each planet responds differently based on its magnetic field.",
      ttsText: "CMEs can hit any planet in our solar system! They affect Mars, Venus, and even the giant planets like Jupiter. Each planet responds differently based on its magnetic field.",
      animation: ElementarySpaceAdventure3D
    },
    {
      id: 47,
      title: "🔭 Spotting CMEs from Earth",
      content: "Special instruments called coronagraphs block out the bright disk of the Sun, allowing astronomers to see CMEs as they leave the Sun and head into space.",
      ttsText: "Special instruments called coronagraphs block out the bright disk of the Sun, allowing astronomers to see CMEs as they leave the Sun and head into space.",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 48,
      title: "⚖️ The Weight of a CME",
      content: "A typical CME carries billions of tons of solar material! That's like throwing millions of large aircraft into space all at once.",
      ttsText: "A typical CME carries billions of tons of solar material! That's like throwing millions of large aircraft into space all at once.",
      animation: SolarFlareJourney3D
    },
    {
      id: 49,
      title: "🚀 CMEs and Space Exploration",
      content: "CMEs are a big concern for astronauts traveling to the Moon or Mars. Future spacecraft will need good radiation shelters to protect space travelers!",
      ttsText: "CMEs are a big concern for astronauts traveling to the Moon or Mars. Future spacecraft will need good radiation shelters to protect space travelers!",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 50,
      title: "🧠 How We Track Multiple CMEs",
      content: "Sometimes several CMEs happen close together, making it hard to track them. Scientists use computer models and multiple satellites to follow their journey.",
      ttsText: "Sometimes several CMEs happen close together, making it hard to track them. Scientists use computer models and multiple satellites to follow their journey.",
      animation: SpaceStormSimulation3D
    },

    // Earth's Protection and Impact (Slides 51-65)
    {
      id: 51,
      title: "🛡️ Earth's Magnetic Shield",
      content: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
      ttsText: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
      animation: Magnetosphere3D
    },
    {
      id: 52,
      title: "🌌 The Magnetosphere - Our Space Shield",
      content: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
      ttsText: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
      image: "/src/assets/earth-aurora.jpg"
    },
    {
      id: 53,
      title: "🌍 What Happens When Space Weather Hits Earth?",
      content: "When solar flares and CMEs reach Earth, they can cause beautiful auroras, affect satellites, and sometimes cause power outages. But they also create amazing light shows!",
      ttsText: "When solar flares and CMEs reach Earth, they can cause beautiful auroras, affect satellites, and sometimes cause power outages. But they also create amazing light shows!",
      animation: EarthImpact3D
    },
    {
      id: 54,
      title: "🌌 Aurora - Nature's Light Show",
      content: "Auroras (Northern and Southern Lights) happen when charged particles from space weather hit Earth's atmosphere. They create beautiful dancing lights in the sky!",
      ttsText: "Auroras, also called Northern and Southern Lights, happen when charged particles from space weather hit Earth's atmosphere. They create beautiful dancing lights in the sky!",
      image: "/src/assets/earth-aurora.jpg"
    },
    {
      id: 55,
      title: "📡 Space Weather and Technology",
      content: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
      ttsText: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
      animation: HighSchoolSpaceAdventure3D
    },
    {
      id: 56,
      title: "🛰️ Protecting Satellites",
      content: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in 'safe mode' during strong space weather.",
      ttsText: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in safe mode during strong space weather.",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 57,
      title: "⚡ Space Weather and Power Grids",
      content: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
      ttsText: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
      animation: EarthImpact3D
    },
    {
      id: 58,
      title: "🔮 Predicting Space Weather",
      content: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
      ttsText: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 59,
      title: "🧲 Geomagnetic Storms",
      content: "When a CME hits Earth, it can cause a geomagnetic storm - a major disturbance of Earth's magnetic field that can last for days and affect technology worldwide.",
      ttsText: "When a CME hits Earth, it can cause a geomagnetic storm - a major disturbance of Earth's magnetic field that can last for days and affect technology worldwide.",
      animation: Magnetosphere3D
    },
    {
      id: 60,
      title: "🌐 Earth's Van Allen Radiation Belts",
      content: "Earth has two donut-shaped regions of trapped radiation called the Van Allen Belts. These belts can change shape and intensity during space weather events!",
      ttsText: "Earth has two donut-shaped regions of trapped radiation called the Van Allen Belts. These belts can change shape and intensity during space weather events!",
      image: "/src/assets/earth-aurora.jpg"
    },
    {
      id: 61,
      title: "⚓ Earth's Magnetic Poles",
      content: "Earth's magnetic poles are not exactly at the geographic North and South Poles - and they move over time! The magnetic field can even flip completely every few hundred thousand years.",
      ttsText: "Earth's magnetic poles are not exactly at the geographic North and South Poles - and they move over time! The magnetic field can even flip completely every few hundred thousand years.",
      animation: Magnetosphere3D
    },
    {
      id: 62,
      title: "🌊 Ocean Currents and Earth's Magnetic Field",
      content: "Earth's magnetic field is partly generated by the movement of liquid metal in the outer core. It's like electric currents flowing deep inside our planet!",
      ttsText: "Earth's magnetic field is partly generated by the movement of liquid metal in the outer core. It's like electric currents flowing deep inside our planet!",
      image: `${WEB_IMAGE_PATH}/earth-core.jpg`
    },
    {
      id: 63,
      title: "🌋 Volcanic Rocks and Earth's Magnetic History",
      content: "Scientists study ancient volcanic rocks to learn about Earth's magnetic field in the past. The rocks record the direction of the magnetic field when they cooled!",
      ttsText: "Scientists study ancient volcanic rocks to learn about Earth's magnetic field in the past. The rocks record the direction of the magnetic field when they cooled!",
      animation: ElementarySpaceAdventure3D
    },
    {
      id: 64,
      title: "🌦️ Space Weather vs. Earth Weather",
      content: "Space weather and Earth weather are very different! Earth weather happens in our atmosphere, while space weather comes from the Sun and affects the space around Earth.",
      ttsText: "Space weather and Earth weather are very different! Earth weather happens in our atmosphere, while space weather comes from the Sun and affects the space around Earth.",
      image: "/src/assets/earth-aurora.jpg"
    },
    {
      id: 65,
      title: "🌎 Animals and the Magnetic Field",
      content: "Many animals, like birds, sea turtles, and even some mammals, can sense Earth's magnetic field! They use it to navigate during long migrations.",
      ttsText: "Many animals, like birds, sea turtles, and even some mammals, can sense Earth's magnetic field! They use it to navigate during long migrations.",
      animation: ElementarySpaceAdventure3D
    },

    // Real-world Examples and Conclusion (Slides 66-75)
    {
      id: 66,
      title: "📅 The Carrington Event - 1859",
      content: "The biggest space weather event ever recorded happened in 1859. It caused auroras visible worldwide and would have caused major problems if it happened today!",
      ttsText: "The biggest space weather event ever recorded happened in 1859. It caused auroras visible worldwide and would have caused major problems if it happened today!",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 67,
      title: "🌍 Space Weather Around the World",
      content: "Space weather affects the whole world, but some places more than others. Areas near the North and South Poles see more auroras and space weather effects.",
      ttsText: "Space weather affects the whole world, but some places more than others. Areas near the North and South Poles see more auroras and space weather effects.",
      animation: Magnetosphere3D
    },
    {
      id: 68,
      title: "👨‍🚀 Space Weather and Astronauts",
      content: "Astronauts in space need special protection from space weather. They can hide in shielded parts of the space station during strong solar storms.",
      ttsText: "Astronauts in space need special protection from space weather. They can hide in shielded parts of the space station during strong solar storms.",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 69,
      title: "🔬 How Scientists Study Space Weather",
      content: "Scientists use ground-based telescopes, satellites, and computer models to study space weather. They work together around the world to understand and predict it.",
      ttsText: "Scientists use ground-based telescopes, satellites, and computer models to study space weather. They work together around the world to understand and predict it.",
      animation: HighSchoolSpaceAdventure3D
    },
    {
      id: 70,
      title: "🌐 Space Weather and Climate",
      content: "While space weather doesn't directly cause climate change, it can affect Earth's upper atmosphere and may have small effects on our weather patterns.",
      ttsText: "While space weather doesn't directly cause climate change, it can affect Earth's upper atmosphere and may have small effects on our weather patterns.",
      image: "/src/assets/earth-aurora.jpg"
    },
    {
      id: 71,
      title: "🚀 Future of Space Weather Research",
      content: "Scientists are developing better ways to predict space weather and protect our technology. New missions and instruments will help us understand space weather even better!",
      ttsText: "Scientists are developing better ways to predict space weather and protect our technology. New missions and instruments will help us understand space weather even better!",
      animation: MiddleSchoolSpaceAdventure3D
    },
    {
      id: 72,
      title: "📱 Space Weather Apps",
      content: "There are special apps that can alert you about space weather! They can tell you when aurora might be visible or when satellites might be affected.",
      ttsText: "There are special apps that can alert you about space weather! They can tell you when aurora might be visible or when satellites might be affected.",
      image: "/src/assets/space-weather-impacts.jpg"
    },
    {
      id: 73,
      title: "🎓 Becoming a Space Weather Scientist",
      content: "If you're interested in space weather, you could become a space physicist, astronomer, or engineer who designs protective systems for satellites and power grids!",
      ttsText: "If you're interested in space weather, you could become a space physicist, astronomer, or engineer who designs protective systems for satellites and power grids!",
      animation: HighSchoolSpaceAdventure3D
    },
    {
      id: 74,
      title: "🧠 Test Your Knowledge!",
      content: "Let's see how much you've learned about space weather! Answer this question to test your understanding.",
      ttsText: "Let's see how much you've learned about space weather! Answer this question to test your understanding.",
      interactive: true,
      quiz: {
        question: "What causes solar flares?",
        options: [
          "The Sun getting too hot",
          "Magnetic energy being released in the Sun's atmosphere",
          "Earth's gravity pulling on the Sun",
          "The Sun spinning too fast"
        ],
        correct: 1,
        explanation: "Solar flares happen when magnetic energy is suddenly released in the Sun's atmosphere, creating bright flashes of light!"
      }
    },
    {
      id: 75,
      title: "🌟 Congratulations, Space Weather Explorer!",
      content: "You've completed your space weather adventure! You now know about the Sun, solar flares, CMEs, and how they affect Earth. Keep exploring the amazing world of space science!",
      ttsText: "Congratulations, Space Weather Explorer! You've completed your space weather adventure! You now know about the Sun, solar flares, CMEs, and how they affect Earth. Keep exploring the amazing world of space science!",
      animation: ElementarySpaceAdventure3D
    }
  ];

  useEffect(() => {
    if (slides[currentSlide]?.interactive) {
      setShowQuiz(true);
    } else {
      setShowQuiz(false);
      setQuizAnswer(null);
      setShowQuizResult(false);
    }
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      stop();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      stop();
    }
  };

  const handleReset = () => {
    setCurrentSlide(0);
    stop();
  };

  const handlePlay = () => {
    if (!isPlaying) {
      speak(slides[currentSlide].ttsText);
      setIsPlaying(true);
    } else {
      stop();
      setIsPlaying(false);
    }
  };

  const handleQuizAnswer = (index: number) => {
    setQuizAnswer(index);
    setShowQuizResult(true);
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-8" ref={slideRef}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Space Weather Adventure</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleReset}>
            <Home className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Progress value={(currentSlide + 1) / slides.length * 100} className="h-2" />

      <Card className="shadow-lg">
        <CardContent className="pt-6 min-h-[500px]">
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-center">{slides[currentSlide].title}</h2>
            
            <div className="min-h-[300px] flex justify-center items-center">
              {slides[currentSlide].animation ? (
                <div className="w-full h-[300px]">
                  {React.createElement(slides[currentSlide].animation)}
                </div>
              ) : slides[currentSlide].image ? (
                <div className="w-full h-[300px] flex justify-center">
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title} 
                    className="max-h-[300px] object-contain" 
                  />
                </div>
              ) : (
                <div className="w-full h-[300px] flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-xl font-semibold">
                  Space Weather Interactive
                </div>
              )}
            </div>

            <p className="text-lg">{slides[currentSlide].content}</p>

            {showQuiz && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{slides[currentSlide].quiz?.question}</h3>
                <div className="space-y-2">
                  {slides[currentSlide].quiz?.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      variant={quizAnswer === index ? "default" : "outline"}
                      className="w-full justify-start"
                      disabled={showQuizResult}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {showQuizResult && (
                  <div className={`mt-4 p-3 rounded-lg ${quizAnswer === slides[currentSlide].quiz?.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <p className="font-semibold">
                      {quizAnswer === slides[currentSlide].quiz?.correct ? 'Correct!' : 'Not quite right.'}
                    </p>
                    <p>{slides[currentSlide].quiz?.explanation}</p>
                  </div>
                )}
              </div>
            )}

            <TTSControls
              text={slides[currentSlide].ttsText}
              isPlaying={isPlaying}
              onToggle={handlePlay}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button 
          onClick={handlePrev} 
          disabled={currentSlide === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2"
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Adventure;