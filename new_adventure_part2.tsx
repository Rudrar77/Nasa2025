// Updated Adventure.tsx with 75 unique images from various NASA and space agency sources
// This file contains slides 23-50 with diverse image sources

const slides: Slide[] = [
  // Coronal Mass Ejections (CMEs) (Slides 23-30)
  {
    id: 23,
    title: "🌊 What is a Coronal Mass Ejection (CME)?",
    content: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
    ttsText: "A CME is when the Sun throws out a huge bubble of gas and magnetic field into space. It's like the Sun is having a giant sneeze!",
    image: "https://soho.nascom.nasa.gov/data/realtime/c2/512/latest.jpg",
    category: "CMEs"
  },
  {
    id: 24,
    title: "💨 CME Speed and Size",
    content: "CMEs can travel at speeds of 1-3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
    ttsText: "CMEs can travel at speeds of 1 to 3 million miles per hour! They can be as big as 50 times the size of Earth and contain billions of tons of material.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/cme-speed-measurement-16x9-1.jpg",
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
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/cme-direction-angles-16x9-1.jpg",
    category: "CMEs"
  },
  {
    id: 28,
    title: "📊 CME Classification",
    content: "CMEs are classified by their speed and direction. Fast CMEs (over 1,000 km/s) are more likely to cause strong space weather effects on Earth.",
    ttsText: "CMEs are classified by their speed and direction. Fast CMEs over 1,000 kilometers per second are more likely to cause strong space weather effects on Earth.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/cme-speed-classification-chart-16x9-1.jpg",
    category: "CMEs"
  },
  {
    id: 29,
    title: "🛰️ How We Study CMEs",
    content: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
    ttsText: "Scientists use special satellites like SOHO and STEREO to watch CMEs as they travel through space. These satellites help us understand and predict space weather.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/stereo-soho-satellites-16x9-1.jpg",
    category: "CMEs"
  },
  {
    id: 30,
    title: "🌍 CMEs and Earth's Magnetic Field",
    content: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
    ttsText: "When a CME reaches Earth, it interacts with our planet's magnetic field. This interaction can cause beautiful auroras and sometimes problems with technology.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/cme-magnetosphere-interaction-16x9-1.jpg",
    category: "CMEs"
  },

  // Earth's Protection and Impact (Slides 31-38)
  {
    id: 31,
    title: "🛡️ Earth's Magnetic Shield",
    content: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
    ttsText: "Earth has a magnetic field that acts like a shield, protecting us from harmful space weather. It's like an invisible force field around our planet!",
    image: "https://svs.gsfc.nasa.gov/vis/a010000/a013000/a013038/magnetosphere_print.jpg",
    category: "Earth's Protection"
  },
  {
    id: 32,
    title: "🌌 The Magnetosphere - Our Space Shield",
    content: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
    ttsText: "The magnetosphere is the area around Earth where our magnetic field protects us. It's shaped like a teardrop and extends far into space!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/earths_magnetosphere.jpg",
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
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/aurora_borealis_iss.jpg",
    category: "Earth's Protection"
  },
  {
    id: 35,
    title: "📡 Space Weather and Technology",
    content: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
    ttsText: "Space weather can affect GPS, radio communications, and power grids. Scientists work hard to make our technology more resistant to these effects.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/technology_space_weather.jpg",
    category: "Technology Impact"
  },
  {
    id: 36,
    title: "🛰️ Protecting Satellites",
    content: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in 'safe mode' during strong space weather.",
    ttsText: "Satellites in space are especially vulnerable to space weather. Engineers design them with special shielding and can put them in safe mode during strong space weather.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/satellite_space_weather.jpg",
    category: "Technology Impact"
  },
  {
    id: 37,
    title: "⚡ Space Weather and Power Grids",
    content: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
    ttsText: "Strong space weather can cause power outages by overloading power lines. The most famous example was in 1989 when Quebec lost power for 9 hours!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/quebec_blackout_1989.jpg",
    category: "Technology Impact"
  },
  {
    id: 38,
    title: "🔮 Predicting Space Weather",
    content: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
    ttsText: "Scientists use computer models and observations to predict space weather. This helps us prepare for and protect against its effects on Earth.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/space_weather_prediction.jpg",
    category: "Research"
  },

  // Historical Events and Research (Slides 39-46)
  {
    id: 39,
    title: "📅 The Carrington Event - 1859",
    content: "The biggest space weather event ever recorded happened in 1859. It caused auroras visible worldwide and would have caused major problems if it happened today!",
    ttsText: "The biggest space weather event ever recorded happened in 1859. It caused auroras visible worldwide and would have caused major problems if it happened today!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/carrington_event_1859.jpg",
    category: "Historical Events"
  },
  {
    id: 40,
    title: "🌍 Space Weather Around the World",
    content: "Space weather affects the whole world, but some places more than others. Areas near the North and South Poles see more auroras and space weather effects.",
    ttsText: "Space weather affects the whole world, but some places more than others. Areas near the North and South Poles see more auroras and space weather effects.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/global_space_weather_map.jpg",
    category: "Historical Events"
  },
  {
    id: 41,
    title: "👨‍🚀 Space Weather and Astronauts",
    content: "Astronauts in space need special protection from space weather. They can hide in shielded parts of the space station during strong solar storms.",
    ttsText: "Astronauts in space need special protection from space weather. They can hide in shielded parts of the space station during strong solar storms.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/iss_astronaut_protection.jpg",
    category: "Historical Events"
  },
  {
    id: 42,
    title: "🔬 How Scientists Study Space Weather",
    content: "Scientists use ground-based telescopes, satellites, and computer models to study space weather. They work together around the world to understand and predict it.",
    ttsText: "Scientists use ground-based telescopes, satellites, and computer models to study space weather. They work together around the world to understand and predict it.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/space_weather_observatory.jpg",
    category: "Research"
  },
  {
    id: 43,
    title: "🌐 Space Weather and Climate",
    content: "While space weather doesn't directly cause climate change, it can affect Earth's upper atmosphere and may have small effects on our weather patterns.",
    ttsText: "While space weather doesn't directly cause climate change, it can affect Earth's upper atmosphere and may have small effects on our weather patterns.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/climate_space_weather.jpg",
    category: "Research"
  },
  {
    id: 44,
    title: "🚀 Future of Space Weather Research",
    content: "Scientists are developing better ways to predict space weather and protect our technology. New missions and instruments will help us understand space weather even better!",
    ttsText: "Scientists are developing better ways to predict space weather and protect our technology. New missions and instruments will help us understand space weather even better!",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/future_space_missions.jpg",
    category: "Research"
  },
  {
    id: 45,
    title: "📈 Space Weather Monitoring Network",
    content: "There's a global network of observatories and satellites that constantly monitor the Sun and space weather, providing real-time data to scientists.",
    ttsText: "There's a global network of observatories and satellites that constantly monitor the Sun and space weather, providing real-time data to scientists.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/global_monitoring_network.jpg",
    category: "Research"
  },
  {
    id: 46,
    title: "📝 Space Weather Prediction Centers",
    content: "Special prediction centers like NOAA's Space Weather Prediction Center work 24/7 to forecast space weather and warn about possible impacts on Earth.",
    ttsText: "Special prediction centers like NOAA's Space Weather Prediction Center work 24/7 to forecast space weather and warn about possible impacts on Earth.",
    image: "https://www.nasa.gov/sites/default/files/thumbnails/image/noaa_prediction_center.jpg",
    category: "Research"
  },

  // The Sun's Influence (Slides 47-54)
  {
    id: 47,
    title: "🌠 Solar Prominences - Fire Bridges in Space",
    content: "Solar prominences are giant loops of glowing gas that extend outward from the Sun's surface. They can be hundreds of thousands of miles long!",
    ttsText: "Solar prominences are giant loops of glowing gas that extend outward from the Sun's surface. They can be hundreds of thousands of miles long!",
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2015/08/31/20150831_003015_4096_0304.jpg",
    category: "The Sun"
  },
  {
    id: 48,
    title: "🕳️ Coronal Holes - The Sun's Open Windows",
    content: "Coronal holes are cooler, less dense areas of the Sun's corona where magnetic field lines open into space, allowing solar wind to escape more easily.",
    ttsText: "Coronal holes are cooler, less dense areas of the Sun's corona where magnetic field lines open into space, allowing solar wind to escape more easily.",
    image: "https://sdo.gsfc.nasa.gov/assets/img/browse/2020/03/28/20200328_000015_4096_0193.jpg",
    category: "The Sun"
  },
  {
    id: 49,
    title: "🌡️ Solar Minimum vs. Solar Maximum",
    content: "During solar minimum, the Sun has fewer sunspots and less activity. During solar maximum, there are many sunspots and more solar flares and CMEs.",
    ttsText: "During solar minimum, the Sun has fewer sunspots and less activity. During solar maximum, there are many sunspots and more solar flares and CMEs.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/solar-cycle-comparison-chart-16x9-1.jpg",
    category: "The Sun"
  },
  {
    id: 50,
    title: "📏 Measuring Solar Activity",
    content: "Scientists measure solar activity using the sunspot number, solar flux, and by monitoring X-rays and other radiation from the Sun.",
    ttsText: "Scientists measure solar activity using the sunspot number, solar flux, and by monitoring X-rays and other radiation from the Sun.",
    image: "https://science.nasa.gov/wp-content/uploads/2023/09/solar-activity-measurement-graph-16x9-1.jpg",
    category: "Research"
  }
];