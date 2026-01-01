// Calendar Engine
// Determines week phases based on calendar rules

class CalendarEngine {
  getWeek(date) {
    const weekNumber = Math.floor((date.getDate() - date.getDay()) / 7);
    return weekNumber;
  }

  getPhase(week) {
    // Phase rotation: MATADOR cycles
    const phaseIndex = week % 4;
    const phases = ['FOCUS', 'BUILD', 'OPTIMIZE', 'REST'];
    return phases[phaseIndex];
  }
}

const calendarEngine = new CalendarEngine();
