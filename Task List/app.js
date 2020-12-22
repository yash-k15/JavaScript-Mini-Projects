const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const input = document.getElementById('task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');

loadEventHandlers();

function loadEventHandlers() {

    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTask);
    document.addEventListener('DOMContentLoaded', loadTasks);
}

function loadTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');

        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function addTask(e) {
    const li = document.createElement('li');

    li.className = 'collection-item';
    li.appendChild(document.createTextNode(input.value));
    
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    li.appendChild(link);
    taskList.appendChild(li);

    storeOnLocalStorage(input.value)
    input.value = '';
    e.preventDefault();
}

function storeOnLocalStorage(value) {
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        deleteFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function deleteFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearAllTasks();
}

function clearAllTasks() {
    localStorage.clear();
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        });
}