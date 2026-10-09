# 🛒 বাজার দর | BazarDor

Daily prices of essential commodities in Bangladesh, at a glance.

BazarDor shows today's retail prices for rice, lentils, oil, vegetables, fish, meat, dairy and spices. Every product comes with its price change, a summary of minimum, maximum and average prices, and a market by market breakdown across divisions. The interface is fully in Bangla, uses Bengali numerals, and works on mobile, tablet and desktop.

## ✨ Key Features

1. **Live price ticker and daily movers.** An endlessly scrolling ticker shows every price with its ▲ ▼ change, while the home page highlights the top 6 risers and top 6 fallers of the day.
2. **Browse and sort by category.** Eight category pages share one card design, with a sort control (default, price low to high, price high to low) that compares real numeric values, so Bengali numerals never break the order.
3. **Detailed, protected product pages.** After signing in, each product shows its summary, minimum, maximum and average price, a comparison with yesterday, last week and last month, and prices from 12 markets grouped by division.
4. **Secure authentication.** Email and password, Google and GitHub sign in powered by Better Auth, with toast feedback, protected route redirects and safe return URLs.
5. **Profile management.** A My Profile page and an update information form to change the display name.

## 🧰 Technologies Used

| Purpose        | Technology                                       |
| -------------- | ------------------------------------------------ |
| Framework      | Next.js 16 (App Router)                          |
| Language       | TypeScript                                       |
| UI             | React 19, Tailwind CSS 4, DaisyUI 5              |
| Authentication | Better Auth (email and password, Google, GitHub) |
| Database       | PostgreSQL (Neon) through `pg`                   |
| Validation     | Zod                                              |
| Notifications  | react-hot-toast                                  |
| Tooling        | ESLint, Prettier                                 |
| Deployment     | Vercel                                           |

## 🗂️ Project Structure

```
src/
  app/                 Routes, layouts, loading, error and 404 states
    api/auth/          Better Auth route handler
    category/[slug]/   Category listing
    product/[slug]/    Protected product details
    profile/           My Profile and update information
    signin/ signup/    Authentication pages
  components/
    auth/              Forms, social buttons, auth card
    home/              Hero and home sections
    layout/            Header, category navigation, ticker, footer
    product/           Cards, grid, sorting, detail sections
    ui/                Shared primitives and error states
  config/              Site constants and fallback categories
  lib/
    api/               Validated API client, typed errors, data access
    auth/              Better Auth setup, session helpers, error mapping
    format/            Bengali number, price and date formatting
    products/          Selectors for movers, sorting and summaries
    validation/        Zod schemas and redirect safety
  proxy.ts             CSP nonce and protected route redirects
scripts/               Better Auth schema configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9 or newer
- A PostgreSQL database (a free Neon project works well)

### Setup

```bash
git clone https://github.com/SamaunRezvi/assignment_seven.git
cd assignment_seven
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable                                   | Description                                                         |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `DATABASE_URL`                             | Pooled PostgreSQL connection string                                 |
| `BETTER_AUTH_SECRET`                       | Random secret of at least 32 characters (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL`                          | Public origin, for example `http://localhost:3000`                  |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials                                            |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials                                            |

OAuth callback URLs:

- Google: `{BETTER_AUTH_URL}/api/auth/callback/google`
- GitHub: `{BETTER_AUTH_URL}/api/auth/callback/github`

Create the database tables, then start the app:

```bash
npm run auth:migrate
npm run dev
```

### Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the development server     |
| `npm run build`        | Create a production build        |
| `npm run start`        | Serve the production build       |
| `npm run lint`         | Run ESLint                       |
| `npm run typecheck`    | Run the TypeScript compiler      |
| `npm run format`       | Format the code with Prettier    |
| `npm run auth:migrate` | Create or update the auth tables |
| `npm run audit:prod`   | Audit production dependencies    |

## 🔒 Security

- Nonce based Content Security Policy, HSTS, `X-Frame-Options`, `nosniff`, a strict referrer policy and a locked down permissions policy.
- Server side validation of every auth input with Zod, mirrored in the forms for instant feedback.
- Session cookies are `HttpOnly`, `SameSite=Lax` and `Secure` in production, and requests from untrusted origins are rejected.
- Database backed rate limiting on sign in, sign up and profile updates.
- Callback URLs are restricted to same site paths, which prevents open redirects.
- Protected pages are checked twice: optimistically in the proxy and authoritatively on the server.
- API responses are validated against a schema, and users only ever see safe, localized error messages.
- Secrets live in environment variables and are excluded from version control.

## ⚠️ Error Handling

Product data comes from a public API. Requests time out after 8 seconds, retry once on a fallback endpoint for transient failures, and report typed errors (network, timeout, not found, server, invalid response). Each one is shown as a clear Bangla message with a retry action. Unknown routes, invalid categories and unknown products render a friendly 404 with a link back to the home page.

## ☁️ Deployment

1. Push the repository to GitHub and import it in Vercel.
2. Add the environment variables from the table above. Set `BETTER_AUTH_URL` to the production URL.
3. Run `npm run auth:migrate` once against the production database.
4. Add the production callback URLs to the Google and GitHub OAuth apps.

All routes, including dynamic `[slug]` pages, are rendered on demand, so reloading any page works without a hard 404.

## 📄 License

This project was built as a learning assignment.
