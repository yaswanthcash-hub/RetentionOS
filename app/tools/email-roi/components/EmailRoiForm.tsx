'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface EmailRoiFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function EmailRoiForm({ onSubmit, currency, language }: EmailRoiFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    campaign_cost: "",
    list_size: "",
    open_rate: "",
    click_rate: "",
    conversion_rate: "",
    average_order_value: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const campaign_cost = Number(formData.campaign_cost);
      const list_size = Number(formData.list_size);
      const open_rate = Number(formData.open_rate);
      const click_rate = Number(formData.click_rate);
      const conversion_rate = Number(formData.conversion_rate);
      const average_order_value = Number(formData.average_order_value);

      if (campaign_cost < 0 || list_size < 0 || open_rate < 0 || click_rate < 0 || conversion_rate < 0 || average_order_value < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      // Calculation logic
      const opens = list_size * (open_rate / 100);
      const clicks = opens * (click_rate / 100);
      const conversions = clicks * (conversion_rate / 100);
      const revenue = conversions * average_order_value;
      const net_profit = revenue - campaign_cost;
      const roi = campaign_cost > 0 ? (net_profit / campaign_cost) * 100 : 0;
      const roas = campaign_cost > 0 ? revenue / campaign_cost : 0;
      const cost_per_conversion = conversions > 0 ? campaign_cost / conversions : 0;
      const revenue_per_email = list_size > 0 ? revenue / list_size : 0;

      let health_status, health_color;
      if (roi >= 400) {
        health_status = 'Excellent';
        health_color = 'text-green-600';
      } else if (roi >= 200) {
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
        roas,
        revenue,
        net_profit,
        conversions,
        clicks,
        opens,
        cost_per_conversion,
        revenue_per_email,
        open_rate,
        click_rate,
        conversion_rate,
        campaign_cost,
        list_size,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaign Performance</h2>
          <p className="text-gray-600">
            Enter your email campaign metrics to calculate ROI and efficiency.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Total Campaign Cost
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
                  value={formData.campaign_cost}
                  onChange={(e) => setFormData({ ...formData, campaign_cost: e.target.value })}
                  placeholder="e.g. 200"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">ESP costs, design, copy, etc.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email List Size
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.list_size}
                  onChange={(e) => setFormData({ ...formData, list_size: e.target.value })}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📧</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Number of recipients.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Open Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.open_rate}
                  onChange={(e) => setFormData({ ...formData, open_rate: e.target.value })}
                  placeholder="e.g. 25"
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
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Click-Through Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.click_rate}
                  onChange={(e) => setFormData({ ...formData, click_rate: e.target.value })}
                  placeholder="e.g. 3"
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
              <p className="text-xs text-gray-500">Of those who opened.</p>
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
                  placeholder="e.g. 5"
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
              <p className="text-xs text-gray-500">Of those who clicked.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Avg. Order Value
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
                  value={formData.average_order_value}
                  onChange={(e) => setFormData({ ...formData, average_order_value: e.target.value })}
                  placeholder="e.g. 75"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-4 bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg"
            >
              Calculate Email ROI →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
