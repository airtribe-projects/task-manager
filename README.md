# Task Manager API

A simple Express-based task management API for creating, reading, updating, and deleting tasks.

## Features

- Get all tasks
- Get a single task by ID
- Create a new task
- Update an existing task
- Delete a task
- Optional filtering and sorting on the task list

## Tech Stack

- Node.js
- Express
- Supertest
- Tap

## Prerequisites

- Node.js 18 or above
- npm

## Installation

```bash
npm install
```

## Run the Project

```bash
node app.js
```

The server starts on:

```text
http://localhost:3000
```

## API Endpoints

### Get all tasks

```http
GET /tasks
```

Optional query parameters:

- `completed=true|false`
- `sortBy=createdAt`

### Get a task by ID

```http
GET /tasks/:id
```

### Create a task

```http
POST /tasks
```

Request body example:

```json
{
  "title": "Write README",
  "description": "Create a clear project documentation file",
  "completed": false
}
```

### Update a task

```http
PUT /tasks/:id
```

Request body example:

```json
{
  "title": "Updated task",
  "description": "Updated task description",
  "completed": true
}
```

### Delete a task

```http
DELETE /tasks/:id
```

## Example Response

```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "createdAt": "2026-09-07T12:00:00.000Z"
}
```

## Test the API

```bash
npm test
```

If `npm test` fails in this environment due to a Windows command execution issue, use the project’s direct Node validation flow or ensure your local environment has a working Node/npm setup.
