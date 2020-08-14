import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"

import authenticateUserController from "../../controllers/users/AuthenticateUserController"

/**
 * @Desc: Authenticate user from Request Header Auth-Token
 * @Route: GET api/v1/users/authenticate
 * @Access: Private
 */
const authenticateUserRoute = (router: Router): Router => {
  router.get(
    "/authenticate",
    UserMiddleware.verifyAuthenticationToken,
    UserMiddleware.validateUserFromToken,
    authenticateUserController
  )
  return router
}

export default authenticateUserRoute
