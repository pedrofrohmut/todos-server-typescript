import { Request, Response } from "express"

import findTaskById from "../../services/tasks/FindTaskByIdService"
import createTodo from "../../services/todos/CreateTodoService"

import { getServerErrorResponse, getSuccessResponse, getBadRequestResponse } from "../../utils/controllers/Responses"

const createTodoController = async (req: Request, res: Response): Promise<Response> => {
  const taskId = req.params.id
  const { name, description } = req.body
  try {
    const task = await findTaskById(taskId)
    if (!task) {
      return getBadRequestResponse(res, "There is no task that matches the passed id", { taskId })
    }
    const createdTodo = await createTodo({ name, description, task: taskId })
    return getSuccessResponse(res, "Todo created", createdTodo)
  } catch (err) {
    return getServerErrorResponse(res, "Error to create a todo", err.message)
  }
}

export default createTodoController
