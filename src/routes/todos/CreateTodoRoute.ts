import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TaskMiddleware from "../../middlewares/TaskMiddleware"
import * as TodoMiddleware from "../../middlewares/TodoMiddleware"

import createTodoController from "../../controllers/todos/CreateTodoController"

const createTodoRouter = Router()

/**
 * @Desc: Create a todo with todo content and a reference task
 * @Route: POST api/v1/todos/task/:id
 * @Access: Private
 */
createTodoRouter.post(
  "/task/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.validateName,
  TodoMiddleware.validateDescription,
  TaskMiddleware.checkTaskExists,
  createTodoController)

export default createTodoRouter
