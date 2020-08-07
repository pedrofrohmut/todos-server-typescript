import { Request, Response } from "express"

import deleteTask from "../../services/tasks/DeleteTaskService"
import { getServerErrorResponse, getSuccessResponse } from "../../utils/controllers/Responses"

const deleteTaskController = async (req: Request, res: Response): Promise<Response> => {
  const taskId = req.params.id
  try {
    const deletedTask = await deleteTask(taskId)
    return getSuccessResponse(res, "Task deleted", deletedTask)
  } catch (err) {
    return getServerErrorResponse(res, "Error to delete a task", err.message)
  }
}

export default deleteTaskController
