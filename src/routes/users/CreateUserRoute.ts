import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"

import createUserController from "../../controllers/users/CreateUserController"

/**
 * @Desc: Create a new user
 * @Route: POST api/v1/users
 * @Access: Public
 */
const createUserRoute = (router: Router): Router => {
  router.post(
    "/",
    UserMiddleware.validateEmail,
    UserMiddleware.validateFirstName,
    UserMiddleware.validateLastName,
    UserMiddleware.validatePassword,
    createUserController
  )
  return router
}

export default createUserRoute
