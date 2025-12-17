import React from 'react';

interface FooterProps {
  hospitalName?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  businessHours?: Array<{
    label: string;
    hours: string;
  }>;
  emergencyClinics?: Array<{
    name: string;
    address: string;
    phone: string;
  }>;
  socialLinks?: string[];
  mapUrl?: string;
}

const getSocialIcon = (url: string) => {
  if (url.includes('facebook')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (url.includes('instagram')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (url.includes('tiktok')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    );
  }
  if (url.includes('youtube')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (url.includes('linkedin')) {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  // Email or default
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
};

const getSocialStyles = (url: string) => {
  if (url.includes('facebook')) return "bg-[#1877F2] hover:bg-[#1877F2]/90 text-white";
  if (url.includes('instagram')) return "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white";
  if (url.includes('tiktok')) return "bg-black hover:bg-gray-800 text-white";
  if (url.includes('youtube')) return "bg-[#FF0000] hover:bg-[#FF0000]/90 text-white";
  if (url.includes('linkedin')) return "bg-[#0077b5] hover:bg-[#0077b5]/90 text-white";
  return "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white";
};

export default function Footer({
  hospitalName = "",
  address = "",
  phoneNumber = "",
  email = "",
  businessHours = [],
  emergencyClinics = [],
  socialLinks = [],
  mapUrl = "",
}: FooterProps) {
  return (
    <footer id="contact">
      {/* Top Section - Contact & Map */}
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Map Section */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="bg-gray-200 aspect-video rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {/* Logic: 1. Try Embed URL. 2. Try Address Embed. 3. Fallback to Button */}
                {(() => {
                  const isEmbedUrl = mapUrl && mapUrl.includes('/maps/embed');
                  const embedSrc = isEmbedUrl
                    ? mapUrl
                    : address
                      ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                      : null;

                  if (embedSrc) {
                    return (
                      <iframe
                        src={embedSrc}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        className="w-full h-full border-0"
                        title={hospitalName || "Ubicación en el mapa"}
                      ></iframe>
                    );
                  }

                  return (
                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Section */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--color-primary)] mb-4 md:mb-6">
                  Contáctanos
                </h3>
                <div className="mb-6">
                  <p className="font-semibold mb-2">Nuestra Ubicación</p>
                  <p className="text-gray-700 mb-1 text-sm md:text-base break-words">
                    {address || "Dirección no disponible"}
                  </p>
                  <p className="text-gray-700 mb-1 text-sm md:text-base">
                    <a
                      href={`https://wa.me/${(phoneNumber || "+591 7 222 222 222").replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-primary)] transition-colors"
                    >Tell:
                      {phoneNumber || "+591 7 222 222 222"}
                    </a>
                  </p>
                  <p className="text-gray-700 mb-4 text-sm md:text-base break-words">
                    {email || "info@clinica.com"}
                  </p>
                </div>

                {/* Social Media */}
                {socialLinks && socialLinks.length > 0 && (
                  <div className="flex gap-3 flex-wrap">
                    {socialLinks
                      .filter(link => link && typeof link === 'string' && !link.includes('@'))
                      .map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${getSocialStyles(link)}`}
                          aria-label="Social link"
                        >
                          {getSocialIcon(link)}
                        </a>
                      ))}
                  </div>
                )}
              </div>

              {/* Business Hours & Emergency */}
              <div>
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-[var(--color-primary)] mb-3 md:mb-4">
                    Horarios de Atención
                  </h3>
                  {businessHours.length > 0 ? (
                    businessHours.map((item, idx) => (
                      <p key={idx} className="text-gray-700 mb-2 text-sm md:text-base">
                        <span className="font-semibold">{item.label}:</span> {item.hours}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-700 text-sm md:text-base">No disponible</p>
                  )}
                </div>

                {emergencyClinics.length > 0 && (
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[var(--color-primary)] mb-3 md:mb-4">
                      Teléfonos de Emergencia
                    </h3>
                    <ul className="text-gray-700 text-sm md:text-base">
                      {emergencyClinics.map((clinic, idx) => (
                        <li key={idx}>
                          <p className="text-gray-700 mb-1 text-sm md:text-base">
                            <span className="font-semibold">{clinic.name}</span>: {clinic.address} -{' '}
                            <a
                              href={`https://wa.me/${(clinic.phone || "").replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[var(--color-primary)] transition-colors inline-block"
                            >
                              Tell: {clinic.phone}
                            </a>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Legal */}
      <div className="bg-[var(--color-primary)] text-white py-4 md:py-6">
        <div className="container mx-auto px-4 text-center text-xs md:text-sm">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-2">
            <a href="#" className="hover:underline">
              Política de Privacidad
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Accesibilidad
            </a>
          </div>
          <p className="text-xs opacity-75 px-2">
            © Copyright 2025 - {hospitalName || "nombre de la clínica"}. Desarrollado por{" "}
            <a href="https://ivet360.com" className="hover:underline">
              nombre de la empresa
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}


