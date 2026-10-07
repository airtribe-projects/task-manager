# Task Manager API

A RESTful API for managing tasks, built using **Node.js** and **Express.js** with in-memory data storage.

## Features

- Create a new task
- Retrieve all tasks
- Retrieve a task by ID
- Update an existing task
- Delete a task
- Input validation
- Error handling for invalid task IDs and request data
- RESTful API structure using controllers, routes, and services

## Tech Stack

- **Node.js**
- **Express.js**
- **JavaScript**
- **Supertest**
- **Tap**

## Project Structure

```text
task-manager/
│
├── controllers/
│   └── taskController.js
│
├── routes/
│   └── taskRoutes.js
│
├── services/
│   └── taskService.js
│
├── test/
│   └── server.test.js
│
├── task.json
├── app.js
├── package.json
└── README.md
```

## Architecture

The application follows a simple layered structure:

```text
Request
   ↓
Routes
   ↓
Controller
   ↓
Service
   ↓
In-Memory Data
```

### Routes

Responsible for mapping HTTP methods and endpoints to the appropriate controller functions.

### Controllers

Handle HTTP requests and responses, including:

- Request data validation
- HTTP status codes
- Error responses

### Services

Contain the application and data logic for:

- Fetching tasks
- Creating tasks
- Updating tasks
- Deleting tasks

### Data Storage

The initial tasks are stored in `task.json` and loaded into memory when the application starts.

Changes made through the API are stored only in memory and are reset when the application restarts.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

The API is also available under the versioned base path:

```text
/api/v1/tasks
```

## Task Format

A task has the following structure:

```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```

## Creating a Task

### Request

```http
POST /tasks
Content-Type: application/json
```

```json
{
  "title": "Learn Express",
  "description": "Build a REST API using Express.js",
  "completed": false
}
```

### Response

```json
{
  "id": 16,
  "title": "Learn Express",
  "description": "Build a REST API using Express.js",
  "completed": false
}
```

## Updating a Task

```http
PUT /tasks/1
Content-Type: application/json
```

```json
{
  "title": "Updated Task",
  "description": "Updated task description",
  "completed": true
}
```

## Error Handling

The API returns appropriate HTTP status codes for different situations.

| Status Code | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Task successfully created |
| 400 | Invalid request data |
| 404 | Task not found |

Example:

```json
{
  "error": "Task not found"
}
```

## Running the Project

### 1. Clone the repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
node app.js
```

The server runs on:

```text
http://localhost:3000
```

## Testing

The project includes tests covering:

- Creating tasks
- Invalid task creation data
- Fetching all tasks
- Fetching a task by ID
- Invalid task IDs
- Updating tasks
- Invalid update data
- Deleting tasks

Run the provided test file with:

```bash
node test/server.test.js
```

All 10 provided tests pass successfully.

## Notes

This project intentionally uses **in-memory storage** as required by the assignment. The `task.json` file provides the initial dataset, but API changes are not persisted back to the file.

Restarting the server resets the task data to the original contents of `task.json`.