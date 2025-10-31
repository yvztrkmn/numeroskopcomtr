import React, { useState, useEffect } from 'react';
import { getUser } from '../services/userService';
import { getLifePathNumber, getPersonalDayNumber, getUniversalDayNumber } from '../utils/numerology';
import { generateDailyForecast } from '../services/geminiService';
import Shimmer from './ui/Shimmer';

const DailyNumber: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [forecast, setForecast] = useState<string | null>(null);
    const [displayNumber, setDisplayNumber] = useState<number | null>(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchForecast = async () => {
            setIsLoading(true);
            const user = getUser();
            const today = new Date();

            if (user && user.name && user.dob) {
                const lifePathNumber = getLifePathNumber(user.dob);
                const personalDayNumber = getPersonalDayNumber(lifePathNumber, today);
                setDisplayNumber(personalDayNumber);
                setTitle(`${user.name} için Günün Sayısı`);
                const geminiForecast = await generateDailyForecast(user.name, lifePathNumber, personalDayNumber);
                setForecast(geminiForecast || 'Bugün sizin için enerjiler yüksek. Fırsatları değerlendirin ve sezgilerinize güvenin.');
            } else {
                const universalDayNumber = getUniversalDayNumber(today);
                setDisplayNumber(universalDayNumber);
                setTitle("Evrensel Günün Sayısı");
                setForecast('Bugün evrensel enerji, yeni başlangıçlar ve yaratıcılık için oldukça uygun. Çevrenizle uyum içinde olun.');
            }
            setIsLoading(false);
        };

        fetchForecast();
    }, []);


    return (
        <div className="bg-card-dark rounded-2xl p-6 text-center border border-border-dark shadow-lg">
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <div className="flex justify-center items-center my-4">
                {isLoading ? (
                    <Shimmer className="size-24 rounded-full" />
                ) : (
                    <div className="bg-primary/10 border-2 border-primary text-primary text-5xl font-bold rounded-full size-24 flex items-center justify-center animate-fade-in">
                        <span>{displayNumber}</span>
                    </div>
                )}
            </div>
             {isLoading ? (
                <Shimmer className="h-10 w-full max-w-lg mx-auto" />
            ) : (
                <p className="text-white/80 max-w-lg mx-auto animate-fade-in">{forecast}</p>
            )}
        </div>
    );
};

export default DailyNumber;
