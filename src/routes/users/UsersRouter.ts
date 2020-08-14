import { Router } from "express"

import authenticateUserRoute from "./AuthenticateUserRoute"
import createUserRoute from "./CreateUserRoute"
import findAllUsersRoute from "./FindAllUsersRoute"
import loginUserRoute from "./LoginUserRoute"

const usersRouter = Router()

authenticateUserRoute(usersRouter)
createUserRoute(usersRouter)
findAllUsersRoute(usersRouter)
loginUserRoute(usersRouter)

export default usersRouter
