import { Quote, Star } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Founder, Ayurvedic Beauty Co.',
      content: 'We went from 12% to 38% repeat purchase rate in just 3 months. The WhatsApp flows alone recovered ₹2.4 lakhs in abandoned carts last month.',
      revenue: '₹2.4L recovered',
      rating: 5
    },
    {
      name: 'Rahul Mehta',
      role: 'CMO, Fashion Forward',
      content: 'Finally, a retention platform that understands the Indian market. The SMS campaigns are DLT compliant and the support team is incredible.',
      revenue: '42% retention lift',
      rating: 5
    },
    {
      name: 'Anjali Desai',
      role: 'Head of Growth, Wellness Hub',
      content: 'The automation flows are pure gold. Set them up once and they run 24/7. Our customer lifetime value has doubled since we started.',
      revenue: '2x LTV increase',
      rating: 5
    }
  ];

  const brands = [
    'Mamaearth',
    'The Souled Store',
    'Bewakoof',
    'Boat Lifestyle',
    'Sugar Cosmetics',
    'Lenskart'
  ];

  return (
    <section id="social-proof" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Loved by India's fastest-growing brands
          </h2>
          <p className="text-xl text-gray-600">
            Join 500+ D2C brands using retention marketing to drive repeat revenue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
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

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary-700">{testimonial.revenue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-12 shadow-sm">
          <p className="text-center text-sm text-gray-500 mb-8 font-medium">
            TRUSTED BY LEADING INDIAN D2C BRANDS
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-50 hover:opacity-75 transition-opacity">
            {brands.map((brand, index) => (
              <div key={index} className="text-xl font-bold text-gray-400">
                {brand}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl font-heading font-bold text-gray-900 mb-2">95%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">4.8/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-gray-900 mb-2">24hrs</div>
            <div className="text-gray-600">Avg. Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
