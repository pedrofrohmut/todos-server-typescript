import { Request, Response } from "express"

import findUserById from "../../services/users/FindUserByIdService"
import createTask from "../../services/tasks/CreateTaskService"

import {
  getSuccessResponse,
  getServerErrorResponse,
  getBadRequestResponse
} from "../../utils/controllers/Responses"

const createTaskController = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.id
  const { name } = req.body
  try {
    const user = await findUserById(userId)
    if (!user) {
      return getBadRequestResponse(res, "There is no user that matches the passed id", { userId })
    }
    const createdTask = await createTask({ name, user: userId })
    return getSuccessResponse(res, "Task created", createdTask)
  } catch (err) {
    return getServerErrorResponse(res, "Error to create a task", err.message)
  }
}

export default createTaskController
