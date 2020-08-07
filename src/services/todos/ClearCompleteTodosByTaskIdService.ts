import Todo from "../../entities/Todo"
import TodoModel from "../../models/TodoModel"

const clearCompleteTodosByTaskId = async (id: string): Promise<Todo[]> => {
  try {
    const todosDb = await TodoModel.find({ isComplete: true, task: id })
    await TodoModel.deleteMany({ isComplete: true, task: id })
    return todosDb.map((todo) =>
      Todo.getInstance({ id: todo._id, name: todo.name, description: todo.description, taskId: id })
    )
  } catch (err) {
    throw new Error(
      "ClearCompleteTodosByTaskIdService: error to clear complete todos: " + err.message
    )
  }
}

export default clearCompleteTodosByTaskId
