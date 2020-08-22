import { Request, Response, NextFunction } from "express"

import * as TaskValidator from "../validators/TaskValidator"

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
