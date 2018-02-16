const timerDisplay = document.querySelector(".display__time-left");
const timerBox = document.querySelector(".timer-display");
const endTime = document.querySelector(".display__end-time");
const checkmarks = document.querySelectorAll(".checkmarks span");
const length = document.querySelectorAll(".length span");
const sessionDisplay = document.querySelector(".display__session");
const lengthButtons = document.querySelectorAll("[data-amt]");

let countdown;
let count = 0;
let pomodoros = 0;
let isPaused = false;
let isStart = false;
let secondsLeft = 0;

function timer(seconds) {
  const now = Date.now();
  // clear any existing timers
  clearInterval(countdown);
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if we should stop it
    if (secondsLeft === 0) {
      isStart = false;
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
  endTime.textContent = `Timer Ends At ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function handleCheckmarks() {
  if (count % 2 !== 0) {
    checkmarks[pomodoros].style.opacity = "1";
  }
  if (pomodoros === 4) {
    checkmarks.forEach(check => (check.style.opacity = "0"));
    pomodoros = 0;
  }
}

function startTimer() {
  let seconds = length[0].textContent * 60;
  if (count % 2 !== 0) {
    sessionDisplay.textContent = "Short Break";
    pomodoros++;
    if (pomodoros === 4) {
      sessionDisplay.textContent = "Long Break";
      seconds = length[2].textContent * 60;
    } else {
      seconds = length[1].textContent * 60;
    }
  } else {
    sessionDisplay.textContent = "Focus";
    seconds = length[0].textContent * 60;
  }
  if (!isStart) {
    console.log("Start");
    timer(seconds);
    isStart = true;
  }
  else if(isStart && !isPaused){
    console.log("Pause");
    displayTimeLeft(secondsLeft);
    clearInterval(countdown);
    isPaused = true;
  }
  else if(isPaused) {
    console.log("Resume");
    timer(secondsLeft);
  }
}

function handleLength(e) {
  if (this.dataset.amt === "+1") {
    let minutes = parseInt(e.target.nextElementSibling.textContent);
    e.target.nextElementSibling.textContent = minutes + 1;
  }
  if (this.dataset.amt === "-1") {
    let minutes = parseInt(e.target.previousElementSibling.textContent);
    if (minutes != 1) e.target.previousElementSibling.textContent = minutes - 1;
  }
}

timerBox.addEventListener("click", startTimer);
lengthButtons.forEach(button => button.addEventListener("click", handleLength));
