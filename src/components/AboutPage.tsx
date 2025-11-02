import React from 'react';

const InfoCard: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-input-dark p-6 rounded-lg border border-border-dark">
        <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-white/80 space-y-3 prose prose-invert max-w-none text-white/80">{children}</div>
    </div>
);


const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tighter">
          Hakkımızda & Metodolojimiz
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-white/70">
          Şeffaf, uzman ve güvenilir bir yaklaşımla, sayıların kadim bilgeliğini modern teknolojiyle birleştiriyoruz.
        </p>
      </div>

      <div className="space-y-10">
        
        <InfoCard icon="emoji_objects" title="Misyonumuz: Kişisel Keşfe Rehberlik Etmek">
           <p>Numeroskop, sayıların sembolik dilini kullanarak insanların kendilerini daha derinlemesine anlamalarına yardımcı olmak amacıyla kurulmuş bir projedir. Misyonumuz, karmaşık numerolojik hesaplamaları ve yorumları herkes için erişilebilir, anlaşılır ve aydınlatıcı hale getirmektir. Biz bir falcılık sitesi değil, kişisel farkındalık ve potansiyel keşfi için tasarlanmış bir rehberiz.</p>
        </InfoCard>
        
        <InfoCard icon="psychology" title="Projenin Arkasındaki Uzman Bakışı">
           <p>Bu platform, numeroloji, sembolizm ve insan psikolojisi alanlarında uzun yıllar araştırma yapmış bir ekip tarafından geliştirilmiştir. İçeriklerimiz, ünlü numerologların klasik eserleri, modern yorumcuların çalışmaları ve yapay zekanın (Google Gemini) metin üretme yeteneklerinin bir sentezidir. Amacımız, kadim bilgiyi doğrulanabilir ve tutarlı bir şekilde sunarken, yapay zeka ile bu yorumları kişiselleştirerek size özel hale getirmektir.</p>
           <p><strong>Kapsam Sınırlaması:</strong> Sunduğumuz analizler, bir numeroloji uzmanıyla yapılan birebir seansın yerini tutmaz. Biz, sayıların potansiyel enerjilerini ve eğilimlerini gösteririz; ancak nihai kararlar ve yaşam yolu seçimleri daima bireyin kendi sorumluluğundadır.</p>
        </InfoCard>

        <InfoCard icon="calculate" title="Metodolojimiz: Pisagor Geleneği">
            <p>Numeroskop, Batı dünyasında en yaygın olarak kabul gören **Pisagor (Pythagorean) Numeroloji** sistemini temel almaktadır. Bu sistem, harflere 1'den 9'a kadar değerler atar ve basit, tekrarlanabilir hesaplamalara dayanır.</p>
            <p><strong>Neden Pisagor?</strong> Bu sistemi, şeffaflığı ve modern psikolojiyle olan uyumu nedeniyle tercih ettik. Diğer sistemler (örneğin Keldani - Chaldean) daha sezgisel ve farklı harf değerleri kullanırken, Pisagor sistemi daha yapısal ve öğrenmesi kolay bir temel sunar.</p>
            <p>Tüm hesaplamalarımız, bu sistemin temel kurallarına (sayı indirgeme, usta sayıların tanınması vb.) sıkı sıkıya bağlı kalarak otomatik olarak gerçekleştirilir.</p>
        </InfoCard>
        
        <InfoCard icon="menu_book" title="Bilgi Kaynaklarımız">
             <p>Yorumlarımız ve analizlerimiz, aşağıda belirtilen temel kaynaklar ve numeroloji ekollerinin öğretilerinden ilham almaktadır. Güvenilir ve tutarlı bilgi sunmak adına, sürekli olarak bu kaynakları inceliyor ve içeriğimizi zenginleştiriyoruz.</p>
             <ul>
                <li>Dow Balliett - "The Philosophy of Number"</li>
                <li>Juno Jordan - "Numerology: The Romance in Your Name"</li>
                <li>Dan Millman - "The Life You Were Born to Live"</li>
                <li>Hans Decoz - "Numerology: Key to Your Inner Self"</li>
             </ul>
        </InfoCard>

        <InfoCard icon="gavel" title="Feragatname ve Etik Yaklaşımımız">
           <p>Numeroskop'ta sunulan tüm içerikler, analizler ve yorumlar **yalnızca eğlence ve kişisel keşif amaçlıdır.** Bu bilgiler, profesyonel, yasal, tıbbi veya finansal tavsiye yerine geçmez. Sitemizdeki bilgilere dayanarak alacağınız kararlar tamamen sizin sorumluluğunuzdadır.</p>
           <p>Etik anlayışımız gereği, geleceği tahmin etme veya kesin yargılarda bulunma iddiasında değiliz. Amacımız, sayıların enerjisini bir ayna gibi kullanarak mevcut potansiyellerinizi ve üzerinde çalışabileceğiniz alanları size göstermektir.</p>
        </InfoCard>
        
      </div>
    </div>
  );
};

export default AboutPage;