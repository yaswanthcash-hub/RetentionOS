'use client';

import { useState } from 'react';
import InlineCurrencySelector from '@/components/InlineCurrencySelector';
import { CACResults } from '../page';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { PremiumHeader } from '@/components/ui/PremiumHeader';
import { PremiumCard } from '@/components/ui/PremiumCard';

interface CACFormProps {
  onSubmit: (results: CACResults) => void;
  currency: string;
  language: string;
}

interface MarketingChannel {
  id: string;
  name: string;
  spend: string;
}

export default function CACForm({ onSubmit, currency, language }: CACFormProps) {
  const [formCurrency, setFormCurrency] = useState(currency);
  const [newCustomers, setNewCustomers] = useState('');
  const [channels, setChannels] = useState<MarketingChannel[]>([
    { id: '1', name: 'Paid Social (Facebook, Instagram)', spend: '' },
    { id: '2', name: 'Google Ads', spend: '' },
    { id: '3', name: 'Content Marketing', spend: '' },
  ]);

  // Optional fields for advanced analysis
  const [averageOrderValue, setAverageOrderValue] = useState('');
  const [customerLifespan, setCustomerLifespan] = useState('');
  const [profitMargin, setProfitMargin] = useState('');

  const addChannel = () => {
    setChannels([
      ...channels,
      { id: Date.now().toString(), name: '', spend: '' }
    ]);
  };

  const removeChannel = (id: string) => {
    setChannels(channels.filter(c => c.id !== id));
  };

  const updateChannel = (id: string, field: 'name' | 'spend', value: string) => {
    setChannels(channels.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalSpend = channels.reduce((sum, channel) => {
      const spend = parseFloat(channel.spend) || 0;
      return sum + spend;
    }, 0);

    const customers = parseFloat(newCustomers) || 0;

    if (customers === 0) {
      alert("New customers acquired cannot be zero.");
      return;
    }

    const cac = customers > 0 ? totalSpend / customers : 0;

    const channelData = channels
      .filter(c => parseFloat(c.spend) > 0)
      .map(c => ({
        channel: c.name || 'Unnamed Channel',
        amount: parseFloat(c.spend)
      }));

    // Calculate advanced metrics if provided
    const aov = parseFloat(averageOrderValue) || undefined;
    const lifespan = parseFloat(customerLifespan) || undefined;
    const margin = parseFloat(profitMargin) || undefined;

    let ltv: number | undefined;
    let ltvCacRatio: number | undefined;
    let paybackMonths: number | undefined;

    if (aov && lifespan) {
      ltv = aov * lifespan;
      if (ltv && cac > 0) {
        ltvCacRatio = ltv / cac;
      }
    }

    if (margin && aov && cac > 0) {
      const profitPerPurchase = aov * (margin / 100);
      paybackMonths = profitPerPurchase > 0 ? cac / profitPerPurchase : undefined;
    }

    const results: CACResults = {
      cac,
      totalMarketingSpend: totalSpend,
      newCustomersAcquired: customers,
      marketingSpendPerChannel: channelData,
      averageOrderValue: aov,
      ltv,
      ltvCacRatio,
      paybackMonths,
      profitMargin: margin,
      currency: formCurrency
    };

    onSubmit(results);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-3xl mx-auto">
        <PremiumHeader
          title="Marketing Data"
          description="Enter your marketing spend by channel and the number of new customers acquired."
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Marketing Channels */}
          <PremiumCard title="Marketing Channels & Spend" icon="📢">
            <p className="text-xs text-gray-500 mb-6">
              Add all your marketing channels and their spend for the period
            </p>

            <div className="space-y-4">
              {channels.map((channel, index) => (
                <div key={channel.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <PremiumInput
                        label="Channel Name"
                        value={channel.name}
                        onChange={(e) => updateChannel(channel.id, 'name', e.target.value)}
                        placeholder="e.g., Facebook Ads"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Spend
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
                          value={channel.spend}
                          onChange={(e) => updateChannel(channel.id, 'spend', e.target.value)}
                          placeholder="0.00"
                          className="flex-1 min-w-0 block w-full px-4 py-4 rounded-r-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {channels.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChannel(channel.id)}
                      className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove Channel"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <PremiumButton
                type="button"
                variant="outline"
                onClick={addChannel}
                size="md"
                fullWidth
              >
                + Add Another Channel
              </PremiumButton>
            </div>
          </PremiumCard>

          {/* New Customers Acquired */}
          <PremiumCard>
            <PremiumInput
              label="New Customers Acquired"
              icon="👥"
              type="number"
              value={newCustomers}
              onChange={(e) => setNewCustomers(e.target.value)}
              placeholder="e.g., 500"
              min="0"
              required
              helperText="Total new customers in the same period"
            />
          </PremiumCard>

          {/* Optional Advanced Fields */}
          <PremiumCard title="Optional: Advanced Analysis" icon="🧠">
            <p className="text-sm text-gray-600 mb-6">
              Add these fields to calculate LTV:CAC ratio and payback period
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Average Order Value
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
                    value={averageOrderValue}
                    onChange={(e) => setAverageOrderValue(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 min-w-0 block w-full px-4 py-4 rounded-r-xl border-2 border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none font-medium"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <PremiumInput
                label="Purchase Frequency (per year)"
                type="number"
                value={customerLifespan}
                onChange={(e) => setCustomerLifespan(e.target.value)}
                placeholder="e.g., 4"
                min="0"
                step="0.1"
              />

              <div className="md:col-span-2">
                <PremiumInput
                  label="Gross Profit Margin (%)"
                  icon="%"
                  type="number"
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(e.target.value)}
                  placeholder="e.g., 60"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          </PremiumCard>

          {/* Submit Button */}
          <div className="pt-6">
            <PremiumButton
              type="submit"
              size="lg"
              fullWidth
              icon="→"
            >
              Calculate My CAC
            </PremiumButton>
          </div>
        </form>
      </div>
    </div>
  );
}
