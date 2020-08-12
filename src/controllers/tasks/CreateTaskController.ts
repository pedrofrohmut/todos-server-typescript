import { Request, Response } from "express"

import createTask from "../../services/tasks/CreateTaskService"
import { getSuccessResponse, getServerErrorResponse } from "../../utils/controllers/Responses"

const createTaskController = async (req: Request, res: Response): Promise<Response> => {
  const { name, user } = req.body
  try {
    // TODO: check user exists
    const createdTask = await createTask({ name, user })
    return getSuccessResponse(res, "Task created", createdTask)
  } catch (err) {
    return getServerErrorResponse(res, "Error to create a task", err.message)
  }
}

export default createTaskController
