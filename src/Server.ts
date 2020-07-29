import App from "./App"
import dotenv from "dotenv"

// Setup enviroment variables
dotenv.config({ path: "./.env" })

if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
  console.clear()
}

const app = new App()
app.expressApp.listen(process.env.PORT, () =>
  console.log(`Server started at http://localhost:${process.env.PORT}`)
)
