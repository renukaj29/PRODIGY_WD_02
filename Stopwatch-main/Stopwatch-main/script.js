const minutes = document.querySelector(".timer--minutes"),
    seconds = document.querySelector(".timer--seconds"),
    parts = document.querySelector(".timer--seconds--parts"),
    lapsContainer = document.querySelector(".laps"),
    timer = document.querySelector(".timer"),

    startBtn = document.querySelector("#start"),
    startBtnIcon = document.querySelector("#start i"),
    resetBtn = document.querySelector("#reset"),
    lapBtn = document.querySelector("#lap"),

    laps = [];

let totalTime = 0;
let timerInterval;

startBtn.addEventListener("click", () => {
    // toggle active class on timer
    timer.classList.toggle("active");
    startBtnIcon.classList.toggle("fa-play");
    startBtnIcon.classList.toggle("fa-pause");
    // check if timer is active or not 
    timer.classList.contains("active") ? startTimer() : pauseTimer();
});

lapBtn.addEventListener("click", captureTime);

resetBtn.addEventListener("click", rest);


function startTimer() {
    lapBtn.disabled = false;
    resetBtn.disabled = true;

    timerInterval = setInterval(() => {
        totalTime++;
        // convert time to min : sec : parts
        const convertedTime = convertTime(totalTime);
        // add 0 in front of number if its less than 10
        const stringedTime = stringTime(convertedTime);
        // update UI
        updateUI(stringedTime);
    }, 10);

}

function pauseTimer() {
    lapBtn.disabled = true;
    resetBtn.disabled = false;
    clearInterval(timerInterval);

}

function convertTime(totalTime) {
    const minutes = parseInt(totalTime / (60 * 100));
    const seconds = parseInt(totalTime / 100) % 60;
    const parts = totalTime % 100;

    return [minutes, seconds, parts];

}

function stringTime(convertedTime) {
    return convertedTime.map(number => number <= 9 ? "0" + number : "" + number);
}

function updateUI(stringedTime) {
    const [newMin, newSec, newParts] = stringedTime;
    parts.innerText = newParts;
    // first check if the value changed then update it
    if (newMin !== minutes.innerText) minutes.innerText = newMin;
    if (newSec !== seconds.innerText) seconds.innerText = newSec;

}

function captureTime() {
    const time = totalTime;
    const lapTime = laps.length > 0 ? time - laps[0] : time;
    laps.unshift(time);
    const timeConverted = convertTime(time);
    const lapTimeConverted = convertTime(lapTime);
    const [minutes, seconds, parts] = stringTime(timeConverted);
    const [lapMin, lapSec, lapParts] = stringTime(lapTimeConverted);

    const element = ` 
    <div class="container container--laps">
        <div>#${laps.length}</div>
        <div>
          <div>Total Time : ${minutes}:${seconds}.${parts}</div>
          <div>Lap Time : ${lapMin}:${lapSec}.${lapParts}</div>
        </div>
      </div>
    `;

    lapsContainer.insertAdjacentHTML("afterbegin", element);

}

function rest() {
    clearInterval(timerInterval);
    totalTime = 0;
    updateUI(["00", "00", "00"]);
    lapsContainer.innerHTML = "";

}

