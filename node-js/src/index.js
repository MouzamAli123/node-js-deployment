const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let tasks = [
    { id: 1, name: "Buy a new Udemy course", completed: false },
    { id: 2, name: "Practice with Kubernetes", completed: false },
];
let completedTasks = [];

// Function to generate unique task IDs
const generateId = () => {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
};

// Route for adding a new task
app.post("/addtask", (req, res) => {
    const newTaskName = req.body.newtask.trim();
    if (newTaskName) {
        const newTask = { id: generateId(), name: newTaskName, completed: false };
        tasks.push(newTask);
    }
    res.redirect("/");
});

// Route for toggling task completion
app.post("/toggletask", (req, res) => {
    const taskId = parseInt(req.body.check);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed; // Toggle completion status
    }
    res.redirect("/");
});

// Render the main page with tasks and completed tasks
app.get("/", (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);
    res.render("index", { task: pendingTasks, complete: completedTasks });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});