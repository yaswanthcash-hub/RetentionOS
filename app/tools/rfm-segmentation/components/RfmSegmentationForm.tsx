'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface RfmSegmentationFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

type BusinessModel = 'ecommerce' | 'saas' | 'digital';

export default function RfmSegmentationForm({ onSubmit, currency, language }: RfmSegmentationFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [businessModel, setBusinessModel] = useState<BusinessModel>('ecommerce');
  const [formData, setFormData] = useState({
    recency_days: "",
    frequency_count: "",
    monetary_value: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const recency_days = Number(formData.recency_days);
      const frequency_count = Number(formData.frequency_count);
      const monetary_value = Number(formData.monetary_value);

      if (recency_days < 0 || frequency_count < 0 || monetary_value < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      // Dynamic Scoring Logic based on Business Model
      let recency_score, frequency_score, monetary_score;

      // Recency Thresholds
      if (businessModel === 'saas') {
        // SaaS needs very high recency (active usage)
        if (recency_days <= 7) recency_score = 5;
        else if (recency_days <= 14) recency_score = 4;
        else if (recency_days <= 30) recency_score = 3;
        else if (recency_days <= 60) recency_score = 2;
        else recency_score = 1;
      } else {
        // E-commerce/Digital
        if (recency_days <= 30) recency_score = 5;
        else if (recency_days <= 60) recency_score = 4;
        else if (recency_days <= 90) recency_score = 3;
        else if (recency_days <= 180) recency_score = 2;
        else recency_score = 1;
      }

      // Frequency Thresholds
      if (businessModel === 'saas') {
        // SaaS frequency (logins/actions) is high
        if (frequency_count >= 50) frequency_score = 5;
        else if (frequency_count >= 20) frequency_score = 4;
        else if (frequency_count >= 10) frequency_score = 3;
        else if (frequency_count >= 5) frequency_score = 2;
        else frequency_score = 1;
      } else {
        // E-commerce orders
        if (frequency_count >= 10) frequency_score = 5;
        else if (frequency_count >= 7) frequency_score = 4;
        else if (frequency_count >= 4) frequency_score = 3;
        else if (frequency_count >= 2) frequency_score = 2;
        else frequency_score = 1;
      }

      // Monetary Thresholds (Generic for now, could be scaled)
      if (monetary_value >= 1000) monetary_score = 5;
      else if (monetary_value >= 500) monetary_score = 4;
      else if (monetary_value >= 250) monetary_score = 3;
      else if (monetary_value >= 100) monetary_score = 2;
      else monetary_score = 1;

      const rfm_score = recency_score * 100 + frequency_score * 10 + monetary_score;
      const total_score = recency_score + frequency_score + monetary_score;

      // Advanced Persona Naming & Next Best Actions
      let segment, segment_action, segment_color, next_best_actions;

      if (recency_score >= 4 && frequency_score >= 4 && monetary_score >= 4) {
        segment = businessModel === 'saas' ? 'Power User' : 'Champion';
        segment_action = 'Nurture & Evangelize';
        segment_color = 'text-green-600';
        next_best_actions = [
          'Invite to VIP/Beta program',
          'Ask for a video testimonial',
          'Offer referral bonuses'
        ];
      } else if (recency_score >= 3 && frequency_score >= 3 && monetary_score >= 3) {
        segment = 'Loyal Customer';
        segment_action = 'Upsell & Cross-sell';
        segment_color = 'text-blue-600';
        next_best_actions = [
          'Suggest complementary products',
          'Offer annual plan upgrade',
          'Send "Thank You" gift'
        ];
      } else if (recency_score >= 4 && frequency_score <= 2) {
        segment = 'New Promise';
        segment_action = 'Onboard & Activate';
        segment_color = 'text-purple-600';
        next_best_actions = [
          'Send "Getting Started" guide',
          'Offer welcome discount on 2nd order',
          'Personal check-in email'
        ];
      } else if (recency_score <= 2 && frequency_score >= 4) {
        segment = 'At Risk';
        segment_action = 'Reactivate Immediately';
        segment_color = 'text-orange-600';
        next_best_actions = [
          'Send "We Miss You" offer',
          'Ask for feedback survey',
          'Highlight new features/products'
        ];
      } else if (recency_score <= 2 && frequency_score <= 2) {
        segment = 'Hibernating';
        segment_action = 'Win-Back or Archive';
        segment_color = 'text-red-600';
        next_best_actions = [
          'Deep discount win-back email',
          'Subscription pause option',
          'Remove from active mailing list'
        ];
      } else if (monetary_score >= 4) {
        segment = 'Whale';
        segment_action = 'Concierge Service';
        segment_color = 'text-indigo-600';
        next_best_actions = [
          'Assign dedicated account manager',
          'Offer exclusive high-ticket items',
          'Early access to sales'
        ];
      } else {
        segment = 'Average User';
        segment_action = 'Grow Value';
        segment_color = 'text-teal-600';
        next_best_actions = [
          'Gamification challenges',
          'Educational content marketing',
          'Bundle offers'
        ];
      }

      const results = {
        rfm_score,
        total_score,
        recency_score,
        frequency_score,
        monetary_score,
        segment,
        segment_action,
        segment_color,
        next_best_actions,
        recency_days,
        frequency_count,
        monetary_value,
        businessModel,
        currency: formCurrency
      };

      onSubmit(results);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">RFM Segmentation Engine</h2>
          <p className="text-gray-600 text-lg">
            Classify your customers into actionable personas based on their behavior.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Model Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-xl flex items-center">
              <button
                type="button"
                onClick={() => setBusinessModel('ecommerce')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${businessModel === 'ecommerce' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                🛍️ E-commerce
              </button>
              <button
                type="button"
                onClick={() => setBusinessModel('saas')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${businessModel === 'saas' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                💻 SaaS
              </button>
              <button
                type="button"
                onClick={() => setBusinessModel('digital')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${businessModel === 'digital' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                📱 Digital
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Recency ({businessModel === 'saas' ? 'Days since login' : 'Days since purchase'})
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.recency_days}
                  onChange={(e) => setFormData({ ...formData, recency_days: e.target.value })}
                  placeholder="e.g. 15"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-400">📅</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Lower is better.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Frequency ({businessModel === 'saas' ? 'Logins/Actions' : 'Total Orders'})
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.frequency_count}
                  onChange={(e) => setFormData({ ...formData, frequency_count: e.target.value })}
                  placeholder="e.g. 5"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                  min="0"
                  step="1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-400">🛍️</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Higher is better.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold text-gray-900">
                Monetary (Total Lifetime Spend)
              </label>
              <div className="flex rounded-xl shadow-sm">
                <div className="z-10">
                  <InlineCurrencySelector
                    value={formCurrency}
                    onChange={setFormCurrency}
                  />
                </div>
                <input
                  type="number"
                  value={formData.monetary_value}
                  onChange={(e) => setFormData({ ...formData, monetary_value: e.target.value })}
                  placeholder="e.g. 500"
                  className="flex-1 min-w-0 block w-full px-4 py-4 rounded-r-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Higher is better.</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-xl flex items-center justify-center gap-3"
            >
              <span>Identify Persona</span>
              <span className="text-[#D1F25E]">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
