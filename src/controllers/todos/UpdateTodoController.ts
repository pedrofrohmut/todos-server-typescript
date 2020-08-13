import { Request, Response } from "express"

import findTodoById from "../../services/todos/FindTodoByIdService"
import updateTodo from "../../services/todos/UpdateTodoService"

import {
  getServerErrorResponse,
  getSuccessResponse,
  getBadRequestResponse
} from "../../utils/controllers/Responses"

const updateTodoController = async (req: Request, res: Response): Promise<Response> => {
  const todoId = req.params.id
  const { name, description } = req.body
  try {
    const todo = await findTodoById(todoId)
    if (!todo) {
      return getBadRequestResponse(res, "There is no todo that matches the passed id", { todoId })
    }
    const beforeChanges = todo
    const afterChanges = await updateTodo({ id: todoId, name, description })
    return getSuccessResponse(res, "Todo updated", { beforeChanges, afterChanges })
  } catch (err) {
    return getServerErrorResponse(res, "Error to update a todo", err.message)
  }
}

export default updateTodoController
