let money = 5000,
    income = 'Фриланс', 
    addExpenses = 'Интернет, Такси, Коммуналка',
    deposit = true,
    mission = 100000,
    period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses);
console.log(`Период равен ${period} меяцев`);
console.log(`Цель заработать ${mission} рублей`);

let lowerCase = addExpenses.toLowerCase();

console.log(lowerCase.split(', '));