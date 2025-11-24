import { Eye, MessageSquare, Sparkles, Zap, Settings, BarChart3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleSteps(new Set([0, 1, 2, 3, 4, 5]));
      return;
    }

    const observers: IntersectionObserver[] = [];
    const stepElements = sectionRef.current?.querySelectorAll('[data-step]');

    if (stepElements) {
      stepElements.forEach((element, index) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSteps((prev) => new Set([...prev, index]));
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: '-50px'
          }
        );

        observer.observe(element);
        observers.push(observer);
      });
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [prefersReducedMotion]);

  const steps = [
    {
      letter: 'R',
      title: 'RECOGNIZE',
      subtitle: 'Customer segmentation & behavior analysis',
      description: 'Know who\'s leaving. Know who\'s staying.',
      icon: Eye,
      gradient: 'from-[#D1F26E] via-[#B8D65C] to-[#9FBB4A]',
      position: 'left'
    },
    {
      letter: 'E',
      title: 'ENGAGE',
      subtitle: 'Personalized communication strategies',
      description: 'Email. SMS. WhatsApp. All automated.',
      icon: MessageSquare,
      gradient: 'from-[#9FBB4A] via-[#86A138] to-[#6D8726]',
      position: 'right'
    },
    {
      letter: 'P',
      title: 'PERSONALIZE',
      subtitle: 'Tailored experiences and offers',
      description: 'Right message. Right time. Right customer.',
      icon: Sparkles,
      gradient: 'from-[#D1F26E] via-[#B8D65C] to-[#9FBB4A]',
      position: 'left'
    },
    {
      letter: 'E',
      title: 'EXCITE',
      subtitle: 'Gamification and loyalty mechanics',
      description: 'Make staying more valuable than leaving.',
      icon: Zap,
      gradient: 'from-[#9FBB4A] via-[#86A138] to-[#6D8726]',
      position: 'right'
    },
    {
      letter: 'A',
      title: 'AUTOMATE',
      subtitle: 'Lifecycle marketing automation',
      description: 'Systems that run 24/7. No manual work.',
      icon: Settings,
      gradient: 'from-[#D1F26E] via-[#B8D65C] to-[#9FBB4A]',
      position: 'left'
    },
    {
      letter: 'T',
      title: 'TRACK',
      subtitle: 'Data-driven optimization',
      description: 'See what\'s working. Double down on it.',
      icon: BarChart3,
      gradient: 'from-[#9FBB4A] via-[#86A138] to-[#6D8726]',
      position: 'right'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-12 md:py-16 bg-black overflow-hidden"
    >

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D1F26E] to-transparent"></div>

      <div className="absolute top-8 left-5 w-64 h-64 bg-[#D1F26E] rounded-full blur-[100px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-8 right-5 w-64 h-64 bg-[#D1F26E] rounded-full blur-[100px] opacity-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D1F26E]"></div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#D1F26E] blur-lg opacity-40"></div>
              <h3 className="relative text-xs font-bold tracking-[0.25em] text-[#D1F26E] uppercase px-5 py-1.5 border border-[#D1F26E]/30 backdrop-blur-sm">
                THE FRAMEWORK
              </h3>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D1F26E]"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-3 leading-[1.1] px-4">
            THE <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#D1F26E] to-[#9FBB4A] bg-clip-text text-transparent">
                R.E.P.E.A.T
              </span>
              <div className="absolute inset-0 bg-[#D1F26E] blur-xl opacity-30"></div>
            </span> FRAMEWORK
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-1.5">
            How We Keep Your Customers
          </p>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto">
            Our proven retention system
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D1F26E]/20 to-transparent hidden lg:block"></div>

          <div className="space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = step.position === 'left';
              const isVisible = visibleSteps.has(index);

              return (
                <div
                  key={index}
                  className="relative"
                  data-step={index}
                >
                  <div className={`grid lg:grid-cols-2 gap-4 lg:gap-8 items-center ${index !== steps.length - 1 ? 'mb-3' : ''}`}>
                    <div className={`${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div
                        className={`group relative transition-all duration-700 ${
                          isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                        }`}
                        style={{
                          transitionDelay: prefersReducedMotion ? '0ms' : `${index * 100}ms`
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-lg transition-opacity duration-500 ${
                          isVisible ? 'opacity-20' : 'opacity-0'
                        } group-hover:opacity-30`}></div>

                        <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-5 hover:border-[#D1F26E]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#D1F26E]/20 hover:scale-[1.02]">
                          <div className="flex items-start gap-3.5 mb-3">
                            <div className="relative flex-shrink-0">
                              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-lg transition-opacity duration-700 ${
                                isVisible ? 'opacity-60' : 'opacity-0'
                              }`}></div>
                              <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center transform transition-all duration-700 ${
                                isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-45'
                              } group-hover:scale-110 group-hover:rotate-3`}>
                                <span className="text-2xl md:text-3xl font-black text-black">{step.letter}</span>
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2 flex-wrap mb-1">
                                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                  {step.title}
                                </h3>
                                <span className="text-xs font-bold text-gray-600 whitespace-nowrap">STEP {index + 1}</span>
                              </div>
                              <p className="text-[#D1F26E] font-semibold text-sm md:text-base mb-2 leading-tight">
                                {step.subtitle}
                              </p>
                              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2.5 border-t border-white/5">
                            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center transition-all duration-700 ${
                              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                            }`}>
                              <Icon className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
                            </div>
                            <div className={`h-px flex-1 bg-gradient-to-r from-[#D1F26E]/30 to-transparent transition-all duration-700 ${
                              isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
                            }`}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`hidden lg:block ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className={`flex ${isLeft ? 'justify-start pl-6' : 'justify-end pr-6'}`}>
                        <div
                          className={`relative transition-all duration-700 ${
                            isVisible
                              ? 'opacity-100 scale-100 rotate-0'
                              : 'opacity-0 scale-50 rotate-180'
                          }`}
                          style={{
                            transitionDelay: prefersReducedMotion ? '0ms' : `${index * 100 + 200}ms`
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-xl transition-opacity duration-700 ${
                            isVisible ? 'opacity-40' : 'opacity-0'
                          }`}></div>
                          <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
                            <Icon className="w-10 h-10 text-black" strokeWidth={2} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center my-3">
                      <div className={`w-px h-6 bg-gradient-to-b from-[#D1F26E]/30 to-transparent transition-all duration-700 ${
                        isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                      }`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-[#D1F26E] blur-2xl opacity-20 animate-pulse-slow"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-[#D1F26E]/30 rounded-xl px-6 py-4">
              <p className="text-gray-400 text-sm md:text-base mb-0.5">
                Every step. Every system. Every result.
              </p>
              <p className="text-lg md:text-xl font-bold text-[#D1F26E]">
                Built for partnership. Built for retention.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="https://calendly.com/hi-retentionos/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#D1F26E] text-black text-base md:text-lg font-black rounded-full hover:bg-white transition-all duration-300 shadow-xl shadow-[#D1F26E]/20 hover:shadow-[#D1F26E]/40 hover:scale-105"
            >
              <span>Let's Connect</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">➡️</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D1F26E] to-transparent"></div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
