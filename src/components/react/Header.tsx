import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  phoneNumber?: string;
  logoText?: string;
}

export default function Header({ 
  phoneNumber = '(336) 275-7266',
  logoText = 'southwoods ANIMAL HOSPITAL'
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const [topBarHeight, setTopBarHeight] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
            <span className="text-[var(--color-primary)] font-bold text-sm md:text-lg uppercase tracking-wide hidden sm:block">
              {logoText}
            </span>
          </div>

          {/* Right Side Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href={`tel:${phoneNumber.replace(/\D/g, '')}`}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)] transition-colors text-sm"
            >
              {phoneNumber}
            </a>
            <button className="px-6 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-colors font-semibold text-sm">
              APPOINTMENTS
            </button>
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
            <button 
              className="block w-full px-4 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-dark)] transition-colors font-semibold text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              APPOINTMENTS
            </button>
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
                className="block text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT US
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className="block text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                SERVICES
              </a>
            </li>
            <li>
              <a 
                href="#client-info" 
                className="block text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                CLIENT INFORMATION
              </a>
            </li>
            <li>
              <a 
                href="#store" 
                className="block text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                ONLINE STORE
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

