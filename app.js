// Life OS PWA - Main App

console.log('Life OS PWA loaded');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(err => {
    console.log('SW registration failed:', err);
  });
}

const app = {
  init() {
    console.log('App initialized');
  }
};

app.init();

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  if (!app) {
    console.error('App container not found');
    return;
  }

  app.innerHTML = `
    <h1>Life OS PWA</h1>
    <p>App initialized successfully.</p>
  `;
});
