import { Request, Response } from "express"

import findTasksByUserId from "../../services/tasks/FindTasksByUserIdService"
import { getServerErrorResponse, getSuccessResponse } from "../../utils/controllers/Responses"

const findTasksByUserIdController = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.id
  try {
    const tasks = await findTasksByUserId(userId)
    return getSuccessResponse(res, "Tasks found", tasks)
  } catch (err) {
    return getServerErrorResponse(res, "Error to get all task from user", err.message)
  }
}

export default findTasksByUserIdController
