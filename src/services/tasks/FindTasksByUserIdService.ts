import Task from "../../entities/Task"
import TaskModel from "../../models/TaskModel"
import UserModel from "../../models/UserModel"

const findTasksByUserId = async (userId: string): Promise<Task[]> => {
  try {
    const user = await UserModel.findById(userId)
    if (!user) {
      throw new Error("User not found. Task could not be recovered")
    }
    const tasksDb = await TaskModel.find({ user: userId })
    return tasksDb.map((task) =>
      Task.getInstance({
        id: task._id,
        name: task.name,
        userId: task.user
      })
    )
  } catch (err) {
    throw new Error("Error to get tasks from user")
  }
}

export default findTasksByUserId
