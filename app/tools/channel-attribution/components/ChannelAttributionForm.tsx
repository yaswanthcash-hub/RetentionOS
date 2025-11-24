'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface ChannelAttributionFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function ChannelAttributionForm({ onSubmit, currency, language }: ChannelAttributionFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"channel_1_spend":"","channel_1_conversions":"","channel_2_spend":"","channel_2_conversions":"","channel_3_spend":"","channel_3_conversions":"","average_order_value":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { channel_1_spend, channel_1_conversions, channel_2_spend, channel_2_conversions, channel_3_spend, channel_3_conversions, average_order_value } = data;

      // Calculation logic
      const total_spend = channel_1_spend + channel_2_spend + channel_3_spend;
      const total_conversions = channel_1_conversions + channel_2_conversions + channel_3_conversions;
      const total_revenue = total_conversions * average_order_value;
      
      const channel_1_cpa = channel_1_conversions > 0 ? channel_1_spend / channel_1_conversions : 0;
      const channel_2_cpa = channel_2_conversions > 0 ? channel_2_spend / channel_2_conversions : 0;
      const channel_3_cpa = channel_3_conversions > 0 ? channel_3_spend / channel_3_conversions : 0;
      
      const channel_1_roas = channel_1_spend > 0 ? 
        (channel_1_conversions * average_order_value) / channel_1_spend : 0;
      const channel_2_roas = channel_2_spend > 0 ? 
        (channel_2_conversions * average_order_value) / channel_2_spend : 0;
      const channel_3_roas = channel_3_spend > 0 ? 
        (channel_3_conversions * average_order_value) / channel_3_spend : 0;
      
      const blended_cpa = total_conversions > 0 ? total_spend / total_conversions : 0;
      const blended_roas = total_spend > 0 ? total_revenue / total_spend : 0;
      
      // Determine best channel
      let best_channel = 'Channel 1';
      let best_roas = channel_1_roas;
      if (channel_2_roas > best_roas) {
        best_channel = 'Channel 2';
        best_roas = channel_2_roas;
      }
      if (channel_3_roas > best_roas) {
        best_channel = 'Channel 3';
        best_roas = channel_3_roas;
      }
      
      const results = {
        blended_cpa,
        blended_roas,
        total_revenue,
        total_conversions,
        total_spend,
        channel_1_cpa,
        channel_2_cpa,
        channel_3_cpa,
        channel_1_roas,
        channel_2_roas,
        channel_3_roas,
        best_channel,
        best_roas
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
          <label className="form-label">Channel 1 Spend</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.channel_1_spend}
              onChange={(e) => setFormData({...formData, channel_1_spend: e.target.value})}
              placeholder="Channel 1 Spend"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Channel 1 Conversions</label>
          <input
            type="number"
            value={formData.channel_1_conversions}
            onChange={(e) => setFormData({...formData, channel_1_conversions: e.target.value})}
            placeholder="Channel 1 Conversions"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Channel 2 Spend</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.channel_2_spend}
              onChange={(e) => setFormData({...formData, channel_2_spend: e.target.value})}
              placeholder="Channel 2 Spend"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Channel 2 Conversions</label>
          <input
            type="number"
            value={formData.channel_2_conversions}
            onChange={(e) => setFormData({...formData, channel_2_conversions: e.target.value})}
            placeholder="Channel 2 Conversions"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Channel 3 Spend</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.channel_3_spend}
              onChange={(e) => setFormData({...formData, channel_3_spend: e.target.value})}
              placeholder="Channel 3 Spend"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Channel 3 Conversions</label>
          <input
            type="number"
            value={formData.channel_3_conversions}
            onChange={(e) => setFormData({...formData, channel_3_conversions: e.target.value})}
            placeholder="Channel 3 Conversions"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
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

        <div className="mt-8 pt-8 border-t">
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Calculate →
          </button>
        </div>
      </form>
    </div>
  );
}
