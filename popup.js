document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('speedRange');
    const display = document.getElementById('speedVal');

    // 1. Load saved configuration
    chrome.storage.local.get(['scrollSpeed'], (result) => {
        if (result.scrollSpeed) {
            slider.value = result.scrollSpeed;
            display.textContent = result.scrollSpeed;
        }
    });

    // 2. Save and notify changes in real-time
    slider.addEventListener('input', () => {
        const speed = parseInt(slider.value);
        display.textContent = speed;
        
        // Save to local storage
        chrome.storage.local.set({ scrollSpeed: speed });

        // Send message to the active tab to update without reloading
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "UPDATE_SPEED", speed: speed });
            }
        });
    });
});