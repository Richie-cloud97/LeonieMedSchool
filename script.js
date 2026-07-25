console.log("Leonie planner loaded");


// -----------------------------
// Dark Mode
// -----------------------------

const button = document.getElementById("themeToggle");

if (button) {

    button.addEventListener("click", function () {

        document.body.classList.toggle("dark");

    });

}


// -----------------------------
// Study Planner
// -----------------------------

let tasks = JSON.parse(localStorage.getItem("leonieTasks")) || [];


function saveTasks(){

    localStorage.setItem(
        "leonieTasks",
        JSON.stringify(tasks)
    );

}



function displayTasks(){

    const taskList = document.getElementById("taskList");

    if (!taskList){
        return;
    }


    taskList.innerHTML = "";


    tasks.forEach(function(task,index){

        const li = document.createElement("li");


li.innerHTML = `

<span class="${task.completed ? "completed" : ""}">

    <strong>${task.text}</strong>

    <br>

    <small>
        ${task.subject || "General"} • ${task.day || ""}
    </small>

</span>


    <div>

        <button onclick="completeTask(${index})">
            ${task.completed ? "↩️ Undo" : "✅ Done"}
        </button>


        <button onclick="deleteTask(${index})">
            🗑️ Delete
        </button>

    </div>

`;


        taskList.appendChild(li);

    });

}



function addTask(){

    const input = document.getElementById("taskInput");

    const subject = document.getElementById("subjectSelect");

    const day = document.getElementById("daySelect");


    if (!input.value.trim()){
        return;
    }


    tasks.push({

        text: input.value,

        subject: subject.value,

        day: day.value,

        completed:false

    });


    saveTasks();


    input.value="";


    displayTasks();

}



function completeTask(index){

    tasks[index].completed =
        !tasks[index].completed;


    saveTasks();


    displayTasks();

}



function deleteTask(index){

    tasks.splice(index,1);


    saveTasks();


    displayTasks();

}



// Make HTML buttons work

window.addTask = addTask;
window.completeTask = completeTask;
window.deleteTask = deleteTask;



displayTasks();
function updateProgress(){

    const progressText =
        document.getElementById("progressText");

    const progressFill =
        document.getElementById("progressFill");


    if(!progressText || !progressFill){
        return;
    }


    const total = tasks.length;


    const completed = tasks.filter(function(task){

        return task.completed;

    }).length;


    let percentage = 0;


    if(total > 0){

        percentage = Math.round(
            (completed / total) * 100
        );

    }


    progressText.innerHTML = `

        Completed:
        <strong>${completed}</strong>
        /
        <strong>${total}</strong>
        tasks

        <br>

        Progress:
        <strong>${percentage}%</strong>

    `;


    progressFill.style.width =
        percentage + "%";

}
