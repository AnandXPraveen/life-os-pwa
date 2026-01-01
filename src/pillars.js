/**
 * Life OS PWA - Pillar State Management
 * STEP 3: Daily Binary Completion
 * 6 fixed pillars, date-keyed localStorage
 */

const PILLARS = [
  'Health',
  'Career',
  'Mind',
  'Relationships',
  'Finance',
  'Environment'
];

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Get pillar completion state for a given ISO date.
 * Returns fresh false state if date not found (auto-reset via new key).
 */
export function getPillarState(isoDate = getTodayKey()) {
  const key = `lifeos:pillars:${isoDate}`;
  const saved = localStorage.getItem(key);

  if (saved) {
    return JSON.parse(saved);
  }

  return Object.fromEntries(PILLARS.map(p => [p, false]));
}

/**
 * Update pillar completion state and persist to localStorage.
 * Auto-reset: new date = new key, so old data preserved.
 */
export function updatePillarState(isoDate, pillarName, completed) {
  const state = getPillarState(isoDate);
  state[pillarName] = completed;
  localStorage.setItem(
    `lifeos:pillars:${isoDate}`,
    JSON.stringify(state)
  );
  return state;
}

/**
 * List of fixed pillars (read-only in v1).
 */
export function getPillarList() {
  return PILLARS;
}
