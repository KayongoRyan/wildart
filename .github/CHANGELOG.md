# Changelog

All notable changes to this project are documented here.

## [Unreleased]

## 2025-03-12

### Added

- **Artist profile page** (`/artists/[slug]`)
  - Dynamic route for Christine Mukamana, Josue Habimana, Rigobert Nzeyimana
  - Hero with name, role, since, medium, specialty tags
  - Bio and quote sections
  - "Works by this artist" section
  - "Other artists" links and commission/shop CTAs

- **Shared artists data** (`src/lib/artists.ts`)
  - `Artist` interface and `artists` array
  - `getArtistBySlug(slug)` helper

### Changed

- **S4Artists** (homepage Featured artists): Links to `/artists/[slug]` instead of `/shop?artist=...`
- **S6Artists**: Same link update; CTA text "View works →" → "View profile →"
- **Studio page**: Artist cards link to profile pages; uses shared `artists` data

---

## How to update this file

When you commit changes, add a new entry under `[Unreleased]` or the current date:

```markdown
### Added
- New feature description

### Changed
- What changed

### Fixed
- Bug fix description
```
