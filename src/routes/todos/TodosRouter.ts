import { Router } from "express"

import clearCompleteTodosByTaskIdRoute from "./ClearCompleteTodosByTaskIdRoute"
import createTodoRoute from "./CreateTodoRoute"
import deleteTodoRoute from "./DeleteTodoRoute"
import findTodoByIdRoute from "./FindTodoByIdRoute"
import findTodoByTaskIdRoute from "./FindTodosByTaskIdRoute"
import setTodoAsCompleteRoute from "./SetTodoAsCompleteRoute"
import setTodoAsNotCompleteRoute from "./SetTodoAsNotCompleteRoute"
import updateTodoRoute from "./UpdateTodoRoute"

const todosRouter = Router()

clearCompleteTodosByTaskIdRoute(todosRouter)
createTodoRoute(todosRouter)
deleteTodoRoute(todosRouter)
findTodoByIdRoute(todosRouter)
findTodoByTaskIdRoute(todosRouter)
setTodoAsCompleteRoute(todosRouter)
setTodoAsNotCompleteRoute(todosRouter)
updateTodoRoute(todosRouter)

export default todosRouter
