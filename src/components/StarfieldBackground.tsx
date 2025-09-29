import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface StarfieldBackgroundProps {
  starCount?: number;
  className?: string;
}

const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({ 
  starCount = 200,
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize stars when size changes
      initStars();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize stars
    function initStars() {
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.05 + 0.01,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      starsRef.current.forEach(star => {
        // Twinkle effect
        const time = Date.now() * star.twinkleSpeed;
        const twinkle = (Math.sin(time + star.twinklePhase) + 1) * 0.5;
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);
        
        // Move star
        star.y += star.speed;
        
        // Reset if star moves off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Occasional shooting star
        if (Math.random() < 0.0001) {
          const shootingStarX = Math.random() * canvas.width;
          const shootingStarLength = Math.random() * 50 + 30;
          const angle = Math.random() * Math.PI / 4 + Math.PI / 4; // 45-90 degrees
          
          const gradient = ctx.createLinearGradient(
            shootingStarX, 0, 
            shootingStarX - Math.cos(angle) * shootingStarLength, 
            Math.sin(angle) * shootingStarLength
          );
          
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(shootingStarX, 0);
          ctx.lineTo(
            shootingStarX - Math.cos(angle) * shootingStarLength, 
            Math.sin(angle) * shootingStarLength
          );
          ctx.stroke();
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [starCount]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default StarfieldBackground;