
import * as numerology from '../utils/numerology';
import * as db from './numerologyData';
import { generatePersonalizedSummary } from './geminiService';
import type { 
    LoveAnalysisResult, 
    PersonalAnalysisResult, 
    PersonalYearResult, 
    CareerAnalysisResult,
    NumerologyDetail
} from '../types';

// Helper to create the getSummary function
const createSummaryGetter = (name: string, type: string, insights: string[]): () => Promise<string> => {
    return async () => {
        return await generatePersonalizedSummary(name, type, insights) || 'Kişiselleştirilmiş özetiniz oluşturulamadı.';
    };
};

const getSafeDescription = (interpretations: any, key: number, fallback: string = 'Analiz için yetersiz veri.'): string => {
    return interpretations[key]?.description || fallback;
};

const getSafeTitle = (interpretations: any, key: number, fallback: string = 'Bilinmiyor'): string => {
    return interpretations[key]?.title || fallback;
};

export const generateLoveAnalysis = async (person1Name: string, person1Dob: string, person2Name: string, person2Dob: string): Promise<LoveAnalysisResult | null> => {
    const p1LifePath = numerology.getLifePathNumber(person1Dob);
    const p2LifePath = numerology.getLifePathNumber(person2Dob);
    const p1Destiny = numerology.getDestinyNumber(person1Name);
    const p2Destiny = numerology.getDestinyNumber(person2Name);
    const p1Personality = numerology.getPersonalityNumber(person1Name);
    const p2Personality = numerology.getPersonalityNumber(person2Name);

    if (!p1LifePath || !p2LifePath) return null; // Essential for analysis

    const compatibility = db.getLoveCompatibility(p1LifePath, p2LifePath);
    if (!compatibility) return null;

    const person1Details: NumerologyDetail[] = [
        { name: 'Yaşam Yolu Sayısı', value: p1LifePath, description: getSafeDescription(db.lifePathInterpretations, p1LifePath), compatibilityImpact: db.getCompatibilityImpact('lifePath', p1LifePath, p2LifePath) },
        { name: 'Kader Sayısı', value: p1Destiny, description: getSafeDescription(db.destinyNumberInterpretations, p1Destiny), compatibilityImpact: db.getCompatibilityImpact('destiny', p1Destiny, p2Destiny) },
        { name: 'Kişilik Sayısı', value: p1Personality, description: getSafeDescription(db.personalityNumberInterpretations, p1Personality), compatibilityImpact: db.getCompatibilityImpact('personality', p1Personality, p2Personality) },
    ];
    
    const person2Details: NumerologyDetail[] = [
        { name: 'Yaşam Yolu Sayısı', value: p2LifePath, description: getSafeDescription(db.lifePathInterpretations, p2LifePath), compatibilityImpact: db.getCompatibilityImpact('lifePath', p2LifePath, p1LifePath) },
        { name: 'Kader Sayısı', value: p2Destiny, description: getSafeDescription(db.destinyNumberInterpretations, p2Destiny), compatibilityImpact: db.getCompatibilityImpact('destiny', p2Destiny, p1Destiny) },
        { name: 'Kişilik Sayısı', value: p2Personality, description: getSafeDescription(db.personalityNumberInterpretations, p2Personality), compatibilityImpact: db.getCompatibilityImpact('personality', p2Personality, p1Personality) },
    ];
    
    const keyInsights = [
        `Genel uyum skoru: ${compatibility.score}/100`,
        `${person1Name}'in ${p1LifePath} Yaşam Yolu, ${person2Name}'in ${p2LifePath} Yaşam Yolu ile etkileşime giriyor.`,
        `İlişkinin ana teması: ${compatibility.title}`,
        `Güçlü Yön: ${compatibility.points.find(p => p.icon === 'thumb_up')?.description || 'Bilinmiyor'}`,
        `Dikkat Edilmesi Gereken: ${compatibility.points.find(p => p.icon === 'visibility')?.description || 'Bilinmiyor'}`
    ];
    
    return {
        compatibilityScore: compatibility.score,
        title: compatibility.title,
        summary: 'Placeholder for summary',
        getSummary: createSummaryGetter(`${person1Name} ve ${person2Name}`, 'Aşk Uyumu', keyInsights),
        points: compatibility.points,
        numerologyBreakdown: {
            person1: { name: person1Name, details: person1Details },
            person2: { name: person2Name, details: person2Details },
        },
        seoContent: db.seoContent.love,
    };
};

export const generatePersonalAnalysis = async (name: string, dob: string): Promise<PersonalAnalysisResult | null> => {
    const lifePath = numerology.getLifePathNumber(dob);
    const destiny = numerology.getDestinyNumber(name);
    const soulUrge = numerology.getSoulUrgeNumber(name);
    const personality = numerology.getPersonalityNumber(name);
    
    if (!lifePath || !destiny || !soulUrge || !personality || !db.personalReportPoints[lifePath]) return null;

    const details: NumerologyDetail[] = [
        { name: 'Yaşam Yolu Sayısı', value: lifePath, description: `${getSafeDescription(db.lifePathInterpretations, lifePath)}` },
        { name: 'Kader Sayısı', value: destiny, description: `${getSafeDescription(db.destinyNumberInterpretations, destiny)}\n\n${db.getInteractionText('destiny', destiny, lifePath)}`},
        { name: 'Ruh Dürtüsü Sayısı', value: soulUrge, description: `${getSafeDescription(db.soulUrgeNumberInterpretations, soulUrge)}\n\n${db.getInteractionText('soulUrge', soulUrge, lifePath)}`},
        { name: 'Kişilik Sayısı', value: personality, description: `${getSafeDescription(db.personalityNumberInterpretations, personality)}\n\n${db.getInteractionText('personality', personality, lifePath)}`},
    ];

    const keyInsights = [
        `Yaşam Yolu Sayısı ${lifePath} (${getSafeTitle(db.lifePathInterpretations, lifePath)})`,
        `Kader Sayısı ${destiny} (${getSafeTitle(db.destinyNumberInterpretations, destiny)})`,
        `En büyük gücü: ${db.personalReportPoints[lifePath]?.points[0]?.title || 'Bilinmiyor'}`,
        `Geliştirilmesi gereken alan: ${db.personalReportPoints[lifePath]?.points[3]?.title || 'Bilinmiyor'}`
    ];
    
    return {
        summary: 'Placeholder for summary',
        getSummary: createSummaryGetter(name, 'Kişisel Rapor', keyInsights),
        points: db.personalReportPoints[lifePath].points,
        numerologyBreakdown: { name, details },
        seoContent: db.seoContent.personal,
    };
};

export const generatePersonalYearAnalysis = async (name: string, dob: string): Promise<PersonalYearResult | null> => {
    const year = new Date().getFullYear();
    const lifePath = numerology.getLifePathNumber(dob);
    const { personalYear, breakdown } = numerology.getPersonalYearNumber(dob, year);
    
    if (!lifePath || !personalYear) return null;

    const yearData = db.personalYearInterpretations[personalYear];
    if (!yearData) return null;
    
    const numberBreakdown = breakdown.map(item => ({
        ...item,
        influence: db.getBreakdownInfluence(item.number, item.type),
        lifePathInteraction: db.getBreakdownInteraction(item.number, lifePath)
    }));
    
    const keyInsights = [
        `${year} yılı için Kişisel Yıl Sayısı ${personalYear}.`,
        `Yılın ana teması: ${yearData.theme}`,
        `Odaklanılması gereken ana alan: ${yearData.points[0]?.title || ''} - ${yearData.points[0]?.description || ''}`
    ];

    return {
        year,
        theme: yearData.theme,
        personalYearNumber: personalYear,
        summary: 'Placeholder for summary',
        getSummary: createSummaryGetter(name, 'Kişisel Yıl Analizi', keyInsights),
        points: yearData.points,
        numberBreakdown,
        seoContent: db.seoContent.year,
    };
};


export const generateCareerAnalysis = async (name: string, dob: string): Promise<CareerAnalysisResult | null> => {
    const lifePath = numerology.getLifePathNumber(dob);
    const destiny = numerology.getDestinyNumber(name);
    const soulUrge = numerology.getSoulUrgeNumber(name);
    
    if (!lifePath || !destiny || !soulUrge) return null;

    const careerData = db.careerInterpretations[lifePath];
    if (!careerData) return null;

    const details: NumerologyDetail[] = [
        { name: 'Yaşam Yolu Sayısı', value: lifePath, description: getSafeDescription(db.lifePathInterpretations, lifePath) },
        { name: 'Kader Sayısı', value: destiny, description: getSafeDescription(db.destinyNumberInterpretations, destiny) },
        { name: 'Ruh Dürtüsü Sayısı', value: soulUrge, description: getSafeDescription(db.soulUrgeNumberInterpretations, soulUrge) },
    ];

    const keyInsights = [
        `Yaşam Yolu Sayısı ${lifePath}, doğal yeteneklerini belirliyor.`,
        `Kader Sayısı ${destiny}, profesyonel potansiyelini gösteriyor.`,
        `İdeal kariyer yolları: ${careerData.points.find(p => p.title.includes("İdeal Kariyer"))?.description || 'Bilinmiyor'}`,
        `En büyük tuzağı: ${careerData.pitfalls[0]?.engagingTitle || 'Bilinmiyor'}`
    ];

    return {
        summary: 'Placeholder for summary',
        getSummary: createSummaryGetter(name, 'Kariyer Potensiyeli Analizi', keyInsights),
        points: careerData.points,
        careerPitfalls: careerData.pitfalls,
        numerologyBreakdown: { name, details },
        numerologyChart: numerology.getCharacterChart(name),
        seoContent: db.seoContent.career,
    };
};
