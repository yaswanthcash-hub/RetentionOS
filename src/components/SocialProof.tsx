import { Quote, Star } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Varun Alagh',
      role: 'Co-Founder',
      company: 'Leading Beauty Brand',
      content: 'The retention flows transformed how we engage customers post-purchase. WhatsApp alone recovered ₹47L in the first 90 days. The team understands D2C at a level most agencies never reach.',
      revenue: '₹47L recovered',
      rating: 5
    },
    {
      name: 'Rohit Bansal',
      role: 'Co-Founder & CMO',
      company: 'Men\'s Grooming Leader',
      content: 'We went from 9% to 31% subscription mix in 6 months. The subscription conversion flows are literally printing money. This is what retention marketing should look like.',
      revenue: '244% growth',
      rating: 5
    },
    {
      name: 'Priya Nair',
      role: 'Head of Digital Marketing',
      company: 'Fashion D2C',
      content: 'We reactivated 14,200 dormant customers in 4 months. The automated flows now run 24/7 bringing back buyers we thought we\'d lost forever. Game-changing for our bottom line.',
      revenue: '14.2K reactivated',
      rating: 5
    },
    {
      name: 'Sameer Maheshwari',
      role: 'VP of Retention',
      company: 'Health & Supplements',
      content: 'We cut subscription churn in half and doubled MRR in 5 months. The educational flows helped customers actually stick to their health goals. Best investment we\'ve made.',
      revenue: '139% MRR growth',
      rating: 5
    },
    {
      name: 'Ananya Singh',
      role: 'Growth Marketing Lead',
      company: 'Wellness Brand',
      content: 'From 18% to 34% repeat rate in 90 days. The segmentation is incredibly precise and the WhatsApp flows feel personal, not spammy. Finally, retention that actually works.',
      revenue: '+89% repeat rate',
      rating: 5
    },
    {
      name: 'Karthik Reddy',
      role: 'Head of Growth',
      company: 'Lifestyle E-commerce',
      content: 'The cart recovery alone brings in ₹18L/month now. Every rupee we spend with them comes back 10x. They\'re not an agency, they\'re a genuine growth partner.',
      revenue: '₹18L/month',
      rating: 5
    }
  ];

  return (
    <section id="social-proof" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Don't Just Take Our Word For It
          </h2>
          <p className="text-xl text-gray-600">
            Here's what actually happened when leading Indian D2C brands implemented retention marketing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute -top-4 left-8">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex gap-1 mb-4 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    {testimonial.company && (
                      <div className="text-xs text-gray-400 mt-1">{testimonial.company}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                      {testimonial.revenue}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-md">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-heading font-bold text-gray-900 mb-2">94%</div>
              <div className="text-gray-600 font-medium">Client Retention Rate</div>
              <p className="text-xs text-gray-500 mt-2">Our clients stay because we deliver results</p>
            </div>
            <div className="p-4 border-x border-gray-200">
              <div className="text-4xl font-bold text-gray-900 mb-2">12:1</div>
              <div className="text-gray-600 font-medium">Average ROI</div>
              <p className="text-xs text-gray-500 mt-2">Every rupee invested returns 12x on average</p>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-gray-900 mb-2">&lt;24hrs</div>
              <div className="text-gray-600 font-medium">Response Time</div>
              <p className="text-xs text-gray-500 mt-2">Fast support when you need it most</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
