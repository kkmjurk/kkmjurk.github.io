
const menuToggle = document.getElementById('menuToggle'); // кнопка "открыть меню"
const menuClose = document.getElementById('menuClose'); // кнопка "закрыть меню"
const sidebar = document.querySelector('.window'); // само выезжающее меню

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('is-open');
});

menuClose.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
});




const block1Button = document.querySelector('.block1__text--span');
const block1ButtonText = document.querySelector('.block1__text--span-p');
const block1MoreText = document.querySelector('.block1__text--p-moreText');

block1Button.addEventListener('click', () => {
    block1MoreText.classList.toggle('is-visible');

    // Состояние читаем из самого DOM (класс уже переключили строкой выше),
    // а не из отдельной переменной isOpen, которой нигде не было объявлено.
    const isOpen = block1MoreText.classList.contains('is-visible');
    block1ButtonText.textContent = isOpen ? 'Скрыть' : 'Читать дальше';
});

document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile) {
        const buttonsSwiper = new Swiper('.block1__buttons', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            freeMode: true,
        });

    }
});

//brands block
document.addEventListener('DOMContentLoaded', () => {

    const brands = document.querySelector('.block2__brands');
    const brandsItems = brands.querySelectorAll('.swiper-slide');
    const moreButton = document.querySelector('.block2__brands--more');

    let isExpanded = false;
    let brandsSwiper = null;


    // -------------------------
    // Сколько карточек показывать
    // -------------------------

    function getVisibleCount() {

        const width = window.innerWidth;

        if (width >= 1120) {
            return 4;
        }

        if (width >= 768) {
            return 3;
        }

        return brandsItems.length;
    }


    // -------------------------
    // Показать / скрыть карточки
    // -------------------------

    function updateBrands() {

        const visibleCount = getVisibleCount();

        brandsItems.forEach((item, index) => {

            if (index < visibleCount || isExpanded) {
                item.classList.remove('is-hidden');
            } else {
                item.classList.add('is-hidden');
            }

        });


        // На мобильном кнопка не нужна
        if (window.innerWidth < 768) {

            moreButton.style.display = 'none';

            return;
        }


        // Если все карточки помещаются —
        // кнопку тоже не показываем

        if (brandsItems.length <= visibleCount) {

            moreButton.style.display = 'none';

        } else {

            moreButton.style.display = 'flex';

            moreButton.querySelector('span').textContent =
                isExpanded ? 'Скрыть' : 'Показать все';

        }

    }


    // -------------------------
    // Swiper только на мобильном
    // -------------------------

    function updateSwiper() {

        const isMobile = window.innerWidth < 768;


        if (isMobile && !brandsSwiper) {

            brandsSwiper = new Swiper('.block2__brands', {

                slidesPerView: 1,
                spaceBetween: 16,

                pagination: {
                    el: '.block2__brands .swiper-pagination',
                    clickable: true,
                },

            });

        }


        if (!isMobile && brandsSwiper) {

            brandsSwiper.destroy(true, true);

            brandsSwiper = null;

        }

    }


    // -------------------------
    // Кнопка "Показать все"
    // -------------------------

    moreButton.addEventListener('click', () => {

        isExpanded = !isExpanded;

        updateBrands();

    });


    // -------------------------
    // Первый запуск
    // -------------------------

    updateSwiper();
    updateBrands();


    // -------------------------
    // При изменении размера
    // -------------------------

    window.addEventListener('resize', () => {

        updateSwiper();
        updateBrands();

    });

});

//remont block
document.addEventListener('DOMContentLoaded', () => {

    const offers = document.querySelector('.block3__offer');
    const offersItems = offers.querySelectorAll('.swiper-slide');
    const moreButton = document.querySelector('.block3__offer--span');

    let isExpanded = false;
    let offersSwiper = null;


    // -------------------------
    // Сколько карточек показывать
    // -------------------------

    function getVisibleCount() {

        const width = window.innerWidth;

        if (width >= 1120) {
            return 4;
        }

        if (width >= 768) {
            return 3;
        }

        return offersItems.length;
    }


    // -------------------------
    // Показать / скрыть карточки
    // -------------------------

    function updateBrands() {

        const visibleCount = getVisibleCount();

        offersItems.forEach((item, index) => {

            if (index < visibleCount || isExpanded) {
                item.classList.remove('is-hidden');
            } else {
                item.classList.add('is-hidden');
            }

        });


        // На мобильном кнопка не нужна
        if (window.innerWidth < 768) {

            moreButton.style.display = 'none';

            return;
        }


        // Если все карточки помещаются —
        // кнопку тоже не показываем

        if (offersItems.length <= visibleCount) {

            moreButton.style.display = 'none';

        } else {

            moreButton.style.display = 'flex';

            moreButton.querySelector('span').textContent =
                isExpanded ? 'Скрыть' : 'Показать все';

        }

    }


    // -------------------------
    // Swiper только на мобильном
    // -------------------------

    function updateSwiper() {

        const isMobile = window.innerWidth < 768;


        if (isMobile && !offersSwiper) {

            offersSwiper = new Swiper('.block3__offer', {

                slidesPerView: 1,
                spaceBetween: 16,

                pagination: {
                    el: '.block3__offer .swiper-pagination',
                    clickable: true,
                },

            });

        }


        if (!isMobile && offersSwiper) {

            offersSwiper.destroy(true, true);

            offersSwiper = null;

        }

    }


    // -------------------------
    // Кнопка "Показать все"
    // -------------------------

    moreButton.addEventListener('click', () => {

        isExpanded = !isExpanded;

        updateBrands();

    });


    // -------------------------
    // Первый запуск
    // -------------------------

    updateSwiper();
    updateBrands();


    // -------------------------
    // При изменении размера
    // -------------------------

    window.addEventListener('resize', () => {

        updateSwiper();
        updateBrands();

    });

});




