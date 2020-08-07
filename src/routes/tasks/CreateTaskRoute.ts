import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TaskMiddleware from "../../middlewares/TaskMiddleware"

import createTaskController from "../../controllers/tasks/CreateTaskController"

const createTaskRouter = Router()

/**
 * @Desc: Create a new task for an user
 * @Route: POST api/v1/tasks
 * @Access: Private
 */
createTaskRouter.post(
  "/user/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  UserMiddleware.checkUserExistsById,
  TaskMiddleware.validateTaskName,
  createTaskController)

export default createTaskRouter
