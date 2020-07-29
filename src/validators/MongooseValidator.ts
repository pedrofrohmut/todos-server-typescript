import mongoose from "mongoose"

export const validateId = (id: string): boolean =>
  id !== undefined && id !== "" && mongoose.Types.ObjectId.isValid(id)
