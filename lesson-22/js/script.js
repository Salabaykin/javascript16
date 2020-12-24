'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDolist')));
    }

    render() {
        this.todoCompleted.textContent = '';
        this.todoList.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    addToStorage() {
        localStorage.setItem('toDolist', JSON.stringify([...this.todoData]));
    }

    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li)
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();

        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        } else {
            alert('Пустое дело добавить нельзя!');
        }
    }

    generateKey() {
        return (~~(Math.random()*1e8)).toString(16);
    }

    deleteItem(key) {
        this.todoData.forEach((elem) => {
            if (elem.key === key) {
                this.todoData.delete(elem.key);
                this.render();
            }
        });
    }

    completedItem(key) {
        this.todoData.forEach((elem) => {
            if (elem.key === key) {
                elem.completed = !elem.completed;
                this.render();
            }
        });
    }

    handler() {
        this.todoContainer.addEventListener('click', (event) => {
            const target = event.target,
                  key = target.parentNode.parentNode.key;

            if(target.matches('.todo-remove')) {
                this.deleteItem(key);
            }

            if (target.matches('.todo-complete')) {
                this.completedItem(key);
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init();