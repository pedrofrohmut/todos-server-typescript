import { Request, Response } from "express"

class TaskController {
  public async findTasks(req: Request, res: Response): Promise<Response> {
    return res.send("Find Tasks")
  }

  public async findTaskById(req: Request, res: Response): Promise<Response> {
    return res.send("Find Task By ID")
  }

  public async createTask(req: Request, res: Response): Promise<Response> {
    return res.send("Create Task")
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    return res.send("Update Task")
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    return res.send("delete task")
  }
}

export default new TaskController()
