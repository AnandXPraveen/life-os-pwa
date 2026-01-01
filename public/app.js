/**
 * Life OS PWA - Main App
 * STEP 1: UI Structure Lock
 * Initialization and DOM management
 */

import { getMatadorState } from '../src/matador.js';
import { getPillarState, updatePillarState, getPillarList } from '../src/pillars.js';

console.log('Life OS PWA loaded');

// Cache clearing on demand
if (new URLSearchParams(window.location.search).get('clearCache') === 'true') {
  // Unregister service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(reg => reg.unregister());
      console.log('Service Worker unregistered');
    });
  }
  // Clear all caches
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName);
      console.log('Cache cleared:', cacheName);
    });
  });
  // Redirect to clean URL
  window.location.href = window.location.href.split('?')[0];
}

// Register Service Worker for offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(err => {
    console.log('Service Worker registration failed:', err);
  });
}

// App initialization
const app = {
init() {
    const DEBUG_BOOT = false;

    if (DEBUG_BOOT) {
      console.log('App initialized');
      this.setupElements();
      return;
    }

    // Render locked UI shell
    const app = document.getElementById('app');
    app.innerHTML = `
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
    `;
  }
  setupElements() {
    // Update metadata elements
    const weekDay = document.getElementById('week-day');
    const phaseBadge = document.getElementById('phase-badge');
    
    if (weekDay) {
      // Placeholder: Will be wired to calendar logic later
      weekDay.textContent = 'Week X · Day Y';
    }
    
    if (phaseBadge) {
      // Placeholder: Will be wired to lifecycle logic later
            // Get MATADOR state and update badge with styling
            const matadorState = getMatadorState('Phase 4', 2); // Placeholder: week = 2
      if (matadorState.active) {
        phaseBadge.textContent = `MATADOR: ${matadorState.mode.toUpperCase()}`;
        phaseBadge.classList.remove('matador-deficit', 'matador-maintenance');
        phaseBadge.classList.add(`matador-${matadorState.mode}`);
      } else {
        phaseBadge.textContent = 'Phase 4';
        phaseBadge.classList.remove('matador-deficit', 'matador-maintenance');
      }
    }

          // Render pillars with checkboxes
      const pillarsSection = document.getElementById('pillars-section');
      if (pillarsSection) {
        const state = getPillarState();
        const html = getPillarList().map(pillar => `
          <div class="pillar-row ${state[pillar] ? 'completed' : ''}">
            <input type="checkbox" class="pillar-checkbox" data-pillar="${pillar}" ${state[pillar] ? 'checked' : ''}>
            <label>${pillar}</label>
          </div>
        `).join('');
        pillarsSection.innerHTML = html;
        
        // Add event listeners for checkbox toggles
        pillarsSection.querySelectorAll('.pillar-checkbox').forEach(checkbox => {
          checkbox.addEventListener('change', (e) => {
            const pillar = e.target.dataset.pillar;
            updatePillarState(new Date().toISOString().slice(0, 10), pillar, e.target.checked);
            e.target.parentElement.classList.toggle('completed');
          });
        });
      }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// Also init immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  // Document is still loading
} else {
  // DOM is already ready
  app.init();
}
