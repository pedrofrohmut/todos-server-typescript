import { Router } from "express"

import TaskController from "../controllers/taskController"

const taskRouter = Router()

// @Desc: Get all tasks
// @Route: GET api/v1/tasks
// @Access: Private
taskRouter.get("/", TaskController.findTasks)

// @Desc: Get task by ID
// @Route: GET api/v1/tasks/:id
// @Access: Private
taskRouter.get("/:id", TaskController.findTaskById)

// @Desc: Create task
// @Route: POST api/v1/tasks
// @Access: Private
taskRouter.post("/", TaskController.createTask)

// @Desc: Update task
// @Route: PUT api/v1/tasks/:id
// @Access: Private
taskRouter.put("/:id", TaskController.updateTask)

// @Desc: Delete task
// @Route: DELETE api/v1/tasks/:id
// @Access: Private
taskRouter.delete("/:id", TaskController.deleteTask)

export default taskRouter
