const createBtn = document.getElementById("createBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const aiSuggestion = document.getElementById("aiSuggestion");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();
updateStats();

createBtn.addEventListener("click", () => {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    if (title === "" || description === "") {
        alert("Please fill all fields");
        return;
    }

    const task = {
        title,
        description,
        status
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    updateStats();
    updateAI();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
});

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        taskList.innerHTML += `
        
        <div class="task-card">

            <h3>${task.title}</h3>

            <p>${task.description}</p>

            <span class="status">
                ${task.status ? task.status : "Pending"}
            </span>

            <button onclick="deleteTask(${index})">
                Delete
            </button>

        </div>
        `;
    });
}

function deleteTask(index) {

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    updateStats();
}

function updateStats() {

    totalTasks.innerText = tasks.length;

    completedTasks.innerText =
        tasks.filter(task => task.status === "Completed").length;

    pendingTasks.innerText =
        tasks.filter(task => task.status === "Pending").length;
}

function updateAI() {

    if (tasks.length >= 5) {

        aiSuggestion.innerText =
            "You are managing many tasks. Try completing pending tasks first!";
    }
    else {

        aiSuggestion.innerText =
            "Great productivity! Keep going 🚀";
    }
}