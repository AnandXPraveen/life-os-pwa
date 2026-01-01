/**
 * Life OS PWA - Main App
 * STEP 1: UI Structure Lock
 * Initialization and DOM management
 */

console.log('Life OS PWA loaded');
import { getMatadorState, getMatadorClass, getMatadorText } from './src/matador.js';

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
    console.log('App initialized');
    this.setupElements();
  },

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
      phaseBadge.textContent = 'Phase';
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  // Gate the placeholder
  const DEBUG_BOOT = false;
  if (DEBUG_BOOT) {
    app.innerHTML = `
      <h1>Life OS PWA</h1>
      <p>App initialized successfully.</p>
    `;
    return;
  }

  // Render locked UI shell
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
});

// Also init immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  // Document is still loading
} else {
  // DOM is already ready
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
}
