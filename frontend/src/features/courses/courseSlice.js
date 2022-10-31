import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import courseService from './courseService'

const initialState = {
  courses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


//get all availble courses
export const getCourses = createAsyncThunk('courses/getAll', async (_, thunkAPI) => {
      try {
         return await courseService.getCourses()
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

  //get all instructer course title
export const getinstructerCoursesTitle = createAsyncThunk('courses/getinstructerCoursesTitle', async (_, thunkAPI) => {
  try {
    const token =  thunkAPI.getState().auth.user.token
     return await courseService.getinstructerCoursesTitle(token)
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

  //search for courses
  export const searchForCourse = createAsyncThunk('courses/search', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       return await courseService.searchForCourse(coursedata,token)
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


  //search for courses
  export const generalSearchForCourse = createAsyncThunk('courses/generalsearch', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       return await courseService.generalSearchForCourse(coursedata,token)
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

//guest search for courses
export const guestGeneralSearchForCourse = createAsyncThunk('courses/guestGeneralSearchForCourse', async (coursedata,thunkAPI) => {
  try {
     return await courseService.guestGeneralSearchForCourse(coursedata)
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




  export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder

        .addCase(getCourses.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getCourses.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(getCourses.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getinstructerCoursesTitle.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getinstructerCoursesTitle.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(getinstructerCoursesTitle.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })

          .addCase(searchForCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(searchForCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(searchForCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(generalSearchForCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(generalSearchForCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(generalSearchForCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(guestGeneralSearchForCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(guestGeneralSearchForCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(guestGeneralSearchForCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })


    }
})







export const {reset} = courseSlice.actions
export default courseSlice.reducer