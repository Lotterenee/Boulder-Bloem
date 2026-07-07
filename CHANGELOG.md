# Changelog

## [v0.0.1] - 2026-07-07

### Features
- Serve the Boulder Bloem site from public/ via express.static: clean URLs, /healthz, 404 fallback (#2)
- Add the five Dutch site pages (index, aanpak, educatie, groen, subsidies) under public/ (#1)

### Fixes
- Replace all em-dashes with en-dashes in public/*.html per the repo writing rule

### Improvements
- Add project docs: CLAUDE.md, docs/SPEC.md, docs/BUILD.md; update README
- Provision Railway environments via the harness; watch public/** for deploys
