import { Request, Response } from "express"

import updateTodo from "../../services/todos/UpdateTodoService"
import {getServerErrorResponse, getSuccessResponse} from "../../utils/controllers/Responses"

const updateTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todoId = req.params.id
  const { name, description } = req.body
  try {
    const updatedTodo = await updateTodo({ id: todoId, name, description })
    return getSuccessResponse(res, "Todo updated", updatedTodo)
  } catch (err) {
    return getServerErrorResponse(res, "Error to update a todo", err.message)
  }
}

export default updateTodoController

