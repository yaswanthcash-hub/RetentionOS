'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface ClvCalculatorFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function ClvCalculatorForm({ onSubmit, currency, language }: ClvCalculatorFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [formData, setFormData] = useState({
    average_order_value: "",
    purchase_frequency: "",
    customer_lifespan: "",
    profit_margin: "",
    discount_rate: "10", // Default 10%
    churn_rate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const average_order_value = Number(formData.average_order_value);
      const purchase_frequency = Number(formData.purchase_frequency);
      let customer_lifespan = Number(formData.customer_lifespan);
      const profit_margin = formData.profit_margin ? Number(formData.profit_margin) : 0;
      const discount_rate = formData.discount_rate ? Number(formData.discount_rate) / 100 : 0.1;
      const churn_rate = formData.churn_rate ? Number(formData.churn_rate) / 100 : 0;

      if (average_order_value <= 0 || purchase_frequency <= 0) {
        alert("Please enter positive values for AOV and Frequency.");
        return;
      }

      // If churn rate is provided in advanced mode, calculate lifespan from it
      if (isAdvancedMode && churn_rate > 0) {
        customer_lifespan = 1 / churn_rate;
      } else if (customer_lifespan <= 0) {
        alert("Please enter a valid Customer Lifespan.");
        return;
      }

      // Basic Calculations
      const annual_value = average_order_value * purchase_frequency;
      const gross_clv = annual_value * customer_lifespan;
      const net_clv = profit_margin > 0 ? gross_clv * (profit_margin / 100) : gross_clv;
      const monthly_value = annual_value / 12;

      // Advanced Calculations (Discounted CLV)
      // Formula: CLV = (Annual Profit * Retention Rate) / (1 + Discount Rate - Retention Rate)
      // Simplified for finite lifespan: Sum of (Annual Value / (1 + Discount Rate)^t) for t=1 to lifespan
      let discounted_clv = 0;
      const annual_profit = profit_margin > 0 ? annual_value * (profit_margin / 100) : annual_value;

      for (let t = 1; t <= Math.ceil(customer_lifespan); t++) {
        discounted_clv += annual_profit / Math.pow(1 + discount_rate, t);
      }

      const results = {
        gross_clv,
        net_clv: profit_margin > 0 ? net_clv : null,
        discounted_clv: isAdvancedMode ? discounted_clv : null,
        annual_value,
        monthly_value,
        average_order_value,
        purchase_frequency,
        customer_lifespan,
        profit_margin,
        discount_rate: isAdvancedMode ? discount_rate * 100 : null,
        churn_rate: isAdvancedMode && churn_rate > 0 ? churn_rate * 100 : null,
        currency: formCurrency,
        isAdvancedMode
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate Customer Value</h2>
          <p className="text-gray-600 text-lg">
            Enter your metrics to discover how much each customer is truly worth to your business.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-xl flex items-center">
              <button
                type="button"
                onClick={() => setIsAdvancedMode(false)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${!isAdvancedMode ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Basic Calculator
              </button>
              <button
                type="button"
                onClick={() => setIsAdvancedMode(true)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${isAdvancedMode ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Advanced Mode 🚀
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Average Order Value (AOV)
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
                  className="flex-1 min-w-0 block w-full px-4 py-4 rounded-r-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Average amount spent per transaction.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Purchase Frequency
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.purchase_frequency}
                  onChange={(e) => setFormData({ ...formData, purchase_frequency: e.target.value })}
                  placeholder="e.g. 12"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                  min="0"
                  step="0.1"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm font-medium">per year</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Number of purchases per customer per year.</p>
            </div>

            {isAdvancedMode ? (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  Annual Churn Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.churn_rate}
                    onChange={(e) => setFormData({ ...formData, churn_rate: e.target.value })}
                    placeholder="e.g. 25"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-medium">%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Percentage of customers lost each year.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  Customer Lifespan
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.customer_lifespan}
                    onChange={(e) => setFormData({ ...formData, customer_lifespan: e.target.value })}
                    placeholder="e.g. 3"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                    min="0"
                    step="0.1"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm font-medium">years</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Average time a customer stays with you.</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Gross Profit Margin {isAdvancedMode ? '(Recommended)' : '(Optional)'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.profit_margin}
                  onChange={(e) => setFormData({ ...formData, profit_margin: e.target.value })}
                  placeholder="e.g. 20"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-medium">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Enter to calculate Net CLV (profit based).</p>
            </div>

            {isAdvancedMode && (
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  Discount Rate (WACC)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.discount_rate}
                    onChange={(e) => setFormData({ ...formData, discount_rate: e.target.value })}
                    placeholder="e.g. 10"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-medium">%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Cost of capital to discount future cash flows.</p>
              </div>
            )}
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-xl flex items-center justify-center gap-3"
            >
              <span>Calculate CLV</span>
              <span className="text-[#D1F25E]">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
