import { Check, X, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '₹25,000',
      period: '/month',
      description: 'Best for brands doing ₹5-15L monthly revenue who want to start retention right',
      features: [
        'Email automation (up to 10,000 contacts)',
        'SMS campaigns (1,000 messages/month)',
        'Basic segmentation',
        'Welcome & cart abandonment flows',
        '5 pre-built templates',
        'Email support',
        'Monthly performance reports',
      ],
      notIncluded: [
        'WhatsApp marketing',
        'Advanced segmentation',
        'Custom integrations',
        'Dedicated account manager',
      ],
      popular: false,
      ctaText: 'Start Retaining Customers',
    },
    {
      name: 'Growth',
      price: '₹65,000',
      period: '/month',
      description: 'Best for scaling brands doing ₹15-50L monthly who are serious about LTV',
      features: [
        'Email automation (up to 50,000 contacts)',
        'SMS campaigns (5,000 messages/month)',
        'WhatsApp campaigns (2,000 messages/month)',
        'Advanced segmentation & RFM analysis',
        'All automation flows + custom flows',
        '20+ pre-built templates',
        'Priority support',
        'Weekly performance reports',
        'Quarterly strategy sessions',
      ],
      notIncluded: [
        'Dedicated Slack channel',
        'Custom API integrations',
      ],
      popular: true,
      ctaText: 'Scale Your Retention',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Best for established brands doing ₹50L+ who need white-glove service',
      features: [
        'Unlimited email automation',
        'Unlimited SMS campaigns',
        'Unlimited WhatsApp campaigns',
        'Full segmentation suite with predictive analytics',
        'Fully custom automation workflows',
        'Unlimited templates & designs',
        'Dedicated account manager',
        'Real-time reporting dashboard',
        'Weekly strategy calls',
        'Dedicated Slack channel',
        'Custom API integrations',
        'Multi-brand management',
      ],
      notIncluded: [],
      popular: false,
      ctaText: 'Let\'s Talk Custom',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Pricing That Scales With Your Revenue
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No surprises. No hidden fees. No paying for contacts who never buy. Choose the plan that fits where you are today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-8 ${
                plan.popular
                  ? 'border-primary-500 shadow-xl scale-105'
                  : 'border-gray-200 hover:border-primary-300 hover:shadow-lg'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-heading font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600">{plan.period}</span>
                  )}
                </div>
              </div>

              <a
                href="https://calendly.com/hi-retentionos/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-full font-semibold transition-all duration-300 mb-6 flex items-center justify-center gap-2 group hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#2dd4bf] to-[#1e3a5f] text-white hover:from-[#26b8a5] hover:to-[#172e4a] hover:shadow-lg hover:shadow-teal-500/30'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 opacity-50">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500 text-sm line-through">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-2xl p-8 border border-primary-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-heading font-bold text-gray-900 mb-2">
                90-Day Revenue Guarantee
              </div>
              <p className="text-gray-600">If we don't increase your repeat revenue, we'll refund 100% of your fees</p>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-gray-900 mb-2">
                No Setup Fees
              </div>
              <p className="text-gray-600">Start today, pay monthly, cancel anytime with 30 days notice</p>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-gray-900 mb-2">
                ROI Tracking Included
              </div>
              <p className="text-gray-600">See exactly what you're getting for every rupee spent</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
