'use client';

import { useState, useEffect } from 'react';

interface UseExitIntentOptions {
  enabled?: boolean;
  delay?: number;
  sensitivity?: number;
}

export function useExitIntent({
  enabled = true,
  delay = 1000,
  sensitivity = 20
}: UseExitIntentOptions = {}) {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving from the top of the page
      if (e.clientY <= sensitivity) {
        timeoutId = setTimeout(() => {
          setShowExitIntent(true);
          setHasTriggered(true);
        }, delay);
      }
    };

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [enabled, delay, sensitivity, hasTriggered]);

  const closeExitIntent = () => {
    setShowExitIntent(false);
  };

  const resetExitIntent = () => {
    setHasTriggered(false);
    setShowExitIntent(false);
  };

  return {
    showExitIntent,
    closeExitIntent,
    resetExitIntent,
    hasTriggered
  };
}
