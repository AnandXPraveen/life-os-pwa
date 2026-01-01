/**
 * MATADOR State Helper
 * Step 2: Display-only state for Phase 4 indicators
 * Provides explicit active flag and mode (deficit/maintenance)
 */

/**
 * Get MATADOR state for a given phase and week
 * @param {string} phase - Current phase (e.g., 'Phase 1', 'Phase 4')
 * @param {number} weekInPhase - Current week within the phase (1-4)
 * @returns {Object} MATADOR state object with 'active' and 'mode' properties
 */
export function getMatadorState(phase, weekInPhase) {
  // MATADOR only appears in Phase 4
  if (phase !== 'Phase 4') {
    return {
      active: false,
      mode: null
    };
  }

  // In Phase 4, determine mode based on week number
  // Weeks 1-2: deficit mode
  // Weeks 3-4: maintenance mode
  const mode = (weekInPhase <= 2) ? 'deficit' : 'maintenance';

  return {
    active: true,
    mode: mode
  };
}

/**
 * Get CSS class name for a MATADOR mode
 * @param {string} mode - MATADOR mode ('deficit' or 'maintenance')
 * @returns {string} CSS class name
 */
export function getMatadorClass(mode) {
  if (!mode) return '';
  return `matador-${mode}`;
}

/**
 * Get display text for MATADOR badge
 * @param {string} mode - MATADOR mode ('deficit' or 'maintenance')
 * @returns {string} Display text for the badge
 */
export function getMatadorText(mode) {
  if (!mode) return '';
  return `MATADOR: ${mode.toUpperCase()}`;
}
