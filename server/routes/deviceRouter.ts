import { Router } from 'express'
import { deviceController } from '../controller/deviceController'

// Initialize the router
const deviceRouter = Router()

//Define brand routes
deviceRouter.post('/', deviceController.createDevice)
deviceRouter.get('/', deviceController.getDevices)
deviceRouter.get('/:id', deviceController.getDeviceById)
deviceRouter.put('/:id' , deviceController.updateDevice)
deviceRouter.delete('/:id', deviceController.deleteDevice)

export default deviceRouter;
