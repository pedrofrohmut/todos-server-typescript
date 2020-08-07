import { Request, Response } from "express"

import createUser from "../../services/tasks/CreateTaskService"
import { getSuccessResponse, getServerErrorResponse } from "../../utils/controllers/Responses"

const createTaskController = async (req: Request, res: Response): Promise<Response> => {
  const { name, user } = req.body
  try {
    const createdUser = await createUser({ name, user })
    // TODO: check user exists
    return getSuccessResponse(res, "User created", createdUser)
  } catch (err) {
    return getServerErrorResponse(res, "Error to create a task", err.message)
  }
}

export default createTaskController
