
import "./header.js";
import { handleCalcDates, handleTimer } from "./handlers.js";


//калькулятор
const dateCalcForm = document.getElementById("datecalc");

//таймер
const timerForm = document.querySelector('.timer');



dateCalcForm.addEventListener("submit", handleCalcDates);
timerForm.addEventListener('submit', handleTimer);



