const burgerControl = () => {
    const burgerBtn = document.querySelector('.header__menu-button');
    const headerMenu = document.querySelector('.header__menu');

    burgerBtn.addEventListener('click', () => {
        headerMenu.classList.toggle('header__menu_active');
    })

    document.addEventListener('click', (e) => {
        if((!e.target.matches('.header__menu') && !e.target.matches('.header__list')) && 
        !e.target.matches('.header__menu-button')
        && headerMenu.classList.contains('header__menu_active') || e.target.matches('.header__item')){
            headerMenu.classList.remove('header__menu_active');
        }
    })
}





export default {
    burgerControl,
}