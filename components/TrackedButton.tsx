'use client';

import React from 'react';
import { useTracking } from '@/hooks/useTracking';

interface TrackedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  trackingName: string;
  trackingLocation?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function TrackedButton({
  children,
  onClick,
  trackingName,
  trackingLocation,
  className = '',
  type = 'button',
  disabled = false
}: TrackedButtonProps) {
  const { trackButtonClick } = useTracking();

  const handleClick = () => {
    // Track the button click
    trackButtonClick(trackingName, trackingLocation);
    
    // Execute the original onClick if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}

// Exemple d'utilisation :
// <TrackedButton 
//   trackingName="demander_devis" 
//   trackingLocation="hero_section"
//   className="bg-blue-600 text-white px-6 py-3 rounded-lg"
//   onClick={() => router.push('/devis')}
// >
//   Demander un devis
// </TrackedButton>
