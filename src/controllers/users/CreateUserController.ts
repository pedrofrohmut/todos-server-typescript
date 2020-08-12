import { Request, Response } from "express"

import findUserByEmail from "../../services/users/FindUserByEmailService"
import getHashedPassword from "../../services/authentication/GetHashedPasswordService"
import createUser from "../../services/users/CreateUserService"
import getSignInToken from "../../services/authentication/GetSignInTokenService"

import {
  getSuccessResponse,
  getServerErrorResponse,
  getBadRequestResponse
} from "../../utils/controllers/Responses"

const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const { email, firstName, lastName, password } = req.body
  try {
    const userFromEmail = await findUserByEmail(email)
    if (userFromEmail) {
      return getBadRequestResponse(res, "This e-mail has already been taken", { email })
    }
    const hashedPassword = await getHashedPassword(password)
    const createdUser = await createUser({ email, firstName, lastName, hashedPassword })
    const signInToken = getSignInToken(createdUser.id)
    return getSuccessResponse(res, "User created", {
      id: createdUser.id,
      firstName,
      lastName,
      email,
      token: signInToken
    })
  } catch (err) {
    return getServerErrorResponse(res, "Error to create an user", err.message)
  }
}

export default createUserController
