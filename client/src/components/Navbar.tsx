import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout, reset } from '../app/reducers/auth/authSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const NavbarComponent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)

  const Logout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
            Navbar
          </NavLink>
          {user ? (
            <div className="ml-auto">
              <Button variant="outline-light" style={{marginRight: '8px'}} >
                <NavLink
                    to="/admin"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Admin
                  </NavLink>
              </Button>
              {''}
              <Button variant="outline-light" onClick={Logout}>
                Exit
              </Button>
            </div>
          ) : (
            <div className="ml-auto">
              <div className="d-flex">
                <Button variant="outline-light" className="mx-2">
                  <NavLink
                    to="/login"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Login
                  </NavLink>
                </Button>
                <Button variant="outline-light">
                  <NavLink
                    to="/register"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Register
                  </NavLink>
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarComponent
