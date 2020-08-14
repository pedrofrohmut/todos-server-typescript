import Task from "../../entities/Task"
import TaskModel from "../../models/TaskModel"

interface Params {
  name: string
  user: string
}

const createUser = async ({ name, user }: Params): Promise<Task> => {
  try {
    const createdTaskDb = await TaskModel.create({ name, user })
    if (!createdTaskDb) {
      throw new Error("Could not create a task")
    }
    return Task.getInstance({ id: createdTaskDb._id, name, userId: user })
  } catch (err) {
    throw new Error("CreateTaskService: Error to create a task: " + err.message)
  }
}

export default createUser
