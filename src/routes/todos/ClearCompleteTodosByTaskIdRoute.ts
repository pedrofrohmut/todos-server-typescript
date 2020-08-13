import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import clearCompleteTodosByTaskIdController from "../../controllers/todos/ClearCompleteTodosByTaskIdController"

const clearCompleteTodosRouter = Router()

clearCompleteTodosRouter.delete(
  "/clearcomplete/task/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  clearCompleteTodosByTaskIdController)

export default clearCompleteTodosRouter
