import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

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
  setTodoAsCompleteController)

export default setTodoAsCompleteRouter
