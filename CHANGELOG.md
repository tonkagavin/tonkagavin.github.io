# Changelog

All notable recent updates to this portfolio website are documented here.
This file now uses dated entries, including historical notes derived from repository commit history.

## [Unreleased] - 2026-05-29

### Added
- Global easter-egg state management via `src/context/EasterEggContext.tsx`.
- Global theme management for five terminal themes via `src/context/ThemeContext.tsx`.
- Global escape listener hook for easter eggs (`Escape`, `Ctrl+C`) in `src/hooks/useEscapeListener.ts`.
- Matrix rain full-screen effect in `src/components/MatrixRain.tsx`.
- Easter egg overlay + exit UI in `src/components/EasterEggOverlay.tsx`.
- Advanced CLI shell component in `src/components/TerminalCli.tsx` with:
  - command parser, command history, directory state, and shell-like prompt
  - token-by-token async output streaming
  - linkified output rendering
  - history-based ghost-text autosuggestions
  - `Tab`/`ArrowRight` accept-to-complete behavior
  - animation trigger commands (`doit`, `special`)
- Animated canvas background system in `src/components/AnimatedBackgroundLayer.tsx` including:
  - ambient themed particle layer
  - Naruto and Sasuke running sprite sequences
  - Rasengan/Chidori energy orb rendering
  - Rasen-shuriken and fireball projectile actions
  - cinematic clash sequence with Amaterasu and full-white impact flash
  - above-layer rendering option for certain animation passes
  - command-triggered showcase queue support (`doit`, `special`)

### Changed
- Updated main app composition in `src/app.tsx` to use:
  - `ThemeProvider`
  - `EasterEggProvider`
  - `AnimatedBackgroundLayer`
  - `EasterEggOverlay`
  - `TerminalCli` instead of legacy prompt/input combo
- Updated terminal window styling and behavior in `src/components/Terminal.tsx` for theme-variable colors and spring-like transitions.
- Expanded theme variables and animation utility classes in `src/styles/style.css`.
- Updated resume/work/about/projects/education/contact sections to reflect newer resume content and achievements:
  - internship and leadership experience refinements
  - updated education details
  - enhanced project highlights and resume stats
- Standardized links to open in new tabs where applicable (`TerminalCli`, `ContactSection`, `ResumeSection`; project/contact social links already used `_blank`).
- Rewrote `README.md` to document the actual portfolio site instead of Vite template defaults.

### Removed
- Removed deprecated `src/components/CommandInput.tsx`.
- Removed deprecated `src/components/TerminalPrompt.tsx`.

## [2026-01-24]

### Changed
- Repository updated on `7914113` (commit message is blank in history).

## [2026-01-16]

### Changed
- Repository updated on `10bb738` (commit message is blank in history).

## [2026-01-14]

### Changed
- Repository updated on `d845564` (commit message is blank in history).

## [2026-01-04]

### Fixed
- Fixed `ProjectsSection.tsx` error (`22e6bb0`).

### Changed
- Additional repository updates on the same day with blank commit messages (`98acd91`).

## [2025-12-01]

### Added
- Added `CNAME` file for custom domain support (`a32ca3c`).

## [2025-11-29]

### Changed
- Repository updated on `e56bcfe` (commit message is blank in history).

## [2025-11-24]

### Changed
- Repository updates on `5198095` and `b4107de` (both commit messages blank in history).

## [2025-11-15]

### Changed
- Multiple portfolio updates on:
  - `7d0601e`
  - `ba6457a`
  - `efbabe7`

### Notes
- These commits are present in history but have blank commit messages.

## [2025-11-12]

### Fixed
- Fixed error in contact flow (`77fa93e`).

### Changed
- Additional updates on:
  - `5a19484`
  - `df045b8`
  - `f1a74aa`
  - `ec182f4`
  - `a291d81`

### Notes
- The above listed commits are in history with blank commit messages unless otherwise noted.

## [2025-11-11]

### Changed
- Changed website name (`bbe8c02`).
- Additional repository update on `49d8f1d` (blank commit message).

## [2025-11-10]

### Changed
- Built website and prepared deployment (`0963485`).
- Updated `AboutSection.tsx` idols (`3d220a0`).
- Initial setup/update commit present on `df0a7a9` (blank commit message).

### Notes
- Earliest visible base commit in fetched remote history: `df0a7a9`.
