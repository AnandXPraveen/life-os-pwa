/**
 * PHASE 6: RULES ENGINE
 * Computes flags from logged data and determines pillar status
 * Applies priority rules: Health > Mind > Other Pillars
 */

class RulesEngine {
  constructor(storageLayer) {
    this.storage = storageLayer;
    this.pillars = ['Health', 'Mind', 'Strength', 'Endurance', 'Consistency'];
  }

  /**
   * Compute flags for a given week based on logged data
   * Flag criteria:
   * - Missed workout: 1 flag
   * - Missed protein target: 1 flag
   * - Insufficient sleep (<6h): 1 flag
   * - Soreness >72h: 1 flag
   */
  computeFlags(weekNumber, logs) {
    const flags = {};
    this.pillars.forEach(pillar => flags[pillar] = 0);

    if (!logs || logs.length === 0) return flags;

    const weekLogs = logs.filter(log => log.weekNumber === weekNumber);
    const totalWorkouts = weekLogs.filter(log => log.workoutDone).length;
    const avgSleep = weekLogs.reduce((sum, log) => sum + (log.sleepHours || 0), 0) / weekLogs.length;
    const proteinMet = weekLogs.filter(log => log.proteinMet).length;
    const soreness72h = weekLogs.filter(log => log.soreness72h).length > 0;

    // Health Pillar (Primary)
    if (totalWorkouts < 3) flags['Health']++;
    if (avgSleep < 6) flags['Health']++;
    if (soreness72h) flags['Health']++;

    // Mind Pillar (Secondary - high importance)
    if (proteinMet < weekLogs.length * 0.7) flags['Mind']++;

    // Strength Pillar
    if (totalWorkouts < 2) flags['Strength']++;

    // Endurance Pillar
    if (avgSleep < 7) flags['Endurance']++;

    // Consistency Pillar
    if (totalWorkouts === 0) flags['Consistency']++;
    if (proteinMet === 0) flags['Consistency']++;

    return flags;
  }

  /**
   * Compute pillar status based on flag count
   * GREEN: 0 flags
   * YELLOW: 1-2 flags
   * RED: 3+ flags
   * Health and Mind override other pillars
   */
  computePillarStatus(flags) {
    const status = {};

    Object.entries(flags).forEach(([pillar, flagCount]) => {
      if (flagCount === 0) {
        status[pillar] = 'GREEN';
      } else if (flagCount <= 2) {
        status[pillar] = 'YELLOW';
      } else {
        status[pillar] = 'RED';
      }
    });

    // Apply priority rules
    // If Health or Mind is RED, all related pillars get YELLOW minimum
    if (status['Health'] === 'RED' || status['Mind'] === 'RED') {
      ['Strength', 'Endurance', 'Consistency'].forEach(pillar => {
        if (status[pillar] === 'GREEN') {
          status[pillar] = 'YELLOW';
        }
      });
    }

    return status;
  }

  /**
   * Get overall health status (aggregate of all pillars)
   * RED: Any pillar is RED
   * YELLOW: No RED, but some YELLOW
   * GREEN: All GREEN
   */
  getOverallStatus(pillarStatus) {
    const statuses = Object.values(pillarStatus);
    if (statuses.includes('RED')) return 'RED';
    if (statuses.includes('YELLOW')) return 'YELLOW';
    return 'GREEN';
  }

  /**
   * Get weekly summary for decision screen
   */
  getWeeklySummary(weekNumber, logs) {
    const flags = this.computeFlags(weekNumber, logs);
    const pillarStatus = this.computePillarStatus(flags);
    const overallStatus = this.getOverallStatus(pillarStatus);

    return {
      weekNumber,
      flags,
      pillarStatus,
      overallStatus,
      recommendation: this.getRecommendation(overallStatus, flags)
    };
  }

  /**
   * Get recommendation based on overall status
   */
  getRecommendation(overallStatus, flags) {
    if (overallStatus === 'RED') {
      return 'Critical: Focus on Health and recovery in next week';
    } else if (overallStatus === 'YELLOW') {
      return 'Caution: Address flagged pillars in next week\'s decisions';
    } else {
      return 'Good: Continue current routine with optimization';
    }
  }
}

// Export for use in decision screen
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RulesEngine;
}
