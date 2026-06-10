// Apply Config
document.addEventListener('DOMContentLoaded', () => {
    // Titles and Meta
    document.title = CONFIG.appName;
    document.getElementById('apple-title').content = CONFIG.appName;
    document.getElementById('theme-color').content = CONFIG.themeColor;

    // Icons
    document.getElementById('favicon').href = CONFIG.appIcon;
    document.getElementById('apple-icon').href = CONFIG.appIcon;

    // Mostra tela de splash
    document.body.style.backgroundColor = CONFIG.backgroundColor;

    // Redireciona para o Streamlit após 1.2 segundos
    setTimeout(function() {
        window.location.href = CONFIG.iframeUrl;
    }, 1200);
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').then(function(registration) {
            console.log('ServiceWorker registrado: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker falhou: ', err);
        });
    });
}
