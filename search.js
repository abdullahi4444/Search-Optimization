const defaultInput = document.getElementById('default-search');
const debounceInput = document.getElementById('debounce-search');
const throttleInput = document.getElementById('throttle-search');

const defaultCount = document.getElementById('default-count');
const debounceCount = document.getElementById('debounce-count');
const throttleCount = document.getElementById('throttle-count');

const logContainer = document.getElementById('log-container');
const clearLogsBtn = document.getElementById('clear-logs');

let counts = { default: 0, debounce: 0, throttle: 0 };

function addLog(type, value) {
    if (logContainer.querySelector('.log-placeholder')) {
        logContainer.innerHTML = '';
    }

    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const time = new Date().toLocaleTimeString('en-GB', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });

    logEntry.innerHTML = `
        <span class="log-time">${time}</span>
        <span class="log-type type-${type.toLowerCase()}">[${type.toUpperCase()}]</span>
        <span class="log-value">Searching for: "${value}"</span>
    `;

    logContainer.prepend(logEntry);
}

function updateCounter(type) {
    counts[type]++;
    document.getElementById(`${type}-count`).innerText = counts[type];
}

// Optimization Functions
function debounce(func, delay = 500) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
}

function throttle(func, limit = 1000) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(null, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Handlers
const handleDefault = (e) => {
    updateCounter('default');
    addLog('Default', e.target.value);
};

const handleDebounce = debounce((val) => {
    updateCounter('debounce');
    addLog('Debounce', val);
}, 500);

const handleThrottle = throttle((val) => {
    updateCounter('throttle');
    addLog('Throttle', val);
}, 1000);

// Event Listeners
defaultInput.addEventListener('input', handleDefault);

debounceInput.addEventListener('input', (e) => {
    handleDebounce(e.target.value);
});

throttleInput.addEventListener('input', (e) => {
    handleThrottle(e.target.value);
});

clearLogsBtn.addEventListener('click', () => {
    logContainer.innerHTML = '<div class="log-placeholder">Wait for input activity...</div>';
});
