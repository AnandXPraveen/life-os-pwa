# File Consolidation

## Overview
As part of the repository cleanup and simplification, all deployment files have been consolidated from `/public` to the root directory. This eliminates redundancy and improves the repository structure.

## What Changed

### Files Moved to Root
The following files were copied from `/public` to the root of the repository:
- `decisions.html` - Weekly decision screen
- `pdf-reference.html` - PDF reference viewer
- `pillars.html` - Life pillars tracking interface
- `ui.html` - Core UI prototype
- `assets/` folder - Contains reference assets (plan_v1.2.pdf)

### Why Consolidation?
- **Simpler Repository Structure**: Reduces unnecessary folder nesting
- **Direct Root Access**: Files are immediately available at the root, matching GitHub Pages serving
- **Reduced Redundancy**: Eliminates duplicate file copies
- **Streamlined Deployment**: All served files are in one location

## Repository Structure After Consolidation

```
life-os-pwa/
├── docs/                  # Documentation files (phases 1-10)
├── src/                   # Source JavaScript modules
├── assets/                # Static assets (PDFs, icons, etc.)
├── app.js                 # Main application entry point
├── decisions.html         # Decisions screen
├── index.html             # Main application
├── manifest.json          # PWA manifest
├── pdf-reference.html     # PDF reference viewer
├── pillars.html           # Pillars interface
├── styles.css             # Global styles
├── sw.js                  # Service Worker
├── ui.html                # UI prototype
└── README.md              # Project overview
```

## Deprecation Note
The `/public` folder is now **deprecated** and should be deleted. All deployed files are now accessible from the root directory. GitHub Pages will serve these files directly from the main branch.

## Migration Steps Completed
1. ✅ Copied all HTML files to root
2. ✅ Prepared assets folder structure in root
3. ⏳ Delete `/public` folder (manual cleanup via command line or subsequent commits)

## Next Steps
To complete the consolidation:
1. Run `git rm -r public/` to remove the deprecated folder
2. Commit with message: `cleanup: remove deprecated /public folder`
3. Verify GitHub Pages deployment from root files
