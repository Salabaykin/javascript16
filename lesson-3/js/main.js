'use strict';

let money = 5000,
    income = 'Фриланс', 
    addExpenses = 'Интернет, Такси, Коммуналка',
    deposit = true,
    mission = 100000,
    period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} меяцев`);
console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase();

console.log(addExpenses.split(', '));

// LESSON 3

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = prompt('Во сколько это обойдется?');

const budgetMonth = +money - (+amount1 + +amount2);

console.log(`Бюджет на месяц ${budgetMonth}`);

console.log(`Цель будет достигнута через: ${Math.ceil(mission/budgetMonth)} мес.`);

const budgetDay = Math.floor(budgetMonth/30);

console.log(`Бюджет на день: ${budgetDay}`);

if(budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay < 1200 && budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}