import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import instructorService from './instructorService'

const initialState = {
    InstructorCreatedCourses:[],
    InstructorSelectedCountry:'',
    InstructorSearchMode:'Any',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }
  
   //create new User
  export const createCourse = createAsyncThunk('instructor/createscourse',async(courseData,thunkAPI)=>{
    try {
        const token =  thunkAPI.getState().auth.user.token
        return await instructorService.createCourse(courseData,token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  })

  //instructor select selectCountry
  export const selectCountry = createAsyncThunk('instructor/selectCountry',async(country,thunkAPI)=>{
    try {
        const token =  thunkAPI.getState().auth.user.token
        return await instructorService.selectCountry(country,token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  })






  export const instructorSlice = createSlice({
    name: 'Instructor',
    initialState,
    reducers: {
      reset: (state) => initialState,
      insMode:(state)=> {state.InstructorSearchMode='Instructor'}
    },
    extraReducers: (builder) => {
        builder
          .addCase(createCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(createCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.InstructorCreatedCourses.push(action.payload)   
          })
          .addCase(createCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
          .addCase(selectCountry.pending, (state) => {
            state.isLoading = true
          })
          .addCase(selectCountry.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.InstructorSelectedCountry=action.payload   
          })
          .addCase(selectCountry.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
          


        }

})





  export const { reset,insMode } = instructorSlice.actions
  export default instructorSlice.reducer