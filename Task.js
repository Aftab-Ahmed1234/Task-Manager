document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task));
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTask = () => {
  const taskName = document.getElementById('taskName').value.trim();
  const taskPriority = document.getElementById('taskPriority').value.trim();
  const taskDeadline = document.getElementById('taskDeadline').value;
  const taskProgress = document.getElementById('taskProgress').value;

  if (!taskName) return;

  const task = {
    id: Date.now(),
    name: taskName,
    priority: taskPriority,
    deadline: taskDeadline,
    progress: taskProgress,
    completed: false
  };

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  saveTasks(tasks);

  renderTask(task);
  document.getElementById('taskName').value = '';
  document.getElementById('taskPriority').value = '';
  document.getElementById('taskDeadline').value = '';
  document.getElementById('taskProgress').value = '';
};

const renderTask = (task) => {
  const taskTableBody = document.getElementById('taskTableBody');
  const completedTasksDiv = document.getElementById('completedTasks');

  if (task.completed) {
    // Render completed tasks in the completedTasks div without line-through style
    const completedTaskDiv = document.createElement('div');
    completedTaskDiv.className = 'p-2 my-2 bg-green-100 rounded-lg';
    completedTaskDiv.innerHTML = `
      <span>${task.name} - ${task.priority} - ${task.deadline}</span>
      <button onclick="deleteTask(${task.id})" class="text-red-500 ml-4">✖</button>
    `;
    completedTasksDiv.appendChild(completedTaskDiv);
  } else {
    // Render active tasks in the main table
    const taskRow = document.createElement('tr');
    taskRow.innerHTML = `
      <td class="px-6 py-4">${task.name}</td>
      <td class="px-6 py-4">${task.priority}</td>
      <td class="px-6 py-4">${task.deadline}</td>
      <td class="px-6 py-4">
        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style="width: ${task.progress}%">${task.progress}%</div>
        </div>
      </td>
      <td class="px-6 py-4 flex">
        <button onclick="editTask(${task.id})" class="text-yellow-500 px-2">✏️</button>
        <button onclick="deleteTask(${task.id})" class="text-red-500 px-2">✖</button>
        <button onclick="toggleCompleteTask(${task.id})" class="text-green-500 px-2">✔</button>
      </td> 
    `;
    taskTableBody.appendChild(taskRow);
  }
};


const toggleCompleteTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const task = tasks.find(task => task.id === id);
  task.completed = !task.completed;
  saveTasks(tasks);
  refreshTasks();
};

const editTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const task = tasks.find(task => task.id === id);

  const newName = prompt("Edit task name:", task.name);
  const newPriority = prompt("Edit priority:", task.priority);
  const newDeadline = prompt("Edit deadline:", task.deadline);
  const newProgress = prompt("Edit progress:", task.progress);

  if (newName) task.name = newName;
  if (newPriority) task.priority = newPriority;
  if (newDeadline) task.deadline = newDeadline;
  if (newProgress) task.progress = newProgress;

  saveTasks(tasks);
  refreshTasks();
};

const deleteTask = (id) => {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(tasks);
  refreshTasks();
};

const refreshTasks = () => {
  document.getElementById('taskTableBody').innerHTML = '';
  document.getElementById('completedTasks').innerHTML = '';
  loadTasks();
};

// script.js
function filterUsers() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const userList = document.getElementById('userList');
  const users = userList.getElementsByClassName('flex');

  for (let i = 0; i < users.length; i++) {
    const userName = users[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
    if (userName.includes(searchInput)) {
      users[i].style.display = "";
    } else {
      users[i].style.display = "none";
    }
  }
}
