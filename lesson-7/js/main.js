'use strict';

function isNumber(num){
    return !isNaN(parseFloat(num));
};


let money, 
    start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        } while(!isNumber(money));
    };

start();

let appData = {
        income: {},
        addIncome: {},
        expenses: {},
        addExpenses: [],
        deposit: false,
        mission: 100000,
        period: 6,
        budget: money,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        asking: function() {
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
        },
        getExpensesMonth: function() {
            let sum = 0, amount = 0;
            for(let i = 0; i < 2; i++) {
                appData.expenses[i] = prompt('Введите обязательную статью расходов?');
                do {
                    amount = prompt('Во сколько это обойдется?');
                } while (!isNumber(amount)) 
        
                sum += +amount;
            }
            return sum;
        },
        getAccumulatedMonth: function(money, expenses) {
            return money - expenses;
        },
        getTargetMonth: function() {
            return Math.ceil(appData.mission/accumulatedMonth);
        },
        getStatusIncome: function() {
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
}

appData.asking();

// Сумма всех обязательных расходов за месяц
const expensesAmount = appData.getExpensesMonth();
console.log(`Сумма всех обязательных расходов за месяц: ${expensesAmount} руб.`);

// Накопления за месяц
const accumulatedMonth = appData.getAccumulatedMonth(money, expensesAmount);

// Дневной бюджет
const budgetDay = Math.floor(accumulatedMonth/30);
console.log(`Бюджет на день: ${budgetDay} руб.`);

// Cрок достижения цели в месяцах
const res = appData.getTargetMonth();

if(res < 0) {
    console.log('Цель не будет достигнута');
} else {
    console.log(`Цель будет достигнута через: ${res} мес.`);
}

console.log(appData.expenses);

// Уровень дохода
appData.getStatusIncome();