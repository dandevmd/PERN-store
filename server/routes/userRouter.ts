import { Router, Response, Request } from 'express'
import { userController } from '../controller/userController'
import authMiddleware  from '../middlewares/authMiddleware'

// Initialize the router
const userRouter = Router()

//Define brand routes

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.get('/auth', authMiddleware, userController.checkAuth)

export default userRouter
