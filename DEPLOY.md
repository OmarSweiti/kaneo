# Deploying Perfect Coders CheckList

This fork runs as three free-tier services:

| Part | Host | Address |
| --- | --- | --- |
| Web app (static build of `apps/web`) | Netlify, project `perfect-coders-checklist` | https://perfect-coders-checklist.netlify.app |
| API (`apps/api`, Docker) | Render, service `perfect-coders-checklist-api`, Frankfurt | https://perfect-coders-checklist-api.onrender.com |
| PostgreSQL | Supabase, project `perfect-coders-checklist` (ref `ncehlejyboashpsdccxu`), Frankfurt (`eu-central-1`) | private |

The browser loads the app from Netlify and calls the API on Render. Because they're on different sites, the API sends its session cookies as `SameSite=None; Secure; Partitioned` (`apps/api/src/utils/get-default-cookie-attributes.ts`), which current browsers accept for this setup.

## Web app (Netlify)

`netlify.toml` holds the build:

- **Build:** it builds the workspace packages the web app depends on, then `apps/web`, and publishes `apps/web/dist`.
- **Settings:** the public `VITE_*` values (the API and client URLs) are set there and override the container placeholders in `apps/web/.env.production`. Never put secrets in `VITE_*` variables: they end up in the browser bundle.
- **Responses:** every path falls back to `index.html` for the client-side router, security headers are sent on all responses, and fingerprinted files under `/assets` are cached forever.
- **Deploys:** pushes to `main` deploy to production once the repository is linked in the Netlify UI. Pull requests get deploy previews.

## API (Render)

The service builds `apps/api/Dockerfile` with the repository root as the Docker context. Its health check is `/api/health`.

- **Auto-deploy:** pushes to `main` redeploy it.
- **Build filter:** only changes under `apps/api/**`, `packages/**`, `i18n/**`, `package.json`, `pnpm-lock.yaml` and `pnpm-workspace.yaml` trigger a build, which saves free build minutes.
- **Migrations:** they run automatically at startup.

| Variable | Value |
| --- | --- |
| `KANEO_CLIENT_URL` | `https://perfect-coders-checklist.netlify.app` (also the CORS origin) |
| `KANEO_API_URL` | `https://perfect-coders-checklist-api.onrender.com` |
| `PORT` | `1337`, the port the API listens on; Render routes traffic to it. |
| `DATABASE_URL` | Supabase session pooler, `aws-1-eu-central-1.pooler.supabase.com:5432`, user `postgres.ncehlejyboashpsdccxu`, with `sslmode=verify-full` |
| `NODE_EXTRA_CA_CERTS` | `/etc/secrets/supabase-root-2021-ca.crt`, a Render secret file |
| `DATABASE_POOL_MAX` | `5`, kept small for the free pooler |
| `AUTH_SECRET` | random, 64 hex characters |
| `NOTIFICATION_SECRET_ENCRYPTION_KEY` | random, 64 hex characters |
| `DISABLE_GUEST_ACCESS` | `true` |
| `DISABLE_REGISTRATION` | `true`. The first account is still allowed: instance bootstrap skips the check while there are no users. |

Secrets live only in Render's environment settings and in the macOS Keychain of the machine that set them up:

- `Supabase DB perfect-coders-checklist`
- `Perfect Coders CheckList AUTH_SECRET`
- `Perfect Coders CheckList NOTIFICATION_SECRET_ENCRYPTION_KEY`

Keep `AUTH_SECRET` stable: changing it signs everyone out.

## Database (Supabase)

- **Pooler:** the API connects through the **session** pooler (port 5432), not the transaction pooler (6543). The API takes session-level locks while migrating, and Render can't reach Supabase's IPv6-only direct host.
- **TLS:** it's verified against "Supabase Root 2021 CA" (SHA-256 `80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA`, valid until 2031), downloaded from Supabase and uploaded to Render as the secret file above.
- **SSL enforcement:** it's on for the project, so unencrypted connections are refused.

## First start

The database starts empty: no users, no workspaces. Migrations create the schema on the API's first boot.

Open the web app and create your account. **The first account becomes the instance administrator.** Registration is already disabled, which only takes effect once a user exists, so every later sign-up is refused. Invite people from the app instead.

## Free-tier behaviour

- **Render:** the free web service sleeps after 15 minutes without traffic. The first request after that takes about a minute while it wakes. Free services get 750 instance hours and 500 build minutes a month.
- **Supabase:** a free project pauses after a week without activity. Resume it from the Supabase dashboard. The database is limited to 500 MB.
- **Netlify:** builds use the free plan's monthly credits. Previews for pull requests are included.
- **Not set up:** email (SMTP) and file uploads (S3) aren't configured. Sign-in uses email and password, and image uploads are unavailable until storage is added.
