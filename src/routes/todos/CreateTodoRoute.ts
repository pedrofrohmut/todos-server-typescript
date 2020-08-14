import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TodoMiddleware from "../../middlewares/TodoMiddleware"

import createTodoController from "../../controllers/todos/CreateTodoController"

/**
 * @Desc: Create a todo with todo content and a reference task
 * @Route: POST api/v1/todos/task/:id
 * @Access: Private
 */
const createTodoRoute = (router: Router): Router => {
  router.post(
    "/task/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    TodoMiddleware.validateName,
    TodoMiddleware.validateDescription,
    createTodoController
  )
  return router
}

export default createTodoRoute
