import { Request, Response } from "express"
import mongoose from "mongoose"

import TaskSchema from "../models/TaskModel"
import UserSchema from "../models/UserModel"

class TaskController {
  public async findTasksByUserId(req: Request, res: Response): Promise<Response> {
    const userId: string = req.params.id
    if (!userId || userId === "") {
      return res.status(400).json({
        success: false,
        message: "Bad Request: User ID is blank or undefined"
      })
    }
    const isValidUserId: boolean = mongoose.Types.ObjectId.isValid(userId)
    if (!isValidUserId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: User ID is not valid",
        data: { userId }
      })
    }
    try {
      const user = await UserSchema.findById(userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no User found with the passed ID",
          data: { userId }
        })
      }
      const tasks = await TaskSchema.find({ user: userId })
      return res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to get all Tasks: " + err.message
      })
    }
  }

  public async findTaskById(req: Request, res: Response): Promise<Response> {
    const taskId: string = req.params.id
    if (!taskId || taskId === "") {
      return res.status(400).json({
        success: false,
        message: "Bad Request: empty or blank ID"
      })
    }
    const isValidId = mongoose.Types.ObjectId.isValid(taskId)
    if (!isValidId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: Invalid Task ID",
        data: { taskId }
      })
    }
    try {
      const task = await TaskSchema.findById(taskId)
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Task found with the passed ID",
          data: { taskId }
        })
      }
      return res.status(200).json({
        success: true,
        message: "Success: task found",
        data: { task }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to find Task by ID: " + err.message
      })
    }
  }

  public async createTask(req: Request, res: Response): Promise<Response> {
    const { userId, name } = req.body
    if (!userId || userId === "" || !name || name === "") {
      return res.status(400).json({
        success: false,
        message: "Bad Request: userId and/or task name is blank or undefined",
        data: {
          userId,
          name
        }
      })
    }
    const isValidUserId = mongoose.Types.ObjectId.isValid(userId)
    if (!isValidUserId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: the User ID passed is not valid",
        data: { userId }
      })
    }
    try {
      const user = await UserSchema.findById(userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no user found with the passed ID"
        })
      }
      const createdTask = await TaskSchema.create({ name, user: userId })
      return res.status(200).json({
        success: true,
        message: "Success: task created",
        data: {
          createdTask
        }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to create a Task: " + err.message
      })
    }
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    const taskId = req.params.id
    const isValidTaskId = taskId && mongoose.Types.ObjectId.isValid(taskId)
    if (!isValidTaskId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: the Task ID passed is blank, undefined or invalid",
        data: { taskId }
      })
    }
    const taskName = req.body.name
    if (!taskName || taskName === "") {
      return res.status(400).json({
        success: false,
        message: "Bad Request: the Task name is blank or undefined"
      })
    }
    try {
      const taskToUpdate = await TaskSchema.findById(taskId)
      if (!taskToUpdate) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no task found with the passed ID",
          data: { taskId }
        })
      }
      await taskToUpdate.updateOne({ name: taskName })
      const beforeChanges = { id: taskId, name: taskToUpdate.name }
      const afterChanges = { id: taskId, name: taskName }
      return res.status(200).json({
        success: true,
        message: "Success: Task updated",
        data: {
          beforeChanges,
          afterChanges
        }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to update a Task: " + err.message
      })
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    const taskId = req.params.id
    if (!taskId || taskId === "") {
      return res.status(400).json({
        success: false,
        message: "Bad Request: the Task ID passed is blank or undefined"
      })
    }
    const isValidTaskId = mongoose.Types.ObjectId.isValid(taskId)
    if (!isValidTaskId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: the Task ID passed in not valid",
        data: { taskId }
      })
    }
    try {
      const taskToDelete = await TaskSchema.findById(taskId)
      if (!taskToDelete) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no task found with thew passed ID",
          data: { taskId }
        })
      }
      await TaskSchema.deleteOne(taskToDelete)
      return res.status(200).json({
        success: true,
        message: "Success: Task deleted",
        data: { task: taskToDelete }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to delete a Task: " + err.message
      })
    }
  }
}

export default new TaskController()
