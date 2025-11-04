
import React, { useState, useEffect } from 'react';
import type { CareerAnalysisResult, NumerologyDetail, TextContentGetter } from '../types'; // Import TextContentGetter
import CosmicLoader from './ui/CosmicLoader';
import NumerologyChart from './NumerologyChart';
import RecommendFriend from './RecommendFriend';
import { formatDateForApi } from '../utils/numerology';
import { generateCareerAnalysis } from '../services/numerologyEngine';
import Shimmer from './ui/Shimmer';
import SocialShareButtons from './SocialShareButtons';
import RelatedAnalyses from './RelatedAnalyses';

// New sub-component for NumerologyDetail with expandable insight
const DetailCardWithInsight: React.FC<{ detail: NumerologyDetail; personName: string }> = ({ detail, personName }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [insightText, setInsightText] = useState<string | null>(null);
    const [isLoadingInsight, setIsLoadingInsight] = useState(false);

    useEffect(() => {
        if (isExpanded && !insightText && detail.getDetailedInsight) {
            setIsLoadingInsight(true);
            detail.getDetailedInsight().then(text => {
                setInsightText(text);
                setIsLoadingInsight(false);
            }).catch(error => {
                console.error("Error fetching detailed insight:", error);
                setInsightText('Detaylı bilgi alınamadı.');
                setIsLoadingInsight(false);
            });
        }
    }, [isExpanded, insightText, detail.getDetailedInsight]);

    return (
        <div className="bg-input-dark p-4 rounded-md flex flex-col h-full">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-white">{detail.name}</p>
                <span className="font-bold text-2xl text-accent">{detail.value}</span>
            </div>
            <p className="text-sm text-white/70 mt-2" style={{ whiteSpace: 'pre-wrap' }}>{detail.description}</p>
            
            {detail.getDetailedInsight && (
                <div className="mt-4 pt-4 border-t border-border-dark">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center justify-between w-full text-primary hover:text-primary-light transition-colors text-sm font-semibold"
                        aria-expanded={isExpanded}
                        aria-controls={`insight-${personName}-${detail.name.replace(/\s/g, '-')}`}
                    >
                        Daha Fazla Bilgi
                        <span className={`material-symbols-outlined text-base transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {isExpanded && (
                        <div id={`insight-${personName}-${detail.name.replace(/\s/g, '-')}`} className="mt-3 bg-background-dark p-3 rounded-md animate-fade-in-down">
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

const CareerPotentialCalculator: React.FC = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<CareerAnalysisResult | null>(null);

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
            const analysisPromise = generateCareerAnalysis(name, formattedDob);
            const delayPromise = new Promise(resolve => setTimeout(resolve, 5000));

            const [analysisResult] = await Promise.all([analysisPromise, delayPromise]);
            
            if (analysisResult) {
                setResult(analysisResult);
                
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
                setError('Kariyer analizi oluşturulamadı. Lütfen daha sonra tekrar deneyin.');
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
        const careerPaths = result.points.find(p => p.title.includes("İdeal Kariyer"))?.description || '';
        const shareText = `${result.numerologyBreakdown.name} için kariyer potansiyeli raporu hazır! İdeal kariyer yollarım: ${careerPaths}. Sen de kendininkini keşfet: `;


        return (
            <div className="mt-8 bg-card-dark rounded-xl p-6 sm:p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Kariyer & Potansiyel Raporunuz</h2>
                     {result.summary.startsWith('Placeholder') ? (
                        <Shimmer className="h-12 w-full max-w-2xl mx-auto mt-2" />
                    ) : (
                        <p className="text-white/80 mt-2 text-base">{result.summary}</p>
                    )}
                </div>

                {result.numerologyChart && <NumerologyChart data={result.numerologyChart} />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
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

                {result.careerPitfalls && result.careerPitfalls.length > 0 && (
                    <div className="my-8">
                         <h3 className="text-xl font-bold text-white mb-4 text-center">Kariyer Yolculuğunuzdaki Potansiyel Virajlar</h3>
                         <div className="space-y-6">
                            {result.careerPitfalls.map((pitfall, index) => (
                                <div key={index} className="bg-input-dark p-6 rounded-lg">
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-primary text-4xl">{pitfall.icon}</span>
                                        <div>
                                            <h4 className="font-bold text-xl text-white">{pitfall.engagingTitle}</h4>
                                            <p className="text-base text-white/70 mt-2">{pitfall.detailedDescription}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-border-dark">
                                        <h5 className="font-bold text-white/90 mb-2">Bu Virajı Güvenle Almak İçin İpuçları:</h5>
                                        <ul className="list-disc pl-5 space-y-2 text-sm text-white/80">
                                            {pitfall.actionableAdvice.map((advice, i) => (
                                                <li key={i}>{advice}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">{result.numerologyBreakdown.name} Numeroloji Dökümü</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {result.numerologyBreakdown.details.map((detail, index) => (
                            <DetailCardWithInsight key={index} detail={detail} personName={result.numerologyBreakdown.name} />
                        ))}
                    </div>
                </div>

                <SocialShareButtons shareText={shareText} />
                <RecommendFriend />
                <RelatedAnalyses currentAnalysisType="career" />

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
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Kariyer & Potansiyel Analizi</h2>
                    <p className="text-white/70 mt-2">Numeroloji ile doğal yeteneklerinizi ve ideal kariyer yollarınızı keşfedin.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name-career" className="block text-sm font-medium text-white/80 mb-2">İsim Soyisim</label>
                            <input autoFocus type="text" id="name-career" value={name} onChange={e => setName(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" placeholder="Örn: Elif Yılmaz" />
                        </div>
                        <div>
                            <label htmlFor="dob-career" className="block text-sm font-medium text-white/80 mb-2">Doğum Tarihi</label>
                            <input type="date" id="dob-career" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="text-center pt-4">
                        <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-all duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[180px]">
                            Analiz Et
                        </button>
                    </div>
                </form>
                </>
            )}
            {renderResult()}
        </div>
    );
};

export default CareerPotentialCalculator;