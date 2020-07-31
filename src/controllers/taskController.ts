import { Request, Response } from "express"

import TaskSchema from "../models/TaskModel"

class TaskController {
  public async findTasksByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await TaskSchema.find({ user: req.params.id })
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
    try {
      const task = await TaskSchema.findById(req.params.id)
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
    try {
      const createdTask = await TaskSchema.create({ name: req.body.name, user: req.params.id })
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
    try {
      await TaskSchema.updateOne({ _id: req.params.id }, { name: req.body.name })
      return res.status(200).json({
        success: true,
        message: "Success: Task updated"
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to update a Task: " + err.message
      })
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    try {
      await TaskSchema.deleteOne({ _id: req.params.id })
      return res.status(200).json({
        success: true,
        message: "Success: Task deleted"
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
