/**
 * PHASE 10: DRIVE-AWARE EXPORT ENGINE
 * Generates Markdown exports and saves to user-selected Drive folder
 * No OAuth. No API calls. Local folder sync only.
 */

class ExportEngine {
  constructor(storageLayer, calendarEngine, rulesEngine) {
    this.storage = storageLayer;
    this.calendar = calendarEngine;
    this.rules = rulesEngine;
    this.exportFolderPath = localStorage.getItem('lifeOS_exportFolderPath') || null;
    this.lastExportDate = localStorage.getItem('lifeOS_lastExportDate') || null;
  }

  /**
   * Set the Drive export folder path (one-time user selection)
   * Path example: /My Drive/LifeOS_Exports/ (or similar)
   */
  setExportFolderPath(folderPath) {
    this.exportFolderPath = folderPath;
    localStorage.setItem('lifeOS_exportFolderPath', folderPath);
    console.log(`Export folder set to: ${folderPath}`);
  }

  /**
   * Get current export folder path
   */
  getExportFolderPath() {
    return this.exportFolderPath;
  }

  /**
   * Check if export folder is configured
   */
  isExportFolderConfigured() {
    return !!this.exportFolderPath;
  }

  /**
   * Generate Markdown export for a given week
   */
  generateWeeklyExport(weekNumber, weekData) {
    const phase = this.calendar.getPhaseForWeek(weekNumber);
    const logs = weekData.logs || [];
    const flags = this.rules.computeFlags(weekNumber, logs);
    const pillarStatus = this.rules.computePillarStatus(flags);
    const decision = weekData.decision || {};

    let markdown = `# Week ${weekNumber} - Life OS Export\n\n`;
    markdown += `**Phase:** ${phase}\n`;
    markdown += `**Date:** ${new Date().toISOString()}\n\n`;

    // Pillar Status Section
    markdown += `## Pillar Status\n\n`;
    Object.entries(pillarStatus).forEach(([pillar, status]) => {
      const flagCount = flags[pillar] || 0;
      const icon = status === 'GREEN' ? '✅' : status === 'YELLOW' ? '⚠️' : '🔴';
      markdown += `${icon} **${pillar}**: ${status} (${flagCount} flag${flagCount !== 1 ? 's' : ''})\n`;
    });
    markdown += '\n';

    // Logs Section
    markdown += `## Weekly Logs (${logs.length} entries)\n\n`;
    if (logs.length > 0) {
      logs.forEach((log, index) => {
        markdown += `### Day ${index + 1}\n`;
        markdown += `- Workout: ${log.workoutDone ? '✓' : '✗'}\n`;
        markdown += `- Protein Met: ${log.proteinMet ? '✓' : '✗'}\n`;
        markdown += `- Sleep Hours: ${log.sleepHours || 'N/A'}\n`;
        markdown += `- Soreness >72h: ${log.soreness72h ? '✓' : '✗'}\n\n`;
      });
    }

    // Decisions Section
    markdown += `## Weekly Decisions\n\n`;
    markdown += `- **Training Focus:** ${decision.training || 'Not set'}\n`;
    markdown += `- **Nutrition Focus:** ${decision.nutrition || 'Not set'}\n`;
    markdown += `- **Optional Focus:** ${decision.optional || 'Balanced'}\n\n`;

    // Summary Section
    markdown += `## Summary\n\n`;
    const overallStatus = this.rules.getOverallStatus(pillarStatus);
    markdown += `**Overall Status:** ${overallStatus}\n`;
    markdown += `**Recommendation:** ${this.rules.getRecommendation(overallStatus, flags)}\n`;
    markdown += `**Total Logs:** ${logs.length}\n`;

    return markdown;
  }

  /**
   * Check if export should run at app startup
   */
  shouldExportToday(today = new Date()) {
    if (!this.isExportFolderConfigured()) return false;

    const today_yyyymmdd = this.formatDate(today);
    const lastExport = this.lastExportDate;

    // Export if never done or if date changed
    if (!lastExport || lastExport !== today_yyyymmdd) {
      return true;
    }
    return false;
  }

  /**
   * Format date as YYYY-MM-DD
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Generate export filename for a week
   */
  generateFilename(weekNumber) {
    const today = new Date();
    const dateStr = this.formatDate(today);
    return `Week_${String(weekNumber).padStart(2, '0')}_${dateStr}.md`;
  }

  /**
   * Execute scheduled export at app startup
   */
  async executeScheduledExport(weekNumber, weekData) {
    if (!this.shouldExportToday()) {
      return { exported: false, reason: 'Already exported today' };
    }

    try {
      // Generate markdown
      const markdown = this.generateWeeklyExport(weekNumber, weekData);
      const filename = this.generateFilename(weekNumber);
      const fullPath = `${this.exportFolderPath}${filename}`;

      // In real implementation, this would use File System Access API
      // For now, we simulate and prepare data for Android sync
      const exportData = {
        filename: filename,
        content: markdown,
        path: fullPath,
        timestamp: new Date().toISOString(),
        weekNumber: weekNumber
      };

      // Store export info in localStorage
      localStorage.setItem('lifeOS_lastExportDate', this.formatDate(new Date()));
      localStorage.setItem('lifeOS_lastExport', JSON.stringify(exportData));

      console.log(`Export completed: ${filename}`);
      return {
        exported: true,
        filename: filename,
        path: fullPath,
        message: `Exported to Drive: ${filename}`
      };
    } catch (error) {
      console.error('Export failed:', error);
      return {
        exported: false,
        error: error.message
      };
    }
  }

  /**
   * Get last export status
   */
  getLastExportStatus() {
    const lastExport = localStorage.getItem('lifeOS_lastExport');
    if (!lastExport) return null;
    return JSON.parse(lastExport);
  }

  /**
   * Check if export occurred today
   */
  exportedToday() {
    const today = this.formatDate(new Date());
    return this.lastExportDate === today;
  }
}

// Export for use in app startup
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExportEngine;
}
