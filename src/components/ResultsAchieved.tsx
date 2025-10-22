import { Check } from 'lucide-react';

export default function ResultsAchieved() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
              Results Brands Achieved
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <p className="text-xl text-gray-900 font-medium">
                  40%+ Higher Repeat Purchase Rate
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <p className="text-xl text-gray-900 font-medium">
                  20%+ Higher Profits
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <p className="text-xl text-gray-900 font-medium">
                  30%+ Lower Dependency On Paid Ads
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mt-1">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <p className="text-xl text-gray-900 font-medium">
                  Compounding Growth
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/image copy copy copy copy copy copy copy.png"
              alt="Profitable Growth Cycle showing customers engage, activate, repeat, and become paid subscribers and loyalists"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
