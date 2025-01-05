/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.team__slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.team__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 4,
			spaceBetween: 30,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.team__arrow--prev',
				nextEl: '.team__arrow--next',
			},

			// Брейкпоінти
			breakpoints: {
				220: {
					slidesPerView: 1.2,
					spaceBetween: 10,
				},
				425: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 30,
				},

			},

			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.testimonials__slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.testimonials__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 30,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація

			pagination: {
				el: '.testimonials-pagination',
				clickable: true,
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.testimonials__arrow--prev',
				nextEl: '.testimonials__arrow--next',
			},

			// // Брейкпоінти
			// breakpoints: {
			// 	220: {
			// 		slidesPerView: 1.2,
			// 		spaceBetween: 10,
			// 	},
			// 	425: {
			// 		slidesPerView: 2,
			// 		spaceBetween: 15,
			// 	},
			// 	768: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 20,
			// 	},
			// 	992: {
			// 		slidesPerView: 4,
			// 		spaceBetween: 30,
			// 	},

			// },

			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.like__slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.like__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			spaceBetween: 30,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація

			// pagination: {
			// 	el: '.testimonials-pagination',
			// 	clickable: true,
			// },


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.like__arrow--prev',
				nextEl: '.like__arrow--next',
			},

			// Брейкпоінти
			breakpoints: {
				220: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				425: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				992: {
					slidesPerView: 2,
					spaceBetween: 30,
				}

			},

			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.like__event')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.like__event', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 30,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація

			// pagination: {
			// 	el: '.testimonials-pagination',
			// 	clickable: true,
			// },


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.like__arrow-event--prev',
				nextEl: '.like__arrow-event--next',
			},

			// Брейкпоінти
			breakpoints: {
				220: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				425: {
					slidesPerView: 1.5,
					spaceBetween: 15,
				},
				767: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 30,
				}

			},

			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.like__post')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.like__post', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 30,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація

			// pagination: {
			// 	el: '.testimonials-pagination',
			// 	clickable: true,
			// },


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.like__arrow-post--prev',
				nextEl: '.like__arrow-post--next',
			},

			// Брейкпоінти
			breakpoints: {
				220: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				480: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				500: {
					slidesPerView: 1.5,
					spaceBetween: 15,
				},
				767: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 30,
				}

			},

			// Події
			on: {

			}
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});