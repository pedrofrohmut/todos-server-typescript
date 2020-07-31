import { Router } from "express"

import TodoController from "../controllers/TodoController"
import * as MongooseMiddleware from "../middlewares/MongooseMiddleware"
import * as TaskMiddleware from "../middlewares/TaskMiddleware"
import * as TodoMiddleware from "../middlewares/TodoMiddleware"
import * as UserMiddleware from "../middlewares/UserMiddleware"

const todoRouter = Router()

// @Desc: Get all todos from a task
// @Route: GET api/v1/todos/task/:id
// @Access: Private
todoRouter.get(
  "/task/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TaskMiddleware.checkTaskExists,
  TodoController.findTodoByTaskId)

// @Desc: Get todo by id
// @Route: GET api/v1/todos/:id
// @Access: Private
todoRouter.get(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.checkTodoExists,
  TodoController.findTodoById)

// @Desc: Create a todo
// @Route: POST api/v1/todos/task/:id
// @Access: Private
todoRouter.post(
  "/task/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.validateName,
  TodoMiddleware.validateDescription,
  TaskMiddleware.checkTaskExists,
  TodoController.createTodo)

// @Desc: Update todo by ID
// @Route: PUT api/v1/todos/:id
// @Access: Private
todoRouter.put(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.validateName,
  TodoMiddleware.validateDescription,
  TodoMiddleware.validateTask,
  TodoMiddleware.checkTodoExists,
  TodoController.updateTodo)

// @Desc: Delete todo
// @Route: DELETE api/v1/todos/:id
// @Access: Private
todoRouter.delete(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.checkTodoExists,
  TodoController.deleteTodo)

// @Desc: Set todo isComplete propety to true
// @Route: PATCH api/v1/todos/:id/iscomplete
// @Access: Private
todoRouter.patch(
  "/:id/iscomplete",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.checkTodoExists,
  TodoController.setTodoAsComplete)

// @Desc: Set todo isComplete property to false
// @Route: PATCH api/v1/todos/:id/isnotcomplete
// @Access: Private
todoRouter.patch(
  "/:id/isnotcomplete",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.checkTodoExists,
  TodoController.setTodoAsNotComplete)

// @Desc: Clear all the complete todos from a task
// @Route: DELETE api/v1/todos/clearcomplete/task/:id
// @Access: Private
todoRouter.delete(
  "/clearcomplete/task/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TaskMiddleware.checkTaskExists,
  TodoController.clearCompleteTodos)

export default todoRouter
