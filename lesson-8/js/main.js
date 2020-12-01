'use strict';

function isNumber(num){
    return !isNaN(parseFloat(num));
};


let money, 
    start = function() {
        do {
            money = prompt('Ваш месячный доход?', 100000);
        } while(!isNumber(money));
    };

start();

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let appData = {
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        mission: 100000,
        period: 6,
        budget: +money,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        asking: function() {

            if (confirm('Есть ли у вас дополнительный заработок ?')) {

                let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
                while (isNumber(itemIncome) || itemIncome === '' || itemIncome === null || itemIncome.trim() === '') {
                    itemIncome = prompt('Какой у вас дополнительный заработок?', 'Фриланс');
                }

                let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
                while (isNaN(cashIncome) || cashIncome === '' || cashIncome === null || cashIncome.trim() === '') {
                    cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
                }

                appData.income[itemIncome] = cashIncome;
            }

            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

            while (isNumber(addExpenses) || addExpenses === '' || addExpenses === null || addExpenses.trim() === '') {
                addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            }

            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            let question, answer;

            for(let i = 0; i < 2; i++) {
                question = prompt('Введите обязательную статью расходов?', 'Aaa');
                do {
                    answer = prompt('Во сколько это обойдется?', 200);
                } while (!isNumber(answer)) 
                appData.expenses[question] = +answer;
            }
        },
        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                appData.expensesMonth += appData.expenses[key];
            }
        },
        getBudget: function() {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
        getTargetMonth: function() {
            return Math.ceil(appData.mission/appData.budgetMonth);
        },
        getStatusIncome: function() {
            if(appData.budgetDay >= 1200) {
                return console.log('У вас высокий уровень дохода');
            } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
                return console.log('У вас средний уровень дохода');
            } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
                return console.log('К сожалению, у вас уровень дохода ниже среднего');
            } else {
                return console.log('Что то пошло не так');
            }
        },
        getInfoDeposit: function() {
            if (appData.deposit) {

                appData.percentDeposit = prompt('Какой годовой процент?', '10');
                while (isNumber(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null || appData.percentDeposit.trim() === '') {
                    appData.percentDeposit = prompt('Какой годовой процент?', '10');
                }
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);  
                while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null || appData.moneyDeposit.trim() === '') {
                    appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                }

            }
        },
        calcSaveMoney: function() {
            appData.budgetMonth * appData.period;
        }
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

// Сумма всех обязательных расходов за месяц
console.log(`Сумма всех обязательных расходов за месяц: ${appData.expensesMonth} руб.`);

// Cрок достижения цели в месяцах
if(appData.getTargetMonth() < 0) {
    console.log('Цель не будет достигнута');
} else {
    console.log(`Цель будет достигнута через: ${appData.getTargetMonth()} мес.`);
}

// Уровень дохода
appData.getStatusIncome();

// Выведем в консоль все данные
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    if ( (typeof appData[key] != 'function') && (typeof appData[key] != 'object') ) {
        console.log(`${key}: ${appData[key]}`);
    }

    if ( typeof appData[key] === "object" ) {

        if ( Boolean(Object.keys(appData[key]).length) === true ) {
            console.log(`${key}: ${appData[key]}`);
        }

        if ( Boolean(Object.keys(appData[key]).length) === false ) {
            console.log(`${key}: Пустой обьект`);
        }
    }
}

