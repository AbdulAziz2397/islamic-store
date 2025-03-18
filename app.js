//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 3800;

nextDom.onclick = function () {
    showSlider('next');
}

prevDom.onclick = function () {
    showSlider('prev');
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

// ............. collection slider .................

const collectionSlider = document.querySelector(".collectionSlider");
const form = document.querySelector(".form");
let mouseDownAt = 0;
let left = 0;
collectionSlider.onmousedown = (e) => {
    mouseDownAt = e.clientX;
    console.log(mouseDownAt);
};
collectionSlider.onmouseup = () => {
    mouseDownAt = 0;
    collectionSlider.style.userSelect = 'unset';
    collectionSlider.style.cursor = 'unset';
    form.style.pointerEvents = 'unset';
    form.classList.remove('left');
    form.classList.remove('right');

}
collectionSlider.addEventListener('touchstart', (e) => mouseDownAt = e.touches[0].clientX);
collectionSlider.addEventListener('touchmove', (e) => { if (mouseDownAt != 0) handleMove(e.touches[0].clientX); });
collectionSlider.addEventListener('touchend', () => { mouseDownAt = 0; resetSlider(); });
collectionSlider.onmousemove = e => {
    if (mouseDownAt == 0) return;
    collectionSlider.style.userSelect = 'none';
    collectionSlider.style.cursor = 'grab';
    form.style.pointerEvents = 'none';

    if (e.clientX > mouseDownAt) {
        form.classList.add('left');
        form.classList.remove('right');
    } else if (e.clientX < mouseDownAt) {
        form.classList.remove('left');
        form.classList.add('right');
    }
    // increase or decrease the speed 
    //by changing the value of 'speed'
    let speed = 3;
    let leftTemporary = left + ((e.clientX - mouseDownAt) / speed);
    let leftLimit = form.offsetWidth - collectionSlider.offsetWidth / 2;


    if (leftTemporary < 0 && Math.abs(leftTemporary) < leftLimit) {
        form.style.setProperty('--left', left + 'px');
        left = leftTemporary;
        mouseDownAt = e.clientX;
    }

}


