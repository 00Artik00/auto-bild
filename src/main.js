import '../style/style.css';
import "./header.js";
import { handleCalcDates, handleTimer, stopTimer } from "./handlers.js";
const stopButton = document.querySelector(".stopTimer")


//калькулятор
const dateCalcForm = document.getElementById("datecalc");

//таймер
const timerForm = document.querySelector('.timer');



dateCalcForm.addEventListener("submit", handleCalcDates);
timerForm.addEventListener('submit', handleTimer);
stopButton.addEventListener('click', stopTimer);



