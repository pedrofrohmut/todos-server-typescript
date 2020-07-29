import mongoose from "mongoose"

export const validateId = (id: string | undefined): boolean =>
  id !== undefined && id !== "" && mongoose.Types.ObjectId.isValid(id)
