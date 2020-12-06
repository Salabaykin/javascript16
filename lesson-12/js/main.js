'use strict'; 

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

if (localStorage.todoData){
    todoData = JSON.parse(localStorage.todoData);
} else {
    localStorage.todoData = JSON.stringify([]);
}

const render = function() {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `;

        if(item.complated) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete'),
              btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoComplete.addEventListener('click', function() {
            item.complated = !item.complated;
            render();
        });

        btnTodoRemove.addEventListener('click' , function() {
            todoData.splice(i, 1);
            render();
        });
    });

    localStorage.todoData = JSON.stringify(todoData);
}

todoControl.addEventListener('submit', function(e) {
    e.preventDefault();

    const newTodo = {
        value: headerInput.value,
        complated: false
    };

    if (headerInput.value.trim() !== '') {
        todoData.push(newTodo);
        headerInput.value = '';
        render();
    } 

    if (e.keyCode === 13) {
        todoData.push(newTodo);
        headerInput.value = '';
        render();
    }
});

render();