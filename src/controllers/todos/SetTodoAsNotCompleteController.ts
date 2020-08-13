import { Request, Response } from "express"

import findTodoById from "../../services/todos/FindTodoByIdService"
import setTodoAsNotComplete from "../../services/todos/SetTodoAsNotCompleteService"

import {
  getSuccessResponse,
  getServerErrorResponse,
  getBadRequestResponse
} from "../../utils/controllers/Responses"

const setTodoAsNotCompleteController = async (req: Request, res: Response): Promise<Response> => {
  const todoId = req.params.id
  try {
    const todo = await findTodoById(todoId)
    if (!todo) {
      return getBadRequestResponse(res, "There is no todo that matches the passed id", { todoId })
    }
    const notCompletedTodo = await setTodoAsNotComplete(todoId)
    return getSuccessResponse(res, "Todo set as NOT complete", notCompletedTodo)
  } catch (err) {
    return getServerErrorResponse(res, "Error to set todo as NOT complete", err.message)
  }
}

export default setTodoAsNotCompleteController
