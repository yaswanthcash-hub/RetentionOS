'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface ViralCoefficientFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function ViralCoefficientForm({ onSubmit, currency, language }: ViralCoefficientFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"invitations_sent":"","conversion_rate":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { invitations_sent, conversion_rate } = data;

      // Calculation logic
      const viral_coefficient = invitations_sent * (conversion_rate / 100);
      const cycle_time = 7; // Assume 7 days
      const growth_rate = Math.pow(1 + viral_coefficient, 365 / cycle_time) - 1;
      
      let virality_status, health_color, implication;
      if (viral_coefficient >= 1.5) {
        virality_status = 'Super Viral';
        health_color = 'green';
        implication = 'Exponential growth! Each user brings 1.5+ users';
      } else if (viral_coefficient >= 1) {
        virality_status = 'Viral';
        health_color = 'green';
        implication = 'Product is growing organically without paid acquisition';
      } else if (viral_coefficient >= 0.5) {
        virality_status = 'Moderately Viral';
        health_color = 'blue';
        implication = 'Viral growth helps but need paid acquisition';
      } else {
        virality_status = 'Not Viral';
        health_color = 'yellow';
        implication = 'Rely primarily on paid acquisition';
      }
      
      const results = {
        viral_coefficient,
        growth_rate: growth_rate * 100,
        virality_status,
        implication,
        invitations_sent,
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
          <label className="form-label">Average Invites Per User</label>
          <input
            type="number"
            value={formData.invitations_sent}
            onChange={(e) => setFormData({...formData, invitations_sent: e.target.value})}
            placeholder="Average Invites Per User"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Invite Conversion Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              value={formData.conversion_rate}
              onChange={(e) => setFormData({...formData, conversion_rate: e.target.value})}
              placeholder="Invite Conversion Rate (%)"
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
