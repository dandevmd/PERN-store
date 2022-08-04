import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { register, reset } from '../app/reducers/auth/authSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { Card, Form, Button, Row, Container } from 'react-bootstrap'

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth,
  )

  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let timer;
    clearTimeout(timer);
    const userData = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    }
    dispatch(register(userData))
    timer = setTimeout(() => {
      navigate('/login')
    }, 250);
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.id]: e.target.value })
  }

  // useEffect(() => {
    
  //   dispatch(reset())
  // }, [user, isSuccess, isError, message, dispatch, ])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 60 }}
    >
      <Card style={{ width: '600px' }} className="p-5">
        <h2 className="m-auto">Register</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your Name here"
            id="name"
            type="text"
            onChange={onChange}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your Email here"
            id="email"
            type="email"
            onChange={onChange}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your Password here"
            id="password"
            type="password"
            onChange={onChange}
          />
        </Form>
        <Row className="mt-3">
          <div className="d-flex justify-content-between">
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
              Have an account already? Login
            </NavLink>
            <Button variant="outline-success align-self-end" type="submit" onClick={onSubmit}>
              Register
            </Button>
          </div>
        </Row>
      </Card>
    </Container>
  )
}

export default Register
