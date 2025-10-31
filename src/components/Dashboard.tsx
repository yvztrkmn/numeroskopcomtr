
import React from 'react';
import type { User } from '../types';
import type { Tab } from './CalculatorPage';
import DailyNumber from './DailyNumber';

interface DashboardProps {
    user: User;
    onNavigateToCalculators: (tab: Tab) => void;
}

const QuickLink: React.FC<{ icon: string; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-2 bg-input-dark p-4 rounded-lg hover:bg-card-dark-start transition-colors w-full h-full text-center">
        <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
        <span className="text-sm font-semibold text-white/90">{label}</span>
    </button>
);


const Dashboard: React.FC<DashboardProps> = ({ user, onNavigateToCalculators }) => {
    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                    Tekrar Hoş Geldin, <span className="text-primary">{user.name.split(' ')[0]}!</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-white/70">
                    Sayıların rehberliğinde kendini keşfetmeye devam etmeye hazır mısın?
                </p>
            </div>

            <div>
                <DailyNumber />
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Hızlı Analizler</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickLink icon="favorite" label="Aşk Uyumu" onClick={() => onNavigateToCalculators('love')} />
                    <QuickLink icon="person" label="Kişisel Rapor" onClick={() => onNavigateToCalculators('personal')} />
                    <QuickLink icon="event" label="Kişisel Yıl" onClick={() => onNavigateToCalculators('year')} />
                    <QuickLink icon="work" label="Kariyer Potensiyeli" onClick={() => onNavigateToCalculators('career')} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
