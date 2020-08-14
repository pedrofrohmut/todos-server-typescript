import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"

import findAllUsersController from "../../controllers/users/FindAllUsersController"

/**
 * @Desc: Get all users no pagination
 * @Route: GET api/v1/users
 * @Access: Private
 */
const findAllUsersRoute = (router: Router): Router => {
  router.get(
    "/",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    findAllUsersController
  )
  return router
}

export default findAllUsersRoute
