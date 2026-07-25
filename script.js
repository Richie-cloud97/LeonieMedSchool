console.log("Leonie script loaded");


// Dark mode
const button = document.getElementById("themeToggle");

if (button) {
    button.addEventListener("click", function () {

        document.body.classList.toggle("dark");

    });
}


// Planner
let tasks = JSON.parse(localStorage.getItem("leonieTasks")) || [];


function addTask() {

    const input = document.getElementById("taskInput");

    if (!input.value.trim()) {
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    localStorage.setItem(
        "leonieTasks",
        JSON.stringify(tasks)
    );

    input.value = "";

    displayTasks();
}


function displayTasks() {

    const taskList = document.getElementById("taskList");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        li.innerHTML =
            task.text +
            " <button onclick='deleteTask(" + index + ")'>🗑️</button>";

        taskList.appendChild(li);

    });
}


function deleteTask(index) {

    tasks.splice(index, 1);

    localStorage.setItem(
        "leonieTasks",
        JSON.stringify(tasks)
    );

    displayTasks();
}


window.addTask = addTask;
window.deleteTask = deleteTask;


displayTasks();
