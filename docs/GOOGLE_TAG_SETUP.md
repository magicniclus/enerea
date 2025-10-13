# 🎯 Installation Google Tag - Enerea

## ✅ Installation Réussie

La balise Google Analytics/Ads a été installée avec succès avec l'ID : **AW-16405496127**

### 📍 Emplacement de l'installation

La balise est installée dans le fichier `/app/layout.tsx` dans la section `<head>` :

```html
<!-- Google tag (gtag.js) - Installation manuelle -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-16405496127"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-16405496127');
</script>
```

### 🔧 Composants de tracking créés

1. **`/lib/gtag.ts`** - Fonctions de base pour le tracking
2. **`/hooks/useTracking.ts`** - Hook React pour faciliter l'utilisation
3. **`/components/Analytics.tsx`** - Tracking automatique des pages
4. **`/components/TrackedButton.tsx`** - Boutons avec tracking
5. **`/components/TrackedForm.tsx`** - Formulaires avec tracking
6. **`/components/GoogleTagTest.tsx`** - Composant de test (dev uniquement)

### 🧪 Vérification

Un composant de test apparaît en bas à droite de l'écran en mode développement pour vérifier :
- ✅ Chargement de la fonction `gtag`
- ✅ Existence du `dataLayer`
- 🔄 Test de conversion

### 📊 Conversions configurées

- **Demande de devis** : `devis_demande`
- **Souscription** : `souscription`
- **Contact** : `contact_form`

### 🚀 Utilisation

```tsx
// Tracking automatique d'un bouton
<TrackedButton trackingName="demander_devis" trackingLocation="hero">
  Demander un devis
</TrackedButton>

// Tracking d'un formulaire
<TrackedForm formType="devis" onSubmit={handleSubmit}>
  {/* Vos champs */}
</TrackedForm>

// Tracking manuel
import { conversions } from '@/lib/gtag';
conversions.demandeDevis(); // Déclenche une conversion
```

### ✅ Status

- ✅ **Balise installée** dans le `<head>`
- ✅ **Build réussi** sans erreurs
- ✅ **Types TypeScript** configurés
- ✅ **Système de tracking** complet
- ✅ **Composant de test** pour vérification

La balise Google est maintenant active et prête à capter toutes les conversions ! 🎉
