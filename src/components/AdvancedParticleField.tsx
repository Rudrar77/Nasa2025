import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'flare' | 'wind' | 'aurora' | 'cosmic';
}

interface AdvancedParticleFieldProps {
  density?: number;
  colors?: string[];
  speed?: number;
  size?: number;
  type?: 'flare' | 'wind' | 'aurora' | 'cosmic';
  interactive?: boolean;
  className?: string;
}

const AdvancedParticleField: React.FC<AdvancedParticleFieldProps> = ({
  density = 50,
  colors = ['#FFD700', '#FFA500', '#FF4500', '#FFFFFF'],
  speed = 1,
  size = 2,
  type = 'cosmic',
  interactive = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const animationRef = useRef<number>();

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    particlesRef.current = [];

    for (let i = 0; i < density; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        life: Math.random() * 100,
        maxLife: 100,
        size: Math.random() * size + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        type
      });
    }
  };

  // Update particle behavior based on type
  const updateParticle = (particle: Particle, width: number, height: number) => {
    // Mouse interaction
    if (interactive) {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRef.current.radius) {
        const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
        particle.vx += (dx / distance) * force * 0.5;
        particle.vy += (dy / distance) * force * 0.5;
      }
    }

    // Type-specific behavior
    switch (particle.type) {
      case 'flare':
        // Solar flare particles - erupt outward
        particle.vx += Math.sin(particle.life * 0.1) * 0.1;
        particle.vy += Math.cos(particle.life * 0.1) * 0.1;
        break;

      case 'wind':
        // Solar wind particles - flow in one direction
        particle.vx += 0.1 * speed;
        if (particle.x > width) particle.x = 0;
        break;

      case 'aurora':
        // Aurora particles - wave-like motion
        particle.vy += Math.sin(particle.x * 0.01 + particle.life * 0.05) * 0.2;
        break;

      case 'cosmic':
        // Cosmic particles - random movement with gravity
        particle.vy += 0.01; // slight gravity
        break;
    }

    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Boundary conditions
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;

    // Update life
    particle.life++;
    if (particle.life > particle.maxLife) {
      particle.life = 0;
      // Respawn particle
      if (type === 'flare') {
        particle.x = width / 2 + (Math.random() - 0.5) * 100;
        particle.y = height / 2 + (Math.random() - 0.5) * 100;
      } else {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      }
    }

    // Damping
    particle.vx *= 0.99;
    particle.vy *= 0.99;
  };

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    particlesRef.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Draw particle
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Add glow effect for certain types
      if (type === 'flare' || type === 'aurora') {
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Update and draw particles
    particlesRef.current.forEach(particle =>
      updateParticle(particle, dimensions.width, dimensions.height)
    );
    drawParticles(ctx, dimensions.width, dimensions.height);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      setDimensions({
        width: rect.width || 800,
        height: rect.height || 600
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize and start animation
  useEffect(() => {
    initParticles(dimensions.width, dimensions.height);
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, density, speed, size, type]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={`w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

export default AdvancedParticleField;