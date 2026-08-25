import React from 'react';

export default function OfficialEmblem({ size = 36, className = "" }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`} 
      style={{ width: size, height: size }}
      title="MPLADS RAKSHAK • Ministry of Statistics & Programme Implementation (MoSPI)"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-md"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Royal Shield Gradient */}
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="50%" stopColor="#133B5C" />
            <stop offset="100%" stopColor="#071B30" />
          </linearGradient>

          {/* Premium Metallic Gold Gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="40%" stopColor="#EAB308" />
            <stop offset="80%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>

          {/* High-Tech Blue Glow */}
          <linearGradient id="techGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>

        {/* 1. Outer Hexagonal Gov-Tech Security Shield */}
        <path 
          d="M50 4L88 18V48C88 72 50 94 50 94C50 94 12 72 12 48V18L50 4Z" 
          fill="url(#shieldGrad)" 
          stroke="url(#goldGrad)" 
          strokeWidth="2.5" 
        />

        {/* 2. Inner National Tricolor Accent Borders */}
        <path 
          d="M50 9L83 21.5V47C83 68 50 88 50 88C50 88 17 68 17 47V21.5L50 9Z" 
          fill="#0B192C" 
          stroke="rgba(255, 255, 255, 0.15)" 
          strokeWidth="1" 
        />

        {/* National Tricolor Top Accent Line */}
        <path d="M26 21L50 12L74 21" stroke="#FF9933" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 25L50 17.5L70 25" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M34 29L50 23L66 29" stroke="#138808" strokeWidth="2" strokeLinecap="round" />

        {/* 3. Central Ashoka Dharma Chakra (Clean Precision 24-Spoke Geometry) */}
        <g transform="translate(50, 52)">
          {/* Outer Gold Chakra Ring */}
          <circle cx="0" cy="0" r="18" fill="#0B2545" stroke="url(#goldGrad)" strokeWidth="2" />
          
          {/* Inner Navy Disc */}
          <circle cx="0" cy="0" r="15.5" fill="#08182B" stroke="#38BDF8" strokeWidth="0.75" />

          {/* Central Hub */}
          <circle cx="0" cy="0" r="3.5" fill="url(#goldGrad)" />
          <circle cx="0" cy="0" r="1.5" fill="#08182B" />

          {/* 24 Precision Spokes */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <line
                key={i}
                x1="0"
                y1="0"
                x2="0"
                y2="-15.5"
                stroke="url(#goldGrad)"
                strokeWidth="0.85"
                transform={`rotate(${angle})`}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* 4. AI Sentinel Nodes (Vigilance Intelligence Indicator) */}
        <circle cx="50" cy="80" r="2.5" fill="#10B981" />
        <circle cx="50" cy="80" r="4.5" stroke="#10B981" strokeWidth="0.75" strokeDasharray="2 1" />

        {/* 5. Clean National Devanagari Banner: सत्यमेव जयते */}
        <text 
          x="50" 
          y="37" 
          textAnchor="middle" 
          fill="#FDE047" 
          fontSize="4.8" 
          fontWeight="900" 
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.4"
        >
          सत्यमेव जयते
        </text>

        {/* 6. Sub-title: MoSPI RAKSHAK */}
        <text 
          x="50" 
          y="87" 
          textAnchor="middle" 
          fill="#94A3B8" 
          fontSize="3.8" 
          fontWeight="800" 
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
        >
          MoSPI • RAKSHAK
        </text>
      </svg>
    </div>
  );
}
