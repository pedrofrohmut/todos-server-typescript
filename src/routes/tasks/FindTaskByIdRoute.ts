import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TaskMiddleware from "../../middlewares/TaskMiddleware"

import findTaskByIdController from "../../controllers/tasks/FindTaskByIdController"

const findTaskByIdRouter = Router()

/**
 * @Desc: Get a task by its id
 * @Route: GET api/v1/tasks/:id
 * @Access: Private
 */
findTaskByIdRouter.get(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TaskMiddleware.checkTaskExists,
  findTaskByIdController)

export default findTaskByIdRouter
