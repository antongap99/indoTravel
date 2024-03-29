
export const footerFormController = (sendReserveData) => {

const footerInput = document.querySelector('.footer__input');
const form = document.querySelector('.footer__form');


const postMessage = () => {
    form.innerHTML = `
    <div class = 'postMessage'>
    <h2 class = 'postMessage__title'>Ваша заявка успешно отправлена</h2>
    <p>Наши менеджеры свяжутся с вами в течении 3-ч рабочих дней</p>
    </div>`



}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendReserveData({email: footerInput.value}, postMessage);
});


}
