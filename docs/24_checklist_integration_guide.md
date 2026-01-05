# V2 Checklist Integration Guide

## Overview

This guide explains how to integrate the V2 checklist modules (checklists.js and details.js) into the existing app.js, pillars.js, and export.js.

---

## STEP C — Auto-Check Logic Integration (app.js)

Add the following function to wire the checklist toggle handler:

### Imports (at top of app.js)

```javascript
import { CHECKLISTS } from './src/checklists.js';
import { loadDetails, saveDetails, todayKey } from './src/details.js';
import { getPillarState, updatePillarState } from './src/pillars.js';
```

### Toggle Handler Function

Add this function in app.js (e.g., in the pillar interaction section):

```javascript
function onChecklistToggle(pillar, itemId, checked) {
  const date = todayKey();
  const details = loadDetails(date);
  details[pillar] = details[pillar] || {};
  details[pillar][itemId] = checked;
  saveDetails(details, date);

  // Auto-check rule: if all items true, pillar auto-checks
  const allDone = CHECKLISTS[pillar]
    .every(i => details[pillar]?.[i.id] === true);

  if (allDone) {
    updatePillarState(date, pillar, true); // one-direction: only auto-check
  }

  showSavedTimestamp(); // updates "✓ Saved locally • HH:MM"
}
```

### Key Points

- Only calls `updatePillarState(..., true)` when all items are checked.
- **Never** calls `updatePillarState(..., false)` — preserves user control.
- `showSavedTimestamp()` updates the modal footer with current time.

---

## STEP D — Modal Rendering (pillars.html + app.js)

### Modal Structure (pillars.html)

Add a bottom-sheet modal template to pillars.html:

```html
<div id="checklist-modal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="modal-pillar-title"></h2>
      <button class="modal-close">&times;</button>
    </div>

    <div class="modal-body">
      <div id="checklist-items-container"></div>
      <div id="all-done-helper" class="helper-text" style="display: none;">
        ✓ All items completed — pillar marked complete
      </div>
    </div>

    <div class="modal-footer">
      <span id="saved-timestamp">✓ Saved locally • --:--</span>
    </div>
  </div>
</div>
```

### Modal Open/Close (app.js)

```javascript
function openChecklistModal(pillar) {
  const date = todayKey();
  const details = loadDetails(date);
  const modal = document.getElementById('checklist-modal');
  const container = document.getElementById('checklist-items-container');
  const title = document.getElementById('modal-pillar-title');
  const helperText = document.getElementById('all-done-helper');

  title.textContent = pillar;
  container.innerHTML = '';

  const pillarDetails = details[pillar] || {};

  CHECKLISTS[pillar].forEach(item => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${item.id}`;
    checkbox.checked = pillarDetails[item.id] === true;
    checkbox.onchange = (e) => onChecklistToggle(pillar, item.id, e.target.checked);

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = item.label;

    const div = document.createElement('div');
    div.appendChild(checkbox);
    div.appendChild(label);
    container.appendChild(div);
  });

  // Show helper text if all done
  const allDone = CHECKLISTS[pillar].every(i => pillarDetails[i.id] === true);
  helperText.style.display = allDone ? 'block' : 'none';

  modal.style.display = 'block';
  updateSavedTimestamp();
}

function closeChecklistModal() {
  document.getElementById('checklist-modal').style.display = 'none';
}
```

### Saved Timestamp Function

```javascript
function showSavedTimestamp() {
  updateSavedTimestamp();
}

function updateSavedTimestamp() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('saved-timestamp').textContent = `✓ Saved locally • ${timeStr}`;
}
```

### Wire Modal to Pillar Cards

Update pillar card click handlers to open the modal:

```javascript
// For each pillar card, add:
card.addEventListener('click', () => openChecklistModal(pillarName));
```

Close modal on close button click:

```javascript
document.querySelector('.modal-close').addEventListener('click', closeChecklistModal);
```

---

## STEP E — Export Integration (export.js)

Extend the raw export to include details.

### Update Export Function

In the function that builds the export JSON (likely in export.js):

```javascript
import { loadDetails } from './src/details.js';

// In the export generation loop:
const exportData = {
  days: {}
};

for (const date of allDates) {
  const pillarState = getPillarState(date); // existing
  const details = loadDetails(date); // new

  exportData.days[date] = {
    pillars: pillarState,
    details: details // raw checklist items
  };
}

// Rest of export logic unchanged
```

### Key Points

- Raw export JSON gains `details` field per day.
- Weekly summary **remains unchanged** — no new fields.
- Scoring/aggregation is never added.

---

## Testing Checklist

- [ ] checklists.js loads without errors
- [ ] details.js loadDetails() and saveDetails() work
- [ ] onChecklistToggle() saves to localStorage correctly
- [ ] Modal opens on pillar card click
- [ ] Checkboxes in modal toggle correctly
- [ ] "Saved locally" timestamp updates
- [ ] All items checked → pillar auto-checks
- [ ] Unchecking an item doesn't auto-uncheck pillar
- [ ] Export JSON includes details field
- [ ] Weekly summary export unchanged

---

## File Locations

- Module definitions: `/src/checklists.js`, `/src/details.js`
- Integration: `/src/app.js`, `/src/pillars.js`
- Export logic: `/src/export.js`
- UI: `/pillars.html`
- Docs: `/docs/23_checklists_v2.md` (specification)
