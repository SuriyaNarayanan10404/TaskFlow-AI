const createBtn = document.getElementById("createBtn");
const taskList = document.getElementById("taskList");

window.addEventListener("load", loadTasks);

createBtn.addEventListener("click", () => {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if(title === "" || description === ""){
        alert("Please fill all fields");
        return;
    }

    const task = {
        title,
        description
    };

    saveTask(task);

    addTaskToScreen(task);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

});

function addTaskToScreen(task){

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(taskDiv);

    const deleteBtn = taskDiv.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {

        taskDiv.remove();

        deleteTask(task);

    });

}

function saveTask(task){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        addTaskToScreen(task);
    });

}

function deleteTask(taskToDelete){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(task =>
        task.title !== taskToDelete.title
    );

    localStorage.setItem("tasks", JSON.stringify(tasks));

}