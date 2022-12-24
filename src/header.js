
const headerButtons = document.querySelectorAll('.header button');
//Назначение обработчики для каждой кнопки в шапке сайта
for (const button of headerButtons) {
    button.addEventListener('click', (event) => {
        headerButtons.forEach(el => {
            if (el.classList.contains("choose")) {
                el.classList.remove("choose")
            }
            el.disabled = false;
        })
        document.querySelectorAll("form").forEach(el => {
            el.classList.add('hidden')
        })
        const but = event.target;
        const elem = document.querySelector(`.${but.innerHTML}`);
        elem.classList.remove('hidden');
        but.classList.toggle('choose');
        but.disabled = true;
    })
}
