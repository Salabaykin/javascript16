'use strict'; 

class First {
    constructor() {}

    static hello() {
        console.log('Привет я метод родителя!');
    }
}

class Second extends First{
    constructor() {}

    static hello() {
        super.hello();
        console.log('А я наследуемый метод!');
    }
}

Second.hello();