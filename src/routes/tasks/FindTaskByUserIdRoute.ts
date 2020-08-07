import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import findTaskByUserIdController from "../../controllers/tasks/FindTaskByUserIdController"

const findTaskByUserIdRouter = Router()

/**
 * @Desc: Get all the task from a user
 * @Route: GET api/v1/tasks/user/:id
 * @Access: Private
 */
findTaskByUserIdRouter.get(
  "/user/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  UserMiddleware.checkUserExistsById,
  findTaskByUserIdController)

export default findTaskByUserIdRouter
