import { Request, Response } from "express"

import findTaskById from "../../services/tasks/FindTaskByIdService"
import { getSuccessResponse, getServerErrorResponse } from "../../utils/controllers/Responses"

const findTaskByIdController = async (req: Request, res: Response): Promise<Response> => {
  const taskId = req.params.id
  try {
    const task = await findTaskById(taskId)
    return getSuccessResponse(res, "Task found", task)
  } catch (err) {
    return getServerErrorResponse(res, "Error to find task by id", err.message)
  }
}

export default findTaskByIdController
