const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-button');
const taskPrioritySelects = document.querySelectorAll('.task-priority-select');

addButton.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskClick);
taskList.addEventListener('dblclick', handleTaskEdit);

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    const tasks = document.querySelectorAll('.task-item');
    
    tasks.forEach(task => {
      if (filter === 'all') {
        task.style.display = 'block';
      } else if (filter === 'active') {
        task.style.display = task.classList.contains('completed') ? 'none' : 'block';
      } else if (filter === 'completed') {
        task.style.display = task.classList.contains('completed') ? 'block' : 'none';
      }
    });
  });
});

taskPrioritySelects.forEach(select => {
  select.addEventListener('change', () => {
    const taskItem = select.closest('.task-item');
    const priority = select.value;
    
    // Update task priority styling or perform other actions based on priority
    taskItem.style.backgroundColor = getPriorityColor(priority);
  });
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const listItem = document.createElement('li');
    listItem.innerText = taskText;
    taskList.appendChild(listItem);
    taskInput.value = '';
    taskInput.focus();
  }
}

function handleTaskClick(event) {
  const clickedElement = event.target;

  // Mark task as complete
  if (clickedElement.tagName === 'LI') {
    clickedElement.classList.toggle('completed');
  }

  // Delete task
  if (clickedElement.classList.contains('delete-button')) {
    const listItem = clickedElement.parentElement;
    taskList.removeChild(listItem);
  }
}

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
  if (currentTextarea.tagName === 'TEXTAREA' && currentTextarea === stickyNotesContainer.lastElementChild.querySelector('textarea')) {
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


