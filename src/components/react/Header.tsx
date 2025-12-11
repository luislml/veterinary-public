import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  phoneNumber?: string;
}

export default function Header({ 
  phoneNumber = '+591 7 222 222 222'
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const [topBarHeight, setTopBarHeight] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Pequeño delay para asegurar que el menú móvil se cierre antes del scroll
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Obtener la altura del header sticky (si está fijo) o del header normal
        const headerHeight = isSticky && topBarRef.current 
          ? topBarRef.current.offsetHeight 
          : (topBarRef.current?.offsetHeight || 0);
        
        // Calcular la posición del target considerando el header
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20; // 20px de padding adicional
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  useEffect(() => {
    // Calcular altura del top bar inicial
    const calculateHeight = () => {
      if (topBarRef.current) {
        const height = topBarRef.current.offsetHeight;
        setTopBarHeight(height);
        // Exponer altura inmediatamente
        if (typeof window !== 'undefined') {
          (window as any).__headerStickyHeight = isSticky ? height : 0;
        }
      }
    };

    // Calcular altura inicial después de que el componente se monte
    setTimeout(calculateHeight, 0);

    let ticking = false;
    let lastScrollTop = 0;
    let lastStickyState = isSticky;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (headerRef.current && topBarRef.current) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Usar un threshold para evitar cambios constantes
            const threshold = 10;
            const shouldBeSticky = scrollTop > threshold;
            
            // Solo actualizar si el estado realmente cambió
            if (shouldBeSticky !== lastStickyState && Math.abs(scrollTop - lastScrollTop) > 5) {
              setIsSticky(shouldBeSticky);
              lastStickyState = shouldBeSticky;
              lastScrollTop = scrollTop;
              
              // Actualizar altura expuesta
              if (typeof window !== 'undefined') {
                const height = topBarRef.current.offsetHeight;
                (window as any).__headerStickyHeight = shouldBeSticky ? height : 0;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      calculateHeight();
    };

    // Usar passive para mejor rendimiento
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll(); // Llamar una vez al montar

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Exponer la altura y estado sticky al componente padre cuando cambia
  useEffect(() => {
    if (typeof window !== 'undefined' && topBarRef.current) {
      const height = topBarRef.current.offsetHeight;
      (window as any).__headerStickyHeight = isSticky ? height : 0;
    }
  }, [isSticky]);

  return (
    <header ref={headerRef}>
      {/* Sticky Top Bar - Solo logo y contacto */}
      <div 
        ref={topBarRef}
        className="bg-white shadow-sm z-50 w-full"
        style={{
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? 0 : 'auto',
          left: 0,
          right: 0,
          willChange: 'position',
          transition: 'none', // Sin transición para evitar parpadeos
        }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <a href="/">
              <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=200&fit=crop&q=80" alt="logo" className="w-full h-15" />
            </a>
          </div>

          {/* Right Side Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href={`tel:${phoneNumber.replace(/\D/g, '')}`}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)] transition-colors text-sm"
            >
              {phoneNumber}
            </a>
            <a href="#" className="px-6 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-colors font-semibold text-sm">
              Emergencias
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-[var(--color-primary)] hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Buttons - Show when menu is open */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 px-4 py-3 space-y-2">
            <a 
              href={`tel:${phoneNumber.replace(/\D/g, '')}`}
              className="block w-full text-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)] transition-colors text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {phoneNumber}
            </a>
            <a href="#" 
              className="block w-full px-4 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-colors font-semibold text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              EMERGENCIAS
            </a>
          </div>
        )}
      </div>

      {/* Navigation - No sticky, se queda en su lugar */}
      <nav className={`bg-white border-t border-gray-200 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 py-4">
            <li>
              <a 
                href="#about" 
                className="block text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors py-2 md:py-0 cursor-pointer"
                onClick={(e) => handleSmoothScroll(e, 'about')}
              >
                ACERCA DE NOSOTROS
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className="block text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors py-2 md:py-0 cursor-pointer"
                onClick={(e) => handleSmoothScroll(e, 'services')}
              >
                SERVICIOS
              </a>
            </li>
            <li>
              <a 
                href="#team" 
                className="block text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors py-2 md:py-0 cursor-pointer"
                onClick={(e) => handleSmoothScroll(e, 'team')}
              >
                NUESTRO EQUIPO
              </a>
            </li>
            <li>
              <a 
                href="#testimonials" 
                className="block text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors py-2 md:py-0 cursor-pointer"
                onClick={(e) => handleSmoothScroll(e, 'testimonials')}
              >
                TESTIMONIOS
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="block text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors py-2 md:py-0 cursor-pointer"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
              >
                CONTÁCTANOS
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

