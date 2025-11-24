import { Eye, MessageSquare, Sparkles, Zap, Settings, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
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
    <section id="how-it-works" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D1F26E] to-transparent"></div>

      <div className="absolute top-20 left-10 w-96 h-96 bg-[#D1F26E] rounded-full blur-[120px] opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D1F26E] rounded-full blur-[120px] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D1F26E] blur-xl opacity-50"></div>
              <h3 className="relative text-sm font-bold tracking-[0.3em] text-[#D1F26E] uppercase px-8 py-3 border border-[#D1F26E]/30 backdrop-blur-sm">
                THE FRAMEWORK
              </h3>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 leading-tight">
            THE <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#D1F26E] to-[#9FBB4A] bg-clip-text text-transparent">
                R.E.P.E.A.T
              </span>
              <div className="absolute inset-0 bg-[#D1F26E] blur-2xl opacity-30"></div>
            </span>
            <br />
            FRAMEWORK
          </h2>

          <p className="text-2xl md:text-3xl text-gray-400 font-light max-w-3xl mx-auto mb-3">
            How We Keep Your Customers
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Our proven retention system
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D1F26E]/20 to-transparent hidden lg:block"></div>

          <div className="space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = step.position === 'left';

              return (
                <div key={index} className="relative">
                  <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index !== steps.length - 1 ? 'mb-8' : ''}`}>
                    <div className={`${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="group relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                        <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:border-[#D1F26E]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D1F26E]/10">
                          <div className="flex items-start gap-6 mb-6">
                            <div className="relative flex-shrink-0">
                              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-xl opacity-50`}></div>
                              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500`}>
                                <span className="text-4xl font-black text-black">{step.letter}</span>
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                                {step.title}
                              </h3>
                              <p className="text-[#D1F26E] font-semibold text-base md:text-lg mb-3">
                                {step.subtitle}
                              </p>
                              <p className="text-gray-400 text-lg leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-black" strokeWidth={2.5} />
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#D1F26E]/20 to-transparent"></div>
                            <span className="text-sm font-bold text-gray-600">STEP {index + 1}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`hidden lg:block ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-2xl opacity-30`}></div>
                          <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
                            <Icon className="w-16 h-16 text-black" strokeWidth={2} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center my-8">
                      <div className="w-0.5 h-12 bg-gradient-to-b from-[#D1F26E]/20 to-transparent"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-[#D1F26E] blur-3xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-[#D1F26E]/30 rounded-2xl px-12 py-8">
              <p className="text-gray-400 text-lg mb-2">
                Every step. Every system. Every result.
              </p>
              <p className="text-2xl font-bold text-[#D1F26E]">
                Built for partnership. Built for retention.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <a
              href="https://calendly.com/hi-retentionos/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#D1F26E] text-black text-lg font-black rounded-full hover:bg-white transition-all duration-300 shadow-2xl shadow-[#D1F26E]/20 hover:shadow-[#D1F26E]/40 hover:scale-105"
            >
              Let's Connect ➡️
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D1F26E] to-transparent"></div>
    </section>
  );
}
