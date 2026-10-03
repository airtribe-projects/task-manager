# Task Manager API

A simple RESTful API for managing tasks, built with Node.js and Express.js.
Tasks are stored in memory (seeded from `task.json` on server start), and the API
supports full CRUD operations along with input validation and error handling.

## Tech Stack

- Node.js
- Express.js
- In-memory data storage
- tap + supertest (for testing)

## Getting Started

### Prerequisites

- Node.js v18 or higher

### Installation

```bash
npm install
```

### Running the server

```bash
node app.js
```

The server will start on `http://localhost:3000`.

### Running tests

```bash
npm run test
```

## API Endpoints

| Method | Endpoint      | Description                  |
|--------|---------------|-------------------------------|
| GET    | /tasks        | Get all tasks                 |
| GET    | /tasks/:id    | Get a single task by ID       |
| POST   | /tasks        | Create a new task             |
| PUT    | /tasks/:id    | Update an existing task       |
| DELETE | /tasks/:id    | Delete a task                 |

### Task Object

```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```

### 1. Get all tasks

**GET** `/tasks`

**Response:** `200 OK` — returns an array of all tasks.

### 2. Get a single task

**GET** `/tasks/:id`

**Response:**
- `200 OK` — returns the matching task
- `404 Not Found` — if no task exists with the given ID

### 3. Create a task

**POST** `/tasks`

**Request body:**
```json
{
  "title": "New Task",
  "description": "New Task Description",
  "completed": false
}
```

**Response:**
- `201 Created` — returns the newly created task
- `400 Bad Request` — if `title`, `description`, or `completed` are missing or of the wrong type

### 4. Update a task

**PUT** `/tasks/:id`

**Request body:**
```json
{
  "title": "Updated Task",
  "description": "Updated Task Description",
  "completed": true
}
```

**Response:**
- `200 OK` — returns a success message and updates the task
- `400 Bad Request` — if the request body is invalid (e.g. `completed` is not a boolean)
- `404 Not Found` — if no task exists with the given ID

### 5. Delete a task

**DELETE** `/tasks/:id`

**Response:**
- `200 OK` — task deleted successfully
- `404 Not Found` — if no task exists with the given ID

## Validation Rules

A task is considered valid when:
- `title` is a non-empty string
- `description` is a non-empty string
- `completed` is a boolean (`true` or `false`)

Requests that don't meet these rules return `400 Bad Request`.

## Project Structure

```
task-manager/
├── app.js          # Express app with routes and logic
├── task.json       # Seed data for in-memory tasks
├── test/           # Test suite (tap + supertest)
├── package.json
└── README.md
```