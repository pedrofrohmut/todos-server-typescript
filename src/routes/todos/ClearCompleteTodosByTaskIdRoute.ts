import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import clearCompleteTodosByTaskIdController from "../../controllers/todos/ClearCompleteTodosByTaskIdController"

/**
 * @Desc: Clear all todos from this task that has property isComplete set as true
 * @Route: DELETE api/v1/todos/clearcomplete/task/:id
 * @Access: Private
 */
const clearCompleteTodosByTaskIdRoute = (router: Router): Router => {
  router.delete(
    "/clearcomplete/task/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    clearCompleteTodosByTaskIdController
  )
  return router
}

export default clearCompleteTodosByTaskIdRoute
