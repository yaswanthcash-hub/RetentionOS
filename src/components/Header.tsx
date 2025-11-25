import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Services', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Case studies', href: '#case-studies' },
    { label: 'Results', href: '#results' },
    { label: 'FAQ', href: '#faq' },
  ];

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a
            href="#top"
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer"
            aria-label="Scroll to top"
          >
            <img src="/Group 1430105540.png" alt="RetentionOS" className="h-12" />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
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
              className="px-6 py-3 bg-black text-[#D1F26E] font-semibold rounded-full hover:bg-[#D1F26E] hover:text-black hover:shadow-lg hover:shadow-[#D1F26E]/20 transition-all duration-300 hover:scale-105 inline-block"
            >
              Let's Connect ➡️
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
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://calendly.com/hi-retentionos/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="w-full px-6 py-3 bg-black text-[#D1F26E] font-semibold rounded-full hover:bg-[#D1F26E] hover:text-black hover:shadow-lg hover:shadow-[#D1F26E]/20 transition-all duration-300 hover:scale-105 inline-block text-center"
            >
              Let's Connect ➡️
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
