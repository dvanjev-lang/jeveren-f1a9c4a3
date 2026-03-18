# FlowSync - Unified Communication Dashboard

> Sync Gmail, Slack & Calendar. AI-powered prioritization. Never miss what matters.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [OAuth Setup](#oauth-setup)
- [Database Setup](#database-setup)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Subscription Tiers](#subscription-tiers)
- [Troubleshooting](#troubleshooting)

---

## Overview

FlowSync is a unified communication dashboard built for managers, startup founders, and solopreneurs. It connects Gmail, Slack, and Google Calendar through OAuth, uses Claude AI to prioritize emails, generates daily briefings, schedules meetings, and delivers real-time push notifications — all from a single interface.

**Project ID:** `jeveren-f1a9c4a3`

---

## Features

| Feature | Starter ($49/mo) | Pro ($99/mo) | Enterprise ($199/mo) |
|---|---|---|---|
| Gmail OAuth sync | ✅ | ✅ | ✅ |
| Slack integration | ❌ | ✅ | ✅ |
| Calendar sync | ✅ | ✅ | ✅ |
| AI email prioritization (Claude) | 100/day | Unlimited | Unlimited |
| Daily briefings | ✅ | ✅ | ✅ |
| Meeting scheduler | ❌ | ✅ | ✅ |
| Real-time push notifications | ❌ | ✅ | ✅ |
| Team seats | 1 | 3 | Unlimited |
| Priority support | ❌ | ❌ | ✅ |

---

## Prerequisites

Ensure the following are installed and configured before proceeding:

- **Node.js** >= 18.17.0 ([download](https://nodejs.org))
- **npm** >= 9.0.0 or **pnpm** >= 8.0.0
- **PostgreSQL** >= 15 (local or hosted via [Supabase](https://supabase.com) / [Neon](https://neon.tech))
- **Redis** >= 7 (for real-time push and job queues — [Upstash](https://upstash.com) recommended)
- A **Google Cloud** project with Gmail API + Google Calendar API enabled
- A **Slack App** (for Slack integration)
- An **Anthropic API key** (Claude — [console.anthropic.com](https://console.anthropic.com))
- A **Stripe** account (for subscription billing)

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-org/flowsync.git
cd flowsync
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Copy environment variables

```bash
cp .env.example .env.local
```

Fill in all required values — see [Environment Variables](#environment-variables) below.

### 4. Initialize the database

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root. All variables are required unless marked optional.

```env
# ─────────────────────────────────────────
# App
# ─────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=FlowSync
NEXT_PUBLIC_PROJECT_ID=jeveren-f1a9c4a3
NODE_ENV=development

# ─────────────────────────────────────────
# Database (PostgreSQL)
# ─────────────────────────────────────────
DATABASE_URL=postgresql://user:password@localhost:5432/flowsync
DATABASE_DIRECT_URL=postgresql://user:password@localhost:5432/flowsync

# ─────────────────────────────────────────
# Redis (real-time push notifications & queues)
# ─────────────────────────────────────────
REDIS_URL=redis://localhost:6379
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# ─────────────────────────────────────────
# NextAuth.js
# ─────────────────────────────────────────
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_min_32_chars

# ─────────────────────────────────────────
# Google OAuth (Gmail + Calendar)
# ─────────────────────────────────────────
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google

# Gmail Push Notifications (Pub/Sub)
GOOGLE_PUBSUB_TOPIC=projects/your-gcp-project/topics/gmail-push
GOOGLE_PUBSUB_SUBSCRIPTION=projects/your-gcp-project/subscriptions/gmail-push-sub
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# ─────────────────────────────────────────
# Slack OAuth
# ─────────────────────────────────────────
SLACK_CLIENT_ID=your_slack_client_id
SLACK_CLIENT_SECRET=your_slack_client_secret
SLACK_SIGNING_SECRET=your_slack_signing_secret
SLACK_REDIRECT_URI=http://localhost:3000/api/auth/callback/slack
SLACK_BOT_TOKEN=xoxb-your-bot-token

# ─────────────────────────────────────────
# Anthropic (Claude AI)
# ─────────────────────────────────────────
ANTHROPIC_API_KEY=sk-ant-your_anthropic_api_key
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022

# ─────────────────────────────────────────
# Stripe (Subscriptions)
# ─────────────────────────────────────────
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

STRIPE_PRICE_STARTER=price_starter_id
STRIPE_PRICE_PRO=price_pro_id
STRIPE_PRICE_ENTERPRISE=price_enterprise_id

# ─────────────────────────────────────────
# Email (transactional — optional)
# ─────────────────────────────────────────
RESEND_API_KEY=re_your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
```

> **Security:** Never commit `.env.local` to version control. The `.gitignore` already excludes it.

---

## OAuth Setup

### Google (Gmail + Calendar)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services → Library**
4. Enable the following APIs:
   - **Gmail API**
   - **Google Calendar API**
   - **Cloud Pub/Sub API** (for push notifications)
5. Go to **APIs & Services → Credentials**
6. Click **Create Credentials → OAuth 2.0 Client ID**
7. Set **Application type** to `Web application`
8. Add to **Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
9. Copy **Client ID** and **Client Secret** into `.env.local`
10. Go to **OAuth consent screen** and add these scopes:
    ```
    https://www.googleapis.com/auth/gmail.readonly
    https://www.googleapis.com/auth/gmail.modify
    https://www.googleapis.com/auth/calendar.readonly
    https://www.googleapis.com/auth/calendar.events
    openid
    profile
    email
    ```

#### Gmail Push Notifications (Pub/Sub)

1. In GCP, go to **Pub/Sub → Topics → Create Topic**
2. Name it `gmail-push`
3. Grant `gmail-api-push@system.gserviceaccount.com` the `Pub/Sub Publisher` role on the topic
4. Create a **Push Subscription** pointing to:
   ```
   https://yourdomain.com/api/webhooks/gmail
   ```
5. Create a **Service Account**, download the JSON key, and set the `GOOGLE_SERVICE_ACCOUNT_*` env vars

---

### Slack

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App → From scratch**
3. Navigate to **OAuth & Permissions**
4. Add **Redirect URL:**
   ```
   http://localhost:3000/api/auth/callback/slack
   https://yourdomain.com/api/auth/callback/slack
   ```
5. Add **Bot Token Scopes:**
   ```
   channels:history
   channels:read
   chat:write
   im:history
   im:read
   mpim:history
   groups:history
   groups:read
   users:read
   users:read.email
   ```
6. Go to **Event Subscriptions → Enable Events**
7. Set Request URL to:
   ```
   https://yourdomain.com/api/webhooks/slack
   ```
8. Subscribe to bot events:
   ```
   message.channels
   message.im
   message.groups
   app_mention
   ```
9. Copy **Client ID**, **Client Secret**, and **Signing Secret** into `.env.local`

---

### Stripe Webhooks (Local Development)

Install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and forward events to your local server:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret printed to the terminal into `STRIPE_WEBHOOK_SECRET`.

---

## Database Setup

This project uses **Prisma** with PostgreSQL.

### Local PostgreSQL

```bash
# Create database
createdb flowsync

# Run migrations
npm run db:migrate

# Seed initial data (subscription tiers, demo user)
npm run db:seed
```

### Using Supabase (recommended for production)

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → Database → Connection string**
3. Copy the **URI** into `DATABASE_URL` and **Direct connection** into `DATABASE_DIRECT_URL`
4. Run migrations:
   ```bash
   npm run db:migrate:prod
   ```

### Prisma Studio (database GUI)

```bash
npm run db:studio
```

Opens at [http://localhost:5555](http://localhost:5555)

---

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Linting
npm run lint

# Fix lint errors
npm run lint:fix

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# E2E tests (Playwright)
npm run test:e2e

# Database operations
npm run db:generate       # Generate Prisma client
npm run db:migrate        # Run pending migrations (dev)
npm run db:migrate:prod   # Run pending migrations (prod)
npm run db:seed           # Seed demo data
npm run db:studio         # Open Prisma Studio
npm run db:reset          # Reset database (dev only — DESTRUCTIVE)

# Stripe
npm run stripe:listen     # Forward Stripe webhooks to localhost
```

### Project Structure

```
flowsync/
├── src/
│   ├── app/                        # Next.js 14 App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/          # Main unified dashboard
│   │   │   ├── inbox/              # Gmail view
│   │   │   ├── slack/              # Slack view
│   │   │   ├── calendar/           # Calendar + meeting scheduler
│   │   │   ├── briefings/          # AI daily briefings
│   │   │   ├── settings/
│   │   │   │   ├── integrations/   # OAuth connection management
│   │   │   │   ├── notifications/
│   │   │   │   └── billing/
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/  # NextAuth.js handlers
│   │   │   ├── gmail/
│   │   │   │   ├── sync/           # Manual sync trigger
│   │   │   │   ├── prioritize/     # Claude AI prioritization
│   │   │   │   └── send/
│   │   │   ├── slack/
│   │   │   │   ├── channels/
│   │   │   │   └── messages/
│   │   │   ├── calendar/
│   │   │   │   ├── events/
│   │   │   │   └── schedule/       # Meeting scheduler
│   │   │   ├── briefings/
│   │   │   │   └── generate/       # Claude daily briefing
│   │   │   ├── webhooks/
│   │   │   │   ├── gmail/          # Google Pub/Sub push
│   │   │   │   ├── slack/          # Slack Events API
│   │   │   │   └── stripe/         # Stripe billing events
│   │   │   └── notifications/
│   │   │       └── push/           # Web Push subscription
│   │   ├── layout.tsx
│   │   └── page.tsx                # Landing page
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── dashboard/
│   │   │   ├── UnifiedInbox.tsx
│   │   │   ├── PriorityQueue.tsx
│   │   │   ├── CalendarWidget.tsx
│   │   │   ├── SlackFeed.tsx
│   │   │   ├── DailyBriefing.tsx
│   │