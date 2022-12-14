"use strict";

import timerApi from './modules/timer.js';
const {startTimer} = timerApi;
import accardion from './modules/accaridon.js';
const {accaridonControl} = accardion;
import burger from './modules/burgerMenu.js';
const{burgerControl} = burger; 
import './modules/airplane.js';
import './modules/tours.js';
import './modules/reservation.js';
import './modules/footerForm.js'
import sliderController from './modules/slider.js'


const init = () => {
    accaridonControl();
    startTimer();
    burgerControl();
    sliderController();
}

init();