import Todo from "../../entities/Todo"
import TodoModel from "../../models/TodoModel"

const deleteTodo = async (todoId: string): Promise<Todo> => {
  try {
    const todoDb = await TodoModel.findById(todoId)
    if (!todoDb) {
      throw new Error("Todo not found to delete")
    }
    const { name, description, isComplete, task: taskId } = todoDb
    const todo = Todo.getInstance({ id: todoDb._id, name, description, isComplete, taskId })
    await TodoModel.deleteOne({ _id: todoId })
    return todo
  } catch (err) {
    throw new Error("Error to delete a todo")
  }
}

export default deleteTodo
