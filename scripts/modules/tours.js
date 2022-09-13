const dataSelect = document.querySelector('#tour__date');
const personSelect = document.querySelector('#tour__people');



const loudFormData = async () => {
    const response = await fetch('./data/db.json');
    const data = await response.json();
    return data;
};
const data = await loudFormData();

const createOption = (text) => {
    const option = document.createElement('option');
    option.value = text;
    option.className = 'tour__option';
    option.textContent = text;
    return option;
}

const removePersonSelect = (personSelect) => {
    while (personSelect.children.length > 1) {
        personSelect.removeChild(personSelect.lastChild);
    };
}

const renderDataTour = async ( dataSelect ,personSelect , data) => {
    const dates= [];
    removePersonSelect(personSelect);

    [...dataSelect.options].forEach((elem) => {
        if(elem.textContent !== 'Выбери дату' || elem.textContent !== 'Дата путешествия'){
            dates.push(elem.textContent);
        }
    })

    data.forEach((elem) => {
       if(!dates.includes(elem.date)){
        dataSelect.append(createOption(elem.date));
       };
    })
}




const dateSelectControl = (dataSelect, data , personSelect ) => {
    dataSelect.addEventListener('change', (e) => {
        let target = e.target;
        removePersonSelect(personSelect);
        
    data.forEach((elem) => {
        if(target.value === elem.date){
            for(let i = elem['min-people']; i <= elem['max-people']; i++ )
             personSelect.append(createOption(i));
        }
    })
})
}








renderDataTour(dataSelect ,personSelect , data);
dateSelectControl(dataSelect, data , personSelect);


export default {
    removePersonSelect,
    createOption,
    dateSelectControl,
    data,
    renderDataTour,
}