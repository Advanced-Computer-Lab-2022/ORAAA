import React from 'react'
import { useSelector} from 'react-redux'
import { getCourses,reset } from '../features/courses/courseSlice'
import {useDispatch} from'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import CourseItem from '../components/CourseItem'

function EnrolledCoursesPage() {

      const dispatch = useDispatch()
      const {courses,isError,message,isLoading} = useSelector(
        (state) => state.courses
      )
      const {user} = useSelector(
        (state) => state.auth
      )
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
     
    
        dispatch(getCourses())
        
    
        return () =>{
          dispatch(reset())
        }
    
    },[isError,message,dispatch])


    if (isLoading) {
        return <Spinner />
      }


  return (
    <>

    <h1>Enrolled Courses</h1>
    <section className='content'>
    {courses.length > 0 ? (
      <div className='goals'>
        {courses.map((course) => {
           if(user.enrolled.includes(course._id)){
            return (
              <CourseItem key={course._id} course={course} />
            )
           }
           return null
      })}
      </div>
    ) : (
      <h3>No courses Available</h3>
    )}
  </section>
  </>
  )

}

export default EnrolledCoursesPage