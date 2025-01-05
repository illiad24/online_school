// const filterItemCount = document.querySelectorAll('.courses-filter__counter');
// Підключення функціоналу "Чертоги Фрілансера"
import { showMore } from "./functions.js";






// const items = document.querySelectorAll('.main-courses__item');
// if (items) {
//     const blockItems = document.querySelector('.main-courses__items')
//     const filterElements = document.querySelectorAll('.courses-filter__item');
//     filterElements.forEach(filterItem => {
//         filterItem.addEventListener('click', () => {
//             changeClass(filterElements, filterItem)
//             filterItems(filterItem)
//         })
//     })
//     function changeClass(elements, currentEl) {
//         elements.forEach((item) => {
//             item.classList.remove('active')
//         })
//         currentEl.classList.add('active')
//     }
//     function filterItems(el) {
//         const getValueElement = el.getAttribute('data-type')
//         let elCount = items.length
//         items.forEach(itemEl => {
//             const itemValue = itemEl.getAttribute('data-type')
//             itemEl.style.display = 'block'
//             if (!(getValueElement === itemValue) && !(getValueElement === 'all')) {
//                 itemEl.style.display = 'none'
//                 elCount--
//             }
//             if (window.innerWidt < 500)
//                 blockItems.style.height = itemEl.innerHeight + 'px'
//             else blockItems.style.height = 400 + 'px'
//         });
//         changeAtr(elCount)
//     }
//     function changeAtr(itemCount) {
//         blockItems.setAttribute('data-showmore-content', 1)
//         if (itemCount > 6) {
//             blockItems.setAttribute('data-showmore-content', 3)
//         }

//     }
//     // Пройти по кожному елементу фільтру
//     filterElements.forEach(filterItem => {
//         // Отримати значення атрибута data-type
//         const dataType = filterItem.dataset.type;

//         // Знайти всі елементи з тим самим data-type
//         const itemsWithSameType = document.querySelectorAll(`.main-courses__item[data-type="${dataType}"]`);

//         // Оновити лічильник в поточному елементі фільтру
//         filterItem.querySelector('.courses-filter__counter').textContent = itemsWithSameType.length.toString();
//     });

//     // Оновити лічильник для категорії "Всі"
//     const allItems = document.querySelectorAll('.courses-filter__item[data-type="all"]');
//     if (allItems.length > 0) {
//         allItems[0].querySelector('.courses-filter__counter').textContent = document.querySelectorAll('.main-courses__item').length.toString();
//     }
//     //========================================================================================================================================================
//     let searchInput = document.querySelector('.search-courses__input')
//     searchInput.addEventListener('input', filterItemsByInput)
//     const cardTitles = document.querySelectorAll('.card-course__title');
//     function filterItemsByInput() {
//         let searchInputValue = searchInput.value.toLowerCase()
//         console.log(searchInputValue)
//         cardTitles.forEach((cardTitle, index) => {
//             let cardTitleText = cardTitle.innerText.toLowerCase()
//             if (!cardTitleText.includes(searchInputValue)) items[index].style.display = 'none'
//             else items[index].style.display = 'block'
//         });
//     }
// }










const items = document.querySelectorAll('.main-courses__item');


if (items) {
    const blockItems = document.querySelector('.main-courses__items');
    const filterElements = document.querySelectorAll('.courses-filter__item');
    const searchInput = document.querySelector('.search-courses__input');
    filterElements.forEach(filterItem => {
        filterItem.addEventListener('click', () => {
            changeClass(filterElements, filterItem);
            filterItems();
        });
    });
    if (searchInput) {
        searchInput.addEventListener('input', filterItems);
    }

    function changeClass(elements, currentEl) {
        elements.forEach((item) => {
            item.classList.remove('active');
        });
        currentEl.classList.add('active');
    }

    function filterItems() {
        const selectedCategory = document.querySelector('.courses-filter__item.active').getAttribute('data-type');
        const searchInputValue = searchInput.value.toLowerCase();

        items.forEach(itemEl => {
            const itemCategory = itemEl.getAttribute('data-type');
            const itemTitle = itemEl.querySelector('.card-course__title').innerText.toLowerCase();

            const categoryMatch = selectedCategory === 'all' || selectedCategory === itemCategory;
            const searchMatch = itemTitle.includes(searchInputValue);

            itemEl.style.display = categoryMatch && searchMatch ? 'block' : 'none';

            if (window.innerWidth < 500) {
                blockItems.style.height = itemEl.offsetHeight + 'px';
            } else {
                blockItems.style.height = '400px';
            }
        });

        changeAtr();
    }

    function changeAtr() {
        const visibleItems = Array.from(items).filter(item => item.style.display !== 'none').length;

        blockItems.setAttribute('data-showmore-content', 1);

        if (visibleItems > 6) {
            blockItems.setAttribute('data-showmore-content', 3);
        }
    }

    // Update counters for each filter category
    filterElements.forEach(filterItem => {
        const dataType = filterItem.dataset.type;
        const itemsWithSameType = document.querySelectorAll(`.main-courses__item[data-type="${dataType}"]`);
        filterItem.querySelector('.courses-filter__counter').textContent = itemsWithSameType.length.toString();
    });

    // Update counter for the "All" category
    const allItems = document.querySelectorAll('.courses-filter__item[data-type="all"]');
    if (allItems.length > 0) {
        allItems[0].querySelector('.courses-filter__counter').textContent = items.length.toString();
    }
}
//========================================================================================================================================================
{/* <div class="main-filters__views">
<div class="main-filters__view main-filters__view--line _icon-line active"></div>
<div class="main-filters__view main-filters__view--grid _icon-grid"></div>
</div> */}

const events = document.querySelector('.events-main__items');

if (events) {
    document.addEventListener('click', changeLayout)
    function changeLayout(e) {
        const targetEl = e.target
        if (targetEl.closest('.main-filters__view--line')) {
            targetEl.nextElementSibling.classList.remove('active')
            targetEl.classList.add('active')
            events.classList.remove('events-main__items--verticle')
        }
        else if (targetEl.closest('.main-filters__view--grid')) {
            targetEl.previousElementSibling.classList.remove('active')
            targetEl.classList.add('active')
            events.classList.add('events-main__items--verticle')

        }
    }
}
// const loginBtn = document.querySelector('.header__login');
// if (loginBtn) {
//     setTimeout(() => {
//         loginBtn.click()
//     }, 15000);
// }