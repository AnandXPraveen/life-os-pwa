# PHASE 5 — CORE UI

## Overview
Phase 5 implements the primary user interface with two distinct screens: Today (read-only display) and Log (data entry). The UI is clean, minimal, and focused on essential tracking without unnecessary complexity.

## Architecture

### Today Screen (Read-Only)
The Today screen displays current context information derived from the Calendar Engine and Storage Layer.

**Display Elements:**

**Week Information**
- Current week number (1-28)
- Phase name (FOCUS, BUILD, OPTIMIZE, REST)
- Phase color/badge for visual identification
- Example: "Week 8 - PHASE 2 BUILD"

**Status Indicator**
- Deload status (Yes/No)
- Deload type if applicable (Recovery Week)
- MATADOR status for Phase 4 (Deficit/Maintenance)
- Example: "Deload: Week 8 (Recovery)"

**Activity Type**
- Today's activity: GYM, FOOTBALL, or REST
- Activity focus description
- Example: "Gym - Strength Building"

**Nutrition Bias**
- Nutritional focus for the day
- Caloric target or macronutrient emphasis
- Example: "High Protein - Target: 150g+ protein"

**Log Today Button**
- Primary action button
- Only interactive element on Today screen
- Opens Log Screen when clicked
- Clear visual hierarchy

### Log Screen (Data Entry)
The Log screen is a modal interface for recording daily metrics. All inputs are toggles or numeric fields.

**Fitness Section**

**Workout Done Toggle**
- Binary: Yes/No
- Purpose: Track workout completion
- Default: Off
- Visual: Toggle switch with blue active state

**Football Intensity Toggle**
- Binary: Yes/No
- Purpose: Track football/sports participation
- Default: Off
- Visual: Toggle switch with blue active state
- Note: Only relevant for FOOTBALL activity days

**Nutrition Section**

**Protein Met Toggle**
- Binary: Yes/No
- Purpose: Track daily protein goal achievement
- Default: Off
- Visual: Toggle switch with blue active state
- Target: Varies by phase and body composition

**Sleep Hours Input**
- Type: Numeric (0-24, 0.5 increments)
- Purpose: Track sleep duration
- Default: 7.0 hours
- Visual: Number input field
- Range: 0-24 hours

**Recovery Section**

**Soreness >72h Toggle**
- Binary: Yes/No
- Purpose: Track persistent muscle soreness
- Default: Off
- Visual: Toggle switch with blue active state
- Significance: Indicates recovery issues or overtraining

**Action Buttons**
- **Save Log**: Submits data and closes Log Screen
- **Cancel**: Closes Log Screen without saving
- Secondary Cancel button has neutral gray styling

## Data Flow

### Input Collection
```
Log Screen
  → toggleSwitch()
    → classList.toggle('active')
    → Visual state change

  → submitLog()
    → Collect toggle states
    → Collect numeric input
    → Create logData object
    → Console.log for debugging
    → Storage layer (Phase 4)
    → Return to Today screen
```

### Data Structure
```javascript
const logData = {
  workoutDone: boolean,
  footballIntensity: boolean,
  proteinMet: boolean,
  sleepHours: number (0-24),
  soreness72h: boolean,
  timestamp: ISO 8601 datetime
}
```

## UI Components

### Display Section
- Label (uppercase, gray, small)
- Value (larger, bold)
- Info badge (blue background, small)
- Separator line (light gray)

### Toggle Switch
- Width: 50px, Height: 28px
- Background: Gray (off) / Blue (on)
- Circular indicator: White ball
- Smooth animation: 0.3s transition
- Hover effect: Light gray background

### Numeric Input
- Label on left
- Input field on right (60px width)
- Minimum: 0
- Maximum: 24
- Step: 0.5
- Bordered: Light gray

### Buttons
- Full width of container
- Padding: 14px
- Primary: Blue (#007AFF)
- Secondary: Gray
- Hover: Darker shade
- Font-weight: 600
- Border radius: 8px

## Responsive Design

**Container Width**
- Maximum: 480px (mobile-first)
- Padding: 16px on mobile
- Centered on larger screens

**Typography**
- Base font: System stack (San Francisco, Segoe UI)
- Title: 18px, bold
- Label: 12px, uppercase
- Value: 16px, medium weight
- Body: 14px

**Colors**
- Primary: #007AFF (iOS blue)
- Background: #f5f5f5 (light gray)
- Text: #333 (dark gray)
- Borders: #eee (very light gray)
- Badges: #e7f3ff (light blue background)

## Screen Transitions

**Today → Log**
- "Log Today" button click
- Today screen hidden (display: none)
- Log screen displayed
- Focus on first toggle

**Log → Today**
- Save button: Collects data, returns to Today
- Cancel button: Discards data, returns to Today

## Files
- `/public/ui.html` - Complete UI implementation (330+ lines)
- `/docs/05_core_ui.md` - This documentation

## Implementation Details

**Inline Styling**
- No external CSS files
- All styles in `<style>` tag
- Allows standalone testing
- Future: Extract to separate stylesheet

**Vanilla JavaScript**
- No framework dependencies
- Event delegation for toggles
- Simple state management
- Console logging for debugging

**Accessibility**
- Semantic HTML labels
- Form inputs with proper attributes
- Color not only differentiator (toggle indicator)
- Readable font sizes
- Sufficient contrast ratios

## Testing Checklist

- [ ] Today screen displays correctly
- [ ] All display values visible
- [ ] Log Today button opens Log screen
- [ ] Toggle switches work (click to activate)
- [ ] Visual feedback on toggle activation
- [ ] Sleep hours input accepts numeric values
- [ ] Save button collects all data
- [ ] Cancel button closes without saving
- [ ] UI responsive on mobile (< 480px)
- [ ] UI looks good on desktop (> 480px)
- [ ] Colors meet contrast requirements
- [ ] Touch targets adequate for mobile (44px+)

## Future Enhancements

- Integration with Calendar Engine (display actual week/phase)
- Integration with Storage Layer (save logs)
- Integration with CryptoEngine (encrypt logs before saving)
- Activity selection (Gym/Football/Rest)
- Historical data visualization
- Weekly summary statistics
- Settings/preferences panel
- Dark mode support

---
**Status**: 100% COMPLETE | **Date**: January 1, 2026
