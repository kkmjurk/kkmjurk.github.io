
const menuToggle = document.getElementById('menuToggle'); // кнопка "открыть меню"
const menuClose = document.getElementById('menuClose'); // кнопка "закрыть меню"
const sidebar = document.querySelector('.window'); // само выезжающее меню

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('is-open');
});

menuClose.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
});




const block1Button = document.querySelector('.block1__toggle');
const block1ButtonText = document.querySelector('.block1__toggle-text');
const block1MoreText = document.querySelector('.block1__more-text');

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
    if (!brands) return;

    const brandsItems = brands.querySelectorAll('.swiper-slide');
    const moreButton = document.querySelector('.block2__more');
    const moreLabel = moreButton ? moreButton.querySelector('span') : null;

    let isExpanded = false;


    function getVisibleCount() {
        const width = window.innerWidth;

        if (width >= 1366) return 4;
        if (width >= 768) return 3;

        return brandsItems.length;
    }

    function updateBrands() {
        const visibleCount = getVisibleCount();

        brandsItems.forEach((item, index) => {
            if (index < visibleCount || isExpanded) {
                item.classList.remove('is-hidden');
            } else {
                item.classList.add('is-hidden');
            }
        });

        if (window.innerWidth < 768) {
            if (moreButton) moreButton.style.display = 'none';
            return;
        }

        if (brandsItems.length <= visibleCount) {
            if (moreButton) moreButton.style.display = 'none';
        } else if (moreButton) {
            moreButton.style.display = 'flex';
            if (moreLabel) {
                moreLabel.textContent = isExpanded ? 'Скрыть' : 'Показать все';
            }
        }
    }

    if (window.innerWidth < 768) {
        new Swiper('.block2__brands', {
            slidesPerView: 1,
            spaceBetween: 16,
            pagination: {
                el: '.block2__brands .swiper-pagination',
                clickable: true,
            },
        });
    }

    if (moreButton) {
        moreButton.addEventListener('click', () => {
            isExpanded = !isExpanded;
            updateBrands();
        });
    }

    updateBrands();

    window.addEventListener('resize', () => {

        updateBrands();
    });

});

//remont block
document.addEventListener('DOMContentLoaded', () => {

    const offers = document.querySelector('.block3__offer');
    if (!offers) return;

    const offersItems = offers.querySelectorAll('.swiper-slide');
    const moreButton = document.querySelector('.block3__more');
    const moreLabel = moreButton ? moreButton.querySelector('span') : null;

    let isExpanded = false;


    function getVisibleCount() {
        const width = window.innerWidth;

        if (width >= 1366) return 4;
        if (width >= 768) return 3;

        return offersItems.length;
    }

    function updateOffers() {
        const visibleCount = getVisibleCount();

        offersItems.forEach((item, index) => {
            if (index < visibleCount || isExpanded) {
                item.classList.remove('is-hidden');
            } else {
                item.classList.add('is-hidden');
            }
        });

        if (window.innerWidth < 768) {
            if (moreButton) moreButton.style.display = 'none';
            return;
        }

        if (offersItems.length <= visibleCount) {
            if (moreButton) moreButton.style.display = 'none';
        } else if (moreButton) {
            moreButton.style.display = 'flex';
            if (moreLabel) {
                moreLabel.textContent = isExpanded ? 'Скрыть' : 'Показать все';
            }
        }
    }

    if (window.innerWidth < 768) {
        new Swiper('.block3__offer', {
            slidesPerView: 1.3,
            spaceBetween: 10,
            centeredSlides: true,
            loop: false,
            pagination: {
                el: '.block3__offer .swiper-pagination',
                clickable: true,
            },
        });
    }

    if (moreButton) {
        moreButton.addEventListener('click', () => {
            isExpanded = !isExpanded;
            updateOffers();
        });
    }

    updateOffers();

    window.addEventListener('resize', () => {

        updateOffers();
    });

});

// cards block

document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.block4__card');
    if (!cardsContainer) return;

    const cardsSlides = cardsContainer.querySelectorAll('.swiper-slide');
    if (cardsSlides.length === 0) return;

    if (window.innerWidth < 768) {
        new Swiper(cardsContainer, {
            slidesPerView: 1.15,
            spaceBetween: 16,
            centeredSlides: true,
            loop: false,
        });
    }
});


// Находим ВСЕ кнопки в блоке 4
const buttons = document.querySelectorAll('.block4__button');

// Вешаем обработчик клика на каждую кнопку через цикл
buttons.forEach(button => {
    button.addEventListener('click', () => {
        window.open('https://watchbutdonotlearn.github.io', '_blank', 'noopener,noreferrer');
    });
});






