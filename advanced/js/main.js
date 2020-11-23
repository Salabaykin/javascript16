'use strict';

// ПЕРВОЕ ЗАДАНИЕ

const lang = prompt('ru или en ?');

const arrRus = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const arrEng = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// С использованием if

// if (lang == 'ru') {
//     console.log(arrRus);
// } else if (lang == 'en') {
//     console.log(arrEng);
// } else {
//     console.log('Ошибка');
// }

// С использованием switch-case

// switch(lang) {
//     case 'ru': 
//         console.log(arrRus);
//         break;
//     case 'en': 
//         console.log(arrEng);
//         break;
//     default:
//         console.log('Ошибка');
// }

// С использованием многомерного массива 

const arrBox = {
    'ru': [...arrRus],
    'en': [...arrEng]
};
console.log(arrBox[lang]);

// ВТОРОЕ ЗАДАНИЕ

const namePerson = prompt('Как зовут директора GloAcademy ?');

namePerson == 'Артем' ? console.log('директор') : '';
namePerson == 'Максим' ? console.log('преподаватель') : '';
namePerson != 'Артем' && namePerson != 'Максим' ? console.log('Студент') : '';