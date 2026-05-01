# ChinaSupply.ai

AI supplier intelligence platform for buying from China.

## Stack

- Next.js 16
- React 19
- TypeScript
- Payload CMS
- Supabase Postgres/Auth/pgvector
- Cloudflare R2
- Tailwind CSS
- shadcn/ui
- MapLibre GL
- ECharts / Recharts
- OpenAI

## Getting Started

Install dependencies:

```bash
pnpm install
```

CI and Vercel can install dependencies with:

```bash
pnpm install
```

Create local environment variables:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
pnpm dev
```

Open:

- App: http://localhost:3000
- Payload Admin: http://localhost:3000/admin

## Step 1 Status

This repository currently includes:

- Next.js app scaffold
- Tailwind CSS and shadcn-compatible UI setup
- Payload CMS config and initial collections
- Supabase server/admin client helpers
- Supplier Check mock provider
- Supplier search/detail API routes
- GitHub Actions CI scaffold
- Supabase initial schema draft

Real Tianyancha/Qichacha integration should be added through the provider adapter after API contract and usage rights are confirmed.
