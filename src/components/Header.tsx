import React, { useState, useEffect } from 'react';
import StarIcon from './icons/StarIcon';
import type { Page } from '../App';
import type { Tab } from './CalculatorPage';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  onNavigateToCalculators: (tab: Tab) => void;
  activeCalculator: Tab | null;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, onNavigateToCalculators, activeCalculator }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    return () => { // Cleanup function
      document.body.style.overflow = 'visible';
    };
  }, [isMenuOpen]);

  const handleLinkClick = (page: Page) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };
  
  const handleCalcLinkClick = (tab: Tab) => {
    setIsMenuOpen(false); // for mobile
    setIsDropdownOpen(false); // for desktop
    onNavigateToCalculators(tab);
  };

  const getLinkClasses = (page: Page) => {
    const baseClasses = "relative text-sm font-medium text-white/80 transition-colors hover:text-white py-2 group";
    const activeClasses = currentPage === page && !activeCalculator ? 'text-white' : '';
    return `${baseClasses} ${activeClasses}`;
  };

  const getAnalysesLinkClasses = () => {
    const baseClasses = "relative text-sm font-medium text-white/80 transition-colors hover:text-white py-2 group flex items-center gap-1";
    const activeClasses = activeCalculator ? 'text-white' : '';
    return `${baseClasses} ${activeClasses}`;
  };

  const getMobileLinkClasses = (page: Page) => {
    const baseClasses = "text-xl font-semibold transition-colors duration-300";
    const activeClasses = currentPage === page && !activeCalculator ? 'text-primary' : 'text-white hover:text-primary';
    return `${baseClasses} ${activeClasses}`;
  }

  const getMobileCalcLinkClasses = (tab: Tab) => {
     const baseClasses = "text-lg font-medium transition-colors duration-300 pl-4 py-2 block w-full text-left";
     const activeClasses = activeCalculator === tab ? 'text-primary' : 'text-white hover:text-primary';
     return `${baseClasses} ${activeClasses}`;
  }

  const analysesLinks: { tab: Tab, label: string, path: string }[] = [
      { tab: 'love', label: 'Aşk Uyumu', path: '/analiz/ask-uyumu' },
      { tab: 'personal', label: 'Kişisel Rapor', path: '/analiz/kisisel-rapor' },
      { tab: 'year', label: 'Kişisel Yıl Analizi', path: '/analiz/kisisel-yil' },
      { tab: 'career', label: 'Kariyer Potensiyeli', path: '/analiz/kariyer-potansiyeli' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-10 lg:px-20 py-4 bg-background-dark/80 backdrop-blur-lg border-b border-solid border-border-dark shadow-md shadow-black/25">
        <a 
          href="/"
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
          aria-label="Anasayfaya Git"
        >
          <div className="text-primary size-7 transition-transform duration-300 group-hover:rotate-[20deg]">
            <StarIcon />
          </div>
          <h1 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
            Numeroskop
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-end">
          <div className="flex items-center gap-9">
            <a href="/" className={getLinkClasses('home')} onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
              Anasayfa
              <span className={`absolute bottom-0 left-0 block h-0.5 w-full bg-primary transition-transform duration-300 ease-out origin-center ${currentPage === 'home' && !activeCalculator ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
            
            {/* Analyses Dropdown */}
            <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
              <button className={getAnalysesLinkClasses()}>
                Analizler
                <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                <span className={`absolute bottom-0 left-0 block h-0.5 w-full bg-primary transition-transform duration-300 ease-out origin-center ${activeCalculator ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 w-56 origin-top-right animate-fade-in-down pt-2">
                  <div className="bg-card-dark rounded-lg shadow-xl border border-border-dark">
                    <div className="py-2">
                      {analysesLinks.map(link => (
                          <a 
                            key={link.tab}
                            href={link.path} 
                            onClick={(e) => { e.preventDefault(); handleCalcLinkClick(link.tab); }} 
                            className={`block px-4 py-2 text-sm font-medium transition-colors ${activeCalculator === link.tab ? 'text-primary' : 'text-white/80 hover:bg-input-dark hover:text-white'}`}
                          >
                            {link.label}
                          </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="/numeroloji-nedir" className={getLinkClasses('info')} onClick={(e) => { e.preventDefault(); handleLinkClick('info'); }}>
              Numeroloji Nedir?
              <span className={`absolute bottom-0 left-0 block h-0.5 w-full bg-primary transition-transform duration-300 ease-out origin-center ${currentPage === 'info' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
            <a href="/iletisim" className={getLinkClasses('contact')} onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}>
              İletişim
              <span className={`absolute bottom-0 left-0 block h-0.5 w-full bg-primary transition-transform duration-300 ease-out origin-center ${currentPage === 'contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>
          </div>
        </nav>

        <div className="md:hidden z-50">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 -mr-2 flex flex-col justify-center items-center size-10"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label="Navigasyon menüsünü aç/kapat"
          >
            <span className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white my-1 transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
      >
        <div 
          onClick={() => setIsMenuOpen(false)} 
          className="absolute inset-0 bg-black/60"
        ></div>
        
        <nav 
          id="mobile-menu"
          className={`absolute top-0 right-0 h-full w-2/3 max-w-xs bg-background-dark shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col gap-8 pt-28 px-4">
            <a href="/" className={getMobileLinkClasses('home')} onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
              Anasayfa
            </a>
            <a href="/numeroloji-nedir" className={getMobileLinkClasses('info')} onClick={(e) => { e.preventDefault(); handleLinkClick('info'); }}>
              Numeroloji Nedir?
            </a>
            <a href="/iletisim" className={getMobileLinkClasses('contact')} onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}>
              İletişim
            </a>

            <div className="pt-6 mt-6 border-t border-border-dark">
                <h3 className="text-sm font-semibold text-white/50 px-4 mb-2">Analizler</h3>
                <div className="flex flex-col">
                    {analysesLinks.map(link => (
                         <a 
                           key={link.tab}
                           href={link.path} 
                           onClick={(e) => { e.preventDefault(); handleCalcLinkClick(link.tab); }} 
                           className={getMobileCalcLinkClasses(link.tab)}
                         >
                           {link.label}
                         </a>
                    ))}
                </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
