import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"

import loginUserController from "../../controllers/users/LoginUserController"

const loginUserRouter = Router()

/**
 * @Desc: Log in user with e-mail and password. Returns a authentication Token
 * @Route: POST api/v1/users/login
 * @Access: Public
 */
loginUserRouter.post(
  "/login",
  UserMiddleware.validateEmail,
  UserMiddleware.validatePassword,
  loginUserController)

export default loginUserRouter
