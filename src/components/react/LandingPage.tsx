import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import ServiceCategories from './ServiceCategories';
import AboutUs from './AboutUs';
import Services from './Services';
import MeetOurTeam from './MeetOurTeam';
import Affiliations from './Affiliations';
import Testimonials from './Testimonials';
import Footer from './Footer';

export default function LandingPage() {
  const [stickyHeight, setStickyHeight] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastHeight = 0;

    const updateStickyHeight = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const height = (window as any).__headerStickyHeight || 0;
          // Solo actualizar si la altura realmente cambió
          if (Math.abs(height - lastHeight) > 1) {
            setStickyHeight(height);
            lastHeight = height;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Verificar periódicamente el estado del header sticky (menos frecuente)
    const interval = setInterval(updateStickyHeight, 200);
    
    // También escuchar cambios en el scroll
    const handleScroll = () => {
      updateStickyHeight();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateStickyHeight(); // Llamar una vez al montar

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      {/* Spacer dinámico para compensar el header sticky - siempre presente para evitar saltos */}
      <div 
        style={{ 
          height: `${stickyHeight}px`,
          transition: 'none', // Sin transición para evitar parpadeos
        }}
        aria-hidden="true"
      ></div>
      <Hero />
      <ServiceCategories />
      <AboutUs />
      <Services />
      <MeetOurTeam />
      <Affiliations />
      <Testimonials />
      <Footer />
    </main>
  );
}

