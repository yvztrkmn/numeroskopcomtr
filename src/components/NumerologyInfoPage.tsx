import React, { useState } from 'react';
import type { Page } from '../App';
import type { Tab } from './CalculatorPage';

interface NumerologyInfoPageProps {
    onNavigateToCalculators: (tab: Tab) => void; // Fix: Updated to accept a 'tab' argument
    onNavigate: (page: Page) => void;
}

const InternalLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className="text-primary hover:underline">
        {children}
    </a>
);


const InfoCard: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-input-dark p-6 rounded-lg border border-border-dark">
        <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-white/80 space-y-3 prose prose-invert max-w-none text-white/80">{children}</div>
    </div>
);

const AccordionItem: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border-dark last:border-b-0">
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

const NumerologyInfoPage: React.FC<NumerologyInfoPageProps> = ({ onNavigateToCalculators, onNavigate }) => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tighter">
          Numeroloji Nedir?
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-white/70">
          Sayıların ardındaki kadim bilgeliği keşfedin ve hayatınızın kodlarını nasıl çözebileceğinizi öğrenin.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Sayıların Gizemli Dünyasına Yolculuk</h2>
          <div className="bg-card-dark rounded-2xl p-6 sm:p-10">
            <p className="text-white/80 text-lg leading-relaxed">
              Numeroloji, evrenin ve içindeki her şeyin sayılarla ifade edilebileceği ve anlaşılabileceği inancına dayanan kadim bir metafizik bilimidir. Her sayının kendine özgü bir titreşimi, anlamı ve enerjisi vardır. İsimler ve doğum tarihleri üzerinden yapılan hesaplamalarla, bir kişinin karakteri, yetenekleri, yaşam amacı, motivasyonları ve karşılaşabileceği zorluklar hakkında derinleşiməli bilgiler elde edilebilir. Bu, falcılık değil, potansiyelleri ve enerjisel eğilimleri anlama sanatıdır.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <InfoCard icon="history" title="Kısa Tarihçesi">
                <p>Numerolojinin kökleri antik Babil, Mısır ve Yunan medeniyetlerine kadar uzanır. Ancak modern numerolojinin babası olarak genellikle M.Ö. 6. yüzyılda yaşamış olan Yunan filozofu ve matematikçi Pisagor (Pythagoras) kabul edilir. Pisagor ve takipçileri, "her şeyin özünün sayılar" olduğuna ve evrenin matematiksel prensipleri üzerine kurulu olduğuna inanıyorlardı. Biz de sitemizde bu Pisagorcu geleneği temel alıyoruz.</p>
             </InfoCard>
             <InfoCard icon="calculate" title="Sayılar Nasıl Hesaplanır?">
                <p>Temelde iki ana bilgi kullanılır: tam isminiz ve doğum tarihiniz. İsimdeki her harfe Pisagor sistemine göre 1'den 9'a kadar bir sayı atanır. Doğum tarihindeki sayılar ise (gün, ay, yıl) çeşitli şekillerde toplanır.</p>
                <p>Tüm hesaplamaların anahtarı, sayıları tek haneli bir rakama (veya 11, 22, 33 gibi "Usta Sayılar"a) indirgeme işlemidir. Örneğin, 28 sayısı 2 + 8 = 10, ve sonra 1 + 0 = 1 olarak indirgenir.</p>
             </InfoCard>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Temel Numeroloji Kavramları</h2>
          <div className="space-y-4">
             <InfoCard icon="map" title="Yaşam Yolu Sayısı">
                <p>Doğum tarihinizin (gün, ay, yıl) toplamından elde edilen en önemli sayıdır. Bu sayı, doğuştan getirdiğiniz özellikleri, hayatınızın genel temasını, karşılaşacağınız fırsatları, zorlukları ve öğrenmeniz gereken temel dersleri gösterir. Sizin kişisel yol haritanızdır. Kendi sayınızı <InternalLink onClick={() => onNavigateToCalculators('personal')}>kişisel rapor</InternalLink> sayfamızda hesaplayabilirsiniz.</p>
             </InfoCard>
             <InfoCard icon="stars" title="Kader (İfade) Sayısı">
                <p>Doğum isminizdeki tüm harflerin sayısal değerlerinin toplamından hesaplanır. Bu sayı, doğal yeteneklerinizi, potansiyelinizi ve bu dünyada kendinizi nasıl ifade ettiğinizi anlatır. Genellikle kariyer ve başarı ile ilişkilidir; neyi başarmak için burada olduğunuzu gösterir.</p>
             </InfoCard>
             <InfoCard icon="favorite" title="Ruh Dürtüsü (Kalp Arzusu) Sayısı">
                <p>İsminizdeki sadece sesli harflerin toplamından türetilir. Bu sayı, kalbinizin en derin arzularını, sizi gerçekte neyin motive ettiğini ve ruhunuzun neye özlem duyduğunu ortaya çıkarır. Sizin içsel "neden"inizdir. <InternalLink onClick={() => onNavigateToCalculators('love')}>Aşk uyumu</InternalLink> analizlerinde önemli bir rol oynar.</p>
             </InfoCard>
             <InfoCard icon="sentiment_satisfied" title="Kişilik Sayısı">
                <p>İsminizdeki sadece sessiz harflerin toplamından bulunur. Bu, dış dünyaya gösterdiğiniz yüzünüz, insanların sizi ilk başta nasıl algıladığıdır. Sizin sosyal maskeniz olarak düşünülebilir; başkalarının gördüğü ama sizin tam olarak farkında olamayabileceğiniz yönlerinizi temsil eder.</p>
             </InfoCard>
          </div>
        </section>
        
        <section>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Usta Sayılar: 11, 22 ve 33</h2>
            <div className="bg-card-dark-start rounded-2xl p-6 sm:p-10 border border-primary/30">
                <p className="text-white/80 text-lg leading-relaxed">
                    Numerolojide 11, 22 ve 33 sayıları "Usta Sayılar" olarak kabul edilir çünkü daha yüksek bir potansiyel ve daha yoğun bir enerji taşırlar. Bu sayılar, hem büyük bir başarı ve aydınlanma potansiyeli sunar, hem de daha büyük zorluklar ve sorumluluklar getirir. Eğer Yaşam Yolu veya Kader sayınız bu sayılardan biriyse, insanlığa hizmet etme ve büyük projeler gerçekleştirme potansiyeliniz vardır. Daha fazla bilgi için <InternalLink onClick={() => onNavigate('home')}>ana sayfamızdaki</InternalLink> temel kavramlar bölümünü inceleyebilirsiniz.
                </p>
            </div>
        </section>

        <section className="bg-card-dark rounded-2xl p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <AccordionItem icon="quiz" title="Numeroloji gerçek bir bilim midir?">
                <p>Numeroloji, sayıların sembolik anlamlarını inceleyen kadim bir metafizik bilimidir. Modern bilimsel yöntemlerle kanıtlanmamış olsa da, binlerce yıldır kişisel keşif ve rehberlik için kullanılmıştır. Bilimsel bir olgu değil, spiritüel bir araçtır.</p>
            </AccordionItem>
            <AccordionItem icon="lightbulb" title="Numeroloji falcılık mıdır?">
                <p>Hayır, numeroloji falcılık değildir. Geleceği kesin olarak tahmin etme iddiasında bulunmaz. Bunun yerine, sayıların enerjilerini analiz ederek kişiliğiniz, potansiyeliniz ve yaşam yolunuzdaki eğilimler hakkında içgörüler sunar. Bireysel kararlarınızı desteklemek ve kendinizi daha iyi anlamak için bir rehberdir.</p>
            </AccordionItem>
            <AccordionItem icon="compare_arrows" title="Hangi numeroloji sistemini kullanıyorsunuz?">
                <p>Numeroskop, Batı dünyasında en yaygın ve kabul gören Pisagor (Pythagorean) Numeroloji sistemini temel almaktadır. Bu sistem, harflere 1'den 9'a kadar değerler atar ve doğum tarihi ile isminiz üzerinden yapılan hesaplamalarla analizler sunar.</p>
            </AccordionItem>
            <AccordionItem icon="grade" title="Usta Sayılar (11, 22, 33) ne anlama gelir?">
                <p>Usta Sayılar, daha yüksek bir potansiyel ve daha büyük yaşam dersleri taşıyan özel sayılardır. Normal tek haneli sayılara indirgenmezler ve genellikle büyük bir misyon veya insanlığa hizmet etme potansiyeli ile ilişkilendirilirler. Aynı zamanda bu sayılarla yaşamak daha yoğun zorluklar ve sorumluluklar da getirebilir.</p>
            </AccordionItem>
            <AccordionItem icon="insights" title="Numeroloji raporumdaki bilgiler neden önemlidir?">
                <p>Raporunuzdaki Yaşam Yolu, Kader, Ruh Dürtüsü ve Kişilik Sayıları gibi temel numerolojik göstergeler, kendinizi daha iyi tanımanızı sağlar. Güçlü yönlerinizi, potansiyelinizi, içsel motivasyonlarınızı ve üzerinde çalışmanız gereken alanları anlamanıza yardımcı olur. Bu bilgiler, hayatınızdaki bilinçli seçimler yapmanız ve en yüksek potansiyelinize ulaşmanız için bir pusula görevi görür.</p>
            </AccordionItem>
          </div>
        </section>

        <section className="text-center pt-8 border-t border-border-dark">
            <h2 className="text-3xl font-bold text-white">Kendi Sırlarınızı Keşfetmeye Hazır mısınız?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/70 text-lg">
                Teori harika, ama pratik daha da aydınlatıcı. Kendi numerolojik raporunuzu oluşturarak sayıların sizin için ne anlama geldiğini hemen, ücretsiz olarak öğrenin.
            </p>
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => onNavigateToCalculators('personal')}
                    className="bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/20"
                >
                    Ücretsiz Kişisel Raporunu Oluştur
                </button>
            </div>
        </section>
      </div>
    </div>
  );
};

export default NumerologyInfoPage;