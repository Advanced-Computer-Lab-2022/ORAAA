import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import courseService from './courseService'


// Get subtitles from localStorage
const subTitles = JSON.parse(localStorage.getItem('subTitles'))
console.log(subTitles)

// Get selectrd course from localStorage
const selectedCourse = JSON.parse(localStorage.getItem('selectedCourse'))

const initialState = {
  courses: [],
  subTitles: subTitles ? subTitles :[],
  Exams:[],
  selectedCourse: selectedCourse ? selectedCourse : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  courseLoading:false,
  message: '',
  lastRate:'',
  cmessage:'',
  CurrentProgress:0,
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

  //Instructor search for his courses
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


  //general search for courses
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


  //filter courses
  export const filterCourse = createAsyncThunk('courses/filterCourse', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       return await courseService.filterCourse(coursedata,token)
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

  //guestfilter courses
  export const guestFilterCourse = createAsyncThunk('courses/guestFilterCourse', async (coursedata,thunkAPI) => {
    try {
  
       return await courseService.guestFilterCourse(coursedata)
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

  //Instructor filter his courses
  export const InsFilterCourse = createAsyncThunk('courses/InsFilterCourse', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       return await courseService.InsFilterCourse(coursedata,token)
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

  //rate an instructor's course
  export const RateCourse = createAsyncThunk('courses/RateCourse', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       const data={
        rating:coursedata.rating,
        review:coursedata.review
       }
       return await courseService.RateCourse(data,coursedata.courseId,token)
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



  //get course info when opened
  export const getCourseInfo = createAsyncThunk('courses/getCourseInfo', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       return await courseService.getCourseInfo(coursedata,token)
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


  //get a certain course
  export const getCourse = createAsyncThunk('courses/getCourse', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       
       return await courseService.getCourse(coursedata.courseId,token)
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

  //get subtitle exam
  export const getSubTitleExam = createAsyncThunk('courses/getSubTitleExam', async (subTitleId,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       
       return await courseService.getSubTitleExam(subTitleId,token)
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

//get all availble courses
export const getSortedCourses = createAsyncThunk('courses/getSortedCourses', async (_, thunkAPI) => {
  try {
     return await courseService.getSortedCourses()
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



  //pay for a course
  export const payForCourse = createAsyncThunk('courses/payForCourse', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       return await courseService.payForCourse(coursedata.courseId,token)
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



  //gets Course Progress
  export const getProgress = createAsyncThunk('courses/getProgress', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       return await courseService.getProgress(coursedata,token)
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



  //request access for course
  export const requestCourse = createAsyncThunk('courses/requestCourse', async (coursedata,thunkAPI) => {
    try {
       const token =  thunkAPI.getState().auth.user.token
       return await courseService.requestCourse(coursedata,token)
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
      reset: (state) => {
        state.courses=[]
        state.Exams=[]
        state.isLoading = false
        state.isSuccess = false
        state.courseLoading=false
        state.isError = false
        state.message = ''
        state.lastRate=''
        state.cmessage=''
      },
      resetOpenedCourse: (state) => {
        state.selectedCourse=null
        state.subTitles=[]
        state.CurrentProgress=0
      },

    },
    extraReducers: (builder) => {
        builder

        .addCase(getCourses.pending, (state) => {
            state.isLoading = true
            state.courseLoading=true
          })
          .addCase(getCourses.fulfilled, (state, action) => {
            state.isLoading = false
            state.courseLoading=false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(getCourses.rejected, (state, action) => {
            state.isLoading = false
            state.courseLoading=false
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
          .addCase(filterCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(filterCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(filterCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(guestFilterCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(guestFilterCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(guestFilterCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(InsFilterCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(InsFilterCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(InsFilterCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(RateCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(RateCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.lastRate = action.payload
          })
          .addCase(RateCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getCourseInfo.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getCourseInfo.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.subTitles = action.payload
          })
          .addCase(getCourseInfo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.selectedCourse = action.payload
          })
          .addCase(getCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getSubTitleExam.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getSubTitleExam.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.Exams = action.payload
          })
          .addCase(getSubTitleExam.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getSortedCourses.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getSortedCourses.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.courses = action.payload
          })
          .addCase(getSortedCourses.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(payForCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(payForCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            window.location.href=`${action.payload.url}`
          })
          .addCase(payForCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getProgress.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getProgress.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.CurrentProgress=action.payload
          })
          .addCase(getProgress.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(requestCourse.pending, (state) => {
            state.isLoading = true
          })
          .addCase(requestCourse.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.cmessage = action.payload
          })
          .addCase(requestCourse.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.cmessage = action.payload
          })




          

          
           
    }
})







export const {reset,resetOpenedCourse} = courseSlice.actions
export default courseSlice.reducer