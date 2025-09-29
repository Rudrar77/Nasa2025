// This is a temporary file to store our 75 slides content
// We'll use this to update the Adventure.tsx file

const slides = [
  // Introduction (Slides 1-5)
  {
    id: 1,
    title: "🌟 Welcome to Your Space Weather Adventure! 🌟",
    content: "Get ready to explore the amazing world of space weather! We'll learn about the Sun, solar flares, and how they affect Earth. This adventure is designed just for you!",
    ttsText: "Welcome to your space weather adventure! Get ready to explore the amazing world of space weather. We'll learn about the Sun, solar flares, and how they affect Earth. This adventure is designed just for you!",
    animation: "ElementarySpaceAdventure3D"
  },
  {
    id: 2,
    title: "🌞 What is Space Weather?",
    content: "Space weather is like Earth's weather, but in space! It includes things like solar flares, solar wind, and magnetic storms that can affect our planet and technology.",
    ttsText: "Space weather is like Earth's weather, but in space! It includes things like solar flares, solar wind, and magnetic storms that can affect our planet and technology.",
    animation: "SpaceStormSimulation3D"
  },
  {
    id: 3,
    title: "🔍 Why Study Space Weather?",
    content: "Space weather affects our technology, astronauts in space, and even power grids on Earth. By understanding it, we can protect ourselves and our equipment!",
    ttsText: "Space weather affects our technology, astronauts in space, and even power grids on Earth. By understanding it, we can protect ourselves and our equipment!",
    animation: "EarthImpact3D"
  },
  {
    id: 4,
    title: "🌈 How Will Our Adventure Work?",
    content: "During our journey, we'll explore everything from the Sun to Earth, see beautiful animations, learn fun facts, and even take quizzes to test your knowledge!",
    ttsText: "During our journey, we'll explore everything from the Sun to Earth, see beautiful animations, learn fun facts, and even take quizzes to test your knowledge!",
    image: "/src/assets/space-weather-impacts.jpg"
  },
  {
    id: 5,
    title: "👨‍🚀 Your Mission as a Space Explorer",
    content: "Your mission is to learn about space weather and become a space weather expert! Ready to blast off on this exciting adventure through our solar system?",
    ttsText: "Your mission is to learn about space weather and become a space weather expert! Ready to blast off on this exciting adventure through our solar system?",
    image: "/src/assets/flare-character.jpg"
  },

  // The Sun Basics (Slides 6-20)
  {
    id: 6,
    title: "☀️ Meet Our Sun - The Star of Our Solar System",
    content: "Our Sun is a giant ball of hot gas that gives us light and heat. It's so big that 1.3 million Earths could fit inside it!",
    ttsText: "Our Sun is a giant ball of hot gas that gives us light and heat. It's so big that 1.3 million Earths could fit inside it!",
    animation: "SolarFormation3D"
  },
  {
    id: 7,
    title: "🔥 The Sun's Incredible Heat",
    content: "The Sun's surface is about 5,500°C (9,932°F) - that's hot enough to melt almost anything! The center is even hotter at 15 million°C!",
    ttsText: "The Sun's surface is about 5,500 degrees Celsius - that's hot enough to melt almost anything! The center is even hotter at 15 million degrees Celsius!",
    image: "/public/textures/sun.jpg"
  },
  {
    id: 8,
    title: "⚡ How the Sun Makes Energy",
    content: "The Sun makes energy by fusing hydrogen atoms together to make helium. This process is called nuclear fusion and it creates enormous amounts of energy!",
    ttsText: "The Sun makes energy by fusing hydrogen atoms together to make helium. This process is called nuclear fusion and it creates enormous amounts of energy!",
    animation: "SolarFormation3D"
  },
  {
    id: 9,
    title: "🌞 The Sun's Layers",
    content: "The Sun has different layers: the core (center), radiative zone, convective zone, photosphere (what we see), chromosphere, and corona (outer atmosphere).",
    ttsText: "The Sun has different layers: the core at the center, radiative zone, convective zone, photosphere which is what we see, chromosphere, and corona which is the outer atmosphere.",
    image: "/src/assets/textures/sun.jpg"
  },
  {
    id: 10,
    title: "🌍 The Sun and Earth's Distance",
    content: "Earth is about 93 million miles (150 million kilometers) away from the Sun. Light from the Sun takes about 8 minutes to reach Earth!",
    ttsText: "Earth is about 93 million miles away from the Sun. Light from the Sun takes about 8 minutes to reach Earth!",
    animation: "ElementarySpaceAdventure3D"
  },
  {
    id: 11,
    title: "⭐ Sunspots - Dark Spots on the Sun",
    content: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
    ttsText: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
    image: "/src/assets/solar-flare-hero.jpg"
  },
  {
    id: 12,
    title: "🌊 Solar Wind - The Sun's Breath",
    content: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
    ttsText: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
    animation: "SpaceStormSimulation3D"
  },
  {
    id: 13,
    title: "🔄 The Sun's Magnetic Field",
    content: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
    ttsText: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
    animation: "Magnetosphere3D"
  },
  {
    id: 14,
    title: "📊 The Sun's 11-Year Cycle",
    content: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares.",
    ttsText: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares.",
    image: "/src/assets/solar-flare-hero.jpg"
  },
  {
    id: 15,
    title: "🏆 The Sun's Amazing Statistics",
    content: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
    ttsText: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
    animation: "SolarFormation3D"
  },
  {
    id: 16,
    title: "⏰ The Sun's Lifetime",
    content: "Our Sun is about 4.6 billion years old and will live for another 5 billion years before it runs out of hydrogen fuel in its core.",
    ttsText: "Our Sun is about 4.6 billion years old and will live for another 5 billion years before it runs out of hydrogen fuel in its core.",
    image: "/public/textures/sun.jpg"
  },
  {
    id: 17,
    title: "🌡️ The Temperature Zones of the Sun",
    content: "The Sun's temperature varies dramatically! The core is 15 million°C, the surface about 5,500°C, and the corona can reach 1-2 million°C!",
    ttsText: "The Sun's temperature varies dramatically! The core is 15 million degrees Celsius, the surface about 5,500 degrees Celsius, and the corona can reach 1 to 2 million degrees Celsius!",
    animation: "SolarFormation3D"
  },
  {
    id: 18,
    title: "💫 The Sun's Rotation",
    content: "The Sun rotates, but not like a solid ball! It takes about 25 days to rotate at the equator but up to 35 days near the poles. This is called differential rotation.",
    ttsText: "The Sun rotates, but not like a solid ball! It takes about 25 days to rotate at the equator but up to 35 days near the poles. This is called differential rotation.",
    image: "/src/assets/textures/sun.jpg"
  },
  {
    id: 19,
    title: "🔆 The Sun's Brightness Changes",
    content: "The Sun's brightness (luminosity) has increased by about 30% since it formed 4.6 billion years ago, and it continues to get slightly brighter over time.",
    ttsText: "The Sun's brightness, or luminosity, has increased by about 30% since it formed 4.6 billion years ago, and it continues to get slightly brighter over time.",
    animation: "SolarFormation3D"
  },
  {
    id: 20,
    title: "🧲 The Sun's Polarity Flips",
    content: "Every 11 years, the Sun's magnetic north and south poles completely flip places! This happens at the peak of each solar cycle.",
    ttsText: "Every 11 years, the Sun's magnetic north and south poles completely flip places! This happens at the peak of each solar cycle.",
    animation: "Magnetosphere3D"
  },

  // Solar Flares (Slides 21-35)
  {
    id: 21,
    title: "💥 What is a Solar Flare?",
    content: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
    ttsText: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
    animation: "SolarFlareJourney3D"
  },
  {
    id: 22,
    title: "⚡ Solar Flare Energy",
    content: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
    ttsText: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
    image: "/src/assets/solar-flare-hero.jpg"
  },
  {
    id: 23,
    title: "🌈 Different Types of Solar Flares",
    content: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
    ttsText: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
    animation: "SolarFlareJourney3D"
  },
  {
    id: 24,
    title: "⏱️ How Long Do Solar Flares Last?",
    content: "Solar flares can last from just a few minutes to several hours. The biggest flares can last for many hours and release energy for days!",
    ttsText: "Solar flares can last from just a few minutes to several hours. The biggest flares can last for many hours and release energy for days!",
    image: "/src/assets/solar-flare-hero.jpg"
  },
  {
    id: 25,
    title: "🔍 How Scientists Detect Solar Flares",
    content: "Scientists use special telescopes and satellites to watch the Sun 24/7. They can detect solar flares in different types of light that our eyes can't see.",
    ttsText: "Scientists use special telescopes and satellites to watch the Sun 24/7. They can detect solar flares in different types of light that our eyes can't see.",
    animation: "HighSchoolSpaceAdventure3D"
  },
  {
    id: 26,
    title: "📡 Solar Flares and Radio Waves",
    content: "Solar flares can affect radio communications on Earth. They can cause radio blackouts or make radio signals stronger in some areas.",
    ttsText: "Solar flares can affect radio communications on Earth. They can cause radio blackouts or make radio signals stronger in some areas.",
    animation: "EarthImpact3D"
  },
  {
    id: 27,
    title: "🎯 The Biggest Solar Flare Ever Recorded",
    content: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
    ttsText: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
    image: "/src/assets/solar-flare-hero.jpg"
  },
  {
    id: 28,
    title: "🛡️ Protecting Against Solar Flares",
    content: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
    ttsText: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
    animation: "MiddleSchoolSpaceAdventure3D"
  },
  {
    id: 29,
    title: "☀️ Where Solar Flares Occur",
    content: "Solar flares usually happen near sunspots, especially large, complex ones with twisted magnetic fields. They happen in the Sun's atmosphere, not on its surface!",
    ttsText: "Solar flares usually happen near sunspots, especially large, complex ones with twisted magnetic fields. They happen in the Sun's atmosphere, not on its surface!",
    animation: "SolarFlareJourney3D"
  },
  {
    id: 30,
    title: "🔋 Particles Accelerated by Solar Flares",
    content: "Solar flares can accelerate particles to nearly the speed of light! These fast-moving particles can reach Earth in just 8-10 minutes.",
    ttsText: "Solar flares can accelerate particles to nearly the speed of light! These fast-moving particles can reach Earth in just 8 to 10 minutes.",
    image: "/src/assets/solar-flare-hero.jpg"
  },
  {
    id: 31,
    title: "🎨 The Colors of Solar Flares",
    content: "Solar flares emit energy across the electromagnetic spectrum, from radio waves to gamma rays. Different instruments see them in different 'colors' of light!",
    ttsText: "Solar flares emit energy across the electromagnetic spectrum, from radio waves to gamma rays. Different instruments see them in different 'colors' of light!",
    animation: "SolarFlareJourney3D"
  },
  {
    id: 32,
    title: "🔮 Predicting Solar Flares",
    content: "Scientists are getting better at predicting when solar flares might happen, but it's still challenging. They look for signs like complex sunspot groups and twisted magnetic fields.",
    ttsText: "Scientists are getting better at predicting when solar flares might happen, but it's still challenging. They look for signs like complex sunspot groups and twisted magnetic fields.",
    image: "/src/assets/solar-flare-hero.jpg"
  },
  {
    id: 33,
    title: "📱 How Solar Flares Affect Your Daily Life",
    content: "Large solar flares can disrupt GPS signals, making your navigation apps less accurate. They can also cause radio blackouts and affect satellite TV!",
    ttsText: "Large solar flares can disrupt GPS signals, making your navigation apps less accurate. They can also cause radio blackouts and affect satellite TV!",
    animation: "EarthImpact3D"
  },
  {
    id: 34,
    title: "🛰️ Solar Flares vs. Satellites",
    content: "Satellites can be damaged by the intense radiation from solar flares. Engineers design them with special shielding and safety modes to survive these events.",
    ttsText: "Satellites can be damaged by the intense radiation from solar flares. Engineers design them with special shielding and safety modes to survive these events.",
    animation: "HighSchoolSpaceAdventure3D"
  },
  {
    id: 35,
    title: "🧪 The Chemistry of Solar Flares",
    content: "Solar flares can temporarily change Earth's upper atmosphere by adding energy and changing the chemistry. This affects how radio waves travel around the planet!",
    ttsText: "Solar flares can temporarily change Earth's upper atmosphere by adding energy and changing the chemistry. This affects how radio waves travel around the planet!",
    image: "/src/assets/earth-aurora.jpg"
  },

  // Coronal Mass Ejections (CMEs) (Slides 36-50)
  {
    id: 36,
    title: "🌊 What is a Coronal Mass Ejection (CME)?",
    content: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
    ttsText: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
    animation: "SolarFlareJourney3D"
  },
  {
    id: 37,
    title: "💨 CME Speed and Size",
    content: "CMEs can travel at speeds of 1-3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
    ttsText: "CMEs can travel at speeds of 1 to 3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
    animation: "SpaceStormSimulation3D"
  },
  {
    id: 38,
    title: "🔗 CMEs and Solar Flares - Related Events",
    content: "CMEs often happen together with solar flares, but they're different things. A solar flare is light and energy, while a CME is actual matter being thrown into space.",
    ttsText: "CMEs often happen together with solar flares, but they're different things. A solar flare is light and energy, while a CME is actual matter being thrown into space.",
    image: "/src/assets/solar-flare-hero.jpg"
  },
  {
    id: 39,
    title: "⏰ How Long Does a CME Take to Reach Earth?",
    content: "It usually takes a CME 1-3 days to travel from the Sun to Earth. Scientists can predict when they'll arrive and how strong they'll be!",
    ttsText: "It usually takes a CME 1 to 3 days to travel from the Sun to Earth. Scientists can predict when they'll arrive and how strong they'll be!",
    animation: "SpaceStormSimulation3D"
  },
  {
    id: 40,
    title: "🎯 CME Direction - Not All Hit Earth",
    content: "Most CMEs don't hit Earth directly. They can go in any direction, and only some are aimed toward our planet. Scientists watch carefully to see which ones might affect us.",
    ttsText: "Most CMEs don't hit Earth directly. They can go in any direction, and only some are aimed toward our planet. Scientists watch carefully to see which ones might affect us.",
    image: "/src/assets/earth-aurora.jpg"
  }
];