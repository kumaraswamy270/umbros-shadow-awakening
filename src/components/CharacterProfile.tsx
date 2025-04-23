
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CharacterProfileProps {
  name: string;
  description: string;
  imageSrc: string;
  type: 'protagonist' | 'spirit' | 'elder';
  className?: string;
}

const CharacterProfile = ({
  name,
  description,
  imageSrc,
  type,
  className,
}: CharacterProfileProps) => {
  // Different styling based on character type
  const getCardStyle = () => {
    switch (type) {
      case 'protagonist':
        return "border-umbros-flame";
      case 'spirit':
        return "border-umbros-accent phoenix-aura";
      case 'elder':
        return "border-gray-600";
      default:
        return "";
    }
  };

  const getNameStyle = () => {
    switch (type) {
      case 'protagonist':
        return "text-white shadow-text";
      case 'spirit':
        return "text-umbros-flame shadow-text";
      case 'elder':
        return "text-gray-300";
      default:
        return "text-white";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "relative flex flex-col bg-umbros-dark border-2 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300",
        getCardStyle(),
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <h3 className={cn("font-bold text-xl mb-2", getNameStyle())}>
          {name}
        </h3>
        <p className="text-gray-300 text-sm">
          {description}
        </p>
      </div>
      
      {type === 'spirit' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-umbros-flame/20 to-transparent opacity-70" />
          <div className="absolute inset-0 animate-pulse-shadow rounded-xl" />
        </div>
      )}
    </motion.div>
  );
};

export default CharacterProfile;
