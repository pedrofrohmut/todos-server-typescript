import Mongoose from "mongoose"

const connect = async (): Promise<boolean> => {
  try {
    const MONGO_URL = process.env.MONGO_URL
    if (!MONGO_URL) {
      throw new Error("ENV ERROR: no url for mongodb in the enviroment")
    }
    const connection = await Mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    if (process.env.NODE_ENV === "development") {
      console.log(`MongoDB is connected at ${connection.connection.host}:${connection.connection.port}`)
    }
    return true
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("MongoDB connection error: " + err.message)
    }
    return false
  }
}

export default connect
