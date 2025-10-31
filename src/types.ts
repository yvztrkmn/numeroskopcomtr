
export interface NumerologyDetail {
  name: string;
  value: number | string;
  description: string;
  compatibilityImpact?: string;
}

export interface NumerologyBreakdown {
  name: string;
  details: NumerologyDetail[];
}

export interface AnalysisPoint {
  icon: string;
  title: string;
  description: string;
}

export interface SeoContentSection {
  heading: string;
  paragraph: string;
}

export interface SeoSection {
  title: string;
  sections: SeoContentSection[];
}

// A function that returns a promise for the summary string
type SummaryGetter = () => Promise<string>;

export interface LoveAnalysisResult {
  compatibilityScore: number;
  title: string;
  summary: string; // Will hold the summary text
  getSummary: SummaryGetter; // The async function to fetch the summary
  points: AnalysisPoint[];
  numerologyBreakdown: {
    person1: NumerologyBreakdown;
    person2: NumerologyBreakdown;
  };
  seoContent: SeoSection;
}

export interface PersonalAnalysisResult {
  summary: string;
  getSummary: SummaryGetter;
  points: AnalysisPoint[];
  numerologyBreakdown: NumerologyBreakdown;
  seoContent: SeoSection;
}

export interface PersonalYearNumberBreakdown {
    number: number;
    type: string; // e.g., 'Doğum Günü', 'Doğum Ayı', 'Evrensel Yıl'
    influence: string;
    lifePathInteraction: string;
}

export interface PersonalYearResult {
  year: number;
  theme: string;
  personalYearNumber: number;
  summary:string;
  getSummary: SummaryGetter;
  points: AnalysisPoint[];
  numberBreakdown: PersonalYearNumberBreakdown[];
  seoContent: SeoSection;
}

export interface CareerPitfall {
    icon: string;
    engagingTitle: string;
    detailedDescription: string;
    actionableAdvice: string[];
}
export interface CareerAnalysisResult {
  summary: string;
  getSummary: SummaryGetter;
  points: AnalysisPoint[];
  careerPitfalls: CareerPitfall[];
  numerologyBreakdown: NumerologyBreakdown;
  numerologyChart: { [key: string]: number };
  seoContent: SeoSection;
}

// User Profile Type
export interface User {
  name: string;
  dob: string; // Stored as DD.MM.YYYY
}

// Fix: Add missing types for MyAnalysesPage.tsx to resolve compilation errors.
export type AnalysisType = 'love' | 'personal' | 'year' | 'career';

interface LoveAnalysisInputs {
    person1Name: string;
    person1Dob: string;
    person2Name: string;
    person2Dob: string;
}

interface PersonalAnalysisInputs {
    name: string;
    dob: string;
}

interface StoredLoveAnalysis {
    id: string;
    type: 'love';
    timestamp: number;
    inputs: LoveAnalysisInputs;
    result: LoveAnalysisResult;
}

interface StoredPersonalAnalysis {
    id: string;
    type: 'personal';
    timestamp: number;
    inputs: PersonalAnalysisInputs;
    result: PersonalAnalysisResult;
}

interface StoredYearAnalysis {
    id: string;
    type: 'year';
    timestamp: number;
    inputs: PersonalAnalysisInputs;
    result: PersonalYearResult;
}

interface StoredCareerAnalysis {
    id: string;
    type: 'career';
    timestamp: number;
    inputs: PersonalAnalysisInputs;
    result: CareerAnalysisResult;
}

export type StoredAnalysis = StoredLoveAnalysis | StoredPersonalAnalysis | StoredYearAnalysis | StoredCareerAnalysis;
