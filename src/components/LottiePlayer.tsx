import React, { useEffect, useRef } from 'react';

interface LottiePlayerProps {
  src: string; // remote JSON URL
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

// Lightweight Lottie loader without bundling dependency
// Dynamically imports lottie-web from CDN and mounts the animation
const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, loop = true, autoplay = true, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      try {
        // Dynamically load lottie-web from a CDN to avoid adding a hard dependency
        // Use a stable CDN path
        // @ts-ignore
        const lottie = await import('https://cdn.skypack.dev/lottie-web');
        if (isCancelled || !containerRef.current) return;

        // Fetch animation JSON
        const response = await fetch(src, { cache: 'force-cache' });
        const animationData = await response.json();

        // Destroy any previous instance
        if (animationRef.current) {
          try { animationRef.current.destroy(); } catch {}
          animationRef.current = null;
        }

        animationRef.current = lottie.default.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop,
          autoplay,
          animationData
        });
      } catch (e) {
        // Silent fail to keep UI resilient
        console.error('Lottie load error:', e);
      }
    };

    load();
    return () => {
      isCancelled = true;
      if (animationRef.current) {
        try { animationRef.current.destroy(); } catch {}
        animationRef.current = null;
      }
    };
  }, [src, loop, autoplay]);

  return (
    <div ref={containerRef} className={className} />
  );
};

export default LottiePlayer;

