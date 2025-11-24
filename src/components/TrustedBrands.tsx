export default function TrustedBrands() {
  const brands = [
    { name: 'WebEngage', logo: '/webengage-logo.svg' },
    { name: 'MoEngage', logo: '/moengage-logo.svg' },
    { name: 'CleverTap', logo: '/clevertap-logo.svg' },
    { name: 'Zoho CRM', logo: '/zoho-logo.svg' },
    { name: 'HubSpot', logo: '/hubspot-logo.svg' },
    { name: 'AiSensy', logo: '/aisency-logo.svg' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-sm sm:text-base font-semibold text-gray-500 uppercase tracking-wider mb-8">
          Experienced With
        </h2>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="brand-scroll-track flex items-center gap-12 sm:gap-16">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="brand-scroll-item flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes brandScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .brand-scroll-track {
          animation: brandScroll 40s linear infinite;
          will-change: transform;
        }

        .brand-scroll-track:hover {
          animation-play-state: paused;
        }

        .brand-scroll-item {
          min-width: 180px;
        }

        @media (max-width: 640px) {
          .brand-scroll-item {
            min-width: 140px;
          }

          .brand-scroll-track {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
}
