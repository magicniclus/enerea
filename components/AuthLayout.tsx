'use client';

import React from 'react';
import { useToast } from '@/components/Toast';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { ToastContainer } = useToast();

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default AuthLayout;
