import { Schema, model, Document } from "mongoose"

export interface IUserModel extends Document {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  fullName: () => string
}

const UserSchema = new Schema<IUserModel>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

UserSchema.methods.fullName = function(): string {
  return this.firstName + "  " + this.lastName
}

export default model<IUserModel>("User", UserSchema)
