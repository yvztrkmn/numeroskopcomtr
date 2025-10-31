import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';

const RecommendFriend: React.FC = () => {
    const shareText = `Selam! Numeroskop adında harika bir numeroloji sitesi keşfettim. Aşk uyumu, kariyer potansiyeli ve kişisel karakter analizi gibi çok detaylı ve ücretsiz raporlar sunuyor. Kesinlikle denemelisin! ✨`;
    const shareUrl = "https://numeroskop.com.tr"; // This should be updated if the URL changes
    const encodedShareText = encodeURIComponent(`${shareText} ${shareUrl}`);
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedShareText}`;

    return (
        <div className="my-8 pt-6 border-t border-border-dark text-center">
            <h3 className="text-lg font-bold text-white mb-4">Bu Keşfi Beğendin mi?</h3>
            <p className="text-white/70 max-w-md mx-auto mb-6">
                Sayıların bilgeliğini sevdiklerinle de paylaşarak onların da kendi potansiyellerini keşfetmelerine yardımcı ol.
            </p>
            <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20"
            >
                <WhatsAppIcon />
                Arkadaşına WhatsApp'tan Tavsiye Et
            </a>
        </div>
    );
};

export default RecommendFriend;
