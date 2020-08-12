import User from "../../entities/User"
import UserModel from "../../models/UserModel"

interface Params {
  email: string
  firstName: string
  lastName: string
  hashedPassword: string
}

const createUser = async (user: Params): Promise<User> => {
  const { email, firstName, lastName, hashedPassword } = user
  try {
    const createdUser = await UserModel.create({
      email,
      firstName,
      lastName,
      password: hashedPassword
    })
    if (!createUser) {
      throw new Error("User could not be created")
    }
    return User.getInstance({ id: createdUser._id, email, firstName, lastName })
  } catch (err) {
    throw new Error("Error to create an user")
  }
}

export default createUser
