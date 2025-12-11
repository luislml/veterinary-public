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
  const [landingData, setLandingData] = useState<any>(null);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/landing/gatio-feo");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        console.log("Landing Data fetched:", json);

        // Guardamos solo el objeto interno
        setLandingData(json.data);

      } catch (error) {
        console.error("Error fetching landing data:", error);
      }
    };

    fetchLandingData();
  }, []);

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


  // Actualizar variables CSS globales con los colores de la API
  useEffect(() => {
    if (!landingData?.configuration) return;

    const root = document.documentElement;

    if (landingData.configuration.color_primary) {
      root.style.setProperty('--color-primary', landingData.configuration.color_primary);
    }

    if (landingData.configuration.color_secondary) {
      root.style.setProperty('--color-accent', landingData.configuration.color_secondary);
    }
  }, [landingData]);

  if (!landingData) return null;
  // Mapeo API → props de Services
  const servicesMapped = landingData.content_veterinaries?.service?.map((item: any) => ({
    title: item.title,
    description: item.description,
    imageUrl: item.file?.url
      ? `http://localhost:8000/${item.file.url}`
      : "https://placehold.co/600x400",
    link: "#",
  })) || [];

  // TESTIMONIALS MAPPED
  const testimonialsMapped =
    landingData?.content_veterinaries?.testimonial?.map((item: any) => ({
      author: item.title || "Anónimo",
      text: item.description || "",
    })) || [];
  const testimonialImage =
    landingData?.images_veterinaries?.find((img: any) => img.type === "testimonial")?.file?.url
      ? `http://localhost:8000/${landingData.images_veterinaries.find((img: any) => img.type === "testimonial").file.url}`
      : "https://placehold.co/600x400";

  // Extraemos banner de la API
  const bannerData = landingData.content_veterinaries?.banner?.[0];

  // Mapear props para Footer
  // PHYSICAL ADDRESS
  const physicalAddress = landingData?.addresses?.physical?.[0]?.address || "";

  // EMAIL (desde social_media, filtrando los que tengan @)
  const emailAddress = landingData?.addresses?.social_media
    ?.find((sm: any) => sm.address.includes("@"))?.address || "";

  // TELÉFONO DE EMERGENCIAS
  const emergencyPhone = landingData?.configuration?.phone_emergency || "";

  // MAPEAR EMERGENCY CLINICS
  const emergencyClinics = landingData?.addresses?.physical?.map((addr: any) => ({
    name: "Emergencias",
    address: addr.address,
    phone: emergencyPhone,
  })) || [];

  return (
    <main className="min-h-screen">
      <Header
        phoneNumber={landingData?.configuration?.phone_emergency}
      />
      {/* Spacer dinámico para compensar el header sticky - siempre presente para evitar saltos */}
      <div
        style={{
          height: `${stickyHeight}px`,
          transition: 'none', // Sin transición para evitar parpadeos
        }}
        aria-hidden="true"
      ></div>
      <Hero
        title={bannerData?.title || 'Título por defecto para banner'}
        subtitle={bannerData?.description || 'Descripción por defecto para banner'}
        imageUrl={bannerData?.file?.url ? `http://localhost:8000/${bannerData.file.url}` : 'https://placehold.co/1200x400'}
      />
      <ServiceCategories />
      <AboutUs
        description={landingData?.configuration?.about_us}
      />
      <Services
        title="Nuestros Servicios"
        description="Conoce los servicios que ofrecemos para tu mascota."
        services={servicesMapped}
      />
      <MeetOurTeam
        description={landingData?.configuration?.description_team}
        imageUrl={landingData?.images_veterinaries[0].file?.url}
      />
      <Affiliations />
      <Testimonials
        testimonials={testimonialsMapped}
        imageUrl={testimonialImage}
      />
      <Footer
        hospitalName={landingData?.name || ""}
        address={physicalAddress}
        phoneNumber={landingData?.configuration?.phone || ""}
        email={emailAddress}
        businessHours={{
          weekdays: landingData?.schedules?.find((s: any) =>
            s.days.toLowerCase().includes("lunes")
          )?.schedule || "No disponible",
          weekend: landingData?.schedules?.find((s: any) =>
            s.days.toLowerCase().includes("sábado") || s.days.toLowerCase().includes("domingo")
          )?.schedule || "Cerrado"
        }}
        emergencyClinics={emergencyClinics}
      />
    </main>
  );
}

