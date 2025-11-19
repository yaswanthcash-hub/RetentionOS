import { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

export default function ROICalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(2000000);
  const [repeatRate, setRepeatRate] = useState(15);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculations = {
    currentRepeatRevenue: monthlyRevenue * (repeatRate / 100),
    targetRepeatRate: Math.min(repeatRate + 18, 45),
    projectedRepeatRevenue: monthlyRevenue * (Math.min(repeatRate + 18, 45) / 100),
    monthlyIncrease: monthlyRevenue * (Math.min(repeatRate + 18, 45) / 100) - monthlyRevenue * (repeatRate / 100),
    annualIncrease: (monthlyRevenue * (Math.min(repeatRate + 18, 45) / 100) - monthlyRevenue * (repeatRate / 100)) * 12,
  };

  return (
    <section id="roi-calculator" className="py-24 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            See Your Potential Revenue Increase
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate how much additional revenue you could generate with improved retention marketing
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Monthly Revenue (₹)
                </label>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="100000"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="mt-2 text-2xl font-heading font-bold text-gray-900">
                  {formatCurrency(monthlyRevenue)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Current Repeat Purchase Rate (%)
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={repeatRate}
                  onChange={(e) => setRepeatRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="mt-2 text-2xl font-heading font-bold text-gray-900">
                  {repeatRate}%
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Based on average improvements across our client base, here's what you could achieve:
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Current Repeat Revenue</span>
                </div>
                <div className="text-2xl font-heading font-bold text-gray-900">
                  {formatCurrency(calculations.currentRepeatRevenue)}/mo
                </div>
              </div>

              <div className="bg-primary-500 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-gray-900" />
                  <span className="text-sm text-gray-900 font-semibold">Projected Repeat Revenue</span>
                </div>
                <div className="text-2xl font-heading font-bold text-gray-900">
                  {formatCurrency(calculations.projectedRepeatRevenue)}/mo
                </div>
                <div className="mt-2 text-sm text-gray-900/70">
                  At {calculations.targetRepeatRate}% repeat rate
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6">
                <div className="text-sm text-gray-300 mb-2">Additional Monthly Revenue</div>
                <div className="text-3xl font-heading font-bold text-white mb-1">
                  {formatCurrency(calculations.monthlyIncrease)}
                </div>
                <div className="text-lg font-semibold text-primary-400">
                  {formatCurrency(calculations.annualIncrease)}/year
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://calendly.com/hi-retentionos/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center bg-gradient-to-r from-[#2dd4bf] to-[#1e3a5f] text-white font-semibold rounded-full hover:from-[#26b8a5] hover:to-[#172e4a] hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105"
                >
                  Book Free Audit to Unlock This Revenue
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              These projections are based on average results from our client portfolio. Actual results may vary based on your industry, product mix, and customer base.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
