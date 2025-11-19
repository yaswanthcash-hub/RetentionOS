import { useState } from 'react';
import { X } from 'lucide-react';

export default function StickyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm md:text-base font-medium">
              <span className="font-bold">Limited Time Offer:</span> Get 20% off your first 3 months + Free Retention Audit
              <a
                href="https://calendly.com/hi-retentionos/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 underline hover:text-blue-100 transition-colors font-semibold"
              >
                Claim Now →
              </a>
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
