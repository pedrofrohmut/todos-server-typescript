import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import setTodoAsNotCompleteController from "../../controllers/todos/SetTodoAsNotCompleteController"

/**
 * @Desc: Patch a todo isComplete to false
 * @Route: PATCH api/v1/todos/:id/isnotcomplete
 * @Access: Private
 */
const setTodoAsNotCompleteRoute = (router: Router): Router => {
  router.patch(
    "/:id/isnotcomplete",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    setTodoAsNotCompleteController
  )
  return router
}

export default setTodoAsNotCompleteRoute
