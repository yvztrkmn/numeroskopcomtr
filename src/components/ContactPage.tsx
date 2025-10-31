
import React, { useState } from 'react';
import InstagramIcon from './icons/InstagramIcon';
import TwitterIcon from './icons/TwitterIcon';
import FacebookIcon from './icons/FacebookIcon';
import LoadingSpinner from './ui/LoadingSpinner';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Form submitted:', formState);
    }, 1500);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tighter">
          Bize Ulaşın
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/70">
          Numeroskop ile ilgili her türlü soru, öneri ve geri bildiriminiz bizim için çok değerli. Evrenin sırlarını sayılarla keşfettiğiniz bu yolculukta size yardımcı olmaktan mutluluk duyarız.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Form */}
        <div className="bg-card-dark rounded-2xl p-6 sm:p-8">
          {isSubmitted ? (
             <div className="text-center flex flex-col items-center justify-center h-full">
                <span className="material-symbols-outlined text-green-400 text-6xl">check_circle</span>
                <h2 className="text-2xl font-bold text-white mt-4">Teşekkürler!</h2>
                <p className="text-white/70 mt-2">Mesajınız bize ulaştı. En kısa sürede geri dönüş yapacağız.</p>
             </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Geri Bildirim Formu</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">İsim</label>
                  <input type="text" id="name" name="name" value={formState.name} onChange={handleInputChange} required className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" placeholder="Adınız Soyadınız" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">E-posta</label>
                  <input type="email" id="email" name="email" value={formState.email} onChange={handleInputChange} required className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" placeholder="ornek@mail.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Mesajınız</label>
                  <textarea id="message" name="message" value={formState.message} onChange={handleInputChange} required rows={4} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" placeholder="Soru, öneri veya geri bildiriminizi buraya yazın..."></textarea>
                </div>
                <div className="text-left pt-2">
                    <button type="submit" disabled={isSubmitting} className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-all duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]">
                        {isSubmitting ? <LoadingSpinner size="sm" /> : 'Gönder'}
                    </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-card-dark-start rounded-2xl p-6 sm:p-8 flex flex-col justify-center border border-border-dark">
            <h2 className="text-2xl font-bold text-white mb-6">Diğer Kanallar</h2>
            
            <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">mail</span>
                <div>
                    <h3 className="font-semibold text-white/80">E-posta</h3>
                    <a href="mailto:destek@numeroskop.com.tr" className="text-primary hover:underline">destek@numeroskop.com.tr</a>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">group</span>
                <div>
                    <h3 className="font-semibold text-white/80">Sosyal Medya</h3>
                    <p className="text-sm text-white/60 mb-3">Güncel paylaşımlar ve numeroloji ipuçları için bizi takip edin.</p>
                     <div className="flex space-x-4">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 transition-colors hover:text-primary"><InstagramIcon /></a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/70 transition-colors hover:text-primary"><TwitterIcon /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 transition-colors hover:text-primary"><FacebookIcon /></a>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
