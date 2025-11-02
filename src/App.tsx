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
const AboutPage = lazy(() => import('./components/AboutPage'));


export type Page = 'home' | 'info' | 'contact' | 'terms' | 'privacy' | 'about';

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
    // SEO: Sayfa başlığını ve açıklamasını dinamik olarak güncelle
    let meta;
    let canonicalUrl;
    let ogUrl;
    if (activeCalculator) {
      meta = pageMetadata.calculator[activeCalculator];
      canonicalUrl = `https://numeroskop.com.tr/analiz/${activeCalculator}`;
      ogUrl = canonicalUrl;
    } else {
      meta = pageMetadata[currentPage];
      canonicalUrl = currentPage === 'home' ? 'https://numeroskop.com.tr' : `https://numeroskop.com.tr/${currentPage === 'info' ? 'numeroloji-nedir' : currentPage}`;
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
    setCurrentPage(page);
    setActiveCalculator(null);
  };

  const handleNavigateToCalculators = (tab: Tab) => {
    setCurrentPage('home'); 
    setActiveCalculator(tab);
  };

  const handleNavigateToHomeAndScroll = (sectionId: string) => {
    if (currentPage === 'home' && !activeCalculator) {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setCurrentPage('home');
      setActiveCalculator(null);
      setScrollToSection(sectionId);
    }
  };
  
  const handleBackToHome = () => {
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
  }, [currentPage, scrollToSection]);
  
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
        return <NumerologyInfoPage onNavigateToCalculators={() => handleNavigateToCalculators('personal')} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigateToCalculators={handleNavigateToCalculators} onNavigate={handleNavigate} />;
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