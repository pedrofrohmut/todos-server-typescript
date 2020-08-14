import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"

import loginUserController from "../../controllers/users/LoginUserController"

/**
 * @Desc: Log in user with e-mail and password. Returns a authentication Token
 * @Route: POST api/v1/users/login
 * @Access: Public
 */
const loginUserRoute = (router: Router): Router => {
  router.post(
    "/login",
    UserMiddleware.validateEmail,
    UserMiddleware.validatePassword,
    loginUserController
  )
  return router
}

export default loginUserRoute
