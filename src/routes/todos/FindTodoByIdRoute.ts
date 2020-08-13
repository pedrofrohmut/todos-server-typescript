import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import findTodoByIdController from "../../controllers/todos/FindTodoByIdController"

const findTodoByIdRouter = Router()

/**
 * @Desc: Find todo by its id
 * @Route: GET api/v1/todos/:id
 * @Access: Private
 */
findTodoByIdRouter.get(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  findTodoByIdController)

export default findTodoByIdRouter
