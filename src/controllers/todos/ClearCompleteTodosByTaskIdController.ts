import { Request, Response } from "express"

import findTaskById from "../../services/tasks/FindTaskByIdService"
import clearCompleteTodosByTaskId from "../../services/todos/ClearCompleteTodosByTaskIdService"

import {
  getServerErrorResponse,
  getSuccessResponse,
  getBadRequestResponse
} from "../../utils/controllers/Responses"

const clearCompleteTodosByTaskIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const taskId = req.params.id
  try {
    const task = await findTaskById(taskId)
    if (!task) {
      return getBadRequestResponse(res, "There is no task that matches the passed id", { taskId })
    }
    const completeTodos = await clearCompleteTodosByTaskId(taskId)
    return getSuccessResponse(res, "Complete todos cleared from the task", completeTodos)
  } catch (err) {
    return getServerErrorResponse(res, "Error to clear complete todos by task id", err.message)
  }
}

export default clearCompleteTodosByTaskIdController
