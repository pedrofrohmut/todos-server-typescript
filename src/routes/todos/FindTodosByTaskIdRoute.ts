import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import FindTodosByTaskIdController from "../../controllers/todos/FindTodosByTaskIdController"

/**
 * @Desc: Find the todos that has the same task attribute
 * @Route: GET api/v1/todos/task/:id
 * @Access: Private
 */
const findTodoByTaskIdRoute = (router: Router): Router => {
  router.get(
    "/task/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    FindTodosByTaskIdController
  )
  return router
}

export default findTodoByTaskIdRoute
