import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import * as MongooseValidator from "../validators/MongooseValidator"
import * as UserValidator from "../validators/UserValidator"
import UserModel from "../models/UserModel"

interface IUserToken {
  id?: string
  iat?: number
  exp?: number
}

export const checkUserExistsById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = req.params
  try {
    const user = await UserModel.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Not Found: no User found with the passed ID",
        data: { id }
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error: error to check if user exists by ID: " + err.message
    })
  }
  next()
}

export const checkUserExistsByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Not Found: no User found with the passed e-mail",
        data: { email }
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error: error to check if user exists by e-mail: " + err.message
    })
  }
  next()
}

export const matchPasswordByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Not Found: no User found with the passed e-mail",
        data: { email }
      })
    }
    if (!user.password) {
      throw new Error("Server Error: the User password could not be recovered")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Bad Request: the User password passed do NOT match the password from the " +
          "User of this e-mail",
        data: { email }
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error: error to check if user exists by e-mail: " + err.message
    })
  }
  next()
}

export const verifyAuthenticationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.header("x-auth-token")
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorize: there is no valid token in the request. Authorization denied"
    })
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing ENV: no JWT_SECRET in the server enviroment")
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as IUserToken
    req.userToken = decodedToken
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: Invalid token: " + err.message,
      data: { token }
    })
  }
  if (!req.userToken) {
    return res.status(500).json({
      success: false,
      message: "Server Error: the server could not get a token from the request"
    })
  }
  next()
}

export const validateUserFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (!req.userToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorize: there is no valid token in the request. Authorization denied"
    })
  }
  const isValidId = MongooseValidator.validateId(req.userToken.id)
  if (!isValidId) {
    return res.status(400).json({
      success: false,
      message:
        "Bad Request: the User ID in the token passed in x-auth-token request header is not valid",
      data: { userId: req.userToken.id }
    })
  }
  const user = await UserModel.findById(req.userToken.id)
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Not Found: no User found with the passed ID in the token from the request header"
    })
  }
  next()
}

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userEmail = req.body.email
  const isValidUserEmail = UserValidator.validateEmail(userEmail)
  if (!isValidUserEmail) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: the User e-mail is not valid",
      data: { userEmail }
    })
  }
  next()
}

export const validateFirstName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userFirstName = req.body.firstName
  const isValidUserFirstName = UserValidator.validateFirstName(userFirstName)
  if (!isValidUserFirstName) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: the User first name is not valid",
      data: { userFirstName }
    })
  }
  next()
}

export const validateLastName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userLastName = req.body.lastName
  const isValidUserLastName = UserValidator.validateLastName(userLastName)
  if (!isValidUserLastName) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: the User last name is not valid",
      data: { userLastName }
    })
  }
  next()
}

export const validatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userPassword = req.body.password
  const isValidUserPassword = UserValidator.validatePassword(userPassword)
  if (!isValidUserPassword) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: the User password is not valid",
      data: { userPassword }
    })
  }
  next()
}

export const checkEmailIsNotTaken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userEmail = req.body.email
  const user = await UserModel.findOne({ email: userEmail })
  if (user) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: the User e-mail is already taken",
      data: { userEmail }
    })
  }
  next()
}
