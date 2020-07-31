import { Schema, model, Document } from "mongoose"

import { IUserModel } from "./UserModel"

export interface ITaskModel extends Document {
  name: string
  user: IUserModel["_id"]
}

const TaskSchema = new Schema<ITaskModel>(
  {
    name: { type: String, trim: true, required: true },
    user: { type: Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true
  }
)

export default model<ITaskModel>("Task", TaskSchema)
