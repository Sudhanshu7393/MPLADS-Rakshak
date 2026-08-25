import React from 'react';

export default function OfficialEmblem({ size = 38, className = "" }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`} 
      style={{ width: size, height: size }}
      title="MPLADS RAKSHAK • Ministry of Statistics & Programme Implementation (MoSPI)"
    >
      <img 
        src="/mplads_rakshak_logo.png" 
        alt="MPLADS RAKSHAK Emblem" 
        className="w-full h-full object-contain drop-shadow-md rounded-lg"
      />
    </div>
  );
}
