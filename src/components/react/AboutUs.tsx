import React, { useEffect, useRef, useState } from 'react';

interface AboutUsProps {
  title?: string;
  description?: string;
}

export default function AboutUs({
  title = 'Lorem ipsum dolor sit amet consectetur elit.',
  description = 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
}: AboutUsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className='relative'
    >
      <div className="pt-12 sm:pt-16 md:pt-20 bg-[var(--color-primary)] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 px-2 ${
            isVisible ? 'animate-fade-up animate-duration-700' : 'opacity-0'
          }`}>{title}</h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed px-2 ${
            isVisible ? 'animate-fade-up animate-duration-700 animate-delay-200' : 'opacity-0'
          }`}>
            {description}
          </p>

          {/* Decorative Icon */}
          <div className={`flex justify-center mt-6 md:mt-8 ${
            isVisible ? 'animate-fade animate-duration-1000 animate-delay-600' : 'opacity-0'
          }`}>
            <svg className="w-14 h-14 md:w-18 md:h-18 text-white opacity-50" fill='currentColor' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>paw</title><path d="M8.35,3C9.53,2.83 10.78,4.12 11.14,5.9C11.5,7.67 10.85,9.25 9.67,9.43C8.5,9.61 7.24,8.32 6.87,6.54C6.5,4.77 7.17,3.19 8.35,3M15.5,3C16.69,3.19 17.35,4.77 17,6.54C16.62,8.32 15.37,9.61 14.19,9.43C13,9.25 12.35,7.67 12.72,5.9C13.08,4.12 14.33,2.83 15.5,3M3,7.6C4.14,7.11 5.69,8 6.5,9.55C7.26,11.13 7,12.79 5.87,13.28C4.74,13.77 3.2,12.89 2.41,11.32C1.62,9.75 1.9,8.08 3,7.6M21,7.6C22.1,8.08 22.38,9.75 21.59,11.32C20.8,12.89 19.26,13.77 18.13,13.28C17,12.79 16.74,11.13 17.5,9.55C18.31,8 19.86,7.11 21,7.6M19.33,18.38C19.37,19.32 18.65,20.36 17.79,20.75C16,21.57 13.88,19.87 11.89,19.87C9.9,19.87 7.76,21.64 6,20.75C5,20.26 4.31,18.96 4.44,17.88C4.62,16.39 6.41,15.59 7.47,14.5C8.88,13.09 9.88,10.44 11.89,10.44C13.89,10.44 14.95,13.05 16.3,14.5C17.41,15.72 19.26,16.75 19.33,18.38Z" /></svg>
          </div>
        </div>
      </div>
      <svg className='w-full fill-[var(--color-primary)] text-[var(--color-primary)]' preserveAspectRatio="none" viewBox="0 0 1600 99" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2049_1262)">
          <path d="M1600 28.6129L1600 -1.05057L-6.34655e-05 -1.05043L-6.08722e-05 28.613C529.361 120.67 1070.64 120.67 1600 28.6129V28.6129Z" fill="currentColor"></path>
        </g>
        <defs>
          <clipPath id="clip0_2049_1262">
            <rect width="1600" height="98.7175" fill="white" transform="translate(1600 98.7175) rotate(180)"></rect>
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}

