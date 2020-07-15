import mongoose from "mongoose"

export const connectDatabase = async () => {
  if (!process.env.MONGO_URL) {
    console.log(
      "Error: no mongo url found on enviroment with the 'MONGO_URL' name"
    )
    process.exit(1)
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
  } catch (err) {
    console.log("Error: " + err.message)
    process.exit(1)
  }
}
