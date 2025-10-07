import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon - Modern geometric design */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Background circle with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 rounded-2xl shadow-xl transform rotate-3"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-blue-700 rounded-2xl shadow-lg"></div>
        
        {/* Icon content */}
        <div className="relative w-full h-full flex items-center justify-center">
          <svg 
            viewBox="0 0 32 32" 
            className={`${iconSizeClasses[size]} text-white drop-shadow-sm`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stylized "E" with modern design */}
            <path 
              d="M8 6h14v3H12v4h8v3H12v4h10v3H8V6z" 
              fill="currentColor"
              className="text-white"
            />
            {/* Energy wave/bolt accent */}
            <path 
              d="M24 10c1.5 1 2.5 2.5 2.5 4.5s-1 3.5-2.5 4.5" 
              stroke="#FCD34D" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <path 
              d="M26 8c2 1.5 3.5 4 3.5 7s-1.5 5.5-3.5 7" 
              stroke="#FCD34D" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Small energy dots */}
            <circle cx="25" cy="12" r="1" fill="#FCD34D" opacity="0.8"/>
            <circle cx="27" cy="16" r="1.5" fill="#FCD34D"/>
            <circle cx="25" cy="20" r="1" fill="#FCD34D" opacity="0.8"/>
          </svg>
        </div>
      </div>
      
      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`font-black text-gray-800 ${textSizeClasses[size]} leading-none tracking-tight`}>
          ENEREA
        </span>
        <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase opacity-80">
          Energy
        </span>
      </div>
    </div>
  );
}
