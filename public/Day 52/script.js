

        // Task Management Board Application
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const taskModal = document.getElementById('task-modal');
            const taskForm = document.getElementById('task-form');
            const closeModalBtn = document.getElementById('close-modal');
            const cancelTaskBtn = document.getElementById('cancel-task');
            const addTaskBtns = document.querySelectorAll('.add-task-btn');
            const clearAllBtn = document.getElementById('clear-all');
            
            // Task columns
            const todoTasks = document.getElementById('todo-tasks');
            const inprogressTasks = document.getElementById('inprogress-tasks');
            const reviewTasks = document.getElementById('review-tasks');
            const doneTasks = document.getElementById('done-tasks');
            
            // Form elements
            const taskIdInput = document.getElementById('task-id');
            const taskTitleInput = document.getElementById('task-title');
            const taskDescriptionInput = document.getElementById('task-description');
            const taskPriorityInput = document.getElementById('task-priority');
            const taskColumnInput = document.getElementById('task-column');
            const modalTitle = document.getElementById('modal-title');
            
            // Statistics elements
            const totalTasksEl = document.getElementById('total-tasks');
            const doneTasksEl = document.getElementById('done-tasks');
            const progressTasksEl = document.getElementById('progress-tasks');
            const todoCountEl = document.getElementById('todo-count');
            const inprogressCountEl = document.getElementById('inprogress-count');
            const reviewCountEl = document.getElementById('review-count');
            const doneCountEl = document.getElementById('done-count');
            
            // State
            let tasks = [];
            let currentTaskId = null;
            let isEditing = false;
            
            // Initialize the board
            function init() {
                loadTasks();
                updateStats();
                setupEventListeners();
                setupDragAndDrop();
            }
            
            // Load tasks from localStorage
            function loadTasks() {
                const savedTasks = localStorage.getItem('taskBoardTasks');
                if (savedTasks) {
                    tasks = JSON.parse(savedTasks);
                    renderTasks();
                } else {
                    // Add some sample tasks if no tasks exist
                    tasks = [
                        {
                            id: 1,
                            title: 'Design Homepage',
                            description: 'Create wireframes and mockups for the new homepage design',
                            priority: 'high',
                            column: 'todo',
                            createdAt: new Date().toISOString()
                        },
                        {
                            id: 2,
                            title: 'Implement Drag & Drop',
                            description: 'Add drag and drop functionality to task cards',
                            priority: 'high',
                            column: 'inprogress',
                            createdAt: new Date().toISOString()
                        },
                        {
                            id: 3,
                            title: 'Fix Login Bug',
                            description: 'Users unable to login with Firefox browser',
                            priority: 'medium',
                            column: 'review',
                            createdAt: new Date().toISOString()
                        },
                        {
                            id: 4,
                            title: 'Update Documentation',
                            description: 'Add new API endpoints to developer documentation',
                            priority: 'low',
                            column: 'done',
                            createdAt: new Date().toISOString()
                        },
                        {
                            id: 5,
                            title: 'Team Meeting',
                            description: 'Weekly team sync to discuss project progress',
                            priority: 'medium',
                            column: 'todo',
                            createdAt: new Date().toISOString()
                        }
                    ];
                    saveTasks();
                    renderTasks();
                }
            }
            
            // Save tasks to localStorage
            function saveTasks() {
                localStorage.setItem('taskBoardTasks', JSON.stringify(tasks));
                updateStats();
            }
            
            // Render all tasks to the board
            function renderTasks() {
                // Clear all columns
                todoTasks.innerHTML = '';
                inprogressTasks.innerHTML = '';
                reviewTasks.innerHTML = '';
                doneTasks.innerHTML = '';
                
                // If a column is empty, show a message
                const emptyMessage = '<div class="empty-column">No tasks yet. Add a new task!</div>';
                
                // Filter tasks by column and render
                const todoTasksList = tasks.filter(task => task.column === 'todo');
                const inprogressTasksList = tasks.filter(task => task.column === 'inprogress');
                const reviewTasksList = tasks.filter(task => task.column === 'review');
                const doneTasksList = tasks.filter(task => task.column === 'done');
                
                // Render todo tasks
                if (todoTasksList.length === 0) {
                    todoTasks.innerHTML = emptyMessage;
                } else {
                    todoTasksList.forEach(task => {
                        todoTasks.appendChild(createTaskElement(task));
                    });
                }
                
                // Render inprogress tasks
                if (inprogressTasksList.length === 0) {
                    inprogressTasks.innerHTML = emptyMessage;
                } else {
                    inprogressTasksList.forEach(task => {
                        inprogressTasks.appendChild(createTaskElement(task));
                    });
                }
                
                // Render review tasks
                if (reviewTasksList.length === 0) {
                    reviewTasks.innerHTML = emptyMessage;
                } else {
                    reviewTasksList.forEach(task => {
                        reviewTasks.appendChild(createTaskElement(task));
                    });
                }
                
                // Render done tasks
                if (doneTasksList.length === 0) {
                    doneTasks.innerHTML = emptyMessage;
                } else {
                    doneTasksList.forEach(task => {
                        doneTasks.appendChild(createTaskElement(task));
                    });
                }
                
                // Update column counts
                todoCountEl.textContent = todoTasksList.length;
                inprogressCountEl.textContent = inprogressTasksList.length;
                reviewCountEl.textContent = reviewTasksList.length;
                doneCountEl.textContent = doneTasksList.length;
                
                // Update drag and drop after rendering
                setupTaskDragAndDrop();
            }
            
            // Create a task element
            function createTaskElement(task) {
                const taskEl = document.createElement('div');
                taskEl.className = `task ${task.column}`;
                taskEl.setAttribute('draggable', 'true');
                taskEl.dataset.id = task.id;
                
                // Priority class
                const priorityClass = `priority-${task.priority}`;
                
                // Format date
                const date = new Date(task.createdAt);
                const formattedDate = date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                });
                
                taskEl.innerHTML = `
                    <div class="task-header">
                        <div>
                            <div class="task-title">${escapeHtml(task.title)}</div>
                            <div class="task-description">${escapeHtml(task.description)}</div>
                        </div>
                        <span class="task-priority ${priorityClass}">${task.priority.toUpperCase()}</span>
                    </div>
                    <div class="task-footer">
                        <span>Created: ${formattedDate}</span>
                        <div class="task-actions">
                            <button class="edit-task" title="Edit Task">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="delete-task" title="Delete Task">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                
                // Add event listeners to action buttons
                const editBtn = taskEl.querySelector('.edit-task');
                const deleteBtn = taskEl.querySelector('.delete-task');
                
                editBtn.addEventListener('click', () => editTask(task.id));
                deleteBtn.addEventListener('click', () => deleteTask(task.id));
                
                return taskEl;
            }
            
            // Update statistics
            function updateStats() {
                const totalTasks = tasks.length;
                const doneTasksCount = tasks.filter(task => task.column === 'done').length;
                const inprogressTasksCount = tasks.filter(task => task.column === 'inprogress').length;
                
                totalTasksEl.textContent = totalTasks;
                doneTasksEl.textContent = doneTasksCount;
                progressTasksEl.textContent = inprogressTasksCount;
            }
            
            // Setup drag and drop for columns
            function setupDragAndDrop() {
                const columns = document.querySelectorAll('.tasks-container');
                
                columns.forEach(column => {
                    column.addEventListener('dragover', e => {
                        e.preventDefault();
                        column.classList.add('drag-over');
                    });
                    
                    column.addEventListener('dragleave', () => {
                        column.classList.remove('drag-over');
                    });
                    
                    column.addEventListener('drop', e => {
                        e.preventDefault();
                        column.classList.remove('drag-over');
                        
                        const taskId = e.dataTransfer.getData('text/plain');
                        const taskElement = document.querySelector(`[data-id="${taskId}"]`);
                        
                        if (taskElement && !column.contains(taskElement)) {
                            // Determine the new column based on the drop target
                            let newColumn;
                            if (column.id === 'todo-tasks') newColumn = 'todo';
                            else if (column.id === 'inprogress-tasks') newColumn = 'inprogress';
                            else if (column.id === 'review-tasks') newColumn = 'review';
                            else if (column.id === 'done-tasks') newColumn = 'done';
                            
                            // Update task in array
                            const task = tasks.find(t => t.id == taskId);
                            if (task) {
                                task.column = newColumn;
                                saveTasks();
                                renderTasks();
                            }
                        }
                    });
                });
            }
            
            // Setup drag and drop for individual tasks
            function setupTaskDragAndDrop() {
                const taskElements = document.querySelectorAll('.task');
                
                taskElements.forEach(task => {
                    task.addEventListener('dragstart', e => {
                        e.dataTransfer.setData('text/plain', task.dataset.id);
                        task.classList.add('dragging');
                    });
                    
                    task.addEventListener('dragend', () => {
                        task.classList.remove('dragging');
                    });
                });
            }
            
            // Open modal to add/edit a task
            function openTaskModal(column = 'todo', taskId = null) {
                isEditing = taskId !== null;
                
                if (isEditing) {
                    modalTitle.textContent = 'Edit Task';
                    const task = tasks.find(t => t.id == taskId);
                    
                    if (task) {
                        taskIdInput.value = task.id;
                        taskTitleInput.value = task.title;
                        taskDescriptionInput.value = task.description;
                        taskPriorityInput.value = task.priority;
                        taskColumnInput.value = task.column;
                    }
                } else {
                    modalTitle.textContent = 'Add New Task';
                    taskIdInput.value = '';
                    taskTitleInput.value = '';
                    taskDescriptionInput.value = '';
                    taskPriorityInput.value = 'medium';
                    taskColumnInput.value = column;
                }
                
                taskModal.style.display = 'flex';
            }
            
            // Close modal
            function closeTaskModal() {
                taskModal.style.display = 'none';
                taskForm.reset();
            }
            
            // Add or update a task
            function saveTask(e) {
                e.preventDefault();
                
                const title = taskTitleInput.value.trim();
                const description = taskDescriptionInput.value.trim();
                const priority = taskPriorityInput.value;
                const column = taskColumnInput.value;
                
                if (!title) {
                    alert('Task title is required');
                    return;
                }
                
                if (isEditing) {
                    // Update existing task
                    const taskId = parseInt(taskIdInput.value);
                    const taskIndex = tasks.findIndex(t => t.id === taskId);
                    
                    if (taskIndex !== -1) {
                        tasks[taskIndex].title = title;
                        tasks[taskIndex].description = description;
                        tasks[taskIndex].priority = priority;
                        tasks[taskIndex].column = column;
                    }
                } else {
                    // Add new task
                    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
                    
                    const newTask = {
                        id: newId,
                        title,
                        description,
                        priority,
                        column,
                        createdAt: new Date().toISOString()
                    };
                    
                    tasks.push(newTask);
                }
                
                saveTasks();
                renderTasks();
                closeTaskModal();
            }
            
            // Edit a task
            function editTask(taskId) {
                openTaskModal(null, taskId);
            }
            
            // Delete a task
            function deleteTask(taskId) {
                if (confirm('Are you sure you want to delete this task?')) {
                    tasks = tasks.filter(task => task.id != taskId);
                    saveTasks();
                    renderTasks();
                }
            }
            
            // Clear all tasks
            function clearAllTasks() {
                if (tasks.length === 0) {
                    alert('No tasks to clear!');
                    return;
                }
                
                if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
                    tasks = [];
                    saveTasks();
                    renderTasks();
                }
            }
            
            // Setup event listeners
            function setupEventListeners() {
                // Add task buttons
                addTaskBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const column = btn.getAttribute('data-column');
                        openTaskModal(column);
                    });
                });
                
                // Modal close buttons
                closeModalBtn.addEventListener('click', closeTaskModal);
                cancelTaskBtn.addEventListener('click', closeTaskModal);
                
                // Click outside modal to close
                window.addEventListener('click', (e) => {
                    if (e.target === taskModal) {
                        closeTaskModal();
                    }
                });
                
                // Form submission
                taskForm.addEventListener('submit', saveTask);
                
                // Clear all tasks button
                clearAllBtn.addEventListener('click', clearAllTasks);
            }
            
            // Helper function to escape HTML
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
            
            // Initialize the application
            init();
        });
=======
function openTab(id,el){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll("nav li").forEach(l=>l.classList.remove("active"));
  el.classList.add("active");
}

themeToggle.onclick=()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",document.body.classList.contains("dark")?"dark":"light");
};
if(localStorage.getItem("theme")==="dark")document.body.classList.add("dark");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
const list=document.getElementById("taskList");
const printTaskDiv=document.getElementById("printTask");

taskForm.onsubmit=e=>{
  e.preventDefault();
  tasks.push({
    id:"TSK-"+Math.floor(10000+Math.random()*90000),
    title:title.value,
    due:due.value,
    priority:priority.value,
    desc:desc.value
  });
  localStorage.setItem("tasks",JSON.stringify(tasks));
  taskForm.reset();
  renderTasks();
  openTab('tasksTab',document.querySelectorAll("nav li")[2]);
};

function renderTasks(){
  list.innerHTML=tasks.length?"":"<p>No tasks added</p>";
  tasks.forEach((t,i)=>{
    list.innerHTML+=`
      <div class="task">
        <b>${t.title}</b><br>
        <small>Due: ${t.due} | Priority: ${t.priority}</small>
        <p>${t.desc}</p>
        <div class="actions">
          <button class="edit" onclick="editTask(${i})">Edit</button>
          <button class="pdf" onclick="printTask(${i})">PDF</button>
          <button class="delete" onclick="deleteTask(${i})">Delete</button>
        </div>
      </div>`;
  });
}

function deleteTask(i){
  tasks.splice(i,1);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  renderTasks();
}

function editTask(i){
  const t=tasks[i];
  title.value=t.title;
  due.value=t.due;
  priority.value=t.priority;
  desc.value=t.desc;
  tasks.splice(i,1);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  openTab('addTask',document.querySelectorAll("nav li")[1]);
}

function printTask(i){
  const t=tasks[i];
  printContent.innerHTML=`
    <b>ID:</b> ${t.id}<br><br>
    <b>Title:</b> ${t.title}<br>
    <b>Due:</b> ${t.due}<br>
    <b>Priority:</b> ${t.priority}<br><br>
    ${t.desc}`;
  printTaskDiv.style.display="block";
  setTimeout(()=>{
    window.print();
    printTaskDiv.style.display="none";
  },300);
}

renderTasks();

