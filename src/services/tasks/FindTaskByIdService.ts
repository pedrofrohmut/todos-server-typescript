import Task from "../../entities/Task"
import TaskModel from "../../models/TaskModel"

const findTaskById = async (id:string):Promise<Task | null> => {
  try {
    const taskDb = await TaskModel.findById(id)
    if (!taskDb) {
      return null
    }
    const { name, user } = taskDb
    return Task.getInstance({ id: taskDb._id, name, userId: user })
  } catch (err) {
    throw new Error("FindTaskByIdService: Error to find a task by its id: " + err.message)
  }
}

export default findTaskById
