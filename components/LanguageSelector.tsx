'use client';

// components/LanguageSelector.tsx
import { useState } from 'react';

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  className?: string;
}

export default function LanguageSelector({ value, onChange, className = '' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedLanguage = languages.find(l => l.code === value) || languages[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-primary transition font-semibold text-sm"
      >
        <span className="text-xl">{selectedLanguage.flag}</span>
        <span>{selectedLanguage.code.toUpperCase()}</span>
        <span className="text-gray-400">▼</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-20">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  onChange(language.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center justify-between ${
                  language.code === value ? 'bg-gray-50 font-semibold' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div className="font-semibold">{language.name}</div>
                    <div className="text-xs text-gray-500">{language.nativeName}</div>
                  </div>
                </div>
                {language.code === value && (
                  <span style={{ color: '#D1F25E' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
