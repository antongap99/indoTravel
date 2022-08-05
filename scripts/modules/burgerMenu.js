const burgerControl = () => {
    const burgerBtn = document.querySelector('.header__menu-button');
    const headerMenu = document.querySelector('.header__menu');

    burgerBtn.addEventListener('click', () => {
        headerMenu.classList.toggle('header__menu_active');
    })
}

export default {
    burgerControl,
}