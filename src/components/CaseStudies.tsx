import { TrendingUp, Users, ShoppingCart, BarChart } from 'lucide-react';

export default function CaseStudies() {
  const caseStudies = [
    {
      icon: TrendingUp,
      brand: 'Mamaearth',
      industry: 'Beauty & Personal Care',
      challenge: 'With rapid growth from ₹10Cr to ₹100Cr+ ARR, customer engagement was dropping and repeat purchase rates weren\'t scaling with acquisition spend.',
      solution: 'Built a complete lifecycle retention system: WhatsApp post-purchase journeys, personalized email product recommendations based on skin/hair type, SMS flash sales for specific product lines, and automated review collection flows.',
      results: [
        { metric: 'Repeat Rate', value: '18% → 34%', growth: '+89%' },
        { metric: 'WhatsApp ROI', value: '₹47L/month', growth: '12:1 return' },
        { metric: 'Customer LTV', value: '₹2,800 → ₹5,200', growth: '+86%' },
      ],
      timeframe: '90 days',
      color: 'from-primary-400 to-primary-600',
      testimonial: '"The retention flows transformed how we engage customers post-purchase. WhatsApp alone recovered ₹47L in the first 90 days."',
      author: 'Growth Marketing Lead',
    },
    {
      icon: Users,
      brand: 'The Souled Store',
      industry: 'Fashion & Lifestyle',
      challenge: 'High cart abandonment (68%) and inactive customer database of 50K+ who hadn\'t purchased in 6+ months. Seasonal collections weren\'t reaching past buyers.',
      solution: 'Deployed aggressive cart recovery via SMS + WhatsApp, win-back campaigns with exclusive discounts, VIP early access flows for top customers, and collection launch automation across all channels.',
      results: [
        { metric: 'Cart Recovery', value: '₹18.2L/month', growth: '23% recovery rate' },
        { metric: 'Reactivation', value: '14,200 customers', growth: '28% win-back' },
        { metric: 'Email Revenue', value: '₹32L/month', growth: '38% of total' },
      ],
      timeframe: '120 days',
      color: 'from-primary-400 to-primary-600',
      testimonial: '"We reactivated 14,200 dormant customers in 4 months. The automated flows now run 24/7 bringing back buyers we thought we\'d lost."',
      author: 'Head of Digital Marketing',
    },
    {
      icon: ShoppingCart,
      brand: 'HealthKart',
      industry: 'Health & Supplements',
      challenge: 'Subscription business was bleeding with 42% monthly churn. Customers weren\'t forming habits around supplement routines, leading to cancellations.',
      solution: 'Created subscription retention flows: automated refill reminders, educational content about product benefits, usage tracking via WhatsApp check-ins, early intervention for at-risk subscribers, and exclusive subscriber-only perks.',
      results: [
        { metric: 'Churn Rate', value: '42% → 19%', growth: '-55% drop' },
        { metric: 'MRR Growth', value: '₹28L → ₹67L', growth: '+139%' },
        { metric: 'Engagement', value: '71% open rate', growth: '3.2x industry avg' },
      ],
      timeframe: '150 days',
      color: 'from-primary-400 to-primary-600',
      testimonial: '"We cut subscription churn in half and doubled MRR. The educational flows helped customers actually stick to their health goals."',
      author: 'VP of Retention',
    },
    {
      icon: BarChart,
      brand: 'Bombay Shaving Company',
      industry: 'Men\'s Grooming',
      challenge: 'One-time buyers dominated (82% of customers). Needed to build a subscription model and increase purchase frequency for premium grooming products.',
      solution: 'Launched subscription conversion flows, auto-replenishment programs with discounts, grooming routine education series, and personalized product bundles based on purchase history via email and WhatsApp.',
      results: [
        { metric: 'Subscription %', value: '9% → 31%', growth: '+244%' },
        { metric: 'AOV Increase', value: '₹890 → ₹1,420', growth: '+60%' },
        { metric: 'Repeat Revenue', value: '₹24L/month', growth: 'From subscriptions' },
      ],
      timeframe: '180 days',
      color: 'from-primary-400 to-primary-600',
      testimonial: '"The subscription conversion flows are printing money. We went from 9% to 31% subscription mix in 6 months."',
      author: 'Co-Founder & CMO',
    },
  ];

  return (
    <section id="case-studies" className="pt-16 sm:pt-20 md:pt-24 pb-16 md:pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Case Studies from Leading Indian Brands
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            See how top D2C brands used retention marketing to scale repeat revenue, reduce churn, and maximize customer lifetime value
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8 p-6 sm:p-8">
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

                  <div className="mt-6 p-4 bg-primary-50 border-l-4 border-primary-500 rounded">
                    <p className="text-sm text-gray-700 italic mb-2">{study.testimonial}</p>
                    <p className="text-xs font-semibold text-gray-600">— {study.author}</p>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <div className="text-xs text-gray-500 mb-1">{result.metric}</div>
                          <div className="text-base sm:text-lg font-bold text-gray-900 mb-1">{result.value}</div>
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
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
            <p className="text-white text-xl mb-2 font-semibold">
              Want to see similar results for your brand?
            </p>
            <p className="text-gray-300 mb-6 text-sm">
              Get a free retention audit and discover where you\'re leaving money on the table
            </p>
            <a
              href="https://calendly.com/hi-retentionos/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-black font-semibold rounded-full hover:bg-primary-600 transition-all duration-300 hover:scale-105"
            >
              Book Your Free Audit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
