import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import UserModel from "../models/UserModel"

class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
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

  public async loginUser(req: Request, res: Response): Promise<Response> {
    // const { email, password } = req.body
    // if (!email || email === "" || !password || password === "") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Bad Request: e-mail or password are either null, blank or invalid",
    //     data: { email }
    //   })
    // }
    try {
      // const user = await UserModel.findOne({ email })
      // if (!user) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Not Found: no user found with the passed e-mail",
      //     data: email
      //   })
      // }

      // if (!user.password || user.password === "") {
      //   throw new Error("Missing Data: There is no password saved for this user")
      // }
      // const passwordMatch = await bcrypt.compare(password, user.password)
      // if (!passwordMatch) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Invalid Password: the password did not match the passed e-mail",
      //     data: email
      //   })
      // }
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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 300 })
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

  public async authenticateUser(req: Request, res: Response): Promise<Response> {
    try {
      // if (!req.userToken || !req.userToken.id || req.userToken.id === "") {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Bad Request: authenticated request has invalid user or user.id",
      //     data: !req.userToken
      //       ? "No user in the request"
      //       : !req.userToken.id
      //         ? "No User ID in the Request"
      //         : {
      //           user: req.userToken,
      //           userId: req.userToken && req.userToken.id ? req.userToken.id : "No ID"
      //         }
      //   })
      // }
      // TODO: make service: findById that return only User
      const user = await UserModel.findById(req.userToken!.id)
      // if (!user) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Not Found: no user found with the user.id in the authenticated request"
      //   })
      // }
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

  public async findUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserModel.find()
      const formatedUsers = users.map(({ _id, firstName, lastName, email }) => ({
        id: _id,
        firstName,
        lastName,
        email
      }))
      return res.status(200).json({
        success: true,
        data: formatedUsers,
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
