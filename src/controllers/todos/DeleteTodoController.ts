import { Request, Response } from "express"

import findTodoById from "../../services/todos/FindTodoByIdService"
import deleteTodo from "../../services/todos/DeleteTodoService"

import { getSuccessResponse, getServerErrorResponse, getBadRequestResponse } from "../../utils/controllers/Responses"

const deleteTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todoId = req.params.id
  try {
    const todo = await findTodoById(todoId)
    if (!todo) {
      return getBadRequestResponse(res, "There is no todo that matches the passed id", { todoId })
    }
    const deletedTodo = await deleteTodo(todoId)
    return getSuccessResponse(res, "Todo deleted", deletedTodo)
  } catch (err) {
    return getServerErrorResponse(res, "Error to delete a todo", err.message)
  }
}

export default deleteTodoController
