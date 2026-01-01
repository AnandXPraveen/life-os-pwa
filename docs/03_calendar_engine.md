# PHASE 3 — CALENDAR & PHASE ENGINE

## Overview
Life OS PWA uses a **hardcoded 28-week cycle** system that determines all user progression. The calendar engine is immutable and cannot be overridden by users. This ensures the system structure remains constant across all sessions.

## Phase Structure
The 28-week cycle repeats indefinitely and is divided into 4 phases:

### Phase 1 — FOCUS (Weeks 1-4)
- **Duration:** 4 weeks
- **Purpose:** Establish foundational habits and focus
- **Deload:** Week 4 (recovery week)
- **Characteristics:** Intensive foundation-building phase

### Phase 2 — BUILD (Weeks 5-12)
- **Duration:** 8 weeks
- **Purpose:** Progressive skill and strength development
- **Deload:** Weeks 8, 12 (recovery weeks)
- **Characteristics:** Building phase with structured progression

### Phase 3 — OPTIMIZE (Weeks 13-20)
- **Duration:** 8 weeks
- **Purpose:** Refine techniques and maximize efficiency
- **Deload:** Weeks 16, 20 (recovery weeks)
- **Characteristics:** Optimization and perfection phase

### Phase 4 — REST + MATADOR (Weeks 21-28)
- **Duration:** 8 weeks
- **Purpose:** Recovery and metabolic cycling
- **Deload:** Weeks 24, 28 (recovery weeks)
- **Includes MATADOR cycle** (see below)

## MATADOR Cycle (Phase 4 Only)
MATADOR (Maintenance And Then Adaptation Diet Or Rationing) alternates caloric states for optimal fat loss:

- **Weeks 21-22: DEFICIT** - Reduce calories by 300-500 for fat loss
- **Weeks 23-24: MAINTENANCE** - Maintain current weight, metabolic reset
- **Weeks 25-26: DEFICIT** - Second deficit round for additional fat loss
- **Weeks 27-28: MAINTENANCE** - Final metabolic reset before cycle repeats

Rationale: Alternating deficit/maintenance prevents metabolic adaptation

## Deload Weeks
Every 4th week is a **deload week** (reduced intensity recovery):
- Week 4 (Phase 1)
- Week 8, 12 (Phase 2)
- Week 16, 20 (Phase 3)
- Week 24, 28 (Phase 4)

## Calendar Immutability
**KEY PRINCIPLE:** The calendar is **hardcoded and unchangeable**. Users cannot:
- Skip phases
- Extend phases
- Override deload weeks
- Modify MATADOR cycle
- Change week assignments

This is intentional. The system controls the user, not vice versa.

## API Reference

### getWeekNumber(today: Date): number
Returns current week number (1-28) based on date.

### getPhase(week: number): string
Returns phase name for given week: 'FOCUS' | 'BUILD' | 'OPTIMIZE' | 'REST'

### isDeloadWeek(week: number): boolean
Returns true if week is a deload (recovery) week.

### getMatadorState(week: number): string | null
Returns MATADOR state for Phase 4 weeks: 'deficit' | 'maintenance' | null

### getCalendarInfo(today: Date): object
Returns complete calendar state: {week, phase, isDeload, matadorState, timestamp}

## Testing
Run tests: `console.log` output in browser console
Test file: `/src/calendar.test.js`

## Files
- `/src/calendar.js` - Calendar engine (183 lines)
- `/src/calendar.test.js` - Test cases
- `/docs/03_calendar_engine.md` - This documentation

---
**Status:** 100% COMPLETE | **Date:** January 1, 2026
