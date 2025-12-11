import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function Hero({ 
  title = 'loren ipsum dolor sit amet consectetur elit.',
  subtitle = 'loren ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
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
        <div className="absolute inset-0 bg-black/40"></div>
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

      <svg className='w-full absolute left-0 -bottom-1 fill-white' xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 1600 105" > <path d="M1538.3,17.5c-30.9,9.3-42.9,9.2-52.9,17.3c-10,8.1-71.2,8.2-93.3,11.1c-22.1,2.8-8.8-0.1-45.6,8.1 c-36.8,8.3-123.2,13.3-132.1,13.3c-8.8,0-60.1-6.3-99.9-11.4c-39.8-5.1-36.1-1.2-62.2-3.2c-22.7-5.2-41-10.2-47.7-13.9 c-20.9-11.5-99.4-15.9-99.4-15.9c-20.2,0.9-28.2,8.7-52.6,11.4c-17.2,1.9-38.3,0.2-56.3,2.8c-31,4.5-39.8,16.5-67.6,18.5 c-30.2-3.5-47.1-9.8-75.1-11.4c-37.1-2.1-78.5,3.6-120.1,0c-6.8-0.6-20.5-3.6-30.1-5.7c-9.2-2-23.5-4-30-5.7 c-22.8-6-35.1-18.1-60.1-22.8c-6.4-1.2-25.7-1.8-41.3-4.3c-18.9-3-25.2-5.5-37.6-5.7C294.1-0.6,256.9,24.6,218,28.6 c-20.8,2.1-38.3-1-60.1,1.4c-26.3,2.9-44.2,13.4-71.4,17.1c-13.6,1.9-30.4,1.2-45.1,2.9C28.1,51.4,13.6,54.7,0,56.6V104h1600V27.8 C1600,27.8,1569.3,8.1,1538.3,17.5z"/></svg>
    </section>
  );
}

