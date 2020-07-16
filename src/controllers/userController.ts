import { Request, Response } from "express"

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Create User")
}

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Log In User")
}

export const authenticateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Authenticate User")
}
