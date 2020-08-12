import { Request, Response } from "express"

import findUserById from "../../services/users/FindUserByIdService"

import {
  getServerErrorResponse,
  getBadRequestResponse,
  getSuccessResponse
} from "../../utils/controllers/Responses"

const authenticateUserControlller = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.userToken || !req.userToken.id) {
      return getBadRequestResponse(res, "No authentication token in the request. Or token is invalid")
    }
    const user = await findUserById(req.userToken.id)
    if (!user) {
      return getBadRequestResponse(res, "There is no user that matches the passed id", {
        userId: req.userToken.id
      })
    }
    const { id, firstName, lastName, email } = user
    return getSuccessResponse(res, "User authenticated", { id, firstName, lastName, email })
  } catch (err) {
    return getServerErrorResponse(res, "Error to Authenticate user", err.message)
  }
}

export default authenticateUserControlller
