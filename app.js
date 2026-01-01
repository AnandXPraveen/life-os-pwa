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
