import { Request, Response, NextFunction } from 'express'
import ApiError from '../errorHandler'
import jwt from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
      return next(ApiError.unauthorized('No token provided'))
    }
    const decoded = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
    )
    // @ts-ignore
    req.user = decoded

    next()
  } catch (error) {
    return next(ApiError.unauthorized('Invalid token'))
  }
}

export default authMiddleware
