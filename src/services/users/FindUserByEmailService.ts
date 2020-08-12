import User from "../../entities/User"
import UserModel from "../../models/UserModel"

const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const userDb = await UserModel.findOne({ email })
    if (!userDb) {
      return null
    }
    const { firstName, lastName } = userDb
    return User.getInstance({ id: userDb._id, firstName, lastName, email })
  } catch (err) {
    throw new Error("Error to find user by e-mail")
  }
}

export default findUserByEmail
