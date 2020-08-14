import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TaskMiddleware from "../../middlewares/TaskMiddleware"

import updateTaskController from "../../controllers/tasks/UpdateTaskController"

/**
 * @Desc: Update a task by its id
 * @Route: PUT api/v1/tasks/:id
 * @Access: Private
 */
const updateTaskRoute = (router: Router): Router => {
  router.put(
    "/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    TaskMiddleware.validateTaskName,
    updateTaskController
  )
  return router
}

export default updateTaskRoute
