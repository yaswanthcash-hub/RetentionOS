export default function LogoCarousel() {
  const brands = [
    { name: 'Cult.fit', alt: 'Cult.fit - Fitness Brand' },
    { name: 'Eat.fit', alt: 'Eat.fit - Healthy Food Brand' },
    { name: 'Mind.fit', alt: 'Mind.fit - Mental Wellness Brand' },
    { name: 'Care.fit', alt: 'Care.fit - Healthcare Brand' },
    { name: 'Whole.fit', alt: 'Whole.fit - Holistic Wellness Brand' },
    { name: 'Cultsport', alt: 'Cultsport - Sports Brand' },
    { name: 'Nobroker', alt: 'Nobroker - Real Estate Platform' },
    { name: 'Growthschool', alt: 'Growthschool - Learning Platform' },
    { name: 'Outskill', alt: 'Outskill - Skill Development Platform' },
    { name: 'Buildschool', alt: 'Buildschool - Education Platform' },
    { name: 'Kairos Business School', alt: 'Kairos Business School - Business Education' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-sm sm:text-base font-semibold text-gray-500 uppercase tracking-wider">
            Trusted by Leading Brands
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="logo-carousel-track flex gap-8 sm:gap-12 md:gap-16">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="logo-carousel-item flex-shrink-0 flex items-center justify-center px-4 group"
              >
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400 group-hover:text-gray-900 transition-all duration-300 whitespace-nowrap group-hover:scale-110 transform">
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .logo-carousel-track {
          animation: scroll 40s linear infinite;
          will-change: transform;
        }

        .logo-carousel-track:hover {
          animation-play-state: paused;
        }

        .logo-carousel-item {
          min-width: 200px;
        }

        @media (max-width: 640px) {
          .logo-carousel-item {
            min-width: 150px;
          }

          .logo-carousel-track {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
}
