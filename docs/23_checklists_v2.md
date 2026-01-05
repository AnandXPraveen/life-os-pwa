# V2 Checklists – Pillar Details

## Separation of Signals

- Pillar completion remains a single daily boolean per pillar stored in `lifeos:pillars:YYYY-MM-DD`.
- Checklist details are stored separately per pillar and item in `lifeos:details:YYYY-MM-DD`.
- The UI surfaces both: a high-level pillar checkbox and a per-pillar checklist in a bottom sheet.

## One-Direction Auto-Check Rule

- When all checklist items for a pillar are checked, the pillar is automatically marked complete for that day.
- If any checklist item is later unchecked, the pillar state is not auto-updated and remains under user control.
- **Pillar checkboxes are never auto-unchecked anywhere in the app.**

## Storage Keys

### Pillar Completion (Unchanged)
`lifeos:pillars:YYYY-MM-DD`

```json
{
  "Health": true,
  "Career": false,
  "Mind": false,
  "Relationships": false,
  "Finance": false,
  "Environment": false
}
```

### Checklist Details (New)
`lifeos:details:YYYY-MM-DD`

```json
{
  "Health": {
    "strength": true,
    "conditioning": true,
    "sleep": true,
    "mobility": true,
    "nutrition": true
  },
  "Mind": {
    "study": false,
    "language": false,
    "reading": false
  }
}
```

## Checklist Definitions (Static, Code)

- Located in `/src/checklists.js`
- No storage. No user edits.
- Defines per-pillar items:
  - **Health**: Strength training, Conditioning, Sleep, Mobility, Nutrition
  - **Career**: Primary work block, Deep work
  - **Mind**: Study, Language practice, Reading
  - **Relationships**: Meaningful touchpoint
  - **Finance**: Expense/money review
  - **Environment**: Physical space reset, Digital hygiene

## UX Behavior

1. Tap pillar card → open bottom sheet / modal
2. Show checklist items with checkboxes
3. Footer displays save confirmation: `✓ Saved locally • HH:MM`
4. Pillar checkbox remains visible on the card
5. When all checklist items become true:
   - Pillar auto-checks
   - Small helper text in modal: `✓ All items completed — pillar marked complete`
6. No animations beyond default. No progress bars.

## Export Impact

- Raw export is extended to include `details` for each day:
  ```
  "days": {
    "YYYY-MM-DD": {
      "pillars": { ... },
      "details": { ... }
    }
  }
  ```
- Weekly summary export structure remains **unchanged**:
  - No new fields added to the summary layer.
  - No scoring, percentages, or progress UI introduced.

## Key Constraints (Locked)

- ✗ No pillar auto-uncheck
- ✗ No percentages / scores
- ✗ No editing past days
- ✗ No calendar navigation changes
- ✗ No schema changes to summary export
