'use strict';

const startBtn = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    btnPlusExpenses = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('#deposit-check'),
    additionalExpensesItem = document.querySelectorAll('.additional_expenses-item')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem2 = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    inputForm = document.querySelectorAll('input[type=text]'),
    inputRange = document.querySelectorAll('input[type=range]'),
    inputCheckbox = document.querySelector('input[type=checkbox]'),
    dataForm = document.querySelector('.data'),
    dataInputList = dataForm.querySelectorAll('input[type=text]'),
    cancelBtn = document.querySelector('#cancel'),
    resultBlock = document.querySelector('.result'),
    resultInputList = resultBlock.querySelectorAll('input[type=text]'),
    periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

function isNumber(num){
    return !isNaN(parseFloat(num));
};

class AppData {
    constructor() {
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

    start() {
        startBtn.style = 'display: none;';
        cancelBtn.style = 'display: block;';
        this.inputDisabled();
        this.budget = +salaryAmount.value;

        this.getExpInc();
        this.getAddExpenses();
        this.getAddIncome();
        this.getExpensesMonth();
        this.getBudget();
    
        this.showResult();
    }

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }

    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }

    getExpInc() {
        const count = (item) => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        }
    
        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for( let key in this.income ){
            this.incomeMonth += this.income[key];
        }
    }

    getAddExpenses() {
        const addExpanses = additionalExpensesItem.value.split(',');
    
        addExpanses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        additionalIncomeItem.forEach(item => {
            const itemValue = item.value.trim();
    
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.floor(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.budgetMonth * periodSelect.value;
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value/this.budgetMonth);
    }

    getStatusIncome() {
        if(this.budgetDay >= 1200) {
            return console.log('У вас высокий уровень дохода');
        } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
            return console.log('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return console.log('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return console.log('Что то пошло не так');
        }
    }

    getInfoDeposit() {
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
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    inputDisabled() {
        [...document.querySelectorAll('input[type=text]')].map((item) => { 
            item.disabled = true;
        });
        //periodSelect.disabled = true;
        inputCheckbox.disabled = true;
        incomePlus.disabled = true;
        expensesPlus.disabled = true;
    }

    formReset() {
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
        
        inputForm.forEach((item) => {
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
        [...document.querySelectorAll('input[type=text]')].map((item) => { 
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
    }

    eventListeners() {
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });
        
        startBtn.disabled = true;
        startBtn.style = 'cursor: not-allowed;';
        
        salaryAmount.addEventListener('input', () => {
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
    }
}

const appData = new AppData();
appData.eventListeners();