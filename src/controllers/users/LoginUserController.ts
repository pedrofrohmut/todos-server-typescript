import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import UserModel from "../../models/UserModel"

const loginUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    // TODO: make service: findUserByEmail
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      throw new Error("Server Error: User could not be recovered from database")
    }
    //
    // TODO: create service: getUserToken
    if (!process.env.JWT_SECRET) {
      throw new Error("Missing ENV: No JWT_SECRET present in the current enviroment")
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 })
    //
    return res.status(200).json({
      success: true,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id,
        token
      },
      message: "Success: user logged in"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error: error to log in an user: " + err.message
    })
  }
}

export default loginUserController
