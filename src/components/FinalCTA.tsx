import { ArrowRight, Clock, Shield, Zap } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-600 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-primary-500/30">
          <Clock className="w-4 h-4" />
          Limited slots available this month
        </div>

        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
          Ready to Stop{' '}
          <span className="text-primary-400">
            Losing Customers
          </span>
          ?
        </h2>

        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Book a free retention audit. We'll show you exactly where you're leaving money on the table—and how to fix it in 90 days.
        </p>

        <a
          href="https://calendly.com/hi-retentionos/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#2dd4bf] to-[#1e3a5f] text-white text-lg font-semibold rounded-full hover:from-[#26b8a5] hover:to-[#172e4a] transition-all duration-300 shadow-2xl hover:shadow-teal-500/50 hover:scale-105 mb-8"
        >
          Book Your Free Audit
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-300 mb-16">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-400" />
            <span>We\'ll analyze your data</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span>Identify revenue leaks</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>Show the 90-day fix</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl font-heading font-bold text-white mb-2">₹0</div>
            <div className="text-gray-400 text-sm">Setup fees or upfront costs</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl font-heading font-bold text-white mb-2">3.2x</div>
            <div className="text-gray-400 text-sm">Average LTV increase in 90 days</div>
          </div>
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl font-heading font-bold text-white mb-2">100%</div>
            <div className="text-gray-400 text-sm">Money-back guarantee</div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hi@retentionos.io"
              className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Email us: hi@retentionos.io
            </a>
            <a
              href="tel:+919505551760"
              className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              Call: +91 95055 51760
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
