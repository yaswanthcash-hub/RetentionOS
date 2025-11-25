export default function AcquisitionTrap() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 text-lg md:text-xl mb-4">
                Here's the truth:
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                You Can't Scale Profitably On{' '}
                <span className="text-orange-500">One-Time Buyers</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                The more you grow, the more it costs to acquire new customers.
              </p>
            </div>

            <div className="relative">
              <img
                src="/image copy copy copy copy.png"
                alt="Acquisition Trap Cycle showing increasing CPMs, higher budget, increasing CAC, and shrinking profits"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
