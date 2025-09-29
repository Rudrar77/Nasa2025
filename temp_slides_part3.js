// Final part of the slides (51-75)

const slides_part3 = [
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
    image: "/public/textures/earth.jpg"
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