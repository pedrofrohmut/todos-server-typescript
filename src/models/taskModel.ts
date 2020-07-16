import { Schema, model, Document } from "mongoose"

import { IUserSchema } from "./userModel"

export interface ITaskSchema extends Document {
  name: string
  user: IUserSchema["_id"]
}

const TaskSchema = new Schema<ITaskSchema>({
  name: { type: String, trim: true, required: true },
  user: { type: Schema.Types.ObjectId, required: true }
}, {
  timestamps: true
})

export default model<ITaskSchema>("Task", TaskSchema)
