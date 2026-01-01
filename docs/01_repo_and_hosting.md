# Phase 1: Repository & Hosting Setup

## Overview
Phase 1 focused on establishing the foundational project structure for Life OS PWA. This document captures all setup decisions, configurations, and rationale.

## Date
January 1, 2026 - 7:00 AM IST

## Step 1.1: Repository Creation

### Specifications
- **Repository Name**: life-os-pwa
- **Owner**: AnandXPraveen
- **Visibility**: Public (made public to enable GitHub Pages hosting)- **Platform**: GitHub
- **License**: Not specified (user decision pending)
- **URL**: https://github.com/AnandXPraveen/life-os-pwa

### Decision Log
1. Created private repository (user preference: privacy over public showcase)
2. Initialized with main branch only
3. No template used (custom structure required)
4. No initial README (to be added in documentation phase)

### GitHub Pages Configuration
- **Status**: ✅ DEPLOYED and LIVE
- **Branch**: main
- **Deployment URL**: https://anandxpraveen.github.io/life-os-pwa/
## Step 1.2: Folder Structure

### Architecture Decision
Chosen a modular, client-side architecture:

```
life-os-pwa/
├── public/              # Static assets and PWA files
│   ├── assets/          # Non-code assets
│   │   └── plan_v1.2.pdf
│   ├── index.html       # Entry point
│   ├── styles.css       # Global styling
│   ├── app.js           # Main application
│   ├── manifest.json    # PWA configuration
│   └── sw.js            # Service Worker
├── src/                 # Source modules (organizational only)
│   ├── calendar.js      # Calendar calculation logic
│   ├── crypto.js        # Client-side encryption
│   ├── pillars.js       # Life pillar definitions
│   ├── rules.js         # System rules and constraints
│   └── storage.js       # LocalStorage wrapper
└── docs/                # Documentation (added Phase 2+)
    └── 01_repo_and_hosting.md
```

### Rationale
1. **Public vs Src Split**: 
   - `/public` contains browser-executable code
   - `/src` contains module code (follows web project conventions)
   - Both committed separately for clarity

2. **No Build Step**:
   - Modules are plain JavaScript (no transpilation)
   - Direct module imports in app.js
   - Keeps project simple and portable

3. **Assets Folder**:
   - Separates static files from code
   - Plan documentation stored client-side
   - Future images/icons will go here

## Files Created in Phase 1

### Public Files (Browser-Executable)
| File | Purpose | Status |
|------|---------|--------|
| index.html | PWA entry point | Created |
| styles.css | Global styling | Placeholder |
| app.js | Main application logic | Placeholder |
| manifest.json | PWA metadata | Basic template |
| sw.js | Service Worker | Placeholder |
| assets/plan_v1.2.pdf | Project plan | Placeholder |

### Source Modules
| File | Purpose | Status |
|------|---------|--------|
| calendar.js | Week/phase calendar logic | Placeholder |
| crypto.js | Client-side encryption | Placeholder |
| pillars.js | Life pillar definitions | Implemented |
| rules.js | System constraints | Placeholder |
| storage.js | Encrypted storage wrapper | Placeholder |

## Key Design Decisions

### 1. Client-Side First
- No backend server (user requirement)
- All data processing in browser
- No authentication needed
- No telemetry or analytics

### 2. Privacy by Default
- All user data encrypted client-side (crypto.js)
- LocalStorage for persistence
- No cloud storage
- No external API calls

### 3. Offline-First Architecture
- Service Worker enables offline operation
- Works fully offline after first load
- No network dependency
- PWA can be installed locally

### 4. Simple Code Philosophy
- Boring, readable code preferred
- No clever abstractions
- Explicit variable names
- Functional module structure

## Constraints Implemented

### System Rules (Enforced)
1. **Calendar Authority**: Calendar decides week/phase/deload/MATADOR
2. **User Cannot Override**: System rules are immutable
3. **Five Life Pillars**: health, wealth, wisdom, work, relations
4. **No Accounts**: Zero authentication required
5. **No Tracking**: No analytics, no telemetry

## Commit History

```
1. Repository initialization
2-7. Core public files (index.html, styles.css, app.js, manifest.json, sw.js)
8. Assets folder with plan_v1.2.pdf
9-13. Source modules (calendar.js, crypto.js, pillars.js, rules.js, storage.js)
14. Documentation file (01_repo_and_hosting.md)
```

**Total Commits in Phase 1**: 14

## Phase 1 Completion Checklist

- [x] Private GitHub repository created
- [x] Repository named and configured
- [x] Main branch established
- [x] Folder structure created (no renaming)
- [x] Public files created (6 files)
- [x] Source modules created (5 files)
- [x] Assets folder created with plan
- [x] No extra files or folders added
- [x] All commits made to main
- [x] Documentation created

## Next Steps (Phase 2)

### Step 2.1: manifest.json Enhancement
- Configure display mode: "standalone"
- Set proper app name and short name
- Define neutral theme color
- Add placeholder icons
- Test "Add to Home Screen" functionality

### Step 2.2: PWA Basics
- Service Worker caching strategy
- Offline page/fallback
- Icon generation
- Installation testing

## Technical Notes

### No Build System
- Project uses plain HTML/CSS/JavaScript
- No webpack, no Node.js required
- Direct file serving
- Compatible with any static host

### Module Loading
- Modules loaded via `<script>` tags
- No module bundler
- Global namespace usage
- Simple dependency management

### Storage Strategy
- browser localStorage for user data
- Encrypted before storage (crypto.js)
- No database required
- Manual sync via JSON serialization

## References

- Repository: https://github.com/AnandXPraveen/life-os-pwa
- Project Documentation: https://docs.google.com/document/d/1GlfqFcNu2ObdTWKro7i0HhgYb5CM-dTJP4LCU8kK4r0

---

**Status**: Phase 1 Complete
**Version**: 1.0
**Last Updated**: January 1, 2026
