import tours from './tours.js'
const {
    dateSelectControl,
    data, 
    renderDataTour,
} = tours;
import scroll from './getScrollbarSize.js'
const  {getScrollbarWidth} = scroll;
const form = document.querySelector('.reservation__form');
const dateSelect = form.dates;
const peopleSelect = form.people;
const reservationData =document.querySelector('.reservation__data');
const reservationPrice =document.querySelector('.reservation__price');
const nameInput = document.getElementById('reservation__name');
const phoneInput = document.getElementById('reservation__phone');
const cssStyleHash = new Map();
const scrollbarWidth = getScrollbarWidth();


function declOfNum(number, words) {  
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}
// reservationData.textContent = ``

const loadCss = (url) => {
    if(cssStyleHash.has(url)) {
        return cssStyleHash.get(url);
    }
    const stylePromise =  new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = `stylesheet`;
        link.href = url;
        document.head.append(link);

        link.addEventListener('load', () => {
            resolve();
        });
    });

    cssStyleHash.set(url, stylePromise);
    return stylePromise;
}

const distructureStringMonth = (dateArray) => {
    const firstNumber = dateArray[0].split('.');
    const secondNumber = dateArray[1].split('.');
    const firstDate = new Date('2022',firstNumber[1] - 1, firstNumber[0]);
    const secondDate = new Date('2022',secondNumber[1] - 1, secondNumber[0]);
    let monthFirstDate = firstDate.toLocaleString('ru', { month: 'long' });
    let monthSecondDate = secondDate.toLocaleString('ru', { month: 'long' });
    return {
        firstNumber,
        secondNumber,
        firstDate,
        secondDate,
        monthFirstDate,
        monthSecondDate,
    }
}


const monthtransform = (month) => {
    if(month === 'март' ||  month === 'август'){
        month = month + 'а'
    } else{
         month = `${month.slice(0, month.length - 1)}` + 'я';  
    }
    return month
 }  

 const ScrollBarControl = (bool) => {
    if(!bool){
        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
        document.body.style.overflowY = '';
        document.body.style.paddingRight = ''
    }
 }

const updateReservationData = (reservationData, reservationPrice, price, dateSelect) => {
    const dateArray = dateSelect.value.split('-');

    const {
        firstDate,
        secondDate,
        monthFirstDate,
        monthSecondDate,} = distructureStringMonth(dateArray);

    
     
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
    
    form.innerHTML = modal.innerHTML;
    return prevForm;
}

const renderResponseWindowPass = async (error, form) => {
    if(error){
        renderResponseWindowError(form);
        return;
    };

    await loadCss('./css/components/reservationResponse.css');
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

    modalCircle.insertAdjacentHTML( 'afterbegin',`<svg class = 'circle__svg' width="47" height="36" viewBox="0 0 47 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.2618 27.8332L4.42849 16.9999L0.817383 20.611L15.2618 35.0554L46.2142 4.10306L42.6031 0.491943L15.2618 27.8332Z" fill="white"/>
    </svg>    
    `)

    modal.append(titleModal, subtitle, modalCircle);
    form.innerHTML = modal.innerHTML;
}



const sendReserveData = async  (body, callback) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },});
    
        if(response.ok){
            // const data = await response.json();
            callback(null, form);
            
            return;
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        callback(error, form);
    }    
}


const btnReserve = document.querySelector('.reservation__button');
form.addEventListener('change', (e) => {
    if(e.target.matches('#reservation__people')){
        const price = calcTourPrice(e.target);

        updateReservationData(reservationData, reservationPrice, price, dateSelect)
    }
    if(dateSelect.options[dateSelect.options.selectedIndex].textContent !== 'Дата путешествия' && 
        peopleSelect.options[peopleSelect.options.selectedIndex].textContent !== 'Количество человек' 
        && nameInput.value !== ''  && phoneInput.value !== '') {
            btnReserve.removeAttribute('disabled');
        } else {
            btnReserve.setAttribute('disabled', '');
    };
  })





const loadmodalHtml = (formData) => {
    const {
        dates,
        people,
        price }  = formData;

    const  {
        firstDate,
        secondDate,
        monthFirstDate,
        monthSecondDate,}  = distructureStringMonth(dates.split('-'));


   const modalForm = document.createElement('div');
   modalForm.innerHTML =   `<div class="overlay overlay_confirm">
    <form class="modal modal__сonfirm">
      <h2 class="confirm__title">Подтверждение заявки</h2>
      <p class="confirm">Бронирование путешествия в Индию на ${people} ${declOfNum(+people, ['человек', 'человека', 'человек'])}</p>
      <p class="confirm">В даты: ${firstDate.getDate()} ${monthtransform(monthFirstDate)}  - ${secondDate.getDate()}  ${monthtransform(monthSecondDate)}</p>
      <p class="confirm">Стоимость тура ${price}</p>
      <div class="confirm">
        <button class="confirm confirm">Подтверждаю</button>
        <button class="confirm confirm">Изменить данные</button>
      </div>
    </form>
  </div>`;
  ScrollBarControl(false);
  
  document.body.append(modalForm);
  return modalForm;
}


const modalClose = (elem) => {
    elem.remove();
}

form.addEventListener('submit', async (e) => {
    

    e.preventDefault();
    const overlay =  loadmodalHtml({
            dates: form.dates.value,
            people: form.people.value,
            name: nameInput.value,
            phone: phoneInput.value,
            price: reservationPrice.textContent,
        })

    await loadCss('./css/components/modal.css');

    const modal = document.querySelector('.modal')
    const confirmBtnEdit = document.querySelector('.confirm__btn_edit');
    console.log('confirmBtnEdit: ', confirmBtnEdit);
    modal.addEventListener('submit', (e) => {
        e.preventDefault();

            try {
                sendReserveData({
                    dates: form.dates.value,
                    people: form.people.value,
                    name: nameInput.value,
                    phone: phoneInput.value,
                    price: reservationPrice.textContent,
                    userId: 1,
                }, renderResponseWindowPass
                ).then(modalClose(overlay));
        
            } catch (error) {
                console.log(error);
            }
            ScrollBarControl(true)
    });
    confirmBtnEdit.addEventListener('click', () => {
        modalClose(overlay);  
        ScrollBarControl(true)
    })
});





export default {
    sendReserveData,
}