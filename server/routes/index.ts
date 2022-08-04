import { Router } from 'express'
import userRouter from './userRouter'
import typeRouter from './typeRouter'
import brandRouter from './brandRouter'
import deviceRouter from './deviceRouter'

// Initialize the router
 const routes = Router()

//Define the routes
routes.use('/user', userRouter)
routes.use('/type', typeRouter)
routes.use('/brand', brandRouter)
routes.use('/device', deviceRouter)

export default routes


