import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"

import createUserController from "../../controllers/users/CreateUserController"

const createUserRouter = Router()

/**
 * @Desc: Create a new user
 * @Route: POST api/v1/users
 * @Access: Public
 */
createUserRouter.post(
  "/",
  UserMiddleware.validateEmail,
  UserMiddleware.validateFirstName,
  UserMiddleware.validateLastName,
  UserMiddleware.validatePassword,
  createUserController)

export default createUserRouter
