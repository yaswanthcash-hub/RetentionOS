'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface RoiCalculatorFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function RoiCalculatorForm({ onSubmit, currency, language }: RoiCalculatorFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({
    current_revenue: '',
    current_retention_rate: '',
    average_order_value: '',
    customers_per_month: '',
    target_retention_rate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const current_revenue = parseFloat(formData.current_revenue) || 0;
    const current_retention_rate = parseFloat(formData.current_retention_rate) || 0;
    const average_order_value = parseFloat(formData.average_order_value) || 0;
    const customers_per_month = parseFloat(formData.customers_per_month) || 0;
    const target_retention_rate = parseFloat(formData.target_retention_rate) || 0;

    if (current_revenue <= 0 || current_retention_rate <= 0 || target_retention_rate <= current_retention_rate) {
      alert("Please ensure all values are positive and Target Retention is greater than Current Retention.");
      return;
    }

    // Calculate ROI metrics
    const retention_improvement = target_retention_rate - current_retention_rate;
    // Simplified model: Revenue growth proportional to retention improvement (compounding effect simplified for tool)
    // A 5% retention increase can lead to 25-95% profit increase (Bain & Co).
    // Here we project revenue: New Revenue = Current * (1 + (Improvement % * Impact Factor))
    // Using a conservative impact factor of 1.5x for revenue
    const projected_revenue = current_revenue * (1 + ((retention_improvement / 100) * 1.5));

    const monthly_increase = projected_revenue - current_revenue;
    const annual_increase = monthly_increase * 12;
    const percentage_growth = ((projected_revenue - current_revenue) / current_revenue) * 100;

    // Calculate 12-month timeline
    const timeline = [];
    for (let month = 1; month <= 12; month++) {
      const progress = month / 12;
      // Linear ramp up of impact
      const month_revenue = current_revenue + (monthly_increase * progress);
      const additional_revenue = month_revenue - current_revenue;
      timeline.push({
        month,
        revenue: month_revenue,
        additional_revenue
      });
    }

    // Calculate investment & ROI
    // Assumption: Investment required to achieve this is roughly 3-5% of current annual revenue
    const investment_required = (current_revenue * 12) * 0.05;
    const net_gain = annual_increase - investment_required;
    const year_one_roi = (net_gain / investment_required) * 100;
    const break_even_months = investment_required / monthly_increase;

    const results = {
      current_metrics: {
        monthly_revenue: current_revenue,
        annual_revenue: current_revenue * 12,
        retention_rate: current_retention_rate,
        aov: average_order_value,
        customers: customers_per_month
      },
      projected_metrics: {
        monthly_revenue: projected_revenue,
        annual_revenue: projected_revenue * 12,
        retention_rate: target_retention_rate
      },
      impact: {
        monthly_increase,
        annual_increase,
        percentage_growth
      },
      timeline,
      roi: {
        investment_required,
        year_one_roi,
        break_even_months: Math.ceil(break_even_months),
        net_gain
      },
      health_status: year_one_roi >= 300 ? 'Excellent' : year_one_roi >= 100 ? 'Good' : 'Fair',
      currency: formCurrency
    };

    onSubmit(results);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isValid = () => {
    const target = parseFloat(formData.target_retention_rate);
    const current = parseFloat(formData.current_retention_rate);
    return target > current;
  };

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Your Growth</h2>
          <p className="text-gray-600">
            See how small improvements in retention compound into massive revenue gains.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Current Monthly Revenue
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
                  value={formData.current_revenue}
                  onChange={(e) => setFormData({ ...formData, current_revenue: e.target.value })}
                  placeholder="e.g. 50000"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Current Retention Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.current_retention_rate}
                  onChange={(e) => setFormData({ ...formData, current_retention_rate: e.target.value })}
                  placeholder="e.g. 60"
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
                Target Retention Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.target_retention_rate}
                  onChange={(e) => setFormData({ ...formData, target_retention_rate: e.target.value })}
                  placeholder="e.g. 65"
                  className={`w-full px-4 py-3 rounded-xl border ${formData.target_retention_rate && !isValid() ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#D1F25E]'} focus:border-transparent transition-all outline-none`}
                  min="0"
                  max="100"
                  step="0.1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">%</span>
                </div>
              </div>
              {formData.target_retention_rate && !isValid() && (
                <p className="text-xs text-red-500 mt-1">Target must be higher than current rate.</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Avg. Order Value (Optional)
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
                  placeholder="e.g. 50"
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-xl border border-gray-300 focus:ring-2 focus:ring-[#D1F25E] focus:border-transparent transition-all outline-none"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={!isValid()}
              className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 text-lg ${isValid() ? 'bg-[#D1F25E] hover:bg-[#c2e04e] text-gray-900 hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Calculate ROI Impact →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
