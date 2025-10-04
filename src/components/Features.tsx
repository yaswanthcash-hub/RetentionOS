import { Mail, MessageSquare, Smartphone, Zap, Target, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: 'WhatsApp Marketing',
      description: 'Connect with customers on their favorite platform. Automated flows, broadcasts, and 1-on-1 conversations that drive repeat purchases.',
      stats: '78% open rate',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Smartphone,
      title: 'SMS Campaigns',
      description: 'High-impact SMS marketing for order updates, abandoned cart recovery, and exclusive offers. DLT compliant and ready to deploy.',
      stats: '94% read rate',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Automation',
      description: 'Beautiful, conversion-optimized emails that land in the inbox. Welcome series, win-back campaigns, and personalized recommendations.',
      stats: '32% conversion',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Smart Automation',
      description: 'Set it and forget it. Pre-built flows for cart abandonment, post-purchase nurture, re-engagement, and VIP customer journeys.',
      stats: '24/7 automated',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Target,
      title: 'Precision Segmentation',
      description: 'Target the right customers with the right message. RFM analysis, behavioral triggers, and dynamic segments based on purchase history.',
      stats: '3x relevance',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: TrendingUp,
      title: 'Revenue Attribution',
      description: 'Know exactly what drives revenue. Real-time dashboards, channel attribution, and ROI tracking for every campaign and flow.',
      stats: 'Full visibility',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Everything you need to retain customers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful retention marketing tools built specifically for Indian D2C brands. No complex setup. No learning curve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white border border-gray-200 rounded-2xl hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-primary-500 mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-heading font-bold text-gray-900">{feature.title}</h3>
                  <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-1 rounded-full">
                    {feature.stats}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-primary-500 rounded-2xl text-black">
            <div className="text-4xl font-heading font-bold mb-2">₹50Cr+</div>
            <div className="text-black/80 mb-4">Revenue Generated</div>
            <p className="text-black/70 text-sm">
              Proven retention marketing strategies driving measurable growth
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl text-white">
            <div className="text-4xl font-heading font-bold mb-2">17+</div>
            <div className="text-blue-100 mb-4">Brands Served</div>
            <p className="text-blue-50 text-sm">
              Trusted by leading businesses for retention excellence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
