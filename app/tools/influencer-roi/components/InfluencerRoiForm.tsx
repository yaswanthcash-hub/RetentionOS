'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface InfluencerRoiFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function InfluencerRoiForm({ onSubmit, currency, language }: InfluencerRoiFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    campaign_cost: "",
    reach: "",
    engagement_rate: "",
    conversions: "",
    average_order_value: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const campaign_cost = Number(formData.campaign_cost);
      const reach = Number(formData.reach);
      const engagement_rate = Number(formData.engagement_rate);
      const conversions = Number(formData.conversions);
      const average_order_value = Number(formData.average_order_value);

      if (campaign_cost < 0 || reach < 0 || engagement_rate < 0 || conversions < 0 || average_order_value < 0) {
        alert("Please enter non-negative values.");
        return;
      }

      // Calculation logic
      const total_engagement = reach * (engagement_rate / 100);
      const revenue = conversions * average_order_value;
      const net_profit = revenue - campaign_cost;
      const roi = campaign_cost > 0 ? (net_profit / campaign_cost) * 100 : 0;
      const cpm = reach > 0 ? (campaign_cost / reach) * 1000 : 0;
      const cost_per_engagement = total_engagement > 0 ? campaign_cost / total_engagement : 0;
      const cost_per_conversion = conversions > 0 ? campaign_cost / conversions : 0;
      const conversion_rate = reach > 0 ? (conversions / reach) * 100 : 0;

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
        revenue,
        net_profit,
        total_engagement,
        cpm,
        cost_per_engagement,
        cost_per_conversion,
        conversion_rate,
        campaign_cost,
        reach,
        conversions,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Partnership Metrics</h2>
          <p className="text-gray-600">
            Evaluate the performance of your influencer collaborations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Campaign Cost
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
                  placeholder="e.g. 500"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Influencer fees + product cost.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Total Reach
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.reach}
                  onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
                  placeholder="e.g. 10000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">👥</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Followers or impressions.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Engagement Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.engagement_rate}
                  onChange={(e) => setFormData({ ...formData, engagement_rate: e.target.value })}
                  placeholder="e.g. 3.5"
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
                Tracked Conversions
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.conversions}
                  onChange={(e) => setFormData({ ...formData, conversions: e.target.value })}
                  placeholder="e.g. 50"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🛒</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Sales from promo code/link.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
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
                  placeholder="e.g. 60"
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
              Calculate Influencer ROI →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
