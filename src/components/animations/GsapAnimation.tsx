import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

interface GsapAnimationProps {
  slideId: number;
  category: string;
  title: string;
  className?: string;
}

const GsapAnimation: React.FC<GsapAnimationProps> = ({ slideId, category, title, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const auroraRef = useRef<HTMLDivElement>(null);
  const satelliteRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: false });
    
    // Clear previous animations
    gsap.killTweensOf([sunRef.current, earthRef.current, flareRef.current, auroraRef.current, satelliteRef.current, backgroundRef.current]);

    // Create slide-specific animations based on slideId and category
    createSlideSpecificAnimation(tl, slideId, category);

    return () => {
      tl.kill();
    };
  }, [slideId, category]);

  const createSlideSpecificAnimation = (tl: gsap.core.Timeline, slideId: number, category: string) => {
    // Different animations for different slide ranges and categories
    
    if (slideId >= 1 && slideId <= 10) {
      // Introduction slides - Welcome animations
      createIntroAnimation(tl, slideId);
    } else if (slideId >= 11 && slideId <= 30) {
      // Solar Physics slides - Sun-focused animations
      createSolarPhysicsAnimation(tl, slideId);
    } else if (slideId >= 31 && slideId <= 45) {
      // Space Weather slides - Dynamic space weather
      createSpaceWeatherAnimation(tl, slideId);
    } else if (slideId >= 46 && slideId <= 55) {
      // Earth Effects slides - Earth and atmosphere focus
      createEarthEffectsAnimation(tl, slideId);
    } else if (slideId >= 56 && slideId <= 65) {
      // Technology Impact slides - Satellite and tech focus
      createTechnologyAnimation(tl, slideId);
    } else if (slideId >= 66 && slideId <= 70) {
      // Historical Events slides - Historical themed
      createHistoricalAnimation(tl, slideId);
    } else if (slideId >= 71 && slideId <= 75) {
      // Future Predictions slides - Futuristic animations
      createFutureAnimation(tl, slideId);
    }
  };

  const createIntroAnimation = (tl: gsap.core.Timeline, slideId: number) => {
    // Cosmic introduction with unique elements per slide
    const variation = slideId % 3;
    
    tl.fromTo(backgroundRef.current, 
      { background: "linear-gradient(45deg, #1e1b4b, #312e81)" },
      { background: `linear-gradient(${45 + slideId * 10}deg, #1e1b4b, #312e81, #1e40af)`, duration: 4, ease: "power2.inOut" }
    )
    .fromTo(sunRef.current, 
      { scale: 0, rotation: 0, x: -100 },
      { scale: 1 + variation * 0.1, rotation: 360 + slideId * 20, x: 0, duration: 3, ease: "back.out(1.7)" }
    )
    .fromTo(earthRef.current,
      { x: 200, opacity: 0, scale: 0.5 },
      { x: 0, opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" }, "-=2"
    )
    .to(particlesRef.current, {
      rotation: slideId * 15,
      scale: 1 + Math.sin(slideId) * 0.3,
      duration: 3,
      ease: "power2.inOut",
      stagger: 0.1
    }, "-=2");
  };

  const createSolarPhysicsAnimation = (tl: gsap.core.Timeline, slideId: number) => {
    // Solar flare and sun dynamics with slide-specific variations
    const intensity = (slideId - 10) / 20; // Increases from 0 to 1 across solar physics slides
    
    tl.fromTo(sunRef.current,
      { scale: 0.8, filter: "brightness(0.8) hue-rotate(0deg)" },
      { scale: 1.3 + intensity * 0.5, filter: `brightness(${1.5 + intensity}) hue-rotate(${slideId * 5}deg)`, duration: 2.5, ease: "power2.inOut" }
    )
    .fromTo(flareRef.current,
      { scale: 0, opacity: 0, rotation: 0, x: 0, y: 0 },
      { 
        scale: 1 + intensity, 
        opacity: 0.8 + intensity * 0.2, 
        rotation: 180 + slideId * 10, 
        x: Math.sin(slideId) * 30,
        y: Math.cos(slideId) * 20,
        duration: 2, 
        ease: "elastic.out(1, 0.5)" 
      }, "-=1.5"
    )
    .to(particlesRef.current, {
      x: `random(-${50 + slideId * 2}, ${50 + slideId * 2})`,
      y: `random(-${50 + slideId * 2}, ${50 + slideId * 2})`,
      scale: `random(${0.5 + intensity}, ${1.5 + intensity})`,
      rotation: slideId * 20,
      duration: 2.5,
      ease: "power2.inOut",
      stagger: 0.08
    }, "-=2");
  };

  const createSpaceWeatherAnimation = (tl: gsap.core.Timeline, slideId: number) => {
    // Solar wind and magnetic field interactions
    const waveEffect = (slideId - 30) * 0.2;
    
    tl.fromTo(sunRef.current,
      { scale: 1, filter: "hue-rotate(0deg) brightness(1)" },
      { scale: 1.2, filter: `hue-rotate(${slideId * 8}deg) brightness(1.4)`, duration: 2, ease: "sine.inOut" }
    )
    .fromTo(particlesRef.current,
      { x: -400, opacity: 0, scale: 0.5 },
      { 
        x: 400, 
        opacity: 1, 
        scale: 1.2,
        rotation: slideId * 12,
        duration: 4, 
        ease: "power1.inOut", 
        stagger: {
          amount: 1.5,
          from: "random"
        }
      }, "-=1.5"
    )
    .to(earthRef.current, { 
      filter: `drop-shadow(0 0 ${20 + waveEffect * 10}px #00ff88) hue-rotate(${slideId * 6}deg)`,
      scale: 1 + Math.sin(slideId) * 0.1,
      duration: 2,
      ease: "power2.inOut"
    }, "-=3")
    .to(auroraRef.current, {
      opacity: 0.6 + waveEffect * 0.3,
      scale: 1 + waveEffect * 0.5,
      rotation: slideId * 25,
      duration: 3,
      ease: "sine.inOut"
    }, "-=2.5");
  };

  const createEarthEffectsAnimation = (tl: gsap.core.Timeline, slideId: number) => {
    // Aurora and magnetosphere visualization
    const earthFocus = (slideId - 45) / 10;
    
    tl.fromTo(earthRef.current,
      { scale: 0.6, filter: "brightness(0.7)", x: 0, y: 0 },
      { 
        scale: 1.4 + earthFocus * 0.3, 
        filter: `brightness(${1.3 + earthFocus * 0.4}) saturate(${1.2 + earthFocus * 0.3})`, 
        x: Math.sin(slideId * 0.3) * 15,
        y: Math.cos(slideId * 0.3) * 10,
        duration: 2.5, 
        ease: "power2.out" 
      }
    )
    .fromTo(auroraRef.current,
      { opacity: 0, scale: 0, rotation: 0, filter: "hue-rotate(0deg)" },
      { 
        opacity: 0.9, 
        scale: 1.2 + earthFocus * 0.4, 
        rotation: 360 + slideId * 15, 
        filter: `hue-rotate(${slideId * 12}deg)`,
        duration: 3.5, 
        ease: "power2.inOut" 
      }, "-=1.5"
    )
    .to(auroraRef.current, {
      filter: `hue-rotate(${slideId * 20}deg) brightness(${1.2 + earthFocus * 0.3})`,
      scale: `+=0.${slideId % 5}`,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    }, "-=2");
  };

  const createTechnologyAnimation = (tl: gsap.core.Timeline, slideId: number) => {
    // Satellite and technology impact
    const techComplexity = (slideId - 55) / 10;
    
    tl.fromTo(satelliteRef.current,
      { y: -150, rotation: 0, opacity: 0, scale: 0.5 },
      { 
        y: 0, 
        rotation: 360 + slideId * 20, 
        opacity: 1, 
        scale: 1 + techComplexity * 0.4,
        duration: 2.5, 
        ease: "bounce.out" 
      }
    )
    .to(satelliteRef.current, {
      x: `+=${30 + slideId * 2}`,
      y: `+=${Math.sin(slideId) * 20}`,
      rotation: `+=${slideId * 10}`,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    }, "-=1")
    .fromTo(flareRef.current,
      { scale: 0, opacity: 0, filter: "hue-rotate(0deg)" },
      { 
        scale: 1.2, 
        opacity: 0.8, 
        filter: `hue-rotate(${slideId * 15}deg)`,
        duration: 1.5, 
        ease: "power2.out" 
      }, "-=2")
    .to(particlesRef.current, {
      scale: `random(0.8, ${1.5 + techComplexity})`,
      rotation: slideId * 30,
      opacity: `random(0.6, 1)`,
      duration: 2,
      ease: "power2.inOut",
      stagger: 0.1,
      repeat: -1,
      yoyo: true
    }, "-=2");
  };

  const createHistoricalAnimation = (tl: gsap.core.Timeline, slideId: number) => {
    // Historical events timeline effect
    const historicalAge = (slideId - 65) * 0.3;
    
    tl.fromTo(containerRef.current,
      { filter: "sepia(0) contrast(1) brightness(1)" },
      { 
        filter: `sepia(${0.6 + historicalAge}) contrast(${1.3 + historicalAge}) brightness(${0.8 + historicalAge * 0.4})`, 
        duration: 2.5, 
        ease: "power2.inOut" 
      }
    )
    .fromTo(sunRef.current,
      { scale: 0.4, opacity: 0.4, filter: "brightness(0.6)" },
      { 
        scale: 1.6 + historicalAge, 
        opacity: 1, 
        filter: `brightness(${1.4 + historicalAge}) sepia(${0.4 + historicalAge})`,
        duration: 3.5, 
        ease: "power2.out" 
      }
    )
    .to(flareRef.current, {
      scale: 1.8 + historicalAge * 0.5,
      opacity: 0.9,
      rotation: slideId * 45,
      duration: 3,
      ease: "power2.inOut"
    }, "-=2.5")
    .to(textRef.current, {
      text: `Historical Event ${slideId - 65 + 1}`,
      duration: 2,
      ease: "power2.inOut"
    }, "-=2");
  };

  const createFutureAnimation = (tl: gsap.core.Timeline, slideId: number) => {
    // Futuristic technology and predictions
    const futuristic = (slideId - 70) * 0.4;
    
    tl.fromTo(containerRef.current,
      { filter: "hue-rotate(0deg) brightness(1) saturate(1)" },
      { 
        filter: `hue-rotate(${180 + slideId * 20}deg) brightness(${1.4 + futuristic * 0.3}) saturate(${1.5 + futuristic})`, 
        duration: 3.5, 
        ease: "power2.inOut" 
      }
    )
    .fromTo(satelliteRef.current,
      { scale: 0, y: 120, rotation: 0, filter: "brightness(0.8)" },
      { 
        scale: 1.3 + futuristic * 0.4, 
        y: 0, 
        rotation: slideId * 50,
        filter: `brightness(${1.6 + futuristic}) drop-shadow(0 0 15px #00ffff)`,
        duration: 2.8, 
        ease: "back.out(2)" 
      }
    )
    .to([sunRef.current, earthRef.current], {
      filter: `drop-shadow(0 0 ${25 + futuristic * 15}px #00ffff) hue-rotate(${slideId * 25}deg)`,
      scale: `+=${0.2 + futuristic * 0.1}`,
      duration: 2.5,
      ease: "power2.inOut"
    }, "-=2")
    .to(particlesRef.current, {
      scale: `random(${1 + futuristic}, ${2 + futuristic})`,
      rotation: slideId * 60,
      filter: "drop-shadow(0 0 8px #00ffff)",
      duration: 2,
      ease: "power2.inOut",
      stagger: 0.05,
      repeat: -1,
      yoyo: true
    }, "-=2");
  };

  // Create particle elements
  const createParticles = () => {
    return Array.from({ length: 12 }, (_, i) => (
      <div
        key={i}
        ref={el => el && (particlesRef.current[i] = el)}
        className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-70"
        style={{
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          background: `hsl(${60 + i * 30}, 80%, 60%)`,
        }}
      />
    ));
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-blue-900/30 rounded-lg overflow-hidden ${className}`}
    >
      {/* Background Layer */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
      />

      {/* Starfield Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animation: `twinkle ${2 + Math.random() * 2}s infinite`
            }}
          />
        ))}
      </div>

      {/* Sun Element */}
      <div
        ref={sunRef}
        className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full shadow-[0_0_40px_rgba(255,200,0,0.8)]"
        style={{
          background: 'radial-gradient(circle, #ffeb3b 0%, #ff9800 50%, #ff5722 100%)',
        }}
      >
        <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-orange-400 rounded-full animate-pulse" />
        <div className="absolute inset-4 bg-gradient-to-br from-yellow-100 to-orange-300 rounded-full" />
      </div>

      {/* Earth Element */}
      <div
        ref={earthRef}
        className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full overflow-hidden shadow-[0_0_25px_rgba(0,150,255,0.6)]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #4fc3f7 0%, #2196f3 40%, #0d47a1 100%)',
        }}
      >
        <div className="absolute top-2 left-3 w-4 h-3 bg-green-500 rounded opacity-80" />
        <div className="absolute bottom-2 right-2 w-3 h-4 bg-green-600 rounded opacity-70" />
        <div className="absolute top-1/2 left-1 w-2 h-2 bg-green-400 rounded" />
      </div>

      {/* Solar Flare Element */}
      <div
        ref={flareRef}
        className="absolute top-1/3 left-1/2 w-10 h-24 opacity-0"
      >
        <div className="w-full h-full bg-gradient-to-t from-transparent via-orange-400 to-yellow-300 rounded-full blur-sm" />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-red-400 to-yellow-400 rounded-full animate-pulse" />
      </div>

      {/* Aurora Element */}
      <div
        ref={auroraRef}
        className="absolute bottom-1/4 right-1/4 w-20 h-10 opacity-0"
      >
        <div className="w-full h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full blur-md animate-pulse" />
        <div className="absolute inset-1 w-full h-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 rounded-full blur-lg opacity-60" />
      </div>

      {/* Satellite Element */}
      <div
        ref={satelliteRef}
        className="absolute top-1/2 right-1/3 w-8 h-6 opacity-0"
      >
        <div className="w-6 h-4 bg-gray-300 rounded-sm mx-auto shadow-lg" />
        <div className="w-10 h-0.5 bg-yellow-400 absolute top-1 -left-1 shadow-glow" />
        <div className="w-10 h-0.5 bg-yellow-400 absolute top-2.5 -left-1 shadow-glow" />
        <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-0 left-2 animate-pulse" />
      </div>

      {/* Animated Text */}
      <div
        ref={textRef}
        className="absolute bottom-4 left-4 text-white text-sm font-semibold opacity-80 font-mono"
      />

      {/* Particles */}
      {createParticles()}

      {/* Category-specific visual elements */}
      {category === 'Solar Physics' && (
        <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent animate-pulse" />
      )}

      {category === 'Space Weather' && (
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse" />
          <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-pulse" style={{animationDelay: '1s'}} />
        </div>
      )}

      {category === 'Earth Effects' && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/8 to-blue-500/5 animate-pulse" />
      )}

      {category === 'Technology Impact' && (
        <div className="absolute inset-0">
          <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
        </div>
      )}

      {category === 'Future Predictions' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
      )}

      {/* Slide number indicator */}
      <div className="absolute top-2 right-2 text-white/60 text-xs font-mono bg-black/20 px-2 py-1 rounded">
        #{slideId.toString().padStart(2, '0')}
      </div>

      {/* Category indicator */}
      <div className="absolute top-2 left-2 text-white/50 text-xs font-mono bg-black/20 px-2 py-1 rounded">
        {category}
      </div>
    </div>
  );
};

export default GsapAnimation;