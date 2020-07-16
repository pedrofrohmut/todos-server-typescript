import { Request, Response } from "express"

export const findTasks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Find Tasks")
}

export const findTaskById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Find Task By ID")
}

export const createTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Create Task")
}

export const updateTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Update Task")
}

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("delete task")
}
