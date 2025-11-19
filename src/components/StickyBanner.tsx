export default function StickyBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-black text-white overflow-hidden">
      <div className="flex items-center py-3">
        <div className="animate-scroll flex items-center whitespace-nowrap">
          <span className="inline-flex items-center px-8">
            <span className="font-bold">Limited Time Offer:</span>
            <span className="mx-2">•</span>
            <span>Get 20% off your first 3 months + Free Retention Audit</span>
            <a
              href="https://calendly.com/hi-retentionos/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-primary-500 hover:text-primary-400 transition-colors font-semibold"
            >
              Claim Now →
            </a>
          </span>
          <span className="inline-flex items-center px-8">
            <span className="font-bold">Limited Time Offer:</span>
            <span className="mx-2">•</span>
            <span>Get 20% off your first 3 months + Free Retention Audit</span>
            <a
              href="https://calendly.com/hi-retentionos/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-primary-500 hover:text-primary-400 transition-colors font-semibold"
            >
              Claim Now →
            </a>
          </span>
          <span className="inline-flex items-center px-8">
            <span className="font-bold">Limited Time Offer:</span>
            <span className="mx-2">•</span>
            <span>Get 20% off your first 3 months + Free Retention Audit</span>
            <a
              href="https://calendly.com/hi-retentionos/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-primary-500 hover:text-primary-400 transition-colors font-semibold"
            >
              Claim Now →
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
