# 🔐 Authentification Firebase ENEREA

## 📋 Configuration

### Variables d'environnement (.env.local)
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCQPVrLkMteEsWfCJreFsCZDolQ-2XGta4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=enerea-44231.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://enerea-44231.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=enerea-44231
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=enerea-44231.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=57392948827
NEXT_PUBLIC_FIREBASE_APP_ID=1:57392948827:web:b1839fd90cbe7c6f0b017e
```

## 🚀 Fonctionnalités Implémentées

### ✅ Authentification
- **Connexion** avec email/mot de passe
- **Inscription** avec validation complète
- **Mot de passe oublié** avec envoi d'email
- **Déconnexion** sécurisée

### ✅ Protection des Routes
- **Routes publiques** : `/`, `/connexion`, `/inscription`, `/comparaison`
- **Routes protégées** : `/dashboard` (nécessite connexion)
- **Redirection automatique** selon l'état de connexion

### ✅ Gestion d'État
- **Contexte global** pour l'authentification
- **Loading states** pendant les vérifications
- **Gestion d'erreurs** avec messages personnalisés
- **Persistance** de la session utilisateur

## 📁 Structure des Fichiers

```
├── lib/
│   └── firebase.ts              # Configuration Firebase
├── contexts/
│   └── AuthContext.tsx          # Contexte d'authentification
├── components/
│   ├── ProtectedRoute.tsx       # Protection routes privées
│   ├── PublicRoute.tsx          # Redirection utilisateurs connectés
│   ├── UserProfile.tsx          # Profil utilisateur
│   ├── Toast.tsx                # Notifications
│   └── FirebaseTest.tsx         # Test de connexion Firebase
├── hooks/
│   └── useAuthRedirect.ts       # Hook de redirection
├── app/
│   ├── connexion/page.tsx       # Page de connexion
│   ├── inscription/page.tsx     # Page d'inscription
│   ├── mot-de-passe-oublie/page.tsx # Réinitialisation
│   └── dashboard/page.tsx       # Tableau de bord protégé
└── middleware.ts                # Middleware Next.js
```

## 🔄 Flux d'Authentification

### 1. Connexion
```typescript
const { signIn } = useAuth();
await signIn(email, password);
// Redirection automatique vers /dashboard
```

### 2. Inscription
```typescript
const { signUp } = useAuth();
await signUp(email, password, displayName);
// Redirection automatique vers /dashboard
```

### 3. Mot de passe oublié
```typescript
const { resetPassword } = useAuth();
await resetPassword(email);
// Email envoyé automatiquement
```

### 4. Déconnexion
```typescript
const { logout } = useAuth();
await logout();
// Redirection automatique vers /connexion
```

## 🛡️ Sécurité

### Protection des Routes
- **Middleware Next.js** pour la protection côté serveur
- **Composants ProtectedRoute** pour la protection côté client
- **Vérification continue** de l'état d'authentification

### Gestion des Erreurs
- **Messages personnalisés** en français
- **Validation côté client** avant envoi
- **Gestion des erreurs Firebase** avec traduction

## 📱 UX/UI

### États de Chargement
- **Spinners** pendant les opérations
- **Boutons désactivés** pendant le traitement
- **Messages de statut** en temps réel

### Notifications
- **Toasts** pour les succès/erreurs
- **Messages contextuels** selon l'action
- **Auto-dismiss** après 5 secondes

### Responsive Design
- **Mobile-first** approach
- **Formulaires adaptatifs**
- **Navigation optimisée**

## 🧪 Tests

### Vérification Firebase
Le composant `FirebaseTest` affiche en bas à gauche :
- ✅ **Vert** : Firebase connecté
- ❌ **Rouge** : Erreur de connexion
- 🔄 **Jaune** : Test en cours

### Test Manuel
1. **Inscription** : Créer un compte avec email/mot de passe
2. **Connexion** : Se connecter avec les identifiants
3. **Dashboard** : Vérifier l'accès au tableau de bord
4. **Déconnexion** : Se déconnecter et vérifier la redirection
5. **Protection** : Tenter d'accéder à `/dashboard` sans connexion

## 🔧 Développement

### Commandes Utiles
```bash
# Installer les dépendances
npm install firebase

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build
```

### Debug
- **Console Firebase** : https://console.firebase.google.com
- **Logs d'authentification** dans la console navigateur
- **Network tab** pour vérifier les requêtes Firebase

## 📊 Monitoring

### Métriques Firebase
- **Utilisateurs actifs** dans la console Firebase
- **Tentatives de connexion** (succès/échecs)
- **Utilisation de l'authentification**

### Analytics
- **Événements personnalisés** pour le tracking
- **Conversion** inscription → connexion
- **Temps de session** utilisateur

## 🚨 Troubleshooting

### Erreurs Communes
1. **"Firebase not initialized"** → Vérifier les variables d'environnement
2. **"Invalid API key"** → Régénérer la clé dans la console Firebase
3. **"Auth domain mismatch"** → Vérifier le domaine autorisé
4. **"Network error"** → Vérifier la connexion internet

### Solutions
- **Vider le cache** navigateur
- **Vérifier la configuration** Firebase
- **Consulter les logs** de la console
- **Tester en navigation privée**

## 🔄 Prochaines Étapes

### Améliorations Possibles
- [ ] **Vérification email** obligatoire
- [ ] **Authentification 2FA**
- [ ] **OAuth** (Google, LinkedIn)
- [ ] **Profil utilisateur** étendu
- [ ] **Gestion des rôles** (admin, user)
- [ ] **Historique des connexions**

### Intégrations
- [ ] **SendGrid** pour les emails personnalisés
- [ ] **Analytics** avancées
- [ ] **Monitoring** d'erreurs (Sentry)
- [ ] **Base de données** Firestore pour les profils
