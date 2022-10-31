const burgerControl = () => {
    const burgerBtn = document.querySelector('.header__menu-button');
    const headerMenu = document.querySelector('.header__menu');
    const durationOpacity = 300;
    let startTime = NaN;
    let hideId;

    const toggleBurger = (timestamp) => {
        startTime ||= timestamp;

        const progress = (timestamp - startTime) / durationOpacity;

        if(!headerMenu.classList.contains('header__menu_active')){
            headerMenu.style.opacity = progress;
            if(progress < 1) {
                hideId = requestAnimationFrame(toggleBurger);
            } else {
                headerMenu.style.opacity = 1;
                cancelAnimationFrame(hideId);
                headerMenu.classList.toggle('header__menu_active');
            }
        } else {
            headerMenu.style.opacity = 1 - progress;

            if(progress < 1) {
                hideId = requestAnimationFrame(toggleBurger);
            } else {
                headerMenu.style.opacity = 0;
                cancelAnimationFrame(hideId);
                headerMenu.classList.toggle('header__menu_active');
            }
        }

    }




    burgerBtn.addEventListener('click', () => {
        requestAnimationFrame((timestamp) => {
            startTime = NaN;
            toggleBurger(timestamp);
       })
        // headerMenu.classList.toggle('header__menu_active');

    })

    document.addEventListener('click', (e) => {
        if(((!e.target.matches('.header__menu') && !e.target.matches('.header__list')) &&
        !e.target.matches('.header__menu-button')
        && headerMenu.classList.contains('header__menu_active')) || e.target.matches('.header__item') ){

            requestAnimationFrame((timestamp) => {
                startTime = NaN;
                toggleBurger(timestamp);
            })
            // headerMenu.classList.remove('header__menu_active');
        }
    })
}





export default {
    burgerControl,
}