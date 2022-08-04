import { Router } from 'express'
import { brandController } from '../controller/brandController'
// Initialize the brandRouter
const brandRouter = Router()

//Define brand routes
brandRouter.post('/', brandController.createBrand)
brandRouter.get('/', brandController.getBrands)
brandRouter.get('/:id', brandController.getBrandById)
brandRouter.put('/:id', brandController.updateBrand)
brandRouter.delete('/:id', brandController.deleteBrand)

export default brandRouter
