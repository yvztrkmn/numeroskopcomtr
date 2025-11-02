import React from 'react';

const KvkkCookiePolicyPage: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tighter">
          KVKK ve Çerez Politikası
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-white/70">
          Verilerinizin korunması ve gizliliğiniz bizim için önceliklidir.
        </p>
      </div>

      <div className="bg-card-dark rounded-2xl p-6 sm:p-10 space-y-8 text-white/80 prose prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold text-white">1. Giriş</h2>
          <p>
            Numeroskop ("biz", "sitemiz", "hizmetimiz") olarak, kişisel verilerinizin korunmasına büyük önem vermekteyiz. Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verilerinizi hangi amaçlarla işlediğimizi, kimlerle paylaştığımızı ve haklarınızı açıklamaktadır. Ayrıca çerez kullanımımız hakkında da bilgi vermektedir.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">2. Kişisel Verilerin Toplanması ve İşlenmesi</h2>
          <h3>2.1. Toplanan Veri Türleri</h3>
          <ul>
            <li><strong>Kimlik ve İletişim Verileri:</strong> Numeroloji analizi oluşturmak için girdiğiniz ad, soyad ve doğum tarihi gibi bilgiler (isteğe bağlıdır). İletişim formu aracılığıyla gönderdiğiniz adınız, e-posta adresiniz ve mesajınız.</li>
            <li><strong>İşlem Güvenliği Verileri:</strong> Hizmet kullanımınız sırasında otomatik olarak toplanan IP adresi, tarayıcı bilgileri, işletim sistemi, ziyaret tarihleri ve saatleri gibi veriler.</li>
            <li><strong>Çerez Verileri:</strong> Web sitemizi ziyaretiniz sırasında kullanılan çerezler aracılığıyla toplanan veriler. Detaylar için "Çerez Politikamız" bölümüne bakınız.</li>
          </ul>

          <h3>2.2. Kişisel Veri İşleme Amaçları</h3>
          <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
          <ul>
            <li>Kullanıcılara özel numeroloji analizleri ve raporları sunmak.</li>
            <li>İletişim formları aracılığıyla gelen soru ve taleplere yanıt vermek.</li>
            <li>Kullanıcı deneyimini geliştirmek ve hizmet kalitesini artırmak.</li>
            <li>Hizmetin güvenliğini sağlamak ve olası kötüye kullanımları önlemek.</li>
            <li>Yasal yükümlülüklerimizi yerine getirmek.</li>
          </ul>

          <h3>2.3. Kişisel Veri İşlemenin Hukuki Sebepleri</h3>
          <p>Kişisel verileriniz KVKK'nın 5. maddesinde belirtilen aşağıdaki hukuki sebeplerden birine veya birkaçına dayanarak işlenmektedir:</p>
          <ul>
            <li>Açık rızanızın bulunması (isteğe bağlı formlar için).</li>
            <li>Sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (analiz hizmeti sunumu).</li>
            <li>Hukuki yükümlülüklerimizi yerine getirmek için zorunlu olması.</li>
            <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması (hizmet geliştirme, güvenlik).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">3. Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, yukarıda belirtilen işleme amaçları doğrultusunda ve KVKK'nın 8. ve 9. maddelerinde belirtilen şartlara uygun olarak, yalnızca hizmetin sunumu için Google Gemini API'sine (işleme amaçlarıyla sınırlı olmak üzere) ve yasal yükümlülüklerimiz gereği yetkili kamu kurum ve kuruluşlarına aktarılabilir. Sunucularımızda doğrudan kişisel veri depolanmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">4. Veri Güvenliği ve Saklama Süresi</h2>
          <p>
            Kişisel verilerinizin güvenliğini sağlamak amacıyla gerekli teknik ve idari tedbirler alınmaktadır. Uygulamamızda girilen ad ve doğum tarihi bilgileri, kullanıcının cihazının yerel depolama alanında (localStorage) tutulabilir (eğer kullanıcı "Bilgilerimi kaydet" seçeneğini işaretlemişse). Bu veriler sunucularımıza gönderilmez veya burada saklanmaz. Yerel depolama verileri, tarayıcı önbelleğiniz temizlendiğinde silinir. Diğer veriler ise, işleme amacının gerektirdiği süre boyunca veya yasal yükümlülüklerimizin gerektirdiği süre boyunca saklanır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">5. KVKK Kapsamındaki Haklarınız</h2>
          <p>KVKK'nın 11. maddesi uyarınca, kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:</p>
          <ul>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme.</li>
            <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme.</li>
            <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme.</li>
            <li>KVKK 7. maddede öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme.</li>
            <li>(d) ve (e) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme.</li>
            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme.</li>
            <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.</li>
          </ul>
          <p>Bu haklarınızı kullanmak için <a href="mailto:destek@numeroskop.com.tr" className="text-primary hover:underline">destek@numeroskop.com.tr</a> adresinden bize e-posta ile başvurabilirsiniz.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">6. Çerez (Cookie) Politikası</h2>
          <h3>6.1. Çerez Nedir?</h3>
          <p>
            Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar, siteyi tekrar ziyaret ettiğinizde sizi tanımamızı, tercihlerinizi hatırlamamızı ve size daha iyi bir deneyim sunmamızı sağlar.
          </p>

          <h3>6.2. Hangi Çerezleri Kullanıyoruz?</h3>
          <p>Web sitemizde aşağıdaki türde çerezleri kullanmaktayız:</p>
          <ul>
            <li><strong>Zorunlu Çerezler:</strong> Web sitesinin temel fonksiyonları için gerekli olan çerezlerdir. Örn: oturum yönetimi, güvenlik çerezleri. Bu çerezler olmadan site düzgün çalışamaz.</li>
            <li><strong>Performans/Analiz Çerezleri:</strong> Sitemizi nasıl kullandığınızı (hangi sayfaları ziyaret ettiğiniz, ne kadar süre kaldığınız vb.) anlamamızı sağlayan çerezlerdir. Bu veriler anonimleştirilmiş olup, hizmetimizi iyileştirmek için kullanılır (örn: Google Analytics).</li>
            <li><strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi (dil seçimi, kullanıcı adı vb.) hatırlayarak size daha kişiselleştirilmiş bir deneyim sunan çerezlerdir.</li>
            <li><strong>Hedefleme/Reklam Çerezleri:</strong> İlgi alanlarınıza uygun reklamlar sunmak için kullanılır. (Şu an için sitemizde doğrudan reklam çerezleri kullanılmamaktadır, ancak gelecekte entegre edilebilir.)</li>
          </ul>

          <h3>6.3. Çerezleri Nasıl Yönetebilirsiniz?</h3>
          <p>
            Çoğu internet tarayıcısı çerezleri otomatik olarak kabul eder, ancak tarayıcı ayarlarınızı değiştirerek çerezleri reddedebilir veya cihazınıza çerez gönderildiğinde uyarı alabilirsiniz. Çerezleri tamamen devre dışı bırakmanız durumunda web sitemizin bazı özelliklerinin düzgün çalışmayabileceğini lütfen unutmayın. Tarayıcı ayarlarınız üzerinden çerez tercihlerinizi yönetebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">7. Politikadaki Değişiklikler</h2>
          <p>
            Bu KVKK ve Çerez Politikası'nı zaman zaman güncelleme hakkımızı saklı tutarız. Değişiklikler bu sayfada yayınlandığı andan itibaren geçerli olacaktır. Güncellemelerden haberdar olmak için bu sayfayı düzenli olarak kontrol etmeniz önerilir.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">8. İletişim</h2>
          <p>
            Bu KVKK ve Çerez Politikası ile ilgili herhangi bir sorunuz veya talebiniz varsa, lütfen <a href="mailto:destek@numeroskop.com.tr" className="text-primary hover:underline">destek@numeroskop.com.tr</a> adresinden bizimle iletişime geçin.
          </p>
        </section>
      </div>
    </div>
  );
};

export default KvkkCookiePolicyPage;