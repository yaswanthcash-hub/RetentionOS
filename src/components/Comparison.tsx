import { X, Check } from 'lucide-react';

export default function Comparison() {
  const otherAgencies = [
    'Operators have never held head of retention positions',
    'Only focused on email/SMS',
    'Put Jr account managers to manage your strategy',
    'Same strategy for every client',
    "Don't have experience with subscription programs at scale",
    'Rely on 5-10 day attribution windows to show results'
  ];

  const retentionOS = [
    'Full-funnel strategy & management to increase retention',
    'We treat your business with the level of care as if it were our own.',
    'Transparent about reporting & results',
    "Above & beyond support (we don't count hours)",
    "Real retention experts who've held director level titles at 8 figure brands"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-bold text-lg rounded-lg transform -rotate-1">
              US VS. THEM
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            We're not an email agency. We are a team of fractional retention leaders.
          </h2>
          <a
            href="https://calendly.com/hi-retentionos/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-105"
          >
            Book a Call
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-2xl p-8">
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8">
              Other "Retention" Agencies
            </h3>
            <div className="space-y-5">
              {otherAgencies.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <X className="w-5 h-5 text-gray-500" strokeWidth={2.5} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-heading font-bold mb-8 border-b-2 border-white pb-4">
              RETENTIONOS
            </h3>
            <div className="space-y-5">
              {retentionOS.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-white leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
