import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import IUserModel from "../models/types/IUserModel"

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const token = req.header("x-auth-token")
    console.log("TOKEN: " + token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorize: no valid token in the request. Authorization denied"
      })
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("Missing ENV: no JWT_SECRET in the server enviroment")
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as IUserModel
    console.log("DECODED TOKEN: ", decodedToken)
    req.user = decodedToken
    next()
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Server Error: error to autheticate user: " + err.message
    })
  }
}
