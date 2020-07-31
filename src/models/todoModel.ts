import { Schema, model, Document } from "mongoose"

import { ITaskModel } from "./TaskModel"

export interface ITodoModel extends Document {
  name?: string
  description?: string
  task?: ITaskModel["_id"]
  isComplete?: boolean
}

const TodoSchema = new Schema<ITodoModel>(
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

export default model<ITodoModel>("Todo", TodoSchema)
