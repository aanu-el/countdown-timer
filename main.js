const start = document.getElementById("start");
const reset = document.getElementById("reset");

const h = document.getElementById("hour");
const m = document.getElementById("minute");
const s = document.getElementById("sec");

const container = document.querySelector(".container");
const showCase = document.querySelector(".show-case");
const stopwatch = document.querySelector(".stopwatch");

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector(".timerDisplay");
let int = null;

//store a reference to the startTimer variable
let startTimer = null;

start.addEventListener("click", function () {
  //initialize the variable
  function startInterval() {
    startTimer = setInterval(function () {
      timer();
    }, 1000);
  }
  startInterval();
});

reset.addEventListener("click", function () {
  h.value = 0;
  m.value = 0;
  s.value = 0;
  //stop the timer after pressing "reset"
  stopInterval();
});

function timer() {
  if (h.value == 0 && m.value == 0 && s.value == 0) {
    h.value = 0;
    m.value = 0;
    s.value = 0;

    timeUp(); //this function runs the stopwatch
    stopInterval();
  } else if (s.value != 0) {
    s.value--;
  } else if (m.value != 0 && s.value == 0) {
    s.value = 59;
    m.value--;
  } else if (h.value != 0 && m.value == 0) {
    m.value = 60;
    h.value--;
  }
  return;
}

function timeUp() {
  showCase.style.display = "none";
  stopwatch.style.display = "block";

  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);

  document.getElementById("pauseTimer").addEventListener("click", () => {
    clearInterval(int);
  });

  function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    let hh = hours < 10 ? "0" + hours : hours;
    let mm = minutes < 10 ? "0" + minutes : minutes;
    let ss = seconds < 10 ? "0" + seconds : seconds;
    let mss =
      milliseconds < 10
        ? "00" + milliseconds
        : milliseconds < 100
        ? "0" + milliseconds
        : milliseconds;

    timerRef.innerHTML = ` - ${mm} : ${ss}`;
  }

  return;
}

//stop the function after pressing the reset button,
//so the time wont go down when selecting a new time after pressing reset

function stopInterval() {
  clearInterval(startTimer);
}
