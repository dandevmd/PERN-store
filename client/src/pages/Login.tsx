import { useState, useEffect, ChangeEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button, Row, Container } from 'react-bootstrap'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { login, reset } from '../app/reducers/auth/authSlice'

const Auth: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth,
  )

  const { email, password } = formData



  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let timer;
    clearTimeout(timer);
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
    timer = setTimeout(() => {
     if(!user) return navigate('/login')
     if(user) return navigate('/')
    
    }, 300);
  }

useEffect(() => {
  
    dispatch(reset())
  }, [user,isError,isSuccess, message, dispatch ])


  if (isLoading) {
    return <h1>Loading...</h1>
  }


  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 60 }}
    >
      <Card style={{ width: '600px' }} className="p-5">
        <h2 className="m-auto">Login</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your Email here"
            id="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your Password here"
            type="password"
            id="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form>
        <Row className="mt-3">
          <div className="d-flex justify-content-between">
            <NavLink to="/register" style={{ textDecoration: 'none' }}>
              Make an account!
            </NavLink>
            <Button
              variant="outline-success align-self-end"
              type="submit"
              onClick={onSubmit}
            >
              Login
            </Button>
          </div>
        </Row>
      </Card>
    </Container>
  )
}

export default Auth
