import Todo from "../../entities/Todo"
import TodoModel from "../../models/TodoModel"

const setTodoAsNotComplete = async (todoId: string): Promise<Todo> => {
  try {
    const todoDb = await TodoModel.findById(todoId)
    if (!todoDb) {
      throw new Error("Todo not found. Is complete status could not be set")
    }
    await TodoModel.updateOne({ _id: todoId }, { isComplete: false })
    const { name, description, isComplete, task } = todoDb
    return Todo.getInstance({
      id: todoDb._id,
      name,
      description,
      isComplete,
      taskId: task
    })
  } catch (err) {
    throw new Error("Error to set todo as NOT complete")
  }
}

export default setTodoAsNotComplete
