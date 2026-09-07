const fs = require("fs");
const path = require("path");

const taskFilePath = path.join(__dirname, "..", "..", "task.json");

function loadTasks() {
  try {
    const raw = fs.readFileSync(taskFilePath, "utf8");
    const parsed = JSON.parse(raw);
    const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];

    return tasks.map((task, index) => ({
      id: Number(task.id) || index + 1,
      title: task.title,
      description: typeof task.description === "string" ? task.description : "",
      completed: Boolean(task.completed),
      createdAt: task.createdAt || new Date().toISOString(),
    }));
  } catch (error) {
    return [];
  }
}

module.exports = {
  loadTasks,
};
