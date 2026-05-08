const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const errorMessage = document.querySelector("#errorMessage");
const taskCount = document.querySelector("#taskCount");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompleted = document.querySelector("#clearCompleted");

let tasks = [
  { id: 1, text: "Perfundo faqen e portfolios", completed: true },
  { id: 2, text: "Shto projektin Task Manager", completed: false },
  { id: 3, text: "Publiko linkun ne LinkedIn", completed: false }
];

let currentFilter = "all";

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

function updateCount() {
  const activeTasks = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = activeTasks === 1 ? "1 detyre aktive" : `${activeTasks} detyra aktive`;
}

function renderTasks() {
  const visibleTasks = getFilteredTasks();
  taskList.innerHTML = "";

  if (visibleTasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "Nuk ka detyra per kete filter.";
    taskList.appendChild(empty);
    updateCount();
    return;
  }

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.completed ? " is-completed" : ""}`;

    const checkButton = document.createElement("button");
    checkButton.className = "check-btn";
    checkButton.type = "button";
    checkButton.textContent = task.completed ? "✓" : "";
    checkButton.setAttribute("aria-label", "Ndrysho statusin e detyres");
    checkButton.addEventListener("click", () => toggleTask(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "X";
    deleteButton.setAttribute("aria-label", "Fshi detyren");
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    item.append(checkButton, text, deleteButton);
    taskList.appendChild(item);
  });

  updateCount();
}

function addTask(text) {
  tasks.unshift({
    id: Date.now(),
    text,
    completed: false
  });
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) => (
    task.id === id ? { ...task, completed: !task.completed } : task
  ));
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = taskInput.value.trim();

  if (!value) {
    errorMessage.textContent = "Shkruaj nje detyre para se ta shtosh.";
    taskInput.focus();
    return;
  }

  errorMessage.textContent = "";
  addTask(value);
  taskInput.value = "";
  taskInput.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => filterButton.classList.remove("is-active"));
    button.classList.add("is-active");
    renderTasks();
  });
});

clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
});

renderTasks();
