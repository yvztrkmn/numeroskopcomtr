import React, { useState, useEffect } from 'react';
import DailyNumber from './DailyNumber';
import type { Tab } from './CalculatorPage';
import { getUser } from '../services/userService';
import type { User } from '../types';
import Dashboard from './Dashboard';
import AnimatedInfographic from './AnimatedInfographic';
import type { Page } from '../App';


// --- Veri ve Tip Tanımları ---
interface NumerologyFact {
    id: number;
    category: 'Tarihçe' | 'Kültürel' | 'Teknik Bilgi' | 'İlginç Gerçek';
    icon: string; // Material Symbols icon name
    fact: string;
}

const numerologyFacts: NumerologyFact[] = [
    { id: 1, category: 'Tarihçe', icon: 'history_edu', fact: 'Modern numerolojinin babası Pisagor, sayıların sadece matematiksel değil, aynı zamanda ruhsal ve titreşimsel anlamları olduğuna inanırdı. Ancak numerolojinin kökleri çok daha eskiye, Babil ve Mısır medeniyetlerine kadar uzanır.' },
    { id: 2, category: 'Kültürel', icon: 'public', fact: 'Çin kültüründe 8 sayısı, zenginlik ve şansla ilişkilendirilir çünkü "zenginlik" kelimesinin telaffuzuna benzer. Bu yüzden 2008 Pekin Olimpiyatları 8. ayın 8. günü saat 8\'de başlatılmıştır.' },
    { id: 3, category: 'Teknik Bilgi', icon: 'calculate', fact: 'Keldani (Chaldean) numerolojisi, Pisagor sisteminden daha eskidir ve harflere 1\'den 8\'e kadar değerler atar. 9 sayısı kutsal kabul edildiği için harflere atanmaz ve ismin "dış" titreşimine odaklanır.' },
    { id: 4, category: 'Teknik Bilgi', icon: 'star', fact: '11, 22 ve 33 "Usta Sayılar" olarak bilinir. Bu sayılar, daha yüksek bir potansiyel ve daha büyük yaşam zorlukları getirir. 33 "Usta Öğretmen" olarak en güçlüsü kabul edilir, ancak aynı zamanda en nadir olanıdır.' },
    { id: 5, category: 'İlginç Gerçek', icon: 'theater_comedy', fact: 'William Shakespeare\'in numeroloji ile ilgilendiğine dair teoriler vardır. İncil\'in Kral James çevirisi 46 yaşında tamamlandığında, Mezmurlar 46\'nın başından 46. kelimesinin "shake", sonundan 46. kelimesinin ise "spear" olduğu iddia edilir.' },
    { id: 6, category: 'Teknik Bilgi', icon: 'gavel', fact: '"Karmik Borç Sayıları" (13, 14, 16, 19), geçmiş yaşamlardan getirilen ve bu hayatta üzerinde çalışılması gereken dersleri temsil ettiğine inanılır. Örneğin 14, özgürlüğün kötüye kullanılmasından kaynaklanan bir karmik borcu simgeler.' },
    { id: 7, category: 'Kültürel', icon: 'translate', fact: 'Batı kültüründe 13 sayısı uğursuz kabul edilirken, İtalya\'da uğursuz sayı 17\'dir. Japonya\'da ise 4 sayısı "ölüm" kelimesiyle benzer şekilde telaffuz edildiği için uğursuz sayılır ve birçok binada 4. kat bulunmaz.' },
    { id: 8, category: 'İlginç Gerçek', icon: 'psychology', fact: 'Ünlü psikanalist Carl Jung, sayıların arketipler olduğuna ve kolektif bilinçdışımızda derin anlamlar taşıdığına inanıyordu. Sayıların bu evrensel sembolizmi, numerolojinin temelini oluşturur.' },
    { id: 9, category: 'Teknik Bilgi', icon: 'sync_alt', fact: '"Köprü Sayıları", temel numeroloji sayılarınız (örneğin Yaşam Yolu ve Kader Sayısı) arasındaki farktan hesaplanır. Bu sayılar, bu iki ana enerji arasında nasıl bir denge kurabileceğinize dair ipuçları verir.' },
    { id: 10, category: 'Tarihçe', icon: 'auto_stories', fact: 'İncil\'de sayılar sembolik olarak sıkça kullanılır. 7 sayısı kutsallığı ve tamamlanmayı (Tanrı\'nın dünyayı 7 günde yaratması), 40 sayısı ise deneme ve dönüşüm sürecini (Hz. Musa\'nın çölde 40 yıl geçirmesi) temsil eder.' },
    { id: 11, category: 'Kültürel', icon: 'style', fact: 'Tarot kartları ve numeroloji arasında güçlü bir bağlantı vardır. Büyük Arkana\'nın her kartı bir sayıya karşılık gelir ve bu sayının numerolojik anlamı, kartın yorumunu derinleştirir. Örneğin, 1 numaralı Büyücü kartı, 1 sayısının liderlik ve başlangıç enerjisini taşır.' },
    { id: 12, category: 'İlginç Gerçek', icon: 'home', fact: 'Adres numerolojisi, yaşadığınız veya çalıştığınız yerin adresindeki sayıların hayatınızı nasıl etkilediğini inceler. Örneğin, toplamı 6 olan bir ev, aile ve uyum için harika bir enerjiye sahip olduğuna inanılır.' }
];

// --- NumerologyFacts Bileşeninin İçeriği ---
const NumerologyFactsSection: React.FC = () => {
    const getDayOfYear = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };
    
    const initialIndex = getDayOfYear() % numerologyFacts.length;

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [fact, setFact] = useState<NumerologyFact>(numerologyFacts[initialIndex]);
    const [isAnimating, setIsAnimating] = useState(false);

    const changeFact = (newIndex: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setFact(numerologyFacts[newIndex]);
            setIsAnimating(false);
        }, 300);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % numerologyFacts.length;
        changeFact(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + numerologyFacts.length) % numerologyFacts.length;
        changeFact(prevIndex);
    };

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Sayıların Bilinmeyen Yönleri</h2>
                <p className="mt-3 text-white/60 max-w-xl mx-auto">Her gün numerolojinin büyüleyici dünyasından yeni bir sır perdesini aralayın.</p>
            </div>
            <div className="relative bg-card-dark rounded-2xl p-8 min-h-[280px] flex flex-col justify-center items-center border border-border-dark shadow-2xl overflow-hidden">
                <div 
                    className={`transition-all duration-300 ease-in-out w-full text-center ${isAnimating ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'}`}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-accent text-2xl">{fact.icon}</span>
                        <span className="text-accent font-semibold text-sm tracking-wider uppercase">{fact.category}</span>
                    </div>
                    <p className="text-white/90 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
                        "{fact.fact}"
                    </p>
                </div>
                
                {/* Navigation Buttons */}
                <button 
                    onClick={handlePrev} 
                    aria-label="Önceki Bilgi"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 text-white p-2 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button 
                    onClick={handleNext} 
                    aria-label="Sonraki Bilgi"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 text-white p-2 rounded-full transition-colors"
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>

                 {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {numerologyFacts.map((_, index) => (
                        <div 
                            key={index} 
                            className={`size-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary scale-125' : 'bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


interface HomePageProps {
  onNavigateToCalculators: (tab: Tab) => void;
  onNavigate: (page: Page) => void;
}

const InternalLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className="text-primary hover:underline">
        {children}
    </a>
);


const AccordionItem: React.FC<{ icon: string, title: string, children: React.ReactNode, startOpen?: boolean }> = ({ icon, title, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);
  return (
    <div className="border-b border-border-dark">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-5 text-left transition-colors hover:bg-white/5">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
          <h4 className="font-semibold text-white text-lg">{title}</h4>
        </div>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      {isOpen && (
        <div className="pb-5 px-1 text-white/70 animate-fade-in-down prose prose-invert max-w-none text-white/70">
          {children}
        </div>
      )}
    </div>
  );
};

const JourneyStep: React.FC<{ number: number; text: string }> = ({ number, text }) => (
    <li className="flex items-start gap-3">
        <div className="flex-shrink-0 size-6 bg-primary/20 text-primary font-bold text-sm flex items-center justify-center rounded-full mt-1">
            {number}
        </div>
        <p className="text-white/80">{text}</p>
    </li>
);

const FeatureCard: React.FC<{ icon: string; title: string; description: string; onClick: () => void }> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="group bg-card-dark p-6 rounded-2xl text-center flex flex-col items-center border border-transparent hover:border-primary/50 hover:bg-card-dark-start transition-all duration-300 transform hover:-translate-y-2 w-full">
        <div className="bg-primary/10 rounded-full p-4 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-6">
            <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 text-center">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed text-center">{description}</p>
    </button>
);

const DefaultHomePage: React.FC<HomePageProps> = ({ onNavigateToCalculators, onNavigate }) => {
    const handleHeroCtaClick = () => {
        const destination: Tab = Math.random() < 0.5 ? 'love' : 'personal';
        onNavigateToCalculators(destination);
    };

    return (
    <>
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tighter">
          Hayatınızın Gizemini <span className="text-primary">Sayılarla</span> Çözün
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-white/70">
          Numeroskop, isimlerinizin ve doğum tarihlerinizin ardındaki sırları ortaya çıkararak aşk, kariyer ve kişisel potansiyeliniz hakkında derinlemesine, uzman analizler sunar. Kaderinizin kodlarını çözmeye hazır mısınız?
        </p>
        
        <div className="mt-10 w-full max-w-md mx-auto px-4">
            <AnimatedInfographic />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center">
          <button
            onClick={handleHeroCtaClick}
            className="bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/20"
          >
            Analize Hemen Başla
          </button>
          <p className="mt-4 text-sm text-white/50 tracking-wider">✨ Tamamen Ücretsiz ve Güvenli</p>
        </div>
      </div>
      
      {/* Daily Number Section */}
      <div className="mt-12 sm:mt-16">
        <DailyNumber />
      </div>

      {/* Features Section */}
      <div className="mt-20 sm:mt-28">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Neleri Keşfedebilirsiniz?</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Sunduğumuz detaylı ve ücretsiz analizlerle hayatınıza dair yepyeni bir bakış açısı kazanın ve potansiyelinizi en üst seviyeye taşıyın.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="favorite"
            title="Aşk Uyumu Analizi"
            description="Partnerinizle aranızdaki numerolojik uyumu, güçlü ve zayıf yönlerinizi öğrenin."
            onClick={() => onNavigateToCalculators('love')}
          />
          <FeatureCard
            icon="person"
            title="Kişisel Rapor"
            description="Yaşam yolu sayınızdan kader sayınıza, karakterinizin derinliklerindeki potansiyeli ortaya çıkarın."
            onClick={() => onNavigateToCalculators('personal')}
          />
          <FeatureCard
            icon="event"
            title="Kişisel Yıl Analizi"
            description="İçinde bulunduğunuz yılın sizin için getireceği fırsatları ve zorlukları önceden bilin."
            onClick={() => onNavigateToCalculators('year')}
          />
          <FeatureCard
            icon="work"
            title="Kariyer & Potansiyel Analizi"
            description="Doğal yeteneklerinize en uygun kariyer yollarını ve profesponel potansiyelinizi keşfedin."
            onClick={() => onNavigateToCalculators('career')}
          />
        </div>
      </div>
       {/* How It Works Section */}
        <div className="mt-20 sm:mt-28">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Sadece 3 Adımda Sırları Keşfedin</h2>
                <p className="mt-3 text-white/60 max-w-xl mx-auto">Kişisel numeroloji raporunuza ulaşmak hiç bu kadar kolay olmamıştı.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="bg-card-dark rounded-2xl p-6 mb-4 border border-border-dark">
                        <span className="material-symbols-outlined text-primary text-5xl">touch_app</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">1. Analizini Seç</h3>
                    <p className="text-white/70">Aşk uyumu, kariyer potansiyeli veya kişisel karakter analizi... Kaderinizin hangi alanını aydınlatmak istediğinizi seçin.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <div className="bg-card-dark rounded-2xl p-6 mb-4 border border-border-dark">
                        <span className="material-symbols-outlined text-primary text-5xl">edit_document</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">2. Bilgilerini Gir</h3>
                    <p className="text-white/70">Doğum tarihiniz ve tam isminiz, numerolojik profilinizin temelini oluşturur. Bu bilgileri girerek analizi başlatın.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <div className="bg-card-dark rounded-2xl p-6 mb-4 border border-border-dark">
                        <span className="material-symbols-outlined text-primary text-5xl">auto_awesome</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">3. Ücretsiz Raporunu Keşfet</h3>
                    <p className="text-white/70">Uzman numerolog bakış açısıyla hazırlanan, derinlemesine ve tamamen size özel raporunuzu anında ve ücretsiz olarak okuyun.</p>
                </div>
            </div>
        </div>
        
        {/* Numerology Facts Section */}
        <div className="mt-20 sm:mt-28">
            <NumerologyFactsSection />
        </div>
        
        {/* All other sections */}

        <div id="numerology-basics" className="mt-20 sm:mt-28 max-w-4xl mx-auto">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Numerolojinin Temelleri</h2>
            <p className="mt-3 text-white/60 max-w-xl mx-auto">Hayatınızın kodlarını oluşturan temel sayıların anlamlarını keşfedin.</p>
        </div>
        <div>
          <AccordionItem icon="looks_one" title="Yaşam Yolu Sayısı" startOpen={true}>
             <p>Doğum tarihinizden türetilen bu sayı, hayatınızdaki ana temayı, en büyük dersleri, fırsatları ve zorlukları temsil eden en önemli numerolojik göstergedir. O, sizin kim olduğunuzun ve bu dünyaya ne getirdiğinizin özüdür. Sık sık <InternalLink onClick={() => onNavigate('info')}>Kader Sayısı</InternalLink> ile birlikte yorumlanır.</p>
          </AccordionItem>
           <AccordionItem icon="looks_two" title="Kader (İsim) Sayısı">
            <p>Tam isminizdeki harflerin numerolojik değerlerinden hesaplanır. Bu sayı, doğal yeteneklerinizi, potansiyelinizi ve hayatta neyi başarmak için burada olduğunuzu ortaya koyar. Kaderinize giden yolun haritasıdır. <InternalLink onClick={() => onNavigateToCalculators('career')}>Kariyer analizi</InternalLink> için temel bir göstergedir.</p>
          </AccordionItem>
          <AccordionItem icon="looks_3" title="Ruh Dürtüsü Sayısı">
             <p>İsminizdeki sesli harflerden türetilir ve kalbinizin en derin arzularını, gerçek motivasyonlarınızı ve sizi içten içe neyin mutlu ettiğini gösterir. Bu, ruhunuzun fısıltısıdır ve genellikle <InternalLink onClick={() => onNavigate('info')}>Kişilik Sayısı</InternalLink> ile bir denge oluşturur.</p>
          </AccordionItem>
          <AccordionItem icon="looks_4" title="Kişilik Sayısı">
            <p>İsminizdeki sessiz harflerin toplamından elde edilir. Dış dünyaya nasıl göründüğünüzü, insanların sizi ilk başta nasıl algıladığını ve kendinizin hangi yönlerini rahatça gösterdiğinizi anlatır. Sizin sosyal maskenizdir.</p>
          </AccordionItem>
        </div>
      </div>
    </>
);
};


const HomePage: React.FC<HomePageProps> = ({ onNavigateToCalculators, onNavigate }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      {user ? (
        <Dashboard user={user} onNavigateToCalculators={onNavigateToCalculators} />
      ) : (
        <DefaultHomePage onNavigateToCalculators={onNavigateToCalculators} onNavigate={onNavigate} />
      )}

       {/* Final CTA */}
        <div className="mt-20 sm:mt-28 bg-card-dark-start rounded-2xl p-8 sm:p-12 text-center">
             <h2 className="text-3xl font-bold text-white">Kaderinizin Anahtarı Parmaklarınızın Ucunda</h2>
             <p className="mt-4 max-w-2xl mx-auto text-white/70">Daha fazla beklemeyin. Sayıların binlerce yıldır insanlığa fısıldadığı sırları keşfetmek için ilk adımı atın ve potansiyelinizi ortaya çıkarın.</p>
             <div className="mt-8 flex justify-center">
                <button
                    onClick={() => onNavigateToCalculators('personal')}
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/20"
                >
                    Ücretsiz Kişisel Raporunu Oluştur
                </button>
            </div>
        </div>
    </div>
  );
};

export default HomePage;