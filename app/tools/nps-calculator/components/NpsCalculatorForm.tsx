'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface NpsCalculatorFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function NpsCalculatorForm({ onSubmit, currency, language }: NpsCalculatorFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    promoters: "",
    passives: "",
    detractors: "",
    revenue_per_customer: "", // New field for Revenue Impact
    sentiment_themes: "" // New field for Qualitative Analysis
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const promoters = Number(formData.promoters);
      const passives = Number(formData.passives);
      const detractors = Number(formData.detractors);
      const revenue_per_customer = formData.revenue_per_customer ? Number(formData.revenue_per_customer) : 0;

      if (promoters < 0 || passives < 0 || detractors < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      // Calculation logic
      const total_responses = promoters + passives + detractors;

      if (total_responses === 0) {
        alert("Please enter at least one response.");
        return;
      }

      const promoter_percentage = (promoters / total_responses) * 100;
      const detractor_percentage = (detractors / total_responses) * 100;
      const passive_percentage = (passives / total_responses) * 100;
      const nps = promoter_percentage - detractor_percentage;

      // Revenue Impact Calculations
      const revenue_at_risk = detractors * revenue_per_customer;
      const revenue_safe = promoters * revenue_per_customer;
      const potential_revenue = total_responses * revenue_per_customer;

      let health_status, health_color;
      if (nps >= 70) {
        health_status = 'World Class';
        health_color = 'text-green-600';
      } else if (nps >= 50) {
        health_status = 'Excellent';
        health_color = 'text-blue-600';
      } else if (nps >= 30) {
        health_status = 'Good';
        health_color = 'text-indigo-600';
      } else if (nps >= 0) {
        health_status = 'Average';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'text-red-600';
      }

      const results = {
        nps,
        promoter_percentage,
        detractor_percentage,
        passive_percentage,
        total_responses,
        promoters,
        passives,
        detractors,
        health_status,
        health_color,
        revenue_at_risk,
        revenue_safe,
        potential_revenue,
        sentiment_themes: formData.sentiment_themes,
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate NPS & Revenue Impact</h2>
          <p className="text-gray-600 text-lg">
            Enter your survey results to analyze customer sentiment and its financial impact.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Promoters (9-10)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.promoters}
                  onChange={(e) => setFormData({ ...formData, promoters: e.target.value })}
                  placeholder="e.g. 150"
                  className="w-full px-4 py-4 rounded-xl border-2 border-green-100 focus:border-green-500 focus:ring-0 transition-all outline-none bg-green-50/50 font-medium"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-green-600 text-xl">😃</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Loyal enthusiasts.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Passives (7-8)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.passives}
                  onChange={(e) => setFormData({ ...formData, passives: e.target.value })}
                  placeholder="e.g. 40"
                  className="w-full px-4 py-4 rounded-xl border-2 border-yellow-100 focus:border-yellow-500 focus:ring-0 transition-all outline-none bg-yellow-50/50 font-medium"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-yellow-600 text-xl">😐</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Satisfied but unenthusiastic.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Detractors (0-6)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.detractors}
                  onChange={(e) => setFormData({ ...formData, detractors: e.target.value })}
                  placeholder="e.g. 10"
                  className="w-full px-4 py-4 rounded-xl border-2 border-red-100 focus:border-red-500 focus:ring-0 transition-all outline-none bg-red-50/50 font-medium"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-red-600 text-xl">😠</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Unhappy customers.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Avg. Revenue per Customer (Optional)
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
                  value={formData.revenue_per_customer}
                  onChange={(e) => setFormData({ ...formData, revenue_per_customer: e.target.value })}
                  placeholder="e.g. 1000"
                  className="flex-1 min-w-0 block w-full px-4 py-4 rounded-r-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                  min="0"
                />
              </div>
              <p className="text-xs text-gray-500">Enter this to calculate revenue at risk.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Key Sentiment Themes (Optional)
              </label>
              <input
                type="text"
                value={formData.sentiment_themes}
                onChange={(e) => setFormData({ ...formData, sentiment_themes: e.target.value })}
                placeholder="e.g. Pricing, Support Speed, Features..."
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
              />
              <p className="text-xs text-gray-500">What are customers saying?</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-xl flex items-center justify-center gap-3"
            >
              <span>Calculate NPS Analysis</span>
              <span className="text-[#D1F25E]">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
