import { diffDates, diffToHtml } from "./datecalc.js";
import { formatError } from "./utils.js";
const dateCalcResult = document.getElementById("datecalc__result");
const timerResult = document.getElementById('timer__result');
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

    let { dateTo, time } = event.target;
    time = time.value;
    dateTo = dateTo.value + "T" + time;

    if (dateTo && time) {
        const stopButton = document.querySelector('.stopTimer');
        const startButton = document.querySelector('.startTimer');
        stopButton.disabled = false;


        const timer = setInterval(() => {
            console.log(`original timer: ${timer}`)
            const currentTime = new Date().toISOString();
            const diff = diffDates(currentTime, dateTo, false);

            if (!diff.error) {
                if (diff.years + diff.months + diff.days + diff.hours + diff.minutes + Math.trunc(diff.seconds) !== 0) {
                    timerResult.innerHTML = diffToHtml(diff);
                } else {

                    timerResult.innerHTML = 'Таймер закончился';
                    clearInterval(timer);
                }
            } else {
                timerResult.innerHTML = formatError("Выберете время в будущем а не в прошлом");
                clearInterval(timer);
            }


        }, 1000);
        stopButton.addEventListener('click', () => {
            stopTimer(timer);
        })
    } else {
        timerResult.innerHTML = formatError("Выберете дату и время");
    }


}
function stopTimer(timer) {
    console.log('try to stop, timer = ' + timer)
    clearInterval(timer);
}