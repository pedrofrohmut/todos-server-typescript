import bcrypt from "bcryptjs"

const getHashedPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (err) {
    throw new Error("Error to hash the password")
  }
}

export default getHashedPassword
