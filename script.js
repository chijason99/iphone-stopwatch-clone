import Timer, { STATUS, TIMER_TEXT } from "./Timer.js";

const startBtn = document.querySelector(".start.btn");
const lapBtn = document.querySelector(".lap.btn");
const text = document.querySelector(".stopwatch-text");
const lapTimeHolder = document.querySelector(".lap-time-holder");
const lapTimeTemplate = document.querySelector("#lap-time-section");
const stopWatch = new Timer();

startBtn.addEventListener("click", () => {
  switch (startBtn.textContent) {
    case TIMER_TEXT.START:
      recordTime();
      showTime();
      break;
    case TIMER_TEXT.PAUSE:
      stopRecording();
      clearInterval(stopWatch.id);
      break;
    case TIMER_TEXT.RESUME:
      recordTime();
      showTime();
      break;
  }
});

lapBtn.addEventListener("click", () => {
  if (startBtn.textContent === TIMER_TEXT.START) return;
  if (lapBtn.textContent === TIMER_TEXT.LAP) {
    stopWatch.recordLap();
    showLap();
  } else if (lapBtn.textContent === TIMER_TEXT.RESET) {
    stopWatch.resetTimer();
    clearInterval(stopWatch.id);
    lapTimeHolder.replaceChildren();
    text.textContent = convertTimeFormat(0);
    changeBtnText(startBtn, TIMER_TEXT.START);
    changeBtnText(lapBtn, TIMER_TEXT.LAP);
  }
});

function changeBtnText(btn, text) {
  btn.textContent = text;
}

function recordTime() {
  stopWatch.startTimer();
  changeBtnText(startBtn, TIMER_TEXT.PAUSE);
  changeBtnText(lapBtn, TIMER_TEXT.LAP);
}
function stopRecording() {
  stopWatch.pauseTimer();
  changeBtnText(startBtn, TIMER_TEXT.RESUME);
  changeBtnText(lapBtn, TIMER_TEXT.RESET);
}

function showTime() {
  stopWatch.id = setInterval(() => {
    const elapsedTime =
      Date.now() - stopWatch.startTime + stopWatch.elapsedTime;
    text.textContent = convertTimeFormat(elapsedTime);
  }, 100);
}
function convertTimeFormat(time) {
  const ms = parseInt((time % 1000) / 10).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const second = parseInt((time / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minute = parseInt((time / 1000 / 60) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  return `${minute}:${second}.${ms}`;
}
function showLap() {
  lapTimeHolder.replaceChildren();
  const minMaxObj = stopWatch.laps.length > 1 ? findMinMaxLap() : null;
  for (let [index, lap] of stopWatch.laps.entries()) {
    const template = lapTimeTemplate.content.cloneNode(true);
    const lapNumber = template.querySelector("[data-lap-num]");
    const lapTime = template.querySelector("[data-lap-time]");
    if(minMaxObj){
      const lapItem = template.querySelector('.lap-time-item')
        if(lap === minMaxObj.min) lapItem.classList.add('green')
        if(lap === minMaxObj.max) lapItem.classList.add('red')
    }
    lapNumber.textContent = `Lap ${index + 1}`;
    lapTime.textContent = convertTimeFormat(lap);
    lapTimeHolder.appendChild(template);
  }
}

function findMinMaxLap() {
  const sortedLaps = [...stopWatch.laps].sort((a, b) => a - b);
  const min = sortedLaps[0];
  const max = sortedLaps[sortedLaps.length - 1];
  return { min, max };
}

