// Retrieve todos from localStorage or initialize an empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Retrieve username from localStorage or set it to an empty string
let username = localStorage.getItem('username') || '';

// Set the value of the name input to the username
document.querySelector('#name').value = username;

// Add an event listener to the name input to update the username in localStorage
document.querySelector('#name').addEventListener('change', (e) => {
  localStorage.setItem('username', e.target.value);
});

// Add an event listener to the new todo form to create a new todo
document.querySelector('#new-todo-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Create a new todo object and push it to the todos array
  const todo = {
    content: e.target.elements.content.value,
    category: e.target.elements.category.value,
    done: false,
    createdAt: new Date().getTime()
  };
  todos.push(todo);

  // Save the updated todos array to localStorage
  localStorage.setItem('todos', JSON.stringify(todos));

  // Reset the form and display the todos
  e.target.reset();
  displayTodos();
});

// Display the todos on page load
displayTodos();

// Define a function to display the todos
function displayTodos() {
    const todoList = document.querySelector('#todo-list');
    // ...
  }
  

  // Clear the contents of the todo list
  todoList.innerHTML = '';

  // Loop through each todo in the todos array and create a new todo item
  todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('button');
    const deleteButton = document.createElement('button');

    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble', todo.category === 'personal' ? 'personal' : 'business');
    content.classList.add('todo-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deleteButton.classList.add('delete');

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.textContent = 'Edit';
    deleteButton.textContent = 'Delete';

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add('done');
    }

    // Add event listeners to the checkbox, edit button, and delete button
    input.addEventListener('change', (e) => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));
      if (todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }
    });

    edit.addEventListener('click', (e) => {
      const input = content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
      });
    });

    deleteButton.addEventListener('click', (e) => {
        todos = todos.filter(t => t !== todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
      });
    });