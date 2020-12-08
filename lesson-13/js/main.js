'use strict';

const startBtn = document.getElementById('start');
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
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const expensesTitle = document.querySelector('.expenses-title');
const additionalExpensesItem2 = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const inputForm = document.querySelectorAll('input[type=text]');
const cancelBtn = document.querySelector('#cancel');
const resultBlock = document.querySelector('.result');
const resultInputList = resultBlock.querySelectorAll('input[type=text]');

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
let periodAmount = document.querySelector('.period-amount');

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
        incomeMonth: 0,
        moneyDeposit: 0,
        period: 6,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        start: function() {
            startBtn.style = 'display: none;';
            cancelBtn.style = 'display: block;';

            this.budget = +salaryAmount.value;

            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();

            this.showResult();
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
        addIncomeBlock: function() {
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        },
        getIncome: function() {
            incomeItems.forEach(function(item) {
                let incomeTitle = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;

                if (incomeTitle !== '' && cashIncome !== '') {
                    appData.income[incomeTitle] = +cashIncome;
                    appData.incomeMonth += +cashIncome;
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
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.floor(this.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcPeriod();
            periodSelect.addEventListener('input', function() {
                incomePeriodValue.value = this.budgetMonth * periodSelect.value;
            });
        },
        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                this.expensesMonth += this.expenses[key];
            }
        },
        getBudget: function() {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        },
        getTargetMonth: function() {
            return Math.ceil(targetAmount.value/this.budgetMonth);
        },
        getStatusIncome: function() {
            if(this.budgetDay >= 1200) {
                return console.log('У вас высокий уровень дохода');
            } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
                return console.log('У вас средний уровень дохода');
            } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
                return console.log('К сожалению, у вас уровень дохода ниже среднего');
            } else {
                return console.log('Что то пошло не так');
            }
        },
        getInfoDeposit: function() {
            if (this.deposit) {

                this.percentDeposit = prompt('Какой годовой процент?', 10);
                while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null || this.percentDeposit.trim() === '') {
                    this.percentDeposit = prompt('Какой годовой процент?', 10);
                }
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);  
                while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null || this.moneyDeposit.trim() === '') {
                    this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                }

            }
        },
        calcPeriod: function() {
            return this.budgetMonth * periodSelect.value;
        },
        formReset: function() {
            inputForm.forEach(function (item) {
                item.disabled = false;
                item.value = '';
                periodAmount.innerHTML = 1;
                periodSelect.value = 1;
                startBtn.disabled = true;
                cancelBtn.style = 'display: none;';
            });
            resultInputList.forEach(function (item) {
                item.value = '';
                item.disabled = false;
            });
        }
}

periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});

startBtn.disabled = true;
startBtn.style = 'cursor: not-allowed;';

salaryAmount.addEventListener('input', function() {
    startBtn.disabled = false;
    startBtn.style = 'cursor: pointer;';

    if (salaryAmount.value.trim() === '') {
        startBtn.disabled = true;
        startBtn.style = 'cursor: not-allowed;';
    }
});

startBtn.addEventListener('click', appData.start.bind(appData));
cancelBtn.addEventListener('click', appData.formReset);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

// Cрок достижения цели в месяцах
// if(appData.getTargetMonth() < 0) {
//     console.log('Цель не будет достигнута');
// } else {
//     console.log(`Цель будет достигнута через: ${appData.getTargetMonth()} мес.`);
// }