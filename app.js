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

// ................... collection slider ....................


// let circle = document.querySelector('.circle');
// let slider = document.querySelector('.cSlider');
// let list = document.querySelector('.cList');
// let cPrev = document.getElementById('cPrev');
// let cNext = document.getElementById('cNext');
// let items = document.querySelectorAll('.cList .cItem');
// let count = items.length;
// let active = 1;
// let leftTransform = 0;
// let width_item = items[active].offsetWidth;

// cNext.onclick = () => {
//     active = active >= count - 1 ? count - 1 : active + 1;
//     runCarousel();
// }
// cPrev.onclick = () => {
//     active = active <= 0 ? active : active - 1;
//     runCarousel();
// }
// function runCarousel() {
//     cPrev.style.display = (active == 0) ? 'none' : 'block';
//     cNext.style.display = (active == count - 1) ? 'none' : 'block';


//     let old_active = document.querySelector('.cItem.active');
//     if(old_active) old_active.classList.remove('active');
//     items[active].classList.add('active');

//      leftTransform = width_item * (active - 1) * -1;
//     list.style.transform = `translateX(${leftTransform}px)`;
// }
// runCarousel();


// // Set Text on a Circle
// let textCircle = circle.innerText.split('');
// circle.innerText = '';
// textCircle.forEach((value, key) => {
//     let newSpan =  document.createElement("span");
//     newSpan.innerText = value;
//     let rotateThisSpan = (360 / textCircle.length) * (key + 1);
//     newSpan.style.setProperty('--rotate', rotateThisSpan + 'deg');
//     circle.appendChild(newSpan); 
// });

// ............. collection slider .................
const collectionSlider = document.querySelector(".collectionSlider");
const form = document.querySelector(".form");
let mouseDownAt = 0;
let left = 0;

function handleMove(clientX) {
    if (mouseDownAt == 0) return;
    collectionSlider.style.userSelect = 'none';
    collectionSlider.style.cursor = 'grab';
    form.style.pointerEvents = 'none';

    if (clientX > mouseDownAt) {
        form.classList.add('left');
        form.classList.remove('right');
    } else if (clientX < mouseDownAt) {
        form.classList.remove('left');
        form.classList.add('right');
    }

    let speed = 3;
    let leftTemporary = left + ((clientX - mouseDownAt) / speed);
    let leftLimit = form.offsetWidth - collectionSlider.offsetWidth / 2;

    if (leftTemporary < 0 && Math.abs(leftTemporary) < leftLimit) {
        form.style.setProperty('--left', left + 'px');
        left = leftTemporary;
        mouseDownAt = clientX;
    }
}

function resetSlider() {
    mouseDownAt = 0;
    collectionSlider.style.userSelect = 'unset';
    collectionSlider.style.cursor = 'unset';
    form.style.pointerEvents = 'unset';
    form.classList.remove('left');
    form.classList.remove('right');
}

collectionSlider.onmousedown = (e) => mouseDownAt = e.clientX;
collectionSlider.onmousemove = (e) => handleMove(e.clientX);
collectionSlider.onmouseup = resetSlider;

// Touch Events
collectionSlider.addEventListener('touchstart', (e) => mouseDownAt = e.touches[0].clientX);
collectionSlider.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX));
collectionSlider.addEventListener('touchend', resetSlider);
