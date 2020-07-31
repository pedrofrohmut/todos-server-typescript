import { Request, Response } from "express"

import TodoSchema from "../models/TodoModel"

class TodoController {
  public async findTodoByTaskId(req: Request, res: Response): Promise<Response> {
    try {
      const todos = await TodoSchema.find({ task: req.params.id })
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
    try {
      const todo = await TodoSchema.findById(req.params.id)
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
    const { name, description } = req.body
    try {
      const createdTodo = await TodoSchema.create({ name, description, task: req.params.id })
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
    try {
      const { name, description } = req.body
      await TodoSchema.updateOne({ _id: req.params.id }, { name, description })
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
    try {
      await TodoSchema.deleteOne({ _id: req.params.id })
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
    try {
      await TodoSchema.updateOne({ _id: req.params.id }, { isComplete: true })
      return res.status(200).json({
        success: true,
        message: "Success: Todo set as complete"
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to set Todo as complete: " + err.messsage
      })
    }
  }

  public async setTodoAsNotComplete(req: Request, res: Response): Promise<Response> {
    try {
      await TodoSchema.updateOne({ _id: req.params.id }, { isComplete: false })
      return res.status(200).json({
        success: true,
        message: "Success: Todo set as NOT complete"
      })
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error: error to set Todo as NOT complete: " + err.messsage
      })
    }
  }

  public async clearCompleteTodos(req: Request, res: Response): Promise<Response> {
    try {
      await TodoSchema.deleteMany({ isComplete: true, task: req.params.id })
      return res.status(200).json({
        success: true,
        messsage: "Success: complete Todos cleared from Task"
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
