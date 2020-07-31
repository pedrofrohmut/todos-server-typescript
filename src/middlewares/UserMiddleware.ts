import { Request, Response, NextFunction } from "express"

import UserSchema from "../models/UserModel"

export const checkUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = req.params.id
  try {
    const user = await UserSchema.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Not Found: no User found with the passed ID",
        data: { userId }
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error: error to check if user exists: " + err.message
    })
  }
  next()
}
