import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import deleteTodoController from "../../controllers/todos/DeleteTodoController"

/**
 * @Desc: Delete a todo by its id
 * @Route: DELETE api/v1/todos/:id
 * @Access: Private
 */
const deleteTodoRoute = (router: Router): Router => {
  router.delete(
    "/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    deleteTodoController
  )
  return router
}

export default deleteTodoRoute
