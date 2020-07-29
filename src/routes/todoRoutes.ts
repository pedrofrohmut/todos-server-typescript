import { Router } from "express"

import TodoController from "../controllers/TodoController"

const todoRouter = Router()

// @Desc: Get all todos from a task
// @Route: GET api/v1/todos/task/:id
// @Access: Private
todoRouter.get("/task/:id", TodoController.findTodoByTaskId)

// @Desc: Get todo by id
// @Route: GET api/v1/todos/:id
// @Access: Private
todoRouter.get("/:id", TodoController.findTodoById)

// @Desc: Create a todo
// @Route: POST api/v1/todos/task/:id
// @Access: Private
todoRouter.post("/task/:id", TodoController.createTodo)

// @Desc: Update todo by ID
// @Route: PUT api/v1/todos/:id
// @Access: Private
todoRouter.put("/:id", TodoController.updateTodo)

// @Desc: Delete todo
// @Route: DELETE api/v1/todos/:id
// @Access: Private
todoRouter.delete("/:id", TodoController.deleteTodo)

// @Desc: Set todo isComplete propety to true
// @Route: PATCH api/v1/todos/:id/iscomplete
// @Access: Private
todoRouter.patch("/:id/iscomplete", TodoController.setTodoAsComplete)

// @Desc: Set todo isComplete property to false
// @Route: PATCH api/v1/todos/:id/isnotcomplete
// @Access: Private
todoRouter.patch("/:id/isnotcomplete", TodoController.setTodoAsNotComplete)

// @Desc: Clear all the complete todos from a task
// @Route: DELETE api/v1/todos/clearcomplete/task/:id
// @Access: Private
todoRouter.delete("/clearcomplete/task/:id", TodoController.clearCompleteTodos)

export default todoRouter
