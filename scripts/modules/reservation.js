import tours from './tours.js'
const {
    dateSelectControl,
    data, 
    renderDataTour,
} = tours;

const form = document.querySelector('.reservation__form');
const dateSelect = form.dates;
const peopleSelect = form.people;
const reservationData =document.querySelector('.reservation__data');
const reservationPrice =document.querySelector('.reservation__price');

function declOfNum(number, words) {  
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}
// reservationData.textContent = ``
const updateReservationData = (reservationData, reservationPrice, price, dateSelect) => {
    const dateArray = dateSelect.value.split('-');
    dateArray.map((elem) => {
        elem.split('');
    });
     const firstNumber = dateArray[0].split('.');
     const secondNumber = dateArray[1].split('.');
     const firstDate = new Date('2022',firstNumber[1] - 1, firstNumber[0]);
     const secondDate = new Date('2022',secondNumber[1] - 1, secondNumber[0]);
     let monthFirstDate = firstDate.toLocaleString('ru', { month: 'long' });
     let monthSecondDate = secondDate.toLocaleString('ru', { month: 'long' });
     const monthtransform = (month) => {
        if(month === 'март' ||  month === 'август'){
            month = month + 'а'
        } else{
             month = `${month.slice(0, month.length - 1)}` + 'я';  
        }
        return month
     }
     
     reservationData.textContent = `${firstDate.getDate()} ${monthtransform(monthFirstDate)} 
     - ${secondDate.getDate()} ${monthtransform(monthSecondDate)}, ${peopleSelect.value} ${declOfNum(+peopleSelect.value, ['человек', 'человека', 'человек'])} `

    reservationPrice.textContent = price;
}

renderDataTour(dateSelect ,peopleSelect , data)
dateSelectControl(dateSelect, data, peopleSelect);


const calcTourPrice = ( target) => {
    let price;
    data.forEach(elem => {

        if(elem.date === dateSelect.value) {
            price = +target.value* elem.price;
           
        }
    });

    return price;
}


form.addEventListener('change', (e) => {
    if(e.target.matches('#reservation__people')){
        const price = calcTourPrice(e.target);

        updateReservationData(reservationData, reservationPrice, price, dateSelect)
    }
});


const renderResponseWindowError = (form) => {
    const modal  = document.createElement('div');
    modal.className = `reservation__modal`;
    
    const titleModal = document.createElement('h1');
    titleModal.className = `modal__title_error`;
    titleModal.textContent = `Упс... Что-то пошло не так`
    
    const subtitle = document.createElement('p');
    subtitle.className = `modal__subtitle`;
    subtitle.textContent = `Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз`
    
    const modalBtn = document.createElement('button');
    modalBtn.className = `button reservation__button_error`;
    modalBtn.textContent = `Забронировать`;
    modal.append(titleModal, subtitle, modalBtn);
    const prevForm = form.innerHTML;
    
    console.log('form.style: ', form.style);
    form.innerHTML = modal.innerHTML;
    return prevForm;
}

const renderResponseWindowPass = (error, form) => {
    if(error){
        let prevForm = renderResponseWindowError(form);
        form.addEventListener('submit', () => {
            form.innerHTML = prevForm;
        });
        return;
    }
    const modal  = document.createElement('div');
    modal.className = `reservation__modal`;
    
    const titleModal = document.createElement('h1');
    titleModal.className = `modal__title`;
    titleModal.textContent = `Ваша заявка успешно отправлена`
    
    const subtitle = document.createElement('p');
    subtitle.className = `modal__subtitle`;
    subtitle.textContent = `Наши менеджеры свяжутся с вами в течении 3-х рабочих дней`
    
    const modalCircle = document.createElement('div');
    modalCircle.className = `modal__circle`;

    modalCircle.insertAdjacentHTML( 'afterbegin',`<svg width="47" height="36" viewBox="0 0 47 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.2618 27.8332L4.42849 16.9999L0.817383 20.611L15.2618 35.0554L46.2142 4.10306L42.6031 0.491943L15.2618 27.8332Z" fill="white"/>
    </svg>    
    `)

    modal.append(titleModal, subtitle, modalCircle);
    
    console.log('prevForm: ', prevForm);
    form.innerHTML = modal.innerHTML;
    return prevForm;
}



const sendReserveData = async  (body) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.cm/posts', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },});
    
    if(response.ok){
        const data = await response.json();
        renderResponseWindowPass(null, form);
        
        return;
    } else {
        throw new Error(response.status);
    }
    } catch (error) {
    renderResponseWindowPass(error, form);
    }    
}

const cleaerInnerForm = (form) => {
    
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('reservation__name');
    const phoneInput = document.getElementById('reservation__phone');
    try {
        sendReserveData({
            dates: form.dates.value,
            people: form.people.value,
            name: nameInput.value,
            phone: phoneInput.value,
            price: reservationPrice,
            userId: 1,
        } 
        );      

    } catch (error) {
        console.log(error);
    }
   
    

    
    
})

export default {
    sendReserveData,
}