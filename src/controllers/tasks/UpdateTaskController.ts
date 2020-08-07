import { Request, Response } from "express"

import findTaskById from "../../services/tasks/FindTaskByIdService"
import updateTask from "../../services/tasks/UpdateTaskService"
import { getServerErrorResponse, getSuccessResponse } from "../../utils/controllers/Responses"

const updateTaskController = async (req: Request, res: Response): Promise<Response> => {
  const taskId = req.params.id
  const taskName = req.body.name
  // TODO: validate id and name
  try {
    const beforeChanges = await findTaskById(taskId)
    const afterChanges = await updateTask({ id: taskId, name: taskName })
    return getSuccessResponse(res, "Task updated", { beforeChanges, afterChanges })
  } catch (err) {
    return getServerErrorResponse(res, "Error to update a task", err.message)
  }
}

export default updateTaskController
