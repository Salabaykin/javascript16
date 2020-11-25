'use strict';

let money = prompt('Ваш месячный доход?'),
    income = 'Фриланс', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6;

function showTypeOf() {
    const response = `Типы: money = ${typeof money}, income = ${typeof income}, deposit = ${typeof deposit}, длина addExpenses = ${addExpenses.length}. Период равен ${period} меяцев. Цель заработать ${mission} рублей`;
    return response;
}
console.log(showTypeOf());

addExpenses = addExpenses.toLowerCase();

console.log(addExpenses.split(', '));

const expenses1 = prompt('Введите обязательную статью расходов?', 'Коммуналка');
const amount1 = prompt('Во сколько это обойдется?', '3000');
const expenses2 = prompt('Введите обязательную статью расходов?', 'Кредит');
const amount2 = prompt('Во сколько это обойдется?', '1000');

// LESSON 4

// Сумма всех обязательных расходов за месяц
function getExpensesMonth(a, b) {
    return +a + +b;
}
const expenses = getExpensesMonth(amount1, amount2);
console.log(`Сумма всех обязательных расходов за месяц: ${expenses} руб.`);

// Накопления за месяц
function getAccumulatedMonth(a, b) {
    return +a - +b;
}
const accumulatedMonth = getAccumulatedMonth(money, expenses);

// Дневной бюджет
const budgetDay = Math.floor(accumulatedMonth/30);
console.log(`Бюджет на день: ${budgetDay} руб.`);

// Cрок достижения цели в месяцах
function getTargetMonth() {
    return Math.ceil(mission/accumulatedMonth);
}
const res = getTargetMonth();
console.log(`Цель будет достигнута через: ${res} мес.`);

// Уровень дохода
function getStatusIncome() {
    if(budgetDay >= 1200) {
        return console.log('У вас высокий уровень дохода');
    } else if (budgetDay < 1200 && budgetDay >= 600) {
        return console.log('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay >= 0) {
        return console.log('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        return console.log('Что то пошло не так');
    }
}
getStatusIncome();