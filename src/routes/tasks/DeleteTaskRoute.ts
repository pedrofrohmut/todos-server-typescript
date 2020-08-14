import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"

import deleteTaskController from "../../controllers/tasks/DeleteTaskController"

/**
 * @Desc: Delete a task by its id
 * @Route: DELETE api/v1/tasks/:id
 * @Access: Private
 */
const deleteTaskRoute = (router: Router): Router => {
  router.delete(
    "/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    deleteTaskController
  )
  return router
}

export default deleteTaskRoute
