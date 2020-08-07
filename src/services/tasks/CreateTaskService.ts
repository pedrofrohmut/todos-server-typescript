import Task from "../../entities/Task"
import TaskModel from "../../models/TaskModel"

interface Params {
  name: string
  user: string
}

const createUser = async ({ name, user }: Params): Promise<Task> => {
  try {
    await TaskModel.create({ name, user })
    return Task.getInstance({ name, userId: user })
  } catch (err) {
    throw new Error("CreateTaskService: Error to create a task: " + err.message)
  }
}

export default createUser
