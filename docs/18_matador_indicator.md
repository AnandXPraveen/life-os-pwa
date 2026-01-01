# Step 2: MATADOR Indicator (Display-Only)

**Objective:** Introduce MATADOR state visibility in the header badge, display-only for Phase 4.

**Status:** 🔄 In Development  
**Files:** `src/matador.js`, `styles.css`, `app.js`

---

## What is MATADOR?

MAT ADOR (Maintenance-Aware Targeting And Deficit Operational Response) is a **context indicator** that shows the current lifecycle phase and mode during Phase 4 of the 28-week cycle.

### Purpose
- **Visibility**: Users see their current phase mode at a glance
- **Clarity**: Reduces cognitive load by showing explicit state
- **Non-Invasive**: Display-only, no interactions or complex logic in v1

---

## Display Rules (LOCKED)

### When MATADOR Appears
- **Phase 4 ONLY**: active = true
- **Outside Phase 4**: Badge shows "Phase" only (hidden/inactive)

### Mode Cadence (V1 - LOCKED)

| Week(s) | Mode | Color | Meaning |
|---------|------|-------|----------|
| 1-2 | deficit | Amber | Caloric deficit phase |
| 3-4 | maintenance | Green | Maintenance mode |

**Important**: The mode is determined by week number alone, NOT by caloric calculations. This is explicit state, not inferred.

---

## Technical Implementation

### Data Contract

```javascript
state.matador = {
  active: boolean,      // false outside Phase 4
  mode: string | null   // 'deficit' | 'maintenance' | null
};
```

### Source of Truth: `src/matador.js`

```javascript
export function getMatadorState(phase, weekInPhase) {
  if (phase !== 'Phase 4') {
    return { active: false, mode: null };
  }
  const mode = (weekInPhase <= 2) ? 'deficit' : 'maintenance';
  return { active: true, mode };
}
```

### CSS Styling (Header Badge)

```css
.matador-deficit {
  background: rgba(245, 158, 11, 0.15);  /* Amber with low opacity */
  color: var(--warning);
}

.matador-maintenance {
  background: rgba(34, 197, 94, 0.15);   /* Green with low opacity */
  color: var(--success);
}
```

### Display in Header

```javascript
const matador = getMatadorState(state.phase, state.weekInPhase);
state.matador = matador;

const badge = document.getElementById('phase-badge');

if (matador.active) {
  badge.textContent = `MATADOR: ${matador.mode.toUpperCase()}`;
  badge.classList.add(`matador-${matador.mode}`);
} else {
  badge.textContent = state.phase;  // Revert to phase badge
}
```

---

## Where MATADOR Does NOT Appear

✗ NOT in the Today list (no per-item badge)  
✗ NOT per pillar (no pillar-level indicator)  
✗ NOT in settings (no toggles or configuration)  
✗ NOT in export selection UI  
✗ NOT with animations or icons  
✗ NOT with interactions or click handlers  

---

## Export Integration

**Weekly export includes** (read-only field):

```json
{
  "week": 1,
  "phase": "Phase 4",
  "matador": "deficit",
  ...
}
```

**Important**: `matador` field is informational only. It provides context for exported data but does NOT affect export logic or user interactions.

---

## Acceptance Criteria

- ✅ MATADOR badge appears ONLY in Phase 4
- ✅ Badge text correct: "MATADOR: DEFICIT" or "MATADOR: MAINTENANCE"
- ✅ Colors reflect mode (amber = deficit, green = maintenance)
- ✅ Outside Phase 4 → badge shows "Phase" only
- ✅ No console errors
- ✅ No interactions (v1 display-only)
- ✅ Export includes matador field
- ✅ No UI clutter or layout shifts

---

## Future Enhancements (NOT v1)

- Integration with caloric calculations (v2)
- Smart mode transitions based on data (v2)
- Pillar-level context (v3)
- Historical MATADOR tracking (v3)
- Export filtering by MATADOR mode (v3)

---

## Files Modified

- **src/matador.js** (new): State helper functions
- **styles.css**: MATADOR badge styling classes
- **app.js**: Import matador helpers, wire state in DOMContentLoaded

---

## Non-Goals (Explicit)

❌ Adding logic to determine mode (locked at v1)  
❌ Interactions, buttons, or toggles  
❌ Animations or visual effects  
❌ Settings panel for MATADOR configuration  
❌ Export filtering or data transformation  
❌ Calendar integration beyond phase/week  
