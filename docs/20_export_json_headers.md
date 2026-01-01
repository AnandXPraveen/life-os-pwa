# PHASE 10: Export JSON Headers (NotebookLM-Friendly)

**Objective**: Lock stable JSON headers for weekly exports with NotebookLM metadata blocks.

**Status**: Specification Only (No UI, No Logic)
**Files**: src/export-headers.js (constants only)

## Weekly Export Frequency (LOCKED)

- **Export window**: Every Sunday midnight (end of week 7)
- **Format**: JSON with locked `_doc` and `meta` blocks
- **Destination**: Google Drive (Phase 10 Drive-aware export)
- **Manual export**: Available anytime (button in UI)

## Raw Export JSON Structure (LOCKED)

```json
{
  "_doc": {
    "format": "Life OS PWA - Raw Weekly Export",
    "version": "1.0",
    "exportedAt": "2026-01-05T00:00:00Z",
    "weekNumber": 1,
    "period": "2026-01-01 to 2026-01-07"
  },
  "meta": {
    "appVersion": "STEP 3",
    "dataContract": "binary_pillars + daily_states",
    "format": "JSON"
  },
  "data": {
    "week_1": {
      "2026-01-01": {
        "Health": true,
        "Career": false,
        "Mind": true,
        "Relationships": true,
        "Finance": false,
        "Environment": true
      },
      "2026-01-02": {}
    }
  }
}
```

## Summary Export JSON Structure (LOCKED)

```json
{
  "_doc": {
    "format": "Life OS PWA - Weekly Summary",
    "version": "1.0",
    "exportedAt": "2026-01-05T00:00:00Z",
    "weekNumber": 1,
    "period": "2026-01-01 to 2026-01-07"
  },
  "meta": {
    "appVersion": "STEP 3",
    "dataContract": "pillar_aggregates_only",
    "format": "JSON"
  },
  "summary": {
    "week_1": {
      "totalDays": 7,
      "pillars": {
        "Health": { "completed": 6, "percentage": 85.7 },
        "Career": { "completed": 4, "percentage": 57.1 },
        "Mind": { "completed": 7, "percentage": 100 },
        "Relationships": { "completed": 6, "percentage": 85.7 },
        "Finance": { "completed": 3, "percentage": 42.8 },
        "Environment": { "completed": 5, "percentage": 71.4 }
      }
    }
  }
}
```

## Header Stability Rules (LOCKED)

yes `_doc` block NEVER changes structure
yes `meta` block NEVER changes format
yes `exportedAt` updates on each export
yes `weekNumber` increments by week
yes `appVersion` updates on feature completion
yes `dataContract` describes payload format
yes Headers remain consistent across all weeks

## NotebookLM Compatibility

- Headers enable document indexing for NotebookLM
- `_doc` provides metadata for AI context
- `meta` describes data structure for parsing
- JSON structure is machine-readable and stable
- No AI-generated content in exports (data only)

## Implementation Notes

- Headers locked in v1 (no changes without major version bump)
- Weekly export hook: `generateWeeklyExport(weekNumber, pillarData)`
- Manual export reuses same header structure
- Drive sync respects export frequency rules
