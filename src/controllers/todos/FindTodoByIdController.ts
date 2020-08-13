import { Request, Response } from "express"

import findTodoById from "../../services/todos/FindTodoByIdService"

import {
  getSuccessResponse,
  getNotFoundResponse,
  getServerErrorResponse
} from "../../utils/controllers/Responses"

const findTodoByIdController = async (req: Request, res: Response): Promise<Response> => {
  const todoId = req.params.id
  try {
    const todo = await findTodoById(todoId)
    if (!todo) {
      return getNotFoundResponse(res, "Todo not found with the passed id", { todoId })
    }
    return getSuccessResponse(res, "Todo found", todo)
  } catch (err) {
    return getServerErrorResponse(res, "Error to find to by id", err.message)
  }
}

export default findTodoByIdController
