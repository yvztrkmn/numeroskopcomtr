
import React from 'react';

interface ShimmerProps {
  className?: string;
}

const Shimmer: React.FC<ShimmerProps> = ({ className = 'h-5' }) => {
  return (
    <div className={`bg-input-dark rounded-md overflow-hidden ${className}`}>
      <div className="animate-pulse w-full h-full bg-gradient-to-r from-transparent via-card-dark to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Shimmer;