import React, { useEffect, useRef, useState } from 'react';

interface Service {
  id?: number;             // opcional si el backend no lo entrega
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

interface ServicesProps {
  title?: string;
  description?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  { id: 1, title: 'Odontología', description: '', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80' },
  { id: 2, title: 'Exámenes de bienestar', description: '', imageUrl: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&q=80' },
  { id: 3, title: 'Farmacia', description: '', imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80' },
  { id: 4, title: 'Alergias en mascotas', description: '', imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80' },
  { id: 5, title: 'Gestión del dolor', description: '', imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80' },
  { id: 6, title: 'Servicios de laboratorio', description: '', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80' },
];

export default function Services({
  title = 'Lorem ipsum dolor sit amet consectetur elit.',
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  services = defaultServices
}: ServicesProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if ((entry.target as HTMLElement).hasAttribute('data-header')) {
              setHeaderVisible(true);
            } else {
              const indexAttr = entry.target.getAttribute('data-index') || '0';
              const index = parseInt(indexAttr, 10);
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const header = sectionRef.current?.querySelector('[data-header]');
    const cards = sectionRef.current?.querySelectorAll('[data-index]');

    header && observer.observe(header);
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          data-header
          className={`text-center mb-8 md:mb-12 ${headerVisible ? 'animate-fade-down animate-duration-700' : 'opacity-0'}`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4 md:mb-6 px-2">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-2">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {services.map((service, index) => {
            const key = service.id ?? index;
            const bg = service.imageUrl ? `url(${service.imageUrl})` : undefined;

            return (
              <div
                key={key}
                data-index={index}
                className={`relative group ${visibleItems.has(index) ? 'animate-jump-in animate-duration-700' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-lg">
                  {/* Image como background si existe, sino fallback con un div neutro */}
                  <div
                    className="aspect-16/9 bg-cover bg-center transition-transform duration-300 group-hover:scale-110 rounded-3xl shadow-lg"
                    style={bg ? { backgroundImage: bg } : { backgroundColor: '#e5e7eb' }}
                    role="img"
                    aria-label={service.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 uppercase text-center">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-sm md:text-base text-white/90 text-center mb-3">{service.description}</p>
                  )}
                  <div className="text-center -mb-10">
                    <a
                      href={service.link || '#'}
                      className="inline-block px-4 md:px-6 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-colors font-semibold text-sm md:text-base"
                    >
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
