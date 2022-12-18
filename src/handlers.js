import { diffDates, diffToHtml } from "./datecalc.js";
import { formatError } from "./utils.js";

const dateCalcResult = document.getElementById("datecalc__result");
const timerResult = document.getElementById('timer__result');
const stopButton = document.querySelector('.stopTimer');
const startButton = document.querySelector('.startTimer');
let startTime = 0;
let timer = 1;
export function handleCalcDates(event) {
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;

    firstDate = firstDate.value, secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate);

        dateCalcResult.innerHTML = diffToHtml(diff);
    }
    else dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля");
}

export function handleTimer(event) {
    event.preventDefault();

    let { dateTo, time } = event.target.elements;
    time = time.value;
    dateTo = dateTo.value;
    if (dateTo && time) {
        dateTo += "T" + time;

        if (!startTime) {
            startTime = new Date().valueOf();
        }


        let diff = diffDates(new Date(startTime).toISOString(), dateTo, false);
        if (!diff.error) {
            stopButton.disabled = false;
            startButton.disabled = true;
            timerResult.innerHTML = diffToHtml(diff);
            timer = setInterval(() => {
                startTime += 1000;
                diff = diffDates(new Date(startTime).toISOString(), dateTo, false);

                if (diff.years + diff.months + diff.days + diff.hours + diff.minutes + Math.trunc(diff.seconds) !== 0) {
                    timerResult.innerHTML = diffToHtml(diff);

                } else {
                    timerResult.innerHTML = 'Таймер закончился';
                    clearInterval(timer);
                    const sound = new Howl({
                        src: ['../sound/sound.mp3']
                    });

                    sound.play();
                }
            }, 1000)
        } else {
            timerResult.innerHTML = formatError("Выберете время в будущем а не в прошлом");
        }
    } else {
        timerResult.innerHTML = formatError("Выберете дату и время");
    }


}
export function stopTimer(event) {
    event.preventDefault();
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(timer);
}