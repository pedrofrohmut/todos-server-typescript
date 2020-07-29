import { Router } from "express"

import { validateId } from "../middlewares/Validation"
import TaskController from "../controllers/TaskController"

const taskRouter = Router()

// @Desc: Get all tasks from a User
// @Route: GET api/v1/tasks/user/:id
// @Access: Private
taskRouter.get("/user/:id", validateId, TaskController.findTasksByUserId)

// @Desc: Get task by ID
// @Route: GET api/v1/tasks/:id
// @Access: Private
taskRouter.get("/:id", validateId, TaskController.findTaskById)

// @Desc: Create task
// @Route: POST api/v1/tasks
// @Access: Private
taskRouter.post("/user/:id", validateId, TaskController.createTask)

// @Desc: Update task
// @Route: PUT api/v1/tasks/:id
// @Access: Private
taskRouter.put("/:id", validateId, TaskController.updateTask)

// @Desc: Delete task
// @Route: DELETE api/v1/tasks/:id
// @Access: Private
taskRouter.delete("/:id", validateId, TaskController.deleteTask)

export default taskRouter
