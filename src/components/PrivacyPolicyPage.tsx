
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tighter">
          Gizlilik Politikası
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-white/70">
          Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </p>
      </div>

      <div className="bg-card-dark rounded-2xl p-6 sm:p-10 space-y-8 text-white/80 prose prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold text-white">1. Giriş</h2>
          <p>
            Numeroskop ("biz", "sitemiz", "hizmetimiz") olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, numeroskop.com.tr web sitesini kullandığınızda hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve haklarınızı açıklamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">2. Topladığımız Bilgiler</h2>
          <p>Hizmetimizi sunmak için yalnızca gerekli olan bilgileri topluyoruz:</p>
          <ul>
            <li><strong>Kullanıcı Tarafından Sağlanan Bilgiler:</strong> Numeroloji analizi oluşturmak için girdiğiniz isim, soyisim ve doğum tarihi gibi bilgileri kullanırız.</li>
            <li><strong>Yerel Depolama (LocalStorage):</strong> Kullanıcı deneyimini iyileştirmek amacıyla, "Bilgilerimi kaydet" seçeneğini işaretlediğinizde girdiğiniz temel bilgileri (isim ve doğum tarihi) cihazınızın tarayıcısındaki yerel depolama alanında saklarız. Bu veriler sunucularımıza gönderilmez veya saklanmaz; tamamen sizin kontrolünüzdedir.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">3. Bilgilerinizi Nasıl Kullanıyoruz?</h2>
          <p>Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:</p>
          <ul>
            <li>Size kişiselleştirilmiş numeroloji analizleri ve raporları sunmak.</li>
            <li>İzin verdiyseniz, sonraki analizler için formları otomatik olarak doldurarak size zaman kazandırmak.</li>
            <li>Hizmetimizi iyileştirmek ve kullanıcı deneyimini optimize etmek.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-white">4. Bilgilerin Paylaşımı</h2>
          <p>
            Kişisel bilgilerinizi (isim, doğum tarihi vb.) kesinlikle üçüncü taraflarla satmıyor, kiralamıyor veya paylaşmıyoruz. Analiz oluşturma işlemi, girdiğiniz bilgilerin Google Gemini API'sine güvenli bir şekilde gönderilmesini içerir. Bu işlem sırasında verileriniz geçici olarak işlenir ancak Google tarafından hizmet sunumu dışında bir amaçla saklanmaz veya kullanılmaz. Cihazınızda yerel olarak saklanan veriler, sizin tarafınızdan açıkça paylaşılmadığı sürece tarayıcınızdan ayrılmaz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">5. Veri Güvenliği ve Saklama</h2>
          <p>
            Profil bilgileriniz, tarayıcınızın yerel depolama (LocalStorage) teknolojisi kullanılarak doğrudan sizin cihazınızda saklanır. Bu verilerin güvenliği, cihazınızın genel güvenliğine bağlıdır. Sitemiz, bu verileri kendi sunucularında saklamaz. Tarayıcınızın önbelleğini veya site verilerini temizleyerek bu bilgileri dilediğiniz zaman kalıcı olarak silebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">6. Haklarınız</h2>
          <p>
            Cihazınızda saklanan tüm veriler üzerinde tam kontrole sahipsiniz. Tarayıcı ayarlarınızdan site verilerini temizleyerek tüm kayıtlı bilgilerinizi silebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">7. Politikadaki Değişiklikler</h2>
          <p>
            Bu Gizlilik Politikası'nı zaman zaman güncelleme hakkımızı saklı tutarız. Değişiklikler bu sayfada yayınlandığı andan itibaren geçerli olacaktır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">8. İletişim</h2>
          <p>
            Bu Gizlilik Politikası ile ilgili herhangi bir sorunuz varsa, lütfen <a href="mailto:destek@numeroskop.com.tr" className="text-primary hover:underline">destek@numeroskop.com.tr</a> adresinden bizimle iletişime geçin.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
