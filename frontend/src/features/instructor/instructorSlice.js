import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import instructorService from './instructorService'

const initialState = {
    InstructorCreatedCourses:[],
    InstructorRR:[],
    InstructorSelectedCountry:'',
    InstructorSearchMode:'Any',
    isError: false,
    InstructorAcc:false,
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


  //instructor view rating/reviews
  export const viewRateReview = createAsyncThunk('instructor/viewRateReview',async(_,thunkAPI)=>{
    try {
        const token =  thunkAPI.getState().auth.user.token
        return await instructorService.viewRateReview(token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  })


   //instructor edits his info
   export const editEmailOrMiniBio = createAsyncThunk('instructor/editEmailOrMiniBio',async(data,thunkAPI)=>{
    try {
        const token =  thunkAPI.getState().auth.user.token
        return await instructorService.editEmailOrMiniBio(data,token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }

  })


    //instructor accepts form
    export const acceptForm = createAsyncThunk('instructor/accept',async(_,thunkAPI)=>{
      try {
          const token =  thunkAPI.getState().auth.user.token
          return await instructorService.acceptForm(token)
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
      reset: (state) => {
        state.isError=false
        state.isLoading=false
        state.isSuccess=false
        state.message=''
        state.InstructorSearchMode='Any'
      },
      insMode:(state)=> {state.InstructorSearchMode='Instructor'},
      resetR:(state)=>{
        state.InstructorRR=[]
      }
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
          .addCase(viewRateReview.pending, (state) => {
            state.isLoading = true
          })
          .addCase(viewRateReview.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.InstructorRR=action.payload   
          })
          .addCase(viewRateReview.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
          .addCase(editEmailOrMiniBio.pending, (state) => {
            state.isLoading = true
          })
          .addCase(editEmailOrMiniBio.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true 
          })
          .addCase(editEmailOrMiniBio.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
          .addCase(acceptForm.pending, (state) => {
            state.isLoading = true
          })
          .addCase(acceptForm.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.InstructorAcc=action.payload
          })
          .addCase(acceptForm.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            
          })
          
          

          
        }
        
})





  export const { reset,insMode,resetR } = instructorSlice.actions
  export default instructorSlice.reducer