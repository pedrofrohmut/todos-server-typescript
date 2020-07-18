import { Request, Response } from "express"

import TaskSchema from "../models/TaskModel"

class TaskController {
  public async findTasks(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await TaskSchema.find()
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
    return res.send("Find Task By ID")
  }

  public async createTask(req: Request, res: Response): Promise<Response> {
    return res.send("create task")
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    return res.send("Update Task")
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    return res.send("delete task")
  }
}

export default new TaskController()
