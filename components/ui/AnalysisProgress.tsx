import React, { useState, useEffect } from 'react';

const analysisSteps = [
    "Bilgileriniz doğrulanıyor...",
    "Kozmik planınız hesaplanıyor...",
    "Sayılar hizalanıyor...",
    "Numerolojik titreşimler analiz ediliyor...",
    "Karakter haritanız oluşturuluyor...",
    "Potansiyeliniz yorumlanıyor...",
    "Raporunuz hazırlanıyor, son dokunuşlar...",
];

const AnalysisProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(analysisSteps[0]);

    useEffect(() => {
        const timeouts: number[] = [];
        const totalDuration = 5000; // 5 seconds
        const stepDuration = totalDuration / analysisSteps.length;
        
        // Animate progress bar smoothly over 5 seconds
        let startTime: number | null = null;
        const animateProgress = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;
            const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
            setProgress(newProgress);
            
            if (elapsedTime < totalDuration) {
                const timeoutId = window.requestAnimationFrame(animateProgress);
                timeouts.push(timeoutId as unknown as number);
            }
        };
        const initialRequestId = window.requestAnimationFrame(animateProgress);
        timeouts.push(initialRequestId as unknown as number);


        // Cycle through analysis steps to show continuous work
        let stepIndex = 0;
        const stepInterval = window.setInterval(() => {
            stepIndex = (stepIndex + 1);
            if(stepIndex < analysisSteps.length) {
               setCurrentStep(analysisSteps[stepIndex]);
            }
        }, stepDuration);
        

        return () => {
            timeouts.forEach(cancelAnimationFrame);
            clearInterval(stepInterval);
        };
    }, []);

    return (
        <div className="text-center mt-8 text-white/80 p-6 bg-input-dark rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Analiz Oluşturuluyor</h3>
            <div className="w-full bg-background-dark rounded-full h-2.5 mb-2 overflow-hidden">
                <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-200 ease-linear" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-sm transition-opacity duration-500 h-5">{currentStep}</p>
        </div>
    );
};

export default AnalysisProgress;