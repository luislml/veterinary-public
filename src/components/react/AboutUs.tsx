import React, { useEffect, useRef, useState } from 'react';

interface AboutUsProps {
  title?: string;
  description?: string;
  phoneNumber?: string;
}

export default function AboutUs({
  title = 'CARING FOR GREENSBORO PETS SINCE 1980',
  description = 'At Southwoods Animal Hospital, we are dedicated to providing exceptional veterinary care for your beloved pets. Our experienced team of veterinarians and staff are committed to ensuring the health and well-being of every animal that comes through our doors. We offer comprehensive services including wellness exams, emergency care, surgery, dental care, and more.',
  phoneNumber = '(336) 275-7266'
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
      className="py-12 sm:py-16 md:py-20 bg-[var(--color-primary)] text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 px-2 ${
          isVisible ? 'animate-fade-up animate-duration-700' : 'opacity-0'
        }`}>{title}</h2>
        <p className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed px-2 ${
          isVisible ? 'animate-fade-up animate-duration-700 animate-delay-200' : 'opacity-0'
        }`}>
          {description}
        </p>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 ${
          isVisible ? 'animate-fade-up animate-duration-700 animate-delay-400' : 'opacity-0'
        }`}>
          <button className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-colors font-semibold text-sm md:text-base">
            BOOK APPOINTMENT
          </button>
          <a
            href={`tel:${phoneNumber.replace(/\D/g, '')}`}
            className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-colors font-semibold text-sm md:text-base text-center"
          >
            CALL {phoneNumber}
          </a>
          <button className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-colors font-semibold text-sm md:text-base">
            PAYMENT PLANS
          </button>
        </div>

        {/* Decorative Icon */}
        <div className={`flex justify-center mt-6 md:mt-8 ${
          isVisible ? 'animate-fade animate-duration-1000 animate-delay-600' : 'opacity-0'
        }`}>
          <svg className="w-10 h-10 md:w-12 md:h-12 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

