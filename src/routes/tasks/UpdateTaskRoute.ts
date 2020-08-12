import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TaskMiddleware from "../../middlewares/TaskMiddleware"

import updateTaskController from "../../controllers/tasks/UpdateTaskController"

const updateTaskRouter = Router()

/**
 * @Desc: Update a task by its id
 * @Route: PUT api/v1/tasks/:id
 * @Access: Private
 */
updateTaskRouter.put(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TaskMiddleware.validateTaskName,
  updateTaskController)

export default updateTaskRouter
