import { Router } from "express"

import {
  findTasks,
  findTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController"

const taskRouter = Router()

// @Desc: Get all tasks
// @Route: GET api/v1/tasks
// @Access: Private
taskRouter.get("/", findTasks)

// @Desc: Get task by ID
// @Route: GET api/v1/tasks/:id
// @Access: Private
taskRouter.get("/:id", findTaskById)

// @Desc: Create task
// @Route: POST api/v1/tasks
// @Access: Private
taskRouter.post("/", createTask)

// @Desc: Update task
// @Route: PUT api/v1/tasks/:id
// @Access: Private
taskRouter.put("/:id", updateTask)

// @Desc: Delete task
// @Route: DELETE api/v1/tasks/:id
// @Access: Private
taskRouter.delete("/:id", deleteTask)

export default taskRouter
