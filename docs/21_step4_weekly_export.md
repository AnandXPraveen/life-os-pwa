# STEP 4: Weekly Export (Raw + Summary)

**Objective**: Implement one-tap weekly export generating two JSON files: raw (daily truth) and summary (aggregated counts). No cloud sync, no AI, no UI redesign.

**Status**: In Development
**Files**: src/export.js, app.js (export button wiring)

## Export Purpose

**Raw Export**: Lossless daily data preservation
- Every day in week (or none if absent)
- Full pillar states for each date
- MATADOR context by day
- Use case: Historical audit, data recovery

**Summary Export**: Aggregated weekly metrics
- Pillar completion counts (0-7 per pillar)
- Single MATADOR mode for week
- Use case: NotebookLM analysis, reflection

## Week Boundary (LOCKED)

Monday–Sunday (ISO 8601)

```javascript
function getWeekRange(today = new Date()) {
  const day = today.getDay(); // 0=Sun
  const diffToMonday = (day === 0 ? -6 : 1) - day;

  const start = new Date(today);
  start.setDate(today.getDate() + diffToMonday);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const toISO = d => d.toISOString().slice(0, 10);

  return {
    weekStart: toISO(start),
    weekEnd: toISO(end),
    dates: Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return toISO(d);
    })
  };
}
```

## Raw Export Schema

```json
{
  "_doc": { /* Locked NotebookLM header */ },
  "meta": {
    "schema_version": "1.0",
    "generated_at": "2026-01-05T12:00:00Z",
    "timezone": "Asia/Kolkata",
    "week_index": 1
  },
  "period": {
    "type": "daily_range",
    "start_date": "2026-01-06",
    "end_date": "2026-01-12"
  },
  "plan_context": {
    "phase": "Phase 4",
    "matador": {
      "2026-01-06": "deficit",
      "2026-01-07": "deficit",
      "2026-01-08": null
    }
  },
  "days": {
    "2026-01-06": {
      "Health": true,
      "Career": false,
      "Mind": true,
      "Relationships": true,
      "Finance": false,
      "Environment": true
    },
    "2026-01-07": { ... }
  }
}
```

## Summary Export Schema

```json
{
  "_doc": { /* Locked NotebookLM header */ },
  "meta": {
    "schema_version": "1.0",
    "generated_at": "2026-01-05T12:00:00Z",
    "timezone": "Asia/Kolkata",
    "week_index": 1
  },
  "period": {
    "type": "weekly",
    "week_start": "2026-01-06",
    "week_end": "2026-01-12",
    "week_index": 1
  },
  "plan_context": {
    "phase": "Phase 4",
    "matador": "deficit"
  },
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

## File Naming

Raw: `life-os-raw-week-{weekNumber}.json`
Example: `life-os-raw-week-1.json`

Summary: `life-os-week-{weekNumber}-summary.json`
Example: `life-os-week-1-summary.json`

## Acceptance Criteria

yes Clicking Export downloads TWO JSON files
yes Headers match locked spec exactly
yes Raw export contains daily truth (only days with data)
yes Summary export contains correct counts
yes No console errors
yes Export works offline
yes Week boundary is Monday-Sunday

## Constraints (LOCKED)

no Cloud sync
no Partial exports
no CSV / Markdown / Other formats
no User prompts or confirmations
no Auto-export timers
no Notes or AI output
no Data inference (missing days stay absent)

## Why Raw + Summary Separation

**Raw**: Audit trail. Forensic completeness. No approximation.
**Summary**: Reflection artifact. Consumable by AI. Quick analysis.

Both exist independently. Neither derives from the other.
