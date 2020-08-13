import Todo from "../../entities/Todo"
import TodoModel from "../../models/TodoModel"

interface Params {
  id: string
  name: string
  description: string
}

const updateTodo = async (todo: Params): Promise<Todo> => {
  const { id, name, description } = todo
  try {
    const todoDb = await TodoModel.findById(id)
    if (!todoDb) {
      throw new Error("Todo not found and could not be updated")
    }
    await TodoModel.updateOne({ _id: id }, { name, description })
    return Todo.getInstance({
      id,
      name,
      description,
      isComplete: todoDb.isComplete,
      taskId: todoDb.task
    })
  } catch (err) {
    throw new Error("Error to update a todo")
  }
}

export default updateTodo
