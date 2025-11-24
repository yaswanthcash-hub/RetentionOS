'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface KFactorFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function KFactorForm({ onSubmit, currency, language }: KFactorFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"invites_per_user":"","conversion_rate":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { invites_per_user, conversion_rate } = data;

      // Calculation logic
      const k_factor = invites_per_user * (conversion_rate / 100);
      
      // Project growth
      const users_start = 100;
      const generation_1 = users_start * k_factor;
      const generation_2 = generation_1 * k_factor;
      const generation_3 = generation_2 * k_factor;
      const total_after_3 = users_start + generation_1 + generation_2 + generation_3;
      
      let growth_status, health_color, meaning;
      if (k_factor > 1) {
        growth_status = 'Exponential Growth';
        health_color = 'green';
        meaning = 'Each user brings more than 1 user - viral loop!';
      } else if (k_factor > 0.5) {
        growth_status = 'Strong Viral Effect';
        health_color = 'blue';
        meaning = 'Significant organic growth, supplement with paid';
      } else if (k_factor > 0.2) {
        growth_status = 'Moderate Viral Effect';
        health_color = 'yellow';
        meaning = 'Some viral growth, primarily paid acquisition';
      } else {
        growth_status = 'Low Viral Effect';
        health_color = 'orange';
        meaning = 'Minimal viral growth, focus on other channels';
      }
      
      const results = {
        k_factor,
        generation_1,
        generation_2,
        generation_3,
        total_after_3,
        growth_status,
        meaning,
        invites_per_user,
        conversion_rate,
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
          <label className="form-label">Invites Sent Per User</label>
          <input
            type="number"
            value={formData.invites_per_user}
            onChange={(e) => setFormData({...formData, invites_per_user: e.target.value})}
            placeholder="Invites Sent Per User"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Conversion Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              value={formData.conversion_rate}
              onChange={(e) => setFormData({...formData, conversion_rate: e.target.value})}
              placeholder="Conversion Rate (%)"
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
