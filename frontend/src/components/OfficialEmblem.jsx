import React from 'react';

export default function OfficialEmblem({ size = 36, className = "" }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`} 
      style={{ width: size, height: size }}
      title="Emblem of India • Government of India (MoSPI)"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-xs"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Official Gold & Navy Medal Shield */}
        <circle cx="50" cy="50" r="48" fill="#0B2545" stroke="#D4AF37" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="44" fill="#0F172A" stroke="#FF9933" strokeWidth="1" strokeDasharray="3 2" />

        {/* Ashoka Lion Capital (Simha Stambha Crest) */}
        {/* Center Lion Head */}
        <path d="M46 22C46 19 54 19 54 22C56 20 60 23 58 26C56 28 58 31 54 32C53 34 47 34 46 32C42 31 44 28 42 26C40 23 44 20 46 22Z" fill="#F8FAFC" stroke="#D4AF37" strokeWidth="0.75" />
        {/* Center Lion Face details */}
        <circle cx="48" cy="24" r="0.8" fill="#0F172A" />
        <circle cx="52" cy="24" r="0.8" fill="#0F172A" />
        <path d="M49 26L50 27L51 26" stroke="#0F172A" strokeWidth="0.6" strokeLinecap="round" />
        <path d="M47 28C48.5 29 51.5 29 53 28" stroke="#0F172A" strokeWidth="0.6" strokeLinecap="round" />

        {/* Left Lion Head */}
        <path d="M37 25C37 22 43 23 44 26C45 28 42 31 40 33C38 34 34 32 34 29C34 27 35 25 37 25Z" fill="#E2E8F0" stroke="#D4AF37" strokeWidth="0.6" />
        <circle cx="38" cy="27" r="0.7" fill="#0F172A" />
        <path d="M36 30C38 31 40 31 41 30" stroke="#0F172A" strokeWidth="0.5" strokeLinecap="round" />

        {/* Right Lion Head */}
        <path d="M63 25C63 22 57 23 56 26C55 28 58 31 60 33C62 34 66 32 66 29C66 27 65 25 63 25Z" fill="#E2E8F0" stroke="#D4AF37" strokeWidth="0.6" />
        <circle cx="62" cy="27" r="0.7" fill="#0F172A" />
        <path d="M59 30C60 31 62 31 64 30" stroke="#0F172A" strokeWidth="0.5" strokeLinecap="round" />

        {/* Main Torso & Mane */}
        <path d="M42 32C40 35 39 42 41 48C43 51 57 51 59 48C61 42 60 35 58 32C55 33.5 45 33.5 42 32Z" fill="#F1F5F9" stroke="#D4AF37" strokeWidth="0.75" />
        {/* Chest lines */}
        <path d="M45 36C47 40 53 40 55 36" stroke="#94A3B8" strokeWidth="0.6" fill="none" />
        <path d="M44 41C47 45 53 45 56 41" stroke="#94A3B8" strokeWidth="0.6" fill="none" />
        <path d="M45 46C48 48 52 48 55 46" stroke="#94A3B8" strokeWidth="0.6" fill="none" />

        {/* Abacus Base Platform */}
        <rect x="30" y="52" width="40" height="7" rx="1.5" fill="#D4AF37" stroke="#B45309" strokeWidth="0.75" />

        {/* Central Ashoka Dharma Chakra on Abacus (24 spokes motif) */}
        <circle cx="50" cy="55.5" r="3.2" fill="#0B2545" stroke="#F8FAFC" strokeWidth="0.6" />
        <circle cx="50" cy="55.5" r="0.8" fill="#D4AF37" />
        {/* Spokes */}
        <path d="M50 52.5L50 58.5M47 55.5L53 55.5M47.8 53.3L52.2 57.7M47.8 57.7L52.2 53.3" stroke="#F8FAFC" strokeWidth="0.4" />

        {/* Galloping Horse (Left of Chakra) */}
        <path d="M36 54C34 54 33 56 35 57C37 57.5 38 56 37 54.5Z" fill="#0F172A" />

        {/* Bull (Right of Chakra) */}
        <path d="M64 54C66 54 67 56 65 57C63 57.5 62 56 63 54.5Z" fill="#0F172A" />

        {/* Lower Lotus Base */}
        <path d="M33 59C38 64 62 64 67 59C64 62 36 62 33 59Z" fill="#B45309" />

        {/* National Motto: SATYAMEVA JAYATE (सत्यमेव जयते) */}
        <text 
          x="50" 
          y="73" 
          textAnchor="middle" 
          fill="#D4AF37" 
          fontSize="5.2" 
          fontWeight="900" 
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.6"
        >
          सत्यमेव जयते
        </text>

        {/* MoSPI National Shield Text */}
        <text 
          x="50" 
          y="83" 
          textAnchor="middle" 
          fill="#38BDF8" 
          fontSize="4.5" 
          fontWeight="800" 
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.8"
        >
          GOVERNMENT OF INDIA
        </text>
      </svg>
    </div>
  );
}
