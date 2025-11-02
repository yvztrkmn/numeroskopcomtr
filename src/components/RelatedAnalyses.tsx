import React from 'react';
import type { Tab } from './CalculatorPage';
import { useNavigateToCalculators } from '../hooks/useNavigation';

interface RelatedAnalysesProps {
    currentAnalysisType: Tab;
}

const FeatureCard: React.FC<{ icon: string; title: string; description: string; onClick: () => void }> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="group bg-card-dark p-6 rounded-2xl text-center flex flex-col items-center border border-transparent hover:border-primary/50 hover:bg-card-dark-start transition-all duration-300 transform hover:-translate-y-2 w-full">
        <div className="bg-primary/10 rounded-full p-4 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-6">
            <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 text-center">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed text-center">{description}</p>
    </button>
);

const allAnalyses: { tab: Tab; icon: string; title: string; description: string; }[] = [
    { tab: 'love', icon: 'favorite', title: 'Aşk Uyumu Analizi', description: 'Partnerinizle aranızdaki numerolojik uyumu, güçlü ve zayıf yönlerinizi öğrenin.' },
    { tab: 'personal', icon: 'person', title: 'Kişisel Rapor', description: 'Yaşam yolu sayınızdan kader sayınıza, karakterinizin derinliklerindeki potansiyeli ortaya çıkarın.' },
    { tab: 'year', icon: 'event', title: 'Kişisel Yıl Analizi', description: 'İçinde bulunduğunuz yılın sizin için getireceği fırsatları ve zorlukları önceden bilin.' },
    { tab: 'career', icon: 'work', title: 'Kariyer & Potansiyel Analizi', description: 'Doğal yeteneklerinize en uygun kariyer yollarını ve profesyonel potansiyelinizi keşfedin.' },
];

const RelatedAnalyses: React.FC<RelatedAnalysesProps> = ({ currentAnalysisType }) => {
    const onNavigateToCalculators = useNavigateToCalculators();

    const filteredAnalyses = allAnalyses.filter(a => a.tab !== currentAnalysisType);
    
    // Shuffle the remaining analyses and take up to 3
    const shuffledAnalyses = filteredAnalyses.sort(() => 0.5 - Math.random()).slice(0, 3);

    if (shuffledAnalyses.length === 0) {
        return null;
    }

    return (
        <div className="mt-12 pt-6 border-t border-border-dark">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Keşfetmeye Devam Edin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shuffledAnalyses.map(analysis => (
                    <FeatureCard
                        key={analysis.tab}
                        icon={analysis.icon}
                        title={analysis.title}
                        description={analysis.description}
                        onClick={() => onNavigateToCalculators(analysis.tab)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedAnalyses;