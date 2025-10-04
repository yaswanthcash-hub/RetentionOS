import { UserPlus, Settings, Rocket, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Book Free Audit',
      description: 'Share your current retention metrics and challenges. We analyze your customer data and identify quick wins.',
      duration: 'Review in 15 mins',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Settings,
      title: 'Custom Setup',
      description: 'Our team builds tailored automation flows for your brand. We coordinate technical integration with your store.',
      duration: '2-3 days',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Rocket,
      title: 'Launch Campaigns',
      description: 'Activate pre-built flows for cart recovery, win-back, and post-purchase. Start seeing results immediately.',
      duration: 'Day 1',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Scale & Optimize',
      description: 'Monitor real-time performance dashboards. We continuously optimize based on what drives the most revenue.',
      duration: 'Ongoing',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            From setup to revenue in 72 hours
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No technical expertise required. We handle everything from strategy to execution.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-emerald-200 to-orange-200 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full mb-4">
                      {step.duration}
                    </div>

                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <div className="w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-gray-400">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-primary-500 rounded-2xl text-black">
            <div className="text-4xl font-heading font-bold mb-2">₹8.5L</div>
            <div className="text-black/80 mb-4">Average revenue generated in first 90 days</div>
            <p className="text-black/70 text-sm">
              Based on 100+ brands with monthly revenue between ₹10L - ₹50L
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl text-white">
            <div className="text-4xl font-heading font-bold mb-2">60 min</div>
            <div className="text-blue-100 mb-4">That's all it takes to get started</div>
            <p className="text-blue-50 text-sm">
              No complex onboarding. No lengthy training. Start driving revenue today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
