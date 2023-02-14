const sliderController = () => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 2,
        autoplay: {
            delay: 2000,
        },
        navigation: {
          nextEl: '.album__right',
          prevEl: '.album__left',
        },
        direction: 'horizontal',
    });
}

export default sliderController;