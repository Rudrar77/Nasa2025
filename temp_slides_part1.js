// This file contains our updated 75 slides for the Adventure component
// We'll use this to replace the existing slides in Adventure.tsx

// Web image path for static images (public folder)
const WEB_IMAGE_PATH = '/images/space';

// 75 educational slides covering space weather concepts
const slides = [
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