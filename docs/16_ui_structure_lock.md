# UI Structure Lock - STEP 1

**Status**: 100% COMPLETE
**Date**: January 2026
**Phase**: STEP 1 - UI Structure Lock

---

## Objective

Lock the UI structure, visual language, and design system for Life OS PWA without implementing business logic. This step establishes:

- **Fixed DOM hierarchy** (Header / Main / Footer)
- **Locked design tokens** (colors, typography, spacing)
- **Responsive layout** rules
- **Accessibility baseline**

---

## UI Hierarchy (Locked)

```html
<div id="app">
  <header id="app-header">
    <div class="title">Life OS</div>
    <div class="meta">
      <span id="week-day">Week X · Day Y</span>
      <span id="phase-badge">Phase</span>
    </div>
  </header>

  <main id="app-main">
    <section id="today-section">
      <h2>Today</h2>
    </section>

    <section id="pillars-section">
      <h2>Pillars</h2>
    </section>
  </main>

  <footer id="app-footer">
    <button id="export-btn">Export</button>
    <button id="settings-btn">Settings</button>
  </footer>
</div>
```

---

## Design Tokens (Immutable)

### Color Palette

```css
--bg: #0B0C0E;           /* Deep black background */
--surface: #121418;      /* Primary surface */
--surface-2: #181B20;    /* Secondary surface */

--text-primary: #EDEDED;    /* Main text */
--text-secondary: #9AA0A6;  /* Secondary text */
--text-muted: #6B7280;      /* Muted text */

--accent: #4F46E5;       /* Indigo accent */

--success: #22C55E;      /* Green */
--warning: #F59E0B;      /* Amber */
--danger: #EF4444;       /* Red */
```

**Rationale**: Dark mode only, no toggle. Premium feel with high contrast.

### Typography

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
             Roboto, Helvetica, Arial, sans-serif;

--font-size-sm: 12px;
--font-size-base: 14px;
--font-size-lg: 16px;
--font-size-xl: 20px;
--font-size-2xl: 28px;
--font-size-3xl: 36px;

--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.8;
```

**Rationale**: System fonts only. No Google Fonts. Hierarchy through weight and size.

### Spacing Scale

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

**Rationale**: 8px-based scale for consistency.

### Border & Shape

```css
--radius: 14px;      /* Large radius for premium feel */
--radius-sm: 10px;   /* Small radius */
```

### Transitions

```css
--transition-fast: 0.15s ease;      /* 150ms quick */
--transition-normal: 0.2s ease;     /* 200ms standard */
--transition-slow: 0.3s ease;       /* 300ms slow */
```

**Rationale**: No bouncy easing. Subtle and smooth.

---

## Layout Rules (Locked)

### Header

- **Position**: Sticky top
- **Background**: `--surface`
- **Border**: 1px bottom in `--surface-2`
- **Layout**: Flexbox, space-between
- **Padding**: `var(--space-lg) var(--space-md)`
- **Z-index**: 100

**Mobile behavior** (≤768px): Columns, center-aligned, smaller padding

### Main Content

- **Flex**: 1 (fills remaining space)
- **Overflow**: Auto (scrollable)
- **Padding**: `var(--space-lg) var(--space-md)`
- **Sections**: Vertical stack with `margin-bottom: var(--space-2xl)`

**Animation**: Fade-in + subtle translateY on load

### Footer

- **Position**: Sticky bottom
- **Background**: `--surface`
- **Border**: 1px top in `--surface-2`
- **Layout**: Flexbox, flex-end
- **Z-index**: 100
- **Buttons**: Two actions only (Export, Settings)

**Mobile behavior** (≤768px): Stacked vertically, full width buttons

---

## Buttons (Baseline)

```css
background: var(--surface-2);
color: var(--text-primary);
border: none;
padding: var(--space-sm) var(--space-lg);
border-radius: var(--radius-sm);
font-weight: 500;
cursor: pointer;
transition: all var(--transition-fast);

&:hover {
  background: var(--accent);
  color: white;
  transform: translateY(-2px);
}

&:active {
  transform: translateY(0);
}

&:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

---

## Responsiveness

### Tablet (≤768px)

- Header stacks horizontally → vertical
- Footer buttons become full width
- Reduced padding

### Mobile (≤480px)

- Title font: `--font-size-xl`
- Meta font size: 11px
- Section headers: `--font-size-lg`
- Minimal padding

---

## Non-Goals (STEP 1)

🚫 **NOT implemented in this phase**:

- Pillar logic or state management
- Calendar calculations
- MATADOR rules engine
- Weekly decision tracking
- Export functionality (UI only)
- Settings panel (button exists, no logic)
- Drive integration
- Data persistence (wired but not functional)
- Any business logic

These come in subsequent STEP phases.

---

## Files Modified

1. **public/index.html**
   - Locked DOM structure
   - Clean, minimal markup

2. **public/styles.css**
   - Design tokens defined
   - Layout rules
   - Responsive breakpoints
   - Accessibility baseline

3. **public/app.js**
   - DOM initialization
   - Service Worker registration
   - Element setup (placeholders)

---

## Verification Checklist

✅ **UI renders** without white flash
✅ **Header** is sticky and visible
✅ **Main content** is scrollable
✅ **Footer** is sticky and visible
✅ **No console errors**
✅ **Dark mode** enforced
✅ **Mobile responsive** (768px, 480px breakpoints)
✅ **Button interactions** smooth (hover, active states)
✅ **Accessibility** baseline (focus states, semantic HTML)
✅ **No business logic** present

---

## Commits

1. `STEP 1: Lock UI structure with header/main/footer layout`
2. `STEP 1: Create design system with locked CSS tokens and responsive layout`
3. `STEP 1: Update app.js for UI initialization and DOM setup`
4. `DOCS: Create STEP 1 UI structure lock documentation`

---

## Next Steps

**STEP 2** (upcoming): Integrate calendar engine
- Wire week/day metadata
- Connect phase badge to lifecycle
- Add animation triggers

---

## Notes

- This is a **ONE-TIME LOCK**. Design tokens should not change without major architectural decision.
- The UI is a **CRED-like** dark, minimal, premium aesthetic.
- All placeholders (Week X, Day Y, Phase) will be wired in subsequent phases.
- No routes, tabs, drawers, or modals—single page only.
