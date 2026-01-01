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
    this.renderUI();
  },
  
  renderUI() {
    const appContainer = document.getElementById('app');
    if (!appContainer) {
      console.error('App container not found');
      return;
    }
    
    appContainer.innerHTML = `
      <div style="padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
        <h1>Life OS PWA</h1>
        <p>App initialized successfully.</p>
        <nav style="margin-top: 20px;">
          <ul style="list-style: none; padding: 0;">
            <li><a href="ui.html">Dashboard</a></li>
            <li><a href="decisions.html">Weekly Decisions</a></li>
            <li><a href="pillars.html">Life Pillars</a></li>
            <li><a href="pdf-reference.html">PDF Reference</a></li>
          </ul>
        </nav>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

app.init();
