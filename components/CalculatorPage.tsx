import React, { useState } from 'react';
import LoveCompatibilityCalculator from './LoveCompatibilityCalculator';
import PersonalReportCalculator from './PersonalReportCalculator';
import PersonalYearCalculator from './PersonalYearCalculator';
import CareerPotentialCalculator from './CareerPotentialCalculator';

export type Tab = 'love' | 'personal' | 'year' | 'career';

interface CalculatorPageProps {
    initialTab: Tab;
    onBack: () => void;
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ initialTab, onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const TabButton: React.FC<{ tabId: Tab; children: React.ReactNode }> = ({ tabId, children }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
        activeTab === tabId
          ? 'bg-primary text-white shadow-lg'
          : 'bg-input-dark text-white/70 hover:bg-card-dark hover:text-white'
      }`}
      aria-pressed={activeTab === tabId}
    >
      {children}
    </button>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
        <div className="mb-8 flex justify-start">
             <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                Ana Sayfaya Dön
            </button>
        </div>
      <div className="relative mb-8" role="tablist" aria-label="Analiz Tipi">
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabButton tabId="love">Aşk Uyumu</TabButton>
            <TabButton tabId="personal">Kişisel Rapor</TabButton>
            <TabButton tabId="year">Kişisel Yıl</TabButton>
            <TabButton tabId="career">Kariyer & Potansiyel</TabButton>
          </div>
      </div>
      
      <div role="tabpanel" hidden={activeTab !== 'love'}>
        {activeTab === 'love' && <LoveCompatibilityCalculator />}
      </div>
       <div role="tabpanel" hidden={activeTab !== 'personal'}>
        {activeTab === 'personal' && <PersonalReportCalculator />}
      </div>
      <div role="tabpanel" hidden={activeTab !== 'year'}>
        {activeTab === 'year' && <PersonalYearCalculator />}
      </div>
       <div role="tabpanel" hidden={activeTab !== 'career'}>
        {activeTab === 'career' && <CareerPotentialCalculator />}
      </div>
    </div>
  );
};

export default CalculatorPage;