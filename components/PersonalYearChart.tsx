import React, { useState, useEffect } from 'react';
import type { PersonalYearNumberBreakdown } from '../types';

interface PersonalYearChartProps {
    breakdown: PersonalYearNumberBreakdown[];
}

const PersonalYearChart: React.FC<PersonalYearChartProps> = ({ breakdown }) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const maxValue = 9; // Max possible single digit value in numerology

    return (
        <div className="bg-input-dark p-6 rounded-xl my-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Bu Yılın Enerji Haritası</h3>
            <div className="space-y-4">
                {breakdown.map((item, index) => {
                    const barWidth = (item.number / maxValue) * 100;
                    return (
                        <div key={index} className="group relative">
                             <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-accent text-background-dark text-xs font-bold size-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                {item.number}
                            </div>
                            <div className="p-4 bg-background-dark rounded-lg">
                                <p className="text-sm font-semibold text-white/90 mb-2">
                                    {item.influence}
                                </p>
                                <div className="w-full bg-input-dark rounded-full h-3 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: isAnimated ? `${barWidth}%` : '0%' }}
                                    />
                                </div>
                                <div className="mt-3 text-xs text-white/60 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                    <p><span className="font-bold text-white/80">Yaşam Yolu Etkileşimi:</span> {item.lifePathInteraction}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PersonalYearChart;
