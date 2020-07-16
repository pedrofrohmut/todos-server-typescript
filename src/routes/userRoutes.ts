import express from "express"

import { createUser, loginUser, authenticateUser } from "../controllers/userController"

const userRouter = express.Router()

// @Desc: Register new user
// @Route: POST api/v1/users
// @Access: Public
userRouter.post("/", createUser)

// @Desc: Log in user
// @Route: POST api/v1/users/login
// @Access: Public
userRouter.post("/login", loginUser)

// @Desc: Authenticate user
// @Route: GET api/v1/users/authenticate
// @Access: Private
userRouter.get("/authenticate", authenticateUser)

export default userRouter
