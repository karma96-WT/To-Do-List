// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const progressBar = document.getElementById('progressBar');
  
    // Load tasks from localStorage when the page loads
    loadTasks();
  
    // Function to add a new task
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
        saveTasks(); // Save tasks to localStorage
        updateProgressBar(); // Update progress bar
      }
    });
  
    // Function to create and add a task to the list
    function addTask(taskText, isCompleted = false) {
      const taskItem = document.createElement('li');
      taskItem.className = 'taskItem';
  
      const taskSpan = document.createElement('span');
      taskSpan.textContent = taskText;
      if (isCompleted) {
        taskSpan.classList.add('completed');
      }
  
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'deleteBtn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks(); // Save tasks to localStorage after deletion
        updateProgressBar(); // Update progress bar
      });
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = isCompleted;
      checkbox.addEventListener('change', () => {
        taskSpan.classList.toggle('completed', checkbox.checked);
        saveTasks(); // Save tasks to localStorage when task is marked completed
        updateProgressBar(); // Update progress bar
      });
  
      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskSpan);
      taskItem.appendChild(deleteBtn);
      taskList.appendChild(taskItem);
    }
  
    // Function to save tasks to localStorage
    function saveTasks() {
      const tasks = [];
      document.querySelectorAll('.taskItem').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.querySelector('input').checked;
        tasks.push({ text: taskText, completed: isCompleted });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Function to load tasks from localStorage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        addTask(task.text, task.completed);
      });
      updateProgressBar(); // Update progress bar after loading tasks
    }
  
    // Function to update the progress bar
    function updateProgressBar() {
      const totalTasks = document.querySelectorAll('.taskItem').length;
      const completedTasks = document.querySelectorAll('.taskItem input:checked').length;
      const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      progressBar.style.width = `${progressPercentage}%`;
    }
  });