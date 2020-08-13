import Task from "../../entities/Task"
import TaskModel from "../../models/TaskModel"

interface Params {
  id: string
  name: string
}

const updateTask = async (task: Params): Promise<Task> => {
  const { id, name } = task
  try {
    const taskDb = await TaskModel.findById(id)
    if (!taskDb) {
      throw new Error("Task not found and could not be updated")
    }
    await TaskModel.updateOne({ _id: id }, { name })
    return Task.getInstance({ id, name, userId: taskDb.user })
  } catch (err) {
    throw new Error("Error to update a task")
  }
}

export default updateTask
