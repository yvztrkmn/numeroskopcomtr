
import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tighter">
          Kullanım Şartları
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-white/70">
          Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </p>
      </div>

      <div className="bg-card-dark rounded-2xl p-6 sm:p-10 space-y-8 text-white/80 prose prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold text-white">1. Şartların Kabulü</h2>
          <p>
            Numeroskop web sitesine ("Hizmet") erişerek veya kullanarak, bu Kullanım Şartları'na yasal olarak bağlı kalmayı kabul edersiniz. Bu şartları kabul etmiyorsanız, Hizmet'i kullanmamalısınız.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">2. Hizmetin Tanımı</h2>
          <p>
            Numeroskop, kullanıcı tarafından sağlanan isim ve doğum tarihi bilgilerine dayanarak numerolojik analizler ve yorumlar sunan bir eğlence hizmetidir. Sunulan tüm içerikler yalnızca eğlence, kişisel keşif ve bilgilendirme amaçlıdır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">3. Feragatname</h2>
          <p>
            Hizmet tarafından sağlanan bilgiler, profesyonel, yasal, tıbbi, finansal veya herhangi bir başka türde tavsiye yerine geçmez. Numeroskop'ta yer alan yorumlara dayanarak alınan kararlar tamamen kullanıcının kendi sorumluluğundadır. Sağlanan içeriğin doğruluğu, güvenilirliği veya eksiksizliği konusunda hiçbir garanti vermemekteyiz.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">4. Kullanıcı Sorumlulukları</h2>
          <p>
            Hizmet'i kullanırken doğru ve güncel bilgiler sağlamaktan siz sorumlusunuz. Hizmet'i yasa dışı veya bu Şartlar tarafından yasaklanmış herhangi bir amaç için kullanamazsınız.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">5. Fikri Mülkiyet</h2>
          <p>
            Metinler, grafikler, logolar ve yazılımlar dahil olmak üzere Hizmet'teki tüm içerik Numeroskop'un mülkiyetindedir ve telif hakkı yasalarıyla korunmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">6. Şartlarda Değişiklikler</h2>
          <p>
            Bu Kullanım Şartları'nı zaman zaman güncelleme hakkımızı saklı tutarız. Değişiklikler bu sayfada yayınlandığı andan itibaren geçerli olacaktır. Hizmet'i kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white">7. İletişim</h2>
          <p>
            Bu Kullanım Şartları ile ilgili herhangi bir sorunuz varsa, lütfen <a href="mailto:destek@numeroskop.com.tr" className="text-primary hover:underline">destek@numeroskop.com.tr</a> adresinden bizimle iletişime geçin.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
