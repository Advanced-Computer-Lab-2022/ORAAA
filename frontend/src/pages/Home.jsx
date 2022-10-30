import SearchBarForm from '../components/SearchBarForm'
import { useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CourseItem from '../components/CourseItem'
import Spinner from '../components/Spinner'
import SelectCountryForm from '../components/SelectCountryForm'
import { getCourses, reset} from '../features/courses/courseSlice'


function Home() {
  const dispatch = useDispatch()
  const { courses, isLoading, isError, message } = useSelector(
    (state) => state.courses)

    useEffect(() => {
      if (isError) {
        console.log(message)
      }
    
      
      dispatch(getCourses())
      
      

      return () => {
        dispatch(reset())
      }
    }, [isError, message, dispatch])
  


  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
    <section><SelectCountryForm/></section>
      <section className='heading'>
      <SearchBarForm/>
      </section>
      <section className='content'>
        {courses.length > 0 ? (
          <div className='goals'>
            {courses.map((course) => (
              <CourseItem key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
      
      

      
    </>
  )
}


export default Home