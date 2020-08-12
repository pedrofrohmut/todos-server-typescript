import { Request, Response } from "express"

import findTodoById from "../../services/todos/FindTodoByIdService"
import { getSuccessResponse, getServerErrorResponse } from "../../utils/controllers/Responses"

const findTodoByIdController = async (req: Request, res: Response): Promise<Response> => {
  const todoId = req.params.id
  try {
    const todoFound = await findTodoById(todoId)
    return getSuccessResponse(res, "Todo found", todoFound)
  } catch (err) {
    return getServerErrorResponse(res, "Error to find to by id", err.message)
  }
}

export default findTodoByIdController
