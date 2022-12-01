import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
  user: user ? user : null,
  userType: user ? user.typee : null,
  changePasswordSuccsses:'',
  isError: false,
  isSuccess: false,
  isLoading: false,
  RateInstructorIsLoading:false,
  userLastRateToAnIns:'',
  message: '',
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


 //Change password
 export const changePassword = createAsyncThunk('common/changePassword', async (data, thunkAPI) => {
  try {
    const token =  thunkAPI.getState().auth.user.token
     return await authService.changePassword(data,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)

//rate instructor
export const RateInstructor = createAsyncThunk('auth/RateInstructor', async (Instructordata,thunkAPI) => {
  try {
     const token =  thunkAPI.getState().auth.user.token
     const data={
      instructorRate:Instructordata.instructorRate,
      instructorReview:Instructordata.instructorReview
     }
     return await authService.RateInstructor(data,Instructordata.instructorId,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.userType= state.user.typee
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.changePasswordSuccsses = action.payload
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(RateInstructor.pending, (state) => {
        state.RateInstructorIsLoading = true
      })
      .addCase(RateInstructor.fulfilled, (state, action) => {
        state.RateInstructorIsLoading = false
        state.isSuccess = true
        state.userLastRateToAnIns = action.payload
      })
      .addCase(RateInstructor.rejected, (state, action) => {
        state.RateInstructorIsLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.userType= null
      })
      
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer