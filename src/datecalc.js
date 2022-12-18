import { DateTime } from "./luxon.js";

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
