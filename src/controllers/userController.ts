import { Request, Response } from "express"

class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    return res.send("Create User")
  }

  public async loginUser(req: Request, res: Response): Promise<Response> {
    return res.send("Log In User")
  }

  public async authenticateUser(req: Request, res: Response): Promise<Response> {
    return res.send("Authenticate User")
  }
}

export default new UserController()
