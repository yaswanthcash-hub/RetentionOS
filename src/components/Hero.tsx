import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-900 rounded-full text-sm font-semibold mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-primary-700 rounded-full animate-pulse"></span>
          Trusted by 17+ Leading Indian D2C Brands
        </div>

        <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
          Make your customers stay, pay, and say good things.
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up-delay">
          <span className="font-semibold text-gray-900">With a dedicated team of fractional retention leaders obsessed with maximizing your customer LTV</span>
        </p>

        <a
          href="https://calendly.com/hi-retentionos/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-black text-lg font-semibold rounded-full hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 animate-fade-in-up"
        >
          Get Your Free Retention Audit
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>


        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">₹50Cr+</div>
            <div className="text-sm text-gray-600">Revenue Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">3.2x</div>
            <div className="text-sm text-gray-600">Avg. LTV Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">94%</div>
            <div className="text-sm text-gray-600">Client Retention</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
