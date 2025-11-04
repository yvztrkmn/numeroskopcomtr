
import React, { useState, useEffect } from 'react';
import type { LoveAnalysisResult, NumerologyDetail, TextContentGetter } from '../types'; // Import TextContentGetter
import CosmicLoader from './ui/CosmicLoader';
import CircularProgress from './ui/CircularProgress';
import RecommendFriend from './RecommendFriend';
import { formatDateForApi } from '../utils/numerology';
import { generateLoveAnalysis } from '../services/numerologyEngine';
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
        <div className="bg-input-dark p-4 rounded-lg border border-border-dark flex flex-col h-full">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-white">{detail.name}</p>
                <span className="font-bold text-2xl text-accent">{detail.value}</span>
            </div>
            <p className="text-sm text-white/70 mt-2">{detail.description}</p>
            {detail.compatibilityImpact && (
                <p className="text-sm text-primary/90 mt-3 border-t border-border-dark pt-3">
                    <span className="font-bold">İlişkiye Etkisi:</span> {detail.compatibilityImpact}
                </p>
            )}

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

const LoveCompatibilityCalculator: React.FC = () => {
    const [person1Name, setPerson1Name] = useState('');
    const [person1Dob, setPerson1Dob] = useState('');
    const [person2Name, setPerson2Name] = useState('');
    const [person2Dob, setPerson2Dob] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<LoveAnalysisResult | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!person1Name || !person1Dob || !person2Name || !person2Dob) {
            setError('Lütfen tüm alanları doldurun.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        const formattedP1Dob = formatDateForApi(person1Dob);
        const formattedP2Dob = formatDateForApi(person2Dob);

        try {
            const analysisPromise = generateLoveAnalysis(person1Name, formattedP1Dob, person2Name, formattedP2Dob);
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
                setError('Analiz oluşturulamadı. Lütfen daha sonra tekrar deneyin.');
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const getCompatibilityLevel = (score: number): { text: string; color: string } => {
        if (score > 80) return { text: "Mükemmel Uyum", color: "text-green-400" };
        if (score >= 60) return { text: "Güçlü Uyum", color: "text-yellow-400" };
        return { text: "Geliştirilebilir Uyum", color: "text-orange-400" };
    };


    const renderResult = () => {
        if (!result) return null;

        const compatibilityLevel = getCompatibilityLevel(result.compatibilityScore);
        const shareText = `${result.numerologyBreakdown.person1.name} ve ${result.numerologyBreakdown.person2.name} arasındaki numerolojik aşk uyumu %${result.compatibilityScore}! Sen de kendininkini keşfet: `;

        return (
            <div className="mt-8 bg-card-dark rounded-xl p-6 sm:p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{result.title}</h2>
                     {result.summary.startsWith('Placeholder') ? (
                        <Shimmer className="h-12 w-full max-w-2xl mx-auto mt-2" />
                    ) : (
                        <p className="text-white/80 mt-2 text-base">{result.summary}</p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
                    <CircularProgress value={result.compatibilityScore} />
                    <div className="text-center sm:text-left">
                        <h3 className="text-lg font-semibold text-white/80">Uyumluluk Seviyesi</h3>
                        <p className={`text-3xl font-bold ${compatibilityLevel.color}`}>{compatibilityLevel.text}</p>
                         <p className="text-sm text-white/60 mt-1">Bu skor, sayılarınızın enerjisel<br/> etkileşimini temsil eder.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Person 1 Breakdown */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4 text-center">{result.numerologyBreakdown.person1.name} Numeroloji Dökümü</h3>
                        <div className="space-y-4">
                            {result.numerologyBreakdown.person1.details.map((detail, index) => (
                                <DetailCardWithInsight key={index} detail={detail} personName={result.numerologyBreakdown.person1.name} />
                            ))}
                        </div>
                    </div>
                    {/* Person 2 Breakdown */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4 text-center">{result.numerologyBreakdown.person2.name} Numeroloji Dökümü</h3>
                         <div className="space-y-4">
                            {result.numerologyBreakdown.person2.details.map((detail, index) => (
                               <DetailCardWithInsight key={index} detail={detail} personName={result.numerologyBreakdown.person2.name} />
                            ))}
                        </div>
                    </div>
                </div>

                <SocialShareButtons shareText={shareText} />
                <RecommendFriend />
                <RelatedAnalyses currentAnalysisType="love" />

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
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Aşk Uyumu Hesaplayıcı</h2>
                    <p className="text-white/70 mt-2">İsimleriniz ve doğum tarihlerinizle numerolojik aşk uyumunuzu keşfedin.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">1. Kişi</h3>
                            <div>
                                <label htmlFor="person1Name" className="block text-sm font-medium text-white/80 mb-2">İsim Soyisim</label>
                                <input autoFocus type="text" id="person1Name" value={person1Name} onChange={e => setPerson1Name(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" placeholder="Örn: Elif Yılmaz" />
                            </div>
                            <div>
                                <label htmlFor="person1Dob" className="block text-sm font-medium text-white/80 mb-2">Doğum Tarihi</label>
                                <input type="date" id="person1Dob" value={person1Dob} onChange={e => setPerson1Dob(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">2. Kişi</h3>
                            <div>
                                <label htmlFor="person2Name" className="block text-sm font-medium text-white/80 mb-2">İsim Soyisim</label>
                                <input type="text" id="person2Name" value={person2Name} onChange={e => setPerson2Name(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" placeholder="Örn: Can Öztürk" />
                            </div>
                             <div>
                                <label htmlFor="person2Dob" className="block text-sm font-medium text-white/80 mb-2">Doğum Tarihi</label>
                                <input type="date" id="person2Dob" value={person2Dob} onChange={e => setPerson2Dob(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="text-center pt-4">
                        <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-all duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[180px]">
                            Uyumu Analiz Et
                        </button>
                    </div>
                </form>
                </>
            )}
            {renderResult()}
        </div>
    );
};

export default LoveCompatibilityCalculator;