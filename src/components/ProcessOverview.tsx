import { Presentation, Rocket, Users } from 'lucide-react';

export default function ProcessOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-[#ff6b35]">REPEAT PURCHASE</span>
                <br />
                <span className="text-[#ff6b35]">MAXIMIZER™</span>
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                We help <span className="font-bold italic">CPG brands</span> raise their{' '}
                <span className="font-bold italic">90-day repeat purchase rate to 25–40%</span> in 3
                months using email, loyalty, and subscription programs.
              </p>
            </div>

            <div className="border-t border-b border-gray-300 py-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#d1f26e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Presentation className="w-7 h-7 text-[#4a5a3c]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">MAP</h3>
                  <p className="text-gray-700">Find & Map What Drives Repeats</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#d1f26e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-7 h-7 text-[#4a5a3c]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">ACTIVATE</h3>
                  <p className="text-gray-700">Launch Journeys That Activate Repeats</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#d1f26e] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-[#4a5a3c]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">SUSTAIN</h3>
                  <p className="text-gray-700">Lock In Loyalty & Win Back Lapses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <div className="bg-[#d1f26e] text-black font-bold text-xl px-6 py-3 inline-block rounded-lg mb-6 transform -rotate-1">
                MAP
              </div>
              <div className="space-y-3 text-gray-800">
                <p className="font-semibold">1. Analyze Repeat Patterns</p>
                <p className="font-semibold">2. Decode Voice of Customer</p>
                <p className="font-semibold">3. Map Customer Journey</p>
              </div>
            </div>

            <div>
              <div className="bg-[#d1f26e] text-black font-bold text-xl px-6 py-3 inline-block rounded-lg mb-6 transform -rotate-1">
                ACTIVATE
              </div>
              <div className="space-y-3 text-gray-800">
                <p className="font-semibold">4. Nurture Buyers</p>
                <p className="font-semibold">5. Accelerate Reorders</p>
                <p className="font-semibold">6. Scale Subscriptions</p>
              </div>
            </div>

            <div>
              <div className="bg-[#d1f26e] text-black font-bold text-xl px-6 py-3 inline-block rounded-lg mb-6 transform -rotate-1">
                SUSTAIN
              </div>
              <div className="space-y-3 text-gray-800">
                <p className="font-semibold">7. Cultivate Loyal Customers</p>
                <p className="font-semibold">8. Reactivate Customers</p>
                <p className="font-semibold">9. Activate Omni Channels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
