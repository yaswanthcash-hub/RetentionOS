import { useEffect, useRef, useState } from 'react';
import { Lightbulb } from 'lucide-react';

interface FounderInsightProps {
  quote: string;
  founderName: string;
  company: string;
}

export default function FounderInsight({ quote, founderName, company }: FounderInsightProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-6 overflow-hidden"
      style={{ backgroundColor: '#0B1322' }}
      aria-label="Founder Insight"
    >
      <div
        className={`relative max-w-[900px] mx-auto text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center justify-center gap-2 mb-6">
          <Lightbulb
            className="w-5 h-5 transition-transform duration-300 hover:scale-110"
            style={{ color: '#D8F560' }}
            aria-hidden="true"
          />
          <h2
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: '#D8F560' }}
          >
            Founder Insight
          </h2>
        </div>

        <blockquote
          className="text-xl md:text-2xl lg:text-3xl italic font-light leading-relaxed mb-8 px-4 md:px-8"
          style={{
            color: '#FFFFFF',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}
        >
          "{quote}"
        </blockquote>

        <p className="text-base md:text-lg font-semibold" style={{ color: '#E5E7EB' }}>
          — {founderName}{' '}
          <span
            className="font-bold inline-block transition-colors duration-300"
            style={{ color: '#D8F560' }}
          >
            {company}
          </span>
        </p>

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: '#D8F560' }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
