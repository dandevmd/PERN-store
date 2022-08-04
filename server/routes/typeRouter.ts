import { Router } from 'express'
import { typeController } from '../controller/typeController'
import {checkRole} from '../middlewares/checkRoleMiddleware'

// Initialize the router
const typeRouter = Router()

//Define brand routes
typeRouter.post('/',checkRole('ADMIN'), typeController.create)
typeRouter.get('/', typeController.getTypes)
typeRouter.get('/:id', typeController.selectedTypeId)
typeRouter.put('/:id',checkRole('ADMIN'), typeController.updateType)
typeRouter.delete('/:id', checkRole('ADMIN'), typeController.deleteType)

export default typeRouter
