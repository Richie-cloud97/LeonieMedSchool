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
                ${task.text}
            </span>

            <div>

                <button onclick="completeTask(${index})">
                    ✅
                </button>

                <button onclick="deleteTask(${index})">
                    🗑️
                </button>

            </div>

        `;


        taskList.appendChild(li);

    });

}



function addTask(){

    const input = document.getElementById("taskInput");


    if (!input.value.trim()){
        return;
    }


    tasks.push({

        text: input.value,

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
