(function() {
    'use strict';

    // Default value (if nothing is saved)
    let SPEED_DIVISOR = 4;

    // Load saved speed on startup
    if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.get(['scrollSpeed'], (result) => {
            if (result.scrollSpeed) SPEED_DIVISOR = result.scrollSpeed;
        });
    }

    // Listen for real-time changes from the popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === "UPDATE_SPEED") {
            SPEED_DIVISOR = request.speed;
        }
    });

    let isScrolling = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let scrollInterval = null;
    let scrollTarget = null;

    // --- VISUAL INDICATOR UI ---
    const marker = document.createElement('div');
    Object.assign(marker.style, {
        position: 'fixed', width: '24px', height: '24px',
        borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(0,0,0,0.3)',
        boxShadow: '0 0 6px rgba(0,0,0,0.5)',
        zIndex: '2147483647', display: 'none', pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        backgroundImage: 'radial-gradient(circle, white 2px, transparent 3px)'
    });

    // Safe injection of the marker
    function injectMarker() {
        if (document.body) {
            document.documentElement.appendChild(marker);
        } else {
            window.addEventListener('DOMContentLoaded', () => document.documentElement.appendChild(marker));
        }
    }
    injectMarker();

    // Determine which element should scroll
    function getScrollTarget(e) {
        let t = e.target;
        while (t && t !== document) {
            const style = window.getComputedStyle(t);
            const hasExplicitScroll = ['auto', 'scroll'].includes(style.overflowY) || 
                                      ['auto', 'scroll'].includes(style.overflow);
            const canScroll = (t.scrollHeight > t.clientHeight || t.scrollWidth > t.clientWidth);

            if (hasExplicitScroll && canScroll && t.tagName !== 'BODY' && t.tagName !== 'HTML') {
                return t;
            }
            t = t.parentElement;
        }
        return window;
    }

    // --- MAIN EVENT LISTENER ---
    window.addEventListener('mousedown', (e) => {
        // 1. Si el scroll ya está activo, cualquier clic lo detiene
        if (isScrolling) {
            e.preventDefault();
            e.stopImmediatePropagation();
            stopScroll();
            return;
        }

        // 2. Si es Middle Click (Botón Central)
        if (e.button === 1) { 
            
            // --- NUEVA LÓGICA: Detección de elementos interactivos ---
            // Verifica si el clic fue sobre un enlace, botón, input, etc.
            const isInteractive = e.target.closest('a, button, input, textarea, select, [role="button"], [contenteditable="true"]');
            
            if (isInteractive) {
                // Si es interactivo, NO activamos autoscroll.
                // Retornamos para dejar que el navegador abra el link o presione el botón.
                return; 
            }
            // ---------------------------------------------------------

            // Si es zona "segura", activamos autoscroll
            e.preventDefault();
            e.stopImmediatePropagation();
            startScroll(e);
        }
    }, true);

    window.addEventListener('mousemove', (e) => {
        if (isScrolling) {
            currentX = e.clientX;
            currentY = e.clientY;
        }
    }, true);

    function startScroll(e) {
        isScrolling = true;
        startX = e.clientX;
        startY = e.clientY;
        currentX = e.clientX;
        currentY = e.clientY;
        scrollTarget = getScrollTarget(e);

        marker.style.left = startX + 'px';
        marker.style.top = startY + 'px';
        marker.style.display = 'block';
        document.body.style.cursor = 'all-scroll';

        scrollInterval = setInterval(() => {
            const diffX = currentX - startX;
            const diffY = currentY - startY;

            // Use the dynamic SPEED_DIVISOR variable
            const speedX = Math.abs(diffX) > 8 ? diffX / SPEED_DIVISOR : 0;
            const speedY = Math.abs(diffY) > 8 ? diffY / SPEED_DIVISOR : 0;

            if (speedX !== 0 || speedY !== 0) {
                scrollTarget.scrollBy(speedX, speedY);
            }
        }, 10);
    }

    function stopScroll() {
        isScrolling = false;
        marker.style.display = 'none';
        document.body.style.cursor = 'default';
        if (scrollInterval) clearInterval(scrollInterval);
    }
})();