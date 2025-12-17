import React, { useEffect, useRef, useState } from 'react';

interface ServiceCard {
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
}

interface ServiceCategoriesProps {
  services?: ServiceCard[];
}

const defaultServices: ServiceCard[] = [
  {
    title: 'Farmacia',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80',
  },
  {
    title: 'Peluquería',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
  },
  {
    title: 'Cuidado de mascotas',
    imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&q=80',
  },
];

export default function ServiceCategories({ services = defaultServices }: ServiceCategoriesProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicecategories" ref={sectionRef} className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`relative group overflow-hidden rounded-lg shadow-lg ${visibleCards.has(index)
                ? 'animate-jump-in animate-duration-700'
                : 'opacity-0'
                }`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Image */}
              <div
                className="aspect-square bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                  {service.title}
                </h3>
                {service.description && (
                  <p className="text-sm md:text-base text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {service.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

