import { NextFunction, Request, Response } from 'express'
import ApiError from '../errorHandler'
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
import { pool } from '../database'

const generateToken = (id: number, email: string, role: string) => {
  return Jwt.sign({ id, email, role }, process.env.SECRET_KEY as string, {
    expiresIn: '24h',
  })
}

class UserController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, role:providedRole } = req.body
      if (!email || !password)
        return next(ApiError.badRequest('Email and password are required'))

      const {
        email: candidateEmail,
      } = await pool.query('SELECT * FROM user_table WHERE email = $1', [email])

      candidateEmail && next(ApiError.badRequest('User already exists'))

      const hashedPassword = await bcrypt.hash(password, 5)
      let newUser
      if (providedRole) {
        newUser = await pool.query(
          'INSERT INTO user_table (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, email, hashedPassword, providedRole],
        )
      } else {
        newUser = await pool.query(
          'INSERT INTO user_table (name, email, password) VALUES ($1, $2, $3) RETURNING *',
          [name, email, hashedPassword],
        )
      }
      const { id, role } = newUser.rows[0]

      await pool.query('INSERT INTO basket (user_id) VALUES ($1) RETURNING *', [
        id,
      ])
      const token = generateToken(id, email, role)

      return res.status(201).json({
        message: 'User created',
        token,
        user: newUser.rows[0].email,
      })
    } catch (error) {
      if (error instanceof Error) {
        return next(ApiError.badRequest(error.message))
      }
      return console.log(error)
    }
  }

  login = async (req: any, res: any, next: NextFunction) => {
    const { email, password } = req.body
    if (!email || !password) {
      return next(ApiError.badRequest('Email and password are required'))
    }

    const user = await pool.query('SELECT * FROM user_table WHERE email = $1', [
      email,
    ])
    if (!user.rows[0]) {
      return next(ApiError.badRequest('User not found'))
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password,
    )
    if (!isPasswordValid) {
      return next(ApiError.badRequest('Invalid credentials'))
    }

    const token = generateToken(
      user.rows[0].id,
      user.rows[0].email,
      user.rows[0].role,
    )
    return res.status(200).json({
      message: 'User logged in',
      token,
      user: user.rows[0].email,
    })
  }

  checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = generateToken(req.body.id, req.body.email, req.body.role)
    return res.status(200).json({ token })
  }
}

export const userController = new UserController()
