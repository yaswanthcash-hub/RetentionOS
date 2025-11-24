'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';

interface InventoryTurnoverFormProps {
  onSubmit: (results: any) => void;
  currency: string;
  language: string;
}

export default function InventoryTurnoverForm({ onSubmit, currency, language }: InventoryTurnoverFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [formData, setFormData] = useState({"cost_of_goods_sold":"","average_inventory":""});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string inputs to numbers
      const data = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = value === '' ? 0 : parseFloat(value as string);
      return acc;
    }, {} as Record<string, number>);

      // Destructure variables from data object
      const { cost_of_goods_sold, average_inventory } = data;

      // Calculation logic
      const turnover_ratio = average_inventory > 0 ? 
        cost_of_goods_sold / average_inventory : 0;
      const days_to_sell = turnover_ratio > 0 ? 365 / turnover_ratio : 0;
      const inventory_holding_cost = average_inventory * 0.25; // 25% annual holding cost
      const capital_tied_up = average_inventory;
      
      let health_status, health_color;
      if (turnover_ratio >= 8) {
        health_status = 'Excellent';
        health_color = 'green';
      } else if (turnover_ratio >= 5) {
        health_status = 'Good';
        health_color = 'blue';
      } else if (turnover_ratio >= 3) {
        health_status = 'Fair';
        health_color = 'yellow';
      } else {
        health_status = 'Slow Moving';
        health_color = 'red';
      }
      
      const results = {
        turnover_ratio,
        days_to_sell,
        inventory_holding_cost,
        capital_tied_up,
        cost_of_goods_sold,
        average_inventory,
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
          <label className="form-label">Cost of Goods Sold (Annual)</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.cost_of_goods_sold}
              onChange={(e) => setFormData({...formData, cost_of_goods_sold: e.target.value})}
              placeholder="Cost of Goods Sold (Annual)"
              className="form-input rounded-l-none flex-1"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label">Average Inventory Value</label>
          <div className="flex">
            <InlineCurrencySelector 
              value={formCurrency} 
              onChange={setFormCurrency}
            />
            <input
              type="number"
              value={formData.average_inventory}
              onChange={(e) => setFormData({...formData, average_inventory: e.target.value})}
              placeholder="Average Inventory Value"
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
