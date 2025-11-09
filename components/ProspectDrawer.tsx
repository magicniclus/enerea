'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Loader2, Save, Download, FileText, Zap, Mail, Building, 
  User, Activity, CheckCircle, AlertCircle, XCircle, Clock
} from 'lucide-react';

interface ProspectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prospect: any;
  editedProspect: any;
  updateEditedProspect: (field: string, value: any) => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function ProspectDrawer({
  isOpen, onClose, prospect, editedProspect, updateEditedProspect, onSave, isSaving
}: ProspectDrawerProps) {
  
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Non disponible';
    try {
      let date;
      if (timestamp.toDate) date = timestamp.toDate();
      else if (timestamp.seconds) date = new Date(timestamp.seconds * 1000);
      else date = new Date(timestamp);
      
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (error) {
      return 'Date invalide';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'nouveau': return <Badge className="bg-blue-100 text-blue-800">Nouveau</Badge>;
      case 'contacte': return <Badge className="bg-orange-100 text-orange-800">Contacté</Badge>;
      case 'converti': return <Badge className="bg-green-100 text-green-800">Converti</Badge>;
      case 'perdu': return <Badge className="bg-red-100 text-red-800">Perdu</Badge>;
      default: return <Badge variant="secondary">Brouillon</Badge>;
    }
  };

  const hasDocuments = () => {
    return (editedProspect?.documents?.electricityBills?.length > 0) ||
           (editedProspect?.documents?.gasBills?.length > 0) ||
           (editedProspect?.documents?.otherDocuments?.length > 0);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[98vw] sm:w-[1500px] max-w-[1700px] overflow-y-auto p-0">
        <div className="p-10">
          {/* Header */}
          <SheetHeader className="mb-10">
            <div className="space-y-6">
              <SheetTitle className="text-3xl font-bold flex items-center gap-4">
                <User className="h-8 w-8 text-blue-600" />
                {(() => {
                  const firstName = prospect?.contact?.firstName || prospect?.firstName;
                  const lastName = prospect?.contact?.lastName || prospect?.lastName;
                  return firstName && lastName
                    ? `${firstName} ${lastName}`
                    : 'Prospect sans nom';
                })()}
              </SheetTitle>
              
              <SheetDescription className="text-lg flex items-center gap-4">
                <span>Visualisez et modifiez les informations du prospect</span>
                {getStatusBadge(editedProspect?.status || 'draft')}
              </SheetDescription>
              
              <div className="text-sm text-gray-500 space-y-2 pt-4 border-t border-gray-200">
                <div><strong>ID:</strong> {prospect?.id}</div>
                <div><strong>Créé le:</strong> {formatDate(prospect?.createdAt)}</div>
                {prospect?.updatedAt && (
                  <div><strong>Modifié le:</strong> {formatDate(prospect?.updatedAt)}</div>
                )}
                {prospect?.source && (
                  <div><strong>Source:</strong> {prospect.source === 'comparateur-optimise' ? '✨ Nouveau formulaire optimisé' : prospect.source}</div>
                )}
              </div>
            </div>
          </SheetHeader>

          {editedProspect && (
            <div className="space-y-10">
              
              {/* Contact */}
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Mail className="h-6 w-6 text-blue-600" />
                    Informations de contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">Prénom</Label>
                    <Input
                      id="firstName"
                      className="mt-2"
                      value={editedProspect.contact?.firstName || editedProspect.firstName || ''}
                      onChange={(e) => {
                        if (editedProspect.contact) {
                          updateEditedProspect('contact.firstName', e.target.value);
                        } else {
                          updateEditedProspect('firstName', e.target.value);
                        }
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">Nom</Label>
                    <Input
                      id="lastName"
                      className="mt-2"
                      value={editedProspect.contact?.lastName || editedProspect.lastName || ''}
                      onChange={(e) => {
                        if (editedProspect.contact) {
                          updateEditedProspect('contact.lastName', e.target.value);
                        } else {
                          updateEditedProspect('lastName', e.target.value);
                        }
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-2"
                      value={editedProspect.contact?.email || editedProspect.email || ''}
                      onChange={(e) => {
                        if (editedProspect.contact) {
                          updateEditedProspect('contact.email', e.target.value);
                        } else {
                          updateEditedProspect('email', e.target.value);
                        }
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                    <Input
                      id="phone"
                      className="mt-2"
                      value={editedProspect.contact?.phone || editedProspect.phone || ''}
                      onChange={(e) => {
                        if (editedProspect.contact) {
                          updateEditedProspect('contact.phone', e.target.value);
                        } else {
                          updateEditedProspect('phone', e.target.value);
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Entreprise */}
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Building className="h-6 w-6 text-green-600" />
                    Informations entreprise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium">Nom de l'entreprise</Label>
                    <Input
                      id="companyName"
                      className="mt-2"
                      value={editedProspect.company?.name || editedProspect.companyName || ''}
                      onChange={(e) => {
                        if (editedProspect.company) {
                          updateEditedProspect('company.name', e.target.value);
                        } else {
                          updateEditedProspect('companyName', e.target.value);
                        }
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sirenNumber" className="text-sm font-medium">Numéro SIREN</Label>
                    <Input
                      id="sirenNumber"
                      className="mt-2"
                      value={editedProspect.company?.sirenNumber || editedProspect.sirenNumber || ''}
                      onChange={(e) => {
                        if (editedProspect.company) {
                          updateEditedProspect('company.sirenNumber', e.target.value);
                        } else {
                          updateEditedProspect('sirenNumber', e.target.value);
                        }
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="activityType" className="text-sm font-medium">Type d'énergie</Label>
                    <Select 
                      value={(() => {
                        const activityType = editedProspect.company?.activityType || editedProspect.energyType;
                        // Mapper les nouveaux types vers les anciens pour l'affichage
                        return activityType === 'electricity' ? 'electricite' : 
                               activityType === 'gas' ? 'gaz' : 
                               activityType === 'both' ? 'dual' : activityType || '';
                      })()} 
                      onValueChange={(value) => {
                        if (editedProspect.company) {
                          updateEditedProspect('company.activityType', value);
                        } else {
                          // Mapper vers le nouveau format
                          const newValue = value === 'electricite' ? 'electricity' : 
                                          value === 'gaz' ? 'gas' : 
                                          value === 'dual' ? 'both' : value;
                          updateEditedProspect('energyType', newValue);
                        }
                      }}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electricite">⚡ Électricité</SelectItem>
                        <SelectItem value="gaz">🔥 Gaz</SelectItem>
                        <SelectItem value="dual">⚡+🔥 Les deux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium">Adresse</Label>
                    <Input
                      id="address"
                      className="mt-2"
                      value={editedProspect.company?.address || ''}
                      onChange={(e) => updateEditedProspect('company.address', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Besoins énergétiques */}
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Zap className="h-6 w-6 text-yellow-600" />
                    Besoins énergétiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="concurrenceReason" className="text-sm font-medium">Raison de la mise en concurrence</Label>
                    <Input
                      id="concurrenceReason"
                      className="mt-2"
                      value={editedProspect.energy?.concurrenceReason || ''}
                      onChange={(e) => updateEditedProspect('energy.concurrenceReason', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currentProvider" className="text-sm font-medium">Fournisseur actuel</Label>
                    <Input
                      id="currentProvider"
                      className="mt-2"
                      value={editedProspect.energy?.currentProvider || ''}
                      onChange={(e) => updateEditedProspect('energy.currentProvider', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contractType" className="text-sm font-medium">Type de contrat</Label>
                    <Input
                      id="contractType"
                      className="mt-2"
                      value={editedProspect.energy?.contractType || ''}
                      onChange={(e) => updateEditedProspect('energy.contractType', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Statut */}
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Activity className="h-6 w-6 text-purple-600" />
                    Statut et progression
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="status" className="text-sm font-medium">Statut du prospect</Label>
                    <Select 
                      value={editedProspect.status || 'nouveau'} 
                      onValueChange={(value) => updateEditedProspect('status', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="nouveau">Nouveau</SelectItem>
                        <SelectItem value="contacte">Contacté</SelectItem>
                        <SelectItem value="converti">Converti</SelectItem>
                        <SelectItem value="perdu">Perdu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Source</Label>
                    <div className="p-3 bg-gray-50 rounded-md text-sm mt-2">
                      {editedProspect.source || 'Non renseigné'}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Étape actuelle</Label>
                    <div className="p-3 bg-gray-50 rounded-md text-sm mt-2">
                      {editedProspect.currentStep || 1} / 6
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Taux de completion</Label>
                    <div className="p-3 bg-gray-50 rounded-md text-sm mt-2">
                      {editedProspect.completionRate || 0}%
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Informations spécifiques au nouveau formulaire */}
              {editedProspect.source === 'comparateur-optimise' && (
                <Card>
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Zap className="h-6 w-6 text-purple-600" />
                      Informations du nouveau formulaire ✨
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium">Situation</Label>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          {editedProspect.situation === 'compare_current' ? '🔄 Comparer le fournisseur actuel' :
                           editedProspect.situation === 'new_location' ? '🏢 Nouveau local' :
                           editedProspect.situation === 'new_site' ? '🆕 Nouveau site (compteur neuf)' :
                           editedProspect.situation || 'Non spécifié'}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Besoin d'aide pour l'estimation</Label>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          {editedProspect.needHelp ? '✅ Oui, aide demandée' : '❌ Non, facture fournie'}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Consentement donné</Label>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          {editedProspect.consentGiven ? '✅ Oui' : '❌ Non'}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Facture téléversée</Label>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          {editedProspect.hasInvoice ? '📄 Oui' : '❌ Non'}
                        </div>
                      </div>
                    </div>

                    {/* Fichiers téléversés du nouveau formulaire */}
                    {editedProspect.uploadedFiles && editedProspect.uploadedFiles.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Fichiers téléversés</Label>
                        <div className="space-y-3 mt-3">
                          {editedProspect.uploadedFiles.map((file: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium">{file.name}</span>
                              </div>
                              {file.url && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => window.open(file.url, '_blank')}
                                  className="ml-4"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Voir
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Documents */}
              {hasDocuments() && (
                <Card>
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <FileText className="h-6 w-6 text-orange-600" />
                      Documents téléchargés
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {editedProspect.documents?.otherDocuments?.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium">Documents</Label>
                        <div className="space-y-4 mt-3">
                          {editedProspect.documents.otherDocuments.map((doc: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                              <span className="text-sm font-medium">{doc.fileName}</span>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => window.open(doc.fileUrl, '_blank')}
                                className="ml-4"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Consentements */}
              {editedProspect.consents && (
                <Card>
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      Consentements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Traitement des données</span>
                      <Badge variant={editedProspect.consents.dataProcessing ? "default" : "secondary"}>
                        {editedProspect.consents.dataProcessing ? "✓ Accepté" : "✗ Refusé"}
                      </Badge>
                    </div>
                    {editedProspect.consents.consentDate && (
                      <div className="text-sm text-gray-500 mt-3">
                        <strong>Consentement donné le:</strong> {formatDate(editedProspect.consents.consentDate)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-6 pt-10 mt-10 border-t border-gray-200">
            <Button variant="outline" onClick={onClose} size="lg" className="px-8">
              Annuler
            </Button>
            <Button onClick={onSave} disabled={isSaving} size="lg" className="px-8">
              {isSaving ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
