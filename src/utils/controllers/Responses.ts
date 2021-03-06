import { Response } from "express"

export const getSuccessResponse = (
  res: Response, 
  message: string, 
  data?: object
): Response<any> =>
  res.status(200).json({
    success: true,
    message: `Success: ${message}`,
    data
  })

export const getServerErrorResponse = (
  res: Response,
  message: string,
  errorMessage: string
): Response<any> =>
  res.status(500).json({
    success: false,
    message: `Server Error: ${message}: ${errorMessage}`
  })

export const getBadRequestResponse = (
  res: Response,
  message: string,
  data?: object
): Response<any> =>
  res.status(400).json({
    success: false,
    message: `Bad Request: ${message}`,
    data
  })

export const getNotFoundResponse = (
  res: Response,
  message: string,
  data?: object
): Response<any> =>
  res.status(400).json({
    success: false,
    message: `Not Found: ${message}`,
    data
  })
