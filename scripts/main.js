"use strict";

import timerApi from './modules/timer.js';
const {startTimer} = timerApi;
import accardion from './modules/accaridon.js';
const {accaridonControl} = accardion;
import burger from './modules/burgerMenu.js';
const{burgerControl} = burger; 

accaridonControl();
startTimer();
burgerControl();    