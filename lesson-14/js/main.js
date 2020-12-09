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
const inputRange = document.querySelectorAll('input[type=range]');
const inputCheckbox = document.querySelector('input[type=checkbox]');

const dataForm = document.querySelector('.data');
const dataInputList = dataForm.querySelectorAll('input[type=text]');

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

const AppData = function() {
    this.budget = 0; 
    this.income = {}; 
    this.addIncome = []; 
    this.expenses = {}; 
    this.addExpenses = []; 
    this.deposit = false; 
    this.percentDeposit = 0; 
    this.incomeMonth = 0; 
    this.moneyDeposit = 0; 
    this.period = 0; 
    this.budgetDay = 0; 
    this.budgetMonth = 0; 
    this.expensesMonth = 0;
}

AppData.prototype.start = function() {
    startBtn.style = 'display: none;';
    cancelBtn.style = 'display: block;';

    this.inputDisabled();

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
};
AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    expensesItems.forEach(item => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.getIncome = function() {
    incomeItems.forEach(item => {
        let incomeTitle = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (incomeTitle !== '' && cashIncome !== '') {
            this.income[incomeTitle] = +cashIncome;
            this.incomeMonth += +cashIncome;
        }
    });
};
AppData.prototype.getAddExpenses = function() {
    let addExpanses = additionalExpensesItem.value.split(',');

    addExpanses.forEach(item => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach(item => {
        let itemValue = item.value.trim();

        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.showResult = function() {
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
};
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value/this.budgetMonth);
};
AppData.prototype.getStatusIncome = function() {
    if(this.budgetDay >= 1200) {
        return console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
        return console.log('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
        return console.log('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        return console.log('Что то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function() {
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
};
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.inputDisabled = function() {
    [...document.querySelectorAll('input[type=text]')].map(function (item) { 
        item.disabled = true;
    });
    periodSelect.disabled = true;
    inputCheckbox.disabled = true;
    incomePlus.disabled = true;
    expensesPlus.disabled = true;
};
AppData.prototype.formReset = function() {
    this.budget = 0; 
    this.income = {}; 
    this.addIncome = []; 
    this.expenses = {}; 
    this.addExpenses = []; 
    this.deposit = false; 
    this.percentDeposit = 0; 
    this.incomeMonth = 0; 
    this.moneyDeposit = 0; 
    this.period = 6; 
    this.budgetDay = 0; 
    this.budgetMonth = 0; 
    this.expensesMonth = 0;
    
    inputForm.forEach(function(item) {
        item.disabled = false;
        inputCheckbox.checked = false;
        item.value = '';
        periodAmount.innerHTML = 1;
        periodSelect.value = 1;
        cancelBtn.style = 'display: none;';
        startBtn.disabled = true;
        periodSelect.disabled = false;
        startBtn.style = 'display: block;cursor: not-allowed;';
    });
    [...document.querySelectorAll('input[type=text]')].map(function (item) { 
        item.value = ''; 
    });
    incomeItems.forEach((item, i) => {
        if (i > 0 && i < 3) {
            item.remove();
        }
        incomePlus.style.display = 'block';
    });
    expensesItems.forEach((item, i) => {
        if (i > 0 && i < 3) {
            item.remove();
        }
        expensesPlus.style.display = 'block';
    });
    periodSelect.value = 1; 
    inputCheckbox.disabled = false;
    incomePlus.disabled = false;
    expensesPlus.disabled = false;
};

AppData.prototype.eventListeners = function() {
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
            startBtn.style = 'display: block;cursor: not-allowed;';
        }
    });
    
    startBtn.addEventListener('click', this.start.bind(appData));
    cancelBtn.addEventListener('click', this.formReset.bind(appData));
    
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
};

const appData = new AppData();
appData.eventListeners();