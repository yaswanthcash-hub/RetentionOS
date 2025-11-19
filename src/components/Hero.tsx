import { ArrowRight } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative bg-white pt-20 pb-20 sm:pb-24 md:pb-32 md:min-h-screen md:flex md:items-center md:justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <Spline
          scene="https://prod.spline.design/04edad57-14e9-48bb-9fed-afbbd36144d5/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            filter: 'hue-rotate(60deg) saturate(1.5) brightness(1.1)',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-16 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-900 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-primary-700 rounded-full animate-pulse"></span>
          Trusted by 17+ Leading Indian D2C Brands
        </div>

        <h1 className="text-[2rem] sm:text-5xl md:text-7xl font-heading font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-[1.2] md:leading-[1.1] animate-slide-up">
          Make your customers <span className="bg-[#d1f26e] px-2 inline-block">Stay, Pay, and Say</span> good things.
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up-delay">
          <span className="font-semibold text-gray-900">With a dedicated team of fractional retention leaders obsessed with maximizing your customer LTV</span>
        </p>

        <a
          href="https://calendly.com/hi-retentionos/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary-500 text-black text-base sm:text-lg font-semibold rounded-full hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 animate-fade-in-up"
        >
          Get Your Free Retention Audit
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>


        <div className="mt-10 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-1 sm:mb-2">₹50Cr+</div>
            <div className="text-xs sm:text-sm text-gray-600">Revenue Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">3.2x</div>
            <div className="text-xs sm:text-sm text-gray-600">Avg. LTV Increase</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">94%</div>
            <div className="text-xs sm:text-sm text-gray-600">Client Retention</div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
