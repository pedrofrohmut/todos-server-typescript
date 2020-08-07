import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"

import authenticateUserController from "../../controllers/users/AuthenticateUserController"

const authenticateUserRouter = Router()

/**
 * @Desc: Authenticate user from Request Header Auth-Token
 * @Route: GET api/v1/users/authenticate
 * @Access: Private
 */
authenticateUserRouter.get(
  "/authenticate",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  authenticateUserController)

export default authenticateUserRouter
