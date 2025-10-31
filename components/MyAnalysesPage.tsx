import React, { useState, useEffect, useMemo } from 'react';
import { getAnalyses, clearAnalyses } from '../services/storageService';
import type { StoredAnalysis, LoveAnalysisResult, PersonalAnalysisResult, PersonalYearResult, CareerAnalysisResult, AnalysisType } from '../types';
import type { Tab } from './CalculatorPage';

interface MyAnalysesPageProps {
    onNavigateToCalculators: (tab: Tab) => void;
}

type DateFilter = 'all' | 'last7' | 'last30' | 'thisYear';

const AnalysisCard: React.FC<{ analysis: StoredAnalysis; onSelect: () => void; }> = ({ analysis, onSelect }) => {
    const getAnalysisMeta = () => {
        switch (analysis.type) {
            case 'love': return {
                icon: 'favorite',
                title: `Aşk Uyumu: ${analysis.inputs.person1Name} & ${analysis.inputs.person2Name}`
            };
            case 'personal': return {
                icon: 'person',
                title: `Kişisel Rapor: ${analysis.inputs.name}`
            };
            case 'year': return {
                icon: 'event',
                title: `Kişisel Yıl: ${analysis.inputs.name}`
            };
            case 'career': return {
                icon: 'work',
                title: `Kariyer Analizi: ${analysis.inputs.name}`
            };
            default: return {
                icon: 'auto_awesome',
                title: 'Analiz'
            };
        }
    };

    const { icon, title } = getAnalysisMeta();

    return (
        <button onClick={onSelect} className="w-full text-left bg-card-dark p-4 rounded-lg hover:bg-card-dark-start border border-border-dark transition-all">
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">{icon}</span>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{title}</p>
                    <p className="text-xs text-white/60 mt-1">{new Date(analysis.timestamp).toLocaleString('tr-TR')}</p>
                </div>
            </div>
        </button>
    );
};

const DetailItem: React.FC<{ icon: string; label: string; value: string | number; isFullWidth?: boolean }> = ({ icon, label, value, isFullWidth = false }) => (
    <div className={`bg-background-dark p-3 rounded-lg ${isFullWidth ? 'sm:col-span-2' : ''}`}>
        <p className="text-sm text-white/60 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">{icon}</span>
            {label}
        </p>
        <p className="font-bold text-lg text-primary mt-1 whitespace-pre-wrap">{value}</p>
    </div>
);

const MyAnalysesPage: React.FC<MyAnalysesPageProps> = ({ onNavigateToCalculators }) => {
    const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);
    const [selectedAnalysis, setSelectedAnalysis] = useState<StoredAnalysis | null>(null);
    const [typeFilter, setTypeFilter] = useState<AnalysisType | 'all'>('all');
    const [dateFilter, setDateFilter] = useState<DateFilter>('all');

    useEffect(() => {
        setAnalyses(getAnalyses());
    }, []);

    useEffect(() => {
        setSelectedAnalysis(null);
    }, [typeFilter, dateFilter]);

    const handleClearHistory = () => {
        if (window.confirm('Tüm analiz geçmişinizi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
            clearAnalyses();
            setAnalyses([]);
            setSelectedAnalysis(null);
        }
    };
    
    const filteredAnalyses = useMemo(() => {
        const now = new Date().getTime();
        const last7Days = now - 7 * 24 * 60 * 60 * 1000;
        const last30Days = now - 30 * 24 * 60 * 60 * 1000;
        const thisYearStart = new Date(new Date().getFullYear(), 0, 1).getTime();

        const dateFilteredAnalyses = analyses.filter(a => {
            if (dateFilter === 'all') return true;
            const timestamp = a.timestamp;
            switch (dateFilter) {
                case 'last7': return timestamp >= last7Days;
                case 'last30': return timestamp >= last30Days;
                case 'thisYear': return timestamp >= thisYearStart;
                default: return true;
            }
        });

        if (typeFilter === 'all') {
            return dateFilteredAnalyses;
        }
        return dateFilteredAnalyses.filter(a => a.type === typeFilter);

    }, [analyses, typeFilter, dateFilter]);
    
    const renderAnalysisDetail = (analysis: StoredAnalysis) => {
        const result = analysis.result;
        let details: React.ReactNode;

        switch (analysis.type) {
            case 'love':
                const loveResult = result as LoveAnalysisResult;
                details = (
                    <>
                        <DetailItem icon="favorite" label="Analiz Başlığı" value={loveResult.title} isFullWidth={true} />
                        <DetailItem icon="percent" label="Uyumluluk Skoru" value={`${loveResult.compatibilityScore}%`} />
                    </>
                );
                break;
            case 'personal':
                const personalResult = result as PersonalAnalysisResult;
                const lifePath = personalResult.numerologyBreakdown.details.find(d => d.name.includes('Yaşam Yolu'))?.value;
                details = (
                    <>
                        <DetailItem icon="looks_one" label="Yaşam Yolu Sayısı" value={lifePath || 'N/A'} />
                        <DetailItem icon="summarize" label="Özet" value={personalResult.summary} isFullWidth={true} />
                    </>
                );
                break;
            case 'year':
                const yearResult = result as PersonalYearResult;
                details = (
                    <>
                        <DetailItem icon="event" label="Yıl Teması" value={yearResult.theme} />
                        <DetailItem icon="pin" label="Kişisel Yıl Sayısı" value={yearResult.personalYearNumber} />
                    </>
                );
                break;
            case 'career':
                const careerResult = result as CareerAnalysisResult;
                const idealCareers = careerResult.points.find(p => p.title.includes('İdeal Kariyer'))?.description;
                details = (
                     <>
                        <DetailItem icon="work" label="İdeal Kariyer Alanları" value={idealCareers || 'N/A'} isFullWidth={true} />
                        <DetailItem icon="summarize" label="Özet" value={careerResult.summary} isFullWidth={true} />
                    </>
                );
                break;
            default:
                details = <p>Özet bilgisi bulunamadı.</p>;
        }

        return (
            <div className="mt-4 bg-input-dark rounded-xl p-6 animate-fade-in-down border border-border-dark">
                <h3 className="text-xl font-bold text-white mb-4">Öne Çıkan Detaylar</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {details}
                </div>
                <p className="text-xs text-white/60 mt-6 text-center">Bu analizin tamamını görmek için lütfen bilgileri ilgili hesaplayıcıda tekrar girerek raporu yeniden oluşturun.</p>
            </div>
        );
    }

    const FilterButton: React.FC<{ onClick: () => void; isActive: boolean; label: string }> = ({ onClick, isActive, label }) => (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 ${
                isActive ? 'bg-primary text-white' : 'bg-input-dark text-white/60 hover:bg-card-dark-start'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Analiz Geçmişim</h1>
                    <p className="mt-2 text-white/70">Daha önce yaptığınız tüm analizlere buradan ulaşabilirsiniz.</p>
                </div>
                {analyses.length > 0 && (
                    <button onClick={handleClearHistory} className="flex-shrink-0 flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-md hover:bg-red-600/40 transition-colors text-sm font-semibold self-start sm:self-center">
                        <span className="material-symbols-outlined text-base">delete</span>
                        Geçmişi Temizle
                    </button>
                )}
            </div>
            
            <div className="bg-card-dark rounded-2xl p-6 sm:p-8">
                {analyses.length > 0 && (
                    <div className="mb-6 space-y-4">
                        <div>
                            <h4 className="text-md font-semibold text-white/80 mb-2">Türe Göre</h4>
                            <div className="flex flex-wrap gap-2">
                                <FilterButton onClick={() => setTypeFilter('all')} isActive={typeFilter === 'all'} label="Tümü" />
                                <FilterButton onClick={() => setTypeFilter('love')} isActive={typeFilter === 'love'} label="Aşk" />
                                <FilterButton onClick={() => setTypeFilter('personal')} isActive={typeFilter === 'personal'} label="Kişisel" />
                                <FilterButton onClick={() => setTypeFilter('year')} isActive={typeFilter === 'year'} label="Yıl" />
                                <FilterButton onClick={() => setTypeFilter('career')} isActive={typeFilter === 'career'} label="Kariyer" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold text-white/80 mb-2">Tarihe Göre</h4>
                            <div className="flex flex-wrap gap-2">
                                <FilterButton onClick={() => setDateFilter('all')} isActive={dateFilter === 'all'} label="Tüm Zamanlar" />
                                <FilterButton onClick={() => setDateFilter('last7')} isActive={dateFilter === 'last7'} label="Son 7 Gün" />
                                <FilterButton onClick={() => setDateFilter('last30')} isActive={dateFilter === 'last30'} label="Son 30 Gün" />
                                <FilterButton onClick={() => setDateFilter('thisYear')} isActive={dateFilter === 'thisYear'} label="Bu Yıl" />
                            </div>
                        </div>
                    </div>
                )}
                {filteredAnalyses.length > 0 ? (
                    <div className="space-y-4">
                        {filteredAnalyses.map(analysis => (
                           <AnalysisCard key={analysis.id} analysis={analysis} onSelect={() => setSelectedAnalysis(analysis.id === selectedAnalysis?.id ? null : analysis)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined text-6xl text-white/30">{analyses.length === 0 ? 'history' : 'search_off'}</span>
                        <h2 className="mt-4 text-2xl font-bold text-white">{analyses.length === 0 ? 'Henüz Bir Analiz Yapmadınız' : 'Bu Kriterlere Uygun Analiz Bulunamadı'}</h2>
                        <p className="mt-2 text-white/60">{analyses.length === 0 ? 'İlk numeroloji analizinizi yaparak kaderinizin sırlarını keşfetmeye başlayın.' : 'Farklı filtreleme seçenekleri deneyebilir veya yeni bir analiz oluşturabilirsiniz.'}</p>
                        <div className="mt-6">
                             <button
                                onClick={() => onNavigateToCalculators('personal')}
                                className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-all duration-300"
                            >
                                Analize Başla
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {selectedAnalysis && renderAnalysisDetail(selectedAnalysis)}
        </div>
    );
};

export default MyAnalysesPage;