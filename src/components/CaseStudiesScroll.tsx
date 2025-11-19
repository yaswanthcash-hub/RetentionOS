import { useRef } from 'react';
import { TrendingUp, Users, ShoppingCart, BarChart, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CaseStudiesScroll() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const caseStudies = [
    {
      icon: TrendingUp,
      brand: 'Mamaearth',
      industry: 'Beauty & Personal Care',
      challenge: 'With rapid growth from ₹10Cr to ₹100Cr+ ARR, customer engagement was dropping and repeat purchase rates weren\'t scaling with acquisition spend.',
      solution: 'Built a complete lifecycle retention system: WhatsApp post-purchase journeys, personalized email product recommendations based on skin/hair type, SMS flash sales for specific product lines.',
      results: [
        { metric: 'Repeat Rate', value: '18% → 34%', growth: '+89%' },
        { metric: 'WhatsApp ROI', value: '₹47L/month', growth: '12:1 return' },
        { metric: 'Customer LTV', value: '₹2,800 → ₹5,200', growth: '+86%' },
      ],
      timeframe: '90 days',
      testimonial: '"The retention flows transformed how we engage customers post-purchase. WhatsApp alone recovered ₹47L in the first 90 days."',
      author: 'Growth Marketing Lead',
    },
    {
      icon: Users,
      brand: 'The Souled Store',
      industry: 'Fashion & Lifestyle',
      challenge: 'High cart abandonment (68%) and inactive customer database of 50K+ who hadn\'t purchased in 6+ months. Seasonal collections weren\'t reaching past buyers.',
      solution: 'Deployed aggressive cart recovery via SMS + WhatsApp, win-back campaigns with exclusive discounts, VIP early access flows for top customers.',
      results: [
        { metric: 'Cart Recovery', value: '₹18.2L/month', growth: '23% recovery rate' },
        { metric: 'Reactivation', value: '14,200 customers', growth: '28% win-back' },
        { metric: 'Email Revenue', value: '₹32L/month', growth: '38% of total' },
      ],
      timeframe: '120 days',
      testimonial: '"We reactivated 14,200 dormant customers in 4 months. The automated flows now run 24/7 bringing back buyers we thought we\'d lost."',
      author: 'Head of Digital Marketing',
    },
    {
      icon: ShoppingCart,
      brand: 'HealthKart',
      industry: 'Health & Supplements',
      challenge: 'Subscription business was bleeding with 42% monthly churn. Customers weren\'t forming habits around supplement routines, leading to cancellations.',
      solution: 'Created subscription retention flows: automated refill reminders, educational content about product benefits, usage tracking via WhatsApp check-ins.',
      results: [
        { metric: 'Churn Rate', value: '42% → 19%', growth: '-55% drop' },
        { metric: 'MRR Growth', value: '₹28L → ₹67L', growth: '+139%' },
        { metric: 'Engagement', value: '71% open rate', growth: '3.2x industry avg' },
      ],
      timeframe: '150 days',
      testimonial: '"We cut subscription churn in half and doubled MRR. The educational flows helped customers actually stick to their health goals."',
      author: 'VP of Retention',
    },
    {
      icon: BarChart,
      brand: 'Bombay Shaving Company',
      industry: 'Men\'s Grooming',
      challenge: 'One-time buyers dominated (82% of customers). Needed to build a subscription model and increase purchase frequency for premium grooming products.',
      solution: 'Launched subscription conversion flows, auto-replenishment programs with discounts, grooming routine education series, and personalized product bundles.',
      results: [
        { metric: 'Subscription %', value: '9% → 31%', growth: '+244%' },
        { metric: 'AOV Increase', value: '₹890 → ₹1,420', growth: '+60%' },
        { metric: 'Repeat Revenue', value: '₹24L/month', growth: 'From subscriptions' },
      ],
      timeframe: '180 days',
      testimonial: '"The subscription conversion flows are printing money. We went from 9% to 31% subscription mix in 6 months."',
      author: 'Co-Founder & CMO',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="case-studies" className="py-16 sm:py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-3 sm:mb-4">
            Case Studies from Leading Indian Brands
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            See how top D2C brands used retention marketing to scale repeat revenue, reduce churn, and maximize customer lifetime value
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 pb-4">
              {caseStudies.map((study, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[85vw] sm:w-[450px] md:w-[500px] snap-start"
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex-shrink-0">
                          <study.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                            {study.brand}
                          </h3>
                          <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                            {study.industry}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-4">
                        <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                            Challenge
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                            {study.challenge}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                            Solution
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                            {study.solution}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                          Results ({study.timeframe})
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-2">
                              <div className="text-xs text-gray-500 mb-1 truncate">{result.metric}</div>
                              <div className="text-sm font-bold text-gray-900 mb-1">{result.value}</div>
                              <div className="text-xs font-semibold text-primary-600">{result.growth}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-primary-50 border-l-4 border-primary-500 rounded">
                        <p className="text-xs text-gray-700 italic mb-1 line-clamp-2">{study.testimonial}</p>
                        <p className="text-xs font-semibold text-gray-600">— {study.author}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
            <p className="text-white text-xl mb-2 font-semibold">
              Want to see similar results for your brand?
            </p>
            <p className="text-gray-300 mb-6 text-sm">
              Get a free retention audit and discover where you're leaving money on the table
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
