
import React from 'react';
import StarIcon from './icons/StarIcon';
import InstagramIcon from './icons/InstagramIcon';
import TwitterIcon from './icons/TwitterIcon';
import FacebookIcon from './icons/FacebookIcon';
import type { Page } from '../App';
import type { Tab } from './CalculatorPage';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onNavigateToCalculators: (tab: Tab) => void;
  onNavigateToHomeAndScroll: (sectionId: string) => void;
}

const FooterLink: React.FC<{ href: string; onClick: () => void; children: React.ReactNode }> = ({ href, onClick, children }) => (
  <a 
    href={href} 
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }} 
    className="text-white/60 transition-colors hover:text-primary cursor-pointer"
  >
    {children}
  </a>
);

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/60 transition-colors hover:text-primary">
        {children}
    </a>
)

const Footer: React.FC<FooterProps> = ({ onNavigate, onNavigateToCalculators, onNavigateToHomeAndScroll }) => {
  return (
    <footer className="bg-black/20 mt-12 border-t border-border-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-10 lg:px-20 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand */}
          <div className="col-span-2 lg:col-span-2">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home');}} className="flex items-center gap-3 cursor-pointer">
              <div className="text-primary size-7">
                <StarIcon />
              </div>
              <h1 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                Numeroskop
              </h1>
            </a>
            <p className="mt-4 text-white/60 max-w-xs">
              İsminizin ve doğum tarihinizin ardındaki sırları çözerek kaderinizin kodlarını keşfedin.
            </p>
          </div>

          {/* Column 2: Analyses */}
          <div className="text-sm">
            <h3 className="font-semibold text-white mb-4">Analizler</h3>
            <div className="flex flex-col space-y-3">
              <FooterLink href="/analiz/ask-uyumu" onClick={() => onNavigateToCalculators('love')}>Aşk Uyumu</FooterLink>
              <FooterLink href="/analiz/kisisel-rapor" onClick={() => onNavigateToCalculators('personal')}>Kişisel Rapor</FooterLink>
              <FooterLink href="/analiz/kisisel-yil" onClick={() => onNavigateToCalculators('year')}>Kişisel Yıl Analizi</FooterLink>
              <FooterLink href="/analiz/kariyer-potansiyeli" onClick={() => onNavigateToCalculators('career')}>Kariyer Potensiyeli</FooterLink>
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="text-sm">
            <h3 className="font-semibold text-white mb-4">Şirket</h3>
            <div className="flex flex-col space-y-3">
              <FooterLink href="/numeroloji-nedir" onClick={() => onNavigate('info')}>Numeroloji Nedir?</FooterLink>
              <FooterLink href="/#numerology-basics" onClick={() => onNavigateToHomeAndScroll('numerology-basics')}>Temel Kavramlar</FooterLink>
              <FooterLink href="/iletisim" onClick={() => onNavigate('contact')}>İletişim</FooterLink>
              <FooterLink href="/kullanim-sartlari" onClick={() => onNavigate('terms')}>Kullanım Şartları</FooterLink>
              <FooterLink href="/gizlilik-politikasi" onClick={() => onNavigate('privacy')}>Gizlilik Politikası</FooterLink>
            </div>
          </div>

          {/* Column 4: Social */}
          <div className="col-span-2 md:col-span-1 text-sm">
             <h3 className="font-semibold text-white mb-4">Bizi Takip Edin</h3>
             <div className="flex space-x-4">
                <SocialIcon href="https://instagram.com"><InstagramIcon /></SocialIcon>
                <SocialIcon href="https://x.com"><TwitterIcon /></SocialIcon>
                <SocialIcon href="https://facebook.com"><FacebookIcon /></SocialIcon>
             </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-dark text-sm text-white/50">
           <p className="text-center">
            © {new Date().getFullYear()} Numeroskop. Tüm hakları saklıdır.
          </p>
          <p className="mt-4 text-center text-xs">
            <strong>Feragatname:</strong> Sunulan tüm numeroloji analizleri ve yorumları yalnızca eğlence ve kişisel keşif amaçlıdır. Profesyonel, yasal, tıbbi veya finansal tavsiye yerine geçmez.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
