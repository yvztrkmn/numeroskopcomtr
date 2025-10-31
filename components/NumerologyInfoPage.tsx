import React from 'react';

interface NumerologyInfoPageProps {
    onNavigateToCalculators: () => void;
}

const AccordionItem: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
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
        <div className="pb-5 px-1 text-white/70 animate-fade-in-down">
          {children}
        </div>
      )}
    </div>
  );
};


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

      <div className="bg-card-dark rounded-2xl p-6 sm:p-10 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Sayıların Gizemli Dünyası</h2>
          <p className="text-white/80">
            Numeroloji, evrenin ve içindeki her şeyin sayılarla ifade edilebileceği ve anlaşılabileceği inancına dayanan kadim bir metafizik bilimidir. Her sayının kendine özgü bir titreşimi, anlamı ve enerjisi vardır. İsimler ve doğum tarihleri üzerinden yapılan hesaplamalarla, bir kişinin karakteri, yetenekleri, yaşam amacı, motivasyonları ve karşılaşabileceği zorluklar hakkında derinlemesine bilgiler elde edilebilir.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Temel Kavramlar</h2>
          <div className="max-w-4xl mx-auto">
            <AccordionItem icon="looks_one" title="Yaşam Yolu Sayısı">
                <p>Doğum tarihinizden türetilen bu sayı, hayatınızdaki ana temayı, en büyük dersleri, fırsatları ve zorlukları temsil eden en önemli numerolojik göstergedir. O, sizin kim olduğunuzun ve bu dünyaya ne getirdiğinizin özüdür.</p>
            </AccordionItem>
            <AccordionItem icon="looks_two" title="Kader (İsim) Sayısı">
                <p>Tam isminizdeki harflerin numerolojik değerlerinden hesaplanır. Bu sayı, doğal yeteneklerinizi, potansiyelinizi ve hayatta neyi başarmak için burada olduğunuzu ortaya koyar. Kaderinize giden yolun haritasıdır.</p>
            </AccordionItem>
            <AccordionItem icon="looks_3" title="Ruh Dürtüsü Sayısı">
                <p>İsminizdeki sesli harflerden türetilir ve kalbinizin en derin arzularını, gerçek motivasyonlarınızı ve sizi içten içe neyin mutlu ettiğini gösterir. Bu, ruhunuzun fısıltısıdır.</p>
            </AccordionItem>
             <AccordionItem icon="looks_4" title="Kişilik Sayısı">
                <p>İsminizdeki sessiz harflerin toplamından elde edilir. Dış dünyaya nasıl göründüğünüzü, insanların sizi ilk başta nasıl algıladığını ve kendinizin hangi yönlerini rahatça gösterdiğinizi anlatır. Sizin sosyal maskenizdir.</p>
            </AccordionItem>
          </div>
        </section>

        <section className="text-center pt-6 border-t border-border-dark">
            <h2 className="text-2xl font-bold text-white">Kendi Sırlarınızı Keşfedin</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/70">
                Teori yeterli değil mi? Kendi numerolojik raporunuzu oluşturarak sayıların sizin için ne anlama geldiğini hemen, ücretsiz olarak öğrenin.
            </p>
            <div className="mt-8 flex justify-center">
                <button
                    onClick={onNavigateToCalculators}
                    className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/20"
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
