import { Request, Response, NextFunction } from 'express'
import ApiError from '../errorHandler'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface Role {
  role: JwtPayload['role'] | string
}

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
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

      //@ts-ignore
      if (decoded?.role !== role) {
        return next(ApiError.unauthorized('Unauthorized'))
      }
      next()
    } catch (error) {
      return next(ApiError.unauthorized('Invalid token'))
    }
  }
}

