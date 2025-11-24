'use client';

// app/tools/retention-audit/components/AuditForm.tsx
import { useState } from 'react';
import { AuditFormData, AuditResults } from '@/types/audit';
import CurrencySelector from '@/components/CurrencySelector';

interface AuditFormProps {
  onComplete: (results: AuditResults) => void;
}

const INDUSTRIES = [
  'Fashion & Apparel',
  'Beauty & Cosmetics',
  'Health & Wellness',
  'Home & Garden',
  'Electronics',
  'Food & Beverage',
  'Pet Supplies',
  'Jewelry & Accessories',
  'Sports & Outdoors',
  'Other',
];

const INDIA_PLATFORMS = {
  email: ['MoEngage', 'WebEngage', 'Netcore', 'Juvlon', 'Sendgun'],
  sms: ['MSG91', 'Gupshup', 'Kaleyra', 'ValueFirst'],
  reviews: ['Feefo', 'Bazaarvoice'],
  loyalty: ['Capillary', 'Xoxoday', 'Zinrelo', 'Easyrewardz', 'PoshVine'],
  global: ['Klaviyo', 'Mailchimp', 'Attentive', 'Postscript', 'Yotpo', 'Smile.io', 'Other', 'None'],
};

export default function AuditForm({ onComplete }: AuditFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState('INR');
  const [formData, setFormData] = useState<Partial<AuditFormData>>({
    acquisition: 5,
    activation: 5,
    nurture: 5,
    retention: 5,
    winback: 5,
    activeFlows: 5,
    segmentCount: 5,
    personalizationLevel: 'basic',
  });

  const totalSteps = 4;

  const updateField = (field: keyof AuditFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const { generateProfessionalAudit } = await import('@/lib/audit/professional-audit-generator');
      const results = generateProfessionalAudit(formData, currency); // Pass currency
      onComplete(results);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error processing your audit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} updateField={updateField} currency={currency} setCurrency={setCurrency} />;
      case 2:
        return <Step2 formData={formData} updateField={updateField} />;
      case 3:
        return <Step3 formData={formData} updateField={updateField} currency={currency} />;
      case 4:
        return <Step4 formData={formData} updateField={updateField} />;
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.company && formData.industry && formData.monthlyRevenue;
      case 2:
        return formData.name && formData.email && formData.role;
      case 3:
        return formData.averageOrderValue && formData.monthlyCustomers && formData.repeatPurchaseRate;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Enhanced Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-gray-900">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm font-semibold" style={{ color: '#D1F25E' }}>
            {Math.round((step / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full transition-all duration-700 ease-out rounded-full"
            style={{
              width: `${(step / totalSteps) * 100}%`,
              background: 'linear-gradient(90deg, #BFE043 0%, #D1F25E 100%)',
              boxShadow: '0 2px 8px rgba(209, 242, 94, 0.4)'
            }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${s < step ? 'bg-green-500 text-white' :
                s === step ? 'bg-gradient-to-br from-yellow-400 to-lime-400 text-gray-900 shadow-lg scale-110' :
                  'bg-gray-200 text-gray-500'
                }`}>
                {s < step ? '✓' : s}
              </div>
              <span className={`text-xs mt-2 font-medium ${s === step ? 'text-gray-900' : 'text-gray-500'}`}>
                {s === 1 ? 'Company' : s === 2 ? 'Contact' : s === 3 ? 'Metrics' : 'Lifecycle'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 md:p-10">
        {renderStep()}
      </div>

      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
            disabled={loading}
          >
            ← Previous
          </button>
        ) : (
          <div></div>
        )}

        {step < totalSteps ? (
          <button
            onClick={nextStep}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 ${isStepValid()
              ? 'bg-gradient-to-r from-yellow-400 to-lime-400 hover:from-yellow-500 hover:to-lime-500 text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            disabled={!isStepValid() || loading}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${isStepValid() && !loading
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            disabled={!isStepValid() || loading}
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <span className="animate-spin">⚙️</span>
                Generating Your Report...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                🚀 Get My Detailed Report
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function Step1({ formData, updateField, currency, setCurrency }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Let's start with your company
        </h2>
        <p className="text-gray-600">Tell us about your business so we can provide personalized insights</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-900 mb-3">Company Name *</label>
          <input
            type="text"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
            value={formData.company || ''}
            onChange={e => updateField('company', e.target.value)}
            placeholder="e.g., Acme Fashion Co."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Industry *</label>
          <select
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
            value={formData.industry || ''}
            onChange={e => updateField('industry', e.target.value)}
          >
            <option value="">Select industry...</option>
            {INDUSTRIES.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Currency *</label>
          <CurrencySelector value={currency} onChange={setCurrency} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-900 mb-3">Monthly Revenue *</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">
              {currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$'}
            </span>
            <input
              type="number"
              className="w-full pl-12 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
              value={formData.monthlyRevenue || ''}
              onChange={e => updateField('monthlyRevenue', Number(e.target.value))}
              placeholder="500000"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <span>💡</span>
            This helps us calculate your revenue opportunity accurately
          </p>
        </div>
      </div>
    </div>
  );
}

function Step2({ formData, updateField }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          How can we reach you?
        </h2>
        <p className="text-gray-600">We'll send your comprehensive retention audit report to this email</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Full Name *</label>
          <input
            type="text"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
            value={formData.name || ''}
            onChange={e => updateField('name', e.target.value)}
            placeholder="John Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Work Email *</label>
          <input
            type="email"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
            value={formData.email || ''}
            onChange={e => updateField('email', e.target.value)}
            placeholder="john@company.com"
          />
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <span>📧</span>
            Your detailed report will be sent here
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Your Role *</label>
          <input
            type="text"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
            value={formData.role || ''}
            onChange={e => updateField('role', e.target.value)}
            placeholder="e.g., CMO, Marketing Manager, Founder"
          />
        </div>
      </div>
    </div>
  );
}

function Step3({ formData, updateField, currency }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Tell us about your customers
        </h2>
        <p className="text-gray-600">These metrics help us calculate your retention opportunity</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Average Order Value *</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">
              {currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '$'}
            </span>
            <input
              type="number"
              className="w-full pl-12 pr-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
              value={formData.averageOrderValue || ''}
              onChange={e => updateField('averageOrderValue', Number(e.target.value))}
              placeholder="75"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Monthly Customers *</label>
          <input
            type="number"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
            value={formData.monthlyCustomers || ''}
            onChange={e => updateField('monthlyCustomers', Number(e.target.value))}
            placeholder="5000"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Repeat Purchase Rate (%) *</label>
          <input
            type="number"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
            value={formData.repeatPurchaseRate || ''}
            onChange={e => updateField('repeatPurchaseRate', Number(e.target.value))}
            placeholder="25"
            min="0"
            max="100"
          />
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <span>💡</span>
            What % of customers make a second purchase?
          </p>
        </div>
      </div>
    </div>
  );
}

function Step4({ formData, updateField }: any) {
  const stages = [
    { key: 'acquisition', label: 'Acquisition', desc: 'Welcome series, first purchase conversion', icon: '🎯' },
    { key: 'activation', label: 'Activation', desc: 'Getting customers to second purchase', icon: '⚡' },
    { key: 'nurture', label: 'Nurture', desc: 'Engagement campaigns, content, recommendations', icon: '🌱' },
    { key: 'retention', label: 'Retention', desc: 'Keeping active customers engaged', icon: '🔒' },
    { key: 'winback', label: 'Win-back', desc: 'Reactivating lapsed customers', icon: '🔄' },
  ];

  const allPlatforms = [...INDIA_PLATFORMS.email, ...INDIA_PLATFORMS.sms, ...INDIA_PLATFORMS.loyalty, ...INDIA_PLATFORMS.global].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Rate your lifecycle stages
        </h2>
        <p className="text-gray-600 mb-8">How well are you performing in each stage? Be honest for accurate insights.</p>

        <div className="space-y-6">
          {stages.map((stage) => (
            <EnhancedRatingCard
              key={stage.key}
              icon={stage.icon}
              label={stage.label}
              description={stage.desc}
              value={formData[stage.key as keyof typeof formData] || 5}
              onChange={(val: number) => updateField(stage.key, val)}
            />
          ))}
        </div>
      </div>

      <div className="border-t-2 border-gray-100 pt-10">
        <h3 className="text-3xl font-bold mb-3">Your tech stack</h3>
        <p className="text-gray-600 mb-6">Select the platforms you're currently using</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Email Platform</label>
            <select
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
              value={formData.emailPlatform || 'None'}
              onChange={e => updateField('emailPlatform', e.target.value)}
            >
              <optgroup label="🇮🇳 India-Based">
                {INDIA_PLATFORMS.email.map(p => <option key={p} value={p}>{p}</option>)}
              </optgroup>
              <optgroup label="🌍 Global">
                {INDIA_PLATFORMS.global.map(p => <option key={p} value={p}>{p}</option>)}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">SMS Platform</label>
            <select
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
              value={formData.smsPlatform || 'None'}
              onChange={e => updateField('smsPlatform', e.target.value)}
            >
              <optgroup label="🇮🇳 India-Based">
                {INDIA_PLATFORMS.sms.map(p => <option key={p} value={p}>{p}</option>)}
              </optgroup>
              <optgroup label="🌍 Global">
                {INDIA_PLATFORMS.global.map(p => <option key={p} value={p}>{p}</option>)}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Loyalty Platform</label>
            <select
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
              value={formData.loyaltyPlatform || 'None'}
              onChange={e => updateField('loyaltyPlatform', e.target.value)}
            >
              <optgroup label="🇮🇳 India-Based">
                {INDIA_PLATFORMS.loyalty.map(p => <option key={p} value={p}>{p}</option>)}
              </optgroup>
              <optgroup label="🌍 Global">
                {INDIA_PLATFORMS.global.map(p => <option key={p} value={p}>{p}</option>)}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Reviews Platform</label>
            <select
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
              value={formData.reviewsPlatform || 'None'}
              onChange={e => updateField('reviewsPlatform', e.target.value)}
            >
              {allPlatforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Active Flows/Automations</label>
            <input
              type="number"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
              value={formData.activeFlows || 5}
              onChange={e => updateField('activeFlows', Number(e.target.value))}
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Customer Segments</label>
            <input
              type="number"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
              value={formData.segmentCount || 5}
              onChange={e => updateField('segmentCount', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-bold text-gray-900 mb-3">Personalization Level</label>
          <select
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg"
            value={formData.personalizationLevel || 'basic'}
            onChange={e => updateField('personalizationLevel', e.target.value)}
          >
            <option value="none">None - Generic campaigns</option>
            <option value="basic">Basic - Name, location</option>
            <option value="intermediate">Intermediate - Purchase history</option>
            <option value="advanced">Advanced - Predictive AI</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function EnhancedRatingCard({ icon, label, description, value, onChange }: any) {
  const getColor = (val: number) => {
    if (val >= 8) return 'from-green-500 to-emerald-600';
    if (val >= 6) return 'from-blue-500 to-cyan-600';
    if (val >= 4) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  const getRatingLabel = (val: number) => {
    if (val >= 9) return 'Excellent';
    if (val >= 7) return 'Good';
    if (val >= 5) return 'Average';
    if (val >= 3) return 'Needs Work';
    return 'Critical';
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-yellow-300 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{icon}</span>
          <div>
            <h4 className="text-xl font-bold text-gray-900">{label}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-4xl font-black bg-gradient-to-r ${getColor(value)} bg-clip-text text-transparent`}>
            {value}
          </div>
          <div className="text-xs font-semibold text-gray-500">{getRatingLabel(value)}</div>
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              #ef4444 0%, 
              #f59e0b ${((value - 1) / 9) * 50}%, 
              #10b981 ${((value - 1) / 9) * 100}%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
          <span>1 - Poor</span>
          <span>10 - Excellent</span>
        </div>
      </div>
    </div>
  );
}
