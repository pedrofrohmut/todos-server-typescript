import Task from "../../entities/Task"
import TaskModel from "../../models/TaskModel"

interface Params { 
  id: string
  name: string 
}

const updateTask = async (task:Params): Promise<Task> => {
  try {
    const taskDb = await TaskModel.findById(task.id)
    if (!taskDb) {
      throw new Error("Task not found to update")
    }
    await TaskModel.updateOne({ _id: task.id }, { name: task.name })
    return Task.getInstance({ id: task.id, name: task.name })
  } catch (err) {
    throw new Error("UpdateTaskService: Error to update a task: " + err.message)
  }
}

export default updateTask
