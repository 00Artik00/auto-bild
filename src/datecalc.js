import { DateTime } from "./luxon.js";
/**
 * Функция, которая высчитывает разницу между двумя датами
 * @param {string} firstDate Первая дата для сравнения
 * @param {string} secondDate Вторая дата для сравнения
 * @param {boolean} changeDate Не обязательный аргумент(опция), который 
 * показывает можно ли менять даты местами
 * @returns {object} Возвращает либо объект, содержащий поля: years, months, 
 * hours, minutes, seconds, либо объект ошибки.
 */
export function diffDates(firstDate, secondDate, changeDate = true) {
    firstDate = DateTime.fromISO(firstDate);
    secondDate = DateTime.fromISO(secondDate);


    if (changeDate) {
        if (firstDate > secondDate)
            secondDate = [firstDate, firstDate = secondDate][0];
    } else {
        if (firstDate > secondDate)
            return { error: true }
    }


    return secondDate.diff(firstDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();
}
/**
 * Функция, которая возвращает разметку, для удобной записи объекта разницы между
 * двумя датами
 * @param {object} diff Объект разницы между двумя датами полученный в функции:
 * diffDates
 * @returns 
 */
export const diffToHtml = diff => ` 
    <span> 
        ${diff.years ? 'Лет: ' + diff.years : ''}
        ${diff.months ? 'Месяцев: ' + diff.months : ''} 
        ${diff.days ? 'Дней: ' + diff.days : ''} 
        ${diff.hours ? 'Часов: ' + diff.hours : ''} 
        ${diff.minutes ? 'Минут: ' + diff.minutes : ''} 
        ${diff.seconds ? 'Секунд: ' + Math.trunc(diff.seconds) : ''} 
    </span> 
`;
