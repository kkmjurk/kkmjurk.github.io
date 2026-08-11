

const menuToggle = document.getElementById('menuToggle'); // got toggle button
const menuClose = document.getElementById('menuClose'); // got close button
const sidebar = document.querySelector('.window'); //got the window itself

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('is-open'); // Add the 'is-open' class to show the sidebar
});

menuClose.addEventListener('click', () => {
    sidebar.classList.remove('is-open'); // Remove the 'is-open' class to hide the sidebar
});

const buttonsSwiper = new Swiper('.block1__buttons', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    freeMode: true,
});

// document.querySelectorAll('.block2__span, .block3__test--span')array.forEach(btn => {
//     btn.addEventListener('click', () => {
//         const block = btn.closest('.block2') || btn, closest('.block3');
//         block.querySelectorAll('.hidden').forEach(item => item.classList.remove('hidden'));
//     });
// });