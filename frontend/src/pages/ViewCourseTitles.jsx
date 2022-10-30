import SearchBarForm from '../components/SearchBarForm'
import { useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CourseTitle from '../components/CourseTitle'
import Spinner from '../components/Spinner'
import SelectCountryForm from '../components/SelectCountryForm'
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
              <h3>You have not set any goals</h3>
            )}
          </section>
          
          
    
          
        </>
      )
    }
    
export default ViewCourseTitles