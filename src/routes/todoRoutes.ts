import { Router } from "express"

import {
  findTodoByTaskId,
  findTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  setTodoAsComplete,
  setTodoAsNotComplete,
  clearCompleteTodos
} from "../controllers/todoController"

const todoRouter = Router()

// @Desc: Get all todos from a task
// @Route: GET api/v1/todos/task/:id
// @Access: Private
todoRouter.get("/task/:id", findTodoByTaskId)

// @Desc: Get todo by id
// @Route: GET api/v1/todos/:id
// @Access: Private
todoRouter.get("/:id", findTodoById)

// @Desc: Create a todo
// @Route: POST api/v1/todos/task/:id
// @Access: Private
todoRouter.post("/", createTodo)

// @Desc: Update todo by ID
// @Route: PUT api/v1/todos/:id
// @Access: Private
todoRouter.put("/:id", updateTodo)

// @Desc: Delete todo
// @Route: DELETE api/v1/todos/:id
// @Access: Private
todoRouter.delete("/:id", deleteTodo)

// @Desc: Set todo isComplete propety to true
// @Route: PATCH api/v1/todos/:id/iscomplete
// @Access: Private
todoRouter.patch("/:id/iscomplete", setTodoAsComplete)

// @Desc: Set todo isComplete property to false
// @Route: PATCH api/v1/todos/:id/isnotcomplete
// @Access: Private
todoRouter.patch("/:id/isnotcomplete", setTodoAsNotComplete)

// @Desc: Clear all the complete todos from a task
// @Route: DELETE api/v1/todos/clearcomplete/task/:id
// @Access: Private
todoRouter.delete("/clearcomplete/task/:id", clearCompleteTodos)

export default todoRouter
