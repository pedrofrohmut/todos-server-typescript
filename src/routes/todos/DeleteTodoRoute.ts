import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TodoMiddleware from "../../middlewares/TodoMiddleware"

import deleteTodoController from "../../controllers/todos/DeleteTodoController"

const deleteTodoRouter = Router()

/**
 * @Desc: Delete a todo by its id
 * @Route: DELETE api/v1/todos/:id
 * @Access: Private
 */
deleteTodoRouter.delete(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.checkTodoExists,
  deleteTodoController)

export default deleteTodoRouter
