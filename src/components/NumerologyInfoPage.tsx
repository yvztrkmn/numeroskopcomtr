import React from 'react';

interface NumerologyInfoPageProps {
    onNavigateToCalculators: () => void;
}

const InfoCard: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-input-dark p-6 rounded-lg border border-border-dark">
        <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-white/80 space-y-3">{children}</div>
    </div>
);

const NumerologyInfoPage: React.FC<NumerologyInfoPageProps> = ({ onNavigateToCalculators }) => {
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
              Numeroloji, evrenin ve içindeki her şeyin sayılarla ifade edilebileceği ve anlaşılabileceği inancına dayanan kadim bir metafizik bilimidir. Her sayının kendine özgü bir titreşimi, anlamı ve enerjisi vardır. İsimler ve doğum tarihleri üzerinden yapılan hesaplamalarla, bir kişinin karakteri, yetenekleri, yaşam amacı, motivasyonları ve karşılaşabileceği zorluklar hakkında derinlemesine bilgiler elde edilebilir. Bu, falcılık değil, potansiyelleri ve enerjisel eğilimleri anlama sanatıdır.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <InfoCard icon="history" title="Kısa Tarihçesi">
                <p>Numerolojinin kökleri antik Babil, Mısır ve Yunan medeniyetlerine kadar uzanır. Ancak modern numerolojinin babası olarak genellikle M.Ö. 6. yüzyılda yaşamış olan Yunan filozofu ve matematikçi Pisagor (Pythagoras) kabul edilir. Pisagor ve takipçileri, "her şeyin özünün sayılar" olduğuna ve evrenin matematiksel prensipler üzerine kurulu olduğuna inanıyorlardı. Biz de sitemizde bu Pisagorcu geleneği temel alıyoruz.</p>
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
                <p>Doğum tarihinizin (gün, ay, yıl) toplamından elde edilen en önemli sayıdır. Bu sayı, doğuştan getirdiğiniz özellikleri, hayatınızın genel temasını, karşılaşacağınız fırsatları, zorlukları ve öğrenmeniz gereken temel dersleri gösterir. Sizin kişisel yol haritanızdır.</p>
             </InfoCard>
             <InfoCard icon="stars" title="Kader (İfade) Sayısı">
                <p>Doğum isminizdeki tüm harflerin sayısal değerlerinin toplamından hesaplanır. Bu sayı, doğal yeteneklerinizi, potansiyelinizi ve bu dünyada kendinizi nasıl ifade ettiğinizi anlatır. Genellikle kariyer ve başarı ile ilişkilidir; neyi başarmak için burada olduğunuzu gösterir.</p>
             </InfoCard>
             <InfoCard icon="favorite" title="Ruh Dürtüsü (Kalp Arzusu) Sayısı">
                <p>İsminizdeki sadece sesli harflerin toplamından türetilir. Bu sayı, kalbinizin en derin arzularını, sizi gerçekte neyin motive ettiğini ve ruhunuzun neye özlem duyduğunu ortaya çıkarır. Sizin içsel "neden"inizdir.</p>
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
                    Numerolojide 11, 22 ve 33 sayıları "Usta Sayılar" olarak kabul edilir çünkü daha yüksek bir potansiyel ve daha yoğun bir enerji taşırlar. Bu sayılar, hem büyük bir başarı ve aydınlanma potansiyeli sunar, hem de daha büyük zorluklar ve sorumluluklar getirir. Eğer Yaşam Yolu veya Kader sayınız bu sayılardan biriyse, insanlığa hizmet etme ve büyük projeler gerçekleştirme potansiyeliniz vardır.
                </p>
            </div>
        </section>

        <section className="text-center pt-8 border-t border-border-dark">
            <h2 className="text-3xl font-bold text-white">Kendi Sırlarınızı Keşfetmeye Hazır mısınız?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/70 text-lg">
                Teori harika, ama pratik daha da aydınlatıcı. Kendi numerolojik raporunuzu oluşturarak sayıların sizin için ne anlama geldiğini hemen, ücretsiz olarak öğrenin.
            </p>
            <div className="mt-8 flex justify-center">
                <button
                    onClick={onNavigateToCalculators}
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
