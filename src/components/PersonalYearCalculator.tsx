import React, { useState } from 'react';
import type { PersonalYearResult } from '../types';
import CosmicLoader from './ui/CosmicLoader';
import RecommendFriend from './RecommendFriend';
import { formatDateForApi } from '../utils/numerology';
import PersonalYearChart from './PersonalYearChart';
import { generatePersonalYearAnalysis } from '../services/numerologyEngine';
import Shimmer from './ui/Shimmer';
import SocialShareButtons from './SocialShareButtons';
import RelatedAnalyses from './RelatedAnalyses';


const PersonalYearCalculator: React.FC = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<PersonalYearResult | null>(null);

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
            const analysisPromise = generatePersonalYearAnalysis(name, formattedDob);
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
                setError('Yıl analizi oluşturulamadı. Lütfen daha sonra tekrar deneyin.');
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
        const shareText = `${result.year} Kişisel Yıl Raporum hazır! Tema: ${result.theme} ve Kişisel Yıl Numaram ${result.personalYearNumber}. Sen de kendininkini öğren: `;


        return (
            <div className="mt-8 bg-card-dark rounded-xl p-6 sm:p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{result.year} Kişisel Yıl Raporunuz</h2>
                    <p className="text-2xl font-semibold text-primary mt-2">Tema: {result.theme}</p>
                    {result.summary.startsWith('Placeholder') ? (
                        <Shimmer className="h-12 w-full max-w-2xl mx-auto mt-4" />
                    ) : (
                        <p className="text-white/80 mt-4 text-base">{result.summary}</p>
                    )}
                    <p className="mt-4 text-white text-lg">Kişisel Yıl Numaranız: <span className="font-bold text-accent text-xl">{result.personalYearNumber}</span></p>
                </div>
                
                 {result.numberBreakdown && result.numberBreakdown.length > 0 && (
                    <PersonalYearChart breakdown={result.numberBreakdown} />
                )}

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

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Bu Yılın Enerji Dökümü</h3>
                    <div className="space-y-3">
                        {result.numberBreakdown.map((detail, index) => (
                            <div key={index} className="bg-input-dark p-4 rounded-md">
                                <p className="font-semibold text-white">{detail.number} Sayısının Etkisi ({detail.type}): <span className="font-normal text-accent">{detail.influence}</span></p>
                                <p className="text-sm text-white/70 mt-2">{detail.lifePathInteraction}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <SocialShareButtons shareText={shareText} />
                <RecommendFriend />
                <RelatedAnalyses currentAnalysisType="year" />

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
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Kişisel Yıl Analizi</h2>
                    <p className="text-white/70 mt-2">Bu yılın numerolojik olarak sizin için neler getireceğini öğrenin.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name-year" className="block text-sm font-medium text-white/80 mb-2">İsim Soyisim</label>
                            <input autoFocus type="text" id="name-year" value={name} onChange={e => setName(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" placeholder="Örn: Elif Yılmaz" />
                        </div>
                        <div>
                            <label htmlFor="dob-year" className="block text-sm font-medium text-white/80 mb-2">Doğum Tarihi</label>
                            <input type="date" id="dob-year" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-input-dark border-border-dark border rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary" />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <div className="text-center pt-4">
                        <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-all duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[180px]">
                            Yılı Analiz Et
                        </button>
                    </div>
                </form>
                </>
            )}
            {renderResult()}
        </div>
    );
};

export default PersonalYearCalculator;