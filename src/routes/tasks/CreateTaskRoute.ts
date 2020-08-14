import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"
import * as MongooseMiddleware from "../../middlewares/MongooseMiddleware"
import * as TaskMiddleware from "../../middlewares/TaskMiddleware"

import createTaskController from "../../controllers/tasks/CreateTaskController"

/**
 * @Desc: Create a new task for an user
 * @Route: POST api/v1/tasks
 * @Access: Private
 */
const createTaskRoute = (router: Router): Router => {
  router.post(
    "/user/:id",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    MongooseMiddleware.validateId,
    TaskMiddleware.validateTaskName,
    createTaskController
  )
  return router
}

export default createTaskRoute
