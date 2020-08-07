import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import UserModel from "../../models/UserModel"

const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const { email, firstName, lastName, password } = req.body
  try {
    // TODO: make service: getHashFromPassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //
    const createdUser = await UserModel.create({
      email,
      firstName,
      lastName,
      password: hashedPassword
    })
    if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET on .env")
    // TODO: make service: getUserToken
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, { expiresIn: 3600 })
    return res.status(201).json({
      success: true,
      data: {
        id: createdUser._id,
        firstName,
        lastName,
        email,
        token
      },
      message: "Created: new user created"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error: error to create an User: " + err.message
    })
  }
}

export default createUserController
