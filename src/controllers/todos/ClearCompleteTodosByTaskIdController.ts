import { Request, Response } from "express"

import clearCompleteTodosByTaskId from "../../services/todos/ClearCompleteTodosByTaskIdService"
import {getServerErrorResponse, getSuccessResponse} from "../../utils/controllers/Responses"

const clearCompleteTodosByTaskIdController = async (req: Request, res: Response): Promise<Response> => {
  const taskId = req.params.id
  try {
    const completeTodos = await clearCompleteTodosByTaskId(taskId)
    return getSuccessResponse(res, "Complete todos cleared from the task", completeTodos)
  } catch (err) {
    return getServerErrorResponse(res, "Error to clear complete todos by task id", err.message)
  }
}

export default clearCompleteTodosByTaskIdController
