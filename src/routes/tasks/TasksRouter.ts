import { Router } from "express"

import createTaskRoute from "./CreateTaskRoute"
import deleteTaskRoute from "./DeleteTaskRoute"
import findTaskByIdRoute from "./FindTaskByIdRoute"
import findTaskByUserIdRoute from "./FindTasksByUserIdRoute"
import updateTaskRoute from "./UpdateTaskRoute"

const tasksRouter = Router()

createTaskRoute(tasksRouter)
deleteTaskRoute(tasksRouter)
findTaskByIdRoute(tasksRouter)
findTaskByUserIdRoute(tasksRouter)
updateTaskRoute(tasksRouter)

export default tasksRouter
