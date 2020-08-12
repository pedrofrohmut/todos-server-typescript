import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TaskMiddleware from "../../middlewares/TaskMiddleware"

import FindTodosByTaskIdController from "../../controllers/todos/FindTodosByTaskIdController"

const findTodosByTaskIdRouter = Router()

/**
 * @Desc: Find the todos that has the same task attribute
 * @Route: GET api/v1/todos/task/:id
 * @Access: Private
 */
findTodosByTaskIdRouter.get(
  "/task/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TaskMiddleware.checkTaskExists,
  FindTodosByTaskIdController)


export default findTodosByTaskIdRouter
