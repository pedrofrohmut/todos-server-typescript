import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import findTodoByIdController from "../../controllers/todos/FindTodoByIdController"

/**
 * @Desc: Find todo by its id
 * @Route: GET api/v1/todos/:id
 * @Access: Private
 */
const findTodoByIdRoute = (router: Router): Router => {
  router.get(
    "/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    findTodoByIdController
  )
  return router
}

export default findTodoByIdRoute
