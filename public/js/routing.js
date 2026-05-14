/* =========================================
   SPA ROUTING
========================================= */

export function initRouting() {
    window.navTo = function (pageId) {
        // Hide all mains
        document.querySelectorAll('main').forEach(m => m.classList.remove('active-page'));
        // Remove active class from nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

        // Show target
        document.getElementById(pageId).classList.add('active-page');

        // Highlight nav button
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }

        // Trigger specific actions on page load
        if (pageId === 'prices') {
            const priceGrid = document.getElementById('priceGrid');
            if (priceGrid && priceGrid.innerHTML.includes('Loading')) {
                window.fetchPrices();
            }
        }
        if (pageId === 'simulator') {
            window.updateHash(1); // Initialize hash
        }
    };
}
