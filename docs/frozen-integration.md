# Frozen Visual System integration

## Provenance

- Official artifact: `neumann-visual-system-v1.bundle`, supplied by the owner.
- Source commit: `acd420ad5fa7d9d6e45483d2e19eb84a0b0b25b4`.
- Its direct parent is GitHub main `071306a75ee2f6e73337c130d71d15adc97048ce`.
- The original commit and its ancestry are preserved, without squashing or force push.
- `NEUMANN_DESIGN.md` matches the supplied specification byte for byte.
- The supplied patch and source commit share stable patch ID
  `cd721585b68acb81cd41ed0e4ebadf9a94efc440`.

The application is the complete bundle implementation, replacing the old light
site and `/lp`. Visual corrections after the source commit remove the
remaining decorative Privacy Policy eyebrow and its dependent heading margin,
and remove pill radius from its four list markers (pill is reserved for status
chips). The latter was detected by the first browser CI run; its assertions
remain unchanged. No tokens, colors, assets, archetypes,
fonts, project data or metrics were introduced.

## Verification

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` verifies the approved assets' SHA-256 digests and PNG dimensions,
NM path consistency, and removal of legacy design components/routes.
`npm run preview-qa -- URL` uses the source's Puppeteer test harness, with
`PUPPETEER_EXECUTABLE_PATH` pointing to an installed Chrome executable.
It checks `/` and `/privacy` at 320, 768 and 1440px, including scroll positions
and the mobile menu. It records font responses, runtime errors, computed styles,
icon/OGP responses and screenshots under ignored `qa-results/`.
GitHub Actions runs these same gates and uploads the QA evidence.

## Preserved source limitations

- The OGP bitmap uses DejaVu rather than Geist, as documented by the source
  specification. The approved bitmap is preserved exactly.
- The document includes older explanatory text (for example metadataBase as
  pending, although the source implements it). The specification is not rewritten.
- Hero's company identity and location labels are retained: they carry real
  data and are explicitly required by the Frozen Hero specification.
- Project years and evidence imagery remain absent where data is unavailable.
- Contact remains mailto fallback; no send API or provider is added.
- Production domain verification and URL validation remain PR7 responsibilities.
- Next.js remains the source's 14.2.35; the previously reported dependency
  security findings require separate remediation before Production approval.

## PR7 reconstruction decision

PR7 (`chore/deployment-hardening`, `f56e5cb`) remains unmerged. A read-only
three-way merge against the source reports conflicts in `.env.example`,
`.eslintrc.json`, `app/layout.tsx`, deleted `app/lp/page.tsx`, `lib/site.ts`,
`package.json`, `package-lock.json`, and `scripts/preview-qa.mjs`.

After the Frozen PR merges, reconstruct deployment hardening on a new branch
from the resulting main, preserving the published PR7 branch without force push:

1. Keep the Frozen layout, fonts, icons, assets and source content as authoritative.
2. Port the validated URL resolver and Production guard; retain the exported
   `siteUrl` interface and direct public environment-variable reads.
3. Add Preview noindex and route-specific Privacy canonical/OG metadata; do not
   resurrect `/lp`. Preserve file-based OGP metadata.
4. Keep the Frozen lint/dependency setup and visual QA harness. Port PR7's HTTP
   metadata checks under a separate script with only `/` and `/privacy`.
5. Combine tests and CI gates, preserve Geist/Puppeteer dependencies, regenerate
   the lockfile with npm and port safe env ignore rules/documentation.
6. Re-run all build, metadata, font and visual gates before requesting review.

This avoids mechanically replaying the old-light metadata patch or replacing the
Frozen browser QA with PR7's HTTP-only script. No rebase or merge is performed by
this integration PR.
