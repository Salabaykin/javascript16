'use strict';

const money = +prompt('Ваш месячный доход?'),
    income = 'Фриланс', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую').toLowerCase(),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6;

function showTypeOf() {
    const response = `Типы: money = ${typeof money}, income = ${typeof income}, deposit = ${typeof deposit}, длина addExpenses = ${addExpenses.length}. Период равен ${period} меяцев. Цель заработать ${mission} рублей`;
    return response;
}
console.log(showTypeOf());

console.log(addExpenses.split(', '));

// const expenses1 = prompt('Введите обязательную статью расходов?', 'Коммуналка');
// const amount1 = prompt('Во сколько это обойдется?', '3000');
// const expenses2 = prompt('Введите обязательную статью расходов?', 'Кредит');
// const amount2 = prompt('Во сколько это обойдется?', '1000');

let expenses = [];

// Сумма всех обязательных расходов за месяц
function getExpensesMonth() {
    let sum = 0;

    expenses[i] = prompt('Введите обязательную статью расходов?');

    for(let i = 0; i < 2; i++) {
        sum += +prompt('Во сколько это обойдется?', '3000');
    }

    return sum;
}
const expensesAmount = getExpensesMonth();
console.log(`Сумма всех обязательных расходов за месяц: ${expensesAmount} руб.`);

// Накопления за месяц
function getAccumulatedMonth(money, expenses) {
    return money - expenses;
}
const accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

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