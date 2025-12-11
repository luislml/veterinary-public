import React from 'react';

interface FooterProps {
  hospitalName?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  businessHours?: {
    weekdays?: string;
    weekend?: string;
  };
  emergencyClinics?: Array<{
    name: string;
    address: string;
    phone: string;
  }>;
}

export default function Footer({
  hospitalName = "",
  address = "",
  phoneNumber = "",
  email = "",
  businessHours,
  emergencyClinics = [],
}: FooterProps) {
  return (
    <footer id="contact">
      {/* Top Section - Contact & Map */}
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Map Section */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="bg-gray-200 aspect-video rounded-lg mb-4 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5697.945122593224!2d-65.76004370246527!3d-19.57430656787923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sbo!4v1765334245651!5m2!1ses!2sbo"
                  width="600"
                  height="450"
                  loading="lazy"
                ></iframe>
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
                    {phoneNumber || "+591 7 222 222 222"}
                  </p>
                  <p className="text-gray-700 mb-4 text-sm md:text-base break-words">
                    {email || "info@clinica.com"}
                  </p>
                </div>

                {/* Social Media */}
                <div className="flex gap-3">
                  {/* Aquí puedes mapear links de social media si los tuvieras */}
                  <a
                    href="#"
                    className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-primary-dark)] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Business Hours & Emergency */}
              <div>
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-[var(--color-primary)] mb-3 md:mb-4">
                    Horarios de Atención
                  </h3>
                  {businessHours ? (
                    <>
                      <p className="text-gray-700 mb-2 text-sm md:text-base">
                        Lunes - Viernes: {businessHours.weekdays}
                      </p>
                      <p className="text-gray-700 text-sm md:text-base">
                        Sábado y Domingo: {businessHours.weekend}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-700 text-sm md:text-base">No disponible</p>
                  )}
                </div>

                {emergencyClinics.length > 0 && (
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[var(--color-primary)] mb-3 md:mb-4">
                      Clínicas de Emergencia
                    </h3>
                    <ul className="text-gray-700 text-sm md:text-base">
                      {emergencyClinics.map((clinic, idx) => (
                        <li key={idx}>
                          {clinic.name}: {clinic.address} - {clinic.phone}
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


