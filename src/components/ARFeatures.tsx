import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ARSolarSystemProps {
  className?: string;
  enableAR?: boolean;
  onARError?: (error: string) => void;
}

interface PlanetARData {
  name: string;
  distance: number; // AU from sun
  size: number; // Relative size
  color: string;
  texture?: string;
  rotationSpeed: number;
  orbitSpeed: number;
}

const PLANET_DATA: PlanetARData[] = [
  { name: 'Mercury', distance: 0.39, size: 0.38, color: '#8C7853', rotationSpeed: 58.6, orbitSpeed: 88 },
  { name: 'Venus', distance: 0.72, size: 0.95, color: '#FFC649', rotationSpeed: 243, orbitSpeed: 225 },
  { name: 'Earth', distance: 1.0, size: 1.0, color: '#6B93D6', rotationSpeed: 1, orbitSpeed: 365 },
  { name: 'Mars', distance: 1.52, size: 0.53, color: '#C1440E', rotationSpeed: 1.03, orbitSpeed: 687 },
  { name: 'Jupiter', distance: 5.2, size: 11.2, color: '#D8CA9D', rotationSpeed: 0.41, orbitSpeed: 4333 },
  { name: 'Saturn', distance: 9.5, size: 9.4, color: '#FAD5A5', rotationSpeed: 0.45, orbitSpeed: 10759 },
  { name: 'Uranus', distance: 19.2, size: 4.0, color: '#4FD0E7', rotationSpeed: 0.72, orbitSpeed: 30687 },
  { name: 'Neptune', distance: 30.1, size: 3.9, color: '#4B70DD', rotationSpeed: 0.67, orbitSpeed: 60190 }
];

export const ARSolarSystem: React.FC<ARSolarSystemProps> = ({
  className = '',
  enableAR = true,
  onARError
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isARSupported, setIsARSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [error, setError] = useState<string>('');
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  // Check AR support
  useEffect(() => {
    const checkARSupport = async () => {
      // Check for WebXR support
      if ('xr' in navigator) {
        try {
          const supported = await (navigator as any).xr.isSessionSupported('immersive-ar');
          setIsARSupported(supported);
        } catch (err) {
          console.warn('WebXR AR support check failed:', err);
          setIsARSupported(false);
        }
      }

      // Check for camera access
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          setCameraPermission(true);
        } catch (err) {
          console.warn('Camera permission denied or unavailable:', err);
          setCameraPermission(false);
        }
      }
    };

    checkARSupport();
  }, []);

  // Initialize AR session
  const startARSession = async () => {
    if (!isARSupported) {
      const errorMsg = 'AR is not supported on this device/browser';
      setError(errorMsg);
      onARError?.(errorMsg);
      return;
    }

    if (cameraPermission === false) {
      const errorMsg = 'Camera permission is required for AR';
      setError(errorMsg);
      onARError?.(errorMsg);
      return;
    }

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;

      // Start camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      video.srcObject = stream;

      // Initialize WebXR session
      const xrSession = await (navigator as any).xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test']
      });

      setIsARActive(true);
      setError('');

      // Set up XR rendering
      const gl = canvas.getContext('webgl');
      if (!gl) {
        throw new Error('WebGL not supported');
      }

      // Basic AR rendering setup
      const renderer = new ARRenderer(gl, xrSession);
      renderer.start();

    } catch (err) {
      const errorMsg = `Failed to start AR session: ${err}`;
      setError(errorMsg);
      onARError?.(errorMsg);
    }
  };

  const stopARSession = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsARActive(false);
  };

  // Fallback 2D AR simulation
  const render2DARSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 20; // Scale to fit

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sun
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Draw planets
    PLANET_DATA.forEach((planet, index) => {
      const angle = (Date.now() * 0.001 / planet.orbitSpeed) * Math.PI * 2;
      const distance = planet.distance * scale;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      // Draw orbit
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, distance, 0, Math.PI * 2);
      ctx.stroke();

      // Draw planet
      ctx.fillStyle = planet.color;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(planet.size * 3, 2), 0, Math.PI * 2);
      ctx.fill();

      // Draw planet label
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(planet.name, x, y - planet.size * 4);
    });
  };

  useEffect(() => {
    if (!isARActive && !isARSupported) {
      // Start 2D simulation as fallback
      const interval = setInterval(render2DARSimulation, 50);
      return () => clearInterval(interval);
    }
  }, [isARActive, isARSupported]);

  return (
    <div className={`relative ${className}`}>
      {/* AR Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-full bg-black rounded-lg"
      />

      {/* Camera Video (for AR) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover rounded-lg ${
          isARActive ? 'block' : 'hidden'
        }`}
      />

      {/* AR Controls */}
      <div className="absolute top-4 left-4 space-y-2">
        {enableAR && (
          <>
            {!isARActive ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startARSession}
                disabled={!isARSupported && cameraPermission === false}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isARSupported ? '🌟 Start AR Experience' : '📱 AR Not Supported'}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopARSession}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
              >
                🛑 Stop AR
              </motion.button>
            )}
          </>
        )}

        {/* Status Indicator */}
        <div className="text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
          {isARActive ? 'AR Active' : isARSupported ? 'AR Ready' : '2D Mode'}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg max-w-xs"
        >
          <div className="text-sm font-medium">AR Error</div>
          <div className="text-xs mt-1">{error}</div>
        </motion.div>
      )}

      {/* AR Instructions */}
      {!isARActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg"
        >
          <h3 className="font-semibold mb-2">🌌 Solar System AR</h3>
          <p className="text-sm">
            {isARSupported
              ? 'Point your camera at a flat surface and tap "Start AR Experience" to see the solar system in your environment!'
              : 'Experience our solar system in 2D mode. For full AR, try on a compatible device with AR support.'
            }
          </p>
        </motion.div>
      )}

      {/* Planet Info Panel */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        className="absolute top-4 right-4 bg-white bg-opacity-90 p-4 rounded-lg max-w-xs"
      >
        <h4 className="font-semibold mb-2">Planets in View</h4>
        <div className="space-y-1 text-sm">
          {PLANET_DATA.slice(0, 4).map(planet => (
            <div key={planet.name} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: planet.color }}
              />
              <span>{planet.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// WebXR AR Renderer class
class ARRenderer {
  private gl: WebGLRenderingContext;
  private xrSession: any;
  private xrRefSpace: any;
  private hitTestSource: any;

  constructor(gl: WebGLRenderingContext, xrSession: any) {
    this.gl = gl;
    this.xrSession = xrSession;
  }

  async start() {
    try {
      // Set up reference space
      this.xrRefSpace = await this.xrSession.requestReferenceSpace('local');

      // Set up hit test
      this.hitTestSource = await this.xrSession.requestHitTestSource({
        space: this.xrRefSpace
      });

      // Start rendering loop
      this.xrSession.requestAnimationFrame(this.render.bind(this));
    } catch (error) {
      console.error('Failed to start AR renderer:', error);
    }
  }

  private render(time: number, frame: any) {
    const session = frame.session;
    const pose = frame.getViewerPose(this.xrRefSpace);

    if (pose) {
      const glLayer = session.renderState.baseLayer;

      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, glLayer.framebuffer);

      // Clear
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

      // Render AR content here
      // This would include 3D models of planets positioned in AR space

      // Continue rendering
      session.requestAnimationFrame(this.render.bind(this));
    }
  }
}

// AR Marker Detection (for image-based AR)
export const ARMarkerDetection: React.FC<{
  markerImage: string;
  onMarkerFound: (position: { x: number; y: number; z: number }) => void;
  className?: string;
}> = ({ markerImage, onMarkerFound, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const startDetection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });

        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        video.srcObject = stream;
        setIsDetecting(true);

        // Simple marker detection (in a real implementation, you'd use a library like AR.js)
        const detectMarker = () => {
          if (!isDetecting) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Mock marker detection - in reality, this would analyze the image
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          // ... marker detection logic ...

          requestAnimationFrame(detectMarker);
        };

        detectMarker();
      } catch (error) {
        console.error('Marker detection failed:', error);
      }
    };

    startDetection();

    return () => {
      setIsDetecting(false);
      const video = videoRef.current;
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [markerImage, isDetecting]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'none' }}
      />
      {isDetecting && (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded text-sm">
          🔍 Detecting markers...
        </div>
      )}
    </div>
  );
};

// AR Solar Flare Visualization
export const ARSolarFlare: React.FC<{
  intensity: number;
  className?: string;
}> = ({ intensity, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw solar flare effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );

      gradient.addColorStop(0, `rgba(255, ${100 + intensity * 155}, 0, ${0.3 + intensity * 0.7})`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add particle effects
      for (let i = 0; i < intensity * 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3;

        ctx.fillStyle = `rgba(255, 200, 0, ${Math.random() * 0.8})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className={`w-full h-full ${className}`}
    />
  );
};

export default {
  ARSolarSystem,
  ARMarkerDetection,
  ARSolarFlare
};