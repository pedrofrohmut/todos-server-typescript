import User from "../../entities/User"
import UserModel from "../../models/UserModel"

const findAllUsers = async () => {
  try {
    const usersBD = await UserModel.find()
    return usersBD.map((user) =>
      User.getInstance({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      })
    )
  } catch (err) {
    throw new Error("FindAllUsersService: Error to get all users: " + err.message)
  }
}

export default findAllUsers
