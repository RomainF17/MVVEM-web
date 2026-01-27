# Ma Ville Verte et Moi - CMS

Site web avec CMS éditorial intégré, hébergé 100% sur Cloudflare.

## 🏗️ Architecture

| Composant | Technologie |
|-----------|-------------|
| Frontend | Cloudflare Pages (Vite + React) |
| Backend API | Cloudflare Workers (Pages Functions) |
| Base de données | Cloudflare D1 (SQLite) |
| Stockage images | Cloudflare R2 |
| Authentification | Cloudflare Access |

## 📂 Structure du projet

```
/
├── public/                  # Assets statiques
├── src/
│   ├── components/          # Composants site public
│   ├── admin/               # Interface administration
│   │   ├── components/      # Composants admin
│   │   ├── AdminApp.tsx     # App principale admin
│   │   ├── api.ts           # Client API
│   │   ├── types.ts         # Types TypeScript
│   │   └── index.tsx        # Point d'entrée admin
│   ├── App.tsx              # App principale publique
│   └── main.tsx             # Point d'entrée public
├── functions/               # Cloudflare Workers (API)
│   ├── api/
│   │   ├── articles.ts      # CRUD articles
│   │   └── upload.ts        # Upload images
│   ├── images/
│   │   └── [[path]].ts      # Serveur d'images R2
│   └── tsconfig.json
├── db/
│   └── schema.sql           # Schéma D1
├── admin.html               # Page HTML admin
├── index.html               # Page HTML publique
├── wrangler.toml            # Configuration Cloudflare
└── vite.config.ts           # Configuration Vite
```

## 🚀 Déploiement

### Prérequis

- Compte Cloudflare (gratuit)
- Node.js 18+
- Wrangler CLI : `npm install -g wrangler`

### Étape 1 : Connexion Cloudflare

```bash
wrangler login
```

### Étape 2 : Créer la base D1

```bash
wrangler d1 create mvvem-db
```

Copiez l'ID de la base et mettez à jour `wrangler.toml` :

```toml
[[d1_databases]]
binding = "DB"
database_name = "mvvem-db"
database_id = "VOTRE_ID_ICI"
```

### Étape 3 : Initialiser le schéma

```bash
wrangler d1 execute mvvem-db --file=./db/schema.sql
```

### Étape 4 : Créer le bucket R2

```bash
wrangler r2 bucket create mvvem-images
```

### Étape 5 : Déployer

```bash
npm install
npm run build
wrangler pages deploy dist
```

### Étape 6 : Configurer Cloudflare Access (sécurité admin)

1. Allez dans **Cloudflare Dashboard** → **Zero Trust** → **Access** → **Applications**
2. Créez une nouvelle application :
   - **Type** : Self-hosted
   - **Nom** : MVVEM Admin
   - **Domaine** : `votre-site.pages.dev`
   - **Chemin** : `/admin*` et `/api/admin/*`
3. Configurez une politique d'accès :
   - **Nom** : Rédacteurs
   - **Action** : Allow
   - **Include** : Emails se terminant par `@votredomaine.com` (ou emails spécifiques)

## 🗄️ Base de données

### Schéma `articles`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | TEXT | Identifiant unique (PK) |
| `title` | TEXT | Titre (requis) |
| `summary` | TEXT | Résumé court |
| `category` | TEXT | Catégorie |
| `tags` | TEXT | Tags (JSON array) |
| `coverImageUrl` | TEXT | URL image de couverture |
| `contentMarkdown` | TEXT | Contenu en Markdown |
| `status` | TEXT | `draft` ou `published` |
| `authorEmail` | TEXT | Email de l'auteur |
| `publishedAt` | TEXT | Date de publication (ISO-8601) |
| `updatedAt` | TEXT | Dernière modification (ISO-8601) |

## 🔌 API

### Endpoints publics (lecture seule)

```http
GET /api/articles
```
Liste les articles publiés. Cache HTTP activé (60s).

```http
GET /api/articles/:id
```
Récupère un article publié par son ID.

### Endpoints admin (protégés par Cloudflare Access)

```http
GET /api/admin/articles
```
Liste tous les articles (brouillons inclus).

```http
GET /api/admin/articles/:id
```
Récupère un article par son ID.

```http
POST /api/admin/articles
Content-Type: application/json

{
  "title": "Mon article",
  "summary": "Résumé...",
  "category": "Actualités",
  "tags": ["écologie", "ville"],
  "contentMarkdown": "# Contenu...",
  "status": "draft"
}
```
Crée un nouvel article.

```http
PUT /api/admin/articles/:id
Content-Type: application/json

{
  "title": "Titre modifié",
  "status": "published"
}
```
Met à jour un article. Passer `status: "published"` pour publier.

```http
DELETE /api/admin/articles/:id
```
Supprime un article.

```http
POST /api/upload
Content-Type: multipart/form-data

file: [image]
```
Upload une image vers R2. Retourne `{ url: "/images/..." }`.

## 🖥️ Développement local

```bash
npm install
npm run dev
```

Le site public sera sur `http://localhost:5173` et l'admin sur `http://localhost:5173/admin.html`.

Pour tester l'API localement avec D1 :

```bash
wrangler pages dev dist --d1=DB
```

## ✅ Checklist de déploiement

- [ ] Base D1 créée et ID mis à jour dans `wrangler.toml`
- [ ] Schéma SQL exécuté
- [ ] Bucket R2 créé
- [ ] Site déployé sur Cloudflare Pages
- [ ] Cloudflare Access configuré pour `/admin*` et `/api/admin/*`
- [ ] Rédacteurs autorisés ajoutés dans Access

## 🔐 Sécurité

- L'interface `/admin` et les endpoints `/api/admin/*` sont protégés par Cloudflare Access
- Seuls les utilisateurs autorisés peuvent accéder à l'administration
- L'API publique ne retourne que les articles publiés
- Les images sont validées (type et taille) avant upload

## 📱 Intégration mobile (future)

L'API publique est prête pour une intégration iOS/Android :

```swift
// Exemple iOS
let url = URL(string: "https://votre-site.pages.dev/api/articles")!
let (data, _) = try await URLSession.shared.data(from: url)
let articles = try JSONDecoder().decode([Article].self, from: data)
```

## 💰 Coûts

**Gratuit** dans les limites du plan Free de Cloudflare :
- Pages : illimité
- Workers : 100 000 requêtes/jour
- D1 : 5 Go stockage, 5M lectures/jour
- R2 : 10 Go stockage, 10M requêtes/mois
