let targetDate;
let timerInterval;
let startTime;
let elapsedTime = 0;
let timerActive = false;

function startTimer() {
  if (!timerActive) {
    const datetimeInput = document.getElementById("datetime").value;

    if (!datetimeInput) {
      alert("Please select a valid date and time.");
      return;
    }

    targetDate = new Date(datetimeInput).getTime();
    startTime = new Date().getTime();
    timerActive = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  const currentTime = new Date().getTime();
  elapsedTime = currentTime - startTime;

  let timeRemaining = targetDate - currentTime;
  if (timeRemaining < 0) {
    clearInterval(timerInterval);
    timerActive = false;
    document.getElementById("timer").textContent = "Countdown expired";
    return;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById("timer").textContent = `${formatTime(
    days
  )}:${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerActive = false;
}

function resumeTimer() {
  if (!timerActive && targetDate) {
    startTime = new Date().getTime() - elapsedTime;
    timerActive = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerActive = false;
  elapsedTime = 0;
  document.getElementById("timer").textContent = "00:00:00:00";
  document.getElementById("datetime").value = "";
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
