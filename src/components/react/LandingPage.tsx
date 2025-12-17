import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api';
import Header from './Header';
import Hero from './Hero';
import ServiceCategories from './ServiceCategories';
import AboutUs from './AboutUs';
import Services from './Services';
import MeetOurTeam from './MeetOurTeam';
import Affiliations from './Affiliations';
import Testimonials from './Testimonials';
import Footer from './Footer';


interface LandingPageProps {
  slug?: string;
}

export default function LandingPage({ slug = "" }: LandingPageProps) {
  const [stickyHeight, setStickyHeight] = useState(0);
  const [landingData, setLandingData] = useState<any>(null);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/landing/${slug}`);
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

  // Actualizar Título y Favicon
  useEffect(() => {
    if (!landingData) return;

    // Actualizar título
    if (landingData.name) {
      document.title = landingData.name;
    }

    // Actualizar favicon
    const faviconUrlPath = landingData.configuration?.favicon?.url;
    if (faviconUrlPath) {
      const faviconUrl = `${API_BASE_URL}/${faviconUrlPath}`;
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [landingData]);

  if (!landingData) return null;
  // Mapeo API → props de Services
  const servicesMapped = landingData.content_veterinaries?.service?.map((item: any) => ({
    title: item.title,
    description: item.description,
    imageUrl: item.file?.url
      ? `${API_BASE_URL}/${item.file.url}`
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
      ? `${API_BASE_URL}/${landingData.images_veterinaries.find((img: any) => img.type === "testimonial").file.url}`
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

  // SPECIALTIES MAPPED
  const specialtiesMapped = landingData.content_veterinaries?.specialty?.map((item: any) => ({
    title: item.title,
    description: item.description,
    imageUrl: item.file?.url
      ? `${API_BASE_URL}/${item.file.url}`
      : "https://placehold.co/600x400",
    link: "#",
  })) || [];

  // LOGO
  const logoUrl = landingData?.images_veterinaries?.find((img: any) => img.type === "logo")?.file?.url
    ? `${API_BASE_URL}/${landingData.images_veterinaries.find((img: any) => img.type === "logo").file.url}`
    : "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=200&fit=crop&q=80";

  const formatSchedules = (schedules: any[]) => {
    if (!schedules || schedules.length === 0) return [];

    const daysOrder = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo", "Sábado", "Miércoles"];

    // Normalize and sort
    const sorted = [...schedules].sort((a, b) => {
      return daysOrder.indexOf(a.days) - daysOrder.indexOf(b.days);
    });

    return sorted.map(item => ({
      label: item.days,
      hours: item.schedule
    }));
  };

  return (
    <main className="min-h-screen">
      <Header
        phoneNumber={landingData?.configuration?.phone || "+591 7 222 222 222"}
        emergencyPhoneNumber={landingData?.configuration?.phone_emergency || "+591 7 222 222 222"}
        logoUrl={logoUrl}
        hospitalName={landingData?.name}
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
        imageUrl={bannerData?.file?.url ? `${API_BASE_URL}/${bannerData.file.url}` : 'https://placehold.co/1200x400'}
      />
      <ServiceCategories services={specialtiesMapped} />
      <AboutUs
        description={landingData?.configuration?.about_us}
      />
      <Services
        title="SERVICIOS"
        description=""
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
        businessHours={formatSchedules(landingData?.schedules || [])}
        emergencyClinics={emergencyClinics}
        socialLinks={landingData?.addresses?.social_media?.map((s: any) => s.address) || []}
        mapUrl={landingData?.addresses?.map?.find((m: any) => m.address_type === "map")?.address}
      />
    </main>
  );
}

