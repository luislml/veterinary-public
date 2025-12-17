import React, { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../api';

interface Affiliation {
  name: string;
  logoUrl: string;
}

interface AffiliationsProps {
  affiliations?: Affiliation[];
}

const defaultAffiliations: Affiliation[] = [
  {
    name: 'Brand 1',
    logoUrl: `${API_BASE_URL}/storage/files/1.jpg`
  },
  {
    name: 'Brand 2',
    logoUrl: `${API_BASE_URL}/storage/files/2.jpg`
  },
  {
    name: 'Brand 3',
    logoUrl: `${API_BASE_URL}/storage/files/3.jpg`
  },
  {
    name: 'Brand 4',
    logoUrl: `${API_BASE_URL}/storage/files/4.jpg`
  },
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
              className={`w-full sm:w-auto ${visibleItems.has(index)
                ? 'animate-jump-in animate-duration-700'
                : 'opacity-0'
                }`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white rounded-lg flex items-center justify-center shadow-lg mx-auto p-4 hover:scale-105 transition-transform duration-300">
                <img
                  src={affiliation.logoUrl}
                  alt={affiliation.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

