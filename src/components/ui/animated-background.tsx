import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface Planet {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  orbitRadius: number;
  angle: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    };

    // Initialize planets
    const initPlanets = () => {
      planetsRef.current = [
        {
          x: canvas.width * 0.1,
          y: canvas.height * 0.2,
          size: 8,
          speed: 0.001,
          color: '#ff6b6b',
          orbitRadius: 50,
          angle: 0
        },
        {
          x: canvas.width * 0.8,
          y: canvas.height * 0.7,
          size: 12,
          speed: 0.0008,
          color: '#4ecdc4',
          orbitRadius: 80,
          angle: Math.PI
        },
        {
          x: canvas.width * 0.3,
          y: canvas.height * 0.8,
          size: 6,
          speed: 0.0015,
          color: '#45b7d1',
          orbitRadius: 35,
          angle: Math.PI / 2
        },
        {
          x: canvas.width * 0.7,
          y: canvas.height * 0.3,
          size: 10,
          speed: 0.0012,
          color: '#f9ca24',
          orbitRadius: 60,
          angle: Math.PI * 1.5
        }
      ];
    };

    initStars();
    initPlanets();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and animate stars
      starsRef.current.forEach((star) => {
        // Twinkling effect
        star.opacity = Math.sin(Date.now() * 0.001 + star.x * 0.01) * 0.3 + 0.7;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Move stars slowly
        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }
      });

      // Draw and animate planets
      planetsRef.current.forEach((planet) => {
        planet.angle += planet.speed;
        
        const centerX = planet.x + Math.cos(planet.angle) * planet.orbitRadius;
        const centerY = planet.y + Math.sin(planet.angle) * planet.orbitRadius;

        // Draw planet glow
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, planet.size * 2);
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(0.5, planet.color + '40');
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw planet
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.size, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // Draw subtle orbit path
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.orbitRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw shooting stars occasionally
      if (Math.random() < 0.003) {
        const shootingStarX = Math.random() * canvas.width;
        const shootingStarY = Math.random() * canvas.height * 0.5;
        
        ctx.beginPath();
        ctx.moveTo(shootingStarX, shootingStarY);
        ctx.lineTo(shootingStarX + 50, shootingStarY + 30);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Tail effect
        ctx.beginPath();
        ctx.moveTo(shootingStarX, shootingStarY);
        ctx.lineTo(shootingStarX + 30, shootingStarY + 18);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)' }}
    />
  );
};

export default AnimatedBackground;