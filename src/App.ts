import express, { Application } from "express"
import cors from "cors"
import mongoose from "mongoose"

import UserRoutes from "./routes/UserRoute"
import TaskRoutes from "./routes/TaskRoute"
import TodoRoutes from "./routes/TodoRoute"

export default class App {
  public expressApp: Application

  public constructor() {
    this.expressApp = express()
    this.init()
  }

  private async init() {
    const connected = await this.connectDatabase()
    if (!connected) {
      process.exit(1)
    }
    this.useMiddlewares()
    this.useRoutes()
  }

  private useMiddlewares(): void {
    this.expressApp.use(express.json())
    this.expressApp.use(cors())
  }

  private async connectDatabase(): Promise<boolean> {
    if (!process.env.MONGO_URL) {
      console.log(
        "Error: no mongo url found on enviroment with the 'MONGO_URL' name"
      )
      return false
    }
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
      console.log(
        `MongoDB is connected: ${conn.connection.host}:${conn.connection.port}`
      )
      return Promise.resolve(true)
    } catch (err) {
      console.log("Error: " + err.message)
      return false
    }
  }

  private useRoutes(): void {
    this.expressApp.use("/api/v1/users", UserRoutes)
    this.expressApp.use("/api/v1/tasks", TaskRoutes)
    this.expressApp.use("/api/v1/todos", TodoRoutes)
  }
}
