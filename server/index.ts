import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import fileUpload from 'express-fileupload'
import { pool } from './database'
import routes from './routes'
import { errorMiddleware } from './middlewares/errorMiddleware'
import path from 'path'

//Initialization of the server and middleware
const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload({}))
process.env.DIRECTORY_TO_SAVE_IMAGES &&
  app.use(
    express.static(
      path.resolve(process.env.DIRECTORY_TO_SAVE_IMAGES, 'static'),
    ),
  )
//Importing the routes
app.use('/api', routes)
//Error handling
app.use(errorMiddleware)

//Starting the server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT)
})
