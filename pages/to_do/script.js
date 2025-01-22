let draggedCard = null;
let rightClickedCard = null;
const contextMenu = document.getElementById('context-menu');

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

function addTask(columnId) {
    const input = document.getElementById(`${columnId}-input`);
    const taskText = input.value.trim();
    if (taskText === '') return;

    const taskElement = createTaskElement(taskText);
    document.getElementById(`${columnId}-tasks`).appendChild(taskElement);

    saveTaskToLocalStorage(columnId, taskText);

    input.value = '';
}

function createTaskElement(text) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('card');
    taskElement.draggable = true;
    taskElement.textContent = text;

    taskElement.addEventListener('dragstart', dragstart);
    taskElement.addEventListener('dragend', dragend);
    taskElement.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        rightClickedCard = this;
        showContextMenu(e.pageX, e.pageY);
    });

    return taskElement;
}

const columns = document.querySelectorAll('.column .tasks');
columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
    column.addEventListener('dragenter', dragenter);
    column.addEventListener('dragleave', dragleave);
});

function dragstart() {
    draggedCard = this;
    setTimeout(() => this.classList.add('dragging'), 0);
}

function dragend() {
    setTimeout(() => {
        this.classList.remove('dragging');
        draggedCard = null;
        updateLocalStorage();
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(this, e.clientY);
    if (afterElement == null) {
        this.appendChild(draggedCard);
    } else {
        this.insertBefore(draggedCard, afterElement);
    }
}

function dragenter(e) {
    e.preventDefault();
    this.style.backgroundColor = "#f0f0f0";
}

function dragleave() {
    this.style.backgroundColor = "";
}

function drop() {
    this.style.backgroundColor = "";
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveTaskToLocalStorage(columnId, taskText) {
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    tasks.push(taskText);
    localStorage.setItem(columnId, JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    ['todo', 'doing', 'done'].forEach(columnId => {
        const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
        tasks.forEach(taskText => {
            const taskElement = createTaskElement(taskText);
            document.getElementById(`${columnId}-tasks`).appendChild(taskElement);
        });
    });
}

function updateLocalStorage() {
    ['todo', 'doing', 'done'].forEach(columnId => {
        const tasks = [];
        document.querySelectorAll(`#${columnId}-tasks .card`).forEach(card => {
            tasks.push(card.textContent);
        });
        localStorage.setItem(columnId, JSON.stringify(tasks));
    });
}

function showContextMenu(x, y) {
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.display = 'block';
}

document.addEventListener('click', function () {
    contextMenu.style.display = 'none';
});

function editTask() {
    if (rightClickedCard) {
        const newTaskText = prompt("Edit task:", rightClickedCard.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            rightClickedCard.textContent = newTaskText;
            updateLocalStorage();
        }
    }
}

function deleteTask() {
    if (rightClickedCard) {
        rightClickedCard.remove();
        updateLocalStorage();
    }
}



const themeToggleButton = document.getElementById('themeToggle');
        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });