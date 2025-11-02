
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import type { Tab } from './components/CalculatorPage';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./components/HomePage'));
const CalculatorPage = lazy(() => import('./components/CalculatorPage'));
const NumerologyInfoPage = lazy(() => import('./components/NumerologyInfoPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const TermsOfServicePage = lazy(() => import('./components/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage'));


export type Page = 'home' | 'info' | 'contact' | 'terms' | 'privacy';

const pageToPath: { [key in Page]: string } = {
  home: '/',
  info: '/numeroloji-nedir',
  contact: '/iletisim',
  terms: '/kullanim-sartlari',
  privacy: '/gizlilik-politikasi'
};

const calculatorToPath: { [key in Tab]: string } = {
  love: '/analiz/ask-uyumu',
  personal: '/analiz/kisisel-rapor',
  year: '/analiz/kisisel-yil',
  career: '/analiz/kariyer-potansiyeli'
};

const pathTocalculator: { [key: string]: Tab } = {
  '/analiz/ask-uyumu': 'love',
  '/analiz/kisisel-rapor': 'personal',
  '/analiz/kisisel-yil': 'year',
  '/analiz/kariyer-potensiyeli': 'career'
};

const pathToPage: { [key: string]: Page } = {
  '/': 'home',
  '/numeroloji-nedir': 'info',
  '/iletisim': 'contact',
  '/kullanim-sartlari': 'terms',
  '/gizlilik-politikasi': 'privacy'
};


const pageMetadata = {
  home: {
    title: 'Numeroskop | Ücretsiz Numeroloji Analizi - Aşk, Kariyer, Kişilik Raporu',
    description: 'Numeroskop ile isminizin ve doğum tarihinizin sırlarını çözün. Ücretsiz numeroloji hesaplama aracıyla anında aşk uyumu, kariyer potansiyeli, kişisel yıl ve karakter analizi yapın.'
  },
  info: {
    title: 'Numeroloji Nedir? | Numeroskop',
    description: 'Numerolojinin kökenlerini, nasıl çalıştığını ve yaşam yolu, kader sayısı gibi temel kavramların hayatınızı nasıl etkilediğini öğrenin.'
  },
  contact: {
    title: 'İletişim | Numeroskop',
    description: 'Numeroskop ile ilgili soru, öneri ve geri bildirimleriniz için bize ulaşın. Size yardımcı olmaktan mutluluk duyarız.'
  },
  terms: {
    title: 'Kullanım Şartları | Numeroskop',
    description: 'Numeroskop web sitesinin kullanım şartları ve gizlilik politikası hakkında detaylı bilgi alın.'
  },
  privacy: {
    title: 'Gizlilik Politikası | Numeroskop',
    description: 'Numeroskop web sitesinin gizlilik politikası, hangi verileri topladığımızı ve nasıl kullandığımızı öğrenin.'
  },
  calculator: {
    love: {
      title: 'Aşk Uyumu Hesaplama | Numeroskop',
      description: 'Partnerinizle aranızdaki numerolojik aşk uyumunu, ilişkinizin güçlü ve zayıf yönlerini ücretsiz olarak anında öğrenin.'
    },
    personal: {
      title: 'Kişisel Numeroloji Raporu | Numeroskop',
      description: 'Ücretsiz kişisel numeroloji raporu ile yaşam yolu, kader ve kişilik sayılarınızı öğrenin. Karakterinizin sırlarını keşfedin.'
    },
    year: {
      title: 'Kişisel Yıl Analizi | Numeroskop',
      description: 'Bu yılın sizin için numerolojik olarak neler getireceğini öğrenin. Fırsatları ve zorlukları önceden bilerek adımlarınızı planlayın.'
    },
    career: {
      title: 'Kariyer ve Potansiyel Analizi | Numeroskop',
      description: 'Doğal yeteneklerinize en uygun kariyer yollarını ve profesponel potansiyelinizi numeroloji ile ücretsiz olarak keşfedin.'
    }
  }
};

const FullPageLoader: React.FC = () => (
    <div className="flex-grow flex items-center justify-center">
        <LoadingSpinner size="lg" />
    </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeCalculator, setActiveCalculator] = useState<Tab | null>(null);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;

      if (path.startsWith('/analiz/')) {
        const tab = pathTocalculator[path];
        if (tab) {
          setActiveCalculator(tab);
          setCurrentPage('home'); 
        } else {
           setCurrentPage('home');
           setActiveCalculator(null);
        }
      } else {
        const page = pathToPage[path];
        setActiveCalculator(null);
        setCurrentPage(page || 'home'); 
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange(); // Initial load

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    let meta;
    if (activeCalculator) {
      meta = pageMetadata.calculator[activeCalculator];
    } else {
      meta = pageMetadata[currentPage];
    }
    
    if (meta) {
      document.title = meta.title;

      const currentPath = window.location.pathname;
      const canonicalUrl = `https://numeroskop.com.tr${currentPath === '/' ? '' : currentPath}`;

      const setMetaAttribute = (id: string, attribute: string, value: string) => {
        const element = document.getElementById(id);
        if (element) {
          element.setAttribute(attribute, value);
        }
      };
      
      const setMetaContent = (id: string, content: string) => {
          setMetaAttribute(id, 'content', content);
      };
      
      setMetaContent('meta-description', meta.description);
      setMetaAttribute('canonical-link', 'href', canonicalUrl);

      setMetaContent('og-url', canonicalUrl);
      setMetaContent('og-title', meta.title);
      setMetaContent('og-description', meta.description);
      
      setMetaContent('twitter-title', meta.title);
      setMetaContent('twitter-description', meta.description);
    }

  }, [currentPage, activeCalculator]);
  
  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  const handleNavigate = (page: Page) => {
    navigate(pageToPath[page]);
  };

  const handleNavigateToCalculators = (tab: Tab) => {
    navigate(calculatorToPath[tab]);
  };

  const handleNavigateToHomeAndScroll = (sectionId: string) => {
    const isAlreadyHome = window.location.pathname === '/';
    if (isAlreadyHome) {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/');
      setScrollToSection(sectionId);
    }
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    if (currentPage === 'home' && !activeCalculator && scrollToSection) {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setScrollToSection(null);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!activeCalculator && currentPage !== 'home') {
       window.scrollTo(0, 0);
    }
  }, [currentPage, activeCalculator, scrollToSection]);
  
  useEffect(() => {
     if (activeCalculator) {
        window.scrollTo(0, 0);
     }
  }, [activeCalculator]);


  const renderContent = () => {
    if (activeCalculator) {
      return <CalculatorPage initialTab={activeCalculator} onBack={handleBackToHome} />;
    }
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigateToCalculators={handleNavigateToCalculators} />;
      case 'info':
        return <NumerologyInfoPage onNavigateToCalculators={() => handleNavigateToCalculators('personal')} />;
      case 'contact':
        return <ContactPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      default:
        return <HomePage onNavigateToCalculators={handleNavigateToCalculators} />;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark">
      <Header onNavigate={handleNavigate} currentPage={currentPage} onNavigateToCalculators={handleNavigateToCalculators} activeCalculator={activeCalculator} />
      <main className="flex-grow flex flex-col">
        <Suspense fallback={<FullPageLoader />}>
            {renderContent()}
        </Suspense>
      </main>
      <Footer onNavigate={handleNavigate} onNavigateToCalculators={handleNavigateToCalculators} onNavigateToHomeAndScroll={handleNavigateToHomeAndScroll} />
    </div>
  );
};

export default App;
