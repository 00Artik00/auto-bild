import { diffDates, diffToHtml } from "./datecalc.js";
import { formatError } from "./utils.js";

const dateCalcResult = document.getElementById("datecalc__result");
const timerResult = document.getElementById('timer__result');
const stopButton = document.querySelector('.stopTimer');
const startButton = document.querySelector('.startTimer');
/* Переменная, которая отвечает за то, с какой милисекунды прошедшей с 1 января
 1970 г.UTC необходимо начать отсчет для таймера */
let startTime = 0;
// Номер таймера, который необходимо выключить
let timer = 1;

/**
 * Функция обработчик, для кнопки расчитать промежуток. Забирает значения первой
 * и второй даты из полей инпута, после чего сравнивает их и выводит результат
 * на экран
 * @param {object} event object event
 */
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
/**
 * Функция обработчик для кнопки Запустить таймер. Забирает значение времени из
 * инпутов, после сравнивает его с текущим и выводит на экран разницу. Время 
 * начала таймера сохраняется в глобальную переменную, чтобы впоследствие ей можно
 * было воспользоваться для повторного включения таймера.
 * @param {*} event 
 */
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
/**
 * Обработчик для кнопки остановить таймер
 * @param {*} event 
 */
export function stopTimer(event) {
    event.preventDefault();
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(timer);
}