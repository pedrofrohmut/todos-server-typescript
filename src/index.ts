import express from "express"
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

// Express initialization
const app = express()

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
