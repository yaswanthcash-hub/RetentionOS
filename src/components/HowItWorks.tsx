import { BarChart3, MessageCircle, Map, Lightbulb, ShoppingCart, CreditCard, Heart, RotateCcw, Smartphone } from 'lucide-react';

export default function HowItWorks() {
  const phases = [
    {
      title: 'Phase 1:',
      subtitle: 'Map Repeat Purchase Journey',
      steps: [
        {
          icon: BarChart3,
          number: '1',
          title: 'Analyze',
          subtitle: 'Repeat Patterns',
          description: 'Identify which products, customers, and behaviors will most likely repeat.'
        },
        {
          icon: MessageCircle,
          number: '2',
          title: 'Decode',
          subtitle: 'Voice Of Customer',
          description: 'Discover what customers love (to amplify it) and uncover what\'s stopping them from repurchasing.'
        },
        {
          icon: Map,
          number: '3',
          title: 'Map',
          subtitle: 'Customer Journey',
          description: 'Plan a clear journey, messaging, offers, and channels for each customer segment.'
        }
      ]
    },
    {
      title: 'Phase 2:',
      subtitle: 'Activate Repeat Purchases',
      steps: [
        {
          icon: Lightbulb,
          number: '4',
          title: 'Nurture',
          subtitle: 'Buyers',
          description: 'Prepare each customer segment for their next order with product education and brand trust building.'
        },
        {
          icon: ShoppingCart,
          number: '5',
          title: 'Accelerate',
          subtitle: 'Re-Orders',
          description: 'Nudge your buyers with restock alerts and cross-sell around hero SKUs to shorten the gap between orders.'
        },
        {
          icon: CreditCard,
          number: '6',
          title: 'Scale',
          subtitle: 'Subscriptions',
          description: 'Convert buyers into paid subscribers through perk-stacked onboarding and loyalty rewards.'
        }
      ]
    },
    {
      title: 'Phase 3:',
      subtitle: 'Sustain Repeat Purchases',
      steps: [
        {
          icon: Heart,
          number: '7',
          title: 'Cultivate',
          subtitle: 'Loyal Customers',
          description: 'Orchestrate loyal behavior through VIP tier perks, surprise gifts, and status cues.'
        },
        {
          icon: RotateCcw,
          number: '8',
          title: 'Reactivate',
          subtitle: 'Customers',
          description: 'Empathetic check-ins, tailored offers, and founder notes to reactivate lapsed segments.'
        },
        {
          icon: Smartphone,
          number: '9',
          title: 'Activate',
          subtitle: 'Omni Channels',
          description: 'Reinforce repeat purchase behavior via SMS, WhatsApp, push, onsite, and direct mail.'
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                <span className="bg-primary-500 text-gray-900 px-2">{phase.title}</span> {phase.subtitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {phase.steps.map((step, stepIndex) => {
                const Icon = step.icon;
                return (
                  <div key={stepIndex} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary-700" strokeWidth={2} />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {step.number}. {step.title}
                    </h3>
                    <h4 className="text-base font-bold text-gray-900 mb-3">
                      {step.subtitle}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
