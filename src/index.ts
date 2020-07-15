import express from "express"
import dotenv from "dotenv"

import { connectDatabase } from "./config/db"

// Setup enviroment variables
dotenv.config({ path: "./.env" })

connectDatabase()

// Express initialization
const app = express()

/**
 * Middlewares
 */
app.use(express.json())

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
