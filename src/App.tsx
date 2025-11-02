import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import type { Tab } from './components/CalculatorPage';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AppContext } from './hooks/useNavigation';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./components/HomePage'));
const CalculatorPage = lazy(() => import('./components/CalculatorPage'));
const NumerologyInfoPage = lazy(() => import('./components/NumerologyInfoPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const TermsOfServicePage = lazy(() => import('./components/TermsOfServicePage'));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const KvkkCookiePolicyPage = lazy(() => import('./components/KvkkCookiePolicyPage'));


export type Page = 'home' | 'info' | 'contact' | 'terms' | 'privacy' | 'about' | 'kvkk-cookie';

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
   about: {
      title: 'Hakkımızda & Metodoloji | Numeroskop',
      description: 'Numeroskop\'un misyonunu, kullandığımız Pisagorcu numeroloji metodolojisini ve projenin arkasındaki uzmanlık anlayışını öğrenin.'
  },
   'kvkk-cookie': {
      title: 'KVKK ve Çerez Politikası | Numeroskop',
      description: 'Numeroskop\'un kişisel verilerin korunması ve çerez kullanımı hakkındaki politikalarını detaylıca inceleyin.'
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

// Map Page enum to URL paths for routing
const pagePaths: Record<Page, string> = {
  home: '/',
  info: '/numeroloji-nedir',
  contact: '/iletisim',
  terms: '/kullanim-sartlari',
  privacy: '/gizlilik-politikasi',
  about: '/hakkimizda',
  'kvkk-cookie': '/kvkk-cerez-politikasi',
};

// Map Tab enum to URL paths for calculators
const tabPaths: Record<Tab, string> = {
  love: '/analiz/ask-uyumu',
  personal: '/analiz/kisisel-rapor',
  year: '/analiz/kisisel-yil',
  career: '/analiz/kariyer-potansiyeli',
};

// Reverse mappings for parsing URL to state
const pathToPage: Record<string, Page> = Object.entries(pagePaths).reduce((acc, [key, value]) => {
  acc[value] = key as Page;
  return acc;
}, {} as Record<string, Page>);

const pathToTab: Record<string, Tab> = Object.entries(tabPaths).reduce((acc, [key, value]) => {
  acc[value] = key as Tab;
  return acc;
}, {} as Record<string, Tab>);


const FullPageLoader: React.FC = () => (
    <div className="flex-grow flex items-center justify-center">
        <LoadingSpinner size="lg" />
    </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeCalculator, setActiveCalculator] = useState<Tab | null>(null);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);

  // Function to update state based on current URL
  const parsePathname = useCallback(() => {
    const path = window.location.pathname;
    let newPage: Page = 'home';
    let newTab: Tab | null = null;

    if (path.startsWith('/analiz/')) {
      const tabKey = Object.keys(tabPaths).find(key => tabPaths[key as Tab] === path);
      if (tabKey) {
        newPage = 'home'; // Calculators are conceptually part of home
        newTab = tabKey as Tab;
      }
    } else {
      const pageKey = Object.keys(pagePaths).find(key => pagePaths[key as Page] === path);
      if (pageKey) {
        newPage = pageKey as Page;
      }
    }
    
    setCurrentPage(newPage);
    setActiveCalculator(newTab);
  }, []);

  useEffect(() => {
    parsePathname(); // Parse on initial load

    // Listen for browser back/forward buttons
    window.addEventListener('popstate', parsePathname);
    return () => window.removeEventListener('popstate', parsePathname);
  }, [parsePathname]);


  useEffect(() => {
    // SEO: Sayfa başlığını ve açıklamasını dinamik olarak güncelle
    let meta;
    let canonicalUrl;
    let ogUrl;
    if (activeCalculator) {
      meta = pageMetadata.calculator[activeCalculator];
      canonicalUrl = `https://numeroskop.com.tr${tabPaths[activeCalculator]}`;
      ogUrl = canonicalUrl;
    } else {
      meta = pageMetadata[currentPage];
      canonicalUrl = `https://numeroskop.com.tr${pagePaths[currentPage]}`;
      ogUrl = canonicalUrl;
    }
    
    if (meta) {
      document.title = meta.title;
      const descriptionTag = document.getElementById('meta-description');
      if (descriptionTag) {
        descriptionTag.setAttribute('content', meta.description);
      }

      const ogTitleTag = document.getElementById('og-title');
      if (ogTitleTag) ogTitleTag.setAttribute('content', meta.title);
      const ogDescriptionTag = document.getElementById('og-description');
      if (ogDescriptionTag) ogDescriptionTag.setAttribute('content', meta.description);
      const twitterTitleTag = document.getElementById('twitter-title');
      if (twitterTitleTag) twitterTitleTag.setAttribute('content', meta.title);
      const twitterDescriptionTag = document.getElementById('twitter-description');
      if (twitterDescriptionTag) twitterDescriptionTag.setAttribute('content', meta.description);
    }

    // Update Canonical URL
    const canonicalLink = document.getElementById('canonical-link');
    if (canonicalLink) {
        canonicalLink.setAttribute('href', canonicalUrl);
    }
    const ogUrlTag = document.getElementById('og-url');
    if (ogUrlTag) ogUrlTag.setAttribute('content', ogUrl);


    // Dynamically inject JSON-LD schema
    const jsonLdSchemaTag = document.getElementById('json-ld-schema');
    if (jsonLdSchemaTag) {
        let schema: any = {};
        if (currentPage === 'home' && !activeCalculator) {
            schema = {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebSite",
                        "url": "https://numeroskop.com.tr/",
                        "name": "Numeroskop",
                        "description": pageMetadata.home.description,
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://numeroskop.com.tr/?s={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Numeroloji gerçek bir bilim midir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Numeroloji, sayıların sembolik anlamlarını inceleyen kadim bir metafizik bilimidir. Modern bilimsel yöntemlerle kanıtlanmamış olsa da, binlerce yıldır kişisel keşif ve rehberlik için kullanılmıştır. Bilimsel bir olgu değil, spiritüel bir araçtır."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Numeroloji falcılık mıdır?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hayır, numeroloji falcılık değildir. Geleceği kesin olarak tahmin etme iddiasında bulunmaz. Bunun yerine, sayıların enerjilerini analiz ederek kişiliğiniz, potansiyeliniz ve yaşam yolunuzdaki eğilimler hakkında içgörüler sunar. Bireysel kararlarınızı desteklemek ve kendinizi daha iyi anlamak için bir rehberdir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Hangi numeroloji sistemini kullanıyorsunuz?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Numeroskop, Batı dünyasında en yaygın ve kabul gören Pisagor (Pythagorean) Numeroloji sistemini temel almaktadır. Bu sistem, harflere 1'den 9'a kadar değerler atar ve doğum tarihi ile isminiz üzerinden yapılan hesaplamalarla analizler sunar."
                                }
                            },
                             {
                                "@type": "Question",
                                "name": "Usta Sayılar (11, 22, 33) ne anlama gelir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Usta Sayılar, daha yüksek bir potansiyel ve daha büyük yaşam dersleri taşıyan özel sayılar haunting. Normal tek haneli sayılara indirgenmezler ve genellikle büyük bir misyon veya insanlığa hizmet etme potansiyeli ile ilişkilendirilirler. Aynı zamanda bu sayılarla yaşamak daha yoğun zorluklar ve sorumluluklar da getirebilir."
                                }
                            },
                             {
                                "@type": "Question",
                                "name": "Numeroloji raporumdaki bilgiler neden önemlidir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Raporunuzdaki Yaşam Yolu, Kader, Ruh Dürtüsü ve Kişilik Sayıları gibi temel numerolojik göstergeler, kendinizi daha iyi tanımanızı sağlar. Güçlü yönlerinizi, potansiyelinizi, içsel motivasyonlarınızı ve üzerinde çalışmanız gereken alanları anlamanıza yardımcı olur. Bu bilgiler, hayatınızdaki bilinçli seçimler yapmanız ve en yüksek potansiyelinize ulaşmanız için bir pusula görevi görür."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Yaşam Yolu Sayısı nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Doğum tarihinizden türetilen bu sayı, hayatınızdaki ana temayı, en büyük dersleri, fırsatları ve zorlukları temsil eden en önemli numerolojik göstergedir. O, sizin kim olduğunuzun ve bu dünyaya ne getirdiğinizin özüdür."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Kader (İsim) Sayısı nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Tam isminizdeki harflerin numerolojik değerlerinden hesaplanır. Bu sayı, doğal yeteneklerinizi, potansiyelinizi ve hayatta neyi başarmak için burada olduğunuzu ortaya koyar. Kaderinize giden yolun haritasıdır."
                                }
                            },
                             {
                                "@type": "Question",
                                "name": "Ruh Dürtüsü Sayısı nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "İsminizdeki sesli harflerden türetilir ve kalbinizin en derin arzularını, gerçek motivasyonlarınızı ve sizi içten içe neyin mutlu ettiğini gösterir. Bu, ruhunuzun fısıltısıdır."
                                }
                            },
                             {
                                "@type": "Question",
                                "name": "Kişilik Sayısı nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "İsminizdeki sessiz harflerin toplamından elde edilir. Dış dünyaya nasıl göründüğünüzü, insanların sizi ilk başta nasıl algıladığını ve kendinizin hangi yönlerini rahatça gösterdiğinizi anlatır. Sizin sosyal maskenizdir."
                                }
                            }
                        ]
                    }
                ]
            };
        } else {
            // BreadcrumbList for other pages
            const pathSegments = [];
            if (currentPage !== 'home') {
                pathSegments.push({ name: 'Anasayfa', item: 'https://numeroskop.com.tr/' });
            }
            if (activeCalculator) {
                pathSegments.push({ name: 'Analizler', item: 'https://numeroskop.com.tr/#analizler' }); // Anchor link to analyses section on home
                pathSegments.push({ name: pageMetadata.calculator[activeCalculator].title.split(' | ')[0], item: canonicalUrl });
            } else {
                pathSegments.push({ name: meta.title.split(' | ')[0], item: canonicalUrl });
            }

            schema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": pathSegments.map((segment, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "name": segment.name,
                    "item": segment.item
                }))
            };
        }
        jsonLdSchemaTag.textContent = JSON.stringify(schema, null, 2);
    }
  }, [currentPage, activeCalculator]);

  const handleNavigate = (page: Page) => {
    const targetPath = pagePaths[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
      setCurrentPage(page);
      setActiveCalculator(null);
    } else {
      // If already on the page, just ensure states are correct
      setCurrentPage(page);
      setActiveCalculator(null);
    }
  };

  const handleNavigateToCalculators = (tab: Tab) => {
    const targetPath = tabPaths[tab];
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
      setCurrentPage('home'); // Calculators are part of the home page structure in terms of layout
      setActiveCalculator(tab);
    } else {
      // If already on the calculator page, just ensure states are correct
      setActiveCalculator(tab);
      setCurrentPage('home');
    }
  };

  const handleNavigateToHomeAndScroll = (sectionId: string) => {
    if (currentPage === 'home' && !activeCalculator) {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Navigate to home page and then set scroll
      window.history.pushState(null, '', '/');
      setCurrentPage('home');
      setActiveCalculator(null);
      setScrollToSection(sectionId);
    }
  };
  
  const handleBackToHome = () => {
    window.history.pushState(null, '', '/');
    setActiveCalculator(null);
    setCurrentPage('home');
  };

  useEffect(() => {
    if (currentPage === 'home' && scrollToSection) {
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
  }, [currentPage, scrollToSection, activeCalculator]);
  
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
        return <HomePage onNavigateToCalculators={handleNavigateToCalculators} onNavigate={handleNavigate} />;
      case 'info':
        return <NumerologyInfoPage onNavigateToCalculators={handleNavigateToCalculators} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'about':
        return <AboutPage />;
      case 'kvkk-cookie':
        return <KvkkCookiePolicyPage />;
      default:
        return <HomePage onNavigateToCalculators={handleNavigateToCalculators} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark">
      <Header onNavigate={handleNavigate} currentPage={currentPage} onNavigateToCalculators={handleNavigateToCalculators} activeCalculator={activeCalculator} />
      <main className="flex-grow flex flex-col">
        <AppContext.Provider value={{
            // Fix: Referencing the actual handler functions.
            onNavigate: handleNavigate,
            onNavigateToCalculators: handleNavigateToCalculators,
            onNavigateToHomeAndScroll: handleNavigateToHomeAndScroll,
        }}>
          <Suspense fallback={<FullPageLoader />}>
              {renderContent()}
          </Suspense>
        </AppContext.Provider>
      </main>
      <Footer onNavigate={handleNavigate} onNavigateToCalculators={handleNavigateToCalculators} onNavigateToHomeAndScroll={handleNavigateToHomeAndScroll} />
    </div>
  );
};

export default App;