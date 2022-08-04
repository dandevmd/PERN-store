import Admin from '../../pages/Admin'
import Login from '../../pages/Login'
import Basket from '../../pages/Basket'
import Device from '../../pages/Device'
import Shop from '../../pages/Shop'
import Register from '../../pages/Register'

export const privateRoutes = [
  {
    path: '/admin',
    element: Admin,
  },
  {
    path: '/basket',
    element: Basket,
  },
]

export const publicRoutes = [
  {
    path: '/',
    element: Shop,
  },
  {
    path: '/register',
    element: Register,
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/api/device/:id',
    element: Device,
  },
]
