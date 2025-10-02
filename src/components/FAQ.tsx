import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How quickly can we get started?',
      answer: 'Most brands are up and running within 72 hours. After your free audit call, we handle all the technical setup, integration with your store, and initial campaign configuration. You can start seeing results from day one.',
    },
    {
      question: 'Do I need technical expertise to use your platform?',
      answer: 'Not at all. Our team handles all the technical setup, automation building, and ongoing optimization. You simply approve campaigns and watch the results roll in. We provide a simple dashboard to track performance.',
    },
    {
      question: 'What platforms do you integrate with?',
      answer: 'We integrate with all major Indian e-commerce platforms including Shopify, WooCommerce, Magento, and custom solutions. We also connect with your existing tools like Google Analytics, Facebook Pixel, and payment gateways.',
    },
    {
      question: 'How do you ensure SMS and WhatsApp compliance?',
      answer: 'All our SMS campaigns are fully DLT compliant. For WhatsApp, we use the official WhatsApp Business API with proper opt-in mechanisms. We handle all regulatory requirements so you stay compliant.',
    },
    {
      question: 'What kind of results can I expect?',
      answer: 'On average, our clients see a 30-50% increase in repeat purchase rate within 90 days. Typical results include ₹8-15L in additional revenue for brands doing ₹25-50L monthly. Results vary based on your current retention metrics and customer base.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, absolutely. There are no long-term contracts. You can cancel your subscription anytime with 30 days notice. We also offer a 90-day money-back guarantee if we don\'t deliver the promised results.',
    },
    {
      question: 'How is pricing calculated?',
      answer: 'Pricing is based on your monthly revenue and contact list size. We offer three tiers: Starter (₹25K/mo), Growth (₹65K/mo), and Enterprise (custom). All plans include setup, automation, support, and regular optimization.',
    },
    {
      question: 'Do you provide support and training?',
      answer: 'Yes. All plans include email support. Growth and Enterprise plans include dedicated account managers, weekly/monthly strategy calls, and a Slack channel for instant support. We also provide training on reading reports and optimizing campaigns.',
    },
    {
      question: 'What makes you different from tools like Mailchimp or Klaviyo?',
      answer: 'Unlike DIY tools, we\'re a done-for-you service. Our team builds, launches, and optimizes your campaigns. We specialize in the Indian D2C market with WhatsApp integration, DLT compliance, and localized strategies that convert.',
    },
    {
      question: 'Can you handle multiple brands or stores?',
      answer: 'Yes, our Enterprise plan supports multi-brand management. You get consolidated reporting, shared templates, and centralized account management across all your brands.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about getting started
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-heading font-bold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary-700 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-white rounded-2xl border border-gray-200">
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Book a free call with our team and we'll answer all your questions
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@retentionos.com"
              className="px-6 py-3 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transition-colors font-semibold"
            >
              Email Us
            </a>
            <a
              href="tel:+919876543210"
              className="px-6 py-3 bg-primary-500 text-black rounded-full hover:bg-primary-600 transition-colors font-semibold"
            >
              Call +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
