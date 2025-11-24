'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface ContentRoiFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function ContentRoiForm({ onSubmit, currency, language }: ContentRoiFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    content_cost: "",
    traffic_generated: "",
    conversion_rate: "",
    customer_value: "",
    content_lifespan_months: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const content_cost = Number(formData.content_cost);
      const traffic_generated = Number(formData.traffic_generated);
      const conversion_rate = Number(formData.conversion_rate);
      const customer_value = Number(formData.customer_value);
      const content_lifespan_months = formData.content_lifespan_months ? Number(formData.content_lifespan_months) : 12;

      if (content_cost < 0 || traffic_generated < 0 || conversion_rate < 0 || customer_value < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      // Calculation logic
      const monthly_conversions = traffic_generated * (conversion_rate / 100);
      const monthly_revenue = monthly_conversions * customer_value;
      const total_revenue = monthly_revenue * content_lifespan_months;
      const net_profit = total_revenue - content_cost;
      const roi = content_cost > 0 ? (net_profit / content_cost) * 100 : 0;
      const cost_per_visitor = traffic_generated > 0 ? content_cost / (traffic_generated * content_lifespan_months) : 0;
      const revenue_per_visitor = traffic_generated > 0 ? monthly_revenue / traffic_generated : 0;

      let health_status, health_color;
      if (roi >= 300) {
        health_status = 'Excellent';
        health_color = 'text-green-600';
      } else if (roi >= 100) {
        health_status = 'Good';
        health_color = 'text-blue-600';
      } else if (roi >= 0) {
        health_status = 'Fair';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Negative';
        health_color = 'text-red-600';
      }

      const results = {
        roi,
        total_revenue,
        net_profit,
        monthly_revenue,
        monthly_conversions,
        cost_per_visitor,
        revenue_per_visitor,
        content_cost,
        traffic_generated,
        lifespan: content_lifespan_months,
        health_status,
        health_color,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculate Content Value</h2>
          <p className="text-gray-600">
            Determine the profitability of your blog posts, videos, or whitepapers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Total Content Cost
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
                  value={formData.content_cost}
                  onChange={(e) => setFormData({ ...formData, content_cost: e.target.value })}
                  placeholder="e.g. 500"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Creation, promotion, and distribution costs.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Monthly Traffic Generated
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.traffic_generated}
                  onChange={(e) => setFormData({ ...formData, traffic_generated: e.target.value })}
                  placeholder="e.g. 1000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">👀</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Average monthly visitors to this content.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Conversion Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.conversion_rate}
                  onChange={(e) => setFormData({ ...formData, conversion_rate: e.target.value })}
                  placeholder="e.g. 2.5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Percentage of visitors who become customers.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Avg. Customer Value
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
                  value={formData.customer_value}
                  onChange={(e) => setFormData({ ...formData, customer_value: e.target.value })}
                  placeholder="e.g. 100"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Revenue per conversion (LTV or AOV).</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Content Lifespan (Months)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.content_lifespan_months}
                  onChange={(e) => setFormData({ ...formData, content_lifespan_months: e.target.value })}
                  placeholder="e.g. 12"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="1"
                  step="1"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📅</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">How long this content will generate traffic (default: 12 months).</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate Content ROI →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
