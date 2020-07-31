import { Router } from "express"

import TaskController from "../controllers/TaskController"
import * as MongooseMiddleware from "../middlewares/MongooseMiddleware"
import * as UserMiddleware from "../middlewares/UserMiddleware"
import * as TaskMiddleware from "../middlewares/TaskMiddleware"

const taskRouter = Router()

// @Desc: Get all tasks from a User
// @Route: GET api/v1/tasks/user/:id
// @Access: Private
taskRouter.get(
  "/user/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  UserMiddleware.checkUserExists,
  TaskController.findTasksByUserId)

// @Desc: Get task by ID
// @Route: GET api/v1/tasks/:id
// @Access: Private
taskRouter.get(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TaskMiddleware.checkTaskExists,
  TaskController.findTaskById)

// @Desc: Create task
// @Route: POST api/v1/tasks
// @Access: Private
taskRouter.post(
  "/user/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  UserMiddleware.checkUserExists,
  TaskMiddleware.validateTaskName,
  TaskController.createTask)

// @Desc: Update task
// @Route: PUT api/v1/tasks/:id
// @Access: Private
taskRouter.put(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TaskMiddleware.validateTaskName,
  TaskMiddleware.checkTaskExists,
  TaskController.updateTask)

// @Desc: Delete task
// @Route: DELETE api/v1/tasks/:id
// @Access: Private
taskRouter.delete(
  "/:id",
  UserMiddleware.verifyAuthenticationToken,
  UserMiddleware.validateUserFromToken,
  MongooseMiddleware.validateId,
  TaskMiddleware.checkTaskExists,
  TaskController.deleteTask)

export default taskRouter
