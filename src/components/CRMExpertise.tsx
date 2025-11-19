export default function CRMExpertise() {
  const platforms = [
    {
      name: 'WebEngage',
      tagline: 'Full-Stack Marketing Automation',
      strengths: [
        'Advanced customer journey orchestration',
        'Real-time personalization engine',
        'Multi-channel campaign automation',
        'Behavioral segmentation & analytics'
      ],
      expertise: [
        'WhatsApp marketing automation flows',
        'Cross-channel retention campaigns',
        'Dynamic product recommendations',
        'Cart abandonment & win-back workflows'
      ],
      integrations: ['Shopify', 'WooCommerce', 'Custom APIs', 'Google Analytics', 'Facebook Ads']
    },
    {
      name: 'MoEngage',
      tagline: 'Intelligent Customer Engagement',
      strengths: [
        'AI-powered customer insights',
        'Omnichannel campaign orchestration',
        'Predictive analytics & segmentation',
        'Push notification optimization'
      ],
      expertise: [
        'Lifecycle marketing automation',
        'Churn prediction & prevention campaigns',
        'RFM-based segmentation strategies',
        'App engagement & retention flows'
      ],
      integrations: ['Mobile SDK', 'Segment', 'Clevertap', 'Branch', 'AppsFlyer']
    },
    {
      name: 'CleverTap',
      tagline: 'Retention Cloud Platform',
      strengths: [
        'Real-time user analytics',
        'Behavioral cohort analysis',
        'Automated campaign workflows',
        'In-app messaging & personalization'
      ],
      expertise: [
        'Mobile-first retention strategies',
        'Event-triggered campaign automation',
        'User journey mapping & optimization',
        'A/B testing & experimentation'
      ],
      integrations: ['Firebase', 'Amplitude', 'Mixpanel', 'Adjust', 'Kochava']
    },
    {
      name: 'Zoho CRM',
      tagline: 'Complete CRM Solution',
      strengths: [
        'Sales pipeline management',
        'Lead scoring & qualification',
        'Workflow automation',
        'Custom module creation'
      ],
      expertise: [
        'Sales automation & lead nurturing',
        'Custom CRM implementation',
        'Multi-channel lead capture',
        'Sales reporting & forecasting'
      ],
      integrations: ['Zoho Suite', 'Google Workspace', 'Microsoft 365', 'Mailchimp', 'QuickBooks']
    },
    {
      name: 'HubSpot CRM',
      tagline: 'Inbound Marketing & Sales',
      strengths: [
        'Unified marketing & sales platform',
        'Content management & SEO',
        'Email marketing automation',
        'Deal pipeline tracking'
      ],
      expertise: [
        'Inbound marketing strategy',
        'Lead nurturing workflows',
        'Marketing attribution modeling',
        'Sales enablement automation'
      ],
      integrations: ['Salesforce', 'WordPress', 'Slack', 'Zoom', 'Stripe']
    },
    {
      name: 'Aisency',
      tagline: 'AI-Powered Marketing Platform',
      strengths: [
        'AI-driven campaign optimization',
        'Intelligent customer segmentation',
        'Automated content generation',
        'Predictive analytics'
      ],
      expertise: [
        'AI-powered retention strategies',
        'Smart campaign orchestration',
        'Machine learning segmentation',
        'Automated personalization at scale'
      ],
      integrations: ['E-commerce platforms', 'Marketing clouds', 'Analytics tools', 'CDPs']
    }
  ];

  const clientBrands = [
    { name: 'Mamaearth', category: 'Beauty & Personal Care' },
    { name: 'The Man Company', category: 'Men\'s Grooming' },
    { name: 'Nykaa', category: 'Beauty E-commerce' },
    { name: 'Sugar Cosmetics', category: 'Cosmetics' },
    { name: 'mCaffeine', category: 'Personal Care' },
    { name: 'Plum', category: 'Beauty & Wellness' },
    { name: 'WOW Skin Science', category: 'Skincare' },
    { name: 'Beardo', category: 'Men\'s Grooming' },
    { name: 'Pilgrim', category: 'Personal Care' },
    { name: 'Juicy Chemistry', category: 'Organic Beauty' },
    { name: 'Minimalist', category: 'Skincare' },
    { name: 'Dot & Key', category: 'Skincare' }
  ];

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary-100 text-primary-900 rounded-full text-sm font-semibold mb-6">
            Platform Expertise
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-6">
            Multi-Platform CRM Mastery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep technical expertise across leading customer engagement platforms, enabling us to build retention systems that scale
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary-200 group"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                    {platform.name}
                  </h3>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {platform.name.charAt(0)}
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">{platform.tagline}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Platform Strengths
                </h4>
                <ul className="space-y-2">
                  {platform.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-primary-500 mr-2 mt-0.5">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Our Expertise
                </h4>
                <ul className="space-y-2">
                  {platform.expertise.map((exp, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-primary-600 mr-2 mt-0.5">→</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  Key Integrations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {platform.integrations.map((integration, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-10 sm:p-12 shadow-lg border-2 border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              Trusted by Leading D2C Brands
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've implemented retention systems across multiple platforms for India's fastest-growing consumer brands
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {clientBrands.map((brand, index) => (
              <div
                key={index}
                className="group text-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-bold text-xl group-hover:from-primary-100 group-hover:to-primary-200 group-hover:text-primary-700 transition-all duration-300 shadow-sm group-hover:shadow-md">
                  {brand.name.charAt(0)}
                </div>
                <div className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-primary-700 transition-colors">
                  {brand.name}
                </div>
                <div className="text-xs text-gray-500">{brand.category}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border-2 border-primary-100">
            <div className="text-4xl font-bold text-primary-700 mb-2">6+</div>
            <div className="text-gray-900 font-semibold mb-2">CRM Platforms Mastered</div>
            <div className="text-sm text-gray-600">
              Deep technical expertise across all major customer engagement platforms
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100">
            <div className="text-4xl font-bold text-blue-700 mb-2">500+</div>
            <div className="text-gray-900 font-semibold mb-2">Automated Workflows</div>
            <div className="text-sm text-gray-600">
              Built and optimized across all platforms for maximum retention
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100">
            <div className="text-4xl font-bold text-green-700 mb-2">50+</div>
            <div className="text-gray-900 font-semibold mb-2">Platform Integrations</div>
            <div className="text-sm text-gray-600">
              Seamlessly connected CRMs with e-commerce, analytics, and ad platforms
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10 sm:p-12 text-white text-center">
          <h3 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Platform-Agnostic Retention Expertise
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            We don't just know the tools—we know how to orchestrate them to drive measurable retention results. Whether you're on one platform or managing multiple, we build systems that work.
          </p>
          <a
            href="https://calendly.com/hi-retentionos/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-black font-semibold rounded-full hover:bg-primary-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Discuss Your CRM Stack
          </a>
        </div>
      </div>
    </section>
  );
}
