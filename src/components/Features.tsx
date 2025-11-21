import { ClipboardList, Wallet, RefreshCw, Gift, TrendingUp, BarChart3, Tag, ShoppingBag } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: ClipboardList,
      title: 'Audit & 90-Day Roadmap',
      description: 'Uncover hidden revenue gaps and build a tailored retention roadmap to drive sustainable growth from day one.',
      color: 'from-[#2563EB] to-[#1E40AF]'
    },
    {
      icon: Wallet,
      title: 'Payback Model',
      description: 'Clarify your payback window by channel and improve cash efficiency with smarter acquisition and retention balance.',
      color: 'from-[#10B981] to-[#059669]'
    },
    {
      icon: RefreshCw,
      title: 'Lifecycle Strategy',
      description: 'Craft full-funnel email and SMS flows that nurture, convert, and retain — from welcome to winback.',
      color: 'from-[#3B82F6] to-[#1E40AF]'
    },
    {
      icon: Gift,
      title: 'Subscription Retention & LTV',
      description: 'Boost lifetime value with thoughtful gifting, intuitive account portals, and post-purchase journeys that build trust.',
      color: 'from-[#2563EB] to-[#3B82F6]'
    },
    {
      icon: TrendingUp,
      title: 'Subscriber Growth',
      description: 'Accelerate list growth by optimizing lead capture, popups, and offers designed to convert top-of-funnel traffic.',
      color: 'from-[#F59E0B] to-[#2563EB]'
    },
    {
      icon: BarChart3,
      title: 'Retention KPI Tracking & Analytics',
      description: 'Track what matters most — from churn rate to repeat purchase rate — with dashboards that turn data into action.',
      color: 'from-[#2563EB] to-[#1E40AF]'
    },
    {
      icon: Tag,
      title: 'Offer Testing Strategy',
      description: 'Test and iterate on first-purchase offers that drive conversion and attract customers who actually stick around.',
      color: 'from-[#EF4444] to-[#2563EB]'
    },
    {
      icon: ShoppingBag,
      title: 'Upsells & Cross-sells',
      description: 'Increase AOV and LTV with smart, post-purchase product pairings and contextual upsell opportunities.',
      color: 'from-[#10B981] to-[#2563EB]'
    },
    {
      isReadyToWork: true
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-bold text-lg rounded-lg transform -rotate-1">
              WHAT WE OFFER
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Everything you need to scale your customer retention program
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We are a team of former head of retention leaders who understand that email/sms alone is not enough to scale your retention.
          </p>
          <a
            href="https://calendly.com/hi-retentionos/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-[#D1F26E] font-semibold rounded-full hover:bg-[#D1F26E] hover:text-black hover:shadow-lg hover:shadow-[#D1F26E]/20 transition-all duration-300 hover:scale-105"
          >
            Book a Call
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            if (feature.isReadyToWork) {
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-white border-2 border-gray-900 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-start justify-center"
                >
                  <div className="relative">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4 uppercase tracking-tight">
                      READY TO WORK?
                    </h3>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      Let's get started – book your call today!
                    </p>

                    <a
                      href="https://calendly.com/hi-retentionos/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-[#D1F26E] font-bold rounded-full hover:bg-[#D1F26E] hover:text-black hover:shadow-lg hover:shadow-[#D1F26E]/20 transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      Book a Call
                    </a>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="group relative p-8 bg-white border-2 border-gray-900 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 uppercase">
                    {feature.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
