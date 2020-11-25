'use strict';

const res = prompt('Какая-нибудь строка, которую передаем в функцию', '            Привет, Анька :)                ');

function foo(arg) {
    if (typeof arg !== 'string') {
        alert('Ошибка! Вы ввели НЕ строку');
    } else {
        // Убираем все пробелы
        console.log(`Методом trim() убрали все пробелы в начале и в конце - ${arg.trim()}`);
        // Если длина строки больше 30, то обрезаем 
        if (arg.length > 30) {
            let res = arg.substr(0, 30);
            console.log(`Длина строки: ${arg.length}. Обрезаем: ${res}...`);
        } 
    }
}

foo(res);