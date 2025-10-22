import { Presentation, Rocket, Users } from 'lucide-react';

export default function ProcessOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr,auto,2fr] gap-8 lg:gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-primary-600">REPEAT PURCHASE</span>
                <br />
                <span className="text-primary-600">MAXIMIZER™</span>
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                We help <span className="font-bold italic">CPG brands</span> raise their{' '}
                <span className="font-bold italic">90-day repeat purchase rate to 25–40%</span> in 3
                months using email, loyalty, and subscription programs.
              </p>
            </div>

            <div className="border-t border-b border-gray-300 py-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Presentation className="w-7 h-7 text-gray-900" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">MAP</h3>
                  <p className="text-gray-700">Find & Map What Drives Repeats</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-7 h-7 text-gray-900" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">ACTIVATE</h3>
                  <p className="text-gray-700">Launch Journeys That Activate Repeats</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-gray-900" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">SUSTAIN</h3>
                  <p className="text-gray-700">Lock In Loyalty & Win Back Lapses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-px border-l-2 border-dashed border-gray-300 self-stretch min-h-[600px]"></div>

          <div className="space-y-8">
            <img
              src="/public/image copy copy copy copy copy copy copy copy copy.png"
              alt="Repeat Purchase Maximizer Process"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
