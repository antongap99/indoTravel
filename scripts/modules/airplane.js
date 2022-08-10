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


    
const calcPossitionAirPlane = () => {
    const maxDistance = document.documentElement.clientHeight - airPlane.clientHeight;

    const maxSroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const persentScroll = (window.scrollY * 100) / maxSroll;

    const flyPosition = maxDistance * (persentScroll / 100);

    airPlane.style.transform = `translateY(${-flyPosition}px)`;
}




window.addEventListener('scroll', () => {
    requestAnimationFrame(calcPossitionAirPlane);
})

calcPossitionAirPlane();