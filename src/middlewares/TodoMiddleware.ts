import { Request, Response, NextFunction } from "express"

import TodoModel from "../models/TodoModel"
import TaskModel from "../models/TaskModel"
import * as MongooseValidator from "../validators/MongooseValidator"
import * as TodoValidator from "../validators/TodoValidator"

export const checkTodoExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const todoId = req.params.id
  try {
    const todo = await TodoModel.findById(todoId)
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Not Found: no Todo found with the passed ID",
        data: { todoId }
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error: error to check if Todo exists: " + err.message
    })
  }
  next()
}

export const validateName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const todoName = req.body.name
  const isValidTodoName = TodoValidator.validateName(todoName)
  if (!isValidTodoName) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: the Todo name passed is not valid",
      data: { todoName }
    })
  }
  next()
}

export const validateDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const todoDescription = req.body.description
  const isValidTodoDescription = TodoValidator.validateDescription(todoDescription)
  if (!isValidTodoDescription) {
    return res.status(500).json({
      success: false,
      message: "Bad Request: the Todo description passed is not valid",
      data: { todoDescription }
    })
  }
  next()
}

export const validateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const taskId = req.body.task
  const isValidTaskId = MongooseValidator.validateId(taskId)
  if (!isValidTaskId) {
    return res.status(400).json({
      success: false,
      messsage: "Bad Request: the Task ID passed in the Todo is not valid",
      data: { taskId }
    })
  }
  const task = await TaskModel.findById(taskId)
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Not Found: no Task found with the ID passed in the Todo",
      data: { taskId }
    })
  }
  next()
}
