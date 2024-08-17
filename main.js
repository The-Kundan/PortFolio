var typed= new Typed(".text", {
    strings:["Android Developer","Java Developer","Problem Solver"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
})
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
});