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
  hospitalName = 'Southwoods Animal Hospital',
  address = '3005 Randleman Road, Greensboro, NC',
  phoneNumber = '(336) 275-7266',
  email = 'info@southwoodsvet.com',
  businessHours = {
    weekdays: 'Monday-Friday 7:00 AM - 6:00 PM',
    weekend: 'Saturday-Sunday Closed'
  },
  emergencyClinics = [
    {
      name: 'Happy Tails Veterinary Emergency Clinic',
      address: '123 Emergency St, Greensboro, NC',
      phone: '(336) 555-0100'
    },
    {
      name: 'Carolina Veterinary Animal ER & Trauma Center',
      address: '456 Trauma Ave, Greensboro, NC',
      phone: '(336) 555-0200'
    }
  ]
}: FooterProps) {
  return (
    <footer>
      {/* Top Section - Contact & Map */}
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Map Section */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="bg-gray-200 aspect-video rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Google Maps Embed</p>
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-2">{hospitalName}</p>
                <p className="break-words">{address}</p>
                <p className="mt-2">{phoneNumber}</p>
                <div className="mt-2 flex items-center gap-1 flex-wrap">
                  <span className="text-yellow-500">★★★★</span>
                  <span className="text-gray-600">4.0 (466 reviews)</span>
                </div>
                <a href="#" className="text-[var(--color-primary)] hover:underline mt-2 inline-block">
                  View larger map
                </a>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[var(--color-primary)] mb-4 md:mb-6">CONTACT SOUTHWOODS</h3>
              <div className="mb-6">
                <p className="font-semibold mb-2">Our Location</p>
                <p className="text-gray-700 mb-1 text-sm md:text-base break-words">{address}</p>
                <p className="text-gray-700 mb-1 text-sm md:text-base">{phoneNumber}</p>
                <p className="text-gray-700 mb-4 text-sm md:text-base break-words">{email}</p>
                <a href="#" className="text-[var(--color-primary)] hover:underline text-sm md:text-base">
                  Contact Form
                </a>
              </div>

              {/* Social Media */}
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-primary-dark)] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Business Hours & Emergency */}
            <div>
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-[var(--color-primary)] mb-3 md:mb-4">BUSINESS HOURS</h3>
                <p className="text-gray-700 mb-2 text-sm md:text-base">{businessHours.weekdays}</p>
                <p className="text-gray-700 text-sm md:text-base">{businessHours.weekend}</p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--color-primary)] mb-3 md:mb-4">
                  FOR AFTER-HOURS EMERGENCIES CONTACT
                </h3>
                {emergencyClinics.map((clinic, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{clinic.name}</p>
                    <p className="text-gray-700 text-xs md:text-sm mb-1 break-words">{clinic.address}</p>
                    <p className="text-gray-700 text-xs md:text-sm">{clinic.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Legal */}
      <div className="bg-[var(--color-primary)] text-white py-4 md:py-6">
        <div className="container mx-auto px-4 text-center text-xs md:text-sm">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-2">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:underline">Accessibility</a>
          </div>
          <p className="text-xs opacity-75 px-2">
            © Copyright 2025 - {hospitalName}. Veterinary Marketing Powered By IVET360.
          </p>
        </div>
      </div>
    </footer>
  );
}

