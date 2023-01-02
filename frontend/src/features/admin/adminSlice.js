import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import adminService from './adminService'


const Adminrequests = JSON.parse(localStorage.getItem('Adminrequests'))
const initialState = {
    adminCreated:'',
    Adminrequests:Adminrequests?Adminrequests:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }
  
  //create new User
  export const createAdmin = createAsyncThunk('admin/createsadmin',async(userData,thunkAPI)=>{
    try {
        const token =  thunkAPI.getState().auth.user.token
        return await adminService.createAdmin(userData,token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  })

  //create new User
  export const createInstructor = createAsyncThunk('admin/createsInstructor',async(userData,thunkAPI)=>{
    try {
        const token =  thunkAPI.getState().auth.user.token
        return await adminService.createInstructor(userData,token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  })

  //create new User
  export const createCorporateTrainee = createAsyncThunk('admin/createsCorporateTrainee',async(userData,thunkAPI)=>{
    try {
        const token =  thunkAPI.getState().auth.user.token
        return await adminService.createCorporateTrainee(userData,token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  })


  //get requests
  export const getRequests = createAsyncThunk('admin/getRequests',async(_,thunkAPI)=>{
    try {
        const token =  thunkAPI.getState().auth.user.token
        return await adminService.getRequests(token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  })


  export const adminSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
          .addCase(createAdmin.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createAdmin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
          })
          .addCase(createAdmin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
          .addCase(createInstructor.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createInstructor.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
          })
          .addCase(createInstructor.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
          .addCase(createCorporateTrainee.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createCorporateTrainee.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
          })
          .addCase(createCorporateTrainee.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
          .addCase(getRequests.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getRequests.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.Adminrequests = action.payload
          })
          .addCase(getRequests.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })


        }

})



export const { reset } = adminSlice.actions
export default adminSlice.reducer