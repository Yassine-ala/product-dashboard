# Category Selector

Application Angular permettant d’afficher et sélectionner des catégories via deux modes d’affichage :
- regroupement par groupe de catégories
- affichage par ordre alphabétique

Le projet consomme les routes fournies par l’API Node du test technique.

---

## Lancement du projet

### Frontend

```bash
npm install
npm start
```

Le frontend est disponible sur :
`http://localhost:4200`

> `npm start` est utilisé à la place de `ng serve` afin de gérer le proxy vers l’API mockée.

---

### Mock API

```bash
cd mock-api
npm install
npm start
```

API disponible sur :
`http://localhost:3001`

---

## Stack technique

- Angular
- TypeScript
- SCSS
- Angular Signals pour le state local

---

## Architecture

L’application est organisée par feature afin de garder une structure claire et facilement maintenable.

Les composants sont volontairement découpés en composants UI simples et réutilisables :
- header
- toolbar
- liste
- section de groupe
- card
- footer

La page `CategorySelectorPage` centralise le state principal de l’écran.

---

## State management

Le state local est géré avec les Angular Signals (`signal`, `computed`, `effect`).

Le choix a été fait de conserver un state management simple basé sur les `input/output` Angular plutôt que d’introduire un store ou un service RxJS global, ce qui aurait été disproportionné pour le scope du projet.

La catégorie sélectionnée est centralisée au niveau de la page puis propagée aux composants enfants.

Un `effect` est utilisé afin de réinitialiser automatiquement la sélection lorsqu’une catégorie n’est plus visible après filtrage ou recherche.

---

## UI / Styling

Le styling est réalisé en SCSS avec une approche simple basée sur Flexbox et CSS Grid.

L’objectif était de rester fidèle aux maquettes tout en gardant un code lisible et facilement ajustable.

---

## Choix techniques

Quelques choix réalisés volontairement :
- utilisation des Signals Angular pour le state UI
- composants réutilisables entre les vues grouped/alphabetical
- absence de state management complexe afin d’éviter l’overengineering
- logique de filtrage externalisée dans des utilities dédiées
- absence de librairie UI (Material, Tailwind, etc.) afin de conserver un projet léger et adapté au scope du test
