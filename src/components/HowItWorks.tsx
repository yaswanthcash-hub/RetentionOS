export default function HowItWorks() {
  const phases = [
    {
      title: 'Phase 1:',
      subtitle: 'Map Repeat Purchase Journey',
      steps: [
        {
          number: '1',
          title: 'Analyze',
          subtitle: 'Repeat Patterns',
          description: 'Identify which products, customers, and behaviors will most likely repeat.'
        },
        {
          number: '2',
          title: 'Decode',
          subtitle: 'Voice of Customer',
          description: 'Discover what customers love (to amplify it) and uncover what\'s stopping them from repurchasing.'
        },
        {
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
          number: '4',
          title: 'Nurture',
          subtitle: 'Buyers',
          description: 'Prepare each customer segment for their next order with product education and brand trust building.'
        },
        {
          number: '5',
          title: 'Accelerate',
          subtitle: 'Re-orders',
          description: 'Nudge your buyers with restock alerts and cross-sell around hero SKUs to shorten the gap between orders.'
        },
        {
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
          number: '7',
          title: 'Cultivate',
          subtitle: 'Loyal Customers',
          description: 'Orchestrate loyal behavior through VIP tier perks, surprise gifts, and status cues.'
        },
        {
          number: '8',
          title: 'Reactivate',
          subtitle: 'Customers',
          description: 'Empathetic check-ins, tailored offers, and founder notes to reactivate lapsed segments.'
        },
        {
          number: '9',
          title: 'Activate',
          subtitle: 'Omni Channels',
          description: 'Reinforce repeat purchase behavior via SMS, WhatsApp, push, onsite, and direct mail.'
        }
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
                <span className="text-orange-500">{phase.title}</span> {phase.subtitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {phase.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <img
                        src="/public/image copy copy copy copy copy copy copy copy.png"
                        alt={step.title}
                        className="w-6 h-6"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
                    {step.number}. {step.title}
                  </h3>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">
                    {step.subtitle}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-16">
          <a
            href="https://calendly.com/hi-retentionos/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            BOOK YOUR RETENTION STRATEGY SESSION
          </a>
        </div>
      </div>
    </section>
  );
}
