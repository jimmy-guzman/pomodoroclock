let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const timerBox = document.querySelector(".timer-display");
const endTime = document.querySelector(".display__end-time");
const checkmarks = document.querySelectorAll(".checkmarks span");
const length = document.querySelectorAll(".length span");

let count = 0;
let pomodoros = 0;

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if we should stop it
    if (secondsLeft === 0) {
      clearInterval(countdown);
      count++;
      handleCheckmarks();
      startTimer();
    }
    // display
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  // sets title of page
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Break Starts At ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function handleCheckmarks() {
  if (count % 2 !== 0) {
    checkmarks[pomodoros].style.display = 'block';
  }
  if (pomodoros === 4) {
    checkmarks.forEach(check => check.style.display = 'none');
    pomodoros = 0;
  }
}

function startTimer() {
  let seconds = length[0].textContent * 60;
  if (count % 2 !== 0) {
    pomodoros++;
    if (pomodoros === 4) {
      seconds = length[2].textContent * 60;

    } else {
      seconds = length[1].textContent * 60;
    }
  } else {
    seconds = length[0].textContent * 60;
  }
  timer(seconds);
}

timerBox.addEventListener("click", startTimer);
