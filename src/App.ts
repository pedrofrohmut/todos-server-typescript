import express, { Application } from "express"
import cors from "cors"
import mongoose from "mongoose"

import TaskRoutes from "./routes/TaskRoute"
import TodoRoutes from "./routes/TodoRoute"

import AuthenticateUserRoute from "./routes/users/AuthenticateUserRoute"
import CreateUserRoute from "./routes/users/CreateUserRoute"
import FindAllUsersRoute from "./routes/users/FindAllUsersRoute"
import LoginUserRoute from "./routes/users/LoginUserRoute"

import CreateTaskRoute from "./routes/tasks/CreateTaskRoute"
import DeleteTaskRoute from "./routes/tasks/DeleteTaskRoute"
import FindTaskByIdRoute from "./routes/tasks/FindTaskByIdRoute"
import FindTasksByUserIdRoute from "./routes/tasks/FindTasksByUserIdRoute"
import UpdateTaskRoute from "./routes/tasks/UpdateTaskRoute"

import ClearCompleteTodosByTaskIdRoute from "./routes/todos/ClearCompleteTodosByTaskIdRoute"
import CreateTodoRoute from "./routes/todos/CreateTodoRoute"
import DeleteTodoRoute from "./routes/todos/DeleteTodoRoute"
import FindTodoByIdRoute from "./routes/todos/FindTodoByIdRoute"
import FindTodosByTaskIdRoute from "./routes/todos/FindTodosByTaskIdRoute"
import SetTodoAsCompleteRoute from "./routes/todos/SetTodoAsCompleteRoute"
import SetTodoAsNotCompleteRoute from "./routes/todos/SetTodoAsNotCompleteRoute"
import UpdateTodoRoute from "./routes/todos/UpdateTodoRoute"

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
    this.expressApp.use("/api/v1/tasks", TaskRoutes)
    this.expressApp.use("/api/v1/todos", TodoRoutes)

    // User Routes
    this.expressApp.use("/api/v1/users", AuthenticateUserRoute)
    this.expressApp.use("/api/v1/users", CreateUserRoute)
    this.expressApp.use("/api/v1/users", FindAllUsersRoute)
    this.expressApp.use("/api/v1/users", LoginUserRoute)

    // Task Routes
    this.expressApp.use("/api/v1/tasks", CreateTaskRoute)
    this.expressApp.use("/api/v1/tasks", DeleteTaskRoute)
    this.expressApp.use("/api/v1/tasks", FindTaskByIdRoute)
    this.expressApp.use("/api/v1/tasks", FindTasksByUserIdRoute)
    this.expressApp.use("/api/v1/tasks", UpdateTaskRoute)

    // Todo Routes
    this.expressApp.use("/api/v1/todos", ClearCompleteTodosByTaskIdRoute)
    this.expressApp.use("/api/v1/todos", CreateTodoRoute)
    this.expressApp.use("/api/v1/todos", DeleteTodoRoute)
    this.expressApp.use("/api/v1/todos", FindTodoByIdRoute)
    this.expressApp.use("/api/v1/todos", FindTodosByTaskIdRoute)
    this.expressApp.use("/api/v1/todos", SetTodoAsCompleteRoute)
    this.expressApp.use("/api/v1/todos", SetTodoAsNotCompleteRoute)
    this.expressApp.use("/api/v1/todos", UpdateTodoRoute)
  }
}
