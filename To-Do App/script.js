const taskList = document.getElementById('taskList');
const progressBar = document.getElementById('progressBar');

taskList.addEventListener('click', handleTaskClick);
taskList.addEventListener('change', handleTaskChange);
taskList.addEventListener('dblclick', handleTaskEdit);

function handleTaskClick(event) {
  const clickedElement = event.target;

  // Mark task as complete
  if (clickedElement.tagName === 'LI') {
    clickedElement.classList.toggle('completed');
    updateProgress();
  }

  // Delete task
  if (clickedElement.classList.contains('delete-button')) {
    const taskItem = clickedElement.parentElement;
    taskItem.remove();
    updateProgress();
  }
}

function handleTaskChange(event) {
  const changedElement = event.target;

  // Update task priority
  if (changedElement.classList.contains('task-priority-select')) {
    const taskItem = changedElement.closest('.task-item');
    const priority = changedElement.value;

    // Update task priority styling or perform other actions based on priority
    taskItem.style.backgroundColor = getPriorityColor(priority);
  }
}

function handleAddButtonClick() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value;

  if (taskText.trim() !== '') {
    addTaskToPage(taskText, 'medium');
    taskInput.value = '';
    updateProgress();
  }
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', handleAddButtonClick);

function handleTaskEdit(event) {
  const taskItem = event.target.closest('.task-item');
  const taskTextElement = taskItem.querySelector('.task-text');

  taskTextElement.contentEditable = true;
  taskTextElement.focus();

  taskTextElement.addEventListener('blur', () => {
    taskTextElement.contentEditable = false;

    // Save the edited task text
    const editedText = taskTextElement.innerText;
    // Perform further actions with the edited text
    // For example, update the task's data or send it to the server

    // Update UI or perform other necessary actions
  });
}

function getPriorityColor(priority) {
  if (priority === 'low') {
    return '#99ccff';
  } else if (priority === 'medium') {
    return '#ffcc99';
  } else if (priority === 'high') {
    return '#ff9999';
  }
}

function updateProgress() {
  const tasks = document.querySelectorAll('.task-item');
  const completedTasks = document.querySelectorAll('.task-item.completed');
  const progress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = progress + '%';
  }
}

// Initial progress update
updateProgress();

function addTaskToPage(taskText, priority) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const taskTextElement = document.createElement('span');
  taskTextElement.classList.add('task-text');
  taskTextElement.textContent = taskText;

  const prioritySelect = document.createElement('select');
  prioritySelect.classList.add('task-priority-select');
  prioritySelect.innerHTML = `
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  `;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-button');

  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(prioritySelect);
  taskItem.appendChild(deleteButton);

  if (priority) {
    prioritySelect.value = priority;
    taskItem.style.backgroundColor = getPriorityColor(priority);
  }

  taskList.appendChild(taskItem);
}

// Example usage: addTaskToPage('Sample Task', 'medium');

const stickyNotesContainer = document.getElementById('stickyNotesContainer');
const colorClasses = ['bg-danger', 'bg-warning', 'bg-success', 'bg-info', 'bg-primary', 'bg-secondary'];
let currentColorIndex = 0;

function createStickyNote() {
  const stickyNote = document.createElement('div');
  stickyNote.classList.add('stickyNote', 'text-dark');
  stickyNote.classList.add(colorClasses[currentColorIndex]);

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Write your note...';

  stickyNote.appendChild(textarea);
  stickyNotesContainer.appendChild(stickyNote);

  currentColorIndex = (currentColorIndex + 1) % colorClasses.length;
}

function handleTextareaKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();

    const currentTextarea = event.target;
    const stickyNote = currentTextarea.parentNode;
    const nextStickyNote = stickyNote.nextElementSibling;

    if (!nextStickyNote) {
      createStickyNote();
    }

    const nextTextarea = nextStickyNote.querySelector('textarea');
    nextTextarea.focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createStickyNote();
});

stickyNotesContainer.addEventListener('keydown', event => {
  const currentTextarea = event.target;
  const isTextarea = currentTextarea && currentTextarea.tagName === 'TEXTAREA';

  if (isTextarea && currentTextarea === stickyNotesContainer.lastElementChild.querySelector('textarea')) {
    handleTextareaKeydown(event);
  }
});

var limit = 3;
$.ajax({
  method: 'GET',
  url: 'https://api.api-ninjas.com/v1/facts?limit=' + limit,
  headers: { 'X-Api-Key': 'S6FnaLB1yTerntIl0QnoYQ==h3hHECVtaPKRDmmA' },
  contentType: 'application/json',
  success: function(result) {
    var factsContainer = document.getElementById('factsContainer');
    factsContainer.innerHTML = '';

    result.forEach(function(fact) {
      var factElement = document.createElement('p');
      factElement.textContent = fact.fact;
      factsContainer.appendChild(factElement);
    });
  },
  error: function ajaxError(jqXHR) {
    console.error('Error: ', jqXHR.responseText);
  }
});

const carousel = document.querySelector('.carousel');
const images = carousel.getElementsByTagName('img');
let currentImageIndex = 0;

function showImage(index) {
  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove('active');
  }
  images[index].classList.add('active');
}

function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
}

// Change image every 3 seconds
setInterval(changeImage, 3000);





