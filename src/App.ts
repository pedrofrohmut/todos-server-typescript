import express from "express"
import cors from "cors"

import TaskRouter from "./routes/tasks/TasksRouter"
import TodosRouter from "./routes/todos/TodosRouter"
import UsersRouter from "./routes/users/UsersRouter"

const App = express()

// Middlewares
App.use(express.json())
App.use(cors())

// Routes
App.use("/api/v1/tasks", TaskRouter)
App.use("/api/v1/todos", TodosRouter)
App.use("/api/v1/users", UsersRouter)

export default App
