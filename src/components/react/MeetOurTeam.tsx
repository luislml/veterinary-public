import React, { useEffect, useRef, useState } from 'react';

interface MeetOurTeamProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export default function MeetOurTeam({
  title = 'Nuestro equipo.',
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  imageUrl = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80'
}: MeetOurTeamProps) {
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
    <section id="team" ref={sectionRef} className="bg-[var(--color-primary)] text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className={`order-2 lg:order-1 ${isVisible ? 'animate-fade-right animate-duration-700' : 'opacity-0'
            }`}>
            <div
              className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(http://localhost:8000/${imageUrl})` }}
            ></div>
          </div>

          {/* Content */}
          <div className={`order-1 lg:order-2 ${isVisible ? 'animate-fade-left animate-duration-700 animate-delay-200' : 'opacity-0'
            }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">{title}</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

