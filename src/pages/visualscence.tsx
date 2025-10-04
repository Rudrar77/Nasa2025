import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VisualSceneProps {
  scene: string;
  emotion: string;
  slideId: number;
}

const VisualScene: React.FC<VisualSceneProps> = ({ scene, emotion, slideId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw scene based on type
    drawScene(ctx, scene, emotion, canvas.width, canvas.height);
  }, [scene, emotion, slideId]);

  const drawScene = (ctx: CanvasRenderingContext2D, sceneType: string, emotion: string, width: number, height: number) => {
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    
    switch (sceneType) {
      case 'morning-routine':
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#FFE4B5');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        drawMayaCharacter(ctx, width, height, emotion);
        drawApartmentItems(ctx, width, height);
        break;

      case 'driving':
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#90EE90');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        drawVan(ctx, width, height);
        drawRoad(ctx, width, height);
        drawGPSScreen(ctx, width, height, emotion === 'confused');
        break;

      case 'aurora':
        gradient.addColorStop(0, '#000011');
        gradient.addColorStop(0.5, '#001122');
        gradient.addColorStop(1, '#002233');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        drawAurora(ctx, width, height);
        drawStars(ctx, width, height);
        break;

      case 'sun-flare':
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        drawSun(ctx, width, height);
        drawSolarFlare(ctx, width, height);
        drawParticles(ctx, width, height);
        break;

      case 'community':
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#F0F8FF');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        drawCommunityScene(ctx, width, height);
        break;

      default:
        gradient.addColorStop(0, '#4a5568');
        gradient.addColorStop(1, '#2d3748');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }
  };

  const drawMayaCharacter = (ctx: CanvasRenderingContext2D, width: number, height: number, emotion: string) => {
    // Draw Maya as a simple figure
    const centerX = width * 0.3;
    const centerY = height * 0.6;

    // Head
    ctx.fillStyle = '#FDBCB4';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 40, 20, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 50, 25, 0, Math.PI);
    ctx.fill();

    // Body
    ctx.fillStyle = '#4169E1';
    ctx.fillRect(centerX - 15, centerY - 20, 30, 60);

    // Expression based on emotion
    ctx.fillStyle = '#000';
    if (emotion === 'confused') {
      // Confused expression
      ctx.fillRect(centerX - 5, centerY - 45, 2, 2);
      ctx.fillRect(centerX + 3, centerY - 45, 2, 2);
      ctx.beginPath();
      ctx.arc(centerX, centerY - 35, 3, Math.PI, Math.PI * 2);
      ctx.stroke();
    } else if (emotion === 'amazed') {
      // Amazed expression
      ctx.beginPath();
      ctx.arc(centerX - 5, centerY - 45, 2, 0, Math.PI * 2);
      ctx.arc(centerX + 5, centerY - 45, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX, centerY - 35, 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const drawVan = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const vanX = width * 0.6;
    const vanY = height * 0.7;

    // Van body
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(vanX - 40, vanY - 30, 80, 40);

    // Windows
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(vanX - 35, vanY - 25, 25, 15);

    // Wheels
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(vanX - 20, vanY + 15, 8, 0, Math.PI * 2);
    ctx.arc(vanX + 20, vanY + 15, 8, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawRoad = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Road
    ctx.fillStyle = '#696969';
    ctx.fillRect(0, height * 0.8, width, height * 0.2);

    // Road lines
    ctx.fillStyle = '#FFFF00';
    for (let i = 0; i < width; i += 40) {
      ctx.fillRect(i, height * 0.89, 20, 3);
    }
  };

  const drawGPSScreen = (ctx: CanvasRenderingContext2D, width: number, height: number, isGlitching: boolean) => {
    const screenX = width * 0.1;
    const screenY = height * 0.2;

    // GPS device
    ctx.fillStyle = '#000';
    ctx.fillRect(screenX, screenY, 100, 80);

    // Screen
    ctx.fillStyle = isGlitching ? '#FF0000' : '#00FF00';
    ctx.fillRect(screenX + 5, screenY + 5, 90, 60);

    if (isGlitching) {
      // Glitch effect
      ctx.fillStyle = '#FF0000';
      ctx.fillText('ERROR', screenX + 25, screenY + 35);
      ctx.fillText('GPS LOST', screenX + 15, screenY + 50);
    } else {
      // Normal GPS
      ctx.fillStyle = '#000';
      ctx.fillText('GPS OK', screenX + 25, screenY + 35);
    }
  };

  const drawSun = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const sunX = width * 0.2;
    const sunY = height * 0.3;

    // Sun corona
    const gradient = ctx.createRadialGradient(sunX, sunY, 20, sunX, sunY, 60);
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.5, '#FFA500');
    gradient.addColorStop(1, '#FF4500');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 60, 0, Math.PI * 2);
    ctx.fill();

    // Sun core
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 30, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawSolarFlare = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const sunX = width * 0.2;
    const sunY = height * 0.3;

    // Flare
    ctx.strokeStyle = '#FF6600';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(sunX + 30, sunY);
    ctx.quadraticCurveTo(sunX + 100, sunY - 50, sunX + 150, sunY - 20);
    ctx.stroke();

    // Flare glow
    ctx.strokeStyle = '#FFAA00';
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#FFD700';
    
    // Animated particles
    for (let i = 0; i < 20; i++) {
      const x = (width * 0.3) + (i * 15) + Math.sin(Date.now() * 0.01 + i) * 5;
      const y = (height * 0.3) + Math.sin(Date.now() * 0.02 + i) * 10;
      
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawAurora = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Aurora curtains
    const gradient1 = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    gradient1.addColorStop(0, 'rgba(0, 255, 100, 0.8)');
    gradient1.addColorStop(0.5, 'rgba(0, 255, 150, 0.6)');
    gradient1.addColorStop(1, 'rgba(0, 255, 100, 0.2)');

    ctx.fillStyle = gradient1;
    ctx.beginPath();
    ctx.moveTo(width * 0.2, 0);
    ctx.quadraticCurveTo(width * 0.3, height * 0.3, width * 0.25, height * 0.7);
    ctx.quadraticCurveTo(width * 0.35, height * 0.3, width * 0.4, 0);
    ctx.fill();

    // Second aurora curtain
    const gradient2 = ctx.createLinearGradient(0, 0, 0, height * 0.8);
    gradient2.addColorStop(0, 'rgba(255, 0, 150, 0.7)');
    gradient2.addColorStop(0.5, 'rgba(255, 100, 200, 0.5)');
    gradient2.addColorStop(1, 'rgba(255, 0, 150, 0.1)');

    ctx.fillStyle = gradient2;
    ctx.beginPath();
    ctx.moveTo(width * 0.6, 0);
    ctx.quadraticCurveTo(width * 0.7, height * 0.4, width * 0.65, height * 0.8);
    ctx.quadraticCurveTo(width * 0.75, height * 0.4, width * 0.8, 0);
    ctx.fill();
  };

  const drawStars = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#FFFFFF';
    
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.6;
      const size = Math.random() * 2;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawCommunityScene = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Buildings
    ctx.fillStyle = '#708090';
    ctx.fillRect(width * 0.1, height * 0.4, 60, 120);
    ctx.fillRect(width * 0.3, height * 0.3, 80, 140);
    ctx.fillRect(width * 0.6, height * 0.5, 70, 100);

    // Windows
    ctx.fillStyle = '#FFD700';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        ctx.fillRect(width * 0.1 + 10 + i * 15, height * 0.4 + 20 + j * 20, 8, 12);
        ctx.fillRect(width * 0.3 + 15 + i * 20, height * 0.3 + 20 + j * 25, 10, 15);
      }
    }

    // People
    drawSimplePerson(ctx, width * 0.2, height * 0.8);
    drawSimplePerson(ctx, width * 0.5, height * 0.8);
    drawSimplePerson(ctx, width * 0.7, height * 0.8);
  };

  const drawSimplePerson = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Head
    ctx.fillStyle = '#FDBCB4';
    ctx.beginPath();
    ctx.arc(x, y - 15, 8, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = '#4169E1';
    ctx.fillRect(x - 5, y - 7, 10, 25);

    // Arms
    ctx.strokeStyle = '#FDBCB4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - 5, y - 2);
    ctx.lineTo(x - 12, y + 8);
    ctx.moveTo(x + 5, y - 2);
    ctx.lineTo(x + 12, y + 8);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(x - 2, y + 18);
    ctx.lineTo(x - 8, y + 35);
    ctx.moveTo(x + 2, y + 18);
    ctx.lineTo(x + 8, y + 35);
    ctx.stroke();
  };

  const drawApartmentItems = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Coffee mug
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(width * 0.6, height * 0.7, 15, 20);
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width * 0.6 + 18, height * 0.75, 3, 0, Math.PI);
    ctx.stroke();

    // Phone
    ctx.fillStyle = '#000';
    ctx.fillRect(width * 0.7, height * 0.6, 25, 40);
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(width * 0.7 + 2, height * 0.6 + 2, 21, 36);
  };

  return (
    <div className="w-full h-full relative">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Overlay animations */}
      {scene === 'aurora' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ 
            background: [
              'radial-gradient(circle at 30% 20%, rgba(0,255,100,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(255,0,150,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 60%, rgba(0,100,255,0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}

      {scene === 'phone-glitch' && (
        <motion.div
          className="absolute inset-0 pointer-events-none bg-red-500/20"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </div>
  );
};

export default VisualScene;