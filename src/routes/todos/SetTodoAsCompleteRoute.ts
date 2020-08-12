import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TodoMiddleware from "../../middlewares/TodoMiddleware"

import setTodoAsCompleteController from "../../controllers/todos/SetTodoAsCompleteController"

const setTodoAsCompleteRouter = Router()

/**
 * @Desc: Patch a todo isComplete status to true
 * @Route: PATCH api/v1/:id/iscomplete
 * @Access: Private
 */
setTodoAsCompleteRouter.patch(
  "/:id/iscomplete",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.checkTodoExists,
  setTodoAsCompleteController)

export default setTodoAsCompleteRouter
