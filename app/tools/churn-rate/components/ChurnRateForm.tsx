'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface ChurnRateFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function ChurnRateForm({ onSubmit, currency, language }: ChurnRateFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [churnType, setChurnType] = useState<'logo' | 'revenue'>('logo');
  const [formData, setFormData] = useState({
    customers_start: "",
    customers_lost: "",
    mrr_start: "",
    mrr_lost: "",
    mrr_expansion: "", // For Net Revenue Churn
    time_period: "Monthly",
    churn_reasons: "" // Qualitative input
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { time_period, churn_reasons } = formData;
      let churn_rate = 0;
      let retention_rate = 0;
      let net_churn_rate = null;
      let lost_value = 0;
      let start_value = 0;

      if (churnType === 'logo') {
        const customers_start = Number(formData.customers_start);
        const customers_lost = Number(formData.customers_lost);

        if (customers_start <= 0) {
          alert("Customers at start must be greater than 0");
          return;
        }
        churn_rate = (customers_lost / customers_start) * 100;
        lost_value = customers_lost;
        start_value = customers_start;
      } else {
        const mrr_start = Number(formData.mrr_start);
        const mrr_lost = Number(formData.mrr_lost);
        const mrr_expansion = formData.mrr_expansion ? Number(formData.mrr_expansion) : 0;

        if (mrr_start <= 0) {
          alert("MRR at start must be greater than 0");
          return;
        }
        churn_rate = (mrr_lost / mrr_start) * 100; // Gross Revenue Churn
        net_churn_rate = ((mrr_lost - mrr_expansion) / mrr_start) * 100; // Net Revenue Churn
        lost_value = mrr_lost;
        start_value = mrr_start;
      }

      retention_rate = 100 - churn_rate;

      let health_status, health_color;
      // Benchmarks differ for Logo vs Revenue churn
      const benchmark = churnType === 'logo' ? 5 : 2; // Revenue churn should be lower

      if (churn_rate < benchmark) {
        health_status = 'Excellent';
        health_color = 'text-green-600';
      } else if (churn_rate < benchmark * 2) {
        health_status = 'Good';
        health_color = 'text-blue-600';
      } else if (churn_rate < benchmark * 4) {
        health_status = 'Fair';
        health_color = 'text-yellow-600';
      } else {
        health_status = 'Critical';
        health_color = 'text-red-600';
      }

      // Annual projection
      const monthly_churn = time_period === 'Monthly' ? churn_rate :
        time_period === 'Quarterly' ? churn_rate / 3 :
          churn_rate / 12;

      // Compound annual retention rate
      const annual_retention = Math.pow((1 - monthly_churn / 100), 12) * 100;

      const results = {
        churn_rate,
        net_churn_rate,
        retention_rate,
        lost_value,
        start_value,
        health_status,
        health_color,
        annual_retention,
        time_period,
        churnType,
        churn_reasons,
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate Churn Velocity</h2>
          <p className="text-gray-600 text-lg">
            Measure your attrition rate by Customer Count (Logo Churn) or Revenue (MRR Churn).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Churn Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-xl flex items-center">
              <button
                type="button"
                onClick={() => setChurnType('logo')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${churnType === 'logo' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                👥 Customer Churn
              </button>
              <button
                type="button"
                onClick={() => setChurnType('revenue')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${churnType === 'revenue' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                💰 Revenue Churn
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {churnType === 'logo' ? (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    Customers at Start
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.customers_start}
                      onChange={(e) => setFormData({ ...formData, customers_start: e.target.value })}
                      placeholder="e.g. 1000"
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                      min="1"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400">👥</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Total active customers at start.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    Customers Lost
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.customers_lost}
                      onChange={(e) => setFormData({ ...formData, customers_lost: e.target.value })}
                      placeholder="e.g. 50"
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                      min="0"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400">📉</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Number of cancellations.</p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    MRR at Start
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
                      value={formData.mrr_start}
                      onChange={(e) => setFormData({ ...formData, mrr_start: e.target.value })}
                      placeholder="e.g. 50000"
                      className="flex-1 min-w-0 block w-full px-4 py-4 rounded-r-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                      min="1"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">Total recurring revenue at start.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    MRR Lost (Churn)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.mrr_lost}
                      onChange={(e) => setFormData({ ...formData, mrr_lost: e.target.value })}
                      placeholder="e.g. 2500"
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                      min="0"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 font-medium">📉</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Revenue lost from cancellations.</p>
                </div>
              </>
            )}
          </div>

          {churnType === 'revenue' && (
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Expansion MRR (Optional)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.mrr_expansion}
                  onChange={(e) => setFormData({ ...formData, mrr_expansion: e.target.value })}
                  placeholder="e.g. 1000"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                  min="0"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-medium">📈</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Revenue gained from upsells/cross-sells (calculates Net Churn).</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-900">
              Primary Churn Reason (Optional)
            </label>
            <textarea
              value={formData.churn_reasons}
              onChange={(e) => setFormData({ ...formData, churn_reasons: e.target.value })}
              placeholder="e.g. Pricing too high, Missing feature X, Poor support..."
              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium h-24 resize-none"
            />
            <p className="text-xs text-gray-500">Enter qualitative feedback to get tailored recommendations.</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-900">
              Time Period
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['Monthly', 'Quarterly', 'Annual'].map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setFormData({ ...formData, time_period: period })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${formData.time_period === period
                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-xl flex items-center justify-center gap-3"
            >
              <span>Calculate Churn</span>
              <span className="text-[#D1F25E]">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
