# Life OS PWA

> A Progressive Web App for holistic life management using 28-week lifecycles and evidence-based decision systems.

## 🚀 Live Demo

**[Visit Life OS PWA](https://anandxpraveen.github.io/life-os-pwa/)**

## 📋 Overview

Life OS PWA is a comprehensive personal operating system built as a Progressive Web App. It helps users structure their lives across 8 core pillars using a 28-week lifecycle system, with evidence-based rules engine for decision-making.

### Core Features

- **28-Week Lifecycle System**: Divide your year into manageable 4-week cycles
- **8 Life Pillars**: Health, Wealth, Relationships, Career, Personal Growth, Recreation, Spirituality, Legacy
- **Rules Engine**: Evidence-based decision framework for consistent life direction
- **End-to-End Encryption**: All personal data encrypted with Web Crypto API
- **Offline-First**: Works completely offline with Service Worker caching
- **PDF Reference System**: Store and access personal reference documents
- **Drive-Aware Export**: Sync data to Google Drive (coming soon)

## 📁 Project Structure

```
life-os-pwa/
├── public/                 # Deployed files for GitHub Pages
│   ├── index.html         # Main app entry point
│   ├── app.js             # App initialization & DOM rendering
│   ├── styles.css         # Global styles
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service Worker (offline support)
│   ├── ui.html            # Phase 5: Dashboard & Core UI
│   ├── decisions.html     # Phase 6: Weekly Decision Screen
│   ├── pillars.html       # Phase 8: Life Pillars Interface
│   ├── pdf-reference.html # Phase 7: PDF Viewer
│   └── assets/            # Images & static files
├── src/                    # Source modules (symlinked to public)
│   ├── calendar.js        # Phase 3: 28-week calendar engine
│   ├── calendar.test.js   # Calendar tests
│   ├── rules.js           # Phase 6: Rules engine logic
│   ├── pillars.js         # Phase 8: Pillar management
│   ├── crypto.js          # Phase 4: Web Crypto encryption
│   ├── storage.js         # Phase 4: IndexedDB storage layer
│   └── export.js          # Phase 10: Drive export engine
├── docs/                   # Documentation
│   ├── 01_repo_and_hosting.md
│   ├── 02_pwa_basics.md
│   ├── 03_calendar_engine.md
│   ├── 04_encryption_and_storage.md
│   ├── 05_core_ui.md
│   ├── 06_rules_engine.md
│   ├── 07_pdf_reference.md
│   ├── 08_other_pillars.md
│   ├── 11_drive_automation.md
│   ├── 12_pages_deployment.md
│   └── 13_blank_screen_root_cause.md
└── README.md              # This file
```

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Storage**: IndexedDB (offline-first)
- **Encryption**: Web Crypto API (AES-256-GCM)
- **PWA**: Service Workers, Web Manifest
- **Deployment**: GitHub Pages
- **Hosting**: GitHub (main branch → Pages)

## 📚 Project Phases

### ✅ Completed Phases (1-4)

1. **Phase 1**: Repository Setup & GitHub Pages Hosting
   - GitHub repo created and configured
   - GitHub Pages deployed from /public root
   - Custom domain support ready

2. **Phase 2**: PWA Basics
   - Manifest.json with app configuration
   - Service Worker implementation
   - Offline-first caching strategy
   - Install prompts & app icons

3. **Phase 3**: Calendar Engine
   - 28-week lifecycle system
   - Phase calculations and tracking
   - Milestone management

4. **Phase 4**: Encryption & Storage
   - End-to-end encryption with Web Crypto API
   - AES-256-GCM symmetric encryption
   - IndexedDB storage layer
   - Secure key derivation (PBKDF2)

### ✅ Completed Phases (5-8)

5. **Phase 5**: Core UI Components
   - Dashboard layout
   - Navigation system
   - Responsive design

6. **Phase 6**: Rules Engine
   - Decision logic framework
   - Weekly decision tracking
   - Rule evaluation system

7. **Phase 7**: PDF Reference
   - PDF viewing capability
   - Personal document storage
   - Reference management

8. **Phase 8**: Other Life Pillars
   - Support for 8 life pillars
   - Pillar-specific tracking
   - Cross-pillar insights

### ✅ Completed Phase 10

10. **Phase 10**: Drive-Aware Export
    - Google Drive integration (manual selection only)
    - Scheduled sync functionality
    - No OAuth, no API calls required
    - Android Drive sync support

### ⏳ In Progress / Planned

9. **Phase 9**: Advanced Features & Optimizations
   - Performance optimizations
   - Advanced analytics
   - UI/UX improvements

## 🔧 Getting Started

### Prerequisites
- Modern web browser with PWA support (Chrome, Firefox, Safari, Edge)
- Internet connection for initial load (then works offline)

### Installation

1. **Visit the app**: [https://anandxpraveen.github.io/life-os-pwa/](https://anandxpraveen.github.io/life-os-pwa/)
2. **Install as PWA**:
   - Click the install icon in your browser
   - Or: Menu → "Install app" or "Add to Home Screen"
3. **Use offline**: App works completely offline once installed

### Development Setup

```bash
# Clone repository
git clone https://github.com/AnandXPraveen/life-os-pwa.git
cd life-os-pwa

# No build step needed - vanilla JS
# Serve public/ folder with any HTTP server
python -m http.server 8000
# or
npx http-server public/

# Visit http://localhost:8000
```

## 📖 Documentation

For detailed information about each phase, see the [docs/](./docs/) folder:

- [Phase 1: Repository & Hosting](./docs/01_repo_and_hosting.md)
- [Phase 2: PWA Basics](./docs/02_pwa_basics.md)
- [Phase 3: Calendar Engine](./docs/03_calendar_engine.md)
- [Phase 4: Encryption & Storage](./docs/04_encryption_and_storage.md)
- [Phase 5: Core UI](./docs/05_core_ui.md)
- [Phase 6: Rules Engine](./docs/06_rules_engine.md)
- [Phase 7: PDF Reference](./docs/07_pdf_reference.md)
- [Phase 8: Other Pillars](./docs/08_other_pillars.md)
- [Phase 10: Drive Automation](./docs/11_drive_automation.md)
- [Blank Screen Root Cause Analysis](./docs/13_blank_screen_root_cause.md)

## 🔒 Security & Privacy

- **End-to-End Encrypted**: All data encrypted before storage
- **Zero Knowledge**: No server-side data storage
- **Offline-First**: No mandatory cloud sync
- **Web Crypto API**: Industry-standard encryption
- **Open Source**: Code transparency for security review

## 📊 Repository Statistics

- **Total Commits**: 47+
- **Languages**: JavaScript (93.1%), HTML (4.6%), CSS (2.3%)
- **Files**: 16+
- **Documentation**: 13 detailed guides

## 🤝 Contributing

This is a personal project, but feel free to fork and adapt for your own use.

## 📝 License

MIT License - See repository for details

## 🎯 Roadmap

- [ ] Phase 9: Advanced features & optimizations
- [ ] Mobile app wrapper (React Native / Flutter)
- [ ] Multi-device sync (P2P)
- [ ] AI-powered insights
- [ ] Community features
- [ ] Analytics dashboard

## 📞 Support

For issues, bugs, or feature requests, please create an issue in the GitHub repository.

---

**Built with ❤️ for holistic life management**
