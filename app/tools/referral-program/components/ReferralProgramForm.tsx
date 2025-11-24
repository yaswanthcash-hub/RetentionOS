'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface ReferralProgramFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function ReferralProgramForm({ onSubmit, currency, language }: ReferralProgramFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"referral_costs":"","referred_customers":"","total_customers":"","referrer_clv":"","referred_clv":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { referral_costs, referred_customers, total_customers, referrer_clv, referred_clv } = data;

      // Calculation logic
      const cost_per_referral = referred_customers > 0 ? referral_costs / referred_customers : 0;
      const referral_rate = total_customers > 0 ? (referred_customers / total_customers) * 100 : 0;
      const total_clv = referrer_clv && referred_clv ? 
        (referrer_clv * total_customers) + (referred_clv * referred_customers) : null;
      const roi = total_clv && referral_costs > 0 ? 
        ((total_clv - referral_costs) / referral_costs) * 100 : null;
      
      let health_status, health_color;
      if (referral_rate >= 15) {
        health_status = 'Excellent';
        health_color = 'green';
      } else if (referral_rate >= 10) {
        health_status = 'Good';
        health_color = 'blue';
      } else if (referral_rate >= 5) {
        health_status = 'Fair';
        health_color = 'yellow';
      } else {
        health_status = 'Needs Improvement';
        health_color = 'red';
      }
      
      const results = {
        cost_per_referral,
        referral_rate,
        roi,
        total_clv,
        referral_costs,
        referred_customers,
        total_customers,
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
          <label className="form-label">Total Referral Costs (Rewards)</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.referral_costs}
              onChange={(e) => setFormData({...formData, referral_costs: e.target.value})}
              placeholder="Total Referral Costs (Rewards)"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Customers Acquired via Referrals</label>
          <input
            type="number"
            value={formData.referred_customers}
            onChange={(e) => setFormData({...formData, referred_customers: e.target.value})}
            placeholder="Customers Acquired via Referrals"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Total Customers</label>
          <input
            type="number"
            value={formData.total_customers}
            onChange={(e) => setFormData({...formData, total_customers: e.target.value})}
            placeholder="Total Customers"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Referrer CLV</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.referrer_clv}
              onChange={(e) => setFormData({...formData, referrer_clv: e.target.value})}
              placeholder="Referrer CLV"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Referred Customer CLV</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.referred_clv}
              onChange={(e) => setFormData({...formData, referred_clv: e.target.value})}
              placeholder="Referred Customer CLV"
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
