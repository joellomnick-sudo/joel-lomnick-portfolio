# Public Asset Reconciliation

Wave 0 establishes `data/publicAssets.json` as the canonical record for every file deployed from `public`.

## Current Inventory

- 24 active public assets: 19 images and 5 PDFs.
- 24 archived revisions retained under `assets/archive/public-images` outside the public deployment directory.
- 0 unregistered files in `public`.
- 0 missing active or archived files.
- 0 exact duplicate active files.
- 0 case-insensitive collisions or unsafe active filenames.
- 0 duplicate public roles.
- 0 scattered hard-coded image or document paths outside the registry.

## Verified Documents

| Asset | Pages | SHA-256 |
| --- | ---: | --- |
| Engineering 101 guide | 43 | `08f4e838a644f77f4759575b95954064a0b37d63262294a8db612c8f61364b28` |
| Public resume | 3 | `4fa8dbccd15219bfd837e481c7fbec5cf7fee83a3cf22b6d71d84bd51f712983` |
| Public cover letter | 2 | `ca30d53a9adae5049ed118ff4461d48e7823caa0b4fca83d4230efc2738ee2f8` |
| Lionheart Volume 1 preview | 10 | `03e94a5ed0315e41ec11f27ce20620f156155f3e9b528e6cb62bc3d48f9c8d86` |
| Lionheart Volume 2 preview | 10 | `2c6c1c8120e2b18d09d80237981fc704eb2def1e565ba3ff8e86e17111976eb6` |

Run `pnpm audit:assets` before every production wave. The audit emits `artifacts/audits/public-assets-local.json`, fails on integrity errors, and reports the manifest hash also exposed by `/api/version` for production verification.
