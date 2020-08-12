import { Request, Response } from "express"

import setTodoAsComplete from "../../services/todos/SetTodoAsCompleteService"
import { getSuccessResponse, getServerErrorResponse } from "../../utils/controllers/Responses"

const setTodoAsCompleteController = async (req: Request, res: Response): Promise<Response> => {
  const todoId = req.params.id
  try {
    const completedTodo = await setTodoAsComplete(todoId)
    return getSuccessResponse(res, "Todo set as complete", completedTodo)
  } catch (err) {
    return getServerErrorResponse(res, "Error to set todo as complete", err.message)
  }
}

export default setTodoAsCompleteController
