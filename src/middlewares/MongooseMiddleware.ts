import { Request, Response, NextFunction } from "express"

import * as MongooseValidator from "../validators/MongooseValidator"

export const validateId = (req: Request, res: Response, next: NextFunction): Response | void => {
  const requestId = req.params.id
  const isValidId = MongooseValidator.validateId(requestId)
  if (!isValidId) {
    return res.status(400).json({
      success: false,
      message: "MongooseMiddleware => Bad Request: the passed ID is not valid",
      data: { id: requestId }
    })
  }
  next()
}
