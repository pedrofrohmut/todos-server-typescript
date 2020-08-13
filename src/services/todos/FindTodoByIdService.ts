import Todo from "../../entities/Todo"
import TodoModel from "../../models/TodoModel"

const findTodoById = async (todoId: string): Promise<Todo | null> => {
  try {
    const todoDb = await TodoModel.findById(todoId)
    if (!todoDb) {
      return null
    }
    const { name, description, isComplete, task } = todoDb
    return Todo.getInstance({ id: todoDb._id, name, description, isComplete, taskId: task })
  } catch (err) {
    throw new Error("Error to find todo by id")
  }
}

export default findTodoById
