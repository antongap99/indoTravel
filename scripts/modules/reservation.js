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


const sendReserveData = async  (body) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },});

    const data = await response.json();
    return data;
}

const renderResponseWindow = () => {

}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('reservation__name');
    const phoneInput = document.getElementById('reservation__phone');

    
    sendReserveData({
        dates: form.dates.value,
        people: form.people.value,
        name: nameInput.value,
        phone: phoneInput.value,
        price: reservationPrice,
        userId: 1,
      } );
})

export default {
    sendReserveData,
}