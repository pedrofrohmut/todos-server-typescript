import express from "express"

import UserController from "../controllers/UserController"
import * as UserMiddleware from "../middlewares/UserMiddleware"

const userRouter = express.Router()

// @Desc: Get all users
// @Route: GET api/v1/users
// @Access: Private
userRouter.get(
  "/",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  UserController.findUsers)

// @Desc: Register new user
// @Route: POST api/v1/users
// @Access: Public
userRouter.post(
  "/",
  UserController.createUser)

// @Desc: Log in user
// @Route: POST api/v1/users/login
// @Access: Public
userRouter.post(
  "/login",
  UserController.loginUser)

// @Desc: Authenticate user
// @Route: GET api/v1/users/authenticate
// @Access: Private
userRouter.get(
  "/authenticate",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  UserController.authenticateUser)

export default userRouter
