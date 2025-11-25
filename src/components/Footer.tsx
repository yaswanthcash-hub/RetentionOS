import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Email Marketing', href: '#email' },
        { label: 'SMS Campaigns', href: '#sms' },
        { label: 'WhatsApp Marketing', href: '#whatsapp' },
        { label: 'Marketing Automation', href: '#automation' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Case Studies', href: '#case-studies' },
        { label: 'Careers', href: '#careers' },
        { label: 'Blog', href: '#blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '#help' },
        { label: 'Documentation', href: '#docs' },
        { label: 'Templates', href: '#templates' },
        { label: 'Webinars', href: '#webinars' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img src="/Group 1430105721.png" alt="RetentionOS" className="h-12" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Turn first-time buyers into lifelong customers with retention marketing that drives repeat revenue for Indian D2C brands.
            </p>
            <div className="space-y-3">
              <a href="mailto:hi@retentionos.io" className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <Mail className="w-4 h-4" />
                <span>hi@retentionos.io</span>
              </a>
              <a href="tel:+919505551760" className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 95055 51760</span>
              </a>
              <a href="tel:+919666616312" className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91 96666 16312</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-heading font-bold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-primary-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#privacy" className="hover:text-primary-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-primary-500 transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-primary-500 transition-colors">
                Cookie Policy
              </a>
              <a href="#gdpr" className="hover:text-primary-500 transition-colors">
                GDPR Compliance
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/retentionos-io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-500">
            © {currentYear} RetentionOS. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
