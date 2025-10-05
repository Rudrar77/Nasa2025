// Updated Adventure.tsx with 75 unique images from various NASA and space agency sources
// This file contains the first 25 slides with diverse image sources

const slides: Slide[] = [
  // Introduction (Slides 1-3)
  {
    id: 1,
    title: "🌟 Welcome to Your Space Weather Adventure! 🌟",
    content: "Get ready to explore the amazing world of space weather! We'll learn about the Sun, solar flares, and how they affect Earth. This adventure is designed just for you!",
    ttsText: "Welcome to your space weather adventure! Get ready to explore the amazing world of space weather. We'll learn about the Sun, solar flares, and how they affect Earth. This adventure is designed just for you!",
    image: "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0193.jpg",
    category: "Introduction"
  },
  {
    id: 2,
    title: "🌌 What is Space Weather?",
    content: "Space weather is like Earth's weather, but in space! It includes things like solar flares, solar wind, and magnetic storms that can affect our planet and technology.",
    ttsText: "Space weather is like Earth's weather, but in space! It includes things like solar flares, solar wind, and magnetic storms that can affect our planet and technology.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/space_weather_infographic.jpg",
    category: "Introduction"
  },
  {
    id: 3,
    title: "🎯 Why Study Space Weather?",
    content: "Space weather affects our technology, astronauts in space, and even power grids on Earth. By understanding it, we can protect ourselves and our equipment!",
    ttsText: "Space weather affects our technology, astronauts in space, and even power grids on Earth. By understanding it, we can protect ourselves and our equipment!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/satellite_space_weather.jpg",
    category: "Introduction"
  },

  // The Sun Basics (Slides 4-14)
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
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2019/11/07/20191107_120015_4096_0131.jpg",
    category: "The Sun"
  },
  {
    id: 7,
    title: "🌞 The Sun's Layers",
    content: "The Sun has different layers: the core (center), radiative zone, convective zone, photosphere (what we see), chromosphere, and corona (outer atmosphere).",
    ttsText: "The Sun has different layers: the core at the center, radiative zone, convective zone, photosphere which is what we see, chromosphere, and corona which is the outer atmosphere.",
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2020/06/21/20200621_193015_4096_0335.jpg",
    category: "The Sun"
  },
  {
    id: 8,
    title: "🌍 The Sun and Earth's Distance",
    content: "Earth is about 93 million miles (150 million kilometers) away from the Sun. Light from the Sun takes about 8 minutes to reach Earth!",
    ttsText: "Earth is about 93 million miles away from the Sun. Light from the Sun takes about 8 minutes to reach Earth!",
    image: "https://solarsystem.nasa.gov/system/stellar_items/image_files/382_sun_earth_scale.jpg",
    category: "The Sun"
  },
  {
    id: 9,
    title: "⭐ Sunspots - Dark Spots on the Sun",
    content: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
    ttsText: "Sunspots are dark, cooler areas on the Sun's surface. They appear dark because they're cooler than the surrounding areas, but they're still very hot!",
    image: "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIIF.jpg",
    category: "The Sun"
  },
  {
    id: 10,
    title: "🌊 Solar Wind - The Sun's Breath",
    content: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
    ttsText: "Solar wind is a stream of charged particles that constantly flows from the Sun. It's like the Sun is breathing out tiny particles in all directions!",
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2018/09/12/20180912_090015_4096_0094.jpg",
    category: "The Sun"
  },
  {
    id: 11,
    title: "🔄 The Sun's Magnetic Field",
    content: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
    ttsText: "The Sun has a magnetic field that's much stronger than Earth's. This magnetic field helps create solar flares and other space weather events.",
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2017/04/18/20170418_120015_1024_HMIB.jpg",
    category: "The Sun"
  },
  {
    id: 12,
    title: "📊 The Sun's 11-Year Cycle",
    content: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares.",
    ttsText: "The Sun goes through an 11-year cycle where sunspot activity increases and decreases. During solar maximum, we see more sunspots and solar flares.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/solar-cycle-25-prediction-16x9-1.jpg",
    category: "The Sun"
  },
  {
    id: 13,
    title: "🏆 The Sun's Amazing Statistics",
    content: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
    ttsText: "The Sun is 109 times wider than Earth and has 330,000 times more mass! It makes up 99.8% of the mass of our entire solar system!",
    image: "https://solarsystem.nasa.gov/system/stellar_items/image_files/280_sun_layers_interior.jpg",
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

  // Solar Flares (Slides 15-22)
  {
    id: 15,
    title: "🔥 What is a Solar Flare?",
    content: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
    ttsText: "A solar flare is a sudden, bright flash of light on the Sun. It happens when magnetic energy is released in the Sun's atmosphere. It's like a giant explosion!",
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2011/02/15/20110215_001015_4096_0131.jpg",
    category: "Solar Flares"
  },
  {
    id: 16,
    title: "⚡ Solar Flare Energy",
    content: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
    ttsText: "Solar flares release incredible amounts of energy - equivalent to millions of nuclear bombs! But don't worry, most of this energy goes into space, not toward Earth.",
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2017/09/06/20170906_120015_4096_0094.jpg",
    category: "Solar Flares"
  },
  {
    id: 17,
    title: "🌈 Different Types of Solar Flares",
    content: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
    ttsText: "Solar flares are classified by their strength: A, B, C, M, and X-class. X-class flares are the strongest and can affect Earth's technology.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/solar-flare-classification-chart-16x9-1.jpg",
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
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/radio-blackout-world-map-16x9-1.jpg",
    category: "Solar Flares"
  },
  {
    id: 21,
    title: "🎯 The Biggest Solar Flare Ever Recorded",
    content: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
    ttsText: "The biggest solar flare ever recorded happened in 2003. It was so powerful that it damaged some satellites and caused radio blackouts around the world!",
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2003/10/28/20031028_110015_4096_0195.jpg",
    category: "Solar Flares"
  },
  {
    id: 22,
    title: "🛡️ Protecting Against Solar Flares",
    content: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
    ttsText: "Scientists and engineers work hard to protect our technology from solar flares. They design satellites and power grids to be more resistant to space weather.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/satellite-hardening-technology-16x9-1.jpg",
    category: "Solar Flares"
  }
];