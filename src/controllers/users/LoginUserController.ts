import { Request, Response } from "express"

import findUserByEmail from "../../services/users/FindUserByEmailService"
import isPasswordMatch from "../../services/authentication/IsPasswordMatchService"
import getSignInToken from "../../services/authentication/GetSignInTokenService"

import {
  getServerErrorResponse,
  getSuccessResponse,
  getBadRequestResponse
} from "../../utils/controllers/Responses"

const loginUserController = async (req: Request, res: Response): Promise<Response> => {
  const { email, password: requestPassword } = req.body
  try {
    const user = await findUserByEmail(email)
    if (!user) {
      return getBadRequestResponse(res, "There is no user that matches the passed e-mail", {
        email
      })
    }
    const { id, firstName, lastName, password: userPassword } = user
    const isMatch = isPasswordMatch(requestPassword, userPassword)
    if (!isMatch) {
      return getBadRequestResponse(res, "The passed password do not match the e-mail passed", {
        email
      })
    }
    const token = getSignInToken(id)
    return getSuccessResponse(res, "User logged in", { id, firstName, lastName, email, token })
  } catch (err) {
    return getServerErrorResponse(res, "Error to log in user", err.message)
  }
}

export default loginUserController
