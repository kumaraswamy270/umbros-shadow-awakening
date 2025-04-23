
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSceneProps {
  title: string;
  description: string;
  backgroundImage: string;
  children?: React.ReactNode;
  className?: string;
}

const AnimatedScene = ({
  title,
  description,
  backgroundImage,
  children,
  className,
}: AnimatedSceneProps) => {
  return (
    <div 
      className={cn(
        "relative min-h-[500px] w-full rounded-xl overflow-hidden mb-8",
        className
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-umbros-dark via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-2 text-white shadow-text"
        >
          {title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-100 mb-6 max-w-2xl"
        >
          {description}
        </motion.p>
        
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnimatedScene;
