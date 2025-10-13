# 📊 Système de Tracking Google Analytics/Ads - Enerea

## Configuration

Le tracking Google Analytics/Ads est configuré avec l'ID : `AW-16405496127`

## Fonctionnalités

### 1. Tracking automatique des pages
- ✅ Toutes les pages sont automatiquement trackées
- ✅ Les paramètres URL sont inclus dans le tracking

### 2. Tracking des conversions
Les conversions suivantes sont configurées :
- **Demande de devis** : `devis_demande`
- **Souscription** : `souscription` 
- **Contact** : `contact_form`

### 3. Tracking des événements
- Clics sur boutons CTA
- Soumissions de formulaires
- Téléchargements de documents
- Clics sur téléphone/email

## Utilisation

### Hook useTracking
```tsx
import { useTracking } from '@/hooks/useTracking';

const MyComponent = () => {
  const { trackButtonClick, trackFormSubmission } = useTracking();
  
  const handleClick = () => {
    trackButtonClick('demander_devis', 'hero_section');
  };
  
  return <button onClick={handleClick}>Demander un devis</button>;
};
```

### Composant TrackedButton
```tsx
import TrackedButton from '@/components/TrackedButton';

<TrackedButton 
  trackingName="demander_devis" 
  trackingLocation="hero_section"
  onClick={() => router.push('/devis')}
>
  Demander un devis
</TrackedButton>
```

### Composant TrackedForm
```tsx
import TrackedForm from '@/components/TrackedForm';

<TrackedForm 
  formType="devis" 
  onSubmit={handleSubmit}
>
  <input type="email" />
  <button type="submit">Envoyer</button>
</TrackedForm>
```

### Tracking manuel
```tsx
import { conversions, event } from '@/lib/gtag';

// Conversion spécifique
conversions.demandeDevis();

// Événement personnalisé
event({
  action: 'video_play',
  category: 'engagement',
  label: 'homepage_hero_video'
});
```

## Conversions importantes à tracker

1. **Demande de devis énergétique**
   - Formulaire de contact pour devis
   - Téléchargement de simulateur

2. **Souscription à une offre**
   - Finalisation d'un contrat
   - Validation d'une souscription

3. **Engagement utilisateur**
   - Téléchargement de documents
   - Utilisation du comparateur
   - Consultation des offres

4. **Contact commercial**
   - Appel téléphonique
   - Email de contact
   - Demande de rappel

## Vérification

Pour vérifier que le tracking fonctionne :

1. **Google Analytics** : Temps réel > Événements
2. **Google Ads** : Outils > Conversions
3. **Console développeur** : `dataLayer` pour voir les événements

## Bonnes pratiques

- Utiliser des noms de tracking cohérents
- Inclure la localisation des éléments trackés
- Tracker les micro-conversions (engagement)
- Tester régulièrement les conversions importantes
