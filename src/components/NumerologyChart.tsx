
import React, { useEffect, useMemo, useState } from 'react';

interface NumerologyChartProps {
  data: { [key: string]: number };
}

const NumerologyChart: React.FC<NumerologyChartProps> = ({ data }) => {
    const [isAnimated, setIsAnimated] = useState(false);

    const chartData = useMemo(() => {
        return Array.from({ length: 9 }, (_, i) => {
            const numberKey = (i + 1).toString();
            return {
                number: numberKey,
                count: data[numberKey] || 0,
            };
        });
    }, [data]);

    const maxValue = useMemo(() => {
        const counts = chartData.map(item => item.count);
        const max = Math.max(...counts);
        return max === 0 ? 1 : max; // Avoid division by zero
    }, [chartData]);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-input-dark p-6 rounded-xl mt-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">İsminizin Numeroloji Çizelgesi</h3>
            <div className="flex justify-between items-end h-64 gap-2 sm:gap-4 px-2">
                {chartData.map(({ number, count }) => {
                    const barHeight = (count / maxValue) * 100;
                    return (
                        <div key={number} className="flex-1 flex flex-col items-center justify-end h-full group">
                            <div 
                                className="relative w-full bg-primary/20 rounded-t-md transition-all duration-1000 ease-out"
                                style={{ height: isAnimated ? `${barHeight}%` : '0%' }}
                            >
                               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-card-dark text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                    {count}
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-white/70 mt-2">{number}</span>
                        </div>
                    );
                })}
            </div>
             <div className="mt-6 text-center text-sm text-white/60">
                <p>
                    <span className="font-bold text-white/80">Baskın Sayılar</span> (yüksek sütunlar) en güçlü yeteneklerinizi gösterirken, 
                    <span className="font-bold text-white/80"> Eksik Sayılar</span> (boş sütunlar) geliştirmeniz gereken alanları işaret edebilir.
                </p>
            </div>
        </div>
    );
};

export default NumerologyChart;
