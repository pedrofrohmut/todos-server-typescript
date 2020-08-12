import bcrypt from "bcryptjs"

const isPasswordMatch = async (requestPassword: string, userPassword: string): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(requestPassword, userPassword)
    return isMatch
  } catch (err) {
    throw new Error("Error to match passwords")
  }
}

export default isPasswordMatch
