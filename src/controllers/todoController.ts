import { Request, Response } from "express"

export const findTodoByTaskId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Find Todo By Task ID")
}

export const findTodoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Find Todo By ID")
}

export const createTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("Create todo")
}

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("update todo")
}

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("delete todo")
}

export const setTodoAsComplete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("set todo as complete")
}

export const setTodoAsNotComplete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("set todo as NOT complete")
}

export const clearCompleteTodos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.send("clear complete todos")
}
