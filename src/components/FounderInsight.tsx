import { useEffect, useRef, useState } from 'react';

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
    <div
      ref={sectionRef}
      className="py-16 px-6"
      style={{ backgroundColor: '#0B1322' }}
    >
      <div
        className={`max-w-[900px] mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p
          className="text-sm font-bold uppercase tracking-wider mb-6"
          style={{ color: '#D8F560' }}
        >
          Founder Insight
        </p>

        <blockquote className="text-xl md:text-2xl italic font-light leading-relaxed mb-6 text-white">
          "{quote}"
        </blockquote>

        <p className="text-base md:text-lg font-bold text-white">
          — {founderName},{' '}
          <span
            className="font-bold"
            style={{ color: '#D8F560' }}
          >
            {company}
          </span>
        </p>
      </div>
    </div>
  );
}
