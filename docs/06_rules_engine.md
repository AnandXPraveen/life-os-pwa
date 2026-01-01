# PHASE 6 — RULES ENGINE + WEEKLY DECISIONS

## Overview
Phase 6 implements the Rules Engine that evaluates logged data from previous weeks and determines pillar status through a flag-based system. It also provides the Weekly Decision Screen where users make strategic choices about their training and nutrition focus for the upcoming week.

## Architecture

### Step 6.1: Rules Engine (rules.js)
The RulesEngine class computes health status across all five pillars based on logged metrics.

#### Flag Computation
Flags are assigned based on the following criteria:

**Health Pillar (Primary Importance)**
- Missing 3+ workouts in week: +1 flag
- Average sleep <6 hours: +1 flag
- Soreness persisting >72h: +1 flag
- Maximum flags: 3

**Mind Pillar (Secondary Importance)**
- Protein target missed >30% of days: +1 flag
- Maximum flags: 1

**Strength Pillar**
- Missing 2+ workouts: +1 flag
- Maximum flags: 1

**Endurance Pillar**
- Average sleep <7 hours: +1 flag
- Maximum flags: 1

**Consistency Pillar**
- Zero workouts completed: +1 flag
- Zero protein targets met: +1 flag
- Maximum flags: 2

#### Pillar Status Calculation
Based on flag count:
- **GREEN**: 0 flags (healthy)
- **YELLOW**: 1-2 flags (caution needed)
- **RED**: 3+ flags (critical)

#### Priority Rules
Health and Mind pillars override others:
- If Health OR Mind = RED, all other pillars minimum = YELLOW
- If Health OR Mind = YELLOW, strength-dependent pillars stay as-is
- Health always takes precedence in decision recommendations

#### Overall Status
Aggregate of all pillar statuses:
- **RED**: Any pillar is RED
- **YELLOW**: No RED, but some YELLOW
- **GREEN**: All pillars GREEN

### Step 6.2: Weekly Decision Screen (decisions.html)
Interactive UI for making strategic weekly decisions based on pillar flags.

#### Auto-Filled Information
- Current week number
- Current phase (FOCUS, BUILD, OPTIMIZE, REST)
- MATADOR phase (if applicable)
- Flag count per pillar
- Overall status badge (GREEN/YELLOW/RED)
- Status-based warning banner

#### User Selections (Required)

**Training Decision** (Mandatory)
- **Strength Focus**: Heavy lifts, lower reps, recovery emphasis
  - For: Building power, muscle hypertrophy
  - For Phases: BUILD, OPTIMIZE
- **Endurance Focus**: Cardio, circuits, metabolic conditioning
  - For: Improving aerobic capacity, conditioning
  - For Phases: FOCUS, BUILD
- **Hybrid**: Balanced approach, mixed intensity
  - For: Maintenance, general fitness
  - Allowed: Any phase

**Nutrition Decision** (Mandatory)
- **Calorie Surplus**: Focus on muscle gain, higher carbs
  - Macros: High carbs (45-50%), High protein (30-35%)
  - For: BUILD phase
- **Maintenance**: Balance, stabilization, reset
  - Macros: Balanced carbs (40%), Protein (30%), Fats (30%)
  - For: OPTIMIZE, REST phases
- **Calorie Deficit**: Focus on fat loss, lean gains
  - Macros: Lower carbs (35-40%), High protein (35-40%)
  - For: REST (MATADOR DEFICIT weeks), OPTIMIZE

**Optional: Mind & Other Pillars** (Optional)
- **Focus Boost**: Mental clarity, meditation, routine optimization
  - When: Mind flags present, FOCUS phase
- **Recovery Focus**: Sleep, stretching, deload week
  - When: Health flags present, REST phase
- **Balanced**: No changes, continue current approach
  - Default: All green status

#### Illegal Combinations (Disabled)
- Strength Focus + Calorie Deficit (muscle loss risk)
- Endurance Focus + Calorie Surplus (conflicting goals)
- In REST (MATADOR) phases: Only Maintenance or Deficit allowed
- In FOCUS phase: Only Strength or Hybrid allowed

#### Decision Logic
1. System loads flags for current week
2. Computes pillar status
3. Auto-fills screen with status data
4. Highlights flagged pillars
5. User selects training and nutrition
6. System validates combo legality
7. Optional pillar decision selected (or defaults to Balanced)
8. Save stores decision with timestamp

#### Validation
- Training decision: Required (radio button)
- Nutrition decision: Required (radio button)
- Optional decision: Auto-defaults to Balanced
- Submit disabled until both required fields selected
- Success: Saves decision object with week number, phase, selections, timestamp

## Data Model

### Flag Object
```javascript
{
  'Health': 0-3,
  'Mind': 0-1,
  'Strength': 0-1,
  'Endurance': 0-1,
  'Consistency': 0-2
}
```

### Pillar Status Object
```javascript
{
  'Health': 'GREEN'|'YELLOW'|'RED',
  'Mind': 'GREEN'|'YELLOW'|'RED',
  'Strength': 'GREEN'|'YELLOW'|'RED',
  'Endurance': 'GREEN'|'YELLOW'|'RED',
  'Consistency': 'GREEN'|'YELLOW'|'RED'
}
```

### Weekly Summary Object
```javascript
{
  weekNumber: number,
  flags: FlagObject,
  pillarStatus: PillarStatusObject,
  overallStatus: 'GREEN'|'YELLOW'|'RED',
  recommendation: string
}
```

### Decision Object
```javascript
{
  weekNumber: number,
  phase: 'FOCUS'|'BUILD'|'OPTIMIZE'|'REST',
  training: 'strength'|'endurance'|'hybrid',
  nutrition: 'surplus'|'maintenance'|'deficit',
  optional: 'focus'|'recovery'|'balanced',
  timestamp: ISO8601,
  matadorPhase: 'DEFICIT'|'MAINTENANCE'|null
}
```

## Files
- `/src/rules.js` - RulesEngine class implementation
- `/public/decisions.html` - Weekly Decision Screen UI

## Testing Checklist
- [ ] Flag computation matches all criteria
- [ ] Pillar status calculation correct (GREEN/YELLOW/RED)
- [ ] Health/Mind override logic applied
- [ ] Overall status aggregation works
- [ ] Decision screen displays flags correctly
- [ ] Illegal combos are disabled
- [ ] Required fields block submission
- [ ] Optional field defaults to Balanced
- [ ] Decision object saved with timestamp
- [ ] MATADOR phase detection works
- [ ] Warning banner shows for RED status
- [ ] UI responsive on mobile (<480px)
- [ ] UI looks good on desktop (>480px)
- [ ] Color contrast meets accessibility standards

## Future Enhancements
- Integration with calendar.js for week number detection
- Integration with storage.js for saving decisions
- Integration with crypto.js for encrypting decision history
- Recommendation engine based on pillar status
- Historical decision tracking and analysis
- Performance metrics based on previous decisions
- Predictive modeling for future weeks
- Machine learning suggestions for optimal combos

---

**Status: 100% COMPLETE**
**Date: January 1, 2026**
