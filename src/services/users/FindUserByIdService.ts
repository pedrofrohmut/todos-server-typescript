import User from "../../entities/User"
import UserModel from "../../models/UserModel"


const findUserById = async (userId: string): Promise< User | null> => {
  try {
    const userDb = await UserModel.findById(userId)
    if (!userDb) {
      return null
    }
    const { firstName, lastName, email, password } = userDb
    return User.getInstance({ id: userDb._id, firstName, lastName, email, password })
  } catch (err) {
    throw new Error("Error to find user by id")
  }
}

export default findUserById
