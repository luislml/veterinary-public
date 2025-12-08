import React, { useEffect, useRef, useState } from 'react';

interface Affiliation {
  name: string;
  logo?: string;
  description?: string;
}

interface AffiliationsProps {
  affiliations?: Affiliation[];
}

const defaultAffiliations: Affiliation[] = [
  { name: 'AVMA', description: 'Our Mission: Our Profession' },
  { name: '25 YEARS', description: 'Experience' },
  { name: 'NCVMA', description: 'North Carolina Veterinary Medical Association' },
];

export default function Affiliations({ affiliations = defaultAffiliations }: AffiliationsProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-[var(--color-accent)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {affiliations.map((affiliation, index) => (
            <div 
              key={index} 
              data-index={index}
              className={`text-center w-full sm:w-auto ${
                visibleItems.has(index) 
                  ? 'animate-jump-in animate-duration-700' 
                  : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-lg mx-auto">
                <span className="text-[var(--color-primary)] font-bold text-sm sm:text-base md:text-lg text-center px-3 md:px-4">
                  {affiliation.name}
                </span>
              </div>
              {affiliation.description && (
                <p className="text-white text-xs sm:text-sm font-medium px-2">{affiliation.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

