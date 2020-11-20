let num  = 266219;

// Поменяем тип number на string и разобьем строку на массив
const numStr = num.toString().split('');

// Каждое значение из массива перемножим дрг на друга 
// Используем метод перебора массива reduce 
let res = numStr.reduce((a, b) => {
    return a * b;
});

// Результат умножения 
console.log(res);

// Результат возведения в степень 
console.log(res **= 3);

// Выведем в консоль первые две цифры 
console.log(res.toString().substr(0, 2));