import { Request, Response } from "express"

import setTodoAsNotComplete from "../../services/todos/SetTodosAsNotCompleteService"
import { getSuccessResponse, getServerErrorResponse } from "../../utils/controllers/Responses"

const setTodoAsNotCompleteController = async (req: Request, res: Response): Promise<Response> => {
  const todoId = req.params.id
  try {
    const notCompletedTodo = await setTodoAsNotComplete(todoId)
    return getSuccessResponse(res, "Todo set as NOT complete", notCompletedTodo)
  } catch (err) {
    return getServerErrorResponse(res, "Error to set todo as NOT complete", err.message)
  }
}

export default setTodoAsNotCompleteController
