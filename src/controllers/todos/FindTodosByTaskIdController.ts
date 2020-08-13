import { Request, Response } from "express"

import findTaskById from "../../services/tasks/FindTaskByIdService"
import findTodosByTaskId from "../../services/todos/FindTodosByTaskIdService"

import {
  getServerErrorResponse,
  getSuccessResponse,
  getBadRequestResponse
} from "../../utils/controllers/Responses"

const FindTodosByTaskIdController = async (req: Request, res: Response): Promise<Response> => {
  const taskId = req.params.id
  try {
    const task = await findTaskById(taskId)
    if (!task) {
      return getBadRequestResponse(res, "There is no task that matches the passed id", { taskId })
    }
    const todos = await findTodosByTaskId(taskId)
    return getSuccessResponse(res, "Todos found for this task", { todos, count: todos.length })
  } catch (err) {
    return getServerErrorResponse(res, "Error to find todos by task id", err.message)
  }
}

export default FindTodosByTaskIdController
