import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import findTaskByIdController from "../../controllers/tasks/FindTaskByIdController"

/**
 * @Desc: Get a task by its id
 * @Route: GET api/v1/tasks/:id
 * @Access: Private
 */
const findTaskByIdRoute = (router: Router): Router => {
  console.log("TASK ID ROUTE")
  router.get(
    "/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    findTaskByIdController
  )
  return router
}

export default findTaskByIdRoute
