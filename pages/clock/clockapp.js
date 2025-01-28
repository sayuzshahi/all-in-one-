let timeFormat24Hour = true;
let stopwatchInterval, stopwatchRunning = false, stopwatchStartTime = 0;
let timerInterval, timerRunning = false, timerStartTime = 0;

function updateTime() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    if (!timeFormat24Hour && hours > 12) hours -= 12;

    const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    document.getElementById('current-time').textContent = timeString;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = currentTime.getDay();
    const daysRow = days.map((day, index) => {
        return `<div class="${index === todayIndex ? 'active-day' : ''}">${day}</div>`;
    }).join('');
    document.getElementById('days-row').innerHTML = daysRow;
}

function toggleTimeFormat() {
    timeFormat24Hour = !timeFormat24Hour;
    updateTime();
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function switchView(view) {
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.getElementById(`${view}-view`).classList.add('active');
    const daysRow = document.getElementById('days-row');
    if (view === 'clock') {
        daysRow.style.display = 'flex'; // Show days row for the clock
    } else {
        daysRow.style.display = 'none'; // Hide days row for other views
    }
}

function toggleStopwatch() {
    const button = document.getElementById('stopwatch-start');
    if (stopwatchRunning) {
        // Pause the stopwatch
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        button.textContent = 'Start';

        // Store the elapsed time so far
        stopwatchStartTime = Date.now() - stopwatchStartTime;
    } else {
        // Resume the stopwatch
        if (stopwatchStartTime === 0) {
            // If starting for the first time
            stopwatchStartTime = Date.now();
        } else {
            // Resume from the paused state
            stopwatchStartTime = Date.now() - stopwatchStartTime;
        }
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        stopwatchRunning = true;
        button.textContent = 'Pause';
    }
}


function updateStopwatch() {
    const elapsed = Math.floor((Date.now() - stopwatchStartTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;
    document.getElementById('stopwatch-display').textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchStartTime = 0;
    document.getElementById('stopwatch-display').textContent = '00:00:00';
    document.getElementById('stopwatch-start').textContent = 'Start';
}

function toggleTimer() {
    const input = document.getElementById('timer-input').value;
    const button = document.getElementById('timer-start');

    if (!timerRunning) {
        if (timerStartTime <= 0) {
            // Parse and validate the input
            const duration = parseInt(input, 10);
            if (isNaN(duration) || duration <= 0 || duration > 100000) {
                alert('Enter a valid number between 1 and 100000');
                return;
            }
            timerStartTime = duration; // Set the timer only if input is valid
        }
        // Start the timer
        timerInterval = setInterval(updateTimer, 1000);
        button.textContent = 'Pause';
    } else {
        // Pause the timer
        clearInterval(timerInterval);
        button.textContent = 'Start';
    }
    timerRunning = !timerRunning;
}


function updateTimer() {
    if (timerStartTime <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById('timer-start').textContent = 'Start';
        alert('Time is up!');
        return;
    }
    timerStartTime--;
    const hours = Math.floor(timerStartTime / 3600);
    const minutes = Math.floor((timerStartTime % 3600) / 60);
    const seconds = timerStartTime % 60;
    document.getElementById('timer-display').textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}


function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerStartTime = 0;
    document.getElementById('timer-display').textContent = '00:00:00';
    document.getElementById('timer-start').textContent = 'Start';
}

setInterval(updateTime, 1000); // Update the current time every second