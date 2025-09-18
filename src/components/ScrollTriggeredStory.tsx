import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, ReactNode, useEffect } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate';
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ScrollSection = ({ 
  children, 
  className = '', 
  animationType = 'fade',
  direction = 'up'
}: ScrollSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slide: {
      hidden: { 
        opacity: 0, 
        x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
        y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0
      },
      visible: { opacity: 1, x: 0, y: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10 },
      visible: { opacity: 1, rotate: 0 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[animationType]}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxElement = ({ children, speed = 0.5, className = '' }: ParallaxElementProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedCounterProps {
  from: number;
  to: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({ from, to, suffix = '', className = '' }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    } else {
      motionValue.set(from);
    }
  }, [isInView, from, to, motionValue]);

  return (
    <motion.span ref={ref} className={className}>
      <motion.span>{Math.round(springValue.get())}</motion.span>
      {suffix}
    </motion.span>
  );
};

export { ScrollSection, ParallaxElement, AnimatedCounter };