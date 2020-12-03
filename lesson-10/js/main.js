'use strict';

const books = document.querySelector('.books');
const book = document.querySelectorAll('.book');

// Удаляет элемент из DOM дерева — book[2].remove();
// Вставиь в конец родителя (перемещает, не создает копии!) — books.append(book[2]);
// Вставляет элемент в начало родителя — books.prepend(book[2]);

// Вставляет элемент book перед элементом books — books.before(book[2]);
// Вставляет элемент book после элемента books — books.after(book[2]);

// Метод ЗАМЕНЫ: убирает book[1] из DOM дерева и вставляет вместо него book[2]
// — book[1].replaceWith(book[2]);

// КЛОНИРУЕМ элемент — book[3].cloneNode(); (Неполная копия - копирует толькопервую ноду)
// Чтобы скопировать все ноды, надо добавить true — book[3].cloneNode(true);

// Добавить/получить текстовый контент — book[3].textContent = 'Text';
// Вставить HTML структуру — book[3].innerHTML = '<b>Text</b>';

// НОВЫЙ метод вставки текстового контента 
// book[1].insertAdjacentText('beforebegin', 'Текст до элемента');
// book[1].insertAdjacentText('afterend', 'Текст после элемента');
// book[1].insertAdjacentText('afterbegin', 'Текст внутри элемента в самом начале');
// book[1].insertAdjacentText('beforeend', 'Текст внутри элемента в самом конце');

// НОВЫЙ метод вставки элемента
// book[1].insertAdjacentElement('beforebegin', book[2]);
// book[1].insertAdjacentElement('afterend', book[3]);
// book[1].insertAdjacentElement('afterbegin', book[4]);
// book[1].insertAdjacentElement('beforeend', book[5]);

// НОВЫЙ метод вставки HTML структуры
// book[1].insertAdjacentHTML('beforebegin', '<b>Текст до элемента</b>');
// book[1].insertAdjacentHTML('afterend', '<b>Текст после элемента</b>');
// book[1].insertAdjacentHTML('afterbegin', '<b>Текст внутри элемента в самом начале</b>');
// book[1].insertAdjacentHTML('beforeend', '<b>Текст внутри элемента в самом конце</b>');

// Создаем новый элемент — document.createElement('li');