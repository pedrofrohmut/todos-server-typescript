import { Request, Response } from "express"

import UserModel from "../../models/UserModel"

const authenticateUserControlller = async (req: Request, res: Response): Promise<Response> => {
  try {
    // TODO: make service: findById that return only User
    const user = await UserModel.findById(req.userToken!.id)
    // TODO: take out non null assertion when possible
    const { _id, firstName, lastName, email } = user!
    return res.status(200).json({
      success: true,
      data: {
        id: _id,
        firstName,
        lastName,
        email
      },
      message: "Success: user authenticated"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error: error to authenticate user: " + err.message
    })
  }
}

export default authenticateUserControlller
