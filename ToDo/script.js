const form = document.querySelector('form');
const todoList = document.querySelector('.todo-list');
const clearAllButton = document.querySelector('.clear-all');
const API_END_POINT = 'http://localhost:3000';
const todosData = [];
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const payload = {
        task: formData.get('task'),
        isCompleted: false,
    };
    addTodo(payload);
});

clearAllButton.addEventListener('click', async () => {
    document.querySelectorAll('.delete').forEach((button) => button.click());
});

function generateRandomColorHex() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function markTodoAsCompleted(todo) {
    const updatedTask = {
        id: todo.id,
        task: todo.task,
        isCompleted: !todo.isCompleted,
    };
    updateTodo(updatedTask);
}

function renderTodos(todos) {
    const liTemplate = document.querySelector('#todo-template');
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const clonedTodo = liTemplate.content.cloneNode(true);
        const li = clonedTodo.querySelector('li');
        li.style.backgroundColor = generateRandomColorHex();
        const span = clonedTodo.querySelector('span');
        span.textContent = todo.task;
        li.addEventListener('click', () => markTodoAsCompleted(todo));
        if (todo.isCompleted) {
            li.classList.add('completed');
        }
        const updateButton = clonedTodo.querySelector('.update');
        updateButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const updatedTaskText = prompt('Enter new task', todo.task);
            const updatedTask = {
                id: todo.id,
                task: updatedTaskText ?? todo.task,
                isCompleted: todo.isCompleted,
            };

            updateTodo(updatedTask);
        });
        const deleteButton = clonedTodo.querySelector('.delete');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            removeTodoById(todo.id)
        });
        todoList.appendChild(li);
    });
}

async function fetchTodos() {
    const rawTodos = await fetch(`${API_END_POINT}/todo`);
    const todos = await rawTodos.json();
    renderTodos(todos);
}

async function addTodo(task) {
    await fetch(`${API_END_POINT}/todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    fetchTodos();
}

async function updateTodo(updatedTask) {
    await fetch(`${API_END_POINT}/todo/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    });
}

async function removeTodoById(id) {
    await fetch(`${API_END_POINT}/todo/${id}`, {
        method: 'DELETE',
    });
    fetchTodos();
}

fetchTodos();


