import Todo from "../../entities/Todo"
import TodoModel from "../../models/TodoModel"

interface Params {
  name: string
  description: string
  task: string
}

const createTodo = async (todo: Params): Promise<Todo> => {
  const { name, description, task: taskId } = todo
  try {
    const createdTodo = await TodoModel.create({ name, description, task: taskId })
    if (!createdTodo) {
      throw new Error("Todo could not be created")
    }
    return Todo.getInstance({
      id: createdTodo._id,
      name,
      description,
      taskId,
      isComplete: createdTodo.isComplete
    })
  } catch (err) {
    throw new Error("Error to create a todo")
  }
}

export default createTodo
