# Bacchanight

Application web (Node.js + Express) permettant de découvrir et **interagir avec des compositions SVG** inspirées d’œuvres (Odilon Redon), de **colorier/peindre** l’illustration puis de **sauvegarder** le rendu au format SVG et de le consulter dans une **galerie**.

## Prérequis
- Node.js (version récente recommandée)
- npm

## Installation
```bash
npm install
```

## Lancer le serveur
```bash
npm start
```

Par défaut, le serveur écoute sur le port **5000**.

Ouvre ensuite :
- http://localhost:5000

## Fonctionnalités principales

### 1) Accueil
- `GET /` : page d’accueil.

### 2) Tableaux / pages interactives
- `GET /bateau` : composition SVG “Barque mystique”
- `GET /sebastien` : composition SVG “Saint Sébastien”
- `GET /char` : composition SVG “Le Char d’Apollon”

### 3) Sauvegarde d’un dessin (SVG)
- `POST /save-svg`
  - Body JSON : `{ "svgContent": "<svg>...</svg>" }`
  - Réponse : `{ "success": true, "fileName": "..." }`

Les SVG sont enregistrés dans le dossier `saved/`.

### 4) Consulter un dessin sauvegardé
- `GET /view-bateau/:filename`
- `GET /view-sebastien/:filename`
- `GET /view-char/:filename`

### 5) Galerie
- `GET /gallery` : page galerie
- `GET /api/drawings` : liste JSON des dessins
- `GET /raw-svg/:filename` : SVG brut (utile pour miniatures)

## Structure du projet (simplifiée)
- `server.js` : serveur Express + routes
- `public/` : pages HTML, CSS, scripts, assets
- `saved/` : fichiers `.svg` sauvegardés

## Attention : sauvegardes supprimées au redémarrage
Au démarrage, le serveur **vide et recrée** le dossier `saved/`.
Donc toutes les sauvegardes précédentes seront perdues à chaque redémarrage.

## Licence
Non spécifiée.
