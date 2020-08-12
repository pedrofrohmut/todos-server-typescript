import { Request, Response } from "express"

import createTodo from "../../services/todos/CreateTodoService"
import { getServerErrorResponse, getSuccessResponse } from "../../utils/controllers/Responses"

const createTodoController = async (req: Request, res: Response): Promise<Response> => {
  const taskId = req.params.id
  const { name, description } = req.body
  try {
    // TODO: check task exists
    const createdTodo = await createTodo({ name, description, task: taskId })
    return getSuccessResponse(res, "Todo created", createdTodo)
  } catch (err) {
    return getServerErrorResponse(res, "Error to create a todo", err.message)
  }
}

export default createTodoController
