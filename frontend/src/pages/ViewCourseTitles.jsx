import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CourseTitle from '../components/CourseTitle'
import Spinner from '../components/Spinner'
import { getinstructerCoursesTitle, reset} from '../features/courses/courseSlice'

function ViewCourseTitles() {
 
    
    
      const dispatch = useDispatch()
      const { courses, isLoading, isError, message } = useSelector(
        (state) => state.courses)
    
        useEffect(() => {
          if (isError) {
            console.log(message)
          }
        
          
          dispatch(getinstructerCoursesTitle())
          
          
    
          return () => {
            dispatch(reset())
          }
        }, [isError, message, dispatch])
      
    
    
      if (isLoading) {
        return <Spinner/>
      }
    
      return (
        <>
          <section className='content'>
            {courses.length > 0 ? (
              <div className='goals'>
                {courses.map((course) => (
                  <CourseTitle key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <h3>No courses</h3>
            )}
          </section>
          
          
    
          
        </>
      )
    }
    
export default ViewCourseTitles