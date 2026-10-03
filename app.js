const express = require('express');
const app = express();
const port = 3000;

const data = require('./task.json');
// console.log("data", data);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = data.tasks;
let nextId = tasks.length + 1;
// console.log("nextId", nextId)

// function for validate task data
function validateTask(body) {
    const { title, description, completed } = body;
    if (typeof title !== 'string' || title.trim() === '') return false;
    if (typeof description !== 'string' || description.trim() === '') return false;
    if (typeof completed !== 'boolean') return false;
    return true;
}

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
})

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // console.log("id", id)

    const task = tasks.find((item) => item.id === id)

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(task)
})

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const task = tasks.find((item) => item.id === id)

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks = tasks.filter((item) => item.id !== id)

    return res.status(200).json({ message: "Task deleted successfully" })

})

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { title, description, completed } = req.body;

    if (!validateTask(req.body)) {
        return res.status(400).json({ massage: "somthing went Worng" })
    }

    const task = tasks.find((item) => item.id === id)

    if (!task) {
        return res.status(404).json({ massage: "Task Not Found!" })
    }

    task.title = title,
        task.description = description,
        task.completed = completed,

        res.status(200).json({ massage: "task edited" })

})

app.post('/tasks', (req, res) => {
    const { title, description, completed } = req.body;

    if (!validateTask(req.body)) {
        return res.status(400).json({ massage: "somthing went Worng" })
    }

    const newTask = {
        id: nextId++,
        title: title,
        description: description,
        completed: completed,
    };

    tasks.push(newTask)
    res.status(201).json({ massage: "tasks created sucessfull" })

})


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;