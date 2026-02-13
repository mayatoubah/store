# Maci Food — Africa Market Online

Projet e-commerce full stack Next.js 14 + TypeScript + Tailwind + Prisma/PostgreSQL + NextAuth + Stripe.

## Stack
- Next.js (App Router)
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth Credentials + RBAC (OWNER / MANAGER / STAFF / CUSTOMER)
- Zustand (cart / wishlist)
- Framer Motion
- Stripe Checkout + Webhook
- Nodemailer

## Installation
```bash
npm install
cp .env.example .env
```

## Setup Postgres (Neon/Supabase)
1. Créer une DB Postgres.
2. Copier l'URL dans `DATABASE_URL`.

## Prisma
```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run seed
```

## Lancer le projet
```bash
npm run dev
```

## Stripe CLI
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
Copier le `whsec_...` dans `.env`.

## Comptes seed
- Admin owner: `owner@macifood.com` / `Admin123!` (obligatoire de changer en local/prod)

## Checklist RUN (copier-coller)
```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run seed
npm run dev
```

## Troubleshooting Windows
- Supprimer dépendances:
  - PowerShell: `Remove-Item -Recurse -Force node_modules`
  - CMD: `rmdir /s /q node_modules`
- Nettoyer cache npm: `npm cache clean --force`
- Reinstaller: `npm install`
- Si Prisma bloque: fermer process Node puis relancer `npm run prisma:generate`.

## Taxes Stripe
Activer Stripe Tax en dashboard pour calcul automatique, sinon implémenter un montant fixe côté backend avant création de session.
