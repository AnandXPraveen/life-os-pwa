# Step 5 — Google Drive Storage Workflow

## Objective
Ensure weekly exports can be reliably stored in Google Drive with zero app authentication.

---

## Section 1 — Why No Drive API

### Privacy
- Zero credentials embedded in the app
- User maintains complete data custody
- No server-side logging or analytics
- No tracking of export patterns

### Offline-First Guarantee
- Export works completely offline
- No network requirement for export logic
- Manual Drive upload is always optional
- User chooses sync timing

### Security
- Web Crypto encryption remains uncompromised
- No OAuth tokens in localStorage
- No API keys in code repositories
- User-managed file permissions via Drive's native UI

---

## Section 2 — Folder Structure (LOCKED)

All weekly exports follow this exact structure in Google Drive:

```
Life-OS/
  └─ Exports/
     └─ Weekly/
        ├─ life-os-raw-week-01.json
        ├─ life-os-week-01-summary.json
        ├─ life-os-raw-week-02.json
        ├─ life-os-week-02-summary.json
        └─ ... (continues for all weeks)
```

### Naming Convention
- **Raw export**: `life-os-raw-week-{weekNumber}.json`
- **Summary export**: `life-os-week-{weekNumber}-summary.json`
- Week numbers range 01–28 per 28-week cycle
- Example: Week 5 produces:
  - `life-os-raw-week-05.json`
  - `life-os-week-05-summary.json`

---

## Section 3 — Android Phone Workflow

### Prerequisites
- Life OS PWA installed on Android device
- Google Drive app installed

### Step-by-Step
1. Open Life OS app on phone
2. Tap **Export** button
3. Two JSON files are downloaded:
   - `life-os-raw-week-XX.json`
   - `life-os-week-XX-summary.json`
4. Open **Google Drive** app
5. Navigate to **Life-OS/Exports/Weekly**
   - Create folders if they don't exist
6. Tap **+** (Create) → **Upload**
7. Select both JSON files
8. Tap **Open** to upload
9. Files are now synced to Drive

### Helper Text in App (UI)
"After export, save both files to your Google Drive → Life-OS/Exports/Weekly"

---

## Section 4 — Desktop Workflow (Windows / Mac / Linux)

### Prerequisites
- Chrome, Firefox, Safari, or Edge with PWA support
- Google Drive web access (drive.google.com)

### Step-by-Step
1. Open Life OS PWA in browser
2. Click **Export** button
3. Both JSON files download to default Downloads folder
4. Open **Google Drive** (drive.google.com)
5. Navigate to **Life-OS/Exports/Weekly** (create if needed)
6. Click **+ New** → **File upload**
7. Select both JSON files from Downloads
8. Files are now stored in Drive

### Optional: Desktop Sync
- Use Google Drive desktop app for automatic folder sync
- Configure `~/GoogleDrive/Life-OS/Exports/Weekly` as sync target
- Drag downloaded JSONs into synced folder
- Automatic upload to cloud

---

## Section 5 — Export File Format Guarantee

Both JSON files remain in their original schema:

### Raw Export Header
```json
{
  "schema_version": "1.0",
  "generated_at": "2026-01-05T12:00:00Z",
  "timezone": "Asia/Kolkata",
  "week_number": 1,
  "period": {
    "type": "weekly",
    "week_start": "2026-01-06",
    "week_end": "2026-01-12",
    "week_index": 1
  },
  "data": { ... }
}
```

### Summary Export Header
```json
{
  "schema_version": "1.0",
  "generated_at": "2026-01-05T12:00:00Z",
  "period": { ... },
  "pillars": {
    "Health": 6,
    "Career": 4,
    "Mind": 7,
    "Relationships": 6,
    "Finance": 3,
    "Environment": 5
  }
}
```

**No modifications to file structure are made by Drive storage.**

---

## Acceptance Criteria

- ☐ No Drive credentials embedded in code
- ☐ Export logic works completely offline
- ☐ Both JSON files land unchanged in Drive
- ☐ Folder structure is user-readable and consistent
- ☐ Workflow documented for both phone and desktop
- ☐ Helper text displays non-intrusively in UI
