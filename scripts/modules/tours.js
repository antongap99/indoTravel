
const loudFormData = async () => {
    const response = await fetch('./data/db.json');
    const data = await response.json();
    return data;
};

const createOption = (text) => {
    const option = document.createElement('option');
    option.value = text;
    option.className = 'tour__option';
    option.textContent = text;
    return option;
}

const removePersonSelect = () => {
    while (personSelect.children.length > 1) {
        personSelect.removeChild(personSelect.lastChild);
    };
}

const data = await loudFormData();
const dates= [];
const dataSelect = document.querySelector('#tour__date');
const personSelect = document.querySelector('#tour__people');
const arrayDataselect = [...dataSelect.options];


const renderDataTour = async () => {
  

    arrayDataselect.forEach((elem) => {
        if(elem.textContent !== 'Выбери дату'){
            dates.push(elem.textContent);
        }
    })


    removePersonSelect();
    
    data.forEach((elem) => {
       if(!dates.includes(elem.date)){
        dataSelect.append(createOption(elem.date));
       };
    })

    console.log(dataSelect);
    console.log('arrayDataselect: ', arrayDataselect);
}


renderDataTour();
console.log(data);



dataSelect.addEventListener('change', (e) => {
        removePersonSelect();
    data.forEach((elem) => {
        if(e.target.value === elem.date){
            for(let i = elem['min-people']; i <= elem['max-people']; i++ )
             personSelect.append(createOption(i));
        }
    })
})
