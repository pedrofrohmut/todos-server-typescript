import { Request, Response, NextFunction } from "express"

import TaskModel from "../models/TaskModel"
import * as TaskValidator from "../validators/TaskValidator"

export const checkTaskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const taskId = req.params.id
  try {
    const task = await TaskModel.findById(taskId)
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Not Found: no Task found with the passed ID",
        data: { taskId }
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error: error to check if task exists: " + err.message
    })
  }
  next()
}

export const validateTaskName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const taskName = req.body.name
  const isValidTaskName = TaskValidator.validateName(taskName)
  if (!isValidTaskName) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: the Task name is not valid",
      data: { taskName }
    })
  }
  next()
}
