'use client';

import React from 'react';
import Logo from '../Logo';

export default function ComparisonHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Logo size="md" />
        </div>
      </div>
    </header>
  );
}
