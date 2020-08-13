import Task from "../../entities/Task"
import TaskModel from "../../models/TaskModel"

const deleteTask = async (taskId: string): Promise<Task> => {
  try {
    const taskDb = await TaskModel.findById(taskId)
    if (!taskDb) {
      throw new Error("Task not found to delete")
    }
    const task = Task.getInstance({ name: taskDb.name, userId: taskDb.user })
    await TaskModel.deleteOne({ _id: taskId })
    return task
  } catch (err) {
    throw new Error("Error to delete a task")
  }
}

export default deleteTask
