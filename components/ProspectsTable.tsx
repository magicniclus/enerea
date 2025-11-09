'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Users, Mail, Phone, Building, Search, Filter, X, Edit, Eye } from 'lucide-react';
import ProspectDrawer from '@/components/ProspectDrawer';

interface Prospect {
  id: string;
  createdAt?: any;
  updatedAt?: any;
  status: 'draft' | 'nouveau' | 'contacte' | 'converti' | 'perdu';
  source?: string;
  currentStep?: number;
  completionRate?: number;
  
  contact?: {
    civility?: 'M' | 'Mme';
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    contactName?: string;
  };
  
  company?: {
    sirenNumber?: string;
    name?: string;
    address?: string;
    employeeCount?: string;
    activityType?: 'electricite' | 'gaz' | 'dual';
  };
  
  energy?: {
    concurrenceReason?: string;
    electricityConsumption?: string;
    gasConsumption?: string;
    currentProvider?: string;
    contractType?: string;
    budgetRange?: string;
    greenEnergy?: boolean;
  };
  
  electricityMeters?: Array<{
    id: string;
    pdl?: string;
    noData: boolean;
    power?: string;
    serviceDate?: string;
  }>;
  
  gasMeters?: Array<{
    id: string;
    pce?: string;
    noData: boolean;
    consumptionRange?: string;
    serviceDate?: string;
  }>;
  
  documents?: {
    electricityBills?: Array<any>;
    gasBills?: Array<any>;
    otherDocuments?: Array<any>;
  };
  
  consents?: {
    dataProcessing?: boolean;
    commercialContact?: boolean;
    partnerSharing?: boolean;
    consentDate?: any;
    ipAddress?: string;
  };
}

export default function ProspectsTable() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [filteredProspects, setFilteredProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // États des filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');
  
  // États du drawer
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editedProspect, setEditedProspect] = useState<Prospect | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    try {
      setLoading(true);
      const prospectsRef = collection(db, 'prospects');
      const q = query(prospectsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const prospectsData: Prospect[] = [];
      querySnapshot.forEach((doc) => {
        prospectsData.push({
          id: doc.id,
          ...doc.data()
        } as Prospect);
      });
      
      setProspects(prospectsData);
      setFilteredProspects(prospectsData);
    } catch (err: any) {
      console.error('Erreur lors de la récupération des prospects:', err);
      setError('Erreur lors du chargement des prospects');
    } finally {
      setLoading(false);
    }
  };

  // Effet pour filtrer les prospects
  useEffect(() => {
    let filtered = [...prospects];

    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(prospect => {
        // Support pour l'ancienne structure (contact.firstName) et la nouvelle (firstName direct)
        const firstName = prospect.contact?.firstName || (prospect as any).firstName || '';
        const lastName = prospect.contact?.lastName || (prospect as any).lastName || '';
        const fullName = `${firstName} ${lastName}`.toLowerCase();
        const email = (prospect.contact?.email || (prospect as any).email || '').toLowerCase();
        const company = (prospect.company?.name || (prospect as any).companyName || '').toLowerCase();
        const search = searchTerm.toLowerCase();
        
        return fullName.includes(search) || 
               email.includes(search) || 
               company.includes(search);
      });
    }

    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(prospect => 
        (prospect.status || 'nouveau') === statusFilter
      );
    }

    // Filtre par type d'activité
    if (activityTypeFilter !== 'all') {
      filtered = filtered.filter(prospect => {
        const activityType = prospect.company?.activityType || (prospect as any).energyType;
        // Mapper les nouveaux types vers les anciens
        const mappedType = activityType === 'electricity' ? 'electricite' : 
                          activityType === 'gas' ? 'gaz' : 
                          activityType === 'both' ? 'dual' : activityType;
        return mappedType === activityTypeFilter;
      });
    }

    setFilteredProspects(filtered);
  }, [prospects, searchTerm, statusFilter, activityTypeFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setActivityTypeFilter('all');
  };

  // Fonctions pour le drawer
  const openDrawer = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setEditedProspect({ ...prospect });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProspect(null);
    setEditedProspect(null);
  };

  const updateEditedProspect = (field: string, value: any) => {
    if (!editedProspect) return;
    
    const fieldParts = field.split('.');
    if (fieldParts.length === 2) {
      const [section, key] = fieldParts;
      setEditedProspect(prev => ({
        ...prev!,
        [section]: {
          ...prev![section as keyof Prospect] as any,
          [key]: value
        }
      }));
    } else {
      setEditedProspect(prev => ({
        ...prev!,
        [field]: value
      }));
    }
  };

  const saveProspectChanges = async () => {
    if (!editedProspect || !selectedProspect) return;
    
    try {
      setIsSaving(true);
      
      // Ici vous pouvez ajouter la logique pour sauvegarder dans Firebase
      // await updateDoc(doc(db, 'prospects', editedProspect.id), editedProspect);
      
      // Mettre à jour la liste locale
      setProspects(prev => 
        prev.map(p => p.id === editedProspect.id ? editedProspect : p)
      );
      
      closeDrawer();
      console.log('Prospect mis à jour:', editedProspect);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Non disponible';
    
    try {
      let date;
      if (timestamp.toDate) {
        date = timestamp.toDate();
      } else if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      } else {
        date = new Date(timestamp);
      }
      
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Date invalide';
    }
  };

  const getActivityTypeBadge = (activityType: string) => {
    // Mapper les nouveaux types vers l'affichage
    const mappedType = activityType === 'electricity' ? 'electricite' : 
                      activityType === 'gas' ? 'gaz' : 
                      activityType === 'both' ? 'dual' : activityType;
    
    switch (mappedType) {
      case 'electricite':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">⚡ Électricité</Badge>;
      case 'gaz':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">🔥 Gaz</Badge>;
      case 'dual':
        return <Badge variant="default" className="bg-green-100 text-green-800">⚡+🔥 Les deux</Badge>;
      default:
        return <Badge variant="secondary">Non défini</Badge>;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'nouveau':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Nouveau</Badge>;
      case 'contacte':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">Contacté</Badge>;
      case 'converti':
        return <Badge variant="default" className="bg-green-100 text-green-800">Converti</Badge>;
      default:
        return <Badge variant="secondary">Nouveau</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Chargement des prospects...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-red-600 font-medium">{error}</p>
            <button 
              onClick={fetchProspects}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle>Prospects</CardTitle>
              <CardDescription>
                {filteredProspects.length} prospect{filteredProspects.length > 1 ? 's' : ''} 
                {prospects.length !== filteredProspects.length && ` sur ${prospects.length} total${prospects.length > 1 ? 's' : ''}`}
              </CardDescription>
            </div>
          </div>
          <Button 
            onClick={fetchProspects}
            variant="outline"
            size="sm"
          >
            Actualiser
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {prospects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Encore aucun prospect</p>
          </div>
        ) : (
          <>
            {/* Filtres */}
            <div className="mb-6 space-y-4">
              {/* Barre de recherche - Toujours en pleine largeur */}
              <div className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par nom, email ou entreprise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {/* Filtres et bouton d'effacement - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="nouveau">Nouveau</SelectItem>
                    <SelectItem value="contacte">Contacté</SelectItem>
                    <SelectItem value="converti">Converti</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={activityTypeFilter} onValueChange={setActivityTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Type d'énergie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="electricite">Électricité</SelectItem>
                    <SelectItem value="gaz">Gaz</SelectItem>
                    <SelectItem value="dual">Dual</SelectItem>
                  </SelectContent>
                </Select>
                
                {(searchTerm || statusFilter !== 'all' || activityTypeFilter !== 'all') && (
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center space-x-1 w-full sm:w-auto"
                  >
                    <X className="h-4 w-4" />
                    <span>Effacer</span>
                  </Button>
                )}
              </div>
            </div>

            {filteredProspects.length === 0 ? (
              <div className="text-center py-8">
                <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucun prospect ne correspond aux filtres</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  Effacer les filtres
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    Liste des prospects récents - Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Contact</TableHead>
                      <TableHead className="hidden sm:table-cell">Entreprise</TableHead>
                      <TableHead className="hidden md:table-cell">Type d'énergie</TableHead>
                      <TableHead className="hidden lg:table-cell">Employés</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProspects.map((prospect, index) => (
                      <TableRow 
                        key={prospect.id} 
                        className={`hover:bg-blue-50 transition-colors ${
                          index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                        }`}
                      >
                        <TableCell className="font-medium">
                          <div className="flex flex-col space-y-1">
                            <div className="font-semibold text-gray-900">
                              {/* Support pour les deux structures de données */}
                              {(() => {
                                const firstName = prospect.contact?.firstName || (prospect as any).firstName;
                                const lastName = prospect.contact?.lastName || (prospect as any).lastName;
                                return firstName && lastName 
                                  ? `${firstName} ${lastName}`
                                  : 'Nom non renseigné';
                              })()}
                            </div>
                            {(() => {
                              const email = prospect.contact?.email || (prospect as any).email;
                              return email && (
                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate">{email}</span>
                                </div>
                              );
                            })()}
                            {(() => {
                              const phone = prospect.contact?.phone || (prospect as any).phone;
                              return phone && (
                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                  <Phone className="h-3 w-3" />
                                  <span>{phone}</span>
                                </div>
                              );
                            })()}
                            {/* Afficher l'entreprise sur mobile quand la colonne est cachée */}
                            <div className="sm:hidden text-xs text-gray-500 flex items-center space-x-1">
                              <Building className="h-3 w-3" />
                              <span>{prospect.company?.name || (prospect as any).companyName || 'Non renseigné'}</span>
                            </div>
                            {/* Afficher la source si c'est le nouveau formulaire */}
                            {(prospect as any).source === 'comparateur-optimise' && (
                              <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-flex items-center w-fit">
                                ✨ Nouveau formulaire
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span>{prospect.company?.name || (prospect as any).companyName || 'Non renseigné'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {getActivityTypeBadge(prospect.company?.activityType || (prospect as any).energyType || '')}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-gray-600">
                            {prospect.company?.employeeCount || 'Non renseigné'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col space-y-1">
                            {getStatusBadge(prospect.status)}
                            {/* Afficher le type d'énergie sur mobile/tablette quand la colonne est cachée */}
                            <div className="md:hidden">
                              {getActivityTypeBadge(prospect.company?.activityType || (prospect as any).energyType || '')}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="text-sm text-gray-600">
                            {formatDate(prospect.createdAt)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDrawer(prospect)}
                              className="text-blue-600 hover:text-blue-800 p-2"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="hidden sm:ml-1 sm:inline">Voir</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDrawer(prospect)}
                              className="text-green-600 hover:text-green-800 p-2"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="hidden sm:ml-1 sm:inline">Modifier</span>
                            </Button>
                          </div>
                        </TableCell>
                  </TableRow>
                ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      {/* Drawer pour afficher/modifier le prospect */}
      <ProspectDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        prospect={selectedProspect}
        editedProspect={editedProspect}
        updateEditedProspect={updateEditedProspect}
        onSave={saveProspectChanges}
        isSaving={isSaving}
      />
    </Card>
  );
}
