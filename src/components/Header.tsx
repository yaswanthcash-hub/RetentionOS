import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const menuItems = [
    { label: 'Services', href: '#features' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Testimonials', href: '#social-proof' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img src="/Group 1430105540.png" alt="RetentionOS" className="h-12" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="https://calendly.com/hi-retentionos/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary-500 text-black font-semibold rounded-full hover:bg-primary-600 transition-all duration-300 hover:scale-105 inline-block"
            >
              Book Free Audit
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-700 hover:text-primary-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="px-6 py-4 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-gray-700 hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://calendly.com/hi-retentionos/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="w-full px-6 py-3 bg-primary-500 text-black font-semibold rounded-full hover:bg-primary-600 transition-colors inline-block text-center"
            >
              Book Free Audit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
