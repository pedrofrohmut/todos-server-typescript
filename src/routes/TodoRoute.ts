import { Router } from "express"

import { validateId } from "../middlewares/Validation"
import TodoController from "../controllers/TodoController"

const todoRouter = Router()

// @Desc: Get all todos from a task
// @Route: GET api/v1/todos/task/:id
// @Access: Private
todoRouter.get("/task/:id", validateId, TodoController.findTodoByTaskId)

// @Desc: Get todo by id
// @Route: GET api/v1/todos/:id
// @Access: Private
todoRouter.get("/:id", validateId, TodoController.findTodoById)

// @Desc: Create a todo
// @Route: POST api/v1/todos/task/:id
// @Access: Private
todoRouter.post("/task/:id", validateId, TodoController.createTodo)

// @Desc: Update todo by ID
// @Route: PUT api/v1/todos/:id
// @Access: Private
todoRouter.put("/:id", validateId, TodoController.updateTodo)

// @Desc: Delete todo
// @Route: DELETE api/v1/todos/:id
// @Access: Private
todoRouter.delete("/:id", validateId, TodoController.deleteTodo)

// @Desc: Set todo isComplete propety to true
// @Route: PATCH api/v1/todos/:id/iscomplete
// @Access: Private
todoRouter.patch("/:id/iscomplete", validateId, TodoController.setTodoAsComplete)

// @Desc: Set todo isComplete property to false
// @Route: PATCH api/v1/todos/:id/isnotcomplete
// @Access: Private
todoRouter.patch("/:id/isnotcomplete", validateId, TodoController.setTodoAsNotComplete)

// @Desc: Clear all the complete todos from a task
// @Route: DELETE api/v1/todos/clearcomplete/task/:id
// @Access: Private
todoRouter.delete("/clearcomplete/task/:id", validateId, TodoController.clearCompleteTodos)

export default todoRouter
