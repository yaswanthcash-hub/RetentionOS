'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface EngagementScoreFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function EngagementScoreForm({ onSubmit, currency, language }: EngagementScoreFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"email_opens":"","website_visits":"","purchase_count":"","support_tickets":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { email_opens, website_visits, purchase_count, support_tickets } = data;

      // Calculation logic
      // Weighted engagement score (0-100)
      const email_score = Math.min((email_opens / 10) * 20, 20);
      const website_score = Math.min((website_visits / 20) * 30, 30);
      const purchase_score = Math.min((purchase_count / 5) * 40, 40);
      const support_score = support_tickets <= 1 ? 10 : 
                           support_tickets <= 3 ? 5 : 0;
      
      const engagement_score = email_score + website_score + purchase_score + support_score;
      
      let engagement_level, health_color;
      if (engagement_score >= 80) {
        engagement_level = 'Highly Engaged';
        health_color = 'green';
      } else if (engagement_score >= 60) {
        engagement_level = 'Engaged';
        health_color = 'blue';
      } else if (engagement_score >= 40) {
        engagement_level = 'Moderately Engaged';
        health_color = 'yellow';
      } else if (engagement_score >= 20) {
        engagement_level = 'Low Engagement';
        health_color = 'orange';
      } else {
        engagement_level = 'At Risk';
        health_color = 'red';
      }
      
      const results = {
        engagement_score,
        engagement_level,
        email_score,
        website_score,
        purchase_score,
        support_score,
        email_opens,
        website_visits,
        purchase_count,
        support_tickets,
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
          <label className="form-label">Email Opens (Last 30 Days)</label>
          <input
            type="number"
            value={formData.email_opens}
            onChange={(e) => setFormData({...formData, email_opens: e.target.value})}
            placeholder="Email Opens (Last 30 Days)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Website Visits (Last 30 Days)</label>
          <input
            type="number"
            value={formData.website_visits}
            onChange={(e) => setFormData({...formData, website_visits: e.target.value})}
            placeholder="Website Visits (Last 30 Days)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Purchases (Last 90 Days)</label>
          <input
            type="number"
            value={formData.purchase_count}
            onChange={(e) => setFormData({...formData, purchase_count: e.target.value})}
            placeholder="Purchases (Last 90 Days)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div className="mb-6">
          <label className="form-label">Support Tickets (Last 90 Days)</label>
          <input
            type="number"
            value={formData.support_tickets}
            onChange={(e) => setFormData({...formData, support_tickets: e.target.value})}
            placeholder="Support Tickets (Last 90 Days)"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
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
