'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import CurrencySelector from '@/components/CurrencySelector';

type ToolCategory = 'all' | 'audit' | 'financial' | 'retention' | 'loyalty' | 'marketing' | 'segmentation' | 'ecommerce' | 'benchmarking' | 'advanced';

interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: ToolCategory;
}

const tools: Tool[] = [
  // FINANCIAL METRICS (7)
  { slug: 'clv-calculator', title: 'Customer Lifetime Value (CLV) Calculator', description: 'Precisely measure the total revenue potential of your customer relationships over time', icon: '💎', category: 'financial' },
  { slug: 'cac-calculator', title: 'Customer Acquisition Cost (CAC) Calculator', description: 'Determine your true cost per customer acquisition across all marketing channels', icon: '💵', category: 'financial' },
  { slug: 'ltv-cac-ratio', title: 'LTV:CAC Ratio Calculator', description: 'Assess business sustainability by measuring customer value against acquisition costs', icon: '⚖️', category: 'financial' },
  { slug: 'roi-calculator', title: 'ROI Impact Projector', description: 'Model the financial impact of retention improvements on your bottom line', icon: '💰', category: 'financial' },
  { slug: 'payback-period', title: 'Payback Period Calculator', description: 'Calculate the timeline to recover your customer acquisition investment', icon: '⏱️', category: 'financial' },
  { slug: 'aov-calculator', title: 'Average Order Value (AOV) Calculator', description: 'Optimize transaction value and identify upselling opportunities', icon: '🛒', category: 'financial' },
  { slug: 'revenue-per-user', title: 'Revenue Per User Calculator', description: 'Track average revenue generation per customer for performance benchmarking', icon: '📊', category: 'financial' },
  // AUDIT TOOLS (2)
  { slug: 'retention-audit', title: 'Retention Health Audit', description: 'Discovery call-ready audit with instant insights, benchmarks, and actionable recommendations', icon: '🎯', category: 'audit' },
  { slug: 'enhanced-audit', title: 'Enhanced Retention Intelligence Audit', description: 'Most advanced audit tool with predictive analytics, 50+ page report, and consultant-grade insights', icon: '🏆', category: 'audit' },
  // RETENTION METRICS (9)
  { slug: 'retention-rate', title: 'Customer Retention Rate Calculator', description: 'Measure the percentage of customers retained over specific timeframes', icon: '🔄', category: 'retention' },
  { slug: 'churn-rate', title: 'Churn Rate Calculator', description: 'Identify customer attrition patterns and quantify revenue leakage', icon: '📉', category: 'retention' },
  { slug: 'net-revenue-retention', title: 'Net Revenue Retention (NRR) Calculator', description: 'Evaluate revenue expansion from your existing customer base', icon: '📈', category: 'retention' },
  { slug: 'repeat-purchase-rate', title: 'Repeat Purchase Rate Calculator', description: 'Analyze customer loyalty through repeat transaction frequency', icon: '🔁', category: 'retention' },
  { slug: 'purchase-frequency', title: 'Purchase Frequency Calculator', description: 'Determine average buying cadence to optimize engagement strategies', icon: '📅', category: 'retention' },
  { slug: 'customer-lifespan', title: 'Customer Lifespan Calculator', description: 'Estimate the average duration of customer relationships', icon: '⏳', category: 'retention' },
  { slug: 'cohort-analysis', title: 'Cohort Analysis Tool', description: 'Segment customers by acquisition period to identify behavioral trends', icon: '👥', category: 'retention' },
  { slug: 'retention-curve', title: 'Retention Curve Analyzer', description: 'Visualize customer retention decay patterns over time', icon: '📉', category: 'retention' },
  { slug: 'win-back-calculator', title: 'Win-Back Campaign Calculator', description: 'Calculate ROI potential of re-engaging lapsed customers', icon: '🎯', category: 'retention' },
  // LOYALTY & SATISFACTION (6)
  { slug: 'nps-calculator', title: 'Net Promoter Score (NPS) Calculator', description: 'Measure customer loyalty and predict organic growth potential', icon: '⭐', category: 'loyalty' },
  { slug: 'csat-calculator', title: 'Customer Satisfaction Score (CSAT)', description: 'Quantify customer satisfaction levels across touchpoints', icon: '😊', category: 'loyalty' },
  { slug: 'ces-calculator', title: 'Customer Effort Score (CES) Calculator', description: 'Assess friction points in the customer experience journey', icon: '🎪', category: 'loyalty' },
  { slug: 'loyalty-program-roi', title: 'Loyalty Program ROI Calculator', description: 'Evaluate financial returns on your loyalty and rewards initiatives', icon: '🎁', category: 'loyalty' },
  { slug: 'referral-program', title: 'Referral Program Calculator', description: 'Measure the effectiveness and viral coefficient of referral campaigns', icon: '🤝', category: 'loyalty' },
  { slug: 'engagement-score', title: 'Customer Engagement Score', description: 'Quantify overall engagement levels and identify at-risk segments', icon: '💪', category: 'loyalty' },
  // MARKETING ROI (6)
  { slug: 'email-roi', title: 'Email Marketing ROI Calculator', description: 'Calculate comprehensive returns on email campaign investments', icon: '📧', category: 'marketing' },
  { slug: 'sms-roi', title: 'SMS Marketing ROI Calculator', description: 'Measure profitability of SMS and text message campaigns', icon: '📱', category: 'marketing' },
  { slug: 'content-roi', title: 'Content Marketing ROI Calculator', description: 'Assess the financial impact of content marketing initiatives', icon: '📝', category: 'marketing' },
  { slug: 'influencer-roi', title: 'Influencer Marketing ROI Calculator', description: 'Evaluate returns from influencer partnerships and collaborations', icon: '🌟', category: 'marketing' },
  { slug: 'channel-attribution', title: 'Channel Attribution Calculator', description: 'Determine which marketing channels drive the most valuable customers', icon: '🎯', category: 'marketing' },
  { slug: 'subscriber-acquisition', title: 'Subscriber Acquisition Cost Calculator', description: 'Calculate cost efficiency of email and SMS list building', icon: '✉️', category: 'marketing' },
  // CUSTOMER ANALYTICS (8)
  { slug: 'rfm-segmentation', title: 'RFM Segmentation Tool', description: 'Segment customers by Recency, Frequency, and Monetary value for targeted strategies', icon: '🎲', category: 'segmentation' },
  { slug: 'segment-profitability', title: 'Segment Profitability Calculator', description: 'Identify which customer segments generate the highest margins', icon: '💹', category: 'segmentation' },
  { slug: 'product-affinity', title: 'Product Affinity Analyzer', description: 'Discover cross-sell opportunities through purchase pattern analysis', icon: '🔗', category: 'segmentation' },
  { slug: 'customer-health-score', title: 'Customer Health Score Calculator', description: 'Develop a composite metric to predict customer relationship strength', icon: '❤️', category: 'segmentation' },
  { slug: 'predictive-churn', title: 'Predictive Churn Model', description: 'Identify at-risk customers before they leave using behavioral signals', icon: '🔮', category: 'advanced' },
  { slug: 'benchmarking-dashboard', title: 'Industry Benchmarking Dashboard', description: 'Compare your metrics against industry standards and competitors', icon: '📊', category: 'benchmarking' },
  { slug: 'cart-abandonment', title: 'Cart Abandonment Calculator', description: 'Quantify revenue loss and optimize recovery campaigns', icon: '🛒', category: 'ecommerce' },
  { slug: 'mrr-growth', title: 'MRR Growth Calculator', description: 'Track Monthly Recurring Revenue trends and expansion metrics', icon: '📈', category: 'financial' },
  // OPTIMIZATION & TESTING (5)
  { slug: 'ab-test-calculator', title: 'A/B Test Significance Calculator', description: 'Determine statistical significance and required sample sizes for tests', icon: '🧪', category: 'advanced' },
  { slug: 'conversion-optimization', title: 'Conversion Rate Optimizer', description: 'Model the revenue impact of conversion rate improvements', icon: '📈', category: 'ecommerce' },
  { slug: 'viral-coefficient', title: 'Viral Coefficient Calculator', description: 'Measure the viral growth potential of your product or service', icon: '🚀', category: 'advanced' },
  { slug: 'k-factor', title: 'K-Factor Calculator', description: 'Calculate viral growth rate through customer referrals', icon: '📊', category: 'advanced' },
  { slug: 'inventory-turnover', title: 'Inventory Turnover Calculator', description: 'Optimize stock levels and identify slow-moving products', icon: '📦', category: 'ecommerce' },
];

const categories = [
  { value: 'all', label: 'All Tools', icon: '📦' },
  { value: 'audit', label: 'Audit Tools', icon: '🔍' },
  { value: 'financial', label: 'Financial Metrics', icon: '💰' },
  { value: 'retention', label: 'Retention & Churn', icon: '🔄' },
  { value: 'loyalty', label: 'Loyalty & Satisfaction', icon: '⭐' },
  { value: 'marketing', label: 'Marketing ROI', icon: '📧' },
  { value: 'segmentation', label: 'Customer Analytics', icon: '🎲' },
  { value: 'ecommerce', label: 'Ecommerce', icon: '🛍️' },
  { value: 'benchmarking', label: 'Benchmarking', icon: '📊' },
  { value: 'advanced', label: 'Advanced Analytics', icon: '🔬' }
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('INR');

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Focus on Tools */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6 relative">
        {/* Currency Selector - Absolute Positioned */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <span className="text-sm text-gray-200 font-medium">Display Currency:</span>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="max-w-6xl mx-auto text-center mt-8">
          <div className="inline-block px-6 py-2 rounded-full text-xs font-bold mb-6"
            style={{ background: '#D1F25E', color: '#000' }}>
            100% FREE • NO SIGNUP • NO BS
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            The World's Only Complete
            <br />
            <span style={{ color: '#D1F25E' }}>Retention Analytics Toolkit</span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            43+ enterprise-grade calculators, audits, and analytics tools. Everything you need to measure, optimize, and scale customer retention.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-5 border border-white border-opacity-20">
              <div className="text-4xl font-bold mb-1" style={{ color: '#D1F25E' }}>43+</div>
              <div className="text-sm font-medium text-gray-300">Professional Tools</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-5 border border-white border-opacity-20">
              <div className="text-4xl font-bold mb-1" style={{ color: '#D1F25E' }}>100%</div>
              <div className="text-sm font-medium text-gray-300">Privacy First</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search calculators..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-lime-400 focus:outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-3">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value as ToolCategory)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedCategory === cat.value
                    ? 'shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  style={selectedCategory === cat.value ? { background: '#D1F25E', color: '#000' } : {}}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-600">
              Showing <span style={{ color: '#BFE043' }}>{filteredTools.length}</span> of {tools.length} tools
            </span>
          </div>
        </div>
      </div>

      {/* TOOLS GRID - Reduced Padding */}
      <div id="tools" className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          {selectedCategory === 'all' ? 'All Tools' : categories.find(c => c.value === selectedCategory)?.label}
        </h2>

        {filteredTools.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-gray-200 hover:border-lime-400"
              >
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-lime-600 transition leading-tight">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    {tool.category}
                  </span>
                  <span className="text-sm font-bold group-hover:translate-x-1 transition-transform" style={{ color: '#BFE043' }}>
                    USE NOW →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border-2 border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">No tools found</h3>
            <p className="text-gray-600 mb-6">Try different search terms or clear filters</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              style={{ background: '#D1F25E', color: '#000' }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* VALUE PROP */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Why RetentionOS</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                style={{ background: '#D1F25E' }}>🎯</div>
              <h3 className="font-bold mb-3 text-xl text-gray-900">Complete Coverage</h3>
              <p className="text-gray-600 leading-relaxed">
                43+ specialized calculators covering every retention metric from CLV to predictive churn.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                style={{ background: '#D1F25E' }}>💡</div>
              <h3 className="font-bold mb-3 text-xl text-gray-900">Actionable Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Industry benchmarks, expert recommendations, and specific next steps with every calculation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
                style={{ background: '#D1F25E' }}>🔒</div>
              <h3 className="font-bold mb-3 text-xl text-gray-900">Privacy First</h3>
              <p className="text-gray-600 leading-relaxed">
                All calculations run in your browser. Your data never leaves your device.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white py-12 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-6">Trusted by retention professionals worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 items-center text-gray-400 text-sm font-semibold">
            <div>E-commerce</div>
            <div>D2C Brands</div>
            <div>SaaS</div>
            <div>Subscriptions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
