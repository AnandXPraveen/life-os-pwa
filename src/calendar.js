/**
 * Calendar Engine for Life OS PWA
 * Determines week number, phases, deload weeks, and MATADOR states
 * All logic is hardcoded - no user override possible
 */

/**
 * PHASE STRUCTURE (52 weeks/year)
 * Phase 1 (FOCUS): Weeks 1-4 (4 weeks)
 * Phase 2 (BUILD): Weeks 5-12 (8 weeks)
 * Phase 3 (OPTIMIZE): Weeks 13-20 (8 weeks)
 * Phase 4 (REST): Weeks 21-28 (8 weeks) - includes MATADOR cycles
 * Then repeats: Weeks 29-52 follow same pattern
 */

const PHASES = {
  FOCUS: 'FOCUS',
  BUILD: 'BUILD',
  OPTIMIZE: 'OPTIMIZE',
  REST: 'REST'
};

const MATADOR_STATES = {
  DEFICIT: 'deficit',
  MAINTENANCE: 'maintenance'
};

/**
 * PHASE MAPPING (Hardcoded)
 * Phase 4 (REST weeks 21-28) includes MATADOR cycle
 * MATADOR in Phase 4 only:
 *   Weeks 21-22: deficit
 *   Weeks 23-24: maintenance
 *   Weeks 25-26: deficit
 *   Weeks 27-28: maintenance
 */
const PHASE_MAP = {
  1: PHASES.FOCUS, 2: PHASES.FOCUS, 3: PHASES.FOCUS, 4: PHASES.FOCUS,
  5: PHASES.BUILD, 6: PHASES.BUILD, 7: PHASES.BUILD, 8: PHASES.BUILD,
  9: PHASES.BUILD, 10: PHASES.BUILD, 11: PHASES.BUILD, 12: PHASES.BUILD,
  13: PHASES.OPTIMIZE, 14: PHASES.OPTIMIZE, 15: PHASES.OPTIMIZE, 16: PHASES.OPTIMIZE,
  17: PHASES.OPTIMIZE, 18: PHASES.OPTIMIZE, 19: PHASES.OPTIMIZE, 20: PHASES.OPTIMIZE,
  21: PHASES.REST, 22: PHASES.REST, 23: PHASES.REST, 24: PHASES.REST,
  25: PHASES.REST, 26: PHASES.REST, 27: PHASES.REST, 28: PHASES.REST
};

/**
 * MATADOR CYCLE MAP (Phase 4 only: weeks 21-28)
 * Deficit weeks: 21, 22, 25, 26
 * Maintenance weeks: 23, 24, 27, 28
 */
const MATADOR_MAP = {
  21: MATADOR_STATES.DEFICIT,
  22: MATADOR_STATES.DEFICIT,
  23: MATADOR_STATES.MAINTENANCE,
  24: MATADOR_STATES.MAINTENANCE,
  25: MATADOR_STATES.DEFICIT,
  26: MATADOR_STATES.DEFICIT,
  27: MATADOR_STATES.MAINTENANCE,
  28: MATADOR_STATES.MAINTENANCE
};

/**
 * DELOAD WEEKS (every 4th week of each phase)
 * Phase 1: Week 4
 * Phase 2: Week 8, 12
 * Phase 3: Week 16, 20
 * Phase 4: Week 24, 28
 * Pattern: Every 4th week in 28-week cycle
 */
const DELOAD_WEEKS = [4, 8, 12, 16, 20, 24, 28];

/**
 * Get current week number (1-28) in the annual cycle
 * Calculation: (Today's day of year) / 7, rounded down
 * Returns week 1-28 (then repeats)
 * 
 * @param {Date} today - Date object to calculate from
 * @returns {number} Week number (1-28)
 */
function getWeekNumber(today) {
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const dayOfYear = Math.floor((today - startOfYear) / millisecondsPerDay);
  const weekOfYear = Math.floor(dayOfYear / 7) + 1;
  
  // Map to 28-week cycle (repeats every 28 weeks)
  const cycleWeek = ((weekOfYear - 1) % 28) + 1;
  return cycleWeek;
}

/**
 * Get phase for a given week
 * No user override - calendar decides phase
 * 
 * @param {number} week - Week number (1-28)
 * @returns {string} Phase name (FOCUS, BUILD, OPTIMIZE, REST)
 */
function getPhase(week) {
  if (week < 1 || week > 28) {
    return null;
  }
  return PHASE_MAP[week];
}

/**
 * Check if a week is a deload week
 * Deload weeks: 4, 8, 12, 16, 20, 24, 28
 * These are lighter, recovery weeks
 * 
 * @param {number} week - Week number (1-28)
 * @returns {boolean} True if deload week
 */
function isDeloadWeek(week) {
  return DELOAD_WEEKS.includes(week);
}

/**
 * Get MATADOR state for a week (REST phase only)
 * MATADOR only applies to Phase 4 (weeks 21-28)
 * Returns null for non-REST phases
 * 
 * MATADOR Cycle:
 * Week 21-22: deficit (caloric deficit for fat loss)
 * Week 23-24: maintenance (maintain current weight)
 * Week 25-26: deficit (caloric deficit for fat loss)
 * Week 27-28: maintenance (maintain current weight)
 * 
 * @param {number} week - Week number (1-28)
 * @returns {string|null} MATADOR state (deficit/maintenance) or null if not REST
 */
function getMatadorState(week) {
  const phase = getPhase(week);
  
  // MATADOR only applies to REST phase (weeks 21-28)
  if (phase !== PHASES.REST) {
    return null;
  }
  
  return MATADOR_MAP[week] || null;
}

/**
 * Get complete calendar info for today
 * Useful for app initialization
 * 
 * @param {Date} today - Date to calculate info for
 * @returns {Object} Complete calendar state
 */
function getCalendarInfo(today) {
  const week = getWeekNumber(today);
  const phase = getPhase(week);
  const isDeload = isDeloadWeek(week);
  const matadorState = getMatadorState(week);
  
  return {
    week,
    phase,
    isDeload,
    matadorState,
    timestamp: today.getTime()
  };
}

/**
 * CALENDAR IMMUTABILITY ENFORCEMENT
 * The calendar is fixed and unchangeable
 * Users cannot override phases, deload weeks, or MATADOR
 * This is by design - the calendar controls everything
 */

// Expose functions (cannot be overridden)
window.Calendar = {
  getWeekNumber,
  getPhase,
  isDeloadWeek,
  getMatadorState,
  getCalendarInfo,
  PHASES,
  MATADOR_STATES
};

console.log('Calendar Engine loaded: Week-based phase system with MATADOR cycle');
