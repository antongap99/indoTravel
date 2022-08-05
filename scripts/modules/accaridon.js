
const accaridonControl = () => {
    const travelItems = document.querySelectorAll('.travel__item');
    const titleBtns = document.querySelectorAll('.travel__item-title');
    const textWrapper = document.querySelectorAll('.travel__item-text-wrapper');
    
    
    let heightWrapper = 0;
    textWrapper.forEach((elem) => {
        if(heightWrapper < elem.scrollHeight) {
            heightWrapper = elem.scrollHeight;
        }
    })
    
    
    
    titleBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            for(let i = 0; i < travelItems.length; i++) {
                if(index ===  i ) {
                    textWrapper[i].style.height = 
                    travelItems[i].classList.contains('travel__item_active') ? '': `${heightWrapper}px`  //проверяем есть ли такой класс
                   //scrollHeight - измерение высоты контента в элементе, включая содержимое, невидимое из-за прокрутки. 
                   travelItems[i].classList.add('travel__item_active');
                } else {
                    travelItems[i].classList.remove('travel__item_active');
                    textWrapper[i].style.height = '';
                }
            } 
            
        })
    })
}





export default {
    accaridonControl,
}