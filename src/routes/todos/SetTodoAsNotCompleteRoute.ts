import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TodoMiddleware from "../../middlewares/TodoMiddleware"

import setTodoAsNotCompleteController from "../../controllers/todos/SetTodoAsNotCompleteController"

const setTodoAsNotCompleteRouter = Router()

/**
 * @Desc: Patch a todo isComplete to false
 * @Route: PATCH api/v1/todos/:id/isnotcomplete
 * @Access: Private
 */
setTodoAsNotCompleteRouter.patch(
  "/:id/isnotcomplete",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.checkTodoExists,
  setTodoAsNotCompleteController)

export default setTodoAsNotCompleteRouter
