'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface PaybackPeriodFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function PaybackPeriodForm({ onSubmit, currency, language }: PaybackPeriodFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"customer_acquisition_cost":"","average_order_value":"","purchase_frequency":"","gross_margin":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { customer_acquisition_cost, average_order_value, purchase_frequency, gross_margin } = data;

      // Calculation logic
      const monthly_revenue = (average_order_value * purchase_frequency) / 12;
      const monthly_profit = monthly_revenue * (gross_margin / 100);
      const payback_months = monthly_profit > 0 ? customer_acquisition_cost / monthly_profit : 0;
      const payback_days = payback_months * 30;
      const annual_profit = monthly_profit * 12;
      
      let status, status_color, recommendation;
      if (payback_months < 6) {
        status = 'Excellent';
        status_color = 'green';
        recommendation = 'Outstanding payback period! You recover CAC quickly';
      } else if (payback_months < 12) {
        status = 'Good';
        status_color = 'blue';
        recommendation = 'Healthy payback period within acceptable range';
      } else if (payback_months < 18) {
        status = 'Acceptable';
        status_color = 'yellow';
        recommendation = 'Consider ways to improve purchase frequency or margins';
      } else {
        status = 'Needs Improvement';
        status_color = 'red';
        recommendation = 'Long payback period. Focus on increasing frequency or AOV';
      }
      
      const results = {
        payback_months,
        payback_days,
        monthly_profit,
        monthly_revenue,
        annual_profit,
        status,
        status_color,
        recommendation
      };

      onSubmit(results);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Calculation error:', error);
      alert('An error occurred while calculating. Please check your inputs and try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="card">
        <h2 className="text-2xl font-bold mb-6">Enter Your Data</h2>
        
        
        <div className="mb-6">
          <label className="form-label">Customer Acquisition Cost</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.customer_acquisition_cost}
              onChange={(e) => setFormData({...formData, customer_acquisition_cost: e.target.value})}
              placeholder="Customer Acquisition Cost"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Average Order Value</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.average_order_value}
              onChange={(e) => setFormData({...formData, average_order_value: e.target.value})}
              placeholder="Average Order Value"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Purchases Per Year</label>
          <input
            type="number"
            value={formData.purchase_frequency}
            onChange={(e) => setFormData({...formData, purchase_frequency: e.target.value})}
            placeholder="Purchases Per Year"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Gross Margin (%)</label>
          <div className="relative">
            <input
              type="number"
              value={formData.gross_margin}
              onChange={(e) => setFormData({...formData, gross_margin: e.target.value})}
              placeholder="Gross Margin (%)"
              className="form-input pr-12"
              min="0"
              max="100"
              step="0.1"
              required
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Calculate →
          </button>
        </div>
      </form>
    </div>
  );
}
