# PHASE 10 — Drive-Aware Export Automation

## Overview
Phase 10 implements automated weekly export generation with Google Drive integration. The app generates markdown exports automatically and saves them to a user-selected folder that syncs to Google Drive via Android File Sync or similar local sync mechanisms.

## Architecture

### No API Integration
- **NO OAuth** - No token-based authentication required
- **NO Google APIs** - No direct API calls
- **NO server-side** - Everything client-side
- User manually selects export folder path once
- App remembers path via localStorage

### Export Format
- **Markdown (.md)** files
- **Weekly format:** `week-{weekNumber}-phase-{phase}-{YYYY-MM-DD}.md`
- **Content:** Phase, MATADOR, flags per pillar, decisions taken

## Implementation Details

### Step 10.1 — Export Target Selection
```javascript
// User selects folder (one-time)
const folderPath = await selectFolder();
localStorage.setItem('exportFolder', folderPath);
```

**User Flow:**
1. First app open → system asks for export folder location
2. User navigates to `/My Drive/LifeOS_Exports/` (or custom folder)
3. App stores path in localStorage
4. All future exports save to this path automatically

### Step 10.2 — Scheduled Export Logic
```javascript
// At app initialization
if (today >= nextExportDate && !exportedToday) {
  const exportContent = generateWeeklyMarkdown();
  saveToLocalFolder(exportContent, exportFolder);
  showBadge('Exported to Drive');
  nextExportDate = calculateNextExportDate();
}
```

**Timing:**
- Checks on app open
- Exports only once per scheduled date
- Uses `lastExportDate` to prevent duplicates

### Step 10.3 — File Structure in Export Folder
```
/My Drive/LifeOS_Exports/
├── week-1-phase-loading-2025-01-06.md
├── week-2-phase-building-2025-01-13.md
├── week-3-phase-testing-2025-01-20.md
└── ...
```

**Metadata in each file:**
- Week number
- Phase (Loading/Building/Testing/etc.)
- MATADOR status
- Flag counts per pillar
- Decisions made
- Export timestamp

## Privacy & Security

✅ **Privacy Preserved:**
- No data sent to servers
- No authentication required
- No tracking
- Local folder path stored only in localStorage
- Files written directly to filesystem via File API

✅ **Drive Sync:**
- Android handles automatic sync to Google Drive
- Desktop users: Drag folder into Drive or use Drive Sync app
- App doesn't manage sync—delegation to OS

## Integration with NotebookLM

**Post-Export Workflow (Human Step):**
1. Open NotebookLM
2. Create or update source → Point to folder: `/My Drive/LifeOS_Exports/`
3. New week's .md file automatically visible
4. NO re-uploading required—NotebookLM reads live
5. Ask NotebookLM to analyze: "Summarize this week's decisions"

## Related Files
- `/src/export.js` - Export generation logic
- `/src/storage.js` - localStorage management
- `/public/index.html` - Folder selection UI (if needed)

## Future Enhancements
- Scheduled export on specific days/times
- Export format options (CSV, JSON)
- Batch PDF generation
- Email notification on export
