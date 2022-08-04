import axios from 'axios'

const API_URL = 'http://localhost:5000/api/user'

export interface UserData {
  email: string
  password: string
  token?: string
  name?: string
}

//register user
const register = async (userData: UserData) => {
   await axios.post(`${API_URL}/register`, userData)
  
}

//login user
const login = async (userData: UserData) => {
  const loggingUser = await axios.post(`${API_URL}/login`, userData)
  if (loggingUser.data) {
    localStorage.setItem('user', JSON.stringify(loggingUser.data))
  }
 
  return loggingUser.data
}

//logout user
const logout = async () => {
  return await localStorage.removeItem('user')
}

export const authService = {
  login,
  register,
  logout,
}
