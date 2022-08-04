import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService, UserData } from './authService'

const user = localStorage.getItem('user')

const initialState = {
  user: user ? JSON.parse(user) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//register user
export const register = createAsyncThunk(
  '/register',
  async (user: { name: string; email: string; password: string }) => {
    try {
      return await authService.register(user)
    } catch (error) {
      if (error instanceof Error) return console.log(error.message)
    }
  },
)

// login user
export const login = createAsyncThunk(
  '/login',
  async (user: { email: string; password: string }) => {
    try {
      return await authService.login(user)
      
    } catch (error) {
      if (error instanceof Error){
         console.log(error.message)
         alert('Login failed')
      }
    }
  },
)
//logout user
export const logout = createAsyncThunk('/', async () => {
  try {
    return await authService.logout()
  } catch (error) {
    if (error instanceof Error) return console.log(error.message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state: any) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
      })
      .addCase(register.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
