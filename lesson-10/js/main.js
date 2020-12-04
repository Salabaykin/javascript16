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

// КЛОНИРУЕМ элемент — book[3].cloneNode(); (Неполная копия - копирует только первую ноду)
// Чтобы скопировать все ноды, надо добавить true — book[3].cloneNode(true);

// Добавить/получить текстовый контент — book[3].textContent = 'Text';
// Вставить HTML структуру — book[3].innerHTML = '<b>Text</b>';

// Создаем новый элемент — document.createElement('li');

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


// Меняем порядок книг
books.insertAdjacentElement('afterbegin', book[2]);
books.insertAdjacentElement('afterbegin', book[5]);
books.insertAdjacentElement('afterbegin', book[3]);
books.insertAdjacentElement('afterbegin', book[4]);
books.insertAdjacentElement('afterbegin', book[0]);
books.insertAdjacentElement('afterbegin', book[1]);

// Меняем фон 
document.body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

// Меняем заголовок 
book[4].querySelector('h2 > a').textContent = 'Книга 3. this и Прототипы Объектов';

// Удаляем рекламу 
const adv = document.querySelector('.adv');
adv.remove();

// Восстановим порядок глав 
const listFir = book[0].querySelectorAll('ul > li');
console.log(listFir);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[0]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[1]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[3]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[6]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[8]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[4]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[5]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[7]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[9]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[2]);
book[0].querySelector('ul').insertAdjacentElement('beforeend', listFir[10]);

const listSec = book[5].querySelectorAll('ul > li');
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[0]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[1]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[9]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[3]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[4]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[2]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[6]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[7]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[5]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[8]);
book[5].querySelector('ul').insertAdjacentElement('beforeend', listSec[10]);

// Добавим новую главу 
const elem = document.createElement('li');
elem.textContent = 'Глава 8: За пределами ES6';
const listElems = book[2].querySelectorAll('ul > li');
listElems[8].insertAdjacentElement('afterend', elem);