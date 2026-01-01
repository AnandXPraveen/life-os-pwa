/**
 * Life OS PWA - Main App
 * STEP 1: UI Structure Lock
 * Initialization and DOM management
 */

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
  app.init();
});

// Also init immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  // Document is still loading
} else {
  // DOM is already ready
  app.init();
}
