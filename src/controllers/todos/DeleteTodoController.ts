import { Request, Response } from "express"

import deleteTodo from "../../services/todos/DeleteTodoService"
import { getSuccessResponse, getServerErrorResponse } from "../../utils/controllers/Responses"

const deleteTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todoId = req.params.id
  try {
    const deletedTodo = await deleteTodo(todoId)
    return getSuccessResponse(res, "Todo deleted", deletedTodo)
  } catch (err) {
    return getServerErrorResponse(res, "Error to delete a todo", err.message)
  }
}

export default deleteTodoController
