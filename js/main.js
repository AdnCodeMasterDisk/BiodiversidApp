// slider1
const slider1 = document.querySelector('.boxanimaleshorizontallist');

let isDown1 = false;
let startX1;
let scrollLeft1;

slider1.addEventListener('mousedown', handleMouseDown1);
slider1.addEventListener('touchstart', handleTouchStart1);

slider1.addEventListener('mouseleave', () => {
    isDown1 = false;
    slider1.classList.remove('active');
});

slider1.addEventListener('mouseup', handleMouseUp1);
slider1.addEventListener('touchend', handleTouchEnd1);

slider1.addEventListener('mousemove', handleMouseMove1);
slider1.addEventListener('touchmove', handleTouchMove1);

function handleMouseDown1(e) {
    isDown1 = true;
    slider1.classList.add('active');
    startX1 = e.pageX - slider1.offsetLeft;
    scrollLeft1 = slider1.scrollLeft;
}

function handleTouchStart1(e) {
    isDown1 = true;
    slider1.classList.add('active');
    startX1 = e.touches[0].pageX - slider1.offsetLeft;
    scrollLeft1 = slider1.scrollLeft;
}

function handleMouseUp1() {
    isDown1 = false;
    slider1.classList.remove('active');
}

function handleTouchEnd1() {
    isDown1 = false;
    slider1.classList.remove('active');
}

function handleMouseMove1(e) {
    if (!isDown1) return;
    e.preventDefault();
    const x = e.pageX - slider1.offsetLeft;
    const walk = (x - startX1) * 2; 
    slider1.scrollLeft = scrollLeft1 - walk;
}

function handleTouchMove1(e) {
    if (!isDown1) return;
    e.preventDefault();
    const x = e.touches[0].pageX - slider1.offsetLeft;
    const walk = (x - startX1) * 2; 
    slider1.scrollLeft = scrollLeft1 - walk;
}


// slider2
const slider2 = document.querySelector('.boxplantashorizontallist');

let isDown2 = false;
let startX2;
let scrollLeft2;

slider2.addEventListener('mousedown', handleMouseDown2);
slider2.addEventListener('touchstart', handleTouchStart2);

slider2.addEventListener('mouseleave', () => {
    isDown2 = false;
    slider2.classList.remove('active');
});

slider2.addEventListener('mouseup', handleMouseUp2);
slider2.addEventListener('touchend', handleTouchEnd2);

slider2.addEventListener('mousemove', handleMouseMove2);
slider2.addEventListener('touchmove', handleTouchMove2);

function handleMouseDown2(e) {
    isDown2 = true;
    slider2.classList.add('active');
    startX2 = e.pageX - slider2.offsetLeft;
    scrollLeft2 = slider2.scrollLeft;
}

function handleTouchStart2(e) {
    isDown2 = true;
    slider2.classList.add('active');
    startX2 = e.touches[0].pageX - slider2.offsetLeft;
    scrollLeft2 = slider2.scrollLeft;
}

function handleMouseUp2() {
    isDown2 = false;
    slider2.classList.remove('active');
}

function handleTouchEnd2() {
    isDown2 = false;
    slider2.classList.remove('active');
}

function handleMouseMove2(e) {
    if (!isDown2) return;
    e.preventDefault();
    const x = e.pageX - slider2.offsetLeft;
    const walk = (x - startX2) * 2; 
    slider2.scrollLeft = scrollLeft2 - walk;
}

function handleTouchMove2(e) {
    if (!isDown2) return;
    e.preventDefault();
    const x = e.touches[0].pageX - slider2.offsetLeft;
    const walk = (x - startX2) * 2; 
    slider2.scrollLeft = scrollLeft2 - walk;
}

//screen detall

function ShowdetaillScreen(){
    const screendetaill = document.getElementById("ScreenDetail");
    const screenPrincipal = document.getElementById("ScreenPrinciapal");

    screenPrincipal.classList.add("hide");
    screendetaill.classList.remove("hide");
}

function HidedetaillScreen(){
    const screendetaill = document.getElementById("ScreenDetail");
    const screenPrincipal = document.getElementById("ScreenPrinciapal");

    screenPrincipal.classList.remove("hide");
    screendetaill.classList.add("hide");
}