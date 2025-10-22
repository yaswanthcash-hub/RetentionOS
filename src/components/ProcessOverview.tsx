import { Presentation, Rocket, Users, BarChart3, MessageCircle, Map, Lightbulb, ShoppingCart, CreditCard, Heart, RotateCcw, Smartphone } from 'lucide-react';

export default function ProcessOverview() {
  const mapSteps = [
    { number: 1, icon: BarChart3, title: 'Analyze', subtitle: 'Repeat Patterns' },
    { number: 2, icon: MessageCircle, title: 'Decode Voice', subtitle: 'of Customer' },
    { number: 3, icon: Map, title: 'Map Customer', subtitle: 'Journey' }
  ];

  const activateSteps = [
    { number: 4, icon: Lightbulb, title: 'Nurture', subtitle: 'Buyers' },
    { number: 5, icon: ShoppingCart, title: 'Accelerate', subtitle: 'Reorders' },
    { number: 6, icon: CreditCard, title: 'Scale', subtitle: 'Subscriptions' }
  ];

  const sustainSteps = [
    { number: 7, icon: Heart, title: 'Cultivate', subtitle: 'Loyal Customers' },
    { number: 8, icon: RotateCcw, title: 'Reactivate', subtitle: 'Customers' },
    { number: 9, icon: Smartphone, title: 'Activate', subtitle: 'Omni Channels' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr,auto,2fr] gap-8 lg:gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-[#ff6b35]">REPEAT PURCHASE</span>
                <br />
                <span className="text-[#ff6b35]">MAXIMIZER™</span>
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                We help <span className="font-bold italic">CPG brands</span> raise their{' '}
                <span className="font-bold italic">90-day repeat purchase rate to 25–40%</span> in 3
                months using email, loyalty, and subscription programs.
              </p>
            </div>

            <div className="border-t border-b border-gray-300 py-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#d1f26e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Presentation className="w-7 h-7 text-[#4a5a3c]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">MAP</h3>
                  <p className="text-gray-700">Find & Map What Drives Repeats</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#d1f26e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-7 h-7 text-[#4a5a3c]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">ACTIVATE</h3>
                  <p className="text-gray-700">Launch Journeys That Activate Repeats</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#d1f26e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-[#4a5a3c]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">SUSTAIN</h3>
                  <p className="text-gray-700">Lock In Loyalty & Win Back Lapses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-px border-l-2 border-dashed border-gray-300 self-stretch min-h-[600px]"></div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#d1f26e] text-black font-bold text-base px-6 py-2 rounded-md">
                  MAP
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {mapSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="relative">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mb-3 relative">
                          <Icon className="w-10 h-10 text-[#6b8e4e]" strokeWidth={2} />
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#6b8e4e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.number}
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm mt-3">{step.title}</h4>
                        <p className="font-bold text-gray-900 text-sm">{step.subtitle}</p>
                      </div>
                      {idx < 2 && (
                        <div className="absolute top-10 left-full w-6 h-px border-t-2 border-dotted border-gray-300"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#d1f26e] text-black font-bold text-base px-6 py-2 rounded-md">
                  ACTIVATE
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {activateSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="relative">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mb-3 relative">
                          <Icon className="w-10 h-10 text-[#6b8e4e]" strokeWidth={2} />
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#6b8e4e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.number}
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm mt-3">{step.title}</h4>
                        <p className="font-bold text-gray-900 text-sm">{step.subtitle}</p>
                      </div>
                      {idx < 2 && (
                        <div className="absolute top-10 left-full w-6 h-px border-t-2 border-dotted border-gray-300"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#d1f26e] text-black font-bold text-base px-6 py-2 rounded-md">
                  SUSTAIN
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {sustainSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="relative">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mb-3 relative">
                          <Icon className="w-10 h-10 text-[#6b8e4e]" strokeWidth={2} />
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#6b8e4e] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.number}
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm mt-3">{step.title}</h4>
                        <p className="font-bold text-gray-900 text-sm">{step.subtitle}</p>
                      </div>
                      {idx < 2 && (
                        <div className="absolute top-10 left-full w-6 h-px border-t-2 border-dotted border-gray-300"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
