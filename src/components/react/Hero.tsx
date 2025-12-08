import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function Hero({ 
  title = 'AWARD-WINNING VETERINARY CARE',
  subtitle = '2023 Nextdoor Neighborhood Faves',
  imageUrl = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920&q=80'
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg leading-tight ${
          isVisible ? 'animate-fade-down animate-duration-1000' : 'opacity-0'
        }`}>
          {title}
        </h1>
        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-md px-2 ${
          isVisible ? 'animate-fade-up animate-duration-1000 animate-delay-300' : 'opacity-0'
        }`}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}

