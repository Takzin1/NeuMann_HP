# Deployment hardening (PR7)

## Audited GitHub baseline

- Repository: `Takzin1/NeuMann_HP`
- Branch: `main`; commit: `071306a75ee2f6e73337c130d71d15adc97048ce`
- Next.js 14.2.35 / React 18 / TypeScript / Tailwind 3; npm lockfile.
- Routes: `/`, `/privacy`, `/lp` (legacy archive, noindex).
- No repository AGENTS.md, NEUMANN_DESIGN.md, .env.example, preview QA script,
  GitHub Actions workflows, vercel.json, robots.txt or sitemap existed.
- Vercel project `neu-mann-hp` is linked to this repository and uses Node 24.

**The audited GitHub baseline is the old light design. The supplied Frozen
Visual System is absent from GitHub.** The attached bundle identifies commit
`acd420ad5fa7d9d6e45483d2e19eb84a0b0b25b4`; it has not been imported by this PR.
This PR changes no JSX rendering, CSS, tokens, fonts, logos or content.
It must not be presented as completion of the Frozen Visual System rollout.

## URL configuration

Resolution: `NEXT_PUBLIC_SITE_URL` → `NEXT_PUBLIC_VERCEL_URL` →
`http://localhost:3000`. Public variables are read with direct property access
so Next.js can inline the same values in client bundles and server output.
Origins reject credentials, paths, query strings and fragments.

Production requires an explicit, verified official HTTPS origin in
`NEXT_PUBLIC_SITE_URL`. No official domain has been established by this audit.
The Next config refuses Production builds/start without that variable, or with
local, example, IP or `*.vercel.app` origins. Structural validation cannot prove
domain ownership: verify DNS and the Vercel domain assignment separately.

- Vercel Production: `VERCEL_ENV=production` activates the guard automatically.
- Vercel Preview: leave `NEXT_PUBLIC_SITE_URL` unset to use that deployment's
  hostname. Keep automatic exposure of Vercel system environment variables enabled.
  Preview metadata is noindex; `/lp` stays noindex/nofollow in every environment.
- Local builds: no domain is required; `NODE_ENV=production` alone is not a
  deployment target (Next uses it for local `next build` as well).
- Other Production hosts: set `DEPLOYMENT_ENV=production` for both build/start.

Set public URLs **before building**. Rebuild after changes. Do not promote an
artifact built with a Preview canonical directly to Production; build again
with the verified official domain and Production environment.

`metadataBase` is shared; canonical and OG URLs are specific to each route.
No contact API, email provider, sitemap, robots route or placeholder image is added.
The existing mailto fallback remains unchanged.

## Verification

```bash
npm ci
npm run lint
npm run typecheck
npm test
VERCEL_ENV=preview npm run build
npm start
# In another shell:
PREVIEW_QA_EXPECT_NOINDEX=1 npm run preview-qa
```

For a deployed Preview set `PREVIEW_QA_URL` to its actual HTTPS URL. Set
`PREVIEW_QA_CANONICAL_ORIGIN` only when its canonical origin intentionally differs
from the QA URL. Do not place deployment-protection bypass tokens in committed files.
The QA script checks HTTP success, route-specific canonical/OG URL, document
language, archive/Preview noindex and any declared icon/image URLs.
Missing favicon/apple icon/OGP are reported as **BLOCKED**, not silently certified.
Exit success means metadata assertions passed, not release approval or visual QA.

CI uses Node 24 and the same commands. It tests a local Preview-mode build; it
does not prove that the Production domain has been configured in Vercel.

## Existing release blockers and limits

- Frozen design and its approved assets are not in the audited GitHub branch.
- Favicon, apple icon and OGP image are absent. No replacement artwork is invented.
- The existing typography uses system font stacks. There is no self-hosted Geist
  or Geist Mono and no Google css2 request for Noto Sans JP. Its Japanese glyph
  rendering and mixed-font behavior cannot be certified.
- At the existing deployed page's 1363px browser window (1348px content viewport),
  header outer height is 65px (64px inner row + border); `--header-h` is missing;
  61 laid-out elements have computed weight >=600; one has backdrop blur;
  zero have box shadow or gradient; horizontal overflow is zero. Radii include
  2px and 6px. These measurements predate the PR.
- Existing source includes reveal-on-scroll behavior, cards and the old palette.
  The Frozen red budget, motion, radius and archetype rules are therefore not met.
- 320/768/1440 layout certification remains pending. The available interactive
  browser interface does not expose viewport resizing. Source equivalence alone
  is not a substitute for these measurements.
- Lint reports two pre-existing `no-img-element` warnings in legacy Activity and
  Founder components. The Next-14-compatible ESLint 8 toolchain emits dependency
  deprecation notices. Framework/toolchain modernization is a separate task.
- `npm audit --omit=dev` reports three high-severity affected packages: Next.js,
  its nested PostCSS, and nanoid. Exploitability has not been established by this
  audit. Next.js 14.2.35 is unchanged from baseline; npm proposes a major upgrade
  for the Next.js/PostCSS findings. Security remediation and its regression QA
  remain required before Production approval.

Before release, integrate the approved Frozen baseline through its own reviewed
change, reconcile these metadata changes with its existing implementation, then
run the complete visual, font, accessibility and deployment QA again.
