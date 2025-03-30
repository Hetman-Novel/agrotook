/*
let select = function () {
    let selectHeaders = document.querySelectorAll('.select__header');
    let selectItems = document.querySelectorAll('.select__item');

    selectHeaders.forEach(header => {
        header.addEventListener('click', function () {
            this.parentElement.classList.toggle('is-active');
        });
    });

    selectItems.forEach(item => {
        item.addEventListener('click', function () {
            let select = this.closest('.select');
            let currentText = select.querySelector('.select__current');

            // Обновляем текст текущего выбранного элемента
            currentText.innerText = this.innerText;

            // Удаляем класс "current" у всех элементов списка в этом же селекте
            select.querySelectorAll('.select__item').forEach(el => el.classList.remove('current'));

            // Добавляем "current" к выбранному элементу
            this.classList.add('current');

            // Закрываем список
            select.classList.remove('is-active');
        });
    });
};
select();
*/

let select = function () {
    let selects = document.querySelectorAll('.select');
    let selectHeaders = document.querySelectorAll('.select__header');
    let selectItems = document.querySelectorAll('.select__item');

    // Функция для закрытия всех селектов, кроме переданного в аргументе
    function closeAllSelects(exception = null) {
        selects.forEach(select => {
            if (select !== exception) {
                select.classList.remove('is-active');
            }
        });
    }

    // Обработчик клика по заголовку селекта
    selectHeaders.forEach(header => {
        header.addEventListener('click', function (event) {
            let parentSelect = this.parentElement;

            // Если у селекта уже есть класс is-active, убираем его
            if (parentSelect.classList.contains('is-active')) {
                parentSelect.classList.remove('is-active');
            } else {
                // Закрываем все селекты перед открытием текущего
                closeAllSelects();
                parentSelect.classList.add('is-active');
            }

            event.stopPropagation(); // Останавливаем всплытие, чтобы не закрывался сразу
        });
    });

    // Обработчик клика по элементу списка
    selectItems.forEach(item => {
        item.addEventListener('click', function () {
            let select = this.closest('.select');
            let currentText = select.querySelector('.select__current');

            // Обновляем текст текущего выбранного элемента
            currentText.innerText = this.innerText;

            // Удаляем класс "current" у всех элементов списка в этом же селекте
            select.querySelectorAll('.select__item').forEach(el => el.classList.remove('current'));

            // Добавляем "current" к выбранному элементу
            this.classList.add('current');

            // Закрываем список
            select.classList.remove('is-active');
        });
    });

    // Закрытие всех селектов при клике вне их области
    document.addEventListener('click', function () {
        closeAllSelects();
    });
};
select();