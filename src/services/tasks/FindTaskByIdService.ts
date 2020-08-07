import Task from "../../entities/Task"
import TaskModel from "../../models/TaskModel"

const findTaskById = async (id:string):Promise<Task> => {
  try {
    const taskDb = await TaskModel.findById(id)
    if (!taskDb) {
      throw new Error("Task not found")
    }
    return Task.getInstance({ id: taskDb._id, name: taskDb.name, userId: taskDb.user })
  } catch (err) {
    throw new Error("FindTaskByIdService: Error to find a task by its id: " + err.message)
  }
}

export default findTaskById
