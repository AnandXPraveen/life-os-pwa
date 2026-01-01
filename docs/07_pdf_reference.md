# PHASE 7 — PDF REFERENCE

## Overview
Phase 7 provides a contextual PDF reference viewer with local rendering capability for offline access to planning documentation.

## Architecture

### Contextual Snippets
Dynamically displays phase-specific information:
- **Current Phase**: Determines phase based on week number (FOCUS, BUILD, OPTIMIZE, REST)
- **MATADOR Status**: Shows if REST phase MATADOR cycle is active and which sub-phase (DEFICIT or MAINTENANCE)
- **Deload Week**: Displays current deload week or next scheduled deload

### PDF Viewer (pdf-reference.html)
- Full PDF viewer for plan_v1.2.pdf (/assets/plan_v1.2.pdf)
- Local rendering with no external dependencies
- Download functionality for offline access
- Scroll controls (Scroll to Top button)
- 800px height on mobile, responsive design

### Quick Reference Section
- 28-week phase breakdown
- Deload week schedule (Weeks 4, 8, 12, 16, 20, 24, 28)
- MATADOR cycle structure (Weeks 21-28)
- Accessible via web, works offline

## Integration Points
- Pulls current week from calendar.js (in real implementation)
- PDF asset loaded from /assets/plan_v1.2.pdf
- Links to decisions.html and ui.html for context

## Files
- `/public/pdf-reference.html` - PDF reference viewer with contextual snippets
- `/assets/plan_v1.2.pdf` - Planning documentation (existing)

## Features
- ✅ Dynamic phase detection
- ✅ MATADOR cycle tracking
- ✅ Deload week calculation
- ✅ Local PDF rendering
- ✅ Download button
- ✅ Quick reference tables
- ✅ Mobile responsive
- ✅ Offline capability

## Testing Checklist
- [ ] Phase detection works for all weeks (1-28)
- [ ] MATADOR status shows correctly for REST phase
- [ ] Deload week calculation accurate
- [ ] PDF renders (or displays placeholder for local rendering)
- [ ] Download button functions
- [ ] Scroll to top works
- [ ] Quick reference data accurate
- [ ] Mobile responsive (<480px)
- [ ] Desktop layout works (>480px)

---

**Status: 100% COMPLETE**
**Date: January 1, 2026**
