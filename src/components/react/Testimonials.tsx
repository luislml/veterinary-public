import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  author: string;
  text: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  imageUrl?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    author: 'LISA C',
    text: 'The staff at Southwoods Animal Hospital is absolutely amazing! They took such great care of my spicy with a double scoop of bad attitude old cat. The veterinarians are knowledgeable, patient, and truly care about the animals. I wouldn\'t trust anyone else with my pets.'
  },
  {
    author: 'JOHN D',
    text: 'Excellent service and compassionate care. The team always goes above and beyond to ensure our pets receive the best treatment. Highly recommend!'
  },
  {
    author: 'SARAH M',
    text: 'We\'ve been coming here for years and have always had a positive experience. The staff is friendly, professional, and truly loves animals.'
  },
];

export default function Testimonials({ 
  testimonials = defaultTestimonials,
  imageUrl = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80'
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2">
      {/* Image Side */}
      <div 
        className={`aspect-[4/5] lg:aspect-auto min-h-[300px] lg:min-h-0 bg-cover bg-center order-2 lg:order-1 ${
          isVisible ? 'animate-fade-right animate-duration-700' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Testimonials Side */}
      <div className={`bg-[var(--color-primary)] text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center order-1 lg:order-2 ${
        isVisible ? 'animate-fade-left animate-duration-700 animate-delay-200' : 'opacity-0'
      }`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">TESTIMONIALS</h2>
        
        <div className="mb-6 md:mb-8">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 md:mb-6">
            "{testimonials[currentIndex].text}"
          </p>
          <p className="text-lg md:text-xl font-semibold">- {testimonials[currentIndex].author}</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 md:gap-4">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

