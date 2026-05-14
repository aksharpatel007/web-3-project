/* =========================================
   MAIN APPLICATION INITIALIZATION
========================================= */

import { initCursor } from './cursor.js';
import { initBackground } from './background.js';
import { initRouting } from './routing.js';
import { initTiltCards } from './cards.js';
import { initPrices } from './prices.js';
import { initSimulator } from './simulator.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Web3 Nexus Loading...');

    // Initialize all modules
    initCursor();
    console.log('✓ Cursor initialized');

    initBackground();
    console.log('✓ Background particles initialized');

    initRouting();
    console.log('✓ Routing initialized');

    initTiltCards();
    console.log('✓ Tilt cards initialized');

    initPrices();
    console.log('✓ Price fetching initialized');

    initSimulator();
    console.log('✓ Simulator initialized');

    console.log('✅ Web3 Nexus fully loaded!');
});
