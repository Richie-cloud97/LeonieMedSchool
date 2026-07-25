const button = document.getElementById("themeToggle");

button.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        button.textContent = "☀️";
    }else{
        button.textContent = "🌙";
    }
});

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

    if(!taskList) return;


    taskList.innerHTML = "";


    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
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

    if(!input.value.trim()) return;


    tasks.push({

        text: input.value,

        completed:false

    });


    input.value="";

    saveTasks();

    displayTasks();

}



function completeTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}



function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}



displayTasks();
