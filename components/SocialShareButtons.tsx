import React from 'react';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface SocialShareButtonsProps {
  shareText: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ shareText }) => {
  const shareUrl = "https://numeroskop.com.tr"; // Replace with actual URL when deployed
  const encodedShareText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShareText}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedShareText} ${encodedUrl}`;

  const ShareButton: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      className="flex items-center justify-center gap-2 bg-input-dark text-white/80 hover:bg-card-dark-start hover:text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );

  return (
    <div className="my-8 pt-6 border-t border-border-dark">
      <h3 className="text-lg font-bold text-white text-center mb-4">Bu Keşfi Paylaş</h3>
      <div className="flex justify-center items-center gap-3 sm:gap-4">
        <ShareButton href={facebookShareUrl} label="Facebook">
          <FacebookIcon />
        </ShareButton>
        <ShareButton href={twitterShareUrl} label="Twitter">
          <TwitterIcon />
        </ShareButton>
        <ShareButton href={whatsappShareUrl} label="WhatsApp">
          <WhatsAppIcon />
        </ShareButton>
      </div>
    </div>
  );
};

export default SocialShareButtons;