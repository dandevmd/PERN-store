import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { publicRoutes, privateRoutes } from './routes'
import NotFound from '../pages/NotFound'

const AppRouter: React.FC = (): JSX.Element => {
  const {user} = useAppSelector((state) => state.auth)

  return (
      <Routes>
        {user &&
          privateRoutes.map(
            (route: { path: string; element: any }, i: number) => (
              <Route key={i} path={route.path} element={<route.element/>} />
            ),
          )}
          {publicRoutes.map(
            (route: { path: string; element: any }, i: number) => (
              <Route key={i} path={route.path} element={<route.element/>} />
            ),
          )}
          <Route path='*' element={<NotFound />}/>
      </Routes>
  )
}

export default AppRouter
