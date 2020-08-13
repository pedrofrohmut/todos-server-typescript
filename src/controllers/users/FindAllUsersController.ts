import { Request, Response } from "express"

import findAllUsers from "../../services/users/FindAllUsersService"

import { getSuccessResponse, getServerErrorResponse } from "../../utils/controllers/Responses"


const findAllUsersController = async (_: Request, res: Response): Promise<Response> => {
  try {
    const users = await findAllUsers()
    return getSuccessResponse(res, "Users found", users)
  } catch (err) {
    return getServerErrorResponse(res, "Error to get all users", err.message)
  }
}

export default findAllUsersController
