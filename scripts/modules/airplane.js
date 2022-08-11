const airPlane = document.createElement('div');

airPlane.style.cssText = `
position: fixed;
width: 50px;
height: 50px;
top: ${document.documentElement.clientHeight - 50}px;
right: 0;
pointer-events: none;
background: url('img/airplane.svg') center/contain no-repeat;
z-index: 999;
`

document.body.append(airPlane);

window.addEventListener('resize', () => {
   
    if( document.documentElement.clientWidth <= 758) {
        airPlane.style.display = 'none';
    } else {
        airPlane.style.display = 'block';
    }
})


    
const calcPositionAirPlane = (prevScroll) => {
    console.log('prevScroll: ', prevScroll);
    const maxDistance = document.documentElement.clientHeight - airPlane.clientHeight;
    const maxSroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    return () => {
        let persentScroll = (window.scrollY * 100) / maxSroll;

            let currentScroll = window.scrollY;
    
        console.log('1 ', currentScroll);
        
    const flyPosition = maxDistance * (persentScroll / 100);
    airPlane.style.transform = `translateY(${-flyPosition}px)`;

    if(currentScroll < prevScroll)  {
        airPlane.style.transform += ` rotate(180deg)`;
         console.log(' airPlane.style.transform: ',  airPlane.style.transform);
      }

    return currentScroll;      

    }
  
      
}

const debounce = (fn, raf = NaN) => {
    let prevScroll;
    return () =>{
        if(raf) return;
        raf = requestAnimationFrame(() =>{
            prevScroll = fn(prevScroll)();
            raf = NaN;
        })
    }
};


const calcPositionAirPlaneDebounce = debounce(calcPositionAirPlane);




window.addEventListener('scroll', () => {
    requestAnimationFrame(calcPositionAirPlaneDebounce);
})

// calcPositionAirPlane();