
const timer = (deadline , timerWrapper) => {
    const timerCountDays = document.querySelector('.timer__count_days');
    const timerCountHours = document.querySelector('.timer__count_hours');
    const timerCountMinutes = document.querySelector('.timer__count_minutes');

    const timerUnitsDays = document.querySelector('.timer__units_days')
    const timerUnitsHours = document.querySelector('.timer__units_hours')
    const timerUnitsMinutes = document.querySelector('.timer__units_minutes')


    const getTimeRemaining = ( ) => {
        const dateStop = new Date(deadline).getTime();
        const dateNow = Date.now();
        const timeRemaining = dateStop - dateNow;

        const minutes = Math.floor(timeRemaining / 1000/ 60 % 60 );
        const hours = Math.floor(timeRemaining / 1000/ 60 / 60 % 24);
        const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

        return {
            timeRemaining,
            days,
            minutes,
            hours,
        }
    }


    const removeTimer = (timerWrapper) => {
        timerWrapper.previousElementSibling.remove();
            timerWrapper.remove();
    }


    const startTimeRemaining = () => {
        const timer = getTimeRemaining();

        timerCountDays.textContent = timer.days;
        timerCountHours.textContent = timer.hours;
        timerCountMinutes.textContent = timer.minutes;

        

         const unitDayModify = ( ) => {
            if((timer.days === 1 ||
                 timer.days % 10  === 1 || 
                 timer.days % 100 === 1 ||
                 timer.days % 1000 === 1 ) &&  Math.floor(timer.days) / 10 !== 1
                 ) {
                timerUnitsDays.textContent = 'день';
            } else if (1 < timer.days && timer.days < 5) {
                timerUnitsDays.textContent = 'дня';
            } else if ( timer.days >= 5) {
                timerUnitsDays.textContent = 'дней';
            }

        }
        const unitHourModify = ( ) => {
            if((timer.hours === 1 || 
                timer.hours % 10 === 1) && Math.floor(timer.hours / 10) !== 1 ) {

                timerUnitsHours.textContent = 'час'
            }else if ((1 < timer.hours && timer.hours < 5 
                || 1 < timer.hours % 10 && timer.hours  % 10 < 5) &&  Math.floor(timer.hours / 10) !== 1) {
                timerUnitsHours.textContent = 'часа';
            } else if ( timer.hours >= 5 || 
                 timer.hours % 10 >= 5 || 
                 timer.hours === 0 ||
                 timer.hours % 10 === 0
                 ) {
                timerUnitsHours.textContent = 'часов';
            }
        }
        const unitMinuteModify = ( ) => {
            if((timer.minutes === 1 
                || timer.minutes % 10 === 1) &&
                Math.floor(timer.minutes / 10) !== 1
            ) {
                timerUnitsMinutes.textContent = 'минута'
            }else if ((1 < timer.minutes &&  timer.minutes < 5 
                || 1 < timer.minutes  % 10  &&  timer.minutes % 10 < 5) && 
            (Math.floor(timer.minutes / 10) !== 1) ) {

                timerUnitsMinutes.textContent = 'минуты';
            } else if ( timer.minutes >= 5 
                || timer.minutes % 10 >= 5 
                || timer.minutes === 0
                || timer.minutes % 10 === 0
                
                ) {
                timerUnitsMinutes.textContent = 'минут';
            }
        }
        unitDayModify();
        unitHourModify();
        unitMinuteModify();
        
        const intervalId = setTimeout(startTimeRemaining, 10000);

         if(timer.timeRemaining <= 0 ) {

            clearTimeout(intervalId);

            timerCountDays.textContent = '0';
            timerCountHours.textContent = '00';
            timerCountMinutes.textContent = '00';


            removeTimer(timerWrapper);
            
         }
        
     }

    

    startTimeRemaining();
}

const startTimer = () => {
    const timerWrapper = document.querySelector('.timer');
try {
    timer(timerWrapper.dataset.timerDeadline, timerWrapper);
} catch (error) {
    console.log('акция закончилась');
}
    

   
}

startTimer();


export default {startTimer};