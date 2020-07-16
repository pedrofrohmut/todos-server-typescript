import express from "express"
import dotenv from "dotenv"

import { connectDatabase } from "./config/db"
import userRoutes from "./routes/userRoutes"
import taskRoutes from "./routes/taskRoutes"
import todoRoutes from "./routes/todoRoutes"

// Setup enviroment variables
dotenv.config({ path: "./.env" })

connectDatabase()

// Express initialization
const app = express()

/**
 * Middlewares
 */
app.use(express.json())

/**
 * Routes
 */
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/tasks", taskRoutes)
app.use("/api/v1/todos", todoRoutes)

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
