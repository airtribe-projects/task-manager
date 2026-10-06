# Task Manager API

A simple REST API for managing tasks, built using Node.js and Express.


## Tech Stack

* Node.js
* Express.js
* JavaScript
* Postman

For now, tasks are stored in a JavaScript array instead of a database. This means the data will be lost whenever the server is restarted.

## Getting Started

Clone the project and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The API will be available at:
http://localhost:3000

## API Endpoints

### Get all tasks

```http
GET /tasks
```

Returns the list of all tasks.

### Get a task by ID

```http
GET /tasks/:id
```

For example:

```http
GET /tasks/1
```

If the task with the given ID doesn't exist, the API returns a `404` response.

### Create a task

```http
POST /tasks
```

Example request body:

```json
{
  "title": "Learn Node",
  "description": "Learn Express and build APIs",
  "completed": false
}
```

The following validations are applied:

* `title` should not be empty
* `description` should not be empty
* `completed` should be either `true` or `false`

### Update a task

```http
PUT /tasks/:id
```

For example:

```http
PUT /tasks/1
```

Example request body:

```json
{
  "title": "Learn Node properly",
  "description": "Practice Express and backend concepts",
  "completed": true
}
```

### Delete a task

```http
DELETE /tasks/:id
```

For example:

```http
DELETE /tasks/1
```

This removes the task from the in-memory task list.

## Filtering Tasks

Tasks can be filtered using query parameters.

For example:

```http
GET /tasks?completed=false
```

This returns tasks that are not completed.

Multiple filters can also be used together:

## Error Handling

The API has centralized error handling using Express middleware.

For example, if a task title is empty:

```json
{
  "error": "Title cannot be empty"
}
```

If a task cannot be found:

```json
{
  "error": "Task Not Found"
}
```

Validation errors return `400`, while requests for tasks that don't exist return `404`.

Unexpected errors are handled with a `500 Internal Server Error` response.

## Testing

I used Postman to test the different API endpoints while building the project.

There is also a basic test setup using `tap`.

Run the tests with:

```bash
npm test
```
