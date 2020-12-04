'use strict';

const start = document.getElementById('start');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const btnPlusExpenses = document.getElementsByTagName('button')[1];
const checkBox = document.querySelector('#deposit-check');
const additionalExpensesItem = document.querySelectorAll('.additional_expenses-item')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const expensesTitle = document.querySelector('.expenses-title');
const additionalExpensesItem2 = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let expensesItems = document.querySelectorAll('.expenses-items');

function isNumber(num){
    return !isNaN(parseFloat(num));
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let appData = {
        budget: 0,
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,
        period: 6,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        start: function() {

            if (salaryAmount.value === '') {
                alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
                return
            }
          
            appData.budget = salaryAmount.value;

            appData.getExpenses();

            appData.getExpensesMonth();
            appData.getBudget();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.showResult();
        },
        addExpensesBlock: function() {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        },
        getExpenses: function() {
            expensesItems.forEach(function(item) {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;

                if (itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = +cashExpenses;
                }
            });
        },
        getAddExpenses: function() {
            let addExpanses = additionalExpensesItem.value.split(',');

            addExpanses.forEach(function(item) {
                item = item.trim();
                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function(item) {
                let itemValue = item.value.trim();

                if (itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }
            });
        },
        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = appData.getTargetMonth();
        },
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

            let test = addExpenses.toLowerCase().split(',');
            let aa;
            test.forEach(item => {
                aa = capitalize(item.trim());
                appData.addExpenses.push(' ' + aa);
            })

            appData.deposit = confirm('Есть ли у вас депозит в банке?');

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
            return Math.ceil(targetAmount.value/appData.budgetMonth);
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

                appData.percentDeposit = prompt('Какой годовой процент?', 10);
                while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null || appData.percentDeposit.trim() === '') {
                    appData.percentDeposit = prompt('Какой годовой процент?', 10);
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

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

// Cрок достижения цели в месяцах
// if(appData.getTargetMonth() < 0) {
//     console.log('Цель не будет достигнута');
// } else {
//     console.log(`Цель будет достигнута через: ${appData.getTargetMonth()} мес.`);
// }