import { NextFunction, Request, Response } from 'express'
import ApiError from '../errorHandler'

export const errorMiddleware = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  return res.json({ message: 'Error not handled' })
}
