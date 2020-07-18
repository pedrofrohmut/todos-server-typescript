import { Request, Response } from "express"

class TodoController {
  public async findTodoByTaskId(req: Request, res: Response): Promise<Response> {
    return res.send("Find Todo By Task ID")
  }

  public async findTodoById(req: Request, res: Response): Promise<Response> {
    return res.send("Find Todo By ID")
  }

  public async createTodo(req: Request, res: Response): Promise<Response> {
    return res.send("Create todo")
  }

  public async updateTodo(req: Request, res: Response): Promise<Response> {
    return res.send("update todo")
  }

  public async deleteTodo(req: Request, res: Response): Promise<Response> {
    return res.send("delete todo")
  }

  public async setTodoAsComplete(req: Request, res: Response): Promise<Response> {
    return res.send("set todo as complete")
  }

  public async setTodoAsNotComplete(req: Request, res: Response): Promise<Response> {
    return res.send("set todo as NOT complete")
  }

  public async clearCompleteTodos(req: Request, res: Response): Promise<Response> {
    return res.send("clear complete todos")
  }
}

export default new TodoController()
