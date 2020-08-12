import { Request, Response } from "express"

import findTaskById from "../../services/tasks/FindTaskByIdService"
import deleteTask from "../../services/tasks/DeleteTaskService"

import {
  getServerErrorResponse,
  getSuccessResponse,
  getBadRequestResponse
} from "../../utils/controllers/Responses"

const deleteTaskController = async (req: Request, res: Response): Promise<Response> => {
  const taskId = req.params.id
  try {
    const task = await findTaskById(taskId)
    if (!task) {
      return getBadRequestResponse(res, "There is no task that matches the passed id", { taskId })
    }
    const deletedTask = await deleteTask(taskId)
    return getSuccessResponse(res, "Task deleted", deletedTask)
  } catch (err) {
    return getServerErrorResponse(res, "Error to delete a task", err.message)
  }
}

export default deleteTaskController
