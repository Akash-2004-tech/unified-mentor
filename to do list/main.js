
let tasks = [];

const addtask = () => {
    const taskinput = document.getElementById("taskinput");
    const text = taskinput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskinput.value = "";
        updatetasklist();
    }
};

const updatetasklist = () => {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listitem = document.createElement("li");
        listitem.innerHTML = `
            <div class="taskitem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Edit" onclick="edittask(${index})" />
                    <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" onclick="deletetask(${index})" />
                </div>
            </div>
        `;
        listitem.querySelector(".checkbox").addEventListener("change", () => toggletaskcomplete(index));
        taskList.appendChild(listitem);
    });

    updateStats();
};

const toggletaskcomplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updatetasklist();
};

const deletetask = (index) => {
    tasks.splice(index, 1);
    updatetasklist();
};

const edittask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updatetasklist();
    }
};

const updateStats = () => {
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    document.getElementById("numbers").textContent = `${completed}/${total}`;
    const progress = document.getElementById("progress");
    const percent = total === 0 ? 0 : (completed / total) * 100;
    progress.style.width = `${percent}%`;
};

// Handle form submit
document.getElementById("newtask").addEventListener("click", (e) => {
    e.preventDefault();
    addtask();
});

// Enter key support
document.getElementById("taskinput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addtask();
    }
});

// Make edit and delete functions global for inline onclick
window.edittask = edittask;
window.deletetask = deletetask;
