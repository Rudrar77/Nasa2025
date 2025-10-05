import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge'; 
import { ChevronLeft, ChevronRight, Home, RotateCcw, Play, Pause, Volume2, VolumeX, Star, BookOpen, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useTTS from '@/hooks/useTTS';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';


interface Slide {
  id: number;
  title: string;
  content: string;
  ttsText: string;
  image?: string;
  category: string;
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
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const { speak, stop, speaking } = useTTS();
  const slideRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const slides: Slide[] = [
    // Arjun's Introduction (Slides 1-3)
    {
      id: 1,
      title: "🚀 Meet Arjun - Young Space Explorer! 🚀",
      content: "This is Arjun, a curious 10-year-old who loves looking at the stars. Today, Arjun is going on an incredible journey to discover the mysteries of space weather. Are you ready to join Arjun on this amazing adventure?",
      ttsText: "This is Arjun, a curious 10-year-old who loves looking at the stars. Today, Arjun is going on an incredible journey to discover the mysteries of space weather. Are you ready to join Arjun on this amazing adventure?",
      image: "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0193.jpg",
      category: "Arjun's Journey"
    },
    {
      id: 2,
      title: "🌌 Arjun's First Discovery - What is Space Weather?",
      content: "Arjun was looking through his telescope when he wondered: 'What makes the beautiful auroras I see in pictures?' His teacher explained that space weather is like Earth's weather, but in space! Arjun learned about solar flares, solar wind, and magnetic storms that can affect our planet.",
      ttsText: "Arjun was looking through his telescope when he wondered: What makes the beautiful auroras I see in pictures? His teacher explained that space weather is like Earth's weather, but in space! Arjun learned about solar flares, solar wind, and magnetic storms that can affect our planet.",
      image: "https://lasp.colorado.edu/spaceweather/files/2024/11/Space-Weather1.jpg",
      category: "Arjun's Journey"
    },
    {
      id: 3,
      title: " A Journey from the Sun to Earth",
      content: "Arjun's adventure takes him from the fiery surface of the Sun to Earth's protective magnetic shield. He'll see how energy from the Sun creates beautiful auroras and how it can also pose challenges for our technology.",
      ttsText: "Arjun's adventure takes him from the fiery surface of the Sun to Earth's protective magnetic shield. He'll see how energy from the Sun creates beautiful auroras and how it can also pose challenges for our technology.",
      image: "https://scied.ucar.edu/sites/default/files/styles/extra_large/public/images/Sun_and_Aurora.jpeg.webp?itok=UHEu-FmU",
      category: "Introduction"
    },
  
    // The Sun
    {
      id: 4,
      title: "☀️ Meet Our Sun - The Star of Our Solar System",
      content: "Our Sun is a giant ball of hot gas that gives us light and heat. It's so big that 1.3 million Earths could fit inside it!",
      ttsText: "Our Sun is a giant ball of hot gas that gives us light and heat. It's so big that 1.3 million Earths could fit inside it!",
      image: "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0171.jpg",
      category: "The Sun"
    },
    {
      id: 5,
      title: "🔥 The Sun's Incredible Heat",
      content: "The Sun's surface is about 5,500°C (9,932°F) - that's hot enough to melt almost anything! The center is even hotter at 15 million°C!",
      ttsText: "The Sun's surface is about 5,500 degrees Celsius - that's hot enough to melt almost anything! The center is even hotter at 15 million degrees Celsius!",
      image: "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0304.jpg",
      category: "The Sun"
    },
    {
      id: 6,
      title: "⚡ How the Sun Makes Energy",
      content: "The Sun makes energy by fusing hydrogen atoms together to make helium. This process is called nuclear fusion and it creates enormous amounts of energy!",
      ttsText: "The Sun makes energy by fusing hydrogen atoms together to make helium. This process is called nuclear fusion and it creates enormous amounts of energy!",
      image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202208/Sun.jpg?VersionId=YH5NNEaqfsI8m6uWzzPL6G4U9RGdKLJP&size=690:388",
      category: "The Sun"
    },
    {
      id: 7,
      title: "🌞 The Sun's Layers",
      content: "The Sun has different layers: the core (center), radiative zone, convective zone, photosphere (what we see), chromosphere, and corona (outer atmosphere).",
      ttsText: "The Sun has different layers: the core at the center, radiative zone, convective zone, photosphere which is what we see, chromosphere, and corona which is the outer atmosphere.",
      image: "https://scied.ucar.edu/sites/default/files/styles/extra_large/public/images/Interior_Sun_layers.jpg.webp?itok=MdqlQJwf",
      category: "The Sun"
    },
    {
      id: 8,
      title: "🌍 The Sun and Earth's Distance",
      content: "Earth is about 93 million miles (150 million kilometers) away from the Sun. Light from the Sun takes about 8 minutes to reach Earth!",
      ttsText: "Earth is about 93 million miles away from the Sun. Light from the Sun takes about 8 minutes to reach Earth!",
      image: "https://t3.ftcdn.net/jpg/02/64/72/20/360_F_264722074_gVGNplTAurOXKw4WJMtJfQMzWqr5zmDV.jpg",
      category: "The Sun"
    },
    {
      id: 9,
      title: "⭐ Sunspots - Dark Spots on the Sun",
      content: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
      ttsText: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/190920112128-sunspots-mystery.jpg?q=w_1160,c_fill/f_webp",
      category: "The Sun"
    },
    {
      id: 10,
      title: "🌊 Solar Wind - The Sun's Breath",
      content: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
      ttsText: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
      image: "https://scied.ucar.edu/sites/default/files/styles/extra_large/public/images/solar_wind.jpg.webp?itok=cmRjxRqi",
      category: "The Sun"
    },
    {
      id: 11,
      title: "🔄 The Sun's Magnetic Field",
      content: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
      ttsText: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
      image: "https://c02.purpledshub.com/uploads/sites/48/2024/05/solar-wind-earth.jpg?webp=1&w=1200",
      category: "The Sun"
    },
    {
      id: 12,
      title: "📊 The Sun's 11-Year Cycle",
      content: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares.",
      ttsText: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares.",
      image: "https://images.foxweather.com/static.foxweather.com/www.foxweather.com/content/uploads/2021/10/1336/752/SolarCyclePrimer.jpeg?ve=1&tl=1",
      category: "The Sun"
    },
    {
      id: 13,
      title: "🏆 The Sun's Amazing Statistics",
      content: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
      ttsText: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQ4CrLQprlK3GTs1EkzjtjALAUY2x7Fn2sg&s",
      category: "The Sun"
    },
    {
      id: 14,
      title: "⏰ The Sun's Lifetime",
      content: "Our Sun is about 4.6 billion years old and will live for another 5 billion years before it runs out of hydrogen fuel in its core.",
      ttsText: "Our Sun is about 4.6 billion years old and will live for another 5 billion years before it runs out of hydrogen fuel in its core.",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/stellar-evolution-main-sequence-16x9-1.jpg",
      category: "The Sun"
    },
  
    // Solar Flares
    {
      id: 15,
      title: "🔥 What is a Solar Flare?",
      content: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
      ttsText: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
      image: "http://c02.purpledshub.com/uploads/sites/48/2025/05/nasa-solar-flare.jpg?w=750&webp=1",
      category: "Solar Flares"
    },
    {
      id: 16,
      title: "⚡ Solar Flare Energy",
      content: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
      ttsText: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
      image: "https://images.squarespace-cdn.com/content/v1/59c3bad759cc68f757a465a3/1531082991716-SMIVWOO1UP25DHKA2ZAZ/solar+flares.jpg",
      category: "Solar Flares"
    },
    {
      id: 17,
      title: "🌈 Different Types of Solar Flares",
      content: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
      ttsText: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
      image: "https://scied.ucar.edu/sites/default/files/styles/extra_large/public/images/Pre-flare_Feb_2014.jpeg.webp?itok=S4rwAabK",
      category: "Solar Flares"
    },
    {
      id: 18,
      title: "⏱️ How Long Do Solar Flares Last?",
      content: "Solar flares can last from just a few minutes to several hours. The biggest flares can last for many hours and release energy for days!",
      ttsText: "Solar flares can last from just a few minutes to several hours. The biggest flares can last for many hours and release energy for days!",
      image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2015/03/11/20150311_161015_4096_0171.jpg",
      category: "Solar Flares"
    },
    {
      id: 19,
      title: "🔍 How Scientists Detect Solar Flares",
      content: "Scientists use special telescopes and satellites to watch the Sun 24/7. They can detect solar flares in different types of light that our eyes can't see.",
      ttsText: "Scientists use special telescopes and satellites to watch the Sun 24/7. They can detect solar flares in different types of light that our eyes can't see.",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/sdo-spacecraft-artist-concept-16x9-1.jpg",
      category: "Solar Flares"
    },
    {
      id: 20,
      title: "📡 Solar Flares and Radio Waves",
      content: "Solar flares can affect radio communications on Earth. They can cause radio blackouts or make radio signals stronger in some areas.",
      ttsText: "Solar flares can affect radio communications on Earth. They can cause radio blackouts or make radio signals stronger in some areas.",
      image: "https://scied.ucar.edu/sites/default/files/styles/extra_large/public/media/images/mcintoshthesunandatmosphere.png.webp?itok=8u0WZBcr",
      category: "Solar Flares"
    },
    {
      id: 21,
      title: "🎯 The Biggest Solar Flare Ever Recorded",
      content: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
      ttsText: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
      image: "https://eoimages.gsfc.nasa.gov/images/imagerecords/1000/1331/superflarecombo_lrg.jpg",
      category: "Solar Flares"
    },
    {
      id: 22,
      title: "🛡️ Protecting Against Solar Flares",
      content: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
      ttsText: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
      image: "https://static.scientificamerican.com/dam/m/3a0078a39732345/original/saw0924Gsci_lead.jpg?m=1722351515.506&w=1200",
      category: "Solar Flares"
    },
    // Coronal Mass Ejections (CMEs)
    {
      id: 23,
      title: "🌊 What is a Coronal Mass Ejection (CME)?",
      content: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
      ttsText: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
      image: "https://cdn.mos.cms.futurecdn.net/FoG6X8RXauCFJNFEwd4FQJ-970-80.jpg.webp",
      category: "CMEs"
    },
    {
      id: 24,
      title: "💨 CME Speed and Size",
      content: "CMEs can travel at speeds of 1-3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
      ttsText: "CMEs can travel at speeds of 1 to 3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
      image: "https://scontent.famd3-1.fna.fbcdn.net/v/t39.30808-6/497740297_671586765646224_8451434751967252289_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=igTirGA9j7MQ7kNvwFhJ7r3&_nc_oc=AdlpTLeYFn9IqIYo3wHs4bBX3u344B1Za20fM94lRF4-MHu82QlUlU1x4SUxfcku_Pc&_nc_zt=23&_nc_ht=scontent.famd3-1.fna&_nc_gid=7b9gt37D1t09-i7NUDfRBw&oh=00_AffJ-0oAHkMiyhd-km_MYxaGYmlXb3mNrs3SkZjlzvLIVw&oe=68E7E512",
      category: "CMEs"
    },
    {
      id: 25,
      title: "🔗 CMEs and Solar Flares - Related Events",
      content: "CMEs often happen together with solar flares, but they're different things. A solar flare is light and energy, while a CME is actual matter being thrown into space.",
      ttsText: "CMEs often happen together with solar flares, but they're different things. A solar flare is light and energy, while a CME is actual matter being thrown into space.",
      image: "https://soho.nascom.nasa.gov/data/realtime/c3/512/latest.jpg",
      category: "CMEs"
    },
    {
      id: 26,
      title: "⏰ How Long Does a CME Take to Reach Earth?",
      content: "It usually takes a CME 1-3 days to travel from the Sun to Earth. Scientists can predict when they'll arrive and how strong they'll be!",
      ttsText: "It usually takes a CME 1 to 3 days to travel from the Sun to Earth. Scientists can predict when they'll arrive and how strong they'll be!",
      image: "https://science.nasa.gov/wp-content/uploads/2023/09/cme-earth-trajectory-model-16x9-1.jpg",
      category: "CMEs"
    },
    {
      id: 27,
      title: "🎯 CME Direction - Not All Hit Earth",
      content: "Most CMEs don't hit Earth directly. They can go in any direction, and only some are aimed toward our planet. Scientists watch carefully to see which ones might affect us.",
      ttsText: "Most CMEs don't hit Earth directly. They can go in any direction, and only some are aimed toward our planet. Scientists watch carefully to see which ones might affect us.",
      image: "https://scontent.famd3-1.fna.fbcdn.net/v/t39.30808-6/497740297_671586765646224_8451434751967252289_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=igTirGA9j7MQ7kNvwFhJ7r3&_nc_oc=AdlpTLeYFn9IqIYo3wHs4bBX3u344B1Za20fM94lRF4-MHu82QlUlU1x4SUxfcku_Pc&_nc_zt=23&_nc_ht=scontent.famd3-1.fna&_nc_gid=7b9gt37D1t09-i7NUDfRBw&oh=00_AffJ-0oAHkMiyhd-km_MYxaGYmlXb3mNrs3SkZjlzvLIVw&oe=68E7E512",
      category: "CMEs"
    },
    {
      id: 28,
      title: "📊 CME Classification",
      content: "CMEs are classified by their speed and direction. Fast CMEs (over 1,000 km/s) are more likely to cause strong space weather effects on Earth.",
      ttsText: "CMEs are classified by their speed and direction. Fast CMEs over 1,000 kilometers per second are more likely to cause strong space weather effects on Earth.",
      image: "https://www.swpc.noaa.gov/sites/default/files/styles/medium/public/CME_phenomena_update.jpg?itok=7Ut0ueYP",
      category: "CMEs"
    },
    {
      id: 29,
      title: "🛰️ How We Study CMEs",
      content: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
      ttsText: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
      image: "https://en.wikipedia.org/wiki/Astronaut#/media/File:Bruce_McCandless_II_during_EVA_in_1984.jpg",
      category: "CMEs"
    },
    {
      id: 30,
      title: "🌍 CMEs and Earth's Magnetic Field",
      content: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
      ttsText: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
      image: "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/media/images/cme_figure_bricker.png?itok=mmhBwvQp",
      category: "CMEs"
    },
  
    // Earth's Protection and Impact
    {
      id: 31,
      title: "🛡️ Earth's Magnetic Shield",
      content: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
      ttsText: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
      image: "https://cdn.mos.cms.futurecdn.net/siKNQwTuJwF2VjbGXBT3XZ-970-80.jpg.webp",
      category: "Earth's Protection"
    },
    {
      id: 32,
      title: "🌌 The Magnetosphere - Our Space Shield",
      content: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
      ttsText: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
      image: "data:image/jpeg;base64,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",
      category: "Earth's Protection"
    },
    {
      id: 33,
      title: "🌍 What Happens When Space Weather Hits Earth?",
      content: "When solar flares and CMEs reach Earth, they can cause beautiful auroras, affect satellites, and sometimes cause power outages. But they also create amazing light shows!",
      ttsText: "When solar flares and CMEs reach Earth, they can cause beautiful auroras, affect satellites, and sometimes cause power outages. But they also create amazing light shows!",
      image: "https://www.nasa.gov/sites/default/files/thumbnails/image/space_weather_earth_impact.jpg",
      category: "Earth's Protection"
    },
    {
      id: 34,
      title: "🌌 Aurora - Nature's Light Show",
      content: "Auroras (Northern and Southern Lights) happen when charged particles from space weather hit Earth's atmosphere. They create beautiful dancing lights in the sky!",
      ttsText: "Auroras, also called Northern and Southern Lights, happen when charged particles from space weather hit Earth's atmosphere. They create beautiful dancing lights in the sky!",
      image: "https://cdn.mos.cms.futurecdn.net/57jQMDN5MZLYfV8ps8HuZQ-970-80.jpg.webp",
      category: "Earth's Protection"
    },
    {
      id: 35,
      title: "📡 Space Weather and Technology",
      content: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
      ttsText: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
      image: "https://lasp.colorado.edu/wp-content/uploads/2022/07/swx-1080-1080.jpg",
      category: "Technology Impact"
    },
    {
      id: 36,
      title: "🛰️ Protecting Satellites",
      content: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in 'safe mode' during strong space weather.",
      ttsText: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in safe mode during strong space weather.",
      image: "https://vision.esa.int/files/2021/10/Protect_accelerator-2048x1160.jpg",
      category: "Technology Impact"
    },
    {
      id: 37,
      title: "⚡ Space Weather and Power Grids",
      content: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
      ttsText: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
      image: "https://vision.esa.int/files/2021/10/Protect_accelerator-2048x1160.jpg",
      category: "Technology Impact"
    },
    {
      id: 38,
      title: "🔮 Predicting Space Weather",
      content: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
      ttsText: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
      image: "https://media.licdn.com/dms/image/v2/D4D12AQEWTAIPJrEBOg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1683088720607?e=1762387200&v=beta&t=x1wEnP-bvkGwV8fHad2Ok0SdiHPE0Xroctrkz5CDhZ0",
      category: "Research"
    },
  
    // Historical Events and Research
    {
      id: 39,
      title: "📅 The Carrington Event - 1859",
      content: "The biggest space weather event ever recorded happened in 1859. It caused auroras visible worldwide and would have caused major problems if it happened today!",
      ttsText: "The biggest space weather event ever recorded happened in 1859. It caused auroras visible worldwide and would have caused major problems if it happened today!",
      image: "hhttps://hackaday.com/wp-content/uploads/2018/12/carrington-event-featured.jpg?w=800",
      category: "Historical Events"
    },
    {
      id: 40,
      title: "🌍 Space Weather Around the World",
      content: "Space weather affects the whole world, but some places more than others. Areas near the North and South Poles see more auroras and space weather effects.",
      ttsText: "Space weather affects the whole world, but some places more than others. Areas near the North and South Poles see more auroras and space weather effects.",
      image: "https://www.nasa.gov/wp-content/uploads/2021/12/space_weather_earth_option.png",
      category: "Historical Events"
    },
    {
      id: 41,
      title: "👨‍🚀 Space Weather and Astronauts",
      content: "Astronauts in space need special protection from space weather. They can hide in shielded parts of the space station during strong solar storms.",
      ttsText: "Astronauts in space need special protection from space weather. They can hide in shielded parts of the space station during strong solar storms.",
      image: "https://scitechdaily.com/images/Astronauts-In-Outer-Space-Need-Radiation-Shielding-1536x1024.jpg",
      category: "Historical Events"
    },
    {
      id: 42,
      title: "🔬 How Scientists Study Space Weather",
      content: "Scientists use ground-based telescopes, satellites, and computer models to study space weather. They work together around the world to understand and predict it.",
      ttsText: "Scientists use ground-based telescopes, satellites, and computer models to study space weather. They work together around the world to understand and predict it.",
      image: "https://science.nasa.gov/wp-content/uploads/2023/04/Space-Weather-jpg.webp",
      category: "Research"
    },
    {
      id: 43,
      title: "🌐 Space Weather and Climate",
      content: "While space weather doesn't directly cause climate change, it can affect Earth's upper atmosphere and may have small effects on our weather patterns.",
      ttsText: "While space weather doesn't directly cause climate change, it can affect Earth's upper atmosphere and may have small effects on our weather patterns.",
      image: "https://www.weather.gov/images/safety/space-infographic650.jpg",
      category: "Research"
    },
    {
      id: 44,
      title: "🚀 Future of Space Weather Research",
      content: "Scientists are developing better ways to predict space weather and protect our technology. New missions and instruments will help us understand space weather even better!",
      ttsText: "Scientists are developing better ways to predict space weather and protect our technology. New missions and instruments will help us understand space weather even better!",
      image: "https://www.weather.gov/images/safety/space-infographic650.jpg",
      category: "Research"
    },
    {
      id: 45,
      title: "📈 Space Weather Monitoring Network",
      content: "There's a global network of observatories and satellites that constantly monitor the Sun and space weather, providing real-time data to scientists.",
      ttsText: "There's a global network of observatories and satellites that constantly monitor the Sun and space weather, providing real-time data to scientists.",
      image: "https://www.weather.gov/images/safety/space-infographic650.jpg",
      category: "Research"
    },
    {
      id: 46,
      title: "📝 Space Weather Prediction Centers",
      content: "Special prediction centers like NOAA's Space Weather Prediction Center work 24/7 to forecast space weather and warn about possible impacts on Earth.",
      ttsText: "Special prediction centers like NOAA's Space Weather Prediction Center work 24/7 to forecast space weather and warn about possible impacts on Earth.",
      image: "https://www.weather.gov/images/safety/space-infographic650.jpg",
      category: "Research"
    },
  
    // The Sun's Influence
    {
      id: 47,
      title: "🌠 Solar Prominences - Fire Bridges in Space",
      content: "Solar prominences are giant loops of glowing gas that extend outward from the Sun's surface. They can be hundreds of thousands of miles long!",
      ttsText: "Solar prominences are giant loops of glowing gas that extend outward from the Sun's surface. They can be hundreds of thousands of miles long!",
      image: "https://scied.ucar.edu/sites/default/files/styles/extra_large/public/images/Prominence%20vs%20Filament.jpg.webp?itok=gL5rLf4X",
      category: "The Sun"
    },
    {
      id: 48,
      title: "🕳️ Coronal Holes - The Sun's Open Windows",
      content: "Coronal holes are cooler, less dense areas of the Sun's corona where magnetic field lines open into space, allowing solar wind to escape more easily.",
      ttsText: "Coronal holes are cooler, less dense areas of the Sun's corona where magnetic field lines open into space, allowing solar wind to escape more easily.",
      image: "https://scied.ucar.edu/sites/default/files/media/images/sun_coronal_holes_sdo_aia_193_12jan2011_594x550.jpg",
      category: "The Sun"
    },
    {
      id: 49,
      title: "🌡️ Solar Minimum vs. Solar Maximum",
      content: "During solar minimum, the Sun has fewer sunspots and less activity. During solar maximum, there are many sunspots and more solar flares and CMEs.",
      ttsText: "During solar minimum, the Sun has fewer sunspots and less activity. During solar maximum, there are many sunspots and more solar flares and CMEs.",
      image: "https://www.nasa.gov/wp-content/uploads/2020/09/sunspots_comparison_1.jpg?resize=900,506",
      category: "The Sun"
    },
    {
      id: 50,
      title: "📏 Measuring Solar Activity",
      content: "Scientists measure solar activity using the sunspot number, solar flux, and by monitoring X-rays and other radiation from the Sun.",
      ttsText: "Scientists measure solar activity using the sunspot number, solar flux, and by monitoring X-rays and other radiation from the Sun.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Solar_Cycle_Prediction.gif/960px-Solar_Cycle_Prediction.gif",
      category: "Research"
    },
    {
      id: 51,
      title: "👁️ The Sun in Different Wavelengths",
      content: "Scientists observe the Sun in different wavelengths of light to see different layers and features, like using special glasses to see hidden details!",
      ttsText: "Scientists observe the Sun in different wavelengths of light to see different layers and features, like using special glasses to see hidden details!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-4dtIKR0U3SsYw2vW1mZKr6ZM2rj_5px6DoBPXYpzDrnnG__-B-YsimO39VZhJzZJ0Q&usqp=CAU",
      category: "Research"
    },
    {
      id: 52,
      title: "🔄 The Sun's Differential Rotation",
      content: "The Sun doesn't rotate as a solid body - the equator rotates faster than the poles! This differential rotation helps create the Sun's complex magnetic field.",
      ttsText: "The Sun doesn't rotate as a solid body - the equator rotates faster than the poles! This differential rotation helps create the Sun's complex magnetic field.",
      image: "https://www.nasa.gov/wp-content/uploads/2023/03/656474main_solar-rotation_full.jpg",
      category: "The Sun"
    },
    {
      id: 53,
      title: "💫 The Heliosphere - The Sun's Bubble",
      content: "The heliosphere is a giant bubble created by the Sun's solar wind that surrounds our entire solar system, protecting us from galactic cosmic rays.",
      ttsText: "The heliosphere is a giant bubble created by the Sun's solar wind that surrounds our entire solar system, protecting us from galactic cosmic rays.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtTpcUJFfa53FMwEerVdKN9o8QgZGoztFbzRcWyfotBB706Bz8l2op3vpck89Akcve5m8&usqp=CAU",
      category: "The Sun"
    },
    {
      id: 54,
      title: "🔆 Solar Irradiance - The Sun's Energy Output",
      content: "Solar irradiance is the amount of energy the Sun sends to Earth. It changes slightly during the solar cycle but remains remarkably stable over time.",
      ttsText: "Solar irradiance is the amount of energy the Sun sends to Earth. It changes slightly during the solar cycle but remains remarkably stable over time.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaco0cuwcSKeHrOkg5p8TBzO_aAXQnEX1euxO3ACwS3OEI_OPJQ-ApTVJdV4cJk7PSODM&usqp=CAU",
      category: "The Sun"
    },
    {
      id: 55, // Technology Impact
      title: "📱 Space Weather and Your Cell Phone",
      content: "Strong space weather can disrupt cell phone signals and GPS navigation. Your phone might lose signal or give wrong directions during solar storms!",
      ttsText: "Strong space weather can disrupt cell phone signals and GPS navigation. Your phone might lose signal or give wrong directions during solar storms!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_oQsM4a0VDkFVF_5S29DinxGpgEu6uPishl-Gx1yntJeJgnb0REGmNtW46rcc_gbP4G0&usqp=CAU",
      category: "Technology Impact"
    },
    {
      id: 56,
      title: "✈️ Space Weather and Airplanes",
      content: "Airlines sometimes change flight paths during space weather events to avoid communication problems and to reduce radiation exposure at high altitudes.",
      ttsText: "Airlines sometimes change flight paths during space weather events to avoid communication problems and to reduce radiation exposure at high altitudes.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_oQsM4a0VDkFVF_5S29DinxGpgEu6uPishl-Gx1yntJeJgnb0REGmNtW46rcc_gbP4G0&usqp=CAU",
      category: "Technology Impact"
    },
    {
      id: 57,
      title: "🚢 Space Weather and Ship Navigation",
      content: "Ships use compasses and GPS for navigation, both of which can be affected by space weather. In the past, sailors used to navigate by the stars!",
      ttsText: "Ships use compasses and GPS for navigation, both of which can be affected by space weather. In the past, sailors used to navigate by the stars!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_oQsM4a0VDkFVF_5S29DinxGpgEu6uPishl-Gx1yntJeJgnb0REGmNtW46rcc_gbP4G0&usqp=CAU",
      category: "Technology Impact"
    },
    {
      id: 58,
      title: "🧭 Space Weather and Compasses",
      content: "During strong geomagnetic storms, compasses might not point to magnetic north correctly. This affected explorers in the past who relied on compasses!",
      ttsText: "During strong geomagnetic storms, compasses might not point to magnetic north correctly. This affected explorers in the past who relied on compasses!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_oQsM4a0VDkFVF_5S29DinxGpgEu6uPishl-Gx1yntJeJgnb0REGmNtW46rcc_gbP4G0&usqp=CAU",
      category: "Technology Impact"
    },
    {
      id: 59,
      title: "💸 The Economic Impact of Space Weather",
      content: "A severe space weather event could cost billions of dollars in damage to satellites, power grids, and communications. That's why prediction is so important!",
      ttsText: "A severe space weather event could cost billions of dollars in damage to satellites, power grids, and communications. That's why prediction is so important!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_oQsM4a0VDkFVF_5S29DinxGpgEu6uPishl-Gx1yntJeJgnb0REGmNtW46rcc_gbP4G0&usqp=CAU",
      category: "Technology Impact"
    },
    {
      id: 60,
      title: "👷 Jobs in Space Weather",
      content: "Many people work in space weather research and forecasting, including scientists, engineers, mathematicians, and computer programmers. It's an exciting field!",
      ttsText: "Many people work in space weather research and forecasting, including scientists, engineers, mathematicians, and computer programmers. It's an exciting field!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-4dtIKR0U3SsYw2vW1mZKr6ZM2rj_5px6DoBPXYpzDrnnG__-B-YsimO39VZhJzZJ0Q&usqp=CAU",
      category: "Research"
    },
    {
      id: 61, // Technology Impact
      title: "🏡 Space Weather and Your Home",
      content: "Space weather can cause power outages and affect electronics in your home. Having emergency supplies and a backup power source is always a good idea!",
      ttsText: "Space weather can cause power outages and affect electronics in your home. Having emergency supplies and a backup power source is always a good idea!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_oQsM4a0VDkFVF_5S29DinxGpgEu6uPishl-Gx1yntJeJgnb0REGmNtW46rcc_gbP4G0&usqp=CAU",
      category: "Technology Impact"
    },
    {
      id: 62, // Earth's Protection
      title: "🌟 Space Weather and Astronomy",
      content: "Space weather can make auroras visible farther from the poles, giving more people a chance to see these beautiful natural light shows!",
      ttsText: "Space weather can make auroras visible farther from the poles, giving more people a chance to see these beautiful natural light shows!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_oQsM4a0VDkFVF_5S29DinxGpgEu6uPishl-Gx1yntJeJgnb0REGmNtW46rcc_gbP4G0&usqp=CAU",
      category: "Earth's Protection"
    },
  
    // Other Planets
    {
      id: 63,
      title: "🪐 Space Weather on Other Planets",
      content: "Other planets in our solar system also experience space weather! Jupiter has the strongest magnetic field and the most impressive auroras.",
      ttsText: "Other planets in our solar system also experience space weather! Jupiter has the strongest magnetic field and the most impressive auroras.",
      image: "https://cdn.zmescience.com/wp-content/uploads/2015/01/ZYYOtcM.jpg",
      category: "Other Planets"
    },
    {
      id: 64,
      title: "🔴 Space Weather on Mars",
      content: "Mars doesn't have a strong magnetic field like Earth, so space weather hits its surface directly. This is a challenge for future astronauts going to Mars!",
      ttsText: "Mars doesn't have a strong magnetic field like Earth, so space weather hits its surface directly. This is a challenge for future astronauts going to Mars!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvc9m5Kq4PLkLJNiphhMSng1SCrh9mFGQ3Lg&s",
      category: "Other Planets"
    },
    {
      id: 65,
      title: "🔵 Space Weather on Mercury",
      content: "Mercury is very close to the Sun and gets hit by intense space weather. It has a magnetic field, but it's not strong enough to fully protect the planet.",
      ttsText: "Mercury is very close to the Sun and gets hit by intense space weather. It has a magnetic field, but it's not strong enough to fully protect the planet.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO7vJO4ALPW87eVDQ0TquSsybHEeFsvC0d726ac6-5NAXX_D28_V2jOS1n0_eFyz-VAFc&usqp=CAU",
      category: "Other Planets"
    },
    {
      id: 66,
      title: "🪐 Jupiter's Magnetic Field",
      content: "Jupiter's magnetic field is the strongest in the solar system - about 20,000 times stronger than Earth's! It creates a huge magnetosphere that protects its moons.",
      ttsText: "Jupiter's magnetic field is the strongest in the solar system - about 20,000 times stronger than Earth's! It creates a huge magnetosphere that protects its moons.",
      image: "data:image/jpeg;base64,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",
      category: "Other Planets"
    },
    {
      id: 67,
      title: "🪐 Saturn's Auroras",
      content: "Saturn has beautiful auroras at its poles, just like Earth. They're caused by the same process - charged particles hitting the atmosphere along magnetic field lines.",
      ttsText: "Saturn has beautiful auroras at its poles, just like Earth. They're caused by the same process - charged particles hitting the atmosphere along magnetic field lines.",
      image: "https://cdn.esahubble.org/archives/images/screen/heic1815a.jpg",
      category: "Other Planets"
    },
    {
      id: 68,
      title: "🛰️ Studying Space Weather from Space",
      content: "Special satellites study the Sun and space weather from space. Some are positioned between the Sun and Earth to give early warnings of solar storms!",
      ttsText: "Special satellites study the Sun and space weather from space. Some are positioned between the Sun and Earth to give early warnings of solar storms!",
      image: "https://www.nasa.gov/sites/default/files/thumbnails/image/dscovr_satellite.jpg",
      category: "Research"
    },
    {
      id: 69,
      title: "💧 The Sun and Water on Mars",
      content: "Scientists think the Sun's more active past and space weather played a role in Mars losing most of its atmosphere and water over billions of years.",
      ttsText: "Scientists think the Sun's more active past and space weather played a role in Mars losing most of its atmosphere and water over billions of years.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS28WEhZX0LMP7Oa1kI5p2jEcPYxsr8j4NbAA&s",
      category: "Other Planets"
    },
    {
      id: 70,
      title: "🚀 Space Weather and Space Exploration",
      content: "As we explore more of the solar system, understanding space weather becomes even more important for protecting astronauts and spacecraft.",
      ttsText: "As we explore more of the solar system, understanding space weather becomes even more important for protecting astronauts and spacecraft.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Jt3zndMcMhAk9zxycWWqvQC1hGi-9EHVOb91U7ETYRfbFUbHSCukbCoJdD_Hs2PTdH4&usqp=CAU",
      category: "Research"
    },
  
    // Conclusion and Quiz
    {
      id: 71,
      title: "🎓 What We've Learned",
      content: "We've explored the Sun, solar flares, CMEs, and how they affect Earth. Space weather is a fascinating field that affects our daily lives and technology!",
      ttsText: "We've explored the Sun, solar flares, CMEs, and how they affect Earth. Space weather is a fascinating field that affects our daily lives and technology!",
      image: "https://www.nasa.gov/sites/default/files/thumbnails/image/space_weather_summary.jpg",
      category: "Conclusion"
    },
    {
      id: 72,
      title: "🔍 Your Role in Space Weather Awareness",
      content: "You can help by learning more about space weather, sharing what you know with others, and being prepared for possible impacts on technology.",
      ttsText: "You can help by learning more about space weather, sharing what you know with others, and being prepared for possible impacts on technology.",
      image: "https://www.nasa.gov/sites/default/files/thumbnails/image/citizen_science_space_weather.jpg",
      category: "Conclusion"
    },
    {
      id: 73,
      title: "📚 Resources for Learning More",
      content: "There are many great websites, books, and apps where you can learn more about space weather. NASA's website has excellent resources for all ages!",
      ttsText: "There are many great websites, books, and apps where you can learn more about space weather. NASA's website has excellent resources for all ages!",
      image: "https://www.nasa.gov/sites/default/files/thumbnails/image/nasa_education_resources.jpg",
      category: "Conclusion"
    },
    {
      id: 74, // Quiz
      title: "🧠 Test Your Knowledge!",
      content: "Let's see how much you've learned about space weather! Answer this question to test your understanding.",
      ttsText: "Let's see how much you've learned about space weather! Answer this question to test your understanding.",
      image: "https://www.nasa.gov/sites/default/files/thumbnails/image/quiz_space_weather.jpg",
      category: "Quiz",
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
      id: 75, // Conclusion
      title: "🌟 Congratulations, Space Weather Explorer!",
      content: "You've completed your space weather adventure! You now know about the Sun, solar flares, CMEs, and how they affect Earth. Keep exploring the amazing world of space science!",
      ttsText: "Congratulations, Space Weather Explorer! You've completed your space weather adventure! You now know about the Sun, solar flares, CMEs, and how they affect Earth. Keep exploring the amazing world of space science!",
      image: "https://www.nasa.gov/sites/default/files/thumbnails/image/space_explorer_badge.jpg",
      category: "Conclusion",
    },
    // Aditya-L1 Mission
    {
      id: 76,
      title: "🇮🇳 Arjun Discovers India's Aditya-L1 Mission",
      content: "Arjun learns about India's amazing Aditya-L1 mission! It's India's first solar observatory, traveling to a special spot in space called Lagrange point 1 (L1) to watch the Sun continuously without any interruptions.",
      ttsText: "Arjun learns about India's amazing Aditya-L1 mission! It's India's first solar observatory, traveling to a special spot in space called Lagrange point 1 (L1) to watch the Sun continuously without any interruptions.",
      image: "https://static.pw.live/5eb393ee95fab7468a79d189/GLOBAL_CMS_BLOGS/3a8326ee-238c-4988-bb75-6438160c771c.png",
      category: "Research"
    },
    {
      id: 77,
      title: "🔬 What Aditya-L1 Studies",
      content: "Aditya-L1 has seven special tools (payloads) to study the Sun's outer layers (the corona), solar flares, and CMEs. This helps scientists understand why the corona is so hot and how solar events begin.",
      ttsText: "Aditya-L1 has seven special tools, or payloads, to study the Sun's outer layers (the corona), solar flares, and CMEs. This helps scientists understand why the corona is so hot and how solar events begin.",
      image: "https://www.isro.gov.in/media_isro/image/Aditya-L1MissionDetail-1.jpg",
      category: "Research"
    },
    {
      id: 78,
      title: "💡 Why Aditya-L1 is Important",
      content: "The data from Aditya-L1 helps India and the world predict space weather more accurately. This protects our satellites, power grids, and astronauts. It's a huge step for India's space program and global science!",
      ttsText: "The data from Aditya-L1 helps India and the world predict space weather more accurately. This protects our satellites, power grids, and astronauts. It's a huge step for India's space program and global science!",
      image: "https://www.isro.gov.in/media_isro/image/Aditya-L1MissionDetail-1.jpg",
      category: "Research"
    }
  ];

  const currentSlideData = slides[currentSlide];
  const [imageError, setImageError] = useState(false);

  const groupedSlides = slides.reduce((acc, slide) => {
    const category = slide.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(slide);
    return acc;
  }, {} as Record<string, Slide[]>);

  useEffect(() => {
    setImageError(false);
  }, [currentSlide]);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setShowQuizResult(false);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setShowQuizResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentSlide(0);
    setIsPlaying(false);
    setShowQuiz(false);
    setQuizAnswer(null);
    setShowQuizResult(false);
    stop();
  };

  const handleTTSToggle = () => {
    if (speaking) {
      stop();
      setIsPlaying(false);
    } else {
      speak(currentSlideData.ttsText);
      setIsPlaying(true);
    }
  };

  const handleJumpToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setIsIndexOpen(false);
  };

  const handleQuizAnswer = (selectedAnswer: number) => {
    setQuizAnswer(selectedAnswer);
    setShowQuizResult(true);
  };

  const handleShowQuiz = () => {
    if (currentSlideData.interactive && currentSlideData.quiz) {
      setShowQuiz(true);
    }
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  const getCategoryColor = (category: string) => {
    const colors = {
      'Introduction': 'bg-blue-500',
      'The Sun': 'bg-yellow-500',
      'Solar Flares': 'bg-red-500',
      'CMEs': 'bg-orange-500',
      'Earth\'s Protection': 'bg-green-500',
      'Technology Impact': 'bg-purple-500',
      'Research': 'bg-pink-500',
      'Quiz': 'bg-indigo-500',
      'Conclusion': 'bg-emerald-500',
      'Other Planets': 'bg-teal-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Badge className={`${getCategoryColor(currentSlideData.category)} text-white`}>
              {currentSlideData.category}
            </Badge>
            <Dialog open={isIndexOpen} onOpenChange={setIsIndexOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <List className="w-4 h-4 mr-2" />
                  Jump to Slide
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-slate-900/80 border-slate-700 text-white backdrop-blur-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white">Adventure Index</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4">
                    {Object.entries(groupedSlides).map(([category, categorySlides]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-yellow-400 mb-2">{category}</h3>
                        <ul className="space-y-1">
                          {categorySlides.map((slide) => (
                            <li key={slide.id} onClick={() => handleJumpToSlide(slides.findIndex(s => s.id === slide.id))} className="cursor-pointer p-2 rounded-md hover:bg-white/10 transition-colors">
                              {slide.id}. {slide.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">
              <Star className="inline w-6 h-6 mr-2 text-yellow-400" />
              Space Weather Adventure
              <Star className="inline w-6 h-6 ml-2 text-yellow-400" />
            </h1>
            <p className="text-blue-200 text-sm">Discover the mysteries of our Sun and space weather!</p>
          </div>

          <Button
            onClick={handleRestart}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>

        {/* Enhanced Progress Section */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center text-white text-sm mb-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Slide {currentSlide + 1} of {slides.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
            <Progress value={progress} className="h-3 bg-white/20" />
            <div className="mt-2 text-xs text-blue-200 text-center">
              Journey through the cosmos - one slide at a time!
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Main Content */}
        <div ref={slideRef} className="max-w-5xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white overflow-hidden shadow-2xl">
            {/* Enhanced Header with Category */}
            <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/20">
              <div className="flex items-center justify-between">
                <Badge className={`${getCategoryColor(currentSlideData.category)} text-white`}>
                  {currentSlideData.category}
                </Badge>
                <div className="text-sm text-blue-200">
                  Slide {currentSlide + 1} of {slides.length}
                </div>
              </div>
              <CardTitle className="text-2xl lg:text-4xl text-center mt-4 leading-tight">
                {currentSlideData.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8">
              {/* Enhanced Image Section */}
              {currentSlideData.image && !imageError && (
                <div className="mb-8">
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      className="w-full max-h-96 object-contain bg-black/20 transition-transform duration-300 hover:scale-105"
                      onError={() => setImageError(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Fallback for missing images */}
              {(imageError || !currentSlideData.image) && (
                <div className="mb-8 h-64 lg:h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20">
                  <div className="text-center">
                    <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <p className="text-blue-200">Imagine the wonders of space weather!</p>
                  </div>
                </div>
              )}

              {/* Enhanced Content */}
              <div className="text-center mb-8">
                <p className="text-lg lg:text-xl leading-relaxed text-blue-100 max-w-4xl mx-auto">
                  {currentSlideData.content}
                </p>
              </div>

              {/* Enhanced Interactive Quiz */}
              {currentSlideData.interactive && currentSlideData.quiz && (
                <div className="mb-8">
                  {!showQuiz ? (
                    <div className="text-center">
                      <Button
                        onClick={handleShowQuiz}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        <Star className="w-5 h-5 mr-2" />
                        Test Your Knowledge!
                        <Star className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <Card className="bg-white/10 backdrop-blur-md border-white/20">
                      <CardContent className="p-6">
                        <h3 className="text-xl lg:text-2xl font-bold mb-6 text-center text-yellow-400">
                          {currentSlideData.quiz.question}
                        </h3>
                        <div className="space-y-3">
                          {currentSlideData.quiz.options.map((option, index) => (
                            <Button
                              key={index}
                              onClick={() => handleQuizAnswer(index)}
                              disabled={showQuizResult}
                              className={`w-full text-left justify-start p-4 text-lg transition-all duration-200 ${
                                showQuizResult
                                  ? index === currentSlideData.quiz!.correct
                                    ? 'bg-green-500 hover:bg-green-600 shadow-lg transform scale-105'
                                    : index === quizAnswer
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-gray-500 opacity-70'
                                  : 'bg-white/20 hover:bg-white/30 hover:scale-105'
                              }`}
                            >
                              <span className="font-semibold mr-3">
                                {String.fromCharCode(65 + index)}.
                              </span>
                              {option}
                            </Button>
                          ))}
                        </div>
                        {showQuizResult && (
                          <div className="mt-6 p-6 bg-blue-500/20 rounded-lg border border-blue-400/30">
                            <div className="flex items-start space-x-3">
                              <Star className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                              <p className="text-lg leading-relaxed">{currentSlideData.quiz.explanation}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Enhanced TTS Controls */}
              <div className="flex justify-center mb-8">
                <Button
                  onClick={handleTTSToggle}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {speaking ? (
                    <>
                      <VolumeX className="w-5 h-5 mr-2" />
                      Pause Audio
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5 mr-2" />
                      Play Audio
                    </>
                  )}
                </Button>
              </div>

              {/* Enhanced Navigation */}
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                <Button
                  onClick={handlePrev}
                  disabled={currentSlide === 0}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50 backdrop-blur-sm px-6 py-3 w-full lg:w-auto transform hover:scale-105 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous Slide
                </Button>

                <div className="flex items-center space-x-4 text-lg font-semibold">
                  <Badge variant="outline" className="border-white/20 text-white px-4 py-2">
                    {currentSlide + 1} / {slides.length}
                  </Badge>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={currentSlide === slides.length - 1}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50 backdrop-blur-sm px-6 py-3 w-full lg:w-auto transform hover:scale-105 transition-all duration-200"
                >
                  Next Slide
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Footer */}
        <div className="mt-12 text-center">
          <p className="text-blue-200 text-sm mb-4">
            🚀 Exploring the cosmos, one adventure at a time! 🌟
          </p>
          <div className="flex justify-center space-x-6 text-xs text-blue-300">
            <span>NASA Space Weather Data</span>
            <span>•</span>
            <span>Educational Content</span>
            <span>•</span>
            <span>Interactive Learning</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adventure;