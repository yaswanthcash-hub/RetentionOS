'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface MrrGrowthFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function MrrGrowthForm({ onSubmit, currency, language }: MrrGrowthFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"last_month_mrr":"","this_month_mrr":"","new_mrr":"","expansion_mrr":"","churned_mrr":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { last_month_mrr, this_month_mrr, new_mrr, expansion_mrr, churned_mrr } = data;

      // Calculation logic
      const mrr_change = this_month_mrr - last_month_mrr;
      const growth_rate = last_month_mrr > 0 ? 
        (mrr_change / last_month_mrr) * 100 : 0;
      const annual_run_rate = this_month_mrr * 12;
      const monthly_growth = mrr_change;
      
      // If detailed breakdown provided
      const net_new_mrr = (new_mrr || 0) + (expansion_mrr || 0) - (churned_mrr || 0);
      
      let health_status, health_color;
      if (growth_rate >= 15) {
        health_status = 'Hyper Growth';
        health_color = 'green';
      } else if (growth_rate >= 10) {
        health_status = 'Strong Growth';
        health_color = 'green';
      } else if (growth_rate >= 5) {
        health_status = 'Healthy Growth';
        health_color = 'blue';
      } else if (growth_rate >= 0) {
        health_status = 'Slow Growth';
        health_color = 'yellow';
      } else {
        health_status = 'Declining';
        health_color = 'red';
      }
      
      const results = {
        mrr_change,
        growth_rate,
        this_month_mrr,
        last_month_mrr,
        annual_run_rate,
        net_new_mrr: new_mrr || expansion_mrr || churned_mrr ? net_new_mrr : null,
        health_status,
        health_color
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
          <label className="form-label">Last Month MRR</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.last_month_mrr}
              onChange={(e) => setFormData({...formData, last_month_mrr: e.target.value})}
              placeholder="Last Month MRR"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">This Month MRR</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.this_month_mrr}
              onChange={(e) => setFormData({...formData, this_month_mrr: e.target.value})}
              placeholder="This Month MRR"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">New MRR</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.new_mrr}
              onChange={(e) => setFormData({...formData, new_mrr: e.target.value})}
              placeholder="New MRR"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Expansion MRR</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.expansion_mrr}
              onChange={(e) => setFormData({...formData, expansion_mrr: e.target.value})}
              placeholder="Expansion MRR"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Churned MRR</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.churned_mrr}
              onChange={(e) => setFormData({...formData, churned_mrr: e.target.value})}
              placeholder="Churned MRR"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              
            />
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
