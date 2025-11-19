import { useEffect, useRef } from 'react';

export default function TrustedBrands() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const brands = [
    { name: 'WebEngage', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/WebEngage_logo.svg/320px-WebEngage_logo.svg.png' },
    { name: 'MoEngage', logo: 'https://www.moengage.com/wp-content/uploads/2023/05/moengage-logo.svg' },
    { name: 'CleverTap', logo: 'https://clevertap.com/wp-content/uploads/2023/01/clevertap-logo.svg' },
    { name: 'Zoho CRM', logo: 'https://www.zohowebstatic.com/sites/zweb/images/logo/zoho-logo.svg' },
    { name: 'HubSpot CRM', logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png' },
    { name: 'Aisency', logo: 'https://framerusercontent.com/images/zzTNYQW4JyOjPJdvyF4VQyYhY.png' },
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;
    let animationFrameId: number;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-sm sm:text-base font-semibold text-gray-500 uppercase tracking-wider mb-8">
          Experienced With
        </h2>

        <div
          ref={scrollContainerRef}
          className="overflow-hidden relative"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex items-center gap-12 sm:gap-16">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 sm:h-10 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
