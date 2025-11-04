
import React, { useState, useEffect } from 'react';
import type { PersonalAnalysisResult, NumerologyDetail } from '../types';
import CosmicLoader from './ui/CosmicLoader';
import { saveUser, getUser } from '../services/userService';
import RecommendFriend from './RecommendFriend';
import { formatDateForApi } from '../utils/numerology';
import { generatePersonalAnalysis } from '../services/numerologyEngine';
import Shimmer from './ui/Shimmer';
import { lifePathInterpretations } from '../services/numerologyData';
import SocialShareButtons from './SocialShareButtons';
import RelatedAnalyses from './RelatedAnalyses';

// Updated DetailCard to handle expandable insight
const DetailCard: React.FC<{ 
    icon: string, 
    name: string, 
    value: string | number, 
    theme: string, 
    description: string,
    getDetailedInsight?: () => Promise<string> // New prop
}> = ({ icon, name, value, theme, description, getDetailedInsight }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [insightText, setInsightText] = useState<string | null>(null);
    const [isLoadingInsight, setIsLoadingInsight] = useState(false);

    useEffect(() => {
        if (isExpanded && !insightText && getDetailedInsight) {
            setIsLoadingInsight(true);
            getDetailedInsight().then(text => {
                setInsightText(text);
                setIsLoadingInsight(false);
            }).catch(error => {
                console.error("Error fetching detailed insight:", error);
                setInsightText('Detaylı bilgi alınamadı.');
                setIsLoadingInsight(false);
            });
        }
    }, [isExpanded, insightText, getDetailedInsight]);

    return (
        <div className="bg-input-dark p-5 rounded-lg border border-border-dark flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
                    <h4 className="font-bold text-lg text-white">{name}</h4>
                </div>
                <div className="bg-primary/10 border-2 border-primary text-primary text-3xl font-bold rounded-full size-12 flex items-center justify-center flex-shrink-0">
                    <span>{value}</span>
                </div>
            </div>
            <p className="font-semibold text-accent mb-2">{theme}</p>
            <p className="text-sm text-white/80 leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>{description}</p>

            {getDetailedInsight && (
                <div className="mt-4 pt-4 border-t border-border-dark">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center justify-between w-full text-primary hover:text-primary-light transition-colors text-sm font-semibold"
                        aria-expanded={isExpanded}
                        aria-controls={`insight-${name.replace(/\s/g, '-')}`}
                    >
                        Daha Fazla Bilgi
                        <span className={`material-symbols-outlined text-base transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {isExpanded && (
                        <div id={`insight-${name.replace(/\s/g, '-')}`} className="mt-3 bg-background-dark p-3 rounded-md animate-fade-in-down">
                            {isLoadingInsight ? (
                                <Shimmer className="h-20 w-full" />
                            ) : (
                                <p className="text-xs text-white/70 prose prose-invert max-w-none whitespace-pre-wrap">{insightText || 'Yükleniyor...'}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


const PersonalReportCalculator: React.FC = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<PersonalAnalysisResult | null>(null);

    useEffect(() => {
        const user = getUser();
        if (user) {
            setName(user.name);
            const parts = user.dob.split('.');
            if (parts.length === 3) {
                const [day, month, year] = parts;
                setDob(`${year}-${month}-${day}`);
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !dob) {
            setError('Lütfen tüm alanları doldurun.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        
        const formattedDob = formatDateForApi(dob);

        try {
            const analysisPromise = generatePersonalAnalysis(name, formattedDob);
            const delayPromise = new Promise(resolve => setTimeout(resolve, 5000));

            const [analysisResult] = await Promise.all([analysisPromise, delayPromise]);

            if (analysisResult) {
                setResult(analysisResult);
                saveUser({ name, dob: formattedDob }); // Always save user info
                
                 analysisResult.getSummary().then(summary => {
                    setResult(prevResult => {
                        if (prevResult) {
                           const newResult = { ...prevResult, summary };
                           return newResult;
                        }
                        return prevResult;
                    });
                });

            } else {
                setError('Rapor oluşturulamadı. Lütfen daha sonra tekrar deneyin.');
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderResult = () => {
        if (!result) return null;
        
        const detailIcons: { [key: string]: string } = {
            'Yaşam Yolu Sayısı': 'map',
            'Kader Sayısı': 'stars',
            'Ruh Dürtüsü Sayısı': 'favorite',
            'Kişilik Sayısı': 'sentiment_satisfied'
        };
        const shareText = `${result.numerologyBreakdown.name} için kişisel numeroloji raporu hazır! Yaşam yolu sayım ${result.numerologyBreakdown.details[0].value}. Sen de keşfet: `;


        return (
            <div className="mt-8 bg-card-dark rounded-xl p-6 sm:p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Kişisel Numeroloji Raporunuz</h2>
                    {result.summary.startsWith('Placeholder') ? (
                        <Shimmer className="h-16 w-full max-w-2xl mx-auto mt-2" />
                    ) : (
                        <p className="text-white/80 mt-2 text-base">{result.summary}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {result.points.map((point, index) => (
                        <div key={index} className="bg-input-dark p-4 rounded-lg flex items-start gap-4 h-full">
                            <span className="material-symbols-outlined text-primary text-3xl">{point.icon}</span>
                            <div>
                                <h3 className="font-bold text-white">{point.title}</h3>
                                <p className="text-sm text-white/70">{point.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">{result.numerologyBreakdown.name} Numeroloji Dökümü</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {result.numerologyBreakdown.details.map((detail, index) => (
                            <DetailCard 
                                key={index}
                                icon={detailIcons[detail.name] || 'auto_awesome'}
                                name={detail.name}
                                value={detail.value}
                                theme={lifePathInterpretations[Number(detail.value)]?.title || 'Özel Tema'}
                                description={detail.description}
                                getDetailedInsight={detail.getDetailedInsight} // Pass the new prop
                            />
                        ))}
                    </div>
                </div>

                <SocialShareButtons shareText={shareText} />
                <RecommendFriend />
                <RelatedAnalyses currentAnalysisType="personal" />

                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-white mb-4">{result.seoContent.title}</h3>
                    <div className="prose prose-invert max-w-none text-white/80 space-y-4 text-base">
                        {result.seoContent.sections.map((section, index) => (
                            <div key={index}>
                                <h4 className="text-lg font-semibold text-white">{section.heading}</h4>
                                <p>{section.paragraph}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-card-dark p-6 sm:p-10 rounded-2xl shadow-2xl">
            { isLoading && <CosmicLoader /> }
             { !isLoading && !result && (
                <>
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Kişisel Rapor</h2>
                    <p className="text-white/70 mt-2">İsminiz ve doğum tarihinizle kişisel numeroloji raporunuzu oluşturun.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">İsim Soyisim</label>
                            <input autoFocus type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" placeholder="Örn: Elif Yılmaz" />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-white/80 mb-2">Doğum Tarihi</label>
                            <input type="date" id="dob" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                    
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="text-center pt-4">
                        <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-all duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[180px]">
                            Rapor Oluştur
                        </button>
                    </div>
                </form>
                </>
             )}
            {renderResult()}
        </div>
    );
};

export default PersonalReportCalculator;