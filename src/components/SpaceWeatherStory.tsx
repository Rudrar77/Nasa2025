import { useState } from 'react';
import StoryPage from './StoryPage';
import { Button } from './ui/button';
import { Rocket, Play } from 'lucide-react';

// Import images
import solarFlareHero from '@/assets/solar-flare-hero.jpg';
import flareCharacter from '@/assets/flare-character.jpg';
import earthAurora from '@/assets/earth-aurora.jpg';
import spaceWeatherImpacts from '@/assets/space-weather-impacts.jpg';

const SpaceWeatherStory = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showStory, setShowStory] = useState(false);

  const pages = [
    {
      title: "Meet Flare!",
      image: flareCharacter,
      imageAlt: "A friendly solar flare character named Flare",
      content: (
        <>
          <p className="text-lg mb-4">
            Hi there! My name is <span className="text-primary font-bold">Flare</span>, and I'm a solar flare! 
            I was born from the incredible energy of our Sun, 93 million miles away from Earth.
          </p>
          <p className="text-base mb-4">
            Solar flares like me are bursts of energy that shoot out from the Sun's surface. 
            We're made of super hot particles and magnetic energy that can travel really, really fast through space!
          </p>
          <p className="text-base">
            Today, I'm going to take you on an amazing journey to show you what happens when 
            space weather like me travels toward Earth. Are you ready for an adventure?
          </p>
        </>
      )
    },
    {
      title: "What is Space Weather?",
      image: solarFlareHero,
      imageAlt: "Solar flares erupting from the Sun's surface",
      content: (
        <>
          <p className="text-lg mb-4">
            <span className="text-secondary font-bold">Space weather</span> is what we call all the 
            activity that happens between the Sun and planets like Earth.
          </p>
          <p className="text-base mb-4">
            Just like Earth has weather with rain, snow, and wind, space has its own weather! 
            This includes solar flares like me, something called coronal mass ejections (CMEs), 
            and the solar wind - streams of particles flowing from the Sun.
          </p>
          <p className="text-base">
            Even though the Sun is super far away, our space weather can affect lots of things 
            on Earth in ways people might not even realize!
          </p>
        </>
      )
    },
    {
      title: "My Journey Begins!",
      image: flareCharacter,
      imageAlt: "Flare traveling through space toward Earth",
      content: (
        <>
          <p className="text-lg mb-4">
            Whoosh! Here I go, racing through space at incredible speeds! 
            I'm traveling at over <span className="text-accent font-bold">1 million miles per hour</span>!
          </p>
          <p className="text-base mb-4">
            It usually takes me about 8 minutes for my light to reach Earth, but my particle energy 
            takes longer - sometimes a few hours or even days depending on how strong I am.
          </p>
          <p className="text-base">
            As I zoom through the darkness of space, I'm carrying lots of energy and charged particles. 
            I wonder what will happen when I reach Earth's protective magnetic field...
          </p>
        </>
      )
    },
    {
      title: "Meeting Earth's Shield",
      image: earthAurora,
      imageAlt: "Earth with beautiful aurora lights around the poles",
      content: (
        <>
          <p className="text-lg mb-4">
            Wow! Look at that beautiful blue and green planet - that's Earth! 
            And see those amazing <span className="text-secondary font-bold">colorful lights</span> dancing around it?
          </p>
          <p className="text-base mb-4">
            Those are called auroras (or northern and southern lights)! They happen when particles 
            like me interact with Earth's magnetic field and atmosphere. It's like nature's own light show!
          </p>
          <p className="text-base">
            Earth has an invisible protective shield called a magnetosphere that deflects most space weather. 
            But sometimes, when solar flares like me are really strong, we can still cause some effects!
          </p>
        </>
      )
    },
    {
      title: "How I Affect People on Earth",
      image: spaceWeatherImpacts,
      imageAlt: "Various technologies affected by space weather",
      content: (
        <>
          <p className="text-lg mb-4">
            Even though I create beautiful auroras, I can sometimes cause challenges for people on Earth too.
          </p>
          <p className="text-base mb-4">
            <span className="text-accent font-bold">Pilots and astronauts</span> need to be extra careful when I'm around. 
            <span className="text-primary font-bold">Farmers</span> using GPS for their tractors might find their signals getting fuzzy. 
            <span className="text-secondary font-bold">Radio operators</span> might have trouble with their communications.
          </p>
          <p className="text-base">
            <span className="text-accent font-bold">Photographers</span> love chasing my auroras for beautiful pictures! 
            But <span className="text-primary font-bold">power companies</span> have to monitor their electrical grids, 
            and <span className="text-secondary font-bold">satellite operators</span> keep a close eye on their spacecraft.
          </p>
        </>
      )
    },
    {
      title: "Space Weather Heroes",
      image: solarFlareHero,
      imageAlt: "Scientists monitoring space weather",
      content: (
        <>
          <p className="text-lg mb-4">
            The amazing thing is that there are <span className="text-primary font-bold">space weather scientists</span> 
            who study me and my solar flare friends!
          </p>
          <p className="text-base mb-4">
            They use special satellites and instruments to watch the Sun and predict when solar flares like me 
            are coming. This helps people on Earth prepare and protect their technology.
          </p>
          <p className="text-base mb-4">
            <span className="text-secondary font-bold">NASA scientists, meteorologists, and engineers</span> work together 
            to understand space weather better every day. They want to help everyone stay safe while still enjoying 
            the beautiful effects I can create!
          </p>
          <p className="text-base">
            As our world uses more technology, understanding space weather becomes more important than ever!
          </p>
        </>
      )
    },
    {
      title: "The End of My Journey",
      image: earthAurora,
      imageAlt: "Beautiful aurora display over Earth",
      content: (
        <>
          <p className="text-lg mb-4">
            Well, my journey to Earth is complete! I've shown you how space weather works and 
            how it connects the Sun to our beautiful planet.
          </p>
          <p className="text-base mb-4">
            Remember, space weather has been happening for billions of years, but now it affects 
            more of our daily lives because we use so much technology.
          </p>
          <p className="text-base mb-4">
            <span className="text-accent font-bold">Every person</span> - from farmers to photographers, 
            pilots to scientists - can be affected by space weather in different ways.
          </p>
          <p className="text-base">
            Thanks for joining me on this cosmic adventure! Next time you see beautiful northern lights 
            or hear about GPS problems during a solar storm, you'll know that it might be a solar flare 
            like me saying hello from 93 million miles away! 🌟
          </p>
        </>
      )
    }
  ];

  const totalPages = pages.length;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!showStory) {
    return (
      <div className="min-h-screen bg-gradient-space flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <div className="bg-card rounded-3xl shadow-cosmic p-12 backdrop-blur-sm border border-border">
            {/* Hero Image */}
            <div className="mb-8 relative">
              <img 
                src={solarFlareHero} 
                alt="Solar flare erupting from the Sun"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-aurora"
              />
              <div className="absolute inset-0 bg-gradient-aurora opacity-20 rounded-2xl"></div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-solar bg-clip-text text-transparent">
                Flare's Space Weather
              </span>
              <br />
              <span className="bg-gradient-aurora bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Flare, a friendly solar flare, on an amazing journey from the Sun to Earth! 
              Discover how space weather affects everyone from astronauts to farmers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setShowStory(true)}
                className="gap-3 bg-gradient-solar hover:shadow-solar text-lg px-8 py-4"
              >
                <Play className="h-5 w-5" />
                Start the Adventure
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Rocket className="h-4 w-4" />
                <span>{totalPages} chapters • 10 min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPageData = pages[currentPage];

  return (
    <StoryPage
      title={currentPageData.title}
      image={currentPageData.image}
      imageAlt={currentPageData.imageAlt}
      onNext={handleNext}
      onPrev={handlePrev}
      isFirst={currentPage === 0}
      isLast={currentPage === totalPages - 1}
      pageNumber={currentPage + 1}
      totalPages={totalPages}
    >
      {currentPageData.content}
    </StoryPage>
  );
};

export default SpaceWeatherStory;