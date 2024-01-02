const todosContainer = document.getElementById('todos-container');

function addTodoToDom(todo) {
    const todoElement = document.createElement('div');
    todoElement.innerHTML = `
        <div>
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <button onclick="removeTodoFromDom(${todo.id})">Remove</button>
        </div>
    `;
    todosContainer.appendChild(todoElement);
}

function removeTodoFromDom(todoId) {
    const todoElement = document.getElementById(`todo-${todoId}`);
    if (todoElement) {
        todosContainer.removeChild(todoElement);
    }
}

function updateTodoInDom(updatedTodo) {
    const todoElement = document.getElementById(`todo-${updatedTodo.id}`);
    if (todoElement) {
        todoElement.querySelector('h3').textContent = updatedTodo.title;
        todoElement.querySelector('p').textContent = updatedTodo.description;
    }
}

function updateState(newTodos, oldTodos) {
    // Calculate the diff between newTodos and oldTodos
    const addedTodos = newTodos.filter(newTodo => !oldTodos.some(oldTodo => oldTodo.id === newTodo.id));
    const removedTodos = oldTodos.filter(oldTodo => !newTodos.some(newTodo => newTodo.id === oldTodo.id));
    const updatedTodos = newTodos.filter(newTodo => {
        const oldTodo = oldTodos.find(todo => todo.id === newTodo.id);
        return oldTodo && (oldTodo.title !== newTodo.title || oldTodo.description !== newTodo.description);
    });

    // Update the DOM based on the calculated diff
    addedTodos.forEach(addTodoToDom);
    removedTodos.forEach(todo => removeTodoFromDom(todo.id));
    updatedTodos.forEach(updateTodoInDom);
}

// Example usage:
const oldState = [
    {
        title: "Go to gym",
        description: "Go to gym from 7-8PM",
        id: 1
    }
];

const newState = [
    {
        title: "Go to gym",
        description: "Go to gym from 7-8PM",
        id: 1
    },
    {
        title: "Read a book",
        description: "Read a book for 30 minutes",
        id: 2
    }
];

updateState(newState, oldState);
