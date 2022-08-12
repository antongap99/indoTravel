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
console.log('reservationData: ', reservationData);
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
     const monthFirstDate = firstDate.toLocaleString('ru', { month: 'long' });
     const monthSecondDate = secondDate.toLocaleString('ru', { month: 'long' });
     const monthFirstDatePubplic = `${monthFirstDate.slice(0, monthFirstDate.length - 1)}` + 'я';
     const monthSecondDatePubplic = `${monthSecondDate.slice(0, monthSecondDate.length - 1)}` + 'я';
    
     reservationData.textContent = `${firstDate.getDate()} ${monthFirstDatePubplic} 
     - ${secondDate.getDate()} ${monthSecondDatePubplic}, ${peopleSelect.value} ${declOfNum(+peopleSelect.value, ['человек', 'человека', 'человек'])} `

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
})
