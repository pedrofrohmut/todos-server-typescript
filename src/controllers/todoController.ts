import { Request, Response } from "express"

import TodoSchema from "../models/TodoModel"
import TaskSchema from "../models/TaskModel"
import * as MongooseValidator from "../validators/MongooseValidator"
import * as TodoValidator from "../validators/TodoValidator"

class TodoController {
  public async findTodoByTaskId(req: Request, res: Response): Promise<Response> {
    const taskId = req.params.id
    try {
      const task = await TaskSchema.findById(taskId)
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Task found with the passed ID",
          data: { taskId }
        })
      }
      const todos = await TodoSchema.find({ task: taskId })
      return res.status(200).json({
        success: true,
        message: "Success: todos found",
        data: {
          todos,
          count: todos.length
        }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to find todo by task id: " + err.message
      })
    }
  }

  public async findTodoById(req: Request, res: Response): Promise<Response> {
    const todoId = req.params.id
    try {
      const todo = await TodoSchema.findById(todoId)
      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Todo found with the passed ID",
          data: { todoId }
        })
      }
      return res.status(200).json({
        success: true,
        message: "Success: Todo found",
        data: { todo }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to find Todo by ID: " + err.message
      })
    }
  }

  public async createTodo(req: Request, res: Response): Promise<Response> {
    const taskId = req.params.id
    const { name, description } = req.body
    const isValidName = TodoValidator.validateName(name)
    const isValidDescription = TodoValidator.validateDescription(description)
    if (!isValidName && !isValidDescription) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: the passed Todo name and descripton are either or both not valid",
        data: {
          name,
          description
        }
      })
    }
    try {
      const task = await TaskSchema.findById(taskId)
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Task found with the passed ID",
          data: { taskId }
        })
      }
      const createdTodo = await TodoSchema.create({ name, description, task: taskId })
      return res.status(200).json({
        success: true,
        message: "Success: todo created",
        data: {
          createdTodo
        }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to create a Todo: " + err.message
      })
    }
  }

  public async updateTodo(req: Request, res: Response): Promise<Response> {
    const todoId = req.params.id
    const { name, description, task: taskId } = req.body
    const isValidName = TodoValidator.validateName(name)
    const isValidDescription = TodoValidator.validateDescription(description)
    if (!isValidName || !isValidDescription) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: the passed name Todo name and description are either or both not valid",
        data: {
          name,
          description
        }
      })
    }
    const isValidTaskId = MongooseValidator.validateId(taskId)
    if (!isValidTaskId) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: the Task ID passed is not valid",
        data: { taskId }
      })
    }
    try {
      const task = await TaskSchema.findById(taskId)
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Task found with the passed ID",
          data: { taskId }
        })
      }
      const todo = await TodoSchema.findById(todoId)
      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Todo found with the passed ID",
          data: { todoId }
        })
      }
      await TodoSchema.updateOne(todo, { name, description })
      return res.status(200).json({
        success: true,
        message: "Success: Todo updated"
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to update a Todo: " + err.message
      })
    }
  }

  public async deleteTodo(req: Request, res: Response): Promise<Response> {
    const todoId: string = req.params.id
    try {
      const todo = await TodoSchema.findById(todoId)
      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Todo found with the passed ID",
          data: { todoId }
        })
      }
      await TodoSchema.deleteOne({ _id: todoId })
      return res.status(200).json({
        success: true,
        message: "Success: todo deleted"
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to delete Todo: " + err.message
      })
    }
  }

  public async setTodoAsComplete(req: Request, res: Response): Promise<Response> {
    const todoId = req.params.id
    try {
      const todo = await TodoSchema.findById(todoId)
      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Todo found with the passed ID",
          data: { todoId }
        })
      }
      await todo.updateOne({ isComplete: true })
      todo.isComplete = true
      return res.status(200).json({
        success: true,
        message: "Success: Todo set as complete",
        data: { todo }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to set Todo as complete: " + err.messsage
      })
    }
  }

  public async setTodoAsNotComplete(req: Request, res: Response): Promise<Response> {
    const todoId = req.params.id
    try {
      const todo = await TodoSchema.findById(todoId)
      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Todo found with the passed ID",
          data: { todoId }
        })
      }
      await todo.updateOne({ isComplete: false })
      todo.isComplete = false
      return res.status(200).json({
        success: true,
        message: "Success: Todo set as NOT complete",
        data: { todo }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to set Todo as NOT complete: " + err.messsage
      })
    }
  }

  public async clearCompleteTodos(req: Request, res: Response): Promise<Response> {
    const taskId = req.params.id
    try {
      const task = await TaskSchema.findById(taskId)
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Not Found: no Task found with the passed ID",
          data: { taskId }
        })
      }
      const completeTodos = await TodoSchema.find({ task: taskId, isComplete: true })
      await TodoSchema.deleteMany({ isComplete: true, task: taskId })
      return res.status(200).json({
        success: true,
        messsage: "Success: complete Todos cleared from Task",
        data: { completeTodos }
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to clear complete todos: " + err.message
      })
    }
  }
}

export default new TodoController()
