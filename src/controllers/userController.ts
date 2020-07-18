import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import UserSchema from "../models/UserModel"

class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { email, firstName, lastName, password } = req.body
    if (
      !email ||
      email === "" ||
      !firstName ||
      firstName === "" ||
      !lastName ||
      lastName === "" ||
      !password ||
      password === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: request body is invalid, some fields are missing, blank or invalid"
      })
    }
    try {
      // Check if e-mail is taken
      const existingUser = await UserSchema.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Bad Request: This e-mail is already taken"
        })
      }
      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const createdUser = await UserSchema.create({
        email,
        firstName,
        lastName,
        password: hashedPassword
      })
      if (!process.env.JWT_SECRET) throw new Error("Missing JWT_SECRET on .env")
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

  public async loginUser(req: Request, res: Response): Promise<Response> {
    return res.send("Log In User")
  }

  public async authenticateUser(req: Request, res: Response): Promise<Response> {
    return res.send("Authenticate User")
  }

  public async findUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserSchema.find()
      return res.status(200).json({
        success: true,
        data: users,
        count: users.length
      })
    } catch (err) {
      return res.status(200).json({
        success: false,
        message: "Server Error: error to get all users: " + err.message
      })
    }
  }
}

export default new UserController()
