import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ChevronLeft, ChevronRight, Home, RotateCcw, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TTSControls from '../components/TTSControls';
import GsapAnimation from '../components/animations/GsapAnimation';

interface Slide {
  id: number;
  title: string;
  content: string;
  ttsText: string;
  category: 'Introduction' | 'Solar Physics' | 'Space Weather' | 'Earth Effects' | 'Technology Impact' | 'Historical Events' | 'Future Predictions';
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

const Adventure: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Complete 75 educational slides covering space weather concepts
  const slides: Slide[] = [
    // Introduction (Slides 1-10)
    {
      id: 1,
      title: "🌟 Welcome to Your Space Weather Adventure! 🌟",
      content: "Get ready to explore the amazing world of space weather! We'll learn about the Sun, solar flares, and how they affect Earth. This adventure is designed just for you!",
      ttsText: "Welcome to your space weather adventure! Get ready to explore the amazing world of space weather. We'll learn about the Sun, solar flares, and how they affect Earth. This adventure is designed just for you!",
      category: 'Introduction'
    },
    {
      id: 2,
      title: "🌌 What is Space Weather?",
      content: "Space weather is like Earth's weather, but in space! It includes things like solar flares, solar wind, and magnetic storms that can affect our planet and technology.",
      ttsText: "Space weather is like Earth's weather, but in space! It includes things like solar flares, solar wind, and magnetic storms that can affect our planet and technology.",
      category: 'Introduction'
    },
    {
      id: 3,
      title: "🎯 Why Study Space Weather?",
      content: "Space weather affects our technology, astronauts in space, and even power grids on Earth. By understanding it, we can protect ourselves and our equipment!",
      ttsText: "Space weather affects our technology, astronauts in space, and even power grids on Earth. By understanding it, we can protect ourselves and our equipment!",
      category: 'Introduction'
    },
    {
      id: 4,
      title: "🌍 Earth in Space",
      content: "Our planet Earth travels through space around the Sun. Along the way, it encounters solar wind, cosmic rays, and other space weather phenomena that can affect our daily lives.",
      ttsText: "Our planet Earth travels through space around the Sun. Along the way, it encounters solar wind, cosmic rays, and other space weather phenomena that can affect our daily lives.",
      category: 'Introduction'
    },
    {
      id: 5,
      title: "🔬 Who Studies Space Weather?",
      content: "Space weather scientists, called heliophysicists, study the Sun and its effects on the solar system. They use satellites, telescopes, and computer models to understand space weather.",
      ttsText: "Space weather scientists, called heliophysicists, study the Sun and its effects on the solar system. They use satellites, telescopes, and computer models to understand space weather.",
      category: 'Introduction'
    },
    {
      id: 6,
      title: "🛰️ Space Weather Monitoring",
      content: "We have special satellites in space that watch the Sun 24/7. These satellites warn us when dangerous space weather is coming toward Earth!",
      ttsText: "We have special satellites in space that watch the Sun 24/7. These satellites warn us when dangerous space weather is coming toward Earth!",
      category: 'Introduction'
    },
    {
      id: 7,
      title: "📚 Learning About the Sun-Earth System",
      content: "The Sun and Earth are connected in amazing ways. Energy and particles from the Sun constantly interact with Earth's magnetic field and atmosphere.",
      ttsText: "The Sun and Earth are connected in amazing ways. Energy and particles from the Sun constantly interact with Earth's magnetic field and atmosphere.",
      category: 'Introduction'
    },
    {
      id: 8,
      title: "🌟 The Scale of Space",
      content: "Space is incredibly huge! The distance from Earth to the Sun is 93 million miles - so far that light takes 8 minutes to travel from the Sun to us.",
      ttsText: "Space is incredibly huge! The distance from Earth to the Sun is 93 million miles - so far that light takes 8 minutes to travel from the Sun to us.",
      category: 'Introduction'
    },
    {
      id: 9,
      title: "🎓 Becoming a Space Weather Expert",
      content: "By the end of this adventure, you'll understand solar flares, magnetic storms, auroras, and how space weather affects our technology. You're on your way to becoming an expert!",
      ttsText: "By the end of this adventure, you'll understand solar flares, magnetic storms, auroras, and how space weather affects our technology. You're on your way to becoming an expert!",
      category: 'Introduction'
    },
    {
      id: 10,
      title: "🚀 Ready for Takeoff!",
      content: "Now that you know what space weather is and why it's important, let's blast off on our journey to explore the Sun and its incredible effects on Earth!",
      ttsText: "Now that you know what space weather is and why it's important, let's blast off on our journey to explore the Sun and its incredible effects on Earth!",
      category: 'Introduction'
    },

    // Solar Physics (Slides 11-30)
    {
      id: 11,
      title: "☀️ Meet Our Sun - The Star of Our Solar System",
      content: "Our Sun is a giant ball of hot gas that gives us light and heat. It's so big that 1.3 million Earths could fit inside it!",
      ttsText: "Our Sun is a giant ball of hot gas that gives us light and heat. It's so big that 1.3 million Earths could fit inside it!",
      category: 'Solar Physics'
    },
    {
      id: 12,
      title: "🔥 The Sun's Incredible Heat",
      content: "The Sun's surface is about 5,500°C (9,932°F) - that's hot enough to melt almost anything! The center is even hotter at 15 million°C!",
      ttsText: "The Sun's surface is about 5,500 degrees Celsius - that's hot enough to melt almost anything! The center is even hotter at 15 million degrees Celsius!",
      category: 'Solar Physics'
    },
    {
      id: 13,
      title: "⚡ How the Sun Makes Energy",
      content: "The Sun makes energy by fusing hydrogen atoms together to make helium. This process is called nuclear fusion and it creates enormous amounts of energy!",
      ttsText: "The Sun makes energy by fusing hydrogen atoms together to make helium. This process is called nuclear fusion and it creates enormous amounts of energy!",
      category: 'Solar Physics'
    },
    {
      id: 14,
      title: "🌞 The Sun's Layers",
      content: "The Sun has different layers: the core (center), radiative zone, convective zone, photosphere (what we see), chromosphere, and corona (outer atmosphere).",
      ttsText: "The Sun has different layers: the core at the center, radiative zone, convective zone, photosphere which is what we see, chromosphere, and corona which is the outer atmosphere.",
      category: 'Solar Physics'
    },
    {
      id: 15,
      title: "⭐ Sunspots - Dark Spots on the Sun",
      content: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
      ttsText: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
      category: 'Solar Physics'
    },
    {
      id: 16,
      title: "🌊 Solar Wind - The Sun's Breath",
      content: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
      ttsText: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
      category: 'Solar Physics'
    },
    {
      id: 17,
      title: "🔄 The Sun's Magnetic Field",
      content: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
      ttsText: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
      category: 'Solar Physics'
    },
    {
      id: 18,
      title: "📊 The Sun's 11-Year Cycle",
      content: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares.",
      ttsText: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares.",
      category: 'Solar Physics'
    },
    {
      id: 19,
      title: "🏆 The Sun's Amazing Statistics",
      content: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
      ttsText: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
      category: 'Solar Physics'
    },
    {
      id: 20,
      title: "⏰ The Sun's Lifetime",
      content: "Our Sun is about 4.6 billion years old and will live for another 5 billion years before it runs out of hydrogen fuel in its core.",
      ttsText: "Our Sun is about 4.6 billion years old and will live for another 5 billion years before it runs out of hydrogen fuel in its core.",
      category: 'Solar Physics'
    },
    {
      id: 21,
      title: "💥 What is a Solar Flare?",
      content: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
      ttsText: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
      category: 'Solar Physics'
    },
    {
      id: 22,
      title: "⚡ Solar Flare Energy",
      content: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
      ttsText: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
      category: 'Solar Physics'
    },
    {
      id: 23,
      title: "🌈 Different Types of Solar Flares",
      content: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
      ttsText: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
      category: 'Solar Physics'
    },
    {
      id: 24,
      title: "⏱️ How Long Do Solar Flares Last?",
      content: "Solar flares can last from just a few minutes to several hours. The biggest flares can last for many hours and release energy for days!",
      ttsText: "Solar flares can last from just a few minutes to several hours. The biggest flares can last for many hours and release energy for days!",
      category: 'Solar Physics'
    },
    {
      id: 25,
      title: "🔍 How Scientists Detect Solar Flares",
      content: "Scientists use special telescopes and satellites to watch the Sun 24/7. They can detect solar flares in different types of light that our eyes can't see.",
      ttsText: "Scientists use special telescopes and satellites to watch the Sun 24/7. They can detect solar flares in different types of light that our eyes can't see.",
      category: 'Solar Physics'
    },
    {
      id: 26,
      title: "📡 Solar Flares and Radio Waves",
      content: "Solar flares can affect radio communications on Earth. They can cause radio blackouts or make radio signals stronger in some areas.",
      ttsText: "Solar flares can affect radio communications on Earth. They can cause radio blackouts or make radio signals stronger in some areas.",
      category: 'Solar Physics'
    },
    {
      id: 27,
      title: "🎯 The Biggest Solar Flare Ever Recorded",
      content: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
      ttsText: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
      category: 'Solar Physics'
    },
    {
      id: 28,
      title: "🛡️ Protecting Against Solar Flares",
      content: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
      ttsText: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
      category: 'Solar Physics'
    },
    {
      id: 29,
      title: "🌊 What is a Coronal Mass Ejection (CME)?",
      content: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
      ttsText: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
      category: 'Solar Physics'
    },
    {
      id: 30,
      title: "💨 CME Speed and Size",
      content: "CMEs can travel at speeds of 1-3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
      ttsText: "CMEs can travel at speeds of 1 to 3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
      category: 'Solar Physics'
    },

    // Space Weather (Slides 31-45)
    {
      id: 31,
      title: "🔗 CMEs and Solar Flares - Related Events",
      content: "CMEs often happen together with solar flares, but they're different things. A solar flare is light and energy, while a CME is actual matter being thrown into space.",
      ttsText: "CMEs often happen together with solar flares, but they're different things. A solar flare is light and energy, while a CME is actual matter being thrown into space.",
      category: 'Space Weather'
    },
    {
      id: 32,
      title: "⏰ How Long Does a CME Take to Reach Earth?",
      content: "It usually takes a CME 1-3 days to travel from the Sun to Earth. Scientists can predict when they'll arrive and how strong they'll be!",
      ttsText: "It usually takes a CME 1 to 3 days to travel from the Sun to Earth. Scientists can predict when they'll arrive and how strong they'll be!",
      category: 'Space Weather'
    },
    {
      id: 33,
      title: "🎯 CME Direction - Not All Hit Earth",
      content: "Most CMEs don't hit Earth directly. They can go in any direction, and only some are aimed toward our planet. Scientists watch carefully to see which ones might affect us.",
      ttsText: "Most CMEs don't hit Earth directly. They can go in any direction, and only some are aimed toward our planet. Scientists watch carefully to see which ones might affect us.",
      category: 'Space Weather'
    },
    {
      id: 34,
      title: "📊 CME Classification",
      content: "CMEs are classified by their speed and direction. Fast CMEs (over 1,000 km/s) are more likely to cause strong space weather effects on Earth.",
      ttsText: "CMEs are classified by their speed and direction. Fast CMEs over 1,000 kilometers per second are more likely to cause strong space weather effects on Earth.",
      category: 'Space Weather'
    },
    {
      id: 35,
      title: "🛰️ How We Study CMEs",
      content: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
      ttsText: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
      category: 'Space Weather'
    },
    {
      id: 36,
      title: "🌍 CMEs and Earth's Magnetic Field",
      content: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
      ttsText: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
      category: 'Space Weather'
    },
    {
      id: 37,
      title: "🔮 Predicting Space Weather",
      content: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
      ttsText: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
      category: 'Space Weather'
    },
    {
      id: 38,
      title: "🌍 Space Weather Around the World",
      content: "Space weather affects the whole world, but some places more than others. Areas near the North and South Poles see more auroras and space weather effects.",
      ttsText: "Space weather affects the whole world, but some places more than others. Areas near the North and South Poles see more auroras and space weather effects.",
      category: 'Space Weather'
    },
    {
      id: 39,
      title: "📱 Space Weather Alerts",
      content: "Just like weather forecasts warn us about storms, space weather alerts warn us about solar storms. These alerts help protect astronauts and technology.",
      ttsText: "Just like weather forecasts warn us about storms, space weather alerts warn us about solar storms. These alerts help protect astronauts and technology.",
      category: 'Space Weather'
    },
    {
      id: 40,
      title: "🔬 How Scientists Study Space Weather",
      content: "Scientists use ground-based telescopes, satellites, and computer models to study space weather. They work together around the world to understand and predict it.",
      ttsText: "Scientists use ground-based telescopes, satellites, and computer models to study space weather. They work together around the world to understand and predict it.",
      category: 'Space Weather'
    },
    {
      id: 41,
      title: "🌊 Solar Wind Variations",
      content: "The solar wind isn't always the same - sometimes it's fast, sometimes slow, sometimes dense, sometimes thin. These variations create different types of space weather.",
      ttsText: "The solar wind isn't always the same - sometimes it's fast, sometimes slow, sometimes dense, sometimes thin. These variations create different types of space weather.",
      category: 'Space Weather'
    },
    {
      id: 42,
      title: "⚡ Geomagnetic Storms",
      content: "When solar wind disturbs Earth's magnetic field, it creates geomagnetic storms. These storms can last from hours to days and affect technology worldwide.",
      ttsText: "When solar wind disturbs Earth's magnetic field, it creates geomagnetic storms. These storms can last from hours to days and affect technology worldwide.",
      category: 'Space Weather'
    },
    {
      id: 43,
      title: "🎨 Space Weather Scales",
      content: "Space weather events are rated on scales like hurricanes. G1 is minor, G5 is extreme! This helps people understand how serious a space weather event might be.",
      ttsText: "Space weather events are rated on scales like hurricanes. G1 is minor, G5 is extreme! This helps people understand how serious a space weather event might be.",
      category: 'Space Weather'
    },
    {
      id: 44,
      title: "🌐 Global Space Weather Networks",
      content: "Countries around the world share space weather data through international networks. This cooperation helps everyone prepare for space weather events.",
      ttsText: "Countries around the world share space weather data through international networks. This cooperation helps everyone prepare for space weather events.",
      category: 'Space Weather'
    },
    {
      id: 45,
      title: "📊 Space Weather Impacts by Region",
      content: "Different parts of Earth experience space weather differently. Polar regions see more auroras, while equatorial regions might have different satellite effects.",
      ttsText: "Different parts of Earth experience space weather differently. Polar regions see more auroras, while equatorial regions might have different satellite effects.",
      category: 'Space Weather'
    },

    // Earth Effects (Slides 46-55)
    {
      id: 46,
      title: "🛡️ Earth's Magnetic Shield",
      content: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
      ttsText: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
      category: 'Earth Effects'
    },
    {
      id: 47,
      title: "🌌 The Magnetosphere - Our Space Shield",
      content: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
      ttsText: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
      category: 'Earth Effects'
    },
    {
      id: 48,
      title: "🌍 What Happens When Space Weather Hits Earth?",
      content: "When solar flares and CMEs reach Earth, they can cause beautiful auroras, affect satellites, and sometimes cause power outages. But they also create amazing light shows!",
      ttsText: "When solar flares and CMEs reach Earth, they can cause beautiful auroras, affect satellites, and sometimes cause power outages. But they also create amazing light shows!",
      category: 'Earth Effects'
    },
    {
      id: 49,
      title: "🌌 Aurora - Nature's Light Show",
      content: "Auroras (Northern and Southern Lights) happen when charged particles from space weather hit Earth's atmosphere. They create beautiful dancing lights in the sky!",
      ttsText: "Auroras, also called Northern and Southern Lights, happen when charged particles from space weather hit Earth's atmosphere. They create beautiful dancing lights in the sky!",
      category: 'Earth Effects'
    },
    {
      id: 50,
      title: "🎨 Aurora Colors",
      content: "Auroras can be green, red, blue, or purple! The colors depend on which gases in our atmosphere the space particles hit and how high up they are.",
      ttsText: "Auroras can be green, red, blue, or purple! The colors depend on which gases in our atmosphere the space particles hit and how high up they are.",
      category: 'Earth Effects'
    },
    {
      id: 51,
      title: "🌍 Atmospheric Layers and Space Weather",
      content: "Earth's atmosphere has different layers, and space weather affects each one differently. The ionosphere is especially important for radio communications.",
      ttsText: "Earth's atmosphere has different layers, and space weather affects each one differently. The ionosphere is especially important for radio communications.",
      category: 'Earth Effects'
    },
    {
      id: 52,
      title: "🌡️ Space Weather and Climate",
      content: "While space weather doesn't cause daily weather changes, it can affect Earth's upper atmosphere and may have small effects on long-term climate patterns.",
      ttsText: "While space weather doesn't cause daily weather changes, it can affect Earth's upper atmosphere and may have small effects on long-term climate patterns.",
      category: 'Earth Effects'
    },
    {
      id: 53,
      title: "🧭 Magnetic Field Changes",
      content: "During space weather events, Earth's magnetic field can change rapidly. This is why compass needles might wobble during magnetic storms!",
      ttsText: "During space weather events, Earth's magnetic field can change rapidly. This is why compass needles might wobble during magnetic storms!",
      category: 'Earth Effects'
    },
    {
      id: 54,
      title: "🌊 Radiation Belts",
      content: "Earth is surrounded by zones of trapped particles called radiation belts. Space weather can make these belts grow or shrink, affecting satellites that travel through them.",
      ttsText: "Earth is surrounded by zones of trapped particles called radiation belts. Space weather can make these belts grow or shrink, affecting satellites that travel through them.",
      category: 'Earth Effects'
    },
    {
      id: 55,
      title: "🦆 Animals and Space Weather",
      content: "Some scientists think animals might be able to sense changes in Earth's magnetic field during space weather events. Birds use magnetic fields for navigation!",
      ttsText: "Some scientists think animals might be able to sense changes in Earth's magnetic field during space weather events. Birds use magnetic fields for navigation!",
      category: 'Earth Effects'
    },

    // Technology Impact (Slides 56-65)
    {
      id: 56,
      title: "📡 Space Weather and Technology",
      content: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
      ttsText: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
      category: 'Technology Impact'
    },
    {
      id: 57,
      title: "🛰️ Protecting Satellites",
      content: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in 'safe mode' during strong space weather.",
      ttsText: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in safe mode during strong space weather.",
      category: 'Technology Impact'
    },
    {
      id: 58,
      title: "⚡ Space Weather and Power Grids",
      content: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
      ttsText: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
      category: 'Technology Impact'
    },
    {
      id: 59,
      title: "👨‍🚀 Space Weather and Astronauts",
      content: "Astronauts in space need special protection from space weather. They can hide in shielded parts of the space station during strong solar storms.",
      ttsText: "Astronauts in space need special protection from space weather. They can hide in shielded parts of the space station during strong solar storms.",
      category: 'Technology Impact'
    },
    {
      id: 60,
      title: "📱 GPS and Navigation",
      content: "GPS satellites can be affected by space weather, making your phone's navigation less accurate. This can affect everything from driving directions to emergency services.",
      ttsText: "GPS satellites can be affected by space weather, making your phone's navigation less accurate. This can affect everything from driving directions to emergency services.",
      category: 'Technology Impact'
    },
    {
      id: 61,
      title: "✈️ Aviation and Space Weather",
      content: "Airlines track space weather because it can affect radio communications and expose passengers to radiation on polar flight routes.",
      ttsText: "Airlines track space weather because it can affect radio communications and expose passengers to radiation on polar flight routes.",
      category: 'Technology Impact'
    },
    {
      id: 62,
      title: "🏥 Critical Infrastructure",
      content: "Hospitals, emergency services, and other critical systems must be protected from space weather effects to keep people safe during solar storms.",
      ttsText: "Hospitals, emergency services, and other critical systems must be protected from space weather effects to keep people safe during solar storms.",
      category: 'Technology Impact'
    },
    {
      id: 63,
      title: "💡 Smart Technology and Space Weather",
      content: "As our homes and cities become 'smarter' with more connected devices, they may become more vulnerable to space weather effects on communications.",
      ttsText: "As our homes and cities become smarter with more connected devices, they may become more vulnerable to space weather effects on communications.",
      category: 'Technology Impact'
    },
    {
      id: 64,
      title: "🌐 Internet and Space Weather",
      content: "The internet relies on precise timing and satellite communications. Space weather can disrupt these systems, potentially affecting global communications.",
      ttsText: "The internet relies on precise timing and satellite communications. Space weather can disrupt these systems, potentially affecting global communications.",
      category: 'Technology Impact'
    },
    {
      id: 65,
      title: "🛡️ Hardening Technology",
      content: "Engineers are developing better ways to protect technology from space weather, including special shielding and backup systems.",
      ttsText: "Engineers are developing better ways to protect technology from space weather, including special shielding and backup systems.",
      category: 'Technology Impact'
    },

    // Historical Events (Slides 66-70)
    {
      id: 66,
      title: "📅 The Carrington Event - 1859",
      content: "The biggest space weather event ever recorded happened in 1859. It caused auroras visible worldwide and would have caused major problems if it happened today!",
      ttsText: "The biggest space weather event ever recorded happened in 1859. It caused auroras visible worldwide and would have caused major problems if it happened today!",
      category: 'Historical Events'
    },
    {
      id: 67,
      title: "📡 Telegraph Systems and the Carrington Event",
      content: "During the 1859 Carrington Event, telegraph systems around the world failed. Some telegraph operators received electric shocks, and telegraph wires sparked!",
      ttsText: "During the 1859 Carrington Event, telegraph systems around the world failed. Some telegraph operators received electric shocks, and telegraph wires sparked!",
      category: 'Historical Events'
    },
    {
      id: 68,
      title: "⚡ The Quebec Blackout - 1989",
      content: "On March 13, 1989, a geomagnetic storm caused a massive blackout in Quebec, Canada. Six million people lost power for 9 hours!",
      ttsText: "On March 13, 1989, a geomagnetic storm caused a massive blackout in Quebec, Canada. Six million people lost power for 9 hours!",
      category: 'Historical Events'
    },
    {
      id: 69,
      title: "🎃 The Halloween Storms - 2003",
      content: "In October 2003, a series of powerful solar storms called the Halloween Storms caused satellite damage and beautiful auroras visible far south of their usual locations.",
      ttsText: "In October 2003, a series of powerful solar storms called the Halloween Storms caused satellite damage and beautiful auroras visible far south of their usual locations.",
      category: 'Historical Events'
    },
    {
      id: 70,
      title: "📈 Learning from History",
      content: "Each major space weather event teaches us more about how to protect our technology and predict future events. History helps us prepare for the future!",
      ttsText: "Each major space weather event teaches us more about how to protect our technology and predict future events. History helps us prepare for the future!",
      category: 'Historical Events'
    },

    // Future Predictions (Slides 71-75)
    {
      id: 71,
      title: "🔮 The Future of Space Weather Research",
      content: "Scientists are developing better ways to predict space weather and protect our technology. New satellites and computer models will help us prepare for solar storms.",
      ttsText: "Scientists are developing better ways to predict space weather and protect our technology. New satellites and computer models will help us prepare for solar storms.",
      category: 'Future Predictions'
    },
    {
      id: 72,
      title: "🚀 Future Space Missions",
      content: "Future missions to Mars and beyond will need to deal with space weather far from Earth's protective magnetic field. This is a major challenge for space exploration!",
      ttsText: "Future missions to Mars and beyond will need to deal with space weather far from Earth's protective magnetic field. This is a major challenge for space exploration!",
      category: 'Future Predictions'
    },
    {
      id: 73,
      title: "🌍 Preparing Earth for Future Solar Storms",
      content: "Governments and companies are working together to make our technology more resistant to space weather and create better warning systems.",
      ttsText: "Governments and companies are working together to make our technology more resistant to space weather and create better warning systems.",
      category: 'Future Predictions'
    },
    {
      id: 74,
      title: "🎓 Your Future in Space Weather",
      content: "Maybe you'll become a space weather scientist! We need smart, curious people to help protect Earth from space weather and explore the solar system.",
      ttsText: "Maybe you'll become a space weather scientist! We need smart, curious people to help protect Earth from space weather and explore the solar system.",
      category: 'Future Predictions'
    },
    {
      id: 75,
      title: "🌟 Congratulations, Space Weather Explorer! 🌟",
      content: "You've completed your 75-chapter space weather adventure! You now understand the Sun, solar flares, CMEs, auroras, and how space weather affects Earth. You're officially a Space Weather Expert! Keep exploring the amazing universe around us!",
      ttsText: "Congratulations, Space Weather Explorer! You've completed your 75-chapter space weather adventure! You now understand the Sun, solar flares, CMEs, auroras, and how space weather affects Earth. You're officially a Space Weather Expert! Keep exploring the amazing universe around us!",
      category: 'Future Predictions',
      quiz: {
        question: "What have you learned about space weather?",
        options: [
          "It only affects astronauts in space",
          "It affects technology, creates auroras, and impacts daily life",
          "It's the same as Earth's weather",
          "It only happens during solar eclipses"
        ],
        correct: 1,
        explanation: "Space weather affects our technology, creates beautiful auroras, impacts power grids and satellites, and can even affect daily life on Earth. You've learned so much!"
      }
    }
  ];

  const currentSlideData = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          nextSlide();
        } else {
          setIsAutoPlay(false);
        }
      }, 8000); // 8 seconds per slide
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setShowQuizResult(false);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setShowQuizResult(false);
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setShowQuiz(false);
    setQuizAnswer(null);
    setShowQuizResult(false);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setQuizAnswer(answerIndex);
    setShowQuizResult(true);
  };

  const resetAdventure = () => {
    setCurrentSlide(0);
    setShowQuiz(false);
    setQuizAnswer(null);
    setShowQuizResult(false);
    setIsAutoPlay(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Introduction': 'from-blue-500 to-purple-600',
      'Solar Physics': 'from-yellow-500 to-orange-600',
      'Space Weather': 'from-green-500 to-teal-600',
      'Earth Effects': 'from-red-500 to-pink-600',
      'Technology Impact': 'from-indigo-500 to-purple-600',
      'Historical Events': 'from-amber-500 to-red-600',
      'Future Predictions': 'from-cyan-500 to-blue-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1">75 Chapter Space Weather Adventure</h1>
            <p className="text-sm text-gray-300">
              Slide {currentSlideData.id} of {slides.length} • {currentSlideData.category}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={toggleAutoPlay}>
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={resetAdventure}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-8 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="max-w-5xl mx-auto bg-black/20 backdrop-blur-md border-white/10 shadow-2xl">
            <CardContent className="space-y-8 p-8">
              <div className="text-center">
                {/* Category Badge and Title */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getCategoryColor(currentSlideData.category)} text-white mb-4 shadow-lg`}
                >
                  {currentSlideData.category}
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${getCategoryColor(currentSlideData.category)} bg-clip-text text-transparent leading-tight`}
                >
                  {currentSlideData.title}
                </motion.h2>
              </div>
              
              {/* Advanced GSAP Animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex justify-center"
              >
                <div className="w-full max-w-2xl h-80 rounded-2xl overflow-hidden border-2 border-gradient-to-r from-yellow-500/30 to-orange-500/30 shadow-[0_0_50px_rgba(255,200,50,0.15)]">
                  <GsapAnimation 
                    slideId={currentSlideData.id}
                    category={currentSlideData.category}
                    title={currentSlideData.title}
                    className="w-full h-full"
                  />
                </div>
              </motion.div>

              {/* Content Text */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <p className="text-xl leading-relaxed text-gray-100 mb-8 px-4">
                  {currentSlideData.content}
                </p>
                
                {/* TTS Controls */}
                <div className="mt-6">
                  <TTSControls 
                    text={currentSlideData.ttsText}
                    label="🔊 Listen to this slide"
                    isChildFriendly={true}
                    addPauses={true}
                  />
                </div>
                
                {/* Quiz Section */}
                {currentSlideData?.quiz && !showQuiz && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8"
                  >
                    <Button
                      onClick={() => setShowQuiz(true)}
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      🧠 Take Quiz
                    </Button>
                  </motion.div>
                )}

                {currentSlideData?.quiz && showQuiz && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-gray-900/70 rounded-xl border border-gray-700/50 backdrop-blur-sm"
                  >
                    <h3 className="text-2xl font-bold text-yellow-400 mb-6">
                      {currentSlideData.quiz.question}
                    </h3>
                    
                    <div className="space-y-3">
                      {currentSlideData.quiz.options.map((option, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={quizAnswer === index ? "default" : "outline"}
                            className={`w-full text-left justify-start rounded-xl p-4 h-auto ${
                              showQuizResult && index === currentSlideData.quiz!.correct
                                ? "bg-green-600 hover:bg-green-700 border-green-500"
                                : showQuizResult && quizAnswer === index && index !== currentSlideData.quiz!.correct
                                ? "bg-red-600 hover:bg-red-700 border-red-500"
                                : "hover:bg-white/10 border-white/20"
                            }`}
                            onClick={() => handleQuizAnswer(index)}
                            disabled={showQuizResult}
                          >
                            <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                            {option}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                    
                    {showQuizResult && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-gray-800/80 rounded-lg border border-gray-700/60"
                      >
                        <p className={`font-bold text-lg ${
                          quizAnswer === currentSlideData.quiz!.correct ? "text-green-400" : "text-red-400"
                        }`}>
                          {quizAnswer === currentSlideData.quiz!.correct ? "🎉 Correct!" : "❌ Not quite right."}
                        </p>
                        <p className="text-gray-300 mt-3 leading-relaxed">
                          {currentSlideData.quiz!.explanation}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-between items-center mt-10 max-w-5xl mx-auto"
        >
          <Button 
            onClick={prevSlide}
            variant="outline" 
            size="lg"
            disabled={currentSlide === 0}
            className="flex items-center gap-3 px-6 py-3 hover:bg-white/10 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>

          <div className="flex items-center gap-4 text-white/80">
            <span className="text-lg font-semibold">Chapter {currentSlideData.id}</span>
            {isAutoPlay && (
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Auto-playing
              </div>
            )}
          </div>

          <Button 
            onClick={nextSlide}
            variant="outline" 
            size="lg"
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-3 px-6 py-3 hover:bg-white/10 disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Slide Navigation Dots */}
        <div className="flex justify-center mt-8 gap-2 flex-wrap max-w-5xl mx-auto">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-blue-500 w-8 shadow-lg' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adventure;
