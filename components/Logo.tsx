import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg`}>
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 text-white"
          fill="currentColor"
        >
          {/* Stylized "E" with energy bolt */}
          <path d="M3 4h12v2H5v5h8v2H5v5h10v2H3V4z"/>
          <path d="M16 8l3 4h-2l2 4-3-4h2l-2-4z" className="text-yellow-300"/>
        </svg>
      </div>
      
      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`font-bold text-gray-800 ${textSizeClasses[size]} leading-none`}>
          ENEREA
        </span>
        <span className="text-blue-600 text-xs font-medium tracking-wider uppercase">
          Energy
        </span>
      </div>
    </div>
  );
}
