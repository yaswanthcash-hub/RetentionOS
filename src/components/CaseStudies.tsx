import { TrendingUp, Users, ShoppingCart, BarChart } from 'lucide-react';

export default function CaseStudies() {
  const caseStudies = [
    {
      icon: TrendingUp,
      brand: 'Ayurvedic Beauty Co.',
      industry: 'Beauty & Wellness',
      challenge: 'Low repeat purchase rate of 12% and high customer acquisition costs making growth unsustainable.',
      solution: 'Implemented targeted email flows, WhatsApp cart recovery, and post-purchase nurture sequences with personalized product recommendations.',
      results: [
        { metric: 'Repeat Rate', value: '12% → 38%', growth: '+217%' },
        { metric: 'Cart Recovery', value: '₹2.4L/month', growth: 'New Revenue' },
        { metric: 'Customer LTV', value: '₹4,200 → ₹8,900', growth: '+112%' },
      ],
      timeframe: '90 days',
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: Users,
      brand: 'Fashion Forward',
      industry: 'Apparel & Accessories',
      challenge: 'Struggling to re-engage inactive customers and missing revenue from seasonal collections.',
      solution: 'Built automated win-back campaigns, VIP customer journeys, and SMS flash sale notifications with exclusive offers.',
      results: [
        { metric: 'Reactivation', value: '28% win-back', growth: '1,200 customers' },
        { metric: 'Email Revenue', value: '₹12.5L/month', growth: '42% of total' },
        { metric: 'SMS ROI', value: '18:1 return', growth: 'Best channel' },
      ],
      timeframe: '120 days',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: ShoppingCart,
      brand: 'Wellness Hub',
      industry: 'Health & Supplements',
      challenge: 'Subscription churn rate of 35% causing revenue instability and forecasting difficulties.',
      solution: 'Created subscription retention flows, automated refill reminders, and educational content series to build product habits.',
      results: [
        { metric: 'Churn Rate', value: '35% → 18%', growth: '-49% drop' },
        { metric: 'Subscription Value', value: '₹18L → ₹34L', growth: '+89%' },
        { metric: 'Engagement', value: '64% open rate', growth: '2.5x industry' },
      ],
      timeframe: '180 days',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <section id="case-studies" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Case study of Real results from real brands
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Indian D2C brands are using retention marketing to drive predictable, sustainable growth
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-8 p-8">
                <div className="md:col-span-1">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${study.color} mb-4`}>
                    <study.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                    {study.brand}
                  </h3>

                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full mb-4">
                    {study.industry}
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <BarChart className="w-4 h-4 text-primary-600" />
                      <span className="font-semibold">{study.timeframe} to results</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Challenge
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Solution
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {study.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                      Results
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <div className="text-xs text-gray-500 mb-1">{result.metric}</div>
                          <div className="text-lg font-bold text-gray-900 mb-1">{result.value}</div>
                          <div className="text-xs font-semibold text-primary-600">{result.growth}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Want to see similar results for your brand?
          </p>
          <a
            href="https://calendly.com/hi-retentionos/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            Book Free Audit
          </a>
        </div>
      </div>
    </section>
  );
}
