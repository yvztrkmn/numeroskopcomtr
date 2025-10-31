
import React, { useState, useEffect } from 'react';

const analysisSteps = [
    "Evrensel kayıtlar taranıyor...",
    "Kozmik planınız hesaplanıyor...",
    "Sayıların frekansları hizalanıyor...",
    "Karakter haritanız oluşturuluyor...",
    "Potansiyeliniz yorumlanıyor...",
    "Raporunuz hazırlanıyor...",
];

const CosmicLoader: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(analysisSteps[0]);

    useEffect(() => {
        const totalDuration = 5000;
        const stepDuration = totalDuration / analysisSteps.length;

        let stepIndex = 0;
        const stepInterval = setInterval(() => {
            stepIndex++;
            if (stepIndex < analysisSteps.length) {
                setCurrentStep(analysisSteps[stepIndex]);
            }
        }, stepDuration);

        return () => clearInterval(stepInterval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-input-dark rounded-xl text-center">
             <style>{`
                @keyframes cosmic-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes cosmic-pulse {
                    0%, 100% { transform: scale(0.9); opacity: 0.7; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                @keyframes number-fade {
                    0%, 100% { opacity: 0.2; transform: scale(0.8); }
                    25%, 75% { opacity: 1; transform: scale(1.2); }
                }
                .orbit {
                    animation: cosmic-rotate 10s linear infinite;
                }
                .orbit-reverse {
                    animation: cosmic-rotate 15s linear infinite reverse;
                }
                .core-pulse {
                    animation: cosmic-pulse 3s ease-in-out infinite;
                }
                .number-fade {
                    animation: number-fade 5s ease-in-out infinite;
                }
            `}</style>
            <div className="w-40 h-40 relative mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <defs>
                        <filter id="glow-loader">
                            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Orbits */}
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#3713ec" strokeWidth="0.5" strokeOpacity="0.5" className="orbit-reverse" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.5" className="orbit" />
                    
                    {/* Core */}
                    <circle cx="50" cy="50" r="10" fill="#3713ec" className="core-pulse" filter="url(#glow-loader)" />

                    {/* Numbers */}
                    <text x="50" y="23" textAnchor="middle" fontSize="5" fill="#fff" className="number-fade" style={{animationDelay: '0s'}}>3</text>
                    <text x="80" y="40" textAnchor="middle" fontSize="5" fill="#fff" className="number-fade" style={{animationDelay: '-1s'}}>6</text>
                    <text x="70" y="80" textAnchor="middle" fontSize="5" fill="#fff" className="number-fade" style={{animationDelay: '-2s'}}>9</text>
                    <text x="20" y="70" textAnchor="middle" fontSize="5" fill="#fff" className="number-fade" style={{animationDelay: '-3s'}}>1</text>
                    <text x="30" y="20" textAnchor="middle" fontSize="5" fill="#fff" className="number-fade" style={{animationDelay: '-4s'}}>5</text>
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Analiz Oluşturuluyor</h3>
            <p className="text-sm text-white/70 transition-opacity duration-500 h-5">{currentStep}</p>
        </div>
    );
};

export default CosmicLoader;
