// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Fetch and display tasks
    fetchTasks();

    // Add task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = taskInput.value.trim();
        if (description) {
            const response = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description })
            });
            const task = await response.json();
            addTaskToDOM(task);
            taskInput.value = '';
        }
    });

    // Fetch tasks from the server
    async function fetchTasks() {
        const response = await fetch('http://localhost:3000/api/tasks');
        const tasks = await response.json();
        tasks.forEach(addTaskToDOM);
    }

    // Add a task to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', async () => {
            const completed = checkbox.checked;
            const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: task.description, completed })
            });
            const updatedTask = await response.json();
            if (updatedTask.completed) {
                span.classList.add('completed');
            } else {
                span.classList.remove('completed');
            }
        });

        const span = document.createElement('span');
        span.textContent = task.description;
        if (task.completed) {
            span.classList.add('completed');
        }

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            const newDescription = prompt('Edit task description:', task.description);
            if (newDescription) {
                const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ description: newDescription, completed: task.completed })
                });
                const updatedTask = await response.json();
                span.textContent = updatedTask.description;
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                taskList.removeChild(li);
            }
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'input-group';
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(buttonContainer);

        taskList.appendChild(li);
    }
});
