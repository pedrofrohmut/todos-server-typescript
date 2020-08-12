import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TodoMiddleware from "../../middlewares/TodoMiddleware"

import updateTodoController from "../../controllers/todos/UpdateTodoController"

const updateTodoRouter = Router()

updateTodoRouter.put(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TodoMiddleware.validateName,
  TodoMiddleware.validateDescription,
  TodoMiddleware.validateTask,
  TodoMiddleware.checkTodoExists,
  updateTodoController)

export default updateTodoRouter
