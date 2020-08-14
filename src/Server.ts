import App from "./App"
import dotenv from "dotenv"
import connectDataBase from "./database/connection/mongodb"

// Setup enviroment variables
dotenv.config({ path: "./.env" })

if (process.env.NODE_ENV === "development") {
  console.clear()
}

// DataBase Connection
;(async () => {
  try {
    const isConnected = await connectDataBase()
    if (!isConnected) {
      console.error("Error to connect to database")
      process.exit(1)
    }
  } catch (err) {
    console.error("Error occured to connect to database: " + err.message)
  }
})()

const PORT = process.env.PORT || 8080
App.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Server started at http://localhost:${PORT}`)
  }
})
