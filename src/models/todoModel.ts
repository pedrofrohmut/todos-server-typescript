import { Schema, model, Document } from "mongoose"

import { ITaskSchema } from "./taskModel"

export interface ITodoSchema extends Document {
  name?: string
  description?: string
  task?: ITaskSchema["_id"]
  isComplete?: boolean
}

const TodoSchema = new Schema<ITodoSchema>(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    task: { type: Schema.Types.ObjectId, required: true },
    isComplete: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export default model<ITodoSchema>("Todo", TodoSchema)
