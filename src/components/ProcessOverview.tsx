import { Presentation, Rocket, Users } from 'lucide-react';

export default function ProcessOverview() {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr,auto,2fr] gap-8 lg:gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-[#ff6b35]">REPEAT</span>
                <br />
                <span className="text-[#ff6b35]">PURCHASE</span>
                <br />
                <span className="text-[#ff6b35]">MAXIMIZER™</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                We help <span className="font-bold italic text-gray-300">CPG brands</span> raise their{' '}
                <span className="font-bold italic text-gray-300">90-day repeat purchase rate to 25–40%</span> in 3
                months using email, loyalty, and subscription programs.
              </p>
            </div>

            <div className="border-t border-b border-gray-800 py-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#d1f26e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Presentation className="w-7 h-7 text-[#1a1a1a]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-400 mb-1">MAP</h3>
                  <p className="text-sm text-gray-500">Find & Map What Drives Repeats</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#d1f26e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-7 h-7 text-[#1a1a1a]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-400 mb-1">ACTIVATE</h3>
                  <p className="text-sm text-gray-500">Launch Journeys That Activate Repeats</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#d1f26e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-[#1a1a1a]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-400 mb-1">SUSTAIN</h3>
                  <p className="text-sm text-gray-500">Lock In Loyalty & Win Back Lapses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-px border-l-2 border-dashed border-gray-800 self-stretch min-h-[600px]"></div>

          <div className="flex items-center justify-center">
            <img
              src="/image.png"
              alt="Process Overview Diagram"
              className="w-full max-w-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
