import Todo from "../../entities/Todo"
import TaskModel from "../../models/TaskModel"
import TodoModel from "../../models/TodoModel"

const findTodosByTaskId = async (taskId: string): Promise<Todo[]> => {
  try {
    const taskDb = await TaskModel.findById(taskId)
    if (!taskDb) {
      throw new Error("Task not found. Todos could not be recovered")
    }
    const todosDb = await TodoModel.find({ task: taskId })
    return todosDb.map((todo) =>
      Todo.getInstance({
        id: todo._id,
        name: todo.name,
        description: todo.description,
        isComplete: todo.isComplete,
        taskId: todo.task
      })
    )
  } catch (err) {
    throw new Error("Error to find todos by task id")
  }
}

export default findTodosByTaskId
