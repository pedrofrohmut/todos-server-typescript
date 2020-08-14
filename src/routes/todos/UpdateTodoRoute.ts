import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TodoMiddleware from "../../middlewares/TodoMiddleware"

import updateTodoController from "../../controllers/todos/UpdateTodoController"

/**
 * @Desc: Update todo by id and props
 * @Route: PATCH api/v1/todos/:id
 * @Access: Private
 */
const updateTodoRoute = (router: Router): Router => {
  router.put(
    "/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    TodoMiddleware.validateName,
    TodoMiddleware.validateDescription,
    TodoMiddleware.validateTask,
    updateTodoController
  )
  return router
}

export default updateTodoRoute
