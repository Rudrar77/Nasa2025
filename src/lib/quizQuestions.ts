interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export type QuizDifficulty = 'kids' | 'junior' | 'teen';

// Questions for kids (ages 5-8)
export const kidsQuestions: QuizQuestion[] = [
  {
    question: 'What is the big, bright object in our sky during the day?',
    options: ['The Moon', 'The Sun', 'A Star', 'A Cloud'],
    answer: 1,
    explanation: 'The Sun is the big, bright star in our sky during the day. It gives us light and warmth!',
  },
  {
    question: 'What do we call the beautiful colored lights in the sky near the North and South Poles?',
    options: ['Rainbows', 'Northern Lights', 'Stars', 'Comets'],
    answer: 1,
    explanation: 'The Northern Lights (or Aurora) are beautiful colorful lights that dance in the sky near the North and South Poles.',
  },
  {
    question: 'What planet do we live on?',
    options: ['Mars', 'Jupiter', 'Earth', 'Venus'],
    answer: 2,
    explanation: 'We live on planet Earth! It\'s the third planet from the Sun.',
  },
  {
    question: 'What makes Earth special compared to other planets?',
    options: ['It has water', 'It has people', 'It has plants and animals', 'All of these!'],
    answer: 3,
    explanation: 'Earth is special because it has water, air, plants, animals, and people. It\'s the only planet we know that has life!',
  },
  {
    question: 'Which of these is NOT a planet?',
    options: ['Mars', 'The Sun', 'Venus', 'Jupiter'],
    answer: 1,
    explanation: 'The Sun is not a planet - it\'s a star! All the planets in our solar system orbit around the Sun.',
  },
  {
    question: 'Which of these is closest to Earth?',
    options: ['The Sun', 'The Moon', 'Mars', 'Stars'],
    answer: 1,
    explanation: 'The Moon is Earth\'s closest neighbor in space. It orbits around our planet!',
  },
  {
    question: 'What causes day and night on Earth?',
    options: ['Earth spins around', 'The Sun moves around Earth', 'The Moon blocks the Sun', 'Clouds cover the Sun'],
    answer: 0,
    explanation: 'Earth spins (rotates) on its axis, making one complete turn every 24 hours. This causes day and night!',
  },
  {
    question: 'What do astronauts wear to protect them in space?',
    options: ['Winter coats', 'Spacesuits', 'Swimming suits', 'Rain jackets'],
    answer: 1,
    explanation: 'Astronauts wear special spacesuits that provide oxygen to breathe and protect them from extreme temperatures in space.',
  },
  {
    question: 'What giant ball of hot gas lights up our solar system?',
    options: ['The Moon', 'Earth', 'The Sun', 'Jupiter'],
    answer: 2,
    explanation: 'The Sun is a giant ball of hot gas that provides light and heat to all the planets in our solar system.',
  },
  {
    question: 'What do we call it when the Moon blocks our view of the Sun?',
    options: ['Solar Eclipse', 'Lunar Eclipse', 'Full Moon', 'New Moon'],
    answer: 0,
    explanation: 'A Solar Eclipse happens when the Moon moves between Earth and the Sun, blocking our view of the Sun for a short time.',
  },
  {
    question: 'What is a shooting star?',
    options: ['A star that moves', 'A rocket', 'A meteor burning up', 'The Sun'],
    answer: 2,
    explanation: 'A "shooting star" is actually a meteor - a small piece of rock burning up as it enters Earth\'s atmosphere.',
  },
  {
    question: 'What color is our Sun?',
    options: ['Yellow', 'Red', 'Blue', 'White'],
    answer: 3,
    explanation: 'Although the Sun often looks yellow in the sky, it\'s actually white! The Earth\'s atmosphere makes it look yellow or orange sometimes.',
  },
];

// Questions for juniors (ages 9-12)
export const juniorQuestions: QuizQuestion[] = [
  {
    question: 'What is the Sun made of?',
    options: ['Rock and metal', 'Water and ice', 'Hot gases (hydrogen and helium)', 'Gold and silver'],
    answer: 2,
    explanation: 'The Sun is made mostly of hydrogen and helium gases that are very, very hot.',
  },
  {
    question: 'What protects Earth from harmful solar radiation?',
    options: ['The Moon', 'The Ozone Layer', 'The Magnetosphere', 'Clouds'],
    answer: 2,
    explanation: 'Earth\'s magnetosphere is a magnetic shield around our planet that protects us from harmful solar radiation.',
  },
  {
    question: 'What is a solar flare?',
    options: ['A type of sunglasses', 'A burst of energy from the Sun', 'A space telescope', 'A kind of northern light'],
    answer: 1,
    explanation: 'Solar flares are sudden, bright flashes of light and energy released from the Sun\'s surface.',
  },
  {
    question: 'What causes the beautiful aurora (northern/southern lights)?',
    options: ['Solar wind meeting Earth\'s magnetic field', 'Lightning', 'City lights', 'Airplane lights'],
    answer: 0,
    explanation: 'Auroras happen when particles from the Sun (solar wind) interact with Earth\'s magnetic field and atmosphere.',
  },
  {
    question: 'How long does it take light from the Sun to reach Earth?',
    options: ['8 minutes', '8 hours', '8 seconds', '8 days'],
    answer: 0,
    explanation: 'Sunlight takes about 8 minutes to travel the 93 million miles from the Sun to Earth.',
  },
  {
    question: 'What color is most commonly seen in auroras?',
    options: ['Red', 'Blue', 'Green', 'Purple'],
    answer: 2,
    explanation: 'Green is the most common aurora color, caused by oxygen atoms in the atmosphere.',
  },
  {
    question: 'What is the Sun\'s outer atmosphere called?',
    options: ['Photosphere', 'Chromosphere', 'Corona', 'Magnetosphere'],
    answer: 2,
    explanation: 'The corona is the Sun\'s outer atmosphere. It\'s normally invisible but can be seen during a total solar eclipse.',
  },
  {
    question: 'What are sunspots?',
    options: ['Planets near the Sun', 'Dark, cooler areas on the Sun\'s surface', 'Bright spots on the Moon', 'Small suns'],
    answer: 1,
    explanation: 'Sunspots are darker, cooler areas on the Sun\'s surface caused by intense magnetic activity.',
  },
  {
    question: 'What is solar wind?',
    options: ['Wind caused by the Sun\'s heat on Earth', 'A stream of charged particles from the Sun', 'Wind on the Sun\'s surface', 'A space mission'],
    answer: 1,
    explanation: 'Solar wind is a stream of charged particles flowing outward from the Sun in all directions.',
  },
  {
    question: 'Which layer of Earth\'s atmosphere protects us from UV radiation?',
    options: ['Troposphere', 'Stratosphere (with the ozone layer)', 'Mesosphere', 'Thermosphere'],
    answer: 1,
    explanation: 'The stratosphere contains the ozone layer, which absorbs most of the Sun\'s harmful ultraviolet (UV) radiation.',
  },
  {
    question: 'What is a solar eclipse?',
    options: ['When Earth blocks sunlight from reaching the Moon', 'When the Moon blocks sunlight from reaching Earth', 'When the Sun disappears at night', 'When clouds cover the Sun'],
    answer: 1,
    explanation: 'A solar eclipse happens when the Moon passes between Earth and the Sun, blocking the Sun from view.',
  },
  {
    question: 'What is a solar cycle?',
    options: ['The Sun\'s daily rotation', 'The pattern of day and night', 'The ~11-year pattern of solar activity', 'The Sun\'s orbit around the galaxy'],
    answer: 2,
    explanation: 'The solar cycle is the regular pattern of changes in the Sun\'s activity and appearance that takes about 11 years to complete.',
  },
];

// Questions for teens (ages 13+)
export const teenQuestions: QuizQuestion[] = [
  {
    question: 'What protects Earth from harmful solar radiation?',
    options: ['The Moon', 'The Ozone Layer', 'The Magnetosphere', 'Clouds'],
    answer: 2,
    explanation: 'The magnetosphere is Earth\'s magnetic field that protects us from harmful solar radiation.',
  },
  {
    question: 'What is a solar flare?',
    options: ['A type of star', 'A burst of energy from the Sun', 'A planet', 'A comet'],
    answer: 1,
    explanation: 'Solar flares are intense bursts of radiation from the Sun\'s surface.',
  },
  {
    question: 'What causes the beautiful aurora (northern/southern lights)?',
    options: ['Solar wind', 'Lightning', 'City lights', 'Moonlight'],
    answer: 0,
    explanation: 'The aurora is caused by solar wind particles interacting with Earth\'s magnetosphere.',
  },
  {
    question: 'What is a CME?',
    options: ['Cosmic Moon Event', 'Coronal Mass Ejection', 'Celestial Meteor Explosion', 'Computer Main Error'],
    answer: 1,
    explanation: 'A Coronal Mass Ejection is a massive burst of solar wind and magnetic fields from the Sun.',
  },
  {
    question: 'Which technology can be affected by space weather?',
    options: ['GPS systems', 'Power grids', 'Satellites', 'All of the above'],
    answer: 3,
    explanation: 'Space weather can affect many technologies including GPS, power grids, and satellites.',
  },
  {
    question: 'How long does it take light from the Sun to reach Earth?',
    options: ['8 minutes', '8 hours', '8 seconds', '8 days'],
    answer: 0,
    explanation: 'Sunlight takes approximately 8 minutes to travel the 93 million miles to Earth.',
  },
  {
    question: 'What color is most commonly seen in auroras?',
    options: ['Red', 'Blue', 'Green', 'Purple'],
    answer: 2,
    explanation: 'Green is the most common aurora color, caused by oxygen atoms in the atmosphere.',
  },
  {
    question: 'What is the Sun\'s outer atmosphere called?',
    options: ['Photosphere', 'Chromosphere', 'Corona', 'Magnetosphere'],
    answer: 2,
    explanation: 'The corona is the Sun\'s outer atmosphere, visible during total solar eclipses.',
  },
  {
    question: 'What is space weather?',
    options: ['Rain in space', 'Changes in space conditions', 'Temperature in space', 'Star patterns'],
    answer: 1,
    explanation: 'Space weather refers to changes in environmental conditions in space.',
  },
  {
    question: 'What organization monitors space weather on Earth?',
    options: ['NOAA', 'FBI', 'CDC', 'EPA'],
    answer: 0,
    explanation: 'NOAA\'s Space Weather Prediction Center monitors and forecasts space weather.',
  },
  {
    question: 'What happens during a geomagnetic storm?',
    options: ['Earth\'s magnetic field is disturbed', 'It rains magnets', 'Compasses stop working', 'Mountains become magnetic'],
    answer: 0,
    explanation: 'Geomagnetic storms occur when Earth\'s magnetic field is disturbed by solar activity.',
  },
  {
    question: 'Which profession needs to monitor space weather closely?',
    options: ['Airline pilots', 'Chefs', 'Librarians', 'Musicians'],
    answer: 0,
    explanation: 'Airline pilots need to monitor space weather as it can affect navigation and communication.',
  },
  {
    question: 'What is solar wind made of?',
    options: ['Water vapor', 'Charged particles', 'Cosmic dust', 'Sound waves'],
    answer: 1,
    explanation: 'Solar wind consists of charged particles ejected from the Sun\'s atmosphere.',
  },
  {
    question: 'What causes solar flares?',
    options: ['Magnetic field changes', 'Chemical reactions', 'Nuclear fusion', 'Asteroid impacts'],
    answer: 0,
    explanation: 'Solar flares are caused by sudden changes in the Sun\'s magnetic field.',
  },
  {
    question: 'How can space weather affect Earth\'s technology?',
    options: ['Damage satellites', 'Cause power outages', 'Disrupt GPS', 'All of the above'],
    answer: 3,
    explanation: 'Space weather can affect satellites, power grids, and navigation systems.',
  },
  {
    question: 'What is the sunspot cycle?',
    options: ['11 years', '7 years', '5 years', '3 years'],
    answer: 0,
    explanation: 'The Sun\'s activity cycle, measured by sunspots, is approximately 11 years.',
  },
  {
    question: 'What protects astronauts from solar radiation?',
    options: ['Spacecraft shielding', 'Sunscreen', 'Regular clothes', 'Nothing'],
    answer: 0,
    explanation: 'Spacecraft and spacesuits are specially designed to shield astronauts from radiation.',
  },
  {
    question: 'What is a solar prominence?',
    options: ['A loop of plasma', 'A dark sunspot', 'A solar eclipse', 'A type of planet'],
    answer: 0,
    explanation: 'A solar prominence is a large, bright loop of plasma extending from the Sun\'s surface.',
  },
  {
    question: 'When is space weather most active?',
    options: ['Solar maximum', 'Solar minimum', 'During eclipses', 'At night'],
    answer: 0,
    explanation: 'Space weather is most active during solar maximum, when the Sun has more sunspots.',
  },
  {
    question: 'What was the most powerful solar storm recorded?',
    options: ['Carrington Event', 'Perfect Storm', 'Solar Maximum', 'Aurora Major'],
    answer: 0,
    explanation: 'The 1859 Carrington Event was the most powerful solar storm in recorded history.',
  },
];

// Function to get questions based on difficulty
export const getQuestionsByDifficulty = (difficulty: QuizDifficulty): QuizQuestion[] => {
  switch (difficulty) {
    case 'kids':
      return kidsQuestions;
    case 'junior':
      return juniorQuestions;
    case 'teen':
      return teenQuestions;
    default:
      return teenQuestions;
  }
};