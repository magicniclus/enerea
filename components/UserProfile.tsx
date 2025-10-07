'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Calendar, Shield } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const formatDate = (date: string | null | undefined) => {
    if (!date) return 'Non disponible';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {user.displayName || 'Utilisateur'}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Membre depuis</p>
            <p className="text-sm text-gray-600">
              {formatDate(user.metadata.creationTime)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Dernière connexion</p>
            <p className="text-sm text-gray-600">
              {formatDate(user.metadata.lastSignInTime)}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${user.emailVerified ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <p className="text-sm text-gray-600">
              Email {user.emailVerified ? 'vérifié' : 'non vérifié'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
