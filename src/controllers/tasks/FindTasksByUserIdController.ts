import { Request, Response } from "express"

import findUserById from "../../services/users/FindUserByIdService"
import findTasksByUserId from "../../services/tasks/FindTasksByUserIdService"

import {
  getServerErrorResponse,
  getSuccessResponse,
  getBadRequestResponse
} from "../../utils/controllers/Responses"

const findTasksByUserIdController = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.id
  try {
    const user = await findUserById(userId)
    if (!user) {
      return getBadRequestResponse(res, "There is no user that matches the passed id", { userId })
    }
    const tasks = await findTasksByUserId(userId)
    return getSuccessResponse(res, "Tasks found", tasks)
  } catch (err) {
    return getServerErrorResponse(res, "Error to get all task from user", err.message)
  }
}

export default findTasksByUserIdController
