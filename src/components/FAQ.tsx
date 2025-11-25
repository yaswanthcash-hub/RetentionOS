import { useState } from 'react';
import { ChevronDown, Mail, Phone } from 'lucide-react';

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
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">
            The Questions Everyone Asks
          </h2>
          <p className="text-base text-gray-600">
            (And our honest answers)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:border-[#D1F26E] hover:bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 py-3.5 flex items-start justify-between text-left group"
              >
                <span className="font-bold text-gray-900 pr-4 text-sm leading-snug group-hover:text-[#D1F26E] transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 mt-0.5 ${
                    openIndex === index ? 'rotate-180 text-[#D1F26E]' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-80' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-4 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center p-6 bg-gray-900 rounded-xl">
          <h3 className="text-lg font-heading font-bold text-white mb-1">
            Still have questions?
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Connect with our team and we'll answer all your questions
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:hi@retentionos.io"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors font-semibold text-sm border border-gray-700"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
            <a
              href="tel:+919505551760"
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#D1F26E] text-black rounded-full hover:bg-white transition-colors font-black text-sm"
            >
              <Phone className="w-4 h-4" />
              Call +91 95055 51760
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
