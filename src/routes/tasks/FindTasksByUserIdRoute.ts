import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import findTasksByUserIdController from "../../controllers/tasks/FindTasksByUserIdController"

/**
 * @Desc: Get all the task from a user
 * @Route: GET api/v1/tasks/user/:id
 * @Access: Private
 */
const findTaskByUserIdRoute = (router: Router): Router => {
  router.get(
    "/user/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    findTasksByUserIdController
  )
  return router
}

export default findTaskByUserIdRoute
