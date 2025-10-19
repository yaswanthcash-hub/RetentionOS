import { Mail, MessageSquare, Smartphone, Zap, Target, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: 'WhatsApp Marketing That Converts',
      description: 'Stop letting Instagram DMs go unanswered. Automate conversations, send order updates, and run campaigns on the platform your customers actually check. From cart recovery to loyalty programs.',
      stats: '5x vs email',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email Flows That Print Money',
      description: 'From welcome series to win-back campaigns, every email is designed to drive action—not just sit in an inbox. Beautiful templates, zero coding required. Average 8x ROI.',
      stats: '8x ROI',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Smartphone,
      title: 'SMS That Gets Read (And Clicked)',
      description: 'High-urgency messages for flash sales, abandoned carts, and delivery updates. DLT-compliant, pre-approved templates, ready to send. Delivered in under 5 seconds.',
      stats: '<5 sec delivery',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Zap,
      title: 'Set-and-Forget Automation',
      description: 'Pre-built workflows for cart recovery, post-purchase nurture, VIP journeys, and re-engagement. Launch in minutes, earn revenue 24/7. No manual work required.',
      stats: 'No manual work',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Target,
      title: 'Segmentation That Actually Works',
      description: 'RFM analysis, purchase behavior triggers, lifecycle stages. Send the right message to the right customer at the perfect time. 12+ pre-built segment types.',
      stats: '12+ segments',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: TrendingUp,
      title: 'Revenue Dashboard (Finally)',
      description: 'See which campaigns make money and which ones don\'t. Real-time attribution, channel performance, and ROI tracking in one clean dashboard with live data sync.',
      stats: 'Live data',
      color: 'from-cyan-500 to-teal-600'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            The Complete Retention Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to turn one-time buyers into repeat customers—without duct-taping together a dozen platforms.
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

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-primary-500 rounded-2xl text-black hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-heading font-bold mb-2">₹50Cr+</div>
            <div className="text-black/80 mb-2 font-semibold">Revenue Unlocked</div>
            <p className="text-black/70 text-sm">
              For our clients across industries
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl text-white hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-heading font-bold mb-2">3.2x</div>
            <div className="text-gray-100 mb-2 font-semibold">Average LTV Increase</div>
            <p className="text-gray-300 text-sm">
              In the first 90 days of partnership
            </p>
          </div>
          <div className="p-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl text-white hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-heading font-bold mb-2">94%</div>
            <div className="text-white/90 mb-2 font-semibold">Client Retention Rate</div>
            <p className="text-white/70 text-sm">
              We practice what we preach
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
