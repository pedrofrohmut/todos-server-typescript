import { Router } from "express"

import * as UserMiddleware from "../../middlewares/UserMiddleware"

import findAllUsersController from "../../controllers/users/FindAllUsersController"

const findAllUsersRouter = Router()

/**
 * @Desc: Get all users no pagination
 * @Route: GET api/v1/users
 * @Access: Private
 */
findAllUsersRouter.get(
  "/",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  findAllUsersController)

export default findAllUsersRouter
