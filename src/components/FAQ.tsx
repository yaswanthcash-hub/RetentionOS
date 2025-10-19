import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How is this different from hiring an email marketing agency?',
      answer: 'We\'re not just sending emails. We build your entire retention system—WhatsApp, SMS, Email, and the automation that ties it together. Plus, we\'re obsessed with one metric: repeat revenue, not open rates. Most agencies send pretty newsletters. We build systems that make you money.',
    },
    {
      question: 'Do I need to know how to code or use complex software?',
      answer: 'Nope. We handle all the technical setup, integrations, and campaign building. You just approve the strategy and watch the revenue come in. We provide a clean dashboard that shows what matters: revenue attribution and ROI.',
    },
    {
      question: 'What if my brand is new and I don\'t have much customer data?',
      answer: 'Perfect time to start. We\'ll build retention foundations now so you\'re not leaving money on the table as you scale. The earlier you start, the more you compound. Even with 500 customers, we can implement high-ROI flows.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes. We work on monthly contracts. If it\'s not working, cancel with 30 days notice. But we\'re confident you won\'t want to—our client retention rate is 94%. We practice what we preach.',
    },
    {
      question: 'How long before I see results?',
      answer: 'Most clients see measurable lift in repeat purchases within 30-45 days. By day 90, you should see significant LTV improvement. We track everything so you know exactly what\'s working. On average, brands see 3.2x LTV increase in 90 days.',
    },
    {
      question: 'What platforms do you work with?',
      answer: 'We integrate with Shopify, WooCommerce, Magento, custom solutions, and virtually any e-commerce platform. We also connect with your existing tools like Google Analytics, Facebook Pixel, payment gateways, and CRMs.',
    },
    {
      question: 'How do you handle WhatsApp and SMS compliance?',
      answer: 'All SMS campaigns are fully DLT compliant with pre-approved templates. For WhatsApp, we use the official Business API with proper opt-in mechanisms. We handle all regulatory requirements so you stay 100% compliant. Zero risk.',
    },
    {
      question: 'Do you work with brands outside India?',
      answer: 'While we specialize in the Indian D2C market (DLT compliance, INR pricing, local payment methods), we do work with international brands. Our retention strategies are universal, but our expertise is deeply rooted in Indian e-commerce.',
    },
    {
      question: 'What\'s included in the 90-day guarantee?',
      answer: 'If we don\'t increase your repeat revenue within 90 days, we\'ll refund 100% of your fees. No questions asked. We only win when you win. That\'s how confident we are in our system.',
    },
    {
      question: 'Can you handle multiple brands under one account?',
      answer: 'Yes, our Enterprise plan supports multi-brand management. You get consolidated reporting, shared templates, centralized account management, and volume discounts across all your brands.',
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
            The Questions Everyone Asks
          </h2>
          <p className="text-xl text-gray-600">
            (And our honest answers)
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
              href="mailto:hi@retentionos.io"
              className="px-6 py-3 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transition-colors font-semibold"
            >
              Email Us
            </a>
            <a
              href="tel:+919505551760"
              className="px-6 py-3 bg-primary-500 text-black rounded-full hover:bg-primary-600 transition-colors font-semibold"
            >
              Call +91 95055 51760
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
