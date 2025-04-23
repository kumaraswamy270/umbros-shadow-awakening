
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FlameEffectProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  style?: React.CSSProperties;
}

const FlameEffect = ({
  intensity = 'medium',
  className,
  style
}: FlameEffectProps) => {
  // Different sizes for flames based on intensity
  const getFlamesArray = () => {
    switch (intensity) {
      case 'low':
        return new Array(5).fill(null);
      case 'medium':
        return new Array(8).fill(null);
      case 'high':
        return new Array(12).fill(null);
      default:
        return new Array(8).fill(null);
    }
  };
  
  const flames = getFlamesArray();
  
  return (
    <div 
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-10",
        className
      )}
      style={style}
    >
      {flames.map((_, index) => {
        // Random positioning for flames
        const positionX = Math.random() * 100; // random percentage across width
        const scale = 0.5 + Math.random() * 1.5; // random size
        const duration = 2 + Math.random() * 3; // random animation duration
        const delay = Math.random() * 2; // random delay
        
        return (
          <motion.div
            key={index}
            className="absolute bottom-0 w-16 h-24"
            style={{ left: `${positionX}%` }}
            initial={{ opacity: 0, y: 50, scale }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [-20, -100],
              scale: [scale, scale * 1.2, scale * 0.8]
            }}
            transition={{
              duration,
              delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: Math.random(),
            }}
          >
            <div className="w-full h-full bg-umbros-flame blur-md rounded-full opacity-60" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FlameEffect;
