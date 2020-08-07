import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import findTasksByUserIdController from "../../controllers/tasks/FindTasksByUserIdController"

const findTasksByUserIdRouter = Router()

/**
 * @Desc: Get all the task from a user
 * @Route: GET api/v1/tasks/user/:id
 * @Access: Private
 */
findTasksByUserIdRouter.get(
  "/user/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  UserMiddleware.checkUserExistsById,
  findTasksByUserIdController)

export default findTasksByUserIdRouter
