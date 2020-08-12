import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import deleteTaskController from "../../controllers/tasks/DeleteTaskController"

const deleteTaskRouter = Router()

/**
 * @Desc: Delete a task by its id
 * @Route: DELETE api/v1/tasks/:id
 * @Access: Private
 */
deleteTaskRouter.delete(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  deleteTaskController)

export default deleteTaskRouter
