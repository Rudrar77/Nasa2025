// Updated Adventure.tsx with 75 unique images from various NASA and space agency sources
// This file contains slides 51-75 with diverse image sources

const slides: Slide[] = [
  // Space Weather Effects (Slides 55-62)
  {
    id: 51,
    title: "👁️ The Sun in Different Wavelengths",
    content: "Scientists observe the Sun in different wavelengths of light to see different layers and features, like using special glasses to see hidden details!",
    ttsText: "Scientists observe the Sun in different wavelengths of light to see different layers and features, like using special glasses to see hidden details!",
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2019/07/02/20190702_120015_4096_HMII.jpg",
    category: "Research"
  },
  {
    id: 52,
    title: "🔄 The Sun's Differential Rotation",
    content: "The Sun doesn't rotate as a solid body - the equator rotates faster than the poles! This differential rotation helps create the Sun's complex magnetic field.",
    ttsText: "The Sun doesn't rotate as a solid body - the equator rotates faster than the poles! This differential rotation helps create the Sun's complex magnetic field.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/solar-differential-rotation-16x9-1.jpg",
    category: "The Sun"
  },
  {
    id: 53,
    title: "💫 The Heliosphere - The Sun's Bubble",
    content: "The heliosphere is a giant bubble created by the Sun's solar wind that surrounds our entire solar system, protecting us from galactic cosmic rays.",
    ttsText: "The heliosphere is a giant bubble created by the Sun's solar wind that surrounds our entire solar system, protecting us from galactic cosmic rays.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/heliosphere-voyager-diagram-16x9-1.jpg",
    category: "The Sun"
  },
  {
    id: 54,
    title: "🔆 Solar Irradiance - The Sun's Energy Output",
    content: "Solar irradiance is the amount of energy the Sun sends to Earth. It changes slightly during the solar cycle but remains remarkably stable over time.",
    ttsText: "Solar irradiance is the amount of energy the Sun sends to Earth. It changes slightly during the solar cycle but remains remarkably stable over time.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/solar-irradiance-total-chart-16x9-1.jpg",
    category: "The Sun"
  },
  {
    id: 55,
    title: "📱 Space Weather and Your Cell Phone",
    content: "Strong space weather can disrupt cell phone signals and GPS navigation. Your phone might lose signal or give wrong directions during solar storms!",
    ttsText: "Strong space weather can disrupt cell phone signals and GPS navigation. Your phone might lose signal or give wrong directions during solar storms!",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/gps-space-weather-disruption-16x9-1.jpg",
    category: "Technology Impact"
  },
  {
    id: 56,
    title: "✈️ Space Weather and Airplanes",
    content: "Airlines sometimes change flight paths during space weather events to avoid communication problems and to reduce radiation exposure at high altitudes.",
    ttsText: "Airlines sometimes change flight paths during space weather events to avoid communication problems and to reduce radiation exposure at high altitudes.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/airline-radiation-polar-routes-16x9-1.jpg",
    category: "Technology Impact"
  },
  {
    id: 57,
    title: "🚢 Space Weather and Ship Navigation",
    content: "Ships use compasses and GPS for navigation, both of which can be affected by space weather. In the past, sailors used to navigate by the stars!",
    ttsText: "Ships use compasses and GPS for navigation, both of which can be affected by space weather. In the past, sailors used to navigate by the stars!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/ship_navigation_compass.jpg",
    category: "Technology Impact"
  },
  {
    id: 58,
    title: "🧭 Space Weather and Compasses",
    content: "During strong geomagnetic storms, compasses might not point to magnetic north correctly. This affected explorers in the past who relied on compasses!",
    ttsText: "During strong geomagnetic storms, compasses might not point to magnetic north correctly. This affected explorers in the past who relied on compasses!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/magnetic_declination_map.jpg",
    category: "Technology Impact"
  },
  {
    id: 59,
    title: "💸 The Economic Impact of Space Weather",
    content: "A severe space weather event could cost billions of dollars in damage to satellites, power grids, and communications. That's why prediction is so important!",
    ttsText: "A severe space weather event could cost billions of dollars in damage to satellites, power grids, and communications. That's why prediction is so important!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/economic_impact_chart.jpg",
    category: "Technology Impact"
  },
  {
    id: 60,
    title: "👷 Jobs in Space Weather",
    content: "Many people work in space weather research and forecasting, including scientists, engineers, mathematicians, and computer programmers. It's an exciting field!",
    ttsText: "Many people work in space weather research and forecasting, including scientists, engineers, mathematicians, and computer programmers. It's an exciting field!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/space_weather_scientists.jpg",
    category: "Research"
  },
  {
    id: 61,
    title: "🏡 Space Weather and Your Home",
    content: "Space weather can cause power outages and affect electronics in your home. Having emergency supplies and a backup power source is always a good idea!",
    ttsText: "Space weather can cause power outages and affect electronics in your home. Having emergency supplies and a backup power source is always a good idea!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/home_power_outage.jpg",
    category: "Technology Impact"
  },
  {
    id: 62,
    title: "🌟 Space Weather and Astronomy",
    content: "Space weather can make auroras visible farther from the poles, giving more people a chance to see these beautiful natural light shows!",
    ttsText: "Space weather can make auroras visible farther from the poles, giving more people a chance to see these beautiful natural light shows!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/aurora_from_ground.jpg",
    category: "Earth's Protection"
  },

  // Space Weather and Other Planets (Slides 63-70)
  {
    id: 63,
    title: "🪐 Space Weather on Other Planets",
    content: "Other planets in our solar system also experience space weather! Jupiter has the strongest magnetic field and the most impressive auroras.",
    ttsText: "Other planets in our solar system also experience space weather! Jupiter has the strongest magnetic field and the most impressive auroras.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/jupiter_aurora_hubble.jpg",
    category: "Other Planets"
  },
  {
    id: 64,
    title: "🔴 Space Weather on Mars",
    content: "Mars doesn't have a strong magnetic field like Earth, so space weather hits its surface directly. This is a challenge for future astronauts going to Mars!",
    ttsText: "Mars doesn't have a strong magnetic field like Earth, so space weather hits its surface directly. This is a challenge for future astronauts going to Mars!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/mars_atmosphere_loss.jpg",
    category: "Other Planets"
  },
  {
    id: 65,
    title: "🔵 Space Weather on Mercury",
    content: "Mercury is very close to the Sun and gets hit by intense space weather. It has a magnetic field, but it's not strong enough to fully protect the planet.",
    ttsText: "Mercury is very close to the Sun and gets hit by intense space weather. It has a magnetic field, but it's not strong enough to fully protect the planet.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/mercury_magnetosphere.jpg",
    category: "Other Planets"
  },
  {
    id: 66,
    title: "🪐 Jupiter's Magnetic Field",
    content: "Jupiter's magnetic field is the strongest in the solar system - about 20,000 times stronger than Earth's! It creates a huge magnetosphere that protects its moons.",
    ttsText: "Jupiter's magnetic field is the strongest in the solar system - about 20,000 times stronger than Earth's! It creates a huge magnetosphere that protects its moons.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/jupiter_magnetosphere_juno.jpg",
    category: "Other Planets"
  },
  {
    id: 67,
    title: "🪐 Saturn's Auroras",
    content: "Saturn has beautiful auroras at its poles, just like Earth. They're caused by the same process - charged particles hitting the atmosphere along magnetic field lines.",
    ttsText: "Saturn has beautiful auroras at its poles, just like Earth. They're caused by the same process - charged particles hitting the atmosphere along magnetic field lines.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/saturn_aurora_cassini.jpg",
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
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/mars_water_loss_timeline.jpg",
    category: "Other Planets"
  },
  {
    id: 70,
    title: "🚀 Space Weather and Space Exploration",
    content: "As we explore more of the solar system, understanding space weather becomes even more important for protecting astronauts and spacecraft.",
    ttsText: "As we explore more of the solar system, understanding space weather becomes even more important for protecting astronauts and spacecraft.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/artemis_moon_mission.jpg",
    category: "Research"
  },

  // Conclusion and Quiz (Slides 71-75)
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
    id: 74,
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
    id: 75,
    title: "🌟 Congratulations, Space Weather Explorer!",
    content: "You've completed your space weather adventure! You now know about the Sun, solar flares, CMEs, and how they affect Earth. Keep exploring the amazing world of space science!",
    ttsText: "Congratulations, Space Weather Explorer! You've completed your space weather adventure! You now know about the Sun, solar flares, CMEs, and how they affect Earth. Keep exploring the amazing world of space science!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/space_explorer_badge.jpg",
    category: "Conclusion"
  }
];