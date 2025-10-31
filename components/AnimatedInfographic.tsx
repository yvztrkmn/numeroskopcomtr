import React from 'react';

const AnimatedInfographic: React.FC = () => {
    return (
        <div className="w-full aspect-square relative flex items-center justify-center">
            <style>
                {`
                @keyframes pulse {
                    0%, 100% { transform: scale(0.95); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                @keyframes stream-in-1 {
                    from { transform: translate(0, 0); opacity: 1; }
                    to { transform: translate(80px, 80px); opacity: 0; }
                }
                @keyframes stream-in-2 {
                    from { transform: translate(0, 0); opacity: 1; }
                    to { transform: translate(-70px, 70px); opacity: 0; }
                }
                @keyframes stream-in-3 {
                    from { transform: translate(0, 0); opacity: 1; }
                    to { transform: translate(70px, -70px); opacity: 0; }
                }
                @keyframes stream-in-4 {
                    from { transform: translate(0, 0); opacity: 1; }
                    to { transform: translate(-80px, -80px); opacity: 0; }
                }
                @keyframes draw-line {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes pop-node {
                    0% { r: 0; }
                    70% { r: 7; }
                    100% { r: 5; }
                }
                @keyframes fade-in {
                    to { opacity: 1; }
                }
                .anim-line {
                    stroke-dasharray: 200;
                    stroke-dashoffset: 200;
                    animation: draw-line 1.5s ease-out forwards;
                }
                .anim-node {
                    animation: pop-node 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    fill: url(#nodeGradient);
                }
                .stream-particle {
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                }
                `}
            </style>
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                <defs>
                    <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" style={{ stopColor: "var(--color-primary-light, #5a3ff0)", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "var(--color-primary, #3713ec)", stopOpacity: 0.3 }} />
                    </radialGradient>
                    <radialGradient id="nodeGradient">
                        <stop offset="0%" style={{ stopColor: "#fff" }} />
                        <stop offset="100%" style={{ stopColor: "var(--color-primary-light, #5a3ff0)" }} />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* --- Particle Streams --- */}
                <g style={{ opacity: 0, animation: 'fade-in 1s ease forwards', animationDelay: '0.5s' }}>
                    <circle cx="20" cy="20" r="1.5" fill="#fff" className="stream-particle" style={{ animationName: 'stream-in-1', animationDuration: '3s' }} />
                    <circle cx="20" cy="20" r="1" fill="#fff" className="stream-particle" style={{ animationName: 'stream-in-1', animationDuration: '3.5s', animationDelay: '0.5s' }} />
                    <circle cx="170" cy="30" r="1.5" fill="#fff" className="stream-particle" style={{ animationName: 'stream-in-2', animationDuration: '3.2s' }} />
                    <circle cx="170" cy="30" r="1" fill="#fff" className="stream-particle" style={{ animationName: 'stream-in-2', animationDuration: '4s', animationDelay: '0.8s' }} />
                    <circle cx="30" cy="170" r="1.5" fill="#fff" className="stream-particle" style={{ animationName: 'stream-in-3', animationDuration: '3.3s' }} />
                    <circle cx="30" cy="170" r="1" fill="#fff" className="stream-particle" style={{ animationName: 'stream-in-3', animationDuration: '3.8s', animationDelay: '0.3s' }} />
                    <circle cx="180" cy="180" r="1.5" fill="#fff" className="stream-particle" style={{ animationName: 'stream-in-4', animationDuration: '3.1s' }} />
                    <circle cx="180" cy="180" r="1" fill="#fff" className="stream-particle" style={{ animationName: 'stream-in-4', animationDuration: '3.6s', animationDelay: '0.6s' }} />
                </g>

                {/* --- Central Core --- */}
                <circle cx="100" cy="100" r="15" fill="url(#coreGradient)" style={{ animation: 'pulse 4s ease-in-out infinite', filter: 'url(#glow)' }} />
                
                {/* --- Expanding Network --- */}
                <g style={{ opacity: 0, animation: 'fade-in 1s ease forwards', animationDelay: '1.5s' }}>
                    {/* Lines */}
                    <line x1="100" y1="100" x2="150" y2="70" stroke="url(#coreGradient)" strokeWidth="1" className="anim-line" style={{ animationDelay: '2s' }} />
                    <line x1="100" y1="100" x2="60" y2="50" stroke="url(#coreGradient)" strokeWidth="1" className="anim-line" style={{ animationDelay: '2.2s' }} />
                    <line x1="100" y1="100" x2="50" y2="140" stroke="url(#coreGradient)" strokeWidth="1" className="anim-line" style={{ animationDelay: '2.4s' }} />
                    <line x1="100" y1="100" x2="140" y2="150" stroke="url(#coreGradient)" strokeWidth="1" className="anim-line" style={{ animationDelay: '2.6s' }} />
                    <line x1="150" y1="70" x2="140" y2="150" stroke="url(#coreGradient)" strokeWidth="0.5" className="anim-line" style={{ animationDelay: '3s' }} />
                    <line x1="60" y1="50" x2="50" y2="140" stroke="url(#coreGradient)" strokeWidth="0.5" className="anim-line" style={{ animationDelay: '3.2s' }} />

                    {/* Nodes */}
                    <circle cx="150" cy="70" r="0" className="anim-node" style={{ animationDelay: '2.5s' }} />
                    <circle cx="60" cy="50" r="0" className="anim-node" style={{ animationDelay: '2.7s' }} />
                    <circle cx="50" cy="140" r="0" className="anim-node" style={{ animationDelay: '2.9s' }} />
                    <circle cx="140" cy="150" r="0" className="anim-node" style={{ animationDelay: '3.1s' }} />
                </g>
            </svg>
        </div>
    );
};

export default AnimatedInfographic;
